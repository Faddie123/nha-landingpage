const complaintPanels = [...document.querySelectorAll('.complaints-panel[id]')];
const complaintControls = [...document.querySelectorAll('[data-complaint-panel]')];

complaintControls.forEach((control) => {
  control.addEventListener('click', () => {
    const selectedPanel = document.getElementById(control.dataset.complaintPanel);
    if (!selectedPanel) {
      console.error(`Complaint section not found: ${control.dataset.complaintPanel}`);
      return;
    }

    complaintPanels.forEach((panel) => {
      panel.hidden = panel !== selectedPanel;
      panel.classList.toggle('is-active', panel === selectedPanel);
    });

    document.querySelectorAll('.complaints-nav-button').forEach((button) => {
      const isSelected = button.dataset.complaintPanel === selectedPanel.id;
      button.classList.toggle('is-active', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
  });
});
