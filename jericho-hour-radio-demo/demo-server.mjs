import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg'};
const port=Number(process.env.PORT||8080);
http.createServer(async(req,res)=>{
  const u=new URL(req.url,'http://localhost');
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return}
  if(u.pathname==='/healthz'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({ok:true,version:'public-showcase-v6',radioLive:false}));return}
  let name=u.pathname==='/'?'showcase.html':decodeURIComponent(u.pathname).replace(/^\/+/, '');
  if(name==='classic')name='index.html';
  if(!/^[a-z0-9._/-]+$/i.test(name)||name.split('/').some(x=>x==='..')||name.startsWith('.')){res.writeHead(400);res.end('Bad path');return}
  const f=path.resolve(root,name);if(!f.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return}
  try{const s=await stat(f);if(!s.isFile())throw Error('not file');const body=await readFile(f);res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':'no-cache','X-Robots-Tag':'noindex,nofollow'});res.end(req.method==='HEAD'?undefined:body)}
  catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found')}
}).listen(port,'0.0.0.0',()=>process.stdout.write('Jericho Hour owner-review demo on '+port+'\n'));
