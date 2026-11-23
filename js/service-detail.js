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
