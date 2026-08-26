(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const links = document.querySelectorAll(".nav-link");
  const sections = [...document.querySelectorAll("main section[id]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setNavOpen = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setNavOpen(open);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setNavOpen(false);
  });

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const highlight = () => {
    const offset = window.scrollY + 120;
    let current = sections[0]?.id;

    for (const section of sections) {
      if (section.offsetTop <= offset) current = section.id;
    }

    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("is-active", active);
    });
  };

  window.addEventListener("scroll", highlight, { passive: true });
  highlight();

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }
})();
