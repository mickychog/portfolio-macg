"use client";

import { useEffect, useRef } from "react";

type Meteor = { x: number; y: number; length: number; speed: number; opacity: number };

export function MeteorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData || (navigator.hardwareConcurrency ?? 8) < 4) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let active = true;
    let visible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const count = window.innerWidth < 700 ? 3 : 10;
    let meteors: Meteor[] = [];

    const createMeteor = (initial = false): Meteor => ({
      x: Math.random() * width * 1.2,
      y: initial ? Math.random() * height : -80 - Math.random() * 220,
      length: 55 + Math.random() * 115,
      speed: 2.2 + Math.random() * 2.7,
      opacity: 0.18 + Math.random() * 0.5,
    });

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      meteors = Array.from({ length: count }, () => createMeteor(true));
    };

    const draw = () => {
      if (!active) return;
      context.clearRect(0, 0, width, height);
      for (let index = 0; index < meteors.length; index += 1) {
        const meteor = meteors[index];
        const gradient = context.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x - meteor.length,
          meteor.y - meteor.length * 0.58,
        );
        gradient.addColorStop(0, `rgba(108, 204, 255, ${meteor.opacity})`);
        gradient.addColorStop(1, "rgba(47, 129, 247, 0)");
        context.beginPath();
        context.moveTo(meteor.x, meteor.y);
        context.lineTo(meteor.x - meteor.length, meteor.y - meteor.length * 0.58);
        context.strokeStyle = gradient;
        context.lineWidth = 1.25;
        context.stroke();
        meteor.x += meteor.speed;
        meteor.y += meteor.speed * 0.58;
        if (meteor.y > height + 100 || meteor.x > width + 180) meteors[index] = createMeteor();
      }
      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      active = !document.hidden && visible;
      if (active) { cancelAnimationFrame(frame); draw(); }
      else cancelAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      active = visible && !document.hidden;
      if (active) { cancelAnimationFrame(frame); draw(); }
      else cancelAnimationFrame(frame);
    }, { threshold: 0.02 });

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    observer.observe(canvas);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return <canvas className="meteor-canvas" ref={canvasRef} aria-hidden="true" />;
}
