/* ========================================
   MANYI'S TASTY RESTAURANT — ANIMATIONS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- NAVBAR SCROLL ---
  const nav = document.getElementById('navbar');
  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // --- MOBILE MENU ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- SCROLL REVEAL ANIMATIONS ---
  const animatedElements = document.querySelectorAll('[data-animate]');

  animatedElements.forEach(el => {
    const inHero = el.closest('.hero');
    if (inHero) return;
    el.classList.add('anim-ready');
  });

  function revealElement(el) {
    if (el.classList.contains('visible')) return;
    const delay = parseFloat(el.dataset.delay) || 0;
    setTimeout(() => el.classList.add('visible'), delay * 1000);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealElement(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.01,
    rootMargin: '50px 0px 50px 0px'
  });

  const nonHeroElements = [];
  animatedElements.forEach(el => {
    if (!el.closest('.hero')) {
      revealObserver.observe(el);
      nonHeroElements.push(el);
    }
  });

  function scrollFallback() {
    nonHeroElements.forEach(el => {
      if (el.classList.contains('visible')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 50) {
        revealElement(el);
        revealObserver.unobserve(el);
      }
    });
  }
  window.addEventListener('scroll', scrollFallback, { passive: true });
  scrollFallback();

  // --- COUNTER ANIMATION ---
  const counters = document.querySelectorAll('[data-count]');
  let countersDone = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersDone) {
        countersDone = true;
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.count, 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 45));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = current;
          }, 30);
        });
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // --- HERO ENTRANCE ---
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.cssText = 'opacity:0;transform:translateY(25px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1)';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }

  const heroScroll = document.querySelector('.hero-scroll');
  if (heroScroll) {
    heroScroll.style.opacity = '0';
    setTimeout(() => {
      heroScroll.style.transition = 'opacity 1s ease';
      heroScroll.style.opacity = '1';
    }, 1200);
  }

  // --- PARALLAX HERO BACKGROUND ---
  const heroBgImg = document.querySelector('.hero-bg-img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroBgImg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  // --- COOKIE BANNER ---
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 1500);
    document.getElementById('cookieAccept')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'all');
      cookieBanner.classList.remove('visible');
    });
    document.getElementById('cookieDecline')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'essential');
      cookieBanner.classList.remove('visible');
    });
  }

});
