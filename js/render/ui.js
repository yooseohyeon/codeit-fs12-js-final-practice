const loadingElement = document.getElementById("loading");

export function showLoading() {
  loadingElement.hidden = false;
}

export function hideLoading() {
  loadingElement.hidden = true;
}
