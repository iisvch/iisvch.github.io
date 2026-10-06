/* Small progressive enhancements; content remains readable without JavaScript. */
(() => {
  "use strict";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress = document.querySelector(".reading-progress");
  const topButton = document.querySelector(".back-to-top");
  let scrollQueued = false;
  const updateScroll = () => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 0}%`;
    if (topButton) topButton.classList.toggle("is-visible", window.scrollY > 700);
    scrollQueued = false;
  };
  window.addEventListener("scroll", () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener("resize", updateScroll);
  updateScroll();
  topButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
    document.querySelector(".navbar-brand")?.focus({ preventScroll: true });
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    document.documentElement.classList.add("js-reveal");
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
  }

  const scenarios = {
    low: { label: "Conservative NPV", npv: -72649, description: "Negative modeled returns at the lower prediction bounds. Reassess the office if early transaction activity follows this path." },
    base: { label: "Base case NPV", npv: 215512, description: "Positive modeled returns at the point forecast. Enter with a lean operating structure and monitor market activity." },
    high: { label: "Optimistic NPV", npv: 503713, description: "Stronger modeled returns at the upper prediction bounds. The optimal commission and staffing configuration remains the same." }
  };
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  document.querySelectorAll("[data-scenario]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.scenario;
      const scenario = scenarios[key];
      if (!scenario) return;
      document.getElementById("scenario-label").textContent = scenario.label;
      const value = document.getElementById("scenario-npv");
      value.textContent = money.format(scenario.npv).replace("-", "−");
      value.classList.toggle("is-negative", scenario.npv < 0);
      document.getElementById("scenario-description").textContent = scenario.description;
      document.querySelectorAll("[data-scenario]").forEach(el => el.setAttribute("aria-pressed", String(el === button)));
      document.querySelectorAll("[data-scenario-marker]").forEach(el => el.classList.toggle("is-selected", el.dataset.scenarioMarker === key));
    });
  });

  const dialog = document.getElementById("chart-dialog");
  if (dialog && typeof dialog.showModal === "function") {
    document.querySelectorAll("[data-expand-chart]").forEach(button => {
      button.addEventListener("click", () => {
        const original = button.querySelector("img");
        const expanded = dialog.querySelector("img");
        expanded.src = original.src;
        expanded.alt = original.alt;
        dialog.querySelector(".dialog-caption").textContent = button.closest("figure")?.querySelector("figcaption")?.textContent || "";
        dialog.showModal();
      });
    });
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  }

  const sectionLinks = [...document.querySelectorAll(".case-nav a")];
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) sectionLinks.forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-160px 0px -55% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();
