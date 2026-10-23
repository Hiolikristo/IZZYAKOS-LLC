(()=>{
'use strict';
/* Jericho Hour owner-review workflow. All records are synthetic and browser-local.
   No credentials, names, emails, phone numbers, payment details or actual bookings are saved. */
const KEY='jh-owner-review-demo-v1';
const TYPES=['bookings','members','pledges','preferences'];
const $=id=>document.getElementById(id);
const page=()=>location.pathname.split('/').pop()||'index.html';
const initial=()=>({bookings:[],members:[],pledges:[],preferences:[]});
function read(){
 try{
  const raw=JSON.parse(localStorage.getItem(KEY)||'{}');
  const out=initial();
  for(const type of TYPES)out[type]=Array.isArray(raw[type])?raw[type].filter(x=>x&&typeof x==='object').slice(-15):[];
  return out;
 }catch{return initial();}
}
function write(value){try{localStorage.setItem(KEY,JSON.stringify(value));return true}catch{return false}}
function record(type,fields){
 const state=read(),entry={id:'DEMO-'+Date.now().toString(36).toUpperCase(),at:new Date().toISOString(),...fields};
 state[type].push(entry);state[type]=state[type].slice(-15);
 if(!write(state))return null;renderBoard();return entry;
}
function note(id,message){queueMicrotask(()=>{const node=$(id);if(node)node.textContent=message});}
let lastMain=null;
function buildSection(main){
 const p=page();
 if(!['index.html','booking.html','member.html','give.html','notifications.html','radio.html','staff-v10.html','staff-demo.html','control-room.html','schedule-admin.html'].includes(p))return;
 const staff=['staff-v10.html','staff-demo.html','control-room.html','schedule-admin.html'].includes(p);
 const section=document.createElement('section');
 section.dataset.jhOwnerWorkflow='1';
 section.setAttribute('aria-label','Connected owner-review demonstration');
 section.style.cssText='max-width:1040px;margin:28px auto;padding:18px;box-sizing:border-box;border:2px solid #c69b60;border-radius:16px;background:#fff5df;color:#362435;font:15px/1.5 system-ui,sans-serif';
 const title=document.createElement('h2');title.textContent=staff?'Interactive ministry review board':'Connected demonstration — try a complete workflow';
 title.style.cssText='font-size:21px;margin:0 0 8px';section.append(title);
 const info=document.createElement('p');
 info.textContent='DEMO ONLY: records stay in this browser. No real member account, reservation, payment, SMS, or live station is created. For testing, use fictional details only.';
 info.style.cssText='margin:0 0 14px;font-size:13px';section.append(info);
 const nav=document.createElement('nav');nav.setAttribute('aria-label','Demo workflow navigation');nav.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px';
 const links=[['Request a session','booking.html'],['Join preview','member.html'],['Giving preview','give.html'],['Notification preview','notifications.html'],['Hear sample radio','radio.html'],['Review staff board','staff-v10.html']];
 for(const [label,href] of links){
  const a=document.createElement('a');a.href=href;a.textContent=label;
  a.style.cssText='display:inline-block;background:#3d172b;color:white;border-radius:8px;padding:8px 10px;text-decoration:none;font-weight:650;font-size:12px';
  nav.append(a);
 }
 section.append(nav);
 const summary=document.createElement('p');summary.dataset.jhCounts='1';summary.style.cssText='margin:8px 0;font-weight:750';section.append(summary);
 if(staff){
  const heading=document.createElement('h3');heading.textContent='Same-browser demonstration activity';heading.style.cssText='font-size:16px;margin:15px 0 5px';section.append(heading);
  const list=document.createElement('ul');list.dataset.jhEvents='1';list.style.cssText='padding-left:20px;margin:8px 0';section.append(list);
  const clear=document.createElement('button');clear.type='button';clear.dataset.jhClear='1';clear.textContent='Clear fictional demo activity';
  clear.style.cssText='border:1px solid #855a4f;border-radius:8px;padding:8px;background:white;color:#3d172b;font-weight:700;cursor:pointer';section.append(clear);
 }
 main.append(section);
}
function renderBoard(){
 const state=read();
 const summary=document.querySelector('[data-jh-counts]');
 if(summary)summary.textContent='Demo activity: '+state.bookings.length+' session requests · '+state.members.length+' interest registrations · '+state.pledges.length+' giving examples · '+state.preferences.length+' alert preferences';
 const list=document.querySelector('[data-jh-events]');
 if(!list)return;
 list.replaceChildren();
 const all=[];
 for(const type of TYPES)for(const entry of state[type])all.push({...entry,kind:type});
 all.sort((a,b)=>(b.at||'').localeCompare(a.at||''));
 if(!all.length){const li=document.createElement('li');li.textContent='Nothing added yet. Open Booking and make a fictional request, then return here.';list.append(li);return}
 for(const entry of all.slice(0,12)){
  const li=document.createElement('li');
  if(entry.kind==='bookings')li.textContent='Session request '+entry.id+': '+entry.type+' on '+entry.date+' at '+entry.time+' ('+entry.mode+') — not confirmed';
  else if(entry.kind==='members')li.textContent='Interest registration '+entry.id+': '+entry.interest+' / '+entry.language+' — no account created';
  else if(entry.kind==='pledges')li.textContent='Sample giving '+entry.id+': $'+Number(entry.amount).toFixed(2)+' to '+entry.fund+' — no money transferred';
  else li.textContent='Alert preference '+entry.id+': '+entry.category+' via '+entry.channel+' — no notification sent';
  list.append(li);
 }
}
function mount(){
 const main=document.querySelector('main');
 if(!main||main===lastMain)return;
 lastMain=main;buildSection(main);renderBoard();
}
document.addEventListener('click',e=>{
 const target=e.target instanceof Element?e.target.closest('button'):null;
 if(!target)return;
 if(target.matches('[data-jh-clear]')){write(initial());renderBoard();return}
 const p=page(),id=target.id;
 if(p==='booking.html'&&id==='bookPreview'){
  const d=$('bookDate')?.value,t=$('bookTime')?.value;
  if(!d||!t)return;
  const today=new Date();today.setHours(0,0,0,0);
  const selected=new Date(d+'T00:00:00');if(!Number.isFinite(selected.getTime())||selected<today){note('bookStatus','Choose today or a future date for a fictional request.');return}
  const entry=record('bookings',{type:$('bookType')?.value||'Session',date:d,time:t,mode:$('bookMode')?.value||'Online'});
  note('bookStatus',entry?'DEMO REQUEST SAVED IN THIS BROWSER · '+entry.id+'. Open the Staff Board link below to see it. No actual reservation was sent.':'Browser storage unavailable; nothing saved.');
 }else if(p==='member.html'&&id==='preview'){
  const entry=record('members',{interest:$('interest')?.value||'General',language:$('language')?.value||'English'});
  note('status',entry?'DEMO INTEREST REGISTERED · '+entry.id+'. Open the Staff Board to review. No identity, email or phone stored; no real member account created.':'Browser storage unavailable; nothing saved.');
 }else if(p==='give.html'&&id==='add'){
  const amount=Number($('amount')?.value);
  if(!Number.isFinite(amount)||amount<=0||amount>100000)return;
  const entry=record('pledges',{amount,fund:$('fund')?.value||'General'});
  note('status',entry?'SAMPLE GIVING SAVED IN THIS BROWSER · '+entry.id+'. No payment collected. See the Staff Board.':'Browser storage unavailable; nothing saved.');
 }else if(p==='notifications.html'&&id==='preview'){
  if(!$('consent')?.checked){note('state','Select explicit fictional-demo consent before adding a local preference. No actual messages can be sent.');return}
  const entry=record('preferences',{category:$('cat')?.value||'General',channel:$('channel')?.value||'Email'});
  note('state',entry?'DEMO ALERT PREFERENCE SAVED · '+entry.id+'. No SMS, email, or push message sent. See the Staff Board.':'Browser storage unavailable; nothing saved.');
 }
},false);
new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('storage',renderBoard);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();