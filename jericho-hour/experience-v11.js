(()=>{'use strict';
const langs=[
['en','English'],['fr','Français'],['es','Español'],['pt','Português'],['ar','العربية'],['ak','Twi / Akan'],['ee','Ewe'],['ha','Hausa'],['yo','Yorùbá'],['ig','Igbo'],['sw','Kiswahili'],['am','Amharic'],['so','Somali'],['zu','isiZulu'],['xh','isiXhosa'],['af','Afrikaans']
];
const words={
fr:{Home:'Accueil',Radio:'Radio',Sermons:'Sermons',Programs:'Programmes',Schedule:'Calendrier',Community:'Communauté','Ghana Care':'Projet Ghana','Member sign in':'Espace membre','Give & support':'Donner'},
es:{Home:'Inicio',Radio:'Radio',Sermons:'Sermones',Programs:'Programas',Schedule:'Horario',Community:'Comunidad','Ghana Care':'Proyecto Ghana','Member sign in':'Miembros','Give & support':'Donar'},
pt:{Home:'Início',Radio:'Rádio',Sermons:'Sermões',Programs:'Programas',Schedule:'Agenda',Community:'Comunidade','Ghana Care':'Projeto Gana','Member sign in':'Membros','Give & support':'Doar'},
ar:{Home:'الرئيسية',Radio:'الإذاعة',Sermons:'العظات',Programs:'البرامج',Schedule:'الجدول',Community:'المجتمع','Ghana Care':'مشروع غانا','Member sign in':'دخول الأعضاء','Give & support':'تبرع'},
ak:{Home:'Fie',Radio:'Radio',Sermons:'Asɛnka',Programs:'Nhyehyɛe',Schedule:'Berɛ nhyehyɛe',Community:'Mpɔtam','Ghana Care':'Ghana mmoa'},
ee:{Home:'Aƒe',Radio:'Radio',Sermons:'Nyagbɔgblɔ',Programs:'Dɔwɔwɔwo',Schedule:'Ɣeyiɣiwo',Community:'Hame','Ghana Care':'Ghana kpekpeɖeŋu'},
ha:{Home:'Gida',Radio:'Rediyo',Sermons:'Wa’azi',Programs:'Shirye-shirye',Schedule:'Jadawali',Community:'Al’umma','Ghana Care':'Aikin Ghana'},
yo:{Home:'Ilé',Radio:'Redio',Sermons:'Ìwàásù',Programs:'Àwọn ètò',Schedule:'Àkókò',Community:'Àwùjọ','Ghana Care':'Ìtọ́jú Ghana'},
ig:{Home:'Ụlọ',Radio:'Redio',Sermons:'Okwuchukwu',Programs:'Mmemme',Schedule:'Nhazi oge',Community:'Obodo','Ghana Care':'Nlekọta Ghana'},
sw:{Home:'Nyumbani',Radio:'Redio',Sermons:'Mahubiri',Programs:'Vipindi',Schedule:'Ratiba',Community:'Jamii','Ghana Care':'Mradi wa Ghana','Member sign in':'Wanachama','Give & support':'Toa'},
am:{Home:'መነሻ',Radio:'ሬዲዮ',Sermons:'ስብከቶች',Programs:'ፕሮግራሞች',Schedule:'መርሐ ግብር',Community:'ማህበረሰብ','Ghana Care':'የጋና ፕሮጀክት'},
so:{Home:'Hoyga',Radio:'Raadiyo',Sermons:'Khudbado',Programs:'Barnaamijyo',Schedule:'Jadwal',Community:'Bulsho','Ghana Care':'Mashruuca Ghana'},
zu:{Home:'Ikhaya',Radio:'Umsakazo',Sermons:'Izintshumayelo',Programs:'Izinhlelo',Schedule:'Uhlelo',Community:'Umphakathi','Ghana Care':'Iphrojekthi yaseGhana'},
xh:{Home:'Ikhaya',Radio:'Irediyo',Sermons:'Iintshumayelo',Programs:'Iinkqubo',Schedule:'Ishedyuli',Community:'Uluntu','Ghana Care':'Iprojekthi yaseGhana'},
af:{Home:'Tuis',Radio:'Radio',Sermons:'Preke',Programs:'Programme',Schedule:'Skedule',Community:'Gemeenskap','Ghana Care':'Ghana-projek'}
};
const rtl=new Set(['ar']);
function translateNav(code){
 document.documentElement.lang=code;document.documentElement.dir=rtl.has(code)?'rtl':'ltr';
 document.querySelectorAll('a,button,summary').forEach(el=>{const raw=el.dataset.jhOriginal||el.textContent.trim();if(!el.dataset.jhOriginal)el.dataset.jhOriginal=raw;const m=words[code];el.textContent=(m&&m[raw])||raw});
 const full=document.getElementById('jhFullTranslate');if(full){if(code==='en'){full.hidden=true}else{full.hidden=false;const u=new URL('https://translate.google.com/translate');u.searchParams.set('sl','auto');u.searchParams.set('tl',code);u.searchParams.set('u',location.href);full.href=u.toString();}}
 try{localStorage.setItem('jh-lang-v11',code)}catch{}
}
function theme(t){document.documentElement.dataset.jhTheme=t;document.documentElement.dataset.theme=t==='espresso'?'espresso':'cream';try{localStorage.setItem('jh-theme-v11',t)}catch{};const b=document.getElementById('jhTheme');if(b)b.textContent=t==='espresso'?'☀ Cream':'◐ Brown'}
function mount(){
 let select=document.getElementById('jhLang'), toggle=document.getElementById('jhTheme'), full=document.getElementById('jhFullTranslate');
 if(!select||!toggle){
   const bar=document.createElement('div');bar.className='jh-expbar';bar.setAttribute('aria-label','Display preferences');
   if(!select){select=document.createElement('select');select.id='jhLang';select.setAttribute('aria-label','Display language');for(const [v,n] of langs){const o=document.createElement('option');o.value=v;o.textContent=n;select.append(o)}bar.append(select)}
   if(!toggle){toggle=document.createElement('button');toggle.type='button';toggle.id='jhTheme';bar.append(toggle)}
   full=document.createElement('a');full.id='jhFullTranslate';full.target='_blank';full.rel='noopener';full.textContent='Full page ↗';bar.append(full);document.body.append(bar);
 }else if(!full){full=document.createElement('a');full.id='jhFullTranslate';full.target='_blank';full.rel='noopener';full.textContent='Full page ↗';select.parentElement?.append(full)}
 const savedTheme=(()=>{try{return localStorage.getItem('jh-theme-v11')}catch{return null}})()||'cream';theme(savedTheme);
 toggle.onclick=()=>theme(document.documentElement.dataset.jhTheme==='espresso'?'cream':'espresso');
 const savedLang=(()=>{try{return localStorage.getItem('jh-lang-v11')}catch{return null}})()||'en';if([...select.options].some(o=>o.value===savedLang))select.value=savedLang;translateNav(select.value);select.onchange=()=>translateNav(select.value);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();