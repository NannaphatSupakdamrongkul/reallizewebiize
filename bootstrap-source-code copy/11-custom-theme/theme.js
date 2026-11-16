const root = document.documentElement;
const button = document.querySelector('#themeToggle');

function setTheme(theme) {
  root.dataset.bsTheme = theme;
  const dark = theme === 'dark';
  button.textContent = dark ? 'เปลี่ยนเป็น Light Mode' : 'เปลี่ยนเป็น Dark Mode';
  button.setAttribute('aria-pressed', String(dark));
  localStorage.setItem('workshop-theme', theme);
}

setTheme(localStorage.getItem('workshop-theme') || 'light');

button.addEventListener('click', () => {
  setTheme(root.dataset.bsTheme === 'dark' ? 'light' : 'dark');
});

