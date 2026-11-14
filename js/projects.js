const projects = [];

const projectLinkNotice = document.querySelector('[data-project-link-notice]');
document.querySelectorAll('[data-project-placeholder]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    projectLinkNotice.textContent = `${link.textContent.trim()} resource link will be available soon.`;
    projectLinkNotice.hidden = false;
  });
});

const tableBody = document.querySelector('#projects-table-body');
const projectRows = projects.map(([title, type], index) => {
  const row = document.createElement('tr');
  row.dataset.searchRow = '';

  const numberCell = document.createElement('td');
  numberCell.textContent = String(index + 1);
  const titleCell = document.createElement('td');
  titleCell.textContent = title;
  const typeCell = document.createElement('td');
  typeCell.textContent = type;

  row.append(numberCell, titleCell, typeCell);
  tableBody.append(row);
  return row;
});

const countNode = document.querySelector('[data-detail-count]');
if (countNode) countNode.textContent = 'Showing 0 of 0 projects';

const emptyNode = document.querySelector('[data-detail-empty]');
if (emptyNode) {
  emptyNode.hidden = false;
  emptyNode.textContent = 'No project data is currently available.';
}
