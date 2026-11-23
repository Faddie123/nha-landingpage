(() => {
  const sessionKey = "nha-media-admin-demo-session";
  if (sessionStorage.getItem(sessionKey) !== "signed-in") {
    window.location.replace("../signin/signin.html");
    return;
  }

  const storageKey = "nha-media-admin-demo-v1";
  const sampleItems = [
    { id: "media-demo-1", title: "Sample highway project announcement", type: "News", category: "News & announcements", status: "Published", date: "2026-11-16", asset: "", summary: "Demo news content — replace with an approved NHA announcement." },
    { id: "media-demo-2", title: "Sample project inauguration gallery", type: "Photo", category: "NHA Projects & Events", status: "Published", date: "2026-11-13", asset: "", summary: "Demo photo gallery entry for a project event." },
    { id: "media-demo-3", title: "Sample maintenance work update", type: "Photo", category: "Maintenance Work", status: "Draft", date: "2026-11-10", asset: "", summary: "Draft example for a road maintenance photo update." },
    { id: "media-demo-4", title: "Sample project briefing", type: "Video", category: "Videos & interviews", status: "Published", date: "2026-11-06", asset: "", summary: "Demo video item — select a media file before publishing." }
  ];
  const sidebar = document.querySelector("#sidebar");
  const dialog = document.querySelector("#mediaDialog");
  const mediaForm = document.querySelector("#mediaForm");
  const mediaFile = document.querySelector("#mediaFile");
  const mediaAsset = document.querySelector("#mediaAsset");
  const mediaAssetName = document.querySelector("#mediaAssetName");
  const mediaFileName = document.querySelector("#mediaFileName");
  const toast = document.querySelector("#toast");
  let loadWarning = "";
  let items = loadItems();
  let toastTimer;
  let assetReadPromise = Promise.resolve();
  let selectedAssets = [];

  function isMediaItem(item) {
    return item && typeof item.id === "string" && typeof item.title === "string" &&
      ["News", "Photo", "Video", "Document"].includes(item.type) &&
      typeof item.category === "string" && ["Draft", "Published"].includes(item.status) &&
      typeof item.date === "string" && typeof item.asset === "string" &&
      typeof item.summary === "string" &&
      (item.assetName === undefined || typeof item.assetName === "string");
  }

  function loadItems() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return sampleItems.map((item) => ({ ...item }));
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.every(isMediaItem)) return parsed;
      loadWarning = "Saved demo data was invalid, so sample media has been loaded.";
    } catch (error) {
      console.warn("Could not read the media prototype's browser storage.", error);
      loadWarning = "Saved demo media could not be read, so sample media has been loaded.";
    }
    return sampleItems.map((item) => ({ ...item }));
  }

  function saveItems() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
      return true;
    } catch (error) {
      console.error("Could not save media prototype data to browser storage.", error);
      return false;
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 3600);
  }

  function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  }

  function createMediaRow(item, includeActions) {
    const row = document.createElement("tr");
    const titleCell = document.createElement("td");
    const title = document.createElement("span");
    title.className = "media-title";
    title.textContent = item.title;
    const summary = document.createElement("span");
    summary.className = "media-summary";
    summary.textContent = item.summary;
    titleCell.append(title, summary);

    const typeCell = document.createElement("td");
    const typeLabel = document.createElement("span");
    typeLabel.className = "media-type-label";
    const typeIcon = document.createElement("i");
    typeIcon.className = item.type === "Photo"
      ? "fa-regular fa-image"
      : item.type === "Video"
        ? "fa-solid fa-video"
        : item.type === "Document"
          ? "fa-regular fa-file-lines"
          : "fa-regular fa-newspaper";
    typeIcon.setAttribute("aria-hidden", "true");
    const typeText = document.createElement("span");
    typeText.textContent = item.type;
    typeLabel.append(typeIcon, typeText);
    typeCell.append(typeLabel);

    const statusCell = document.createElement("td");
    const status = document.createElement("span");
    status.className = `status status-${item.status.toLowerCase()}`;
    status.textContent = item.status;
    statusCell.append(status);

    row.append(titleCell, typeCell, createCell(item.category), statusCell, createCell(item.date));
    if (includeActions) {
      const actionCell = document.createElement("td");
      const actionGroup = document.createElement("div");
      actionGroup.className = "media-actions";
      const editButton = document.createElement("button");
      editButton.className = "icon-btn";
      editButton.type = "button";
      editButton.setAttribute("aria-label", `Edit ${item.title}`);
      editButton.innerHTML = '<i class="fa-solid fa-pen" aria-hidden="true"></i>';
      editButton.addEventListener("click", () => openMediaDialog(item.id));
      const deleteButton = document.createElement("button");
      deleteButton.className = "icon-btn";
      deleteButton.type = "button";
      deleteButton.setAttribute("aria-label", `Delete ${item.title}`);
      deleteButton.innerHTML = '<i class="fa-regular fa-trash-can" aria-hidden="true"></i>';
      deleteButton.addEventListener("click", () => deleteItem(item.id));
      actionGroup.append(editButton, deleteButton);
      actionCell.append(actionGroup);
      row.append(actionCell);
    }
    return row;
  }

  function render() {
    const published = items.filter((item) => item.status === "Published").length;
    const drafts = items.filter((item) => item.status === "Draft").length;
    const visual = items.filter((item) => ["Photo", "Video"].includes(item.type)).length;
    document.querySelector('[data-stat="total"]').textContent = String(items.length);
    document.querySelector('[data-stat="published"]').textContent = String(published);
    document.querySelector('[data-stat="draft"]').textContent = String(drafts);
    document.querySelector('[data-stat="visual"]').textContent = String(visual);

    const sortedItems = [...items].sort((a, b) => b.date.localeCompare(a.date));
    const recentBody = document.querySelector("#recentMediaBody");
    recentBody.replaceChildren();
    sortedItems.slice(0, 5).forEach((item) => recentBody.append(createMediaRow(item, false)));

    const query = document.querySelector("#mediaSearch").value.trim().toLowerCase();
    const selectedType = document.querySelector("#typeFilter").value;
    const selectedStatus = document.querySelector("#statusFilter").value;
    const filtered = sortedItems.filter((item) => {
      const searchable = `${item.title} ${item.category} ${item.summary}`.toLowerCase();
      return searchable.includes(query) &&
        (!selectedType || item.type === selectedType) &&
        (!selectedStatus || item.status === selectedStatus);
    });
    const mediaBody = document.querySelector("#mediaItemsBody");
    mediaBody.replaceChildren();
    filtered.forEach((item) => mediaBody.append(createMediaRow(item, true)));
    document.querySelector("#mediaCount").textContent = `Showing ${filtered.length} of ${items.length} items`;
    document.querySelector("#emptyMedia").hidden = filtered.length !== 0;
    renderPhotoAlbums();
  }

  function renderPhotoAlbums() {
    const container = document.querySelector("#photoAlbums");
    const groups = new Map();
    items.filter((item) => item.type === "Photo").forEach((item) => {
      const albumName = item.category.trim() || "Untitled album";
      if (!groups.has(albumName)) groups.set(albumName, []);
      groups.get(albumName).push(item);
    });

    container.replaceChildren();
    document.querySelector("#emptyPhotoAlbums").hidden = groups.size !== 0;

    [...groups.entries()].sort(([nameA], [nameB]) => nameA.localeCompare(nameB)).forEach(([albumName, photos]) => {
      const accordion = document.createElement("details");
      accordion.className = "media-accordion photo-album";
      accordion.dataset.albumName = albumName;

      const heading = document.createElement("summary");
      heading.className = "media-heading";
      const headingContent = document.createElement("div");
      const bar = document.createElement("span");
      bar.className = "bar";
      const title = document.createElement("h2");
      title.textContent = albumName;
      const count = document.createElement("p");
      count.textContent = `${photos.length} ${photos.length === 1 ? "photo" : "photos"}`;
      headingContent.append(bar, title, count);
      heading.append(headingContent);

      const albumBody = document.createElement("div");
      albumBody.className = "photo-album-body";
      const albumActions = document.createElement("div");
      albumActions.className = "photo-album-actions";
      const addPhotosButton = document.createElement("button");
      addPhotosButton.className = "secondary-btn";
      addPhotosButton.type = "button";
      addPhotosButton.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i>Add photos';
      addPhotosButton.addEventListener("click", () => openPhotoDialog(albumName));
      albumActions.append(addPhotosButton);

      const grid = document.createElement("div");
      grid.className = "media-grid";
      photos.sort((a, b) => b.date.localeCompare(a.date)).forEach((item) => {
        const card = document.createElement("article");
        card.className = "media-card";
        const preview = document.createElement("div");
        preview.className = "media-image";
        if (item.asset.startsWith("data:image/")) {
          const image = document.createElement("img");
          image.src = item.asset;
          image.alt = item.title;
          image.loading = "lazy";
          preview.append(image);
        } else {
          const placeholder = document.createElement("span");
          placeholder.className = "photo-preview-placeholder";
          placeholder.innerHTML = '<i class="fa-regular fa-image" aria-hidden="true"></i>No uploaded image';
          preview.append(placeholder);
        }
        const category = document.createElement("span");
        category.className = "media-category";
        category.textContent = albumName;
        preview.append(category);

        const cardBody = document.createElement("div");
        cardBody.className = "media-card-body";
        const date = document.createElement("p");
        date.className = "media-date";
        date.textContent = item.date;
        const photoTitle = document.createElement("h3");
        photoTitle.textContent = item.title;
        cardBody.append(date, photoTitle);
        if (item.summary) {
          const summary = document.createElement("p");
          summary.textContent = item.summary;
          cardBody.append(summary);
        }

        const actions = document.createElement("div");
        actions.className = "media-actions photo-card-actions";
        const editButton = document.createElement("button");
        editButton.className = "icon-btn";
        editButton.type = "button";
        editButton.setAttribute("aria-label", `Update ${item.title}`);
        editButton.title = "Update or replace photo";
        editButton.innerHTML = '<i class="fa-solid fa-pen" aria-hidden="true"></i>';
        editButton.addEventListener("click", () => openMediaDialog(item.id));
        const removeButton = document.createElement("button");
        removeButton.className = "icon-btn";
        removeButton.type = "button";
        removeButton.setAttribute("aria-label", `Delete ${item.title}`);
        removeButton.title = "Delete photo";
        removeButton.innerHTML = '<i class="fa-regular fa-trash-can" aria-hidden="true"></i>';
        removeButton.addEventListener("click", () => deleteItem(item.id));
        actions.append(editButton, removeButton);
        cardBody.append(actions);
        card.append(preview, cardBody);
        grid.append(card);
      });

      albumBody.append(albumActions, grid);
      accordion.append(heading, albumBody);
      container.append(accordion);
    });
  }

  function showPage(pageName) {
    document.querySelectorAll("[data-page-view]").forEach((view) => {
      view.hidden = view.dataset.pageView !== pageName;
    });
    document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
      const active = link.dataset.page === pageName;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.querySelector("#topbarTitle").textContent = pageName === "library"
      ? "Media library"
      : pageName === "albums" ? "Photo albums" : "Overview";
    sidebar.classList.remove("is-open");
  }

  function openMediaDialog(itemId) {
    mediaForm.reset();
    assetReadPromise = Promise.resolve();
    selectedAssets = [];
    const item = items.find((entry) => entry.id === itemId);
    document.querySelector("#editMediaId").value = item ? item.id : "";
    document.querySelector("#mediaDialogTitle").textContent = item ? "Edit media item" : "Add media item";
    document.querySelector("#mediaDate").value = new Date().toISOString().slice(0, 10);
    mediaAsset.value = item ? item.asset : "";
    mediaAssetName.value = item ? item.assetName || "" : "";
    mediaFileName.textContent = item && item.assetName
      ? `Current file: ${item.assetName}`
      : item && item.asset ? "Current media file attached" : "No file selected";
    if (item) {
      document.querySelector("#mediaTitle").value = item.title;
      document.querySelector("#mediaType").value = item.type;
      document.querySelector("#mediaCategory").value = item.category;
      document.querySelector("#mediaStatus").value = item.status;
      document.querySelector("#mediaDate").value = item.date;
      document.querySelector("#mediaSummary").value = item.summary;
    }
    updateFileAccept();
    dialog.showModal();
    document.querySelector("#mediaTitle").focus();
  }

  function openPhotoDialog(albumName = "") {
    openMediaDialog("");
    document.querySelector("#mediaType").value = "Photo";
    document.querySelector("#mediaCategory").value = albumName;
    document.querySelector("#mediaStatus").value = "Published";
    updateFileAccept();
    document.querySelector("#mediaCategory").focus();
  }

  function updateFileAccept() {
    const type = document.querySelector("#mediaType").value;
    const isPhoto = type === "Photo";
    const isEditing = Boolean(document.querySelector("#editMediaId").value);
    document.querySelector("#mediaTitleLabel").textContent = isPhoto
      ? "Photo title (optional; blank uses file name)"
      : "Title";
    document.querySelector("#mediaCategoryLabel").textContent = isPhoto ? "Album / tile name" : "Category";
    document.querySelector("#mediaCategory").placeholder = isPhoto
      ? "e.g. Maintenance Work - Balochistan South"
      : "News & announcements";
    document.querySelector("#mediaTitle").required = !isPhoto;
    document.querySelector("#mediaSummary").required = !isPhoto;
    mediaFile.multiple = isPhoto && !isEditing;
    document.querySelector(".upload-note").textContent = isPhoto
      ? isEditing
        ? "Choose one replacement photo. It will be optimized for this browser demo (up to 10 MB original)."
        : "Select multiple photos to create or add to this tile. Images are optimized in this browser demo (up to 10 MB each)."
      : "Files stay in this browser demo. Maximum file size: 1 MB.";
    mediaFile.accept = type === "Video"
      ? "video/*"
      : type === "Document"
        ? ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        : "image/*";
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.addEventListener("error", () => reject(reader.error || new Error("File could not be read.")));
      reader.readAsDataURL(file);
    });
  }

  function optimizePhotoAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const sourceUrl = URL.createObjectURL(file);
      const image = new Image();
      const profiles = [
        { maxDimension: 1600, quality: 0.8 },
        { maxDimension: 1440, quality: 0.72 },
        { maxDimension: 1280, quality: 0.65 },
        { maxDimension: 1100, quality: 0.58 }
      ];

      image.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) {
          URL.revokeObjectURL(sourceUrl);
          reject(new Error("Image optimization is not supported in this browser."));
          return;
        }

        const encode = (profileIndex) => {
          const profile = profiles[profileIndex];
          const scale = Math.min(1, profile.maxDimension / image.width, profile.maxDimension / image.height);
          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (!blob) {
              URL.revokeObjectURL(sourceUrl);
              reject(new Error("The selected photo could not be optimized."));
              return;
            }
            if (blob.size > 300 * 1024 && profileIndex < profiles.length - 1) {
              encode(profileIndex + 1);
              return;
            }
            if (blob.size > 300 * 1024) {
              URL.revokeObjectURL(sourceUrl);
              reject(new Error("This photo is too large to store in the browser demo."));
              return;
            }
            URL.revokeObjectURL(sourceUrl);
            readFileAsDataUrl(blob).then(resolve, reject);
          }, "image/jpeg", profile.quality);
        };

        encode(0);
      });
      image.addEventListener("error", () => {
        URL.revokeObjectURL(sourceUrl);
        reject(new Error("The selected file is not a readable photo."));
      });
      image.src = sourceUrl;
    });
  }

  function deleteItem(itemId) {
    const item = items.find((entry) => entry.id === itemId);
    if (!item || !window.confirm(`Delete "${item.title}" from this demo?`)) return;
    items = items.filter((entry) => entry.id !== itemId);
    const saved = saveItems();
    render();
    showToast(saved ? "Media item deleted." : "Deleted for this session only. Export JSON to keep the change.");
  }

  document.querySelectorAll(".nav-link[data-page]").forEach((button) => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });
  document.querySelectorAll("[data-go-page]").forEach((button) => {
    button.addEventListener("click", () => showPage(button.dataset.goPage));
  });
  document.querySelectorAll("[data-add-media]").forEach((button) => {
    button.addEventListener("click", () => openMediaDialog(""));
  });
  document.querySelectorAll("[data-add-photo]").forEach((button) => {
    button.addEventListener("click", () => openPhotoDialog());
  });
  document.querySelector("#mediaSearch").addEventListener("input", render);
  document.querySelector("#typeFilter").addEventListener("change", render);
  document.querySelector("#statusFilter").addEventListener("change", render);
  document.querySelector("#mobileMenuButton").addEventListener("click", () => sidebar.classList.toggle("is-open"));
  document.querySelector("#sidebarCloseButton").addEventListener("click", () => sidebar.classList.remove("is-open"));
  const signOut = () => {
    sessionStorage.removeItem(sessionKey);
    window.location.href = "../signin/signin.html";
  };
  document.querySelector("#signoutButton").addEventListener("click", signOut);
  document.querySelector("#sidebarSignoutButton").addEventListener("click", signOut);
  document.querySelector("#closeDialogButton").addEventListener("click", () => dialog.close());
  document.querySelector("#cancelDialogButton").addEventListener("click", () => dialog.close());
  document.querySelector("#mediaUploadButton").addEventListener("click", () => mediaFile.click());
  document.querySelector("#mediaType").addEventListener("change", () => {
    selectedAssets = [];
    mediaFile.value = "";
    const existing = items.find((item) => item.id === document.querySelector("#editMediaId").value);
    if (document.querySelector("#mediaType").value === "Photo" && !existing) {
      document.querySelector("#mediaStatus").value = "Published";
    }
    mediaAsset.value = existing ? existing.asset : "";
    mediaAssetName.value = existing ? existing.assetName || "" : "";
    mediaFileName.textContent = existing && existing.assetName
      ? `Current file: ${existing.assetName}`
      : existing && existing.asset ? "Current media file attached" : "No file selected";
    updateFileAccept();
  });
  mediaFile.addEventListener("change", () => {
    const files = Array.from(mediaFile.files || []);
    if (files.length === 0) return;
    const type = document.querySelector("#mediaType").value;
    const maxFileSize = type === "Photo" ? 10 * 1024 * 1024 : 1024 * 1024;
    if (files.some((file) => file.size > maxFileSize)) {
      mediaFile.value = "";
      selectedAssets = [];
      showToast(type === "Photo"
        ? "Each photo must be smaller than 10 MB."
        : "Choose a file smaller than 1 MB for this browser demo.");
      return;
    }
    if (type === "Photo" && files.some((file) => !file.type.startsWith("image/"))) {
      mediaFile.value = "";
      selectedAssets = [];
      showToast("Choose image files for a photo album.");
      return;
    }
    mediaFileName.textContent = files.length === 1
      ? `Loading ${files[0].name}...`
      : `Loading ${files.length} photos...`;
    assetReadPromise = Promise.all(files.map(async (file) => ({
      asset: String(await (type === "Photo" ? optimizePhotoAsDataUrl(file) : readFileAsDataUrl(file))),
      assetName: file.name
    }))).then((assets) => {
      selectedAssets = assets;
      mediaAsset.value = assets.length === 1 ? assets[0].asset : "";
      mediaAssetName.value = assets.length === 1 ? assets[0].assetName : "";
      mediaFileName.textContent = assets.length === 1
        ? assets[0].assetName
        : `${assets.length} photos selected`;
    }).catch((error) => {
      console.error("Could not read the selected media file.", error);
      mediaFile.value = "";
      selectedAssets = [];
      mediaFileName.textContent = "No file selected";
      showToast("The selected file could not be read. Please choose it again.");
    });
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  mediaForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!mediaForm.reportValidity()) return;
    await assetReadPromise;
    const formData = new FormData(mediaForm);
    const existingId = document.querySelector("#editMediaId").value;
    const type = String(formData.get("type"));
    const isNewPhotoAlbum = type === "Photo" && !existingId;
    const title = String(formData.get("title") || "").trim();
    const category = String(formData.get("category")).trim();
    const status = String(formData.get("status"));
    const date = String(formData.get("date"));
    const summary = String(formData.get("summary") || "").trim();
    if (type === "Photo" && !existingId && selectedAssets.length === 0) {
      showToast("Choose at least one photo to create an album tile.");
      return;
    }

    if (type === "Photo" && !existingId) {
      const newPhotos = selectedAssets.map((asset, index) => {
        const fileTitle = asset.assetName.replace(/\.[^.]+$/, "") || `Photo ${index + 1}`;
        return {
          id: `media-${Date.now()}-${index}`,
          title: selectedAssets.length === 1 && title ? title : fileTitle,
          type,
          category,
          status,
          date,
          asset: asset.asset,
          assetName: asset.assetName,
          summary
        };
      });
      items = [...newPhotos, ...items];
    } else {
      const existing = items.find((entry) => entry.id === existingId);
      const selectedAsset = selectedAssets[0];
      const item = {
        id: existingId || `media-${Date.now()}`,
        title: title || (type === "Photo" && selectedAsset
          ? selectedAsset.assetName.replace(/\.[^.]+$/, "")
          : existing ? existing.title : ""),
        type,
        category,
        status,
        date,
        asset: selectedAsset ? selectedAsset.asset : String(formData.get("asset") || "").trim(),
        assetName: selectedAsset ? selectedAsset.assetName : String(formData.get("assetName") || "").trim(),
        summary
      };
      items = existingId
        ? items.map((entry) => entry.id === existingId ? item : entry)
        : [item, ...items];
    }
    const saved = saveItems();
    render();
    dialog.close();
    if (isNewPhotoAlbum) {
      showPage("albums");
      const album = [...document.querySelectorAll(".photo-album")]
        .find((entry) => entry.dataset.albumName === category);
      if (album) {
        album.open = true;
        album.scrollIntoView({ block: "nearest" });
      }
    }
    showToast(saved
      ? (isNewPhotoAlbum
        ? `Photos added to the "${category}" album in this browser.`
        : existingId ? "Media item updated in this browser." : "Media item added to this browser.")
      : "Browser storage may be full. This change is temporary; choose a smaller file or export JSON.");
  });

  document.querySelector("#exportButton").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "nha-media-demo.json";
    link.click();
    URL.revokeObjectURL(downloadUrl);
    showToast("Media JSON exported. It is not published to the website.");
  });
  document.querySelector("#importButton").addEventListener("click", () => {
    document.querySelector("#importFile").click();
  });
  document.querySelector("#importFile").addEventListener("change", async (event) => {
    const [file] = event.target.files;
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      if (!Array.isArray(imported) || !imported.every(isMediaItem)) {
        throw new Error("The file does not contain a valid media list.");
      }
      items = imported;
      const saved = saveItems();
      render();
      showToast(saved
        ? `${items.length} media items imported into this browser.`
        : "Import is active for this session only. Export JSON to keep it.");
    } catch (error) {
      showToast(error instanceof SyntaxError ? "Could not read JSON. Please choose a valid media export file." : error.message);
    } finally {
      event.target.value = "";
    }
  });

  render();
  if (loadWarning) showToast(loadWarning);
})();
