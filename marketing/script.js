// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Optionally save preference
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = 'Light Mode';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = 'Dark Mode';
    }
  });
  // On load, set theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = 'Light Mode';
  }
}

// Basic form validation for newsletter, contact, and contest forms
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && !validateEmail(emailInput.value)) {
      alert('Please enter a valid email address.');
      e.preventDefault();
      return false;
    }
  });
}); 