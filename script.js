const root=document.documentElement;
const toggle=document.getElementById('themeToggle');
const icon=document.getElementById('themeIcon');
const stored=localStorage.getItem('mgc-theme');
const systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
function setTheme(theme){
  root.dataset.theme=theme;
  if(icon) icon.textContent=theme==='dark'?'☾':'☼';
  toggle?.setAttribute('aria-pressed',String(theme==='dark'));
  localStorage.setItem('mgc-theme',theme);
  window.dispatchEvent(new CustomEvent('mgc-theme-change',{detail:{theme}}));
}
setTheme(stored || (systemDark?'dark':'light'));
toggle?.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
toggle?.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));
const menu=document.getElementById('menuToggle');
const nav=document.querySelector('.desktop-nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰';});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰';}));
document.getElementById('year').textContent=new Date().getFullYear();

// Waterfall scroll progress and reveal-on-scroll motion.
const updateWaterfall=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;document.documentElement.style.setProperty('--scroll-progress',String(max>0?window.scrollY/max:0));};window.addEventListener('scroll',updateWaterfall,{passive:true});updateWaterfall();
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.reveal-section').forEach(section=>revealObserver.observe(section));
// Subtle cursor tilt on the portrait and capability cards.
if(window.matchMedia('(pointer:fine)').matches){document.querySelectorAll('.portrait-frame,.capability-card').forEach(card=>{card.addEventListener('pointermove',event=>{const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-2px)`;});card.addEventListener('pointerleave',()=>card.style.transform='');});}
// The cartoon guide responds to section, card and link interactions.
const mascot=document.getElementById('businessMascot'),bubble=document.getElementById('mascotBubble'),mascotButton=document.getElementById('mascotToggle');let promptIndex=0,mascotTimer;const prompts=['A clear plan turns an idea into progress.','Strong teams make ambitious projects achievable.','Good operations keep every moving part in sync.','Let’s turn the next opportunity into a result.'];function celebrate(message){if(!mascot)return;bubble.textContent=message||prompts[promptIndex++%prompts.length];mascot.classList.add('show-bubble','is-excited');clearTimeout(mascotTimer);mascotTimer=setTimeout(()=>mascot.classList.remove('show-bubble','is-excited'),2600);}mascotButton?.addEventListener('click',()=>celebrate('Hello! I’m your MGC project guide. Explore the portfolio and let’s connect.'));document.querySelectorAll('a[href^="#"],.capability-card,.timeline-item,.education-item,.contact-grid>a,.contact-location').forEach(el=>el.addEventListener('click',()=>{el.classList.remove('is-active');void el.offsetWidth;el.classList.add('is-active');const title=el.querySelector('h3')?.textContent||el.closest('section')?.querySelector('h2')?.textContent?.replace(/\s+/g,' ').trim();celebrate(title?`Exploring ${title}. Every strong result starts with a good plan.`:undefined);setTimeout(()=>el.classList.remove('is-active'),800);}));
