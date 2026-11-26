const tollCategories = [...document.querySelectorAll('[data-toll-category]')];
const tollRows = [...document.querySelectorAll('[data-toll-row]')];
const tollFootnotes = [...document.querySelectorAll('[data-toll-footnote]')];
const tollRateGrids = [...document.querySelectorAll('[data-toll-rate-grid]')];
const ratesTitle = document.querySelector('#toll-rates-title');
const panelVehicleImage = document.querySelector('#toll-panel-category-image');
const detailToggle = document.querySelector('#toll-rates-details-toggle');
const detailToggleLabel = detailToggle && detailToggle.querySelector('.toll-detail-toggle-label');
const detailToggleIcon = detailToggle && detailToggle.querySelector('i');
const tollRateDetails = document.querySelector('#toll-rates-details');
const tollDashboard = document.querySelector('.toll-dashboard');

if (tollCategories.length === 0 || tollRows.length === 0 || tollFootnotes.length === 0 || tollRateGrids.length === 0 || !ratesTitle || !panelVehicleImage || !detailToggle || !detailToggleLabel || !detailToggleIcon || !tollRateDetails || !tollDashboard) {
  throw new Error('Toll rate selector markup is incomplete.');
}

function createTollRateCard(routeHeading, routeCode, rate) {
  const routeName = routeHeading.replace(routeCode, '').replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
  const card = document.createElement('article');
  const top = document.createElement('div');
  const code = document.createElement('span');
  const routeIcon = document.createElement('i');
  const heading = document.createElement('h3');
  const amount = document.createElement('div');
  const currency = document.createElement('span');
  const value = document.createElement('strong');
  const caption = document.createElement('p');

  card.className = 'toll-rate-card';
  card.setAttribute('role', 'listitem');
  top.className = 'toll-rate-card-top';
  code.className = 'toll-route-code';
  code.textContent = routeCode;
  routeIcon.className = 'fa-solid fa-location-dot';
  routeIcon.setAttribute('aria-hidden', 'true');
  heading.textContent = routeName;
  amount.className = 'toll-rate-card-amount';
  caption.className = 'toll-rate-card-caption';

  if (rate === '—') {
    card.classList.add('is-unavailable');
    value.textContent = 'Not listed';
    caption.textContent = 'No rate in this notification';
  } else {
    currency.textContent = 'Rs.';
    value.textContent = rate;
    caption.textContent = 'Toll charge for selected vehicle';
    amount.append(currency);
  }

  amount.append(value);
  top.append(code, routeIcon);
  card.append(top, heading, amount, caption);

  return card;
}

function renderTollRateCards() {
  tollRateGrids.forEach((grid) => {
    const section = grid.closest('.toll-rate-section');
    const table = section && section.querySelector('.toll-official-table');
    const selectedRow = table && table.querySelector('tbody tr[data-toll-row]:not([hidden])');

    if (!table || !selectedRow) {
      throw new Error('Selected toll rate row is missing from a route table.');
    }

    const routes = [...table.querySelectorAll('thead th')].slice(1);
    const values = [...selectedRow.querySelectorAll('td')];

    if (routes.length !== values.length) {
      throw new Error('Toll rate route headings and values do not match.');
    }

    const cards = routes.map((route, index) => {
      const routeHeading = route.textContent.trim();
      const routeCode = route.dataset.routeCode;
      const rate = values[index].textContent.trim();

      if (!routeCode) {
        throw new Error('Toll route code is missing from a route heading.');
      }

      return createTollRateCard(routeHeading, routeCode, rate);
    });

    grid.replaceChildren(...cards);
  });

  tollDashboard.classList.add('has-dynamic-rates');
}

function selectTollCategory(category) {
  const selectedCategory = category.dataset.tollCategory;
  const categoryName = category.querySelector('.toll-category-label');
  const categoryImage = category.querySelector('.toll-category-image');

  if (!selectedCategory || !categoryName || !categoryImage) {
    throw new Error('Toll rate category markup is incomplete.');
  }

  tollCategories.forEach((item) => {
    const selected = item === category;
    item.classList.toggle('is-selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });

  tollRows.forEach((row) => {
    row.hidden = row.dataset.tollRow !== selectedCategory;
  });

  tollFootnotes.forEach((footnote) => {
    footnote.hidden = footnote.dataset.tollFootnote !== selectedCategory;
  });

  ratesTitle.textContent = `${categoryName.textContent.trim()} – Toll Rates`;
  panelVehicleImage.src = categoryImage.src;
  renderTollRateCards();
}

detailToggle.addEventListener('click', () => {
  const expanded = detailToggle.getAttribute('aria-expanded') !== 'true';
  detailToggle.setAttribute('aria-expanded', String(expanded));
  detailToggle.setAttribute('aria-label', `${expanded ? 'Hide' : 'View'} toll rate details`);
  detailToggleLabel.textContent = expanded ? 'Hide details' : 'View details';
  tollRateDetails.hidden = !expanded;
});

tollRateDetails.hidden = true;
detailToggle.hidden = false;

tollCategories.forEach((category) => {
  category.addEventListener('click', () => selectTollCategory(category));
});

const initialCategory = tollCategories.find((category) => category.getAttribute('aria-pressed') === 'true');

if (!initialCategory) {
  throw new Error('No initial toll rate category is selected.');
}

selectTollCategory(initialCategory);
