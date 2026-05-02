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

/* ——— SERVICE MODAL DATA & LOGIC ——— */
const servicesData = {
  // 8 Main Categories from Image
  'plumbing': { title: 'Plumbing Services', desc: 'Comprehensive plumbing solutions for residential and commercial properties. We ensure reliable water systems and faultless installations.', list: ['Water Supply Systems', 'Pipe Fitting', 'Sanitary Installation', 'Leak Detection'] },
  'maintenance': { title: 'General Maintenance', desc: 'Property upkeep and rapid repairs to keep your premises in top condition year-round.', list: ['Renovations & Upgrades', 'Wall Repairs', 'Flooring', 'Fixture Replacement'] },
  'int-ext-design': { title: 'Interior & Exterior Design', desc: 'Elevate your spaces with our bespoke design services, blending aesthetics with functionality.', list: ['Space Planning', 'Colour Consultation', 'Decorative Finishes', 'Furniture Selection'] },
  'landscaping-main': { title: 'Landscaping Services', desc: 'Transform your outdoor spaces with our comprehensive landscaping solutions, from concept to completion.', list: ['Garden Design', 'Hardscaping', 'Irrigation Systems', 'Tree Services', 'Water Features', 'Artificial Turf', 'Desert Landscaping', 'Garden Drainage'] },
  'engineering': { title: 'Engineering & Fabrication', desc: 'Robust structural solutions and custom metalwork built to last.', list: ['Structural Works', 'Metal Fabrication', 'Welding Services', 'Custom Gates'] },
  'staircases': { title: 'Staircases, Balustrades & Balconies', desc: 'Premium installations that combine safety with striking visual appeal.', list: ['Design & Installation', 'Glass Balustrades', 'Steel Balconies', 'Handrails'] },
  'roofing': { title: 'Roofing Services', desc: 'Durable roofing solutions to protect your property from the elements.', list: ['New Roofs', 'Roof Repairs', 'Guttering', 'Waterproofing'] },
  'painting': { title: 'Painting & Decorating', desc: 'Flawless finishes that bring your interior and exterior walls to life.', list: ['Interior Painting', 'Exterior Painting', 'Wallpapering', 'Surface Preparation'] },

  // 20 Specific Landscaping Services
  'landscape-gardener': { title: 'Landscape Gardener', desc: 'Our professional landscape gardening services transform your outdoor spaces into lush, functional environments. We handle everything from soil preparation and planting to ongoing maintenance, ensuring your garden thrives in Kenya\'s unique climate.' },
  'artificial-turf': { title: 'Artificial Turf Installation', desc: 'High-quality synthetic grass solutions for residential, commercial, and recreational spaces. Our artificial turf looks natural year-round, requires minimal maintenance, saves water, and provides a durable surface perfect for families and pets.' },
  'concrete-masonry': { title: 'Concrete Masonry', desc: 'Expert concrete work and masonry services including foundations, retaining walls, decorative pathways, and custom stonework. We use premium mixes and reinforced techniques built to withstand the test of time.' },
  'desert-landscaping': { title: 'Desert Landscaping', desc: 'Water-wise, drought-tolerant landscaping solutions tailored for arid regions. We specialize in xeriscaping, succulent gardens, rock gardens, and efficient irrigation that minimizes water usage without compromising beauty.' },
  'driveway-landscaping': { title: 'Driveway Landscaping', desc: 'Enhance your property\'s entrance with professional driveway landscaping. We integrate green borders, decorative stone, lighting, and drainage solutions to create an impressive and functional arrival experience.' },
  'path-paving': { title: 'Driveway or Path Paving', desc: 'Professional paving with quality finishes. We install block paving, natural stone, concrete slabs, and resin-bound surfaces. Proper base preparation ensures your paths and driveways remain level and crack-free for years.' },
  'garden-decorating': { title: 'Garden Decorating', desc: 'Add charm and character to your garden with our decorating services. From water features and sculptures to ambient lighting and outdoor furniture arrangements, we create spaces you\'ll love to spend time in.' },
  'garden-design': { title: 'Garden Design', desc: 'Bespoke garden designs tailored for you. Our designers create detailed plans including 3D visualizations, plant palettes suited to your microclimate, and hardscape layouts that maximize your outdoor living potential.' },
  'garden-drainage': { title: 'Garden Drainage', desc: 'Effective drainage solutions for waterlogging. We install French drains, soakaways, channel drains, and grading solutions to protect your property from water damage and keep your garden usable year-round.' },
  'gardening-services': { title: 'Gardening Services', desc: 'Complete professional gardening care. Our team provides regular maintenance including pruning, weeding, mulching, pest control, and seasonal planting to keep your outdoor space looking its best.' },
  'garden-landscaping': { title: 'Garden Landscaping', desc: 'Full-service residential landscaping from concept to completion. We manage the entire transformation including earthworks, planting, hardscaping, and irrigation systems.' },
  'garden-levelling': { title: 'Garden Levelling', desc: 'Professional land levelling for any terrain. We use laser-guided grading equipment to create perfectly level lawns, terraces, and building pads, ensuring proper water runoff and a solid foundation.' },
  'grading-resloping': { title: 'Grading and Resloping', desc: 'Land grading for optimal drainage and usability. We reshape your land to direct water away from structures, prevent erosion, and create the ideal topography for your landscaping plans.' },
  'grass-seeding': { title: 'Grass Seeding', desc: 'Premium grass seeding and turf laying. We prepare the soil, select the right grass varieties for your shade/sun conditions, and install lush, weed-free lawns that establish quickly.' },
  'green-landscaping': { title: 'Green Landscaping', desc: 'Eco-friendly sustainable planting practices. We prioritize native species, organic fertilizers, water conservation, and habitats that support local biodiversity, creating beautiful spaces that respect the environment.' },
  'hardscaping': { title: 'Hardscaping', desc: 'Patios, walkways, walls and outdoor features built to last. We work with natural stone, brick, concrete, and timber to create functional outdoor living areas that complement your home\'s architecture.' },
  'landscape-design': { title: 'Landscape Design', desc: 'Customised landscape design from concept to life. Our design process includes site analysis, conceptual drawings, and detailed planting plans, ensuring every element works together harmoniously.' },
  'lawn-care': { title: 'Lawn Care', desc: 'Comprehensive lawn care and mowing services. We offer seasonal fertilisation, aeration, scarification, weed control, and professional mowing to maintain a pristine, healthy lawn.' },
  'water-features': { title: 'Outdoor Water Feature Design', desc: 'Fountains, ponds, waterfalls and streams designed to create serene outdoor spaces. We handle the full installation including pumps, filtration, and waterproofing for low-maintenance enjoyment.' },
  'tree-removal': { title: 'Tree Removal & Trimming', desc: 'Safe and professional tree services. Our arborists handle hazardous removals, crown thinning, shaping, and stump grinding, maintaining the health and safety of your property.' }
};

function initServiceModals() {
  const overlay = document.getElementById('serviceModal');
  const closeBtn = document.getElementById('modalClose');
  if (!overlay || !closeBtn) return;

  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDesc');
  const listEl = document.getElementById('modalList');

  // Open Modal
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.dataset.modal;
      const data = servicesData[key];
      if (data) {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        
        // Handle sub-lists for main categories
        if (listEl) listEl.innerHTML = '';
        if (data.list && listEl) {
          data.list.forEach(item => {
            const div = document.createElement('div');
            div.className = 'modal-sublist-item';
            div.textContent = item;
            listEl.appendChild(div);
          });
        }
        
        overlay.classList.add('is-active');
        document.body.classList.add('no-scroll');
      }
    });
  });

  // Close Modal
  const closeModal = () => {
    overlay.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  };
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('is-active')) closeModal(); });
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
  initServiceModals();
});

// Safety net: Refresh ScrollTrigger on window load to fix any late-layout-shift issues
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});