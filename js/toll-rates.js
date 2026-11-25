const tollCategories = [...document.querySelectorAll('[data-toll-category]')];
const tollRows = [...document.querySelectorAll('[data-toll-row]')];
const ratesTitle = document.querySelector('#toll-rates-title');
const panelVehicleImage = document.querySelector('#toll-panel-category-image');
const panelToggle = document.querySelector('.toll-rates-panel-heading');
const panelContent = document.querySelector('#toll-rates-panel-content');

tollCategories.forEach((category) => {
  category.addEventListener('click', () => {
    const selectedCategory = category.dataset.tollCategory;
    const categoryName = category.querySelector('span').textContent.trim();
    const categoryImage = category.querySelector('.toll-category-image');

    tollCategories.forEach((item) => {
      const selected = item === category;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });

    tollRows.forEach((row) => {
      row.hidden = row.dataset.tollRow !== selectedCategory;
    });

    ratesTitle.textContent = `${categoryName} – Toll Rates`;
    panelVehicleImage.src = categoryImage.src;
  });
});

panelToggle.addEventListener('click', () => {
  const expanded = panelToggle.getAttribute('aria-expanded') === 'true';
  panelToggle.setAttribute('aria-expanded', String(!expanded));
  panelContent.hidden = expanded;
});
