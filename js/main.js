(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#global-nav-links");
  const links = document.querySelectorAll(".global-nav a[href^='#']");
  const sections = [...document.querySelectorAll("main section[id]")];

  const setOpen = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  };

  toggle?.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  const highlight = () => {
    const offset = window.scrollY + 120;
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.offsetTop <= offset) current = section.id;
    }
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", highlight, { passive: true });
  highlight();

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
