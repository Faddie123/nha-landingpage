const maintenancePanels = [...document.querySelectorAll('.maintenance-panel[id]')];
const maintenanceControls = [...document.querySelectorAll('[data-maintenance-panel]')];
const maintenanceGroupToggles = [...document.querySelectorAll('[data-maintenance-toggle]')];

maintenanceControls
  .filter((control) => !control.matches('[data-maintenance-toggle]'))
  .forEach((control) => {
    const panel = document.getElementById(control.dataset.maintenancePanel);
    if (!panel) {
      console.error(`Maintenance section not found: ${control.dataset.maintenancePanel}`);
      return;
    }

    const viewButton = document.createElement('button');
    viewButton.className = 'btn btn-navy sm maintenance-view-button';
    viewButton.type = 'button';
    viewButton.setAttribute('aria-label', `View ${control.textContent.trim()}`);
    viewButton.innerHTML = 'View Detail <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>';
    viewButton.addEventListener('click', () => control.click());
    panel.append(viewButton);
  });

const setExpandedGroup = (selectedGroup) => {
  maintenanceGroupToggles.forEach((toggle) => {
    const isExpanded = toggle === selectedGroup;
    const subnav = document.getElementById(toggle.dataset.maintenanceToggle);
    if (!subnav) {
      console.error(`Maintenance navigation group not found: ${toggle.dataset.maintenanceToggle}`);
      return;
    }

    subnav.hidden = !isExpanded;
    toggle.setAttribute('aria-expanded', String(isExpanded));
  });
};

const showMaintenancePanel = (control) => {
  const selectedPanel = document.getElementById(control.dataset.maintenancePanel);
  if (!selectedPanel) {
    console.error(`Maintenance section not found: ${control.dataset.maintenancePanel}`);
    return false;
  }

  maintenancePanels.forEach((panel) => {
    panel.hidden = panel !== selectedPanel;
  });

  maintenanceControls.forEach((button) => {
    const isSelected = button === control;
    button.classList.toggle('is-active', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
    button.classList.remove('is-current-group');
  });

  const selectedGroup = control.closest('.maintenance-subnav')?.previousElementSibling;
  if (selectedGroup?.matches('[data-maintenance-toggle]')) {
    selectedGroup.classList.add('is-current-group');
  } else if (control.matches('[data-maintenance-toggle]')) {
    control.classList.add('is-current-group');
  }

  return true;
};

maintenanceControls.forEach((control) => {
  control.addEventListener('click', () => {
    if (control.matches('[data-maintenance-toggle]')) {
      const currentSubnav = document.getElementById(control.dataset.maintenanceToggle);
      if (!currentSubnav) {
        console.error(`Maintenance navigation group not found: ${control.dataset.maintenanceToggle}`);
        return;
      }

      const shouldExpand = currentSubnav.hidden;
      setExpandedGroup(shouldExpand ? control : null);
      showMaintenancePanel(control);
      return;
    }

    const selectedGroup = control.closest('.maintenance-subnav')?.previousElementSibling;
    setExpandedGroup(selectedGroup?.matches('[data-maintenance-toggle]') ? selectedGroup : null);
    showMaintenancePanel(control);
  });
});
