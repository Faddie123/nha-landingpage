document.querySelector("#mediaSigninForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  sessionStorage.setItem("nha-media-admin-demo-session", "signed-in");
  window.location.href = "../dashboard/dashboard.html";
});
