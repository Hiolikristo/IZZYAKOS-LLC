import fs from 'node:fs';import path from 'node:path';import {execFileSync} from 'node:child_process';
const root=path.resolve('jericho-hour');
const files=new Set();
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else files.add(path.relative(root,p).replaceAll('\\','/'))}}
walk(root);
const html=[...files].filter(x=>x.endsWith('.html'));const broken=[];
for(const rel of html){
  const full=path.join(root,rel),s=fs.readFileSync(full,'utf8'),re=/\b(?:href|src)=["']([^"'#]+)["']/g;
  for(const m of s.matchAll(re)){
    let u=m[1].split('?')[0].split('#')[0];
    if(!u||/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(u))continue;
    if(u==='.'||u==='./')u='index.html';
    let target=path.normalize(path.join(path.dirname(rel),u)).replaceAll('\\','/').replace(/^\.\//,'');
    if(target.startsWith('../'))continue;
    if(target.endsWith('/'))target+='index.html';
    if(!files.has(target))broken.push(rel+' -> '+m[1]);
  }
}
if(broken.length){console.error('Broken local references:\n'+broken.join('\n'));process.exitCode=1}
for(const file of [...files].filter(x=>x.endsWith('.js'))){try{execFileSync(process.execPath,['--check',path.join(root,file)],{stdio:'pipe'})}catch{console.error('JS syntax error:',file);process.exitCode=1}}
const member=['index.html','radio.html','sermons.html','programs.html','schedule.html','community.html','feed.html','resources.html','booking.html','member.html','give.html'];
for(const file of member){const s=fs.readFileSync(path.join(root,file),'utf8');if(!s.includes('experience-v11.js')){console.error('Missing shared experience layer:',file);process.exitCode=1}}
console.log(JSON.stringify({htmlPages:html.length,localFiles:files.size,brokenRefs:broken.length,memberPagesChecked:member.length},null,2));