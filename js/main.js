(() => {
  const header = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#menu");
  const links = document.querySelectorAll(".menu a[href^='#']");
  const sections = [...document.querySelectorAll("main section[id]")];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setOpen = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
  };

  toggle?.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  links.forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
    const offset = window.scrollY + 140;
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.offsetTop <= offset) current = section.id;
    }
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll(".reveal").forEach((el, index) => {
    el.style.animationDelay = `${Math.min(index % 6, 5) * 70}ms`;
    if (reduce) {
      el.classList.add("in");
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
    observer.observe(el);
  });

  if (!reduce) {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const decimals = Number(el.dataset.decimals || 0);
      let start = null;
      const duration = 1100;
      const tick = (now) => {
        if (!start) start = now;
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (t < 1) requestAnimationFrame(tick);
      };
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      });
      observer.observe(el);
    });
  }
})();
