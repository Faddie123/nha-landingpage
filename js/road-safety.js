const safetyTopics = [...document.querySelectorAll("[data-safety-topic]")];
const safetyDetails = [...document.querySelectorAll("[data-safety-detail]")];

safetyTopics.forEach((topic) => {
  topic.addEventListener("click", () => {
    const isOpening = topic.getAttribute("aria-expanded") !== "true";
    const selectedTopic = isOpening ? topic.dataset.safetyTopic : null;

    safetyTopics.forEach((item) => {
      const isExpanded = item === topic && isOpening;
      item.setAttribute("aria-expanded", String(isExpanded));
      item.querySelector("[data-safety-action]").textContent = isExpanded ? "Hide tip" : "View tip";
    });

    safetyDetails.forEach((detail) => {
      detail.hidden = detail.dataset.safetyDetail !== selectedTopic;
    });
  });
});
