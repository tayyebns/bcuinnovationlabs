/**
 * BCU Innovation Labs — main.js
 * Handles: year stamp, active nav, mobile nav, scroll reveal
 */

"use strict";

/* ── Year stamp ─────────────────────────────────────────── */

function setCurrentYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ── Active nav ─────────────────────────────────────────── */

function markActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .footer-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ── Mobile nav ─────────────────────────────────────────── */

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");
  if (!toggle || !menu) return;

  const setState = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);

    // Trap focus when menu is open
    if (open) {
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  };

  toggle.addEventListener("click", () => {
    setState(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close on link click
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setState(false));
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setState(false);
      toggle.focus();
    }
  });

  // Close on resize above breakpoint
  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) setState(false);
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      toggle.getAttribute("aria-expanded") === "true" &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      setState(false);
    }
  });
}

/* ── Scroll reveal ──────────────────────────────────────── */

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  // Respect reduced-motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((n) => n.classList.add("in"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("in"));
    return;
  }

  // Fallback: reveal anything that never intersects after 2.5s
  const fallbackTimer = setTimeout(() => {
    nodes.forEach((n) => n.classList.add("in"));
  }, 2500);

  let revealed = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const delay = i * 55;
        setTimeout(() => {
          entry.target.classList.add("in");
          revealed++;
          if (revealed >= nodes.length) clearTimeout(fallbackTimer);
        }, delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  nodes.forEach((n) => observer.observe(n));
}

/* ── Smooth anchor scroll with offset ───────────────────── */

function setupAnchorScroll() {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      target.focus({ preventScroll: true });
    });
  });
}

/* ── Init ───────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  markActiveNav();
  setupMobileNav();
  setupReveal();
  setupAnchorScroll();
});
