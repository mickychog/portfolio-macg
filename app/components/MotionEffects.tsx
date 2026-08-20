"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(pointer: fine)").matches;
    let frame = 0;

    const move = (event: PointerEvent) => {
      if (reduceMotion || !finePointer) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
        root.dataset.pointer = "active";
      });
    };

    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealElements.forEach((element) => {
      if (!reduceMotion && element.getBoundingClientRect().top > window.innerHeight * 0.86) element.classList.add("will-reveal");
      else element.classList.add("is-visible");
      reveal.observe(element);
    });
    const revealFallback = window.setTimeout(() => revealElements.forEach((element) => element.classList.add("is-visible")), 1400);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(revealFallback);
      reveal.disconnect();
      window.removeEventListener("pointermove", move);
      delete root.dataset.pointer;
    };
  }, []);

  return <div className="cursor-glow" aria-hidden="true" />;
}
