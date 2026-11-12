const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('#primary-navigation');

menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  menuButton.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
  navigation.classList.toggle('is-open', !isExpanded);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
  }
});

const detailSearch = document.querySelector('[data-detail-search]');
if (detailSearch) {
  const targetRows = [...document.querySelectorAll('[data-search-row]')];
  const count = document.querySelector('[data-detail-count]');
  const emptyState = document.querySelector('[data-detail-empty]');

  detailSearch.addEventListener('input', () => {
    const query = detailSearch.value.trim().toLocaleLowerCase();
    let visibleRows = 0;

    targetRows.forEach((row) => {
      const matches = row.textContent.toLocaleLowerCase().includes(query);
      row.hidden = !matches;
      if (matches) visibleRows += 1;
    });

    count.textContent = `Showing ${visibleRows} of ${targetRows.length} entries`;
    emptyState.hidden = visibleRows > 0;
  });
}
