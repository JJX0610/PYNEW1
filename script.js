// 首页轮播图：负责自动播放、左右切换和分页指示器
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.carousel-dot')];
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const carousel = document.querySelector('.carousel');
let currentSlide = 0;
let timer;

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function startCarousel() {
  if (!carousel || !slides.length) return;
  timer = window.setInterval(() => showSlide(currentSlide + 1), 5000);
}

function resetCarousel() {
  window.clearInterval(timer);
  startCarousel();
}

prevButton?.addEventListener('click', () => { showSlide(currentSlide - 1); resetCarousel(); });
nextButton?.addEventListener('click', () => { showSlide(currentSlide + 1); resetCarousel(); });
dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); resetCarousel(); }));
carousel?.addEventListener('mouseenter', () => window.clearInterval(timer));
carousel?.addEventListener('mouseleave', startCarousel);

showSlide(0);
startCarousel();
