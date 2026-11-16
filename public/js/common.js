document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.like-btn');

  likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const countSpan = btn.querySelector('.like-count');
      let currentCount = parseInt(countSpan.textContent, 10);
      countSpan.textContent = currentCount + 1;
      
      btn.classList.remove('btn-outline-danger');
      btn.classList.add('btn-danger');
    });
  });
});