const downloadTabs = [...document.querySelectorAll("[data-download-category]")];
const downloadPanels = [...document.querySelectorAll("[data-download-panel]")];

function selectDownloadCategory(tab, moveFocus = false) {
  const category = tab.dataset.downloadCategory;

  downloadTabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  downloadPanels.forEach((panel) => {
    panel.hidden = panel.dataset.downloadPanel !== category;
  });

  if (moveFocus) tab.focus();
}

downloadTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectDownloadCategory(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % downloadTabs.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + downloadTabs.length) % downloadTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = downloadTabs.length - 1;
    else return;

    event.preventDefault();
    selectDownloadCategory(downloadTabs[nextIndex], true);
  });
});
