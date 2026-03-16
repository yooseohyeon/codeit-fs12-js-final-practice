export function saveSettings(type, category, sort) {
  localStorage.setItem(
    "filterSettings",
    JSON.stringify({ type, category, sort }),
  );
}

export function loadSettings() {
  const settings = localStorage.getItem("filterSettings");
  return settings
    ? JSON.parse(settings)
    : { type: "all", category: "all", sort: "date-desc" };
}
