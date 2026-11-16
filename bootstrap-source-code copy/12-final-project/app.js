const root = document.documentElement;
const themeButton = document.querySelector('#themeToggle');

function applyTheme(theme) {
  root.dataset.bsTheme = theme;
  const isDark = theme === 'dark';
  themeButton.textContent = isDark ? 'Light' : 'Dark';
  themeButton.setAttribute('aria-pressed', String(isDark));
  localStorage.setItem('final-project-theme', theme);
}

applyTheme(localStorage.getItem('final-project-theme') || 'light');
themeButton.addEventListener('click', () => applyTheme(root.dataset.bsTheme === 'dark' ? 'light' : 'dark'));

// ปิด Mobile Navbar หลังผู้ใช้เลือกลิงก์
document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('#mainNav');
    bootstrap.Collapse.getInstance(nav)?.hide();
  });
});

const form = document.querySelector('#contactForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add('was-validated');
    form.querySelector(':invalid')?.focus();
    return;
  }

  bootstrap.Toast.getOrCreateInstance(document.querySelector('#successToast')).show();
  form.reset();
  form.classList.remove('was-validated');
});

