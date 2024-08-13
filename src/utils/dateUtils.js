// Returns the current date in YYYY-MM-DD format
export function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}
