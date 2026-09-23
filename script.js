document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('#progress');
  const toggle = document.querySelector('#menuToggle');
  const mobile = document.querySelector('#mobileNav');
  const toast = document.querySelector('#toast');
  const apiBase = 'https://3000-iq7opvgokw5wv3mw9s6xq-09272c6a.us1.manus.computer';
  const starter = { role: 'assistant', content: 'Hi, I’m Nexa. Ask me about an idea, a plan, or your next move.' };
  let messages = (() => { try { return JSON.parse(localStorage.getItem('nexa-github-chat') || 'null') || [starter]; } catch { return [starter]; } })();

  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${total > 0 ? (scrollY / total) * 100 : 0}%`;
    header?.classList.toggle('scrolled', scrollY > 20);
  };
  addEventListener('scroll', update, { passive: true }); update();
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); mobile?.classList.toggle('open', !open); });
  mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { toggle?.setAttribute('aria-expanded', 'false'); mobile?.classList.remove('open'); }));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const show = message => { if (!toast) return; toast.textContent = message; toast.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => toast.classList.remove('show'), 3200); };
  document.querySelector('#contactForm')?.addEventListener('submit', e => { e.preventDefault(); show('Thanks — you are on the Nexa-hub early access list.'); e.target.reset(); });
  document.querySelectorAll('.prompt-send,.prompt-line').forEach(el => el.addEventListener('click', () => openChat()));
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const target = document.querySelector(a.getAttribute('href')); if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); } }));

  const widget = document.createElement('div');
  widget.className = 'nexa-widget';
  widget.innerHTML = `<button class="nexa-launch" aria-label="Open Nexa Assistant">◌</button><section class="nexa-panel" aria-label="Nexa AI Assistant" hidden><header><div><b>Nexa Assistant</b><small>AI that stays with the work</small></div><button class="nexa-close" aria-label="Close">×</button></header><div class="nexa-messages"></div><div class="nexa-suggestions"><button>What can Nexa-hub do?</button><button>Help me shape an idea</button><button>How does it work?</button></div><form class="nexa-form"><input aria-label="Ask Nexa" maxlength="4000" placeholder="Ask Nexa anything..." autocomplete="off"><button aria-label="Send message">↑</button></form></section>`;
  document.body.appendChild(widget);
  const panel = widget.querySelector('.nexa-panel');
  const launch = widget.querySelector('.nexa-launch');
  const close = widget.querySelector('.nexa-close');
  const messagesEl = widget.querySelector('.nexa-messages');
  const form = widget.querySelector('.nexa-form');
  const input = widget.querySelector('input');
  const suggestions = widget.querySelector('.nexa-suggestions');
  const render = () => { messagesEl.innerHTML = messages.slice(-10).map(m => `<div class="nexa-message ${m.role}">${m.content.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</div>`).join(''); messagesEl.scrollTop = messagesEl.scrollHeight; suggestions.hidden = messages.length > 1; };
  const openChat = () => { panel.hidden = false; widget.classList.add('open'); launch.setAttribute('aria-expanded', 'true'); render(); input.focus(); };
  const closeChat = () => { panel.hidden = true; widget.classList.remove('open'); launch.setAttribute('aria-expanded', 'false'); };
  launch.addEventListener('click', () => panel.hidden ? openChat() : closeChat()); close.addEventListener('click', closeChat);
  suggestions.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { input.value = button.textContent; form.requestSubmit(); }));
  form.addEventListener('submit', async e => {
    e.preventDefault(); const content = input.value.trim(); if (!content) return;
    messages.push({ role: 'user', content }); input.value = ''; render();
    const pending = document.createElement('div'); pending.className = 'nexa-message assistant pending'; pending.textContent = 'Thinking…'; messagesEl.appendChild(pending); messagesEl.scrollTop = messagesEl.scrollHeight;
    try {
      const response = await fetch(`${apiBase}/api/trpc/assistant.chat?batch=1`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ 0: { json: { messages: messages.slice(-10) } } }) });
      const payload = await response.json();
      const answer = payload?.[0]?.result?.data?.json?.answer || payload?.[0]?.result?.data?.answer;
      if (!response.ok || !answer) throw new Error('No answer');
      messages.push({ role: 'assistant', content: answer });
    } catch { messages.push({ role: 'assistant', content: 'I’m ready to help, but the live AI connection is still being published. Please try again shortly.' }); }
    localStorage.setItem('nexa-github-chat', JSON.stringify(messages.slice(-12))); render();
  });
  render();
});
