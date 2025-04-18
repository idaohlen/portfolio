export function handleRedirect(url, newWindow = true) {
  window.open(url, newWindow ? "_blank" : undefined);
}
