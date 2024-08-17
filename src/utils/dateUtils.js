export function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).replace(/ /g, " ");
}
