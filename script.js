// ============================================
// FLOATING PETALS / HEARTS
// ============================================
const petalContainer = document.getElementById('petals');
const petalEmojis = ['💗', '💕', '🌸', '💖'];

function spawnPetal(){
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

  const startX = Math.random() * 100; // vw
  const driftX = (Math.random() * 120 - 60) + 'px';
  const duration = 9 + Math.random() * 8; // seconds
  const size = 0.8 + Math.random() * 1.1;

  petal.style.left = startX + 'vw';
  petal.style.setProperty('--drift-x', driftX);
  petal.style.animationDuration = duration + 's';
  petal.style.fontSize = size + 'rem';

  petalContainer.appendChild(petal);

  setTimeout(() => petal.remove(), duration * 1000 + 200);
}

// gentle, not overwhelming
setInterval(spawnPetal, 900);
for (let i = 0; i < 6; i++){
  setTimeout(spawnPetal, i * 300);
}

// ============================================
// SCROLL REVEAL
// ============================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================
// ENVELOPE + TYPEWRITER LETTER
// ============================================
const envelope = document.getElementById('envelope');
const envelopeHint = document.getElementById('envelopeHint');
const letterTextEl = document.getElementById('letterText');

const loveLetter = "Hi my love Happy monthsary dali ra kaayo parang gahapon lang nag anniversary ta, I love you so much my love thank youu always sa imong pag love nako sa imong pag care, you are a good girlfriend to me my love no more drama muna ngayon, but I promise babawi talaga ako sayo lovelove. Happy monthsary my love I love youu so much 💖💕";

let hasOpened = false;
let hasTyped = false;

function typeLetter(text, el, speed = 32){
  const chars = Array.from(text); // handles emoji safely
  let i = 0;
  el.textContent = '';
  const cursor = setInterval(() => {
    el.textContent += chars[i];
    i++;
    if (i >= chars.length){
      clearInterval(cursor);
    }
  }, speed);
}

function openEnvelope(){
  if (hasOpened) return;
  hasOpened = true;
  envelope.classList.add('open');
  envelopeHint.classList.add('hidden');

  setTimeout(() => {
    if (!hasTyped){
      hasTyped = true;
      typeLetter(loveLetter, letterTextEl);
    }
  }, 500);
}

envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') openEnvelope();
});
envelope.setAttribute('tabindex', '0');
envelope.setAttribute('role', 'button');
envelope.setAttribute('aria-label', 'Open the letter');
