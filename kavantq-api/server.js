import http from 'node:http';
import { URL } from 'node:url';

const allowed = new Set(['SPY','QQQ','NVDA','AAPL','MSFT','TSLA','AMD','AMZN','GOOGL','META']);
const timeframes = new Set(['1Min','5Min','15Min','1Hour','1Day']);
const port = Number(process.env.PORT || 3000);

function send(res, status, body) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,OPTIONS',
    'access-control-allow-headers': 'content-type',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff'
  });
  res.end(JSON.stringify(body));
}

async function market(url, res) {
  const key = process.env.ALPACA_KEY_ID;
  const secret = process.env.ALPACA_SECRET_KEY;
  const feed = process.env.ALPACA_FEED || 'iex';
  if (!key || !secret) {
    return send(res, 503, {
      error: 'Authorized Alpaca market-data credentials are not configured. Synthetic fallback is disabled.',
      code: 'REAL_FEED_NOT_CONFIGURED'
    });
  }

  const symbol = String(url.searchParams.get('symbol') || 'SPY').toUpperCase();
  const timeframe = String(url.searchParams.get('timeframe') || '1Min');
  const limit = Math.max(20, Math.min(1000, Number(url.searchParams.get('limit')) || 350));
  if (!allowed.has(symbol) || !timeframes.has(timeframe)) {
    return send(res, 400, {error:'Unsupported symbol or timeframe'});
  }

  const headers = {'APCA-API-KEY-ID': key, 'APCA-API-SECRET-KEY': secret};
  const barsUrl = new URL(`https://data.alpaca.markets/v2/stocks/${symbol}/bars`);
  barsUrl.searchParams.set('timeframe', timeframe);
  barsUrl.searchParams.set('limit', String(limit));
  barsUrl.searchParams.set('adjustment', 'raw');
  barsUrl.searchParams.set('feed', feed);
  barsUrl.searchParams.set('sort', 'desc');

  try {
    const [barsResp, clockResp] = await Promise.all([
      fetch(barsUrl, {headers}),
      fetch('https://paper-api.alpaca.markets/v2/clock', {headers})
    ]);
    if (!barsResp.ok) {
      const text = await barsResp.text();
      return send(res, barsResp.status, {error:`Alpaca bars ${barsResp.status}: ${text.slice(0,240)}`});
    }
    const barsJson = await barsResp.json();
    const clockJson = clockResp.ok ? await clockResp.json() : {};
    const bars = (barsJson.bars || []).map(b => ({
      t:b.t, o:Number(b.o), h:Number(b.h), l:Number(b.l), c:Number(b.c),
      v:Number(b.v), n:Number(b.n || 0), vw:Number(b.vw || 0)
    })).sort((a,b)=>new Date(a.t)-new Date(b.t));

    return send(res, 200, {
      provider:'Alpaca Market Data',
      feed, symbol, timeframe, bars,
      market:{
        is_open:!!clockJson.is_open,
        timestamp:clockJson.timestamp || new Date().toISOString(),
        next_open:clockJson.next_open || null,
        next_close:clockJson.next_close || null
      }
    });
  } catch (err) {
    return send(res, 502, {error:'Market-data backend failure: '+err.message});
  }
}

const server = http.createServer(async (req,res)=>{
  if (req.method === 'OPTIONS') return send(res, 204, {});
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/health') return send(res, 200, {ok:true, service:'kavantq-real-market-api', synthetic:false});
  if (url.pathname === '/market') return market(url,res);
  return send(res, 404, {error:'Not found'});
});

server.listen(port, '0.0.0.0', ()=>console.log(`KAVANTQ API listening on ${port}`));
