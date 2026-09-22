document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const progress = document.getElementById('progress');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const toast = document.getElementById('toast');

  const updateScrollState = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${amount}%`;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('open');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav?.classList.toggle('open', !isOpen);
  });

  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2800);
  };

  document.querySelectorAll('.prompt-send, .prompt-box').forEach((control) => {
    control.addEventListener('click', () => showToast('NEXA is getting ready — your workspace is coming soon.'));
  });

  const modes = {
    think: {
      label: 'THINK',
      prompt: "I have a big idea, but I don't know where to start.",
      response: "Let's find the signal first. I'll help you break the idea into a clear first move, a useful shape, and a path worth following.",
    },
    create: {
      label: 'CREATE',
      prompt: 'Turn this rough direction into something people can see.',
      response: 'Let’s shape the feeling, define the audience, and turn the direction into a tangible first draft.',
    },
    analyze: {
      label: 'ANALYZE',
      prompt: 'Help me see the pattern inside all of this information.',
      response: 'I’ll separate signal from noise, surface the key relationships, and give you the insight behind the next decision.',
    },
  };

  const panelMode = document.getElementById('panelMode');
  const panelPrompt = document.getElementById('panelPrompt');
  const panelResponse = document.getElementById('panelResponse');
  document.querySelectorAll('.demo-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const mode = modes[tab.dataset.mode];
      if (!mode) return;
      document.querySelectorAll('.demo-tab').forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      panelMode.textContent = mode.label;
      panelPrompt.textContent = mode.prompt;
      panelResponse.textContent = mode.response;
    });
  });

  const revealItems = document.querySelectorAll('.capability, .workflow-item, .vision-card');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach((item) => { item.style.opacity = '0'; item.style.transform = 'translateY(18px)'; });
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transition = 'opacity .65s ease, transform .65s cubic-bezier(.2,.8,.2,1)';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
