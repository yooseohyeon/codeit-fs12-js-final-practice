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

export function saveFormDraft(data) {
  sessionStorage.setItem("formDraft", JSON.stringify(data));
}

export function loadFormDraft() {
  const draft = sessionStorage.getItem("formDraft");
  return draft ? JSON.parse(draft) : null;
}

export function clearFormDraft() {
  sessionStorage.removeItem("formDraft");
}
