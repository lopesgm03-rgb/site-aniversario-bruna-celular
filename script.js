const slides = [...document.querySelectorAll('.slide')];
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const counter = document.querySelector('#counter');
const progress = document.querySelector('#progress');
let current = 0;

function show(index) {
  if (index < 0 || index >= slides.length || index === current) return;
  slides[current].classList.remove('active');
  slides[current].classList.toggle('exit', index > current);
  current = index;
  slides[current].classList.remove('exit');
  slides[current].classList.add('active');
  updateUI();
}

function updateUI() {
  counter.textContent = `${current + 1} / ${slides.length}`;
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  prev.disabled = current === 0;
  next.disabled = current === slides.length - 1;
}

next.addEventListener('click', () => show(current + 1));
prev.addEventListener('click', () => show(current - 1));
document.querySelectorAll('.next').forEach(button => button.addEventListener('click', () => show(current + 1)));
document.querySelector('.replay').addEventListener('click', () => show(0));
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === ' ') show(current + 1);
  if (event.key === 'ArrowLeft') show(current - 1);
});

let touchX = 0;
document.addEventListener('touchstart', event => {
  touchX = event.changedTouches[0].screenX;
}, { passive: true });
document.addEventListener('touchend', event => {
  const delta = event.changedTouches[0].screenX - touchX;
  if (Math.abs(delta) > 55) show(current + (delta < 0 ? 1 : -1));
}, { passive: true });

updateUI();
