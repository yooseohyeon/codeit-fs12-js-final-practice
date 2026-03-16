const loadingElement = document.getElementById("loading");
const toastContainer = document.querySelector("#toast-container");

export function showLoading() {
  loadingElement.hidden = false;
}

export function hideLoading() {
  loadingElement.hidden = true;
}

export function showToast(message, type = "error", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toastContainer.removeChild(toast), 300);
  }, duration);
}
