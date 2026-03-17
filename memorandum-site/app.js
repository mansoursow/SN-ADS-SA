function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function setActiveNavBySection() {
  const links = Array.from(document.querySelectorAll(".site-nav a"));
  const targets = links
    .map((a) => {
      const id = a.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      return { a, el };
    })
    .filter((x) => x.el);

  if (!targets.length) return;

  const header = document.querySelector(".site-header");
  const headerH = header ? header.getBoundingClientRect().height : 0;

  const y = window.scrollY + headerH + 10;
  let best = targets[0];
  for (const t of targets) {
    const top = t.el.offsetTop;
    if (top <= y) best = t;
  }

  for (const t of targets) t.a.classList.toggle("is-active", t === best);
}

function setupReveal() {
  const els = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!els.length) return;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduced) {
    for (const el of els) el.classList.add("is-visible");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
  );

  for (const el of els) io.observe(el);
}

function setupMobileNav() {
  const header = document.querySelector(".site-header");
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!header || !btn || !nav) return;

  function close() {
    header.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (e) => {
    const a = e.target instanceof HTMLElement ? e.target.closest("a") : null;
    if (a) close();
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (!header.contains(target)) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function setupPrint() {
  const btn = document.querySelector("[data-print]");
  if (!btn) return;
  btn.addEventListener("click", () => window.print());
}

function setupHeroParallax() {
  const mediaImg = document.querySelector(".hero-media img");
  const hero = document.querySelector(".hero");
  if (!mediaImg || !hero) return;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduced) return;

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      const translate = (progress - 0.5) * 18;
      mediaImg.style.transform = `scale(1.06) translateY(${translate.toFixed(2)}px)`;
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function main() {
  setupReveal();
  setupMobileNav();
  setupPrint();
  setupHeroParallax();

  setActiveNavBySection();
  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(setActiveNavBySection);
  }, { passive: true });
}

document.addEventListener("DOMContentLoaded", main);

