(() => {
      const storageKey = "nha-project-admin-prototype-v1";
      const sampleProjects = [
        { id: "sample-1", name: "Sample M-6 Motorway Project", code: "M-6", region: "Sindh", status: "In Progress", progress: 48, updated: "2026-11-16", note: "Sample update: construction progress reviewed." },
        { id: "sample-2", name: "Sample N-5 Highway Upgrade", code: "N-5", region: "Punjab", status: "Planning", progress: 18, updated: "2026-11-14", note: "Sample update: planning documentation in progress." },
        { id: "sample-3", name: "Sample KPEC Connectivity Project", code: "KPEC", region: "Khyber Pakhtunkhwa", status: "In Progress", progress: 67, updated: "2026-11-12", note: "Sample update: regional progress report added." },
        { id: "sample-4", name: "Sample Regional Road Program", code: "RRP-01", region: "Balochistan", status: "Completed", progress: 100, updated: "2026-11-08", note: "Sample update: marked complete for demonstration." }
      ];
      const sidebar = document.querySelector("#sidebar");
      const dialog = document.querySelector("#projectDialog");
      const projectForm = document.querySelector("#projectForm");
      const toast = document.querySelector("#toast");
      let loadWarning = "";
      let projects = loadProjects();
      let toastTimer;

      function isProject(value) {
        return value && typeof value.id === "string" && typeof value.name === "string" &&
          typeof value.code === "string" && typeof value.region === "string" &&
          ["Planning", "In Progress", "Completed"].includes(value.status) &&
          Number.isFinite(Number(value.progress)) && Number(value.progress) >= 0 &&
          Number(value.progress) <= 100 && typeof value.updated === "string" &&
          typeof value.note === "string";
      }

      function loadProjects() {
        try {
          const saved = localStorage.getItem(storageKey);
          if (!saved) return sampleProjects.map((project) => ({ ...project }));
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.every(isProject)) return parsed;
          loadWarning = "Saved demo data was invalid, so sample data has been loaded.";
        } catch (error) {
          console.warn("Could not read the project prototype's browser storage.", error);
          loadWarning = "Saved demo data could not be read, so sample data has been loaded.";
        }
        return sampleProjects.map((project) => ({ ...project }));
      }

      function saveProjects() {
        try {
          localStorage.setItem(storageKey, JSON.stringify(projects));
          return true;
        } catch (error) {
          console.error("Could not save project prototype data to browser storage.", error);
          return false;
        }
      }

      function showToast(message) {
        toast.textContent = message;
        toast.hidden = false;
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => { toast.hidden = true; }, 3600);
      }

      function statusClass(status) {
        return status.toLowerCase().replaceAll(" ", "-");
      }

      function createCell(text, className) {
        const cell = document.createElement("td");
        if (className) cell.className = className;
        cell.textContent = text;
        return cell;
      }

      function createProjectRow(project, includeActions) {
        const row = document.createElement("tr");
        const projectCell = document.createElement("td");
        const name = document.createElement("span");
        name.className = "project-name";
        name.textContent = project.name;
        const code = document.createElement("span");
        code.className = "project-code";
        code.textContent = project.code;
        projectCell.append(name, code);
        row.append(projectCell, createCell(project.region));

        const statusCell = document.createElement("td");
        const status = document.createElement("span");
        status.className = `status status-${statusClass(project.status)}`;
        status.textContent = project.status;
        statusCell.append(status);
        row.append(statusCell);

        const progressCell = document.createElement("td");
        progressCell.className = "progress-cell";
        const progressLabel = document.createElement("div");
        progressLabel.className = "progress-label";
        const progressText = document.createElement("span");
        progressText.textContent = "Progress";
        const progressValue = document.createElement("span");
        progressValue.textContent = `${project.progress}%`;
        progressLabel.append(progressText, progressValue);
        const track = document.createElement("div");
        track.className = "progress-track";
        track.setAttribute("role", "progressbar");
        track.setAttribute("aria-label", `${project.name} progress`);
        track.setAttribute("aria-valuemin", "0");
        track.setAttribute("aria-valuemax", "100");
        track.setAttribute("aria-valuenow", String(project.progress));
        const fill = document.createElement("span");
        fill.style.width = `${project.progress}%`;
        track.append(fill);
        progressCell.append(progressLabel, track);
        row.append(progressCell, createCell(project.updated));

        if (includeActions) {
          const actions = document.createElement("td");
          const actionGroup = document.createElement("div");
          actionGroup.className = "row-actions";
          const editButton = document.createElement("button");
          editButton.className = "icon-btn";
          editButton.type = "button";
          editButton.setAttribute("aria-label", `Edit ${project.name}`);
          editButton.innerHTML = '<i class="fa-solid fa-pen" aria-hidden="true"></i>';
          editButton.addEventListener("click", () => openProjectDialog(project.id));
          const deleteButton = document.createElement("button");
          deleteButton.className = "icon-btn";
          deleteButton.type = "button";
          deleteButton.setAttribute("aria-label", `Delete ${project.name}`);
          deleteButton.innerHTML = '<i class="fa-regular fa-trash-can" aria-hidden="true"></i>';
          deleteButton.addEventListener("click", () => deleteProject(project.id));
          actionGroup.append(editButton, deleteButton);
          actions.append(actionGroup);
          row.append(actions);
        }
        return row;
      }

      function render() {
        const inProgress = projects.filter((project) => project.status === "In Progress").length;
        const planning = projects.filter((project) => project.status === "Planning").length;
        const completed = projects.filter((project) => project.status === "Completed").length;
        document.querySelector('[data-stat="total"]').textContent = String(projects.length);
        document.querySelector('[data-stat="in-progress"]').textContent = String(inProgress);
        document.querySelector('[data-stat="planning"]').textContent = String(planning);
        document.querySelector('[data-stat="completed"]').textContent = String(completed);

        const recentBody = document.querySelector("#recentProjectsBody");
        recentBody.replaceChildren();
        [...projects].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 5)
          .forEach((project) => recentBody.append(createProjectRow(project, false)));

        const query = document.querySelector("#projectSearch").value.trim().toLowerCase();
        const selectedStatus = document.querySelector("#statusFilter").value;
        const filtered = projects.filter((project) => {
          const matchesQuery = `${project.name} ${project.code} ${project.region}`.toLowerCase().includes(query);
          return matchesQuery && (!selectedStatus || project.status === selectedStatus);
        });
        const projectsBody = document.querySelector("#projectsBody");
        projectsBody.replaceChildren();
        filtered.forEach((project) => projectsBody.append(createProjectRow(project, true)));
        document.querySelector("#projectCount").textContent = `Showing ${filtered.length} of ${projects.length} projects`;
        document.querySelector("#emptyProjects").hidden = filtered.length !== 0;
        renderUpdates();
      }

      function renderUpdates() {
        const list = document.querySelector("#updatesList");
        list.replaceChildren();
        [...projects].sort((a, b) => b.updated.localeCompare(a.updated)).forEach((project) => {
          const item = document.createElement("article");
          item.className = "update-item";
          const icon = document.createElement("span");
          icon.className = "update-icon";
          icon.innerHTML = '<i class="fa-solid fa-arrow-trend-up" aria-hidden="true"></i>';
          const copy = document.createElement("div");
          const heading = document.createElement("strong");
          heading.textContent = project.name;
          const note = document.createElement("p");
          note.textContent = project.note;
          copy.append(heading, note);
          const date = document.createElement("time");
          date.dateTime = project.updated;
          date.textContent = project.updated;
          item.append(icon, copy, date);
          list.append(item);
        });
        if (projects.length === 0) {
          const empty = document.createElement("p");
          empty.className = "empty-state";
          empty.textContent = "No project updates yet.";
          list.append(empty);
        }
      }

      function showPage(pageName) {
        document.querySelectorAll("[data-page-view]").forEach((view) => {
          view.hidden = view.dataset.pageView !== pageName;
        });
        document.querySelectorAll(".nav-link").forEach((link) => {
          const active = link.dataset.page === pageName;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
        document.querySelector("#topbarTitle").textContent =
          pageName === "updates" ? "Update history" : pageName[0].toUpperCase() + pageName.slice(1);
        sidebar.classList.remove("is-open");
      }

      function openProjectDialog(projectId) {
        projectForm.reset();
        const project = projects.find((item) => item.id === projectId);
        document.querySelector("#editProjectId").value = project ? project.id : "";
        document.querySelector("#dialogTitle").textContent = project ? "Edit project" : "Add project";
        document.querySelector("#projectUpdated").value = new Date().toISOString().slice(0, 10);
        if (project) {
          document.querySelector("#projectName").value = project.name;
          document.querySelector("#projectCode").value = project.code;
          document.querySelector("#projectRegion").value = project.region;
          document.querySelector("#projectStatus").value = project.status;
          document.querySelector("#projectProgress").value = project.progress;
          document.querySelector("#projectUpdated").value = project.updated;
          document.querySelector("#projectNote").value = project.note;
        }
        dialog.showModal();
        document.querySelector("#projectName").focus();
      }

      function deleteProject(projectId) {
        const project = projects.find((item) => item.id === projectId);
        if (!project || !window.confirm(`Delete "${project.name}" from this demo?`)) return;
        projects = projects.filter((item) => item.id !== projectId);
        const saved = saveProjects();
        render();
        showToast(saved ? "Demo project deleted." : "Deleted for this session only. Export JSON to keep the change.");
      }

      document.querySelectorAll(".nav-link").forEach((button) => {
        button.addEventListener("click", () => showPage(button.dataset.page));
      });
      document.querySelectorAll("[data-go-page]").forEach((button) => {
        button.addEventListener("click", () => showPage(button.dataset.goPage));
      });
      document.querySelectorAll("[data-add-project]").forEach((button) => {
        button.addEventListener("click", () => openProjectDialog(""));
      });
      document.querySelector("#projectSearch").addEventListener("input", render);
      document.querySelector("#statusFilter").addEventListener("change", render);
      document.querySelector("#mobileMenuButton").addEventListener("click", () => {
        sidebar.classList.toggle("is-open");
      });
      document.querySelector("#sidebarCloseButton").addEventListener("click", () => {
        sidebar.classList.remove("is-open");
      });
      const signOut = () => {
        window.location.href = "../signin/signin.html";
      };
      document.querySelector("#signoutButton").addEventListener("click", signOut);
      document.querySelector("#sidebarSignoutButton").addEventListener("click", signOut);
      document.querySelector("#closeDialogButton").addEventListener("click", () => dialog.close());
      document.querySelector("#cancelDialogButton").addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
      projectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!projectForm.reportValidity()) return;
        const formData = new FormData(projectForm);
        const existingId = document.querySelector("#editProjectId").value;
        const project = {
          id: existingId || `project-${Date.now()}`,
          name: String(formData.get("name")).trim(),
          code: String(formData.get("code")).trim(),
          region: String(formData.get("region")),
          status: String(formData.get("status")),
          progress: Number(formData.get("progress")),
          updated: String(formData.get("updated")),
          note: String(formData.get("note")).trim()
        };
        if (project.status === "Completed") project.progress = 100;
        projects = existingId
          ? projects.map((item) => item.id === existingId ? project : item)
          : [project, ...projects];
        const saved = saveProjects();
        render();
        dialog.close();
        showToast(saved
          ? (existingId ? "Project changes saved in this browser." : "Project added to this browser.")
          : "Change kept for this session only. Export JSON to keep it.");
      });

      document.querySelector("#exportButton").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "nha-projects-demo.json";
        link.click();
        URL.revokeObjectURL(downloadUrl);
        showToast("JSON export downloaded. It is not published to the website.");
      });
      document.querySelector("#importButton").addEventListener("click", () => {
        document.querySelector("#importFile").click();
      });
      document.querySelector("#importFile").addEventListener("change", async (event) => {
        const [file] = event.target.files;
        if (!file) return;
        try {
          const imported = JSON.parse(await file.text());
          if (!Array.isArray(imported) || !imported.every(isProject)) {
            throw new Error("The file does not contain a valid project list.");
          }
          projects = imported;
          const saved = saveProjects();
          render();
          showToast(saved
            ? `${projects.length} project records imported into this browser.`
            : "Import is active for this session only. Export JSON to keep it.");
        } catch (error) {
          showToast(error instanceof SyntaxError ? "Could not read JSON. Please choose a valid export file." : error.message);
        } finally {
          event.target.value = "";
        }
      });

      render();
      if (loadWarning) showToast(loadWarning);
    })();
