export function copyLink(e) {
  if (e.target.textContent.toLowerCase() === "copy link") {
    e.target.textContent = "copied link";
  }
}
