function revealSection(hash) {
  if (!hash) return;

  const target = document.getElementById(hash.slice(1));
  if (!target) return;

  let opened = false;
  for (let element = target; element; element = element.parentElement) {
    if (element instanceof HTMLDetailsElement && !element.open) {
      element.open = true;
      opened = true;
    }
  }

  if (opened) target.scrollIntoView();
}

revealSection(location.hash);
window.addEventListener("hashchange", () => revealSection(location.hash));
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (link) revealSection(link.hash);
});
