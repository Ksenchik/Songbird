export function route(event) {
  event = event || window.event;
  event.preventDefault();

  if (!event.target.href) return false;

  const routePath = event.target.href
    .replace("Songbird/songbird/dist/", "")
    .replace(window.location.origin, "")
    .replace("index.html", "")
    .replace("/", "")
    .replace("#", "");

  window.location.hash = routePath;
}
