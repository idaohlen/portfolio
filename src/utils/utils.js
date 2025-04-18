export function handleRedirect(url, newWindow = true) {
  window.open(url, newWindow ? "_blank" : undefined);
}

export function getActualHeight(element) {
  const clone = element.cloneNode(true);

  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.height = "auto";
  clone.style.display = "flex";
  clone.style.overflow = "visible";

  document.body.appendChild(clone);
  const height = clone.offsetHeight;
  document.body.removeChild(clone);

  return height;
}
