// Smooth scroll and active nav link highlight
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function onScroll() {
  let scrollPos = window.scrollY + 120;
  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', onScroll);

// Optional: Smooth scroll for nav links
navLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth',
      });
    }
  });
});

// Project slider logic with auto-loop
const slides = document.querySelectorAll('.project-slide');
const dots = document.querySelectorAll('.slider-dot');
const leftArrow = document.querySelector('.slider-arrow-left');
const rightArrow = document.querySelector('.slider-arrow-right');
let currentSlide = 0;
let autoSlideTimer = null;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
  currentSlide = idx;
  pauseAllVideos();
  const video = slides[currentSlide].querySelector('video');
  if (video) video.play();
}

function pauseAllVideos() {
  slides.forEach((slide, i) => {
    const video = slide.querySelector('video');
    if (video) {
      if (i === currentSlide) {
        // do nothing
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  });
}

function nextSlide() {
  let idx = (currentSlide + 1) % slides.length;
  showSlide(idx);
}
function prevSlide() {
  let idx = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(idx);
}

function startAutoSlide() {
  if (autoSlideTimer) clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(nextSlide, 5000);
}
function resetAutoSlide() {
  startAutoSlide();
}

if (leftArrow && rightArrow) {
  leftArrow.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
  rightArrow.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
}
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { showSlide(i); resetAutoSlide(); });
});
showSlide(0);
startAutoSlide();

// Vertical slider logic
const vSlides = document.querySelectorAll('.vertical-slide');
const vDots = document.querySelectorAll('.vslider-dot');
const upArrow = document.querySelector('.vslider-arrow-up');
const downArrow = document.querySelector('.vslider-arrow-down');
let vCurrent = 0;

function showVSlide(idx) {
  vSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
  vDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
  vCurrent = idx;
}
function pauseVids() {
  vSlides.forEach((slide, i) => {
    const video = slide.querySelector('video');
    if (video) {
      if (i === vCurrent) {
        // do nothing
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  });
}
upArrow.addEventListener('click', () => {
  let idx = (vCurrent - 1 + vSlides.length) % vSlides.length;
  showVSlide(idx); pauseVids();
});
downArrow.addEventListener('click', () => {
  let idx = (vCurrent + 1) % vSlides.length;
  showVSlide(idx); pauseVids();
});
vDots.forEach((dot, i) => {
  dot.addEventListener('click', () => { showVSlide(i); pauseVids(); });
});
showVSlide(0);

// Swipe support for mobile
let startX = null, startY = null;
const wrapper = document.querySelector('.project-slides-wrapper');
if (wrapper) {
  wrapper.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  wrapper.addEventListener('touchend', e => {
    if (startX === null || startY === null) return;
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    if (Math.abs(endX - startX) > Math.abs(endY - startY)) {
      // horizontal swipe
      if (startX - endX > 50) { nextSlide(); resetAutoSlide(); }
      else if (endX - startX > 50) { prevSlide(); resetAutoSlide(); }
    }
    startX = null; startY = null;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('show');
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('show');
    });
  });
});
