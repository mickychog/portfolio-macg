"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import {
  FaBrain,
  FaCertificate,
  FaChartLine,
  FaCloud,
  FaCode,
  FaCompassDrafting,
  FaDatabase,
  FaFlaskVial,
  FaFolderOpen,
  FaGaugeHigh,
  FaGraduationCap,
  FaLayerGroup,
  FaMagnifyingGlass,
  FaMicrochip,
  FaPeopleGroup,
  FaPenRuler,
  FaServer,
  FaShieldHalved,
  FaToolbox,
  FaTrophy,
} from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import type { IconType } from "react-icons";
import {
  approach,
  certificates,
  contributions,
  copy,
  education,
  experiences,
  heroTechnologies,
  localizeCertificate,
  projects,
  skillGroups,
  talks,
  talkTopics,
  type Locale,
  type Certificate,
} from "@/lib/portfolio-data";
import { MotionEffects } from "./MotionEffects";
import { MeteorCanvas } from "./MeteorCanvas";

type Theme = "light" | "dark";

const navigationIds = [
  "inicio",
  "stack",
  "sobre-mi",
  "proyectos",
  "experiencia",
  "formacion",
  "charlas",
  "contacto",
];
const canonicalFilters = [
  "Todos",
  "Backend",
  "Full Stack",
  "IA y datos",
  "Cloud & DevOps",
];
const whatsappMessages: Record<Locale, string> = {
  es: "https://wa.me/59172084428?text=Hola%20Miguel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20contigo.",
  en: "https://wa.me/59172084428?text=Hi%20Miguel%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.",
};
const profileImagePath = "/images/profile.webp";
const cardIcons: Record<string, IconType> = {
  frontend: FaCode,
  backend: FaServer,
  data: FaDatabase,
  cloud: FaCloud,
  quality: FaShieldHalved,
  systems: FaMicrochip,
  fullstack: FaLayerGroup,
  architecture: FaCompassDrafting,
  ai: FaBrain,
  performance: FaGaugeHigh,
  discover: FaMagnifyingGlass,
  design: FaPenRuler,
  build: FaCode,
  validate: FaFlaskVial,
  measure: FaChartLine,
  projects: FaFolderOpen,
  education: FaGraduationCap,
  certificate: FaCertificate,
  tools: FaToolbox,
  teamwork: FaPeopleGroup,
};

const metricVisuals = [
  { icon: FaTrophy, tone: "gold" },
  { icon: FaGaugeHigh, tone: "cyan" },
  { icon: FaShieldHalved, tone: "violet" },
  { icon: FaGraduationCap, tone: "blue" },
] as const;

function CardIcon({ name }: { name: string }) {
  const Icon = cardIcons[name] ?? FaCode;
  return <Icon className="card-icon" aria-hidden="true" />;
}

