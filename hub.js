'use strict';
// Progressive enhancement: the projects, links and native details work without JS.
(function () {
  function age(iso) {
    const minutes = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
    if (minutes < 1) return 'just now';
    if (minutes < 60) return minutes + 'm ago';
    if (minutes < 1440) return Math.floor(minutes / 60) + 'h ago';
    return Math.floor(minutes / 1440) + 'd ago';
  }
  const fmt = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
  for (const el of document.querySelectorAll('time[data-stamp]')) {
    const iso = el.getAttribute('datetime');
    el.textContent = new Date(iso).toLocaleString(undefined, fmt) + ' · ' + age(iso);
  }
  for (const el of document.querySelectorAll('time[data-age]')) {
    el.textContent = age(el.getAttribute('datetime'));
  }
  const cards = [...document.querySelectorAll('#project-grid .card')];
  const search = document.getElementById('search');
  const stage = document.getElementById('stage');
  const demos = document.getElementById('demos-only');
  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const card of cards) {
      card.hidden = !(card.querySelector('h2').textContent.toLocaleLowerCase().includes(query)
        && (stage.value === 'all' || card.dataset.stage === stage.value)
        && (!demos.checked || card.dataset.playable === 'true'));
      if (!card.hidden) visible++;
    }
    document.getElementById('result-count').textContent = `${visible} of ${cards.length} projects`;
    document.getElementById('empty').hidden = visible !== 0;
  }
  search.addEventListener('input', filter);
  stage.addEventListener('change', filter);
  demos.addEventListener('change', filter);
  document.getElementById('reset-filters').addEventListener('click', () => {
    search.value = ''; stage.value = 'all'; demos.checked = false;
    filter(); search.focus();
  });
  document.getElementById('filters').hidden = false;
  filter();
})();
