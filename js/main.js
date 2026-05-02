/* =============================================
   NACHIMO CONTRACTORS LTD — Main JavaScript
   Engineered by Dw33pY
   ============================================= */

gsap.registerPlugin(ScrollTrigger);

/* ——— CUSTOM CURSOR ——— */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower || window.innerWidth < 1024) {
    if (cursor) cursor.style.display = 'none';
    if (follower) follower.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    gsap.to(cursor, { left: mouseX, top: mouseY, duration: 0.15, ease: 'power2.out' });
    gsap.to(follower, { left: mouseX, top: mouseY, duration: 0.35, ease: 'power2.out' });
  });

  function bindCursorHovers() {
    const targets = document.querySelectorAll('a, button, .service-card, .team-card, .bento-item, .contact-info-card, input, textarea, select');
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 0.5, duration: 0.3 });
        gsap.to(follower, { scale: 2, borderColor: 'rgba(200,150,58,0.4)', duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { scale: 1, borderColor: 'rgba(200,150,58,0.6)', duration: 0.3 });
      });
    });
  }
  bindCursorHovers();
}

/* ——— MAGNETIC BUTTONS ——— */
function initMagnetic() {
  if (window.innerWidth < 1024) return;
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* ——— PRELOADER ——— */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) { document.body.classList.remove('no-scroll'); initPageAnimations(); return; }

  const chars = preloader.querySelectorAll('.preloader__char');
  const line = preloader.querySelector('.preloader__line');
  const sub = preloader.querySelector('.preloader__sub');

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(preloader, { opacity: 0, duration: 0.5, onComplete: () => {
        preloader.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');
        initPageAnimations();
      }});
    }
  });

  tl.to(chars, { y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' })
    .to(line, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
    .to(sub, { opacity: 1, duration: 0.4 }, '-=0.2')
    .to({}, { duration: 0.6 });
}

/* ——— PAGE ANIMATIONS ——— */
function initPageAnimations() {
  initHeroAnimations();
  initScrollReveals();
  initCounters();
  initImageReveals();
  initMagnetic();
  // Crucial: Refresh ScrollTrigger after all DOM manipulations and inits
  setTimeout(() => ScrollTrigger.refresh(), 100);
}

/* ——— HERO ANIMATIONS ——— */
function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const tl = gsap.timeline({ delay: 0.1 });
    const overline = hero.querySelector('.hero__overline');
    if (overline) tl.to(overline, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    const lines = hero.querySelectorAll('.hero__title .line-inner');
    if (lines.length) tl.to(lines, { y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, '-=0.25');
    const desc = hero.querySelector('.hero__desc');
    if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45');
    const actions = hero.querySelector('.hero__actions');
    if (actions) tl.to(actions, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    const badge = hero.querySelector('.hero__badge');
    if (badge) tl.to(badge, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');
    const bg = hero.querySelector('.hero__bg img');
    if (bg) gsap.to(bg, { yPercent: 15, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    const tl = gsap.timeline({ delay: 0.1 });
    const lines = pageHero.querySelectorAll('.page-hero__title .line-inner');
    if (lines.length) tl.to(lines, { y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' });
    const bc = pageHero.querySelector('.page-hero__breadcrumb');
    if (bc) tl.from(bc, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '-=0.35');
  }
}

/* ——— SCROLL REVEALS ——— */
function initScrollReveals() {
  const revealConfig = [
    { sel: '.reveal', from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } },
    { sel: '.reveal-left', from: { opacity: 0, x: -40 }, to: { opacity: 1, x: 0 } },
    { sel: '.reveal-right', from: { opacity: 0, x: 40 }, to: { opacity: 1, x: 0 } }
  ];
  
  revealConfig.forEach(({ sel, from, to }) => {
    document.querySelectorAll(sel).forEach(el => {
      gsap.fromTo(el, from, { ...to, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
    });
  });

  document.querySelectorAll('.clip-reveal').forEach(el => {
    gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
  });

  // Stagger groups (Fixed to ensure items don't get stuck invisible)
  document.querySelectorAll('[data-stagger]').forEach(group => {
    gsap.fromTo(group.children, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: group, start: 'top 82%', toggleActions: 'play none none none' } }
    );
  });
}

/* ——— IMAGE REVEALS ——— */
function initImageReveals() {
  document.querySelectorAll('.img-reveal').forEach(wrapper => {
    const cover = wrapper.querySelector('.img-reveal__cover');
    if (!cover) return;
    ScrollTrigger.create({
      trigger: wrapper, start: 'top 80%', once: true,
      onEnter: () => {
        gsap.to(cover, { scaleX: 0, duration: 0.9, ease: 'power3.inOut', onComplete: () => {
          wrapper.classList.add('is-revealed');
          cover.remove();
        }});
      }
    });
  });
}

/* ——— STATS COUNTER ——— */
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, { val: target, duration: 2.2, ease: 'power2.out', onUpdate() { el.textContent = Math.round(this.targets()[0].val) + suffix; } });
      }
    });
  });
}

