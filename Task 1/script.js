// Simple slider + dots + autoplay
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const dotsContainer = document.getElementById('dots');
  const yearSpan = document.getElementById('year');

  yearSpan.textContent = new Date().getFullYear();

  // build dots
  slides.forEach((s,i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i===0 ? ' active' : '');
    d.dataset.index = i;
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  });

  let current = 0;
  let autoplay = true;
  let timer = null;
  const AUTOPLAY_INTERVAL = 5000;

  function setActive(idx) {
    slides.forEach((s,i)=> {
      s.classList.toggle('active', i===idx);
    });
    document.querySelectorAll('.dot').forEach((d,i)=> d.classList.toggle('active', i===idx));
  }

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    setActive(current);
    resetTimer();
  }

  function nextSlide(){ goTo(current+1) }
  function prevSlide(){ goTo(current-1) }

  function resetTimer(){
    if(timer) clearInterval(timer);
    if(autoplay) timer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  // wire controls
  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  // start autoplay
  resetTimer();

  // pause on hover
  const slider = document.getElementById('slider');
  slider.addEventListener('mouseenter', ()=> { autoplay=false; clearInterval(timer) });
  slider.addEventListener('mouseleave', ()=> { autoplay=true; resetTimer() });

  // mobile menu toggle
  const mob = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('nav');
  mob.addEventListener('click', ()=> {
    if(nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });

  // lazy image loading: add loading attr
  document.querySelectorAll('.slide img, .game-card img').forEach(img => img.setAttribute('loading', 'lazy'));
});
