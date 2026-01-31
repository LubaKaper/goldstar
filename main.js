/* ========================================
   GoldStar — Elevated JavaScript
   Cinematic Motion Design
   ======================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ----------------------------------------
   Initialize
   ---------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavigation();
  initHeroAnimations();
  initScrollAnimations();
  initDonateSelector();
  initSmoothScroll();
  initJupiterPopup();
  initCountUp();
});

/* ----------------------------------------
   Page Loader
   ---------------------------------------- */
function initLoader() {
  const loader = document.querySelector('.loader');
  const progress = document.querySelector('.loader__progress');

  if (!loader || !progress) return;

  document.body.classList.add('loading');

  // Simulate loading progress
  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 15;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);

      setTimeout(() => {
        loader.classList.add('loaded');
        document.body.classList.remove('loading');

        // Trigger hero animations after loader
        setTimeout(animateHero, 300);
      }, 300);
    }
    progress.style.width = width + '%';
  }, 100);
}

/* ----------------------------------------
   Custom Cursor
   ---------------------------------------- */
function initCursor() {
  // Check for touch device
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch');
    return;
  }

  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor animation
  function animateCursor() {
    // Cursor follows mouse exactly
    cursorX = mouseX;
    cursorY = mouseY;

    // Follower has slight delay
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .card, .step, .tier');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ----------------------------------------
   Navigation
   ---------------------------------------- */
function initNavigation() {
  const nav = document.querySelector('.nav');

  if (!nav) return;

  // Scroll detection
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

/* ----------------------------------------
   Hero Animations
   ---------------------------------------- */
function initHeroAnimations() {
  // Initial states are set, animations will trigger after loader
}

function animateHero() {
  const tl = gsap.timeline({
    defaults: {
      ease: 'expo.out'
    }
  });

  // Animate title words
  tl.to('.hero__title-word', {
    y: 0,
    duration: 1.4,
    stagger: 0.1
  })
    .to('.hero__label', {
      opacity: 1,
      y: 0,
      duration: 1
    }, '-=1')
    .to('.hero__tagline', {
      opacity: 1,
      y: 0,
      duration: 1
    }, '-=0.8')
    .to('.hero__ctas', {
      opacity: 1,
      y: 0,
      duration: 1
    }, '-=0.7')
    .to('.stat', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1
    }, '-=0.5')
    .to('.hero__scroll', {
      opacity: 1,
      duration: 0.6
    }, '-=0.3');

  // Start counting after stats are visible
  setTimeout(() => {
    document.querySelectorAll('.stat__number').forEach(startCountUp);
  }, 1000);
}

/* ----------------------------------------
   Scroll Animations
   ---------------------------------------- */
function initScrollAnimations() {
  // Process steps
  gsap.utils.toArray('.step').forEach((step, i) => {
    gsap.to(step, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Recognition cards with stagger
  ScrollTrigger.batch('.card', {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out'
      });
    },
    start: 'top 85%'
  });

  // Wall CTA
  gsap.to('.wall__cta', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.wall__cta',
      start: 'top 90%'
    }
  });

  // Tier cards
  gsap.utils.toArray('.tier').forEach((tier, i) => {
    gsap.to(tier, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: tier,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Donate section
  gsap.to('.donate__subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.donate__subtitle',
      start: 'top 85%'
    }
  });

  gsap.to('.donate__selector', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.donate__selector',
      start: 'top 85%'
    }
  });

  // Story section
  gsap.utils.toArray('.story__text > *').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    });
  });

  gsap.to('.story__visual', {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.story__visual',
      start: 'top 80%'
    }
  });

  // Section headers
  gsap.utils.toArray('.section__eyebrow, .section__title').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    });
  });
}

/* ----------------------------------------
   Count Up Animation
   ---------------------------------------- */
function initCountUp() {
  // Count up is triggered from animateHero
}

function startCountUp(element) {
  const target = parseInt(element.dataset.value);
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(start + (target - start) * eased);

    element.textContent = formatNumber(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* ----------------------------------------
   Donate Selector
   ---------------------------------------- */
function initDonateSelector() {
  const options = document.querySelectorAll('.donate__option');

  options.forEach(option => {
    option.addEventListener('click', function () {
      options.forEach(opt => opt.classList.remove('donate__option--active'));
      this.classList.add('donate__option--active');

      // Add subtle scale animation
      gsap.fromTo(this,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    });
  });
}

/* ----------------------------------------
   Smooth Scroll
   ---------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);

      if (target) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ----------------------------------------
   JupiterEd Popup (Submit Grades)
   ---------------------------------------- */
function initJupiterPopup() {
  const button = document.querySelector('#submit-grades-btn');
  const status = document.querySelector('#jupiter-status');

  if (!button || !status) return;

  button.addEventListener('click', (e) => {
    e.preventDefault();

    const width = 480;
    const height = 720;
    const dualScreenLeft = window.screenX !== undefined ? window.screenX : window.screenLeft;
    const dualScreenTop = window.screenY !== undefined ? window.screenY : window.screenTop;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
    const left = Math.max(0, dualScreenLeft + (viewportWidth - width) / 2);
    const top = Math.max(0, dualScreenTop + (viewportHeight - height) / 2);

    const features = `popup=yes,width=${width},height=${height},left=${Math.round(left)},top=${Math.round(top)},noopener,noreferrer`;
    const popup = window.open('https://login.jupitered.com/login/', 'jupiteredLogin', features);

    status.classList.remove('jupiter-status--error', 'jupiter-status--success');

    if (!popup) {
      status.textContent = 'Popup blocked. Please allow popups and try again.';
      status.classList.add('jupiter-status--error');
      return;
    }

    status.textContent = 'JupiterEd login opened in a popup window (demo).';
    status.classList.add('jupiter-status--success');
    popup.focus?.();
  });
}

/* ----------------------------------------
   Magnetic Buttons (Optional Enhancement)
   ---------------------------------------- */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(this, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', function () {
      gsap.to(this, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

/* ----------------------------------------
   Parallax Effects
   ---------------------------------------- */
function initParallax() {
  gsap.utils.toArray('.floating-star').forEach(star => {
    gsap.to(star, {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
}

// Initialize parallax after page load
window.addEventListener('load', () => {
  initParallax();
  initMagneticButtons();
});

/* ----------------------------------------
   Utility Functions
   ---------------------------------------- */
function debounce(func, wait = 20) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ----------------------------------------
   Export for modules
   ---------------------------------------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initLoader,
    initCursor,
    initNavigation,
    initHeroAnimations,
    initScrollAnimations,
    initDonateSelector,
    initSmoothScroll
  };
}
