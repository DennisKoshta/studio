'use strict';
// Anonymous reports use the public API only. No provider or administration credentials.
(() => {
  const dialog = document.getElementById('feedback-dialog');
  if (!dialog?.showModal) return;
  const $ = id => document.getElementById(`feedback-${id}`);
  const drafts = new Map();
  const fields = ['category', 'description', 'steps', 'name', 'website'];
  let active = null, opener = null, controller = null, epoch = 0;
  let origin = dialog.dataset.apiOrigin;
  try { const u = new URL(origin); if (u.protocol !== 'https:' || u.origin !== origin) origin = ''; } catch { origin = ''; }
  // Do not expose a submission button until the approved inbox is connected.
  if (!origin) return;
  const device = () => {
    const ua = navigator.userAgent;
    const browser = /Edg\//.test(ua) ? 'Edge' : /Firefox|FxiOS/.test(ua) ? 'Firefox' : /Chrome|CriOS/.test(ua) ? 'Chrome' : /Safari/.test(ua) ? 'Safari' : 'Other browser';
    const platform = /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS/iPadOS' : /Windows/.test(ua) ? 'Windows' : /Macintosh/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'Other device';
    return `${browser} · ${platform} · viewport ${innerWidth} × ${innerHeight}`;
  };
  function save() {
    if (!active) return;
    active.fields = Object.fromEntries(fields.map(key => [key, $(key).value]));
    active.fields.device = $('device').checked;
  }
  function status(text, error = false) {
    $('status').textContent = text;
    $('status').classList.toggle('feedback-error', error);
  }
  function ready() { $('fields').disabled = false; $('send').disabled = !origin; $('send').textContent = 'Send feedback'; }
  for (const button of document.querySelectorAll('.feedback-open')) {
    button.hidden = false;
    button.addEventListener('click', () => {
      const id = button.dataset.project;
      if (!drafts.has(id)) drafts.set(id, { projectId: id, fields: null, signature: null, requestId: null });
      active = drafts.get(id); opener = button; epoch++;
      $('form').reset();
      if (active.fields) {
        for (const key of fields) $(key).value = active.fields[key];
        $('device').checked = active.fields.device;
      }
      $('title').textContent = `Feedback for ${document.getElementById(`n-${id}`).textContent}`;
      $('device-preview').textContent = $('device').checked ? device() : 'No device details will be included.';
      ready(); status(origin ? '' : 'Feedback submissions are not connected yet. You can keep a draft in this tab.');
      dialog.showModal(); $('description').focus();
    });
  }
  $('close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    save(); epoch++; controller?.abort(); controller = null; ready(); opener?.focus();
  });
  $('device').addEventListener('change', () => { $('device-preview').textContent = $('device').checked ? device() : 'No device details will be included.'; });
  $('form').addEventListener('submit', async event => {
    event.preventDefault();
    if (!active || !origin || $('send').disabled) return;
    const description = $('description').value.trim();
    if (!description) { status('Please add a little about your experience.', true); $('description').focus(); return; }
    save();
    const entry = active;
    const body = { projectId: entry.projectId, category: $('category').value, description,
      steps: $('steps').value.trim(), displayName: $('name').value.trim(), website: $('website').value,
      ...($('device').checked ? { deviceInfo: entry.deviceInfo || (entry.deviceInfo = device()) } : {}) };
    const signature = JSON.stringify(body);
    if (entry.signature !== signature || !entry.requestId) {
      entry.signature = signature; entry.requestId = crypto.randomUUID();
    }
    const requestId = entry.requestId;
    if (new TextEncoder().encode(JSON.stringify({ ...body, requestId })).length > 12288) {
      status('This report is a little too long to send. Please shorten the message or extra context; your draft is kept here.', true); return;
    }
    const ticket = ++epoch;
    controller = new AbortController(); const ownedController = controller;
    const timer = setTimeout(() => ownedController.abort(), 90000);
    $('fields').disabled = true; $('send').disabled = true; $('send').textContent = 'Sending…';
    status('Sending your feedback. The service may need a moment to wake.');
    try {
      const response = await fetch(`${origin}/v1/feedback`, { method: 'POST', credentials: 'omit',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, requestId }), signal: ownedController.signal });
      const data = await response.json();
      if (ticket !== epoch) return;
      if (!response.ok) {
        const messages = {
          rate_limited: 'The inbox is busy. Please wait a little and try again; your draft is kept here.',
          capacity_reached: 'The inbox is full at the moment. Your draft is kept here so you can try again later.',
          invalid_request: 'Please check the form and try again. Your draft is kept here.',
          unavailable: 'The inbox is temporarily unavailable. Your draft is kept here; you can retry safely.',
          conflict: 'This report could not be confirmed. Change the message before sending a new report.',
        };
        status(messages[data?.error?.code] || 'Your feedback could not be confirmed. Your draft is kept here; please try again.', true);
        return;
      }
      if (data.receiptId !== requestId) throw new Error('Unrecognized receipt');
      entry.fields = null; entry.signature = null; entry.requestId = null; entry.deviceInfo = null;
      $('form').reset(); $('device-preview').textContent = device();
      status(`Thanks—your feedback was received. Reference: ${requestId.slice(0, 8).toUpperCase()}.`);
      $('status').focus();
    } catch {
      if (ticket === epoch) status('We could not confirm receipt. Your draft is kept here; retrying the same report will not send a second copy.', true);
    } finally {
      clearTimeout(timer);
      if (ticket === epoch) { controller = null; ready(); }
    }
  });
})();
