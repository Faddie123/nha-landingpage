(() => {
  const storageKey = "nha-media-admin-demo-v1";
  const albumContainer = document.querySelector("#adminPhotoAlbums");
  if (!albumContainer) return;

  function normalizeAlbumTitle(value) {
    return value.toLowerCase()
      .replace(/[\u00e2\u20ac\u201d\u2013\u2014-]+/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function createPhotoCard(item, albumName) {
    const card = document.createElement("article");
    card.className = "media-card admin-uploaded-photo";

    const imageLink = document.createElement("a");
    imageLink.className = "media-image";
    imageLink.href = item.asset;
    imageLink.target = "_blank";
    imageLink.rel = "noopener noreferrer";
    imageLink.setAttribute("aria-label", `View photo: ${item.title}`);
    const image = document.createElement("img");
    image.src = item.asset;
    image.alt = item.title;
    image.loading = "lazy";
    const category = document.createElement("span");
    category.className = "media-category";
    category.textContent = albumName;
    imageLink.append(image, category);

    const body = document.createElement("div");
    body.className = "media-card-body";
    const date = document.createElement("p");
    date.className = "media-date";
    date.textContent = item.date;
    const title = document.createElement("h3");
    title.textContent = item.title;
    body.append(date, title);
    if (item.summary) {
      const summary = document.createElement("p");
      summary.textContent = item.summary;
      body.append(summary);
    }

    card.append(imageLink, body);
    return card;
  }

  function createAlbum(albumName, photos) {
    const accordion = document.createElement("details");
    accordion.className = "media-accordion admin-uploaded-album";
    accordion.setAttribute("name", "media-gallery");

    const heading = document.createElement("summary");
    heading.className = "media-heading";
    const headingContent = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = albumName;
    const description = document.createElement("p");
    description.textContent = `${photos.length} ${photos.length === 1 ? "photo" : "photos"} added from the Media Admin demo.`;
    headingContent.append(title, description);
    heading.append(headingContent);

    const grid = document.createElement("div");
    grid.className = "media-grid";
    photos.forEach((item) => grid.append(createPhotoCard(item, albumName)));
    accordion.append(heading, grid);
    return accordion;
  }

  function renderUploadedAlbums() {
    document.querySelectorAll(".admin-uploaded-photo").forEach((card) => card.remove());
    albumContainer.replaceChildren();

    let saved;
    try {
      saved = localStorage.getItem(storageKey);
    } catch (error) {
      console.warn("Could not read uploaded Media Admin photos.", error);
      return;
    }
    if (!saved) return;

    let records;
    try {
      records = JSON.parse(saved);
    } catch (error) {
      console.warn("Could not parse uploaded Media Admin photos.", error);
      return;
    }
    if (!Array.isArray(records)) return;

    const albums = new Map();
    records.forEach((item) => {
      if (!item || item.type !== "Photo" || item.status !== "Published" ||
          typeof item.category !== "string" || typeof item.title !== "string" ||
          typeof item.date !== "string" || typeof item.asset !== "string" ||
          !item.asset.startsWith("data:image/")) return;
      const albumName = item.category.trim();
      if (!albumName) return;
      if (!albums.has(albumName)) albums.set(albumName, []);
      albums.get(albumName).push(item);
    });

    albums.forEach((photos, albumName) => {
      const normalizedTitle = normalizeAlbumTitle(albumName);
      const existingAlbum = [...document.querySelectorAll(".media-accordion:not(.admin-uploaded-album)")]
        .find((accordion) => normalizeAlbumTitle(
          accordion.querySelector(".media-heading h2")?.textContent || ""
        ) === normalizedTitle);
      const grid = existingAlbum?.querySelector(".media-grid");
      if (existingAlbum && grid) {
        photos.forEach((item) => grid.append(createPhotoCard(item, albumName)));
      } else {
        albumContainer.append(createAlbum(albumName, photos));
      }
    });
  }

  renderUploadedAlbums();
  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) renderUploadedAlbums();
  });
})();
