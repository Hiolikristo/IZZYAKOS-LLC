/* JHPM prototype: navigational, accessible and installable. No private data is collected. */
(()=>{
  const menuButton=document.getElementById('menuButton');
  const navLinks=document.getElementById('navLinks');
  menuButton?.addEventListener('click',()=>{
    const isOpen=navLinks.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded',String(isOpen));
    menuButton.setAttribute('aria-label',isOpen?'Close menu':'Open menu');
  });
  navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    navLinks.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');
  }));
  const chips=[...document.querySelectorAll('.filter-chip')];
  const cards=[...document.querySelectorAll('.social-card')];
  chips.forEach(chip=>chip.addEventListener('click',()=>{
    const filter=chip.dataset.filter;
    chips.forEach(c=>{const active=c===chip;c.classList.toggle('selected',active);c.setAttribute('aria-pressed',String(active));});
    cards.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;});
  }));
  let installPrompt; const installButton=document.getElementById('installButton');
  const toast=document.getElementById('toast');let toastTimer;
  const notify=message=>{toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),6200)};
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installButton.hidden=false;});
  window.addEventListener('appinstalled',()=>{installPrompt=null;notify('App preview installed. Live bookings and push notifications are not yet connected.');installButton.textContent='App installed ✓'});
  installButton?.addEventListener('click',async()=>{
    if(installPrompt){const prompt=installPrompt;installPrompt=null;await prompt.prompt();return;}
    notify('To install: open your browser menu and choose “Install app” or “Add to Home Screen.” Requires a secure HTTPS deployment.');
  });
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)){
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
})();