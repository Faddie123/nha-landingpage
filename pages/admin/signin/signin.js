document.querySelector("#signinForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!event.currentTarget.reportValidity()) return;
      window.location.href = "../dashboard/dashboard.html";
    });
