const travelPanels = [...document.querySelectorAll('.travel-panel[id]')];
const travelControls = [...document.querySelectorAll('[data-travel-panel]')];
const travelGroupToggles = [...document.querySelectorAll('[data-travel-toggle]')];
const detailToggles = [...document.querySelectorAll('[data-detail-toggle]')];

const resetDetails = () => {
  detailToggles.forEach((button) => {
    const content = document.getElementById(button.getAttribute('aria-controls'));
    if (!content) {
      console.error(`Travel advisory detail content not found: ${button.getAttribute('aria-controls')}`);
      return;
    }

    content.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.textContent = 'View Detail';
  });
};

const getAncestorGroups = (control) => {
  const ancestors = [];
  let subnav = control.closest('.travel-subnav');

  while (subnav) {
    const parentToggle = subnav.previousElementSibling;
    if (parentToggle?.matches('[data-travel-toggle]')) {
      ancestors.push(parentToggle);
      subnav = parentToggle.closest('.travel-subnav');
    } else {
      break;
    }
  }

  return ancestors.reverse();
};

const setExpandedGroups = (expandedGroups) => {
  travelGroupToggles.forEach((toggle) => {
    const subnav = document.getElementById(toggle.dataset.travelToggle);
    if (!subnav) {
      console.error(`Travel advisory navigation group not found: ${toggle.dataset.travelToggle}`);
      return;
    }

    const isExpanded = expandedGroups.includes(toggle);
    subnav.hidden = !isExpanded;
    toggle.setAttribute('aria-expanded', String(isExpanded));
  });
};

const showTravelPanel = (control) => {
  const selectedPanel = document.getElementById(control.dataset.travelPanel);
  if (!selectedPanel) {
    console.error(`Travel advisory section not found: ${control.dataset.travelPanel}`);
    return false;
  }

  travelPanels.forEach((panel) => {
    panel.hidden = panel !== selectedPanel;
  });
  resetDetails();

  travelControls.forEach((button) => {
    const isSelected = button === control;
    button.classList.toggle('is-active', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });

  if (control.dataset.mapTitle) {
    const title = selectedPanel.querySelector('#travel-map-detail-title');
    if (title) {
      title.textContent = control.dataset.mapTitle;
    }
  }

  if (control.dataset.routeTitle) {
    const title = selectedPanel.querySelector('#travel-road-detail-title');
    if (title) {
      title.textContent = control.dataset.routeTitle;
    }
  }

  if (control.dataset.tollTitle) {
    const title = selectedPanel.querySelector('#travel-toll-plazas-detail-title');
    if (title) {
      title.textContent = control.dataset.tollTitle;
    }
  }

  return true;
};

const activateTravelControl = (control) => {
  if (control.matches('[data-travel-toggle]')) {
    const currentSubnav = document.getElementById(control.dataset.travelToggle);
    if (!currentSubnav) {
      console.error(`Travel advisory navigation group not found: ${control.dataset.travelToggle}`);
      return;
    }

    const shouldExpand = currentSubnav.hidden;
    const expandedGroups = getAncestorGroups(control);
    if (shouldExpand) {
      expandedGroups.push(control);
    }
    setExpandedGroups(expandedGroups);
    showTravelPanel(control);
    return;
  }

  setExpandedGroups(getAncestorGroups(control));
  showTravelPanel(control);
};

travelControls.forEach((control) => {
  control.addEventListener('click', () => activateTravelControl(control));
});

detailToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const content = document.getElementById(button.getAttribute('aria-controls'));
    if (!content) {
      console.error(`Travel advisory detail content not found: ${button.getAttribute('aria-controls')}`);
      return;
    }

    const isExpanded = content.hidden;
    content.hidden = !isExpanded;
    button.setAttribute('aria-expanded', String(isExpanded));
    button.textContent = isExpanded ? 'Hide Detail' : 'View Detail';
  });
});