export function Portfolio({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [locale, setLocale] = useState<Locale>("es");
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined"
      ? (document.documentElement.dataset.theme as Theme) ?? "dark"
      : "dark",
  );
  const [filterIndex, setFilterIndex] = useState(0);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [profileImageLoaded, setProfileImageLoaded] = useState(false);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const t = copy[locale];
  const featuredTalk = talks[0];
  const whatsappUrl = whatsappMessages[locale];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedTheme = localStorage.getItem(
        "portfolio-theme",
      ) as Theme | null;
      const savedLocale = localStorage.getItem(
        "portfolio-locale",
      ) as Locale | null;
      const nextTheme =
        savedTheme ??
        (matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark");
      const nextLocale = savedLocale ?? "es";
      setTheme(nextTheme);
      setLocale(nextLocale);
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.lang = nextLocale;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedCertificate) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [selectedCertificate]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        setSelectedCertificate(null);
      }
    };
    dialog.addEventListener("click", handleBackdropClick);
    return () => dialog.removeEventListener("click", handleBackdropClick);
  }, []);

  const onDialogClose = useCallback(() => setSelectedCertificate(null), []);

  useEffect(() => {
    fetch("/api/views", { method: "POST" })
      .then((r) => r.json() as Promise<{ views: number }>)
      .then((d) => setViewCount(d.views))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(".site-header")) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

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

  const filteredProjects = useMemo(() => {
    const active = canonicalFilters[filterIndex];
    return active === "Todos"
      ? projects
      : projects.filter((project) => project.type === active);
  }, [filterIndex]);

  const allCertificates = certificates.map((item) =>
    localizeCertificate(item, locale),
  );

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus(locale === "es" ? "Enviando…" : "Sending…");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      FormDataEntryValue
    >;
    payload.turnstileToken = payload["cf-turnstile-response"] ?? "";
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as {
      message?: string;
      error?: string;
      fallback?: boolean;
    };
    if (response.ok) {
      setFormStatus(
        result.message ??
          (locale === "es" ? "Mensaje enviado." : "Message sent."),
      );
      form.reset();
      return;
    }
    setFormStatus(
      result.error ??
        (locale === "es" ? "No se pudo enviar." : "Could not send."),
    );
    if (result.fallback) {
      window.location.href = `mailto:mickychog@gmail.com?subject=${encodeURIComponent(String(payload.subject ?? "Contacto desde el portafolio"))}&body=${encodeURIComponent(String(payload.message ?? ""))}`;
    }
  };

  return (
    <main>
      <MotionEffects />
      <div className="ambient-background" aria-hidden="true">
        <span className="ambient-orb orb-a" />
        <span className="ambient-orb orb-b" />
        <span className="ambient-orb orb-c" />
        <span className="ambient-grid" />
      </div>

      <header className="site-header">
        <a
          className="brand"
          href="#inicio"
          aria-label={locale === "es" ? "Ir al inicio" : "Go to home"}
        >
          <span className="brand-mark">MC</span>
          <span>Miguel A. Choque</span>
        </a>
        <nav
          className={menuOpen ? "nav-open" : ""}
          aria-label={
            locale === "es" ? "Navegación principal" : "Main navigation"
          }
        >
          {navigationIds.map((id, index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {t.nav[index]}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="quiet-button has-tooltip"
            data-tooltip={t.tooltips.language}
            type="button"
            onClick={changeLocale}
            aria-label={t.tooltips.language}
          >
            {locale.toUpperCase()}
          </button>
          <button
            className="icon-button has-tooltip"
            data-tooltip={t.tooltips.theme}
            type="button"
            onClick={changeTheme}
            aria-label={t.tooltips.theme}
          >
            <span aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span>
          </button>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={locale === "es" ? "Abrir menú" : "Open menu"}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <MeteorCanvas />
        <div className="hero-copy hero-enter">
          <p className="eyebrow">
            <span /> {t.available}
          </p>
          <h1>
            <span className="hero-kicker">{t.heroKicker}</span>
            <strong>{t.heroTitle}</strong>
          </h1>
          <p className="hero-description">{t.intro}</p>
          <ul
            className="hero-tech"
            aria-label={
              locale === "es" ? "Tecnologías principales" : "Core technologies"
            }
          >
            {heroTechnologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <a
              className="primary-button has-tooltip"
              data-tooltip={t.tooltips.projects}
              href="#proyectos"
            >
              {t.projectsButton} <span aria-hidden="true">↗</span>
            </a>
            <a
              className="secondary-button has-tooltip"
              data-tooltip={t.tooltips.contact}
              href="#contacto"
            >
              {t.contactButton}
            </a>
            <a
              className="text-button has-tooltip"
              data-tooltip={t.tooltips.cv}
              href="/cv-miguel-choque.pdf"
              target="_blank"
              rel="noreferrer"
            >
              {t.download}
            </a>
          </div>
          <div className="social-row">
            <span>{t.findMe}</span>
            <a
              className="has-tooltip"
              data-tooltip={t.tooltips.github}
              href="https://github.com/mickychog"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="brand-icon" aria-hidden="true" />
              GitHub
            </a>
            <a
              className="has-tooltip"
              data-tooltip={t.tooltips.linkedin}
              href="https://linkedin.com/in/miguel-choque-garcia"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="brand-icon" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              className="has-tooltip"
              data-tooltip={t.tooltips.email}
              href="mailto:mickychog@gmail.com"
            >
              <SiGmail className="brand-icon" aria-hidden="true" />
              Gmail
            </a>
          </div>
        </div>
        <div
          className="portrait-stage hero-enter hero-enter-delay"
          aria-label={
            locale === "es"
              ? "Tarjeta profesional de Miguel"
              : "Miguel's professional card"
          }
        >
          <div className="portrait-halo" aria-hidden="true" />
          <div className="portrait-card">
            <div
              className={`portrait-photo${profileImageLoaded ? " is-loaded" : ""}`}
            >
              <Image
                className="portrait-photo-image"
                src={profileImagePath}
                alt={
                  locale === "es"
                    ? "Fotografía profesional de Miguel Angel Choque Garcia"
                    : "Professional portrait of Miguel Angel Choque Garcia"
                }
                fill
                priority
                sizes="(max-width: 720px) 92vw, 370px"
                onLoad={() => setProfileImageLoaded(true)}
                onError={() => setProfileImageLoaded(false)}
              />
              <span className="portrait-initials" aria-hidden="true">
                MC
              </span>
            </div>
            <span className="portrait-status">{t.identityRole}</span>
            <div className="portrait-identity">
              <strong>
                Miguel Angel
                <br />
                Choque Garcia
              </strong>
              <span>{t.identityLine}</span>
            </div>
            <small>{t.photoPending}</small>
          </div>
          <span className="floating-chip chip-one">Frontend</span>
          <span className="floating-chip chip-two">Backend</span>
          <span className="floating-chip chip-three">DevOps</span>
        </div>
        <dl
          className="metrics"
          aria-label={
            locale === "es" ? "Logros destacados" : "Selected outcomes"
          }
        >
          {t.metrics.map(([value, label], index) => {
            const visual = metricVisuals[index] ?? metricVisuals[0];
            const MetricIcon = visual.icon;

            return (
              <div className="metric-card" data-tone={visual.tone} key={label}>
                <span className="metric-icon" aria-hidden="true">
                  <MetricIcon />
                </span>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section
        className="section stack-section"
        id="stack"
        aria-labelledby="stack-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-index">Stack & Skills</p>
            <h2 id="stack-title">{t.stackTitle}</h2>
            <p className="section-lead">{t.stackLead}</p>
          </div>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title.es} data-reveal>
              <div className="skill-card-head">
                <span>
                  <CardIcon name={group.icon} />
                </span>
                <div>
                  <h3>{group.title[locale]}</h3>
                  <p>{group.lead[locale]}</p>
                </div>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="secondary-skills" data-reveal>
          <article>
            <header>
              <CardIcon name="tools" />
              <span className="category">{t.alsoWork}</span>
            </header>
            <div>
              {[
                "Java",
                "Python",
                "PHP",
                "C++",
                "MySQL",
                "Firebase",
                "Swagger",
              ].map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </article>
          <article>
            <header>
              <CardIcon name="teamwork" />
              <span className="category">{t.teamwork}</span>
            </header>
            <div>
              {["Scrum", "Agile", "Git", "Jira", "Remote", "Documentation"].map(
                (item) => (
                  <small key={item}>{item}</small>
                ),
              )}
            </div>
          </article>
        </div>
      </section>

      <section
        className="section about-section"
        id="sobre-mi"
        aria-labelledby="about-title"
      >
        <div className="about-intro" data-reveal>
          <div>
            <p className="section-index">
              {locale === "es" ? "Sobre mí" : "About"}
            </p>
            <h2 id="about-title">{t.aboutTitle}</h2>
          </div>
          <div className="about-copy">
            {t.aboutText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="focus-row">
              <span>{t.currentFocus}</span>
              {["Full Stack", "Cloud & DevOps", "Applied AI"].map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </div>
        </div>
        <div className="contribution-block">
          <h3 data-reveal>{t.contributionTitle}</h3>
          <div className="contribution-grid">
            {contributions.map((item) => (
              <article key={item.title.es} data-reveal>
                <span>
                  <CardIcon name={item.icon} />
                </span>
                <h4>{item.title[locale]}</h4>
                <p>{item.text[locale]}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="approach-block" data-reveal>
          <h3>{t.approachTitle}</h3>
          <ol>
            {approach.map((step) => (
              <li key={step.n}>
                <div className="approach-step-head">
                  <span className="approach-step-number">{step.n}</span>
                  <CardIcon name={step.icon} />
                </div>
                <strong>{step[locale]}</strong>
                <p>{step.text[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section"
        id="proyectos"
        aria-labelledby="projects-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-index">
              {locale === "es" ? "Trabajo" : "Work"}
            </p>
            <h2 id="projects-title">{t.projectsTitle}</h2>
            <p className="section-lead">{t.projectsLead}</p>
          </div>
        </div>
        <div
          className="filter-tabs"
          role="group"
          aria-label={locale === "es" ? "Filtrar proyectos" : "Filter projects"}
        >
          {t.filters.map((label, index) => (
            <button
              type="button"
              className={filterIndex === index ? "active" : ""}
              onClick={() => setFilterIndex(index)}
              key={label}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article className="project-card" key={project.name} data-reveal>
              <div className="card-corner-icon">
                <CardIcon
                  name={
                    project.type === "Backend"
                      ? "backend"
                      : project.type === "IA y datos"
                        ? "ai"
                        : project.type === "Cloud & DevOps"
                          ? "cloud"
                          : "fullstack"
                  }
                />
              </div>
              <p className="project-role">{project.role[locale]}</p>
              <h3>{project.name}</h3>
              <p>{project.description[locale]}</p>
              <strong>{project.result[locale]}</strong>
              <ul className="tag-list" aria-label="Technologies">
                {project.stack.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {project.codeUrl && (
                <a
                  className="project-code-link has-tooltip"
                  data-tooltip={`${t.viewCode}: ${project.name}`}
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t.viewCode}: ${project.name}`}
                >
                  <FaGithub aria-hidden="true" />
                  {t.viewCode}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
        {!filteredProjects.length && (
          <p className="empty-state">
            {locale === "es"
              ? "No hay proyectos publicados en esta categoría todavía."
              : "No projects have been published in this category yet."}
          </p>
        )}
      </section>

      <section
        className="section"
        id="experiencia"
        aria-labelledby="experience-title"
      >
        <p className="section-index" data-reveal>
          {locale === "es" ? "Trayectoria" : "Journey"}
        </p>
        <h2 id="experience-title" data-reveal>
          {t.experienceTitle}
        </h2>
        <div className="timeline">
          {experiences.map((experience) => (
            <article
              className="timeline-item"
              key={`${experience.company}-${experience.period.es}`}
              data-reveal
            >
              <time>{experience.period[locale]}</time>
              <div className="timeline-dot" />
              <div>
                <span className="category">{experience.category}</span>
                <h3>{experience.role[locale]}</h3>
                <h4>{experience.company}</h4>
                <p>{experience.description[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section"
        id="formacion"
        aria-labelledby="education-title"
      >
        <p className="section-index" data-reveal>
          {locale === "es" ? "Aprendizaje" : "Learning"}
        </p>
        <h2 id="education-title" data-reveal>
          {t.educationTitle}
        </h2>
        <div className="education-grid">
          {education.map((item) => (
            <article
              className="education-card"
              key={item.degree.es}
              data-reveal
            >
              <div className="card-heading-icon">
                <CardIcon name="education" />
                <span>{item.period}</span>
              </div>
              <h3>{item.degree[locale]}</h3>
              <p>{item.institution}</p>
              <strong>{item.status[locale]}</strong>
            </article>
          ))}
        </div>
        <div className="certificate-grid">
          {allCertificates.map((certificate, index) => (
            <article
              className="certificate-card"
              key={`${certificate.title}-${index}`}
              data-reveal
            >
              <div>
                <div className="card-heading-icon">
                  <CardIcon name="certificate" />
                  <span>{certificate.organization}</span>
                </div>
                <h3>{certificate.title}</h3>
                <p>{certificate.period}</p>
              </div>
              <button
                className="has-tooltip"
                data-tooltip={certificate.summary}
                type="button"
                onClick={() => setSelectedCertificate(certificate)}
              >
                {t.certificate} <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section talks-section"
        id="charlas"
        aria-labelledby="talks-title"
      >
        <MeteorCanvas />
        <div className="talks-heading" data-reveal>
          <div>
            <p className="section-index">
              {locale === "es" ? "Charlas y comunidad" : "Speaking & community"}
            </p>
            <h2 id="talks-title">{t.talksTitle}</h2>
            <p className="section-lead">{t.talksLead}</p>
            <a
              className="secondary-button has-tooltip"
              data-tooltip={t.tooltips.linkedin}
              href="https://linkedin.com/in/miguel-choque-garcia"
              target="_blank"
              rel="noreferrer"
            >
              {t.talksCta} ↗
            </a>
          </div>
          <article className="talk-feature">
            <Image
              className="talk-feature-image"
              src={featuredTalk.image}
              alt={featuredTalk.imageAlt[locale]}
              fill
              sizes="(max-width: 920px) 100vw, 42vw"
            />
            <span className="talk-feature-badge">{t.talksDelivered}</span>
            <div className="talk-feature-content">
              <small>{featuredTalk.event}</small>
              <h3>{featuredTalk.title[locale]}</h3>
              <p>{featuredTalk.description[locale]}</p>
              <div
                className="talk-feature-tags"
                aria-label={
                  locale === "es" ? "Tecnologías de la charla" : "Talk technologies"
                }
              >
                {featuredTalk.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="talk-feature-footer">
                <span>{featuredTalk.date[locale]} · {featuredTalk.location}</span>
                <a
                  className="talk-feature-link has-tooltip"
                  data-tooltip={t.tooltips.talkPost}
                  href={featuredTalk.postUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.talksViewPost} ↗
                </a>
              </div>
            </div>
          </article>
        </div>
        <p className="talk-more-label" data-reveal>{t.talksMore}</p>
        <div className="talk-grid">
          {talkTopics.map((topic) => (
            <article key={topic.title.es} data-reveal>
              <span>
                <CardIcon name={topic.icon} />
              </span>
              <div>
                <h3>{topic.title[locale]}</h3>
                <p>{topic.text[locale]}</p>
              </div>
              <small>{t.talksTopic}</small>
            </article>
          ))}
        </div>
      </section>

      <section
        className="contact section"
        id="contacto"
        aria-labelledby="contact-title"
      >
        <div className="contact-copy" data-reveal>
          <p className="section-index">
            {locale === "es" ? "Contacto" : "Contact"}
          </p>
          <h2 id="contact-title">{t.contactTitle}</h2>
          <p className="section-lead">{t.contactLead}</p>
          <div className="contact-links">
            <a
              className="has-tooltip"
              data-tooltip={t.tooltips.email}
              href="mailto:mickychog@gmail.com"
            >
              <SiGmail className="brand-icon" aria-hidden="true" />
              mickychog@gmail.com
            </a>
            <a
              className="has-tooltip"
              data-tooltip={t.tooltips.linkedin}
              href="https://linkedin.com/in/miguel-choque-garcia"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="brand-icon" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              className="has-tooltip"
              data-tooltip={t.tooltips.whatsapp}
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="brand-icon" aria-hidden="true" />
              +591 72084428
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitContact} data-reveal>
          <label>
            {t.form[0]}
            <input required name="name" autoComplete="name" />
          </label>
          <label>
            {t.form[1]}
            <input required name="email" type="email" autoComplete="email" />
          </label>
          <label>
            {t.form[2]}
            <input required name="subject" />
          </label>
          <label>
            {t.form[3]}
            <textarea required name="message" rows={5} minLength={20} />
          </label>
          <input
            name="website"
            className="honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          {turnstileSiteKey && (
            <>
              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="lazyOnload"
              />
              <div
                className="cf-turnstile"
                data-sitekey={turnstileSiteKey}
                data-theme="auto"
              />
            </>
          )}
          <button
            className="primary-button has-tooltip"
            data-tooltip={
              locale === "es"
                ? "Enviar el mensaje a mi correo"
                : "Send the message to my email"
            }
            type="submit"
          >
            {t.form[4]} <span aria-hidden="true">↗</span>
          </button>
          <p className="form-status" aria-live="polite">
            {formStatus}
          </p>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-identity">
            <span className="brand-mark">MC</span>
            <h2>
              Miguel Angel
              <br />
              Choque Garcia
            </h2>
            <p>{t.footerRole}</p>
            <small>{t.footerLine}</small>
          </div>
          <div className="footer-group">
            <strong>{t.footerSocial}</strong>
            <a
              href="https://github.com/mickychog"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="brand-icon" aria-hidden="true" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/miguel-choque-garcia"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="brand-icon" aria-hidden="true" />
              LinkedIn
            </a>
            <a href="mailto:mickychog@gmail.com">
              <SiGmail className="brand-icon" aria-hidden="true" />
              Gmail
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <FaWhatsapp className="brand-icon" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
          <div className="footer-group">
            <strong>{t.footerNav}</strong>
            {navigationIds.slice(1).map((id, index) => (
              <a href={`#${id}`} key={id}>
                {t.nav[index + 1]}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Miguel Angel Choque Garcia</span>
          <span>{t.footerMade} 🇧🇴</span>
          {viewCount !== null && (
            <span className="view-counter">{viewCount.toLocaleString()}</span>
          )}
          <a href="#inicio">
            {locale === "es" ? "Volver arriba" : "Back to top"} ↑
          </a>
        </div>
      </footer>

      <dialog
        ref={dialogRef}
        className="certificate-dialog"
        aria-labelledby="certificate-title"
        onClose={onDialogClose}
      >
        {selectedCertificate && (
          <div className="certificate-modal">
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedCertificate(null)}
              aria-label={t.close}
            >
              ×
            </button>
            <p className="section-index">
              {locale === "es" ? "Credencial" : "Credential"}
            </p>
            <h2 id="certificate-title">{selectedCertificate.title}</h2>
            <h3>{selectedCertificate.organization}</h3>
            <p>{selectedCertificate.summary}</p>
            <ul className="tag-list">
              {selectedCertificate.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {selectedCertificate.preview?.type === "image" && (
              <div className="certificate-image-wrap">
                <Image
                  src={selectedCertificate.preview.src}
                  alt={`${selectedCertificate.title} — ${selectedCertificate.organization}`}
                  width={1400}
                  height={900}
                />
              </div>
            )}
            {selectedCertificate.preview?.type === "pdf" && (
              <div className="certificate-document-wrap">
                <iframe
                  src={selectedCertificate.preview.src}
                  title={`${selectedCertificate.title} — PDF`}
                  loading="lazy"
                />
              </div>
            )}
            {selectedCertificate.preview?.type === "embed" && (
              <div className="certificate-document-wrap">
                <iframe
                  src={selectedCertificate.preview.src}
                  title={`${selectedCertificate.title} — ${selectedCertificate.organization}`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="fullscreen"
                />
              </div>
            )}
            {!selectedCertificate.preview && !selectedCertificate.credentialUrl && (
              <div className="certificate-preview">
                <span aria-hidden="true">◇</span>
                <p>
                  {locale === "es"
                    ? "La vista previa verificable del certificado estará disponible próximamente."
                    : "The verifiable certificate preview will be available soon."}
                </p>
              </div>
            )}
            {selectedCertificate.credentialUrl && (
              <a
                className="primary-button"
                href={selectedCertificate.credentialUrl}
                target="_blank"
                rel="noreferrer"
              >
                {locale === "es"
                  ? "Ver credencial verificada"
                  : "View verified credential"}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </dialog>
    </main>
  );
}
