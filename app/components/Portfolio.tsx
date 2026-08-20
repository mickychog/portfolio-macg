"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import {
  certificates,
  copy,
  education,
  experiences,
  type Locale,
  type ManagedItem,
  projects,
  skillGroups,
} from "@/lib/portfolio-data";
import { MeteorCanvas } from "./MeteorCanvas";

type Theme = "light" | "dark";

export function Portfolio({ managedItems, turnstileSiteKey }: { managedItems: ManagedItem[]; turnstileSiteKey?: string }) {
  const [locale, setLocale] = useState<Locale>("es");
  const [theme, setTheme] = useState<Theme>("dark");
  const [filter, setFilter] = useState("Todos");
  const [selectedCertificate, setSelectedCertificate] = useState<ManagedItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const t = copy[locale];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedTheme = localStorage.getItem("portfolio-theme") as Theme | null;
      const savedLocale = localStorage.getItem("portfolio-locale") as Locale | null;
      const nextTheme = savedTheme ?? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      setTheme(nextTheme);
      setLocale(savedLocale ?? "es");
      document.documentElement.dataset.theme = nextTheme;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const changeTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
  };

  const changeLocale = () => {
    const next = locale === "es" ? "en" : "es";
    setLocale(next);
    document.documentElement.lang = next;
    localStorage.setItem("portfolio-locale", next);
  };

  const filterLabels = t.filters;
  const normalizedFilter = filterLabels.indexOf(filter as never);
  const activeCategory = ["Todos", "Backend", "Full Stack", "IA y datos", "Infraestructura"][Math.max(normalizedFilter, 0)];
  const filteredProjects = useMemo(
    () => activeCategory === "Todos" ? projects : projects.filter((project) => project.type === activeCategory),
    [activeCategory],
  );

  const allCertificates = [...certificates, ...managedItems.filter((item) => item.type === "certificate" || item.type === "course")];
  const allExperiences = managedItems.filter((item) => item.type === "experience");

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus(locale === "es" ? "Enviando…" : "Sending…");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, FormDataEntryValue>;
    payload.turnstileToken = payload["cf-turnstile-response"] ?? "";
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as { message?: string; error?: string; fallback?: boolean };
    if (response.ok) {
      setFormStatus(result.message ?? "Mensaje enviado");
      form.reset();
      return;
    }
    setFormStatus(result.error ?? (locale === "es" ? "No se pudo enviar." : "Could not send."));
    if (result.fallback) {
      window.location.href = `mailto:mickychog@gmail.com?subject=${encodeURIComponent(String(payload.subject ?? "Contacto desde el portafolio"))}&body=${encodeURIComponent(String(payload.message ?? ""))}`;
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark">MC</span><span>Miguel Choque</span>
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Navegación principal">
          {["inicio", "proyectos", "experiencia", "formacion", "stack", "contacto"].map((id, index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{t.nav[index]}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="quiet-button" type="button" onClick={changeLocale} aria-label="Cambiar idioma">{locale.toUpperCase()}</button>
          <button className="icon-button" type="button" onClick={changeTheme} aria-label="Cambiar tema"><span aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span></button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? "×" : "≡"}</button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <MeteorCanvas />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> {t.available}</p>
          <h1>{t.headingA} <span>{t.headingB}</span> {t.headingC}</h1>
          <p className="hero-description">{t.intro}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#proyectos">{t.projectsButton} <span aria-hidden="true">↗</span></a>
            <a className="secondary-button" href="#contacto">{t.contactButton}</a>
            <a className="text-button" href="/cv-miguel-choque.pdf" target="_blank" rel="noreferrer">{t.download}</a>
          </div>
          <dl className="metrics" aria-label="Logros destacados">
            <div><dt>1.er</dt><dd>lugar en Smart Projects</dd></div>
            <div><dt>16×</dt><dd>menos latencia con Redis</dd></div>
            <div><dt>0.99</dt><dd>AUC-ROC en detección de fraude</dd></div>
          </dl>
        </div>
        <div className="portrait-stage reveal" aria-label="Espacio reservado para la fotografía profesional de Miguel">
          <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
          <div className="portrait-card"><span className="portrait-label">Fotografía profesional</span><span className="portrait-initials" aria-hidden="true">MC</span><span className="portrait-note">Pendiente de añadir la fotografía original</span></div>
          <div className="code-chip chip-top">NestJS · Azure</div><div className="code-chip chip-bottom">PostgreSQL · Redis</div>
        </div>
      </section>

      <section className="about section" aria-labelledby="about-title">
        <p className="section-index">00 / Perfil</p>
        <div><h2 id="about-title">{t.aboutTitle}</h2><p className="section-lead">{t.aboutText}</p></div>
        <div className="about-facts"><span>Sucre, Bolivia</span><span>Español · English B1</span><span>Backend · Cloud · AI</span></div>
      </section>

      <section className="section" id="proyectos" aria-labelledby="projects-title">
        <div className="section-heading"><div><p className="section-index">01 / Trabajo</p><h2 id="projects-title">{t.projectsTitle}</h2><p className="section-lead">{t.projectsLead}</p></div></div>
        <div className="filter-tabs" role="group" aria-label="Filtrar proyectos">
          {filterLabels.map((label) => <button type="button" className={filter === label ? "active" : ""} onClick={() => setFilter(label)} key={label}>{label}</button>)}
        </div>
        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <article className="project-card" key={project.name}>
              <div className="card-number">0{index + 1}</div><p className="project-role">{project.role}</p><h3>{project.name}</h3>
              <p>{project.description[locale]}</p><strong>{project.result}</strong>
              <ul className="tag-list" aria-label="Tecnologías">{project.stack.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
          {managedItems.filter((item) => item.type === "project").map((item) => (
            <article className="project-card" key={`managed-${item.id}`}><p className="project-role">{item.organization}</p><h3>{item.title}</h3><p>{item.summary}</p><ul className="tag-list">{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></article>
          ))}
        </div>
      </section>

      <section className="section" id="experiencia" aria-labelledby="experience-title">
        <p className="section-index">02 / Trayectoria</p><h2 id="experience-title">{t.experienceTitle}</h2>
        <div className="timeline">
          {experiences.map((experience) => <article className="timeline-item" key={`${experience.company}-${experience.period}`}><time>{experience.period}</time><div className="timeline-dot" /><div><span className="category">{experience.category}</span><h3>{experience.role}</h3><h4>{experience.company}</h4><p>{experience.description}</p></div></article>)}
          {allExperiences.map((item) => <article className="timeline-item" key={`managed-exp-${item.id}`}><time>{item.period}</time><div className="timeline-dot" /><div><span className="category">{item.category}</span><h3>{item.title}</h3><h4>{item.organization}</h4><p>{item.summary}</p></div></article>)}
        </div>
      </section>

      <section className="section" id="formacion" aria-labelledby="education-title">
        <p className="section-index">03 / Aprendizaje</p><h2 id="education-title">{t.educationTitle}</h2>
        <div className="education-grid">
          {education.map((item) => <article className="education-card" key={item.degree}><span>{item.period}</span><h3>{item.degree}</h3><p>{item.institution}</p><strong>{item.status}</strong></article>)}
        </div>
        <div className="certificate-grid">
          {allCertificates.map((certificate, index) => <article className="certificate-card" key={`${certificate.title}-${index}`}><div><span>{certificate.organization}</span><h3>{certificate.title}</h3><p>{certificate.period}</p></div><button type="button" onClick={() => setSelectedCertificate(certificate)}>{t.certificate} <span aria-hidden="true">↗</span></button></article>)}
        </div>
      </section>

      <section className="section" id="stack" aria-labelledby="stack-title">
        <p className="section-index">04 / Stack</p><h2 id="stack-title">{t.stackTitle}</h2>
        <div className="skill-grid">{skillGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="contact section" id="contacto" aria-labelledby="contact-title">
        <div className="contact-copy"><p className="section-index">05 / Contacto</p><h2 id="contact-title">{t.contactTitle}</h2><p className="section-lead">{t.contactLead}</p><div className="contact-links"><a href="mailto:mickychog@gmail.com">mickychog@gmail.com</a><a href="https://linkedin.com/in/miguel-choque-garcia" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="tel:+59172084428">+591 72084428</a></div></div>
        <form className="contact-form" onSubmit={submitContact}><label>{t.form[0]}<input required name="name" autoComplete="name" /></label><label>{t.form[1]}<input required name="email" type="email" autoComplete="email" /></label><label>{t.form[2]}<input required name="subject" /></label><label>{t.form[3]}<textarea required name="message" rows={5} minLength={20} /></label><input name="website" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />{turnstileSiteKey && <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" /><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="auto" /></>}<button className="primary-button" type="submit">{t.form[4]} <span aria-hidden="true">↗</span></button><p className="form-status" aria-live="polite">{formStatus}</p></form>
      </section>

      <footer><span>© {new Date().getFullYear()} Miguel Choque</span><span>Construido con intención, TypeScript y café.</span><a href="#inicio">Volver arriba ↑</a></footer>

      {selectedCertificate && <div className="modal-backdrop"><section className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-title"><button className="modal-close" type="button" onClick={() => setSelectedCertificate(null)} aria-label={t.close}>×</button><p className="section-index">Credencial</p><h2 id="certificate-title">{selectedCertificate.title}</h2><h3>{selectedCertificate.organization}</h3><p>{selectedCertificate.summary}</p><ul className="tag-list">{selectedCertificate.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>{selectedCertificate.fileKey ? <div className="certificate-image-wrap"><Image src={`/api/media/${encodeURIComponent(selectedCertificate.fileKey)}`} alt={`Certificado ${selectedCertificate.title} emitido por ${selectedCertificate.organization}`} width={1400} height={900} unoptimized /></div> : <div className="certificate-preview"><span aria-hidden="true">◇</span><p>La imagen verificable del certificado se añadirá desde el panel administrativo.</p></div>}{selectedCertificate.credentialUrl && <a className="primary-button" href={selectedCertificate.credentialUrl} target="_blank" rel="noreferrer">Ver credencial verificada</a>}</section></div>}
    </main>
  );
}
