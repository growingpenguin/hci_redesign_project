// --- Tab switching ---
const tabs = document.querySelectorAll('.tab');
const screens = document.querySelectorAll('.screen');

function gotoScreen(id){
  screens.forEach(s => s.classList.remove('active'));
  tabs.forEach(t => t.classList.remove('active'));
  const target = document.getElementById(id);
  if (target){ target.classList.add('active'); }
  const tab = [...tabs].find(t => t.dataset.screen === id);
  if (tab){ tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); }
  // scroll to top for clarity
  window.scrollTo({top:0, behavior:'smooth'});
}

tabs.forEach(t => {
  t.addEventListener('click', () => gotoScreen(t.dataset.screen));
});

// --- Buttons that navigate to a specific screen ---
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-goto]');
  if (!target) return;
  e.preventDefault();
  gotoScreen(target.dataset.goto);
});

// --- Mobile/touch fallback: tapping a button toggles its hoverbox ---
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
if (isTouch){
  document.querySelectorAll('.action > .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.parentElement;
      // allow navigation via data-goto as well; toggle first for feedback, then navigate
      action.classList.toggle('is-open');
      // Do not stop navigation; the global listener above will still fire
    });
  });

  // Tap outside to close hoverboxes
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.action')){
      document.querySelectorAll('.action.is-open').forEach(a => a.classList.remove('is-open'));
    }
  });
}
