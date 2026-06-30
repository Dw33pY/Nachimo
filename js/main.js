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
    const targets = document.querySelectorAll('a, button, .service-card, .team-card, .bento-item, .contact-info-card, input, textarea, select, [data-modal]');
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
  if (!preloader) {
    document.body.classList.remove('no-scroll');
    initPageAnimations();
    return;
  }
  
  const logo = preloader.querySelector('.preloader__logo');
  const line = preloader.querySelector('.preloader__line');
  const sub = preloader.querySelector('.preloader__sub');
  
  if (logo) gsap.set(logo, { opacity: 0, y: -20 });
  if (sub) gsap.set(sub, { opacity: 0 });
  
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          preloader.classList.add('is-hidden');
          document.body.classList.remove('no-scroll');
          initPageAnimations();
        }
      });
    }
  });
  
  if (logo) tl.to(logo, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
  if (line) tl.to(line, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.3');
  if (sub) tl.to(sub, { opacity: 1, duration: 0.4 }, '-=0.2');
  tl.to({}, { duration: 0.6 }); 
}

/* ——— PAGE ANIMATIONS ——— */
function initPageAnimations() {
  initHeroAnimations();
  initScrollReveals();
  initCounters();
  initImageReveals();
  initMagnetic();
  setTimeout(() => ScrollTrigger.refresh(), 100);
}

/* ——— HERO ANIMATIONS ——— */
function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const tl = gsap.timeline({ delay: 0.1 });
    const overline = hero.querySelector('.hero__overline');
    if (overline) tl.to(overline, { opacity: 1, duration: 0.6, ease: 'power2.out' });
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
    const lines = pageHero.querySelectorAll('.page-hero__title .line-inner');
    const bc = pageHero.querySelector('.page-hero__breadcrumb');
    
    if (lines.length) gsap.set(lines, { y: 110, opacity: 0 });
    if (bc) gsap.set(bc, { opacity: 0, y: 10 });
    
    const tl = gsap.timeline();
    if (lines.length) tl.to(lines, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' });
    if (bc) tl.fromTo(bc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');
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
    gsap.fromTo(el, 
      { clipPath: 'inset(100% 0 0 0)', opacity: 0 }, 
      { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
    );
  });

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
  'plumbing': { 
    title: 'Plumbing Services', 
    desc: 'Comprehensive plumbing solutions for residential, commercial and industrial properties. We deliver reliable water systems, professional installations, repairs and preventive maintenance to ensure your plumbing operates efficiently and safely.', 
    list: [
      { title: 'Water supply system installation', desc: 'Complete setup of main water lines ensuring steady, clean flow to your property.' },
      { title: 'Hot and cold water piping installation', desc: 'Expert routing and fitting of pipes for optimal temperature control and efficiency.' },
      { title: 'Drainage and sewer line installation', desc: 'Durable drainage systems designed to safely channel wastewater away from your property.' },
      { title: 'Plumbing design and consultation', desc: 'Professional planning and advisory services for efficient and code-compliant layouts.' },
      { title: 'Bathroom plumbing installation and renovation', desc: 'Modernizing and installing bathroom water systems, showers, and fixtures.' },
      { title: 'Kitchen plumbing installation', desc: 'Expert installation of sinks, dishwashers, and water supply for your kitchen.' },
      { title: 'Toilet (WC) installation and repairs', desc: 'Secure installation and rapid repair of toilet systems to prevent leaks.' },
      { title: 'Wash basin installation', desc: 'Precise mounting and plumbing of bathroom and vanity wash basins.' },
      { title: 'Shower and bathtub installation', desc: 'Fitting and plumbing of showers and bathtubs for a relaxing experience.' },
      { title: 'Kitchen sink installation', desc: 'Secure installation of kitchen sinks with proper drainage and water hookups.' },
      { title: 'Water tank installation and connections', desc: 'Setup of storage tanks and pumps to ensure consistent water pressure.' },
      { title: 'Water pump installation and maintenance', desc: 'Installing and servicing pumps to maintain optimal water flow.' },
      { title: 'Borehole plumbing connections', desc: 'Connecting borehole water sources to your main property supply safely.' },
      { title: 'Pipe fitting and replacement', desc: 'Upgrading old piping and fitting new lines to prevent leaks and bursts.' },
      { title: 'Leak detection and repair', desc: 'Using modern tools to find hidden leaks and fix them before they cause damage.' },
      { title: 'Burst pipe repairs', desc: 'Emergency repair services to quickly fix burst pipes and stop water loss.' },
      { title: 'Blocked drain and sewer unclogging', desc: 'Clearing stubborn blockages to restore normal flow in your drainage system.' },
      { title: 'Manhole construction and maintenance', desc: 'Building and servicing manholes for easy access to underground sewers.' },
      { title: 'Gutter and downpipe installation', desc: 'Directing rainwater away from your roof and foundation to prevent damage.' },
      { title: 'Rainwater harvesting systems', desc: 'Eco-friendly systems to collect and store rainwater for household use.' }
    ] 
  },
  'maintenance': { 
    title: 'General Maintenance', 
    desc: 'Property upkeep and rapid repair solutions for residential, commercial, and industrial properties.', 
    list: [
      { title: 'Preventive building maintenance', desc: 'Scheduled inspections and upkeep to prevent costly future breakdowns.' },
      { title: 'Corrective and emergency maintenance', desc: 'Rapid response repairs to fix unexpected issues and restore operations.' },
      { title: 'Residential property maintenance', desc: 'Comprehensive home care services, from minor fixes to major repairs.' },
      { title: 'Commercial property maintenance', desc: 'Keeping your business premises safe, functional, and presentable.' },
      { title: 'Industrial facility maintenance', desc: 'Specialized upkeep for factories and warehouses to minimize downtime.' },
      { title: 'Office maintenance services', desc: 'Ensuring a productive work environment through regular facility care.' },
      { title: 'Building repairs and restoration', desc: 'Bringing aging or damaged structures back to their original condition.' },
      { title: 'Minor construction and repair works', desc: 'Small-scale building projects and structural fixes.' },
      { title: 'Wall repairs and patching', desc: 'Fixing cracks and holes to keep walls smooth and structurally sound.' },
      { title: 'Ceiling repairs and replacement', desc: 'Addressing sagging, water damage, or replacing old ceiling boards.' },
      { title: 'Floor repairs and maintenance', desc: 'Fixing squeaks, cracks, or refinishing floors to extend their lifespan.' },
      { title: 'Door installation, repairs and adjustments', desc: 'Hanging new doors or fixing sticking, sagging, and alignment issues.' },
      { title: 'Window installation and repairs', desc: 'Fitting new windows and fixing broken panes, locks, or seals.' },
      { title: 'Lock replacement and repairs', desc: 'Securing your property with new locks or fixing faulty mechanisms.' },
      { title: 'Roofing repairs and maintenance', desc: 'Patching leaks and maintaining roof integrity against the elements.' },
      { title: 'Gutter cleaning and repairs', desc: 'Clearing debris and fixing gutters to ensure proper water flow.' },
      { title: 'Waterproofing services', desc: 'Applying sealants to foundations and roofs to prevent water damage.' },
      { title: 'Painting and touch up works', desc: 'Refreshing interior and exterior paint to protect and beautify surfaces.' },
      { title: 'Plumbing maintenance and repairs', desc: 'Ongoing care of water systems to prevent leaks and blockages.' }
    ] 
  },
  'int-ext-design': { 
    title: 'Interior & Exterior Design', 
    desc: 'We create functional, stylish and sustainable interior and exterior spaces tailored to your vision. Our experienced team delivers quality results that enhance the beauty, comfort and value of every property.', 
    list: [
      { title: 'Space planning and layout design', desc: 'Strategic arrangement of furniture and structures to maximize space utility.' },
      { title: 'Residential interior design', desc: 'Creating comfortable, stylish living spaces tailored to your home life.' },
      { title: 'Commercial office interior design', desc: 'Designing productive and modern workspaces for businesses.' },
      { title: 'Retail shop and showroom design', desc: 'Crafting engaging spaces that highlight products and attract customers.' },
      { title: 'Restaurant, café and hospitality interiors', desc: 'Setting the perfect ambiance for dining and guest experiences.' },
      { title: 'Kitchen design and remodeling', desc: 'Functional and aesthetic kitchen layouts with modern appliances.' },
      { title: 'Bathroom design and renovation', desc: 'Transforming bathrooms into spa-like, relaxing retreats.' },
      { title: 'Bedroom and living room makeovers', desc: 'Refreshing your personal spaces for comfort and style.' },
      { title: 'Ceiling design (Gypsum & PVC)', desc: 'Custom ceiling features that add depth and character to rooms.' },
      { title: 'Wall paneling and feature walls', desc: 'Adding texture and visual interest to plain walls.' },
      { title: 'Decorative painting and textured finishes', desc: 'Specialized paint techniques that create unique visual effects.' },
      { title: 'Flooring design (Tiles, Vinyl, Laminate, Epoxy & Hardwood)', desc: 'Selecting and installing the perfect floor materials for your space.' },
      { title: 'Lighting design and installation', desc: 'Layering light sources to enhance mood and functionality.' },
      { title: 'Custom cabinetry and wardrobes', desc: 'Built-in storage solutions tailored to your exact dimensions.' },
      { title: 'TV units and entertainment walls', desc: 'Stylish media centers that hide wires and showcase your tech.' },
      { title: 'Office partitions (Glass, Aluminum & Gypsum)', desc: 'Dividing workspace efficiently while maintaining an open feel.' },
      { title: 'Furniture selection and space styling', desc: 'Curating the perfect furniture pieces to match your design aesthetic.' },
      { title: 'Window treatments (Blinds, Curtains & Shades)', desc: 'Privacy and light control solutions that complement your decor.' },
      { title: '3D interior visualization and rendering', desc: 'Realistic 3D models so you can see the design before we build.' },
      { title: 'Interior renovation and remodeling', desc: 'Complete structural and cosmetic updates to outdated spaces.' },
      { title: 'Building façade design', desc: 'Creating striking exterior faces for commercial and residential buildings.' },
      { title: 'Exterior cladding (Stone, Wood & Composite)', desc: 'Protective and decorative outer layers that boost curb appeal.' },
      { title: 'Roofing design enhancements', desc: 'Upgrading roof profiles to complement the architectural style.' },
      { title: 'Drainage and stormwater planning', desc: 'Designing systems to manage runoff and protect the property.' },
      { title: 'Complete exterior renovations', desc: 'Full-scale makeovers to completely transform your building\'s exterior.' }
    ] 
  },
  'landscaping-main': { 
    title: 'Landscaping Services', 
    desc: 'We provide complete landscaping solutions that enhance the beauty, functionality and value of your outdoor spaces. We combine quality, sustainable practices and attention to detail to create outdoor environments that are attractive, durable and easy to maintain.', 
    list: [
      { title: 'Garden Design & Planning', desc: 'Conceptualizing and laying out beautiful, functional garden spaces.' },
      { title: 'Landscape Installation', desc: 'Executing the design plan by planting and building all landscape elements.' },
      { title: 'Garden Maintenance', desc: 'Regular upkeep including pruning, weeding, and fertilizing to keep gardens thriving.' },
      { title: 'Lawn Installation & Maintenance', desc: 'Laying new turf and providing ongoing mowing and care for lush lawns.' },
      { title: 'Artificial Turf Installation', desc: 'Laying durable, realistic synthetic grass for low-maintenance green areas.' },
      { title: 'Hardscaping (Paving, Pathways & Patios)', desc: 'Building solid, non-plant elements like walkways and sitting areas.' },
      { title: 'Cabro & Driveway Installation', desc: 'Laying durable paving blocks for strong, attractive driveways.' },
      { title: 'Irrigation & Sprinkler Systems', desc: 'Automated watering systems to keep landscapes hydrated efficiently.' },
      { title: 'Tree Planting & Transplanting', desc: 'Carefully moving or planting trees to ensure healthy root establishment.' },
      { title: 'Tree Pruning, Trimming & Removal', desc: 'Shaping trees for health and safety, or removing hazardous ones.' },
      { title: 'Hedge Trimming & Shaping', desc: 'Precisely cutting hedges to create clean, formal boundaries.' },
      { title: 'Flower Bed Design & Planting', desc: 'Creating vibrant, colorful areas with carefully selected blooms.' },
      { title: 'Ornamental Plant Supply & Installation', desc: 'Sourcing and placing decorative plants to enhance visual appeal.' },
      { title: 'Water Features (Fountains, Ponds & Waterfalls)', desc: 'Adding tranquil, moving water elements to your garden.' },
      { title: 'Retaining Walls', desc: 'Building structural walls to hold back soil and create level terraces.' },
      { title: 'Outdoor Lighting Installation', desc: 'Illuminating pathways and features for nighttime beauty and security.' },
      { title: 'Pergolas & Gazebos', desc: 'Constructing shaded structures for outdoor relaxation and dining.' },
      { title: 'Decking Installation', desc: 'Building wooden or composite decks for elevated outdoor living.' },
      { title: 'Garden Drainage Solutions', desc: 'Systems to prevent waterlogging and protect plant roots.' },
      { title: 'Erosion Control & Soil Stabilization', desc: 'Techniques to prevent soil loss on slopes and during heavy rains.' },
      { title: 'Mulching & Soil Improvement', desc: 'Adding organic matter to enrich soil and retain moisture.' },
      { title: 'Rock & Stone Landscaping', desc: 'Using natural stone to create rugged, low-maintenance features.' },
      { title: 'Desert & Low Maintenance Landscaping', desc: 'Designing water-wise gardens using drought-tolerant plants.' },
      { title: 'Vertical Gardens & Green Walls', desc: 'Growing plants on vertical structures to save space and add greenery.' },
      { title: 'Rooftop & Balcony Gardens', desc: 'Transforming urban spaces into lush, green retreats.' },
      { title: 'Outdoor Seating & Recreational Areas', desc: 'Designing comfortable zones for relaxing and entertaining outdoors.' },
      { title: 'Commercial Landscape Development', desc: 'Large-scale landscaping for offices, estates, and public spaces.' },
      { title: 'Residential Landscape Design', desc: 'Customized garden and yard designs for private homes.' },
      { title: 'Landscape Renovation & Restoration', desc: 'Revamping old, overgrown, or damaged gardens to their former glory.' },
      { title: 'Seasonal Planting & Garden Refresh', desc: 'Updating flower beds and plants to match the changing seasons.' },
      { title: 'Landscape Consultation & 3D Design', desc: 'Expert advice and realistic 3D renders of your proposed landscape.' }
    ] 
  },
  'engineering': { 
    title: 'Engineering & Fabrication', 
    desc: 'Robust structural solutions and custom metalwork built to last. Our certified engineers and fabricators deliver precision structural works, welding, and bespoke metal creations.', 
    list: [
      { title: 'Structural steel fabrication and installation', desc: 'Creating and erecting the steel framework for buildings and facilities.' },
      { title: 'Steel frame construction', desc: 'Building durable structures using precision-engineered steel columns and beams.' },
      { title: 'Industrial and commercial structural works', desc: 'Heavy-duty engineering solutions for factories and commercial complexes.' },
      { title: 'Warehouse steel structures', desc: 'Designing and erecting spacious, clear-span warehouses.' },
      { title: 'Mezzanine floor construction', desc: 'Building intermediate floors to maximize vertical storage space.' },
      { title: 'Roof trusses and steel roofing structures', desc: 'Fabricating strong frameworks to support roofs of any span.' },
      { title: 'Structural reinforcement and strengthening', desc: 'Upgrading existing structures to carry heavier loads.' },
      { title: 'Structural repairs and modifications', desc: 'Fixing damage and altering structures to meet new requirements.' },
      { title: 'Custom steel fabrication', desc: 'Bespoke metal creations tailored to your specific project needs.' },
      { title: 'Stainless steel fabrication', desc: 'Crafting rust-resistant steel products for a clean, modern finish.' },
      { title: 'Mild steel fabrication', desc: 'Working with versatile, high-strength mild steel for general construction.' },
      { title: 'Aluminium fabrication', desc: 'Lightweight, corrosion-resistant metalwork for windows and frames.' },
      { title: 'Sheet metal fabrication', desc: 'Cutting and shaping metal sheets for various functional uses.' },
      { title: 'CNC laser cutting', desc: 'High-precision cutting of metal sheets for complex designs.' },
      { title: 'Metal bending and rolling', desc: 'Shaping metal into curves and angles for architectural features.' },
      { title: 'Custom brackets, frames, and supports', desc: 'Manufacturing specific fixtures to hold and support structures.' },
      { title: 'MIG welding', desc: 'Fast, strong welding for thicker metals and heavy construction.' },
      { title: 'TIG welding', desc: 'Precision welding for high-quality, clean joins on thin metals.' },
      { title: 'Arc (Stick) welding', desc: 'Versatile, rugged welding suitable for outdoor and heavy-duty repairs.' },
      { title: 'Stainless steel welding', desc: 'Joining stainless metals without compromising rust resistance.' },
      { title: 'Aluminium welding', desc: 'Expertly joining aluminium parts without causing distortion.' },
      { title: 'On-site welding services', desc: 'Bringing our welding expertise directly to your location for repairs.' },
      { title: 'Heavy equipment welding and repairs', desc: 'Fixing cracks and breaks in heavy machinery and vehicles.' },
      { title: 'Welding maintenance and reinforcement', desc: 'Strengthening existing metal joints to extend their lifespan.' },
      { title: 'Sliding gates', desc: 'Space-saving gates that slide horizontally on a track.' },
      { title: 'Swing gates', desc: 'Traditional gates that swing open on hinges.' },
      { title: 'Automated gates', desc: 'Gates equipped with motors for convenient, remote access.' },
      { title: 'Pedestrian gates', desc: 'Smaller, secure gates designed specifically for foot traffic.' },
      { title: 'Security gates', desc: 'Heavy-duty, reinforced gates designed to deter unauthorized entry.' },
      { title: 'Decorative gates', desc: 'Ornate metal gates that enhance the aesthetic of your entrance.' },
      { title: 'Steel doors', desc: 'Robust, secure doors cut and fabricated from solid steel.' },
      { title: 'Burglar proofing', desc: 'Installing metal bars and meshes on windows to prevent break-ins.' },
      { title: 'Window grills', desc: 'Decorative and functional metal bars to secure glass windows.' },
      { title: 'Security fencing', desc: 'Erecting high, difficult-to-climb metal fences around your perimeter.' }
    ] 
  },
  'staircases': { 
    title: 'Staircases, Balustrades & Balconies', 
    desc: 'Premium installations that combine safety with striking visual appeal. We design and fit bespoke staircases and balcony systems.', 
    list: [
      { title: 'Custom staircase design', desc: 'Tailored stair layouts to fit your space and aesthetic perfectly.' },
      { title: 'Straight staircases', desc: 'Classic, functional stairs running in a single straight line.' },
      { title: 'Spiral staircases', desc: 'Space-saving, elegant stairs that wind around a central pole.' },
      { title: 'Floating staircases', desc: 'Modern stairs with hidden supports for a striking, weightless look.' },
      { title: 'Steel staircases', desc: 'Durable, industrial-style stairs built to withstand heavy use.' },
      { title: 'Stainless steel staircases', desc: 'Sleek, rust-resistant stairs that maintain a brilliant shine.' },
      { title: 'Indoor and outdoor staircases', desc: 'Stairs built with appropriate materials for interior or exterior use.' },
      { title: 'Staircase renovation and upgrades', desc: 'Updating old stairs with new treads, rails, and finishes.' },
      { title: 'Staircase fabrication and installation', desc: 'Building and fitting complete stair systems from scratch.' },
      { title: 'Landings and staircase framing', desc: 'Constructing the structural platforms and supports for stairs.' },
      { title: 'Frameless glass balustrades', desc: 'Seamless glass barriers offering unobstructed views.' },
      { title: 'Semi-frameless glass balustrades', desc: 'Glass panels with minimal framing for a blend of safety and style.' },
      { title: 'Stainless steel and glass balustrades', desc: 'Glass panels held by sleek, modern steel posts.' },
      { title: 'Balcony glass railings', desc: 'Protective, transparent barriers for raised outdoor spaces.' },
      { title: 'Staircase glass railings', desc: 'Glass panels running alongside stairs for a modern finish.' },
      { title: 'Tempered safety glass installation', desc: 'Fitting toughened glass designed to shatter safely under extreme impact.' },
      { title: 'Glass partition systems', desc: 'Dividing interior spaces with elegant, soundproof glass walls.' },
      { title: 'Glass balustrade repairs and replacement', desc: 'Fixing cracks or replacing old panels to restore safety and clarity.' },
      { title: 'Custom steel balconies', desc: 'Designing and building unique steel balcony structures.' },
      { title: 'Cantilever balconies', desc: 'Balconies that project outward without visible front supports.' },
      { title: 'Residential balcony construction', desc: 'Safe, attractive balconies for private homes and apartments.' },
      { title: 'Commercial balcony fabrication', desc: 'Heavy-duty balconies for hotels, offices, and public buildings.' },
      { title: 'Balcony extensions', desc: 'Enlarging existing balconies to create more outdoor space.' },
      { title: 'Steel support structures', desc: 'Fabricating the underlying framework that holds balconies safely.' },
      { title: 'Balcony repairs and reinforcement', desc: 'Strengthening weak or aging balconies to ensure safety.' },
      { title: 'Powder-coated and galvanized finishes', desc: 'Applying protective coatings to prevent rust and weathering.' },
      { title: 'Stainless steel handrails', desc: 'Smooth, rust-free rails offering a comfortable grip.' },
      { title: 'Mild steel handrails', desc: 'Strong, cost-effective rails suitable for painting or coating.' },
      { title: 'Glass handrails', desc: 'Modern rails where the glass itself acts as the main barrier.' },
      { title: 'Aluminium handrails', desc: 'Lightweight, weather-resistant rails ideal for outdoor use.' }
    ] 
  },
  'roofing': { 
    title: 'Roofing Services', 
    desc: 'Durable roofing solutions to protect your property from the elements. We use premium materials for lasting weather resistance.', 
    list: [
      { title: 'New Roof Installation', desc: 'Complete fitting of brand new roofs from the trusses to the final covering.' },
      { title: 'Roof Repairs & Maintenance', desc: 'Fixing leaks, replacing broken tiles, and maintaining roof health.' },
      { title: 'Guttering & Downpipes', desc: 'Installing channels to catch and direct rainwater safely away.' },
      { title: 'Waterproofing & Damp Proofing', desc: 'Applying membranes to prevent water seepage through roofs and walls.' },
      { title: 'Roof Inspections', desc: 'Thorough checks to identify potential issues before they cause damage.' },
      { title: 'Shingle & Tile Roofing', desc: 'Laying individual shingles or tiles for a classic, weather-tight finish.' },
      { title: 'Flat Roof Systems', desc: 'Installing flat roofs with specialized materials to ensure water runoff.' },
      { title: 'Ceiling & Roof Insulation', desc: 'Adding insulating layers to regulate indoor temperature and save energy.' }
    ] 
  },
  'painting': { 
    title: 'Painting & Decorating', 
    desc: 'Flawless finishes that bring your interior and exterior walls to life. We prepare surfaces thoroughly for long-lasting results.', 
    list: [
      { title: 'Interior Painting', desc: 'Applying premium paints to inside walls for a fresh, clean look.' },
      { title: 'Exterior Painting', desc: 'Weather-resistant coatings to protect and beautify your building\'s outside.' },
      { title: 'Wallpapering', desc: 'Precise hanging of wallpaper to add pattern and texture to rooms.' },
      { title: 'Surface Preparation & Filling', desc: 'Sanding, patching, and priming walls to ensure a smooth paint finish.' },
      { title: 'Texture & Stucco Finishes', desc: 'Applying textured coatings for a unique, tactile wall surface.' },
      { title: 'Wood & Metal Varnishing', desc: 'Sealing and protecting wood and metal with clear, durable varnishes.' },
      { title: 'Concrete Floor Epoxy Coating', desc: 'Pouring hard, glossy epoxy for durable and attractive concrete floors.' },
      { title: 'Staining & Sealing', desc: 'Enhancing the natural grain of wood while protecting it from moisture.' }
    ] 
  },
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

  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.style.cursor = 'pointer';
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.dataset.modal;
      const data = servicesData[key];
      if (data) {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        
        if (listEl) listEl.innerHTML = '';
        if (data.list && listEl) {
          data.list.forEach(item => {
            const div = document.createElement('div');
            div.className = 'modal-sublist-item';
            
            const titleBtn = document.createElement('button');
            titleBtn.className = 'modal-sublist-title';
            titleBtn.innerHTML = `<span>${item.title}</span> <svg class="modal-sublist-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
            
            const descDiv = document.createElement('div');
            descDiv.className = 'modal-sublist-desc';
            descDiv.textContent = item.desc;
            
            titleBtn.addEventListener('click', () => {
              div.classList.toggle('is-open');
            });
            
            div.appendChild(titleBtn);
            div.appendChild(descDiv);
            listEl.appendChild(div);
          });
        }
        
        overlay.classList.add('is-active');
        document.body.classList.add('no-scroll');
      }
    });
  });

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

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});