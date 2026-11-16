const activities = [
  { id: 1, title: 'Boom Boom Bass', category: 'album', categoryLabel: 'มินิอัลบั้ม', image: 'assets/riize-boom.jpeg', date: '17 มิ.ย. 2024', place: 'Title Track', spirit: 'Funk Pop' },
  { id: 2, title: 'Get A Guitar', category: 'single', categoryLabel: 'ซิงเกิลเดบิวต์', image: 'assets/riize-guitar.jpeg', date: '4 ก.ย. 2023', place: 'Single', spirit: 'Emotional Pop' },
  { id: 3, title: 'Love 119', category: 'single', categoryLabel: 'ดิจิทัลซิงเกิล', image: 'assets/riize-love.jpg', date: '5 ม.ค. 2024', place: 'Digital Single', spirit: 'Nostalgic' },
  { id: 4, title: 'Siren', category: 'single', categoryLabel: 'เพอร์ฟอร์แมนซ์', image: 'assets/riize-siren.jpg', date: '3 เม.ย. 2024', place: 'Special', spirit: 'Intense Dance' },
  { id: 5, title: 'RIIZING Fan-Con Tour', category: 'tour', categoryLabel: 'ทัวร์คอนเสิร์ต', image: 'assets/riize-tour.jpg', date: 'พ.ค. - ก.ย. 2024', place: 'Global Tour', spirit: 'Concert' },
  { id: 6, title: 'Talk Saxy', category: 'single', categoryLabel: 'ดิจิทัลซิงเกิล', image: 'assets/riize-saxy.jpg', date: '27 ต.ค. 2023', place: 'Single', spirit: 'Brass Riff' }
];

const grid = document.querySelector('#activityGrid');
const emptyState = document.querySelector('#emptyState');
const searchInput = document.querySelector('#activitySearch');
const clearSearchBtn = document.querySelector('#clearSearch');
const filterButtons = document.querySelectorAll('#categoryFilters button');

let selectedCategory = 'all';

function activityCard(activity) {
  return `
    <div class="col">
      <article class="card activity-card h-100 shadow-sm border-0">
        <img class="card-img-top" src="${activity.image}" alt="${activity.title}">
        <div class="card-body d-flex flex-column p-4">
          <span class="small text-warning-emphasis mb-2">
            <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">${activity.categoryLabel}</span>
          </span>
          <h3 class="card-title h5 mb-2">${activity.title}</h3>
          <p class="activity-meta text-body-secondary small mb-3">
            วันที่: ${activity.date}<br>ประเภท: ${activity.place}
          </p>
          <p class="small mt-auto mb-0">คอนเซปต์: <strong>${activity.spirit}</strong></p>
          <button class="btn btn-outline-primary btn-sm mt-3 stretched-link" type="button" data-bs-toggle="modal" data-bs-target="#activityModal">
            ดูรายละเอียด
          </button>
        </div>
      </article>
    </div>
  `;
}

function renderActivities() {
  const keyword = searchInput.value.trim().toLowerCase();
  
  const filtered = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const searchable = `${activity.title} ${activity.categoryLabel} ${activity.spirit} ${activity.place}`.toLowerCase();
    return matchesCategory && searchable.includes(keyword);
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('d-none');
  } else {
    emptyState.classList.add('d-none');
    grid.innerHTML = filtered.map(activityCard).join('');
  }
}

if (searchInput) searchInput.addEventListener('input', renderActivities);

if (clearSearchBtn) {
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    renderActivities();
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    selectedCategory = btn.getAttribute('data-category');
    renderActivities();
  });
});

renderActivities();