/* ——— NAVBAR ——— */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => { navbar.classList.toggle('is-scrolled', window.scrollY > 50); }, { passive: true });
}

/* ——— MOBILE MENU ——— */
function initMobileMenu() {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  const links = menu.querySelectorAll('.mobile-menu__link');
  const cta = menu.querySelector('.mobile-menu__cta');
  const info = menu.querySelector('.mobile-menu__info');
  let open = false;

  function toggle() {
    open = !open;
    btn.classList.toggle('is-active', open);
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('no-scroll', open);
    if (open) {
      gsap.fromTo(links, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.15 });
      if (cta) gsap.fromTo(cta, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.45 });
      if (info) gsap.fromTo(info, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.6 });
    } else {
      gsap.set([...links, cta, info].filter(Boolean), { opacity: 0, y: 30 });
    }
  }

  btn.addEventListener('click', toggle);
  links.forEach(l => l.addEventListener('click', () => { if (open) toggle(); }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) toggle(); });
}

/* ——— BACK TO TOP ——— */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => { btn.classList.toggle('is-visible', window.scrollY > 500); }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ——— SMOOTH SCROLL ——— */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#' || !id) return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
    });
  });
}

/* ——— FAQ ACCORDION ——— */
function initFAQ() {
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(i => i.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });
}

/* ——— SERVICE FILTER ——— */
function initServiceFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const serviceItems = document.querySelectorAll('.service-detail');
  if (!filterBtns.length || !serviceItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('is-active', 'btn--primary'); b.classList.add('btn--outline-dark'); });
      btn.classList.add('is-active', 'btn--primary');
      btn.classList.remove('btn--outline-dark');

      const filter = btn.dataset.filter;

      serviceItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) {
          item.style.display = 'grid';
          gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        } else {
          gsap.to(item, { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in', onComplete: () => { item.style.display = 'none'; } });
        }
      });

      setTimeout(() => ScrollTrigger.refresh(), 600);
    });
  });
}

/* ——— CONTACT FORM ——— */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const fields = form.querySelectorAll('[required]');
    let valid = true;

    fields.forEach(f => {
      if (!f.value.trim()) {
        valid = false;
        f.style.borderColor = '#dc3545';
        f.addEventListener('input', () => { f.style.borderColor = ''; }, { once: true });
      }
    });

    if (!valid) { showToast('Please fill in all required fields.'); return; }

    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:0.5rem;">Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast('Message sent successfully! We\'ll get back to you shortly.');
      form.reset();
      submitBtn.innerHTML = origText;
      submitBtn.disabled = false;
    }, 1800);
  });
}

/* ——— TOAST ——— */
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('is-visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
}

/* ——— INIT ——— */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('no-scroll');
  initPreloader();
  initCursor();
  initNavbar();
  initMobileMenu();
  initBackToTop();
  initSmoothScroll();
  initFAQ();
  initServiceFilter();
  initContactForm();
});

// Safety net: Refresh ScrollTrigger on window load to fix any late-layout-shift issues
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});