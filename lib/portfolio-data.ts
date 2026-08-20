export type Locale = "es" | "en";

export type ManagedItem = {
  id?: number;
  type: "project" | "experience" | "course" | "certificate";
  title: string;
  organization: string;
  period: string;
  summary: string;
  tags: string[];
  category: string;
  credentialUrl?: string | null;
  fileKey?: string | null;
};

export const copy = {
  es: {
    nav: ["Inicio", "Proyectos", "Experiencia", "Formación", "Stack", "Contacto"],
    available: "Disponible para nuevos proyectos",
    headingA: "Construyo productos digitales donde",
    headingB: "backend, cloud e IA",
    headingC: "trabajan juntos.",
    intro: "Soy Miguel, ingeniero en Ciencias de la Computación y desarrollador backend. Diseño sistemas escalables, APIs robustas y soluciones de inteligencia artificial con impacto medible.",
    projectsButton: "Ver proyectos",
    contactButton: "Hablemos",
    download: "Descargar CV",
    aboutTitle: "Ingeniería orientada a resultados",
    aboutText: "Combino una base sólida de ingeniería de software con experiencia práctica entregando MVPs en equipos remotos. Me interesan los sistemas observables, el código mantenible y las decisiones técnicas que se traducen en una mejor experiencia para las personas.",
    projectsTitle: "Proyectos seleccionados",
    projectsLead: "Productos reales, retos técnicos concretos y resultados que se pueden medir.",
    experienceTitle: "Experiencia",
    educationTitle: "Formación y certificaciones",
    stackTitle: "Tecnologías con las que construyo",
    contactTitle: "Construyamos algo sólido",
    contactLead: "¿Tienes un producto, una API o una idea con IA? Cuéntame el contexto y te responderé directamente por correo.",
    form: ["Nombre", "Tu correo", "Asunto", "Mensaje", "Enviar mensaje"],
    filters: ["Todos", "Backend", "Full Stack", "IA y datos", "Infraestructura"],
    view: "Ver detalles",
    certificate: "Ver certificado",
    close: "Cerrar",
  },
  en: {
    nav: ["Home", "Projects", "Experience", "Education", "Stack", "Contact"],
    available: "Available for new projects",
    headingA: "I build digital products where",
    headingB: "backend, cloud and AI",
    headingC: "work together.",
    intro: "I’m Miguel, a Computer Science engineer and backend developer. I design scalable systems, robust APIs and artificial intelligence solutions with measurable impact.",
    projectsButton: "View projects",
    contactButton: "Let’s talk",
    download: "Download résumé",
    aboutTitle: "Engineering focused on outcomes",
    aboutText: "I combine a solid software engineering foundation with hands-on experience delivering MVPs in remote teams. I care about observable systems, maintainable code and technical decisions that improve people’s experience.",
    projectsTitle: "Selected projects",
    projectsLead: "Real products, concrete technical challenges and measurable outcomes.",
    experienceTitle: "Experience",
    educationTitle: "Education and certifications",
    stackTitle: "Technologies I build with",
    contactTitle: "Let’s build something solid",
    contactLead: "Have a product, an API or an AI idea? Tell me the context and I’ll reply directly by email.",
    form: ["Name", "Your email", "Subject", "Message", "Send message"],
    filters: ["All", "Backend", "Full Stack", "AI & data", "Infrastructure"],
    view: "View details",
    certificate: "View certificate",
    close: "Close",
  },
} as const;

export const projects = [
  { name: "Talent Match", type: "IA y datos", role: "Backend · Foo Talent", description: { es: "Plataforma de matching de talento con procesamiento inteligente de CVs y búsqueda vectorial de candidatos.", en: "Talent matching platform with intelligent résumé processing and vector candidate search." }, result: "1.er lugar · Smart Projects 2025", stack: ["NestJS", "Azure OpenAI", "Pinecone", "Redis"] },
  { name: "ConnectFlow", type: "Backend", role: "Backend · No Country", description: { es: "CRM inteligente para automatizar comunicaciones, segmentar usuarios y programar recordatorios multicanal.", en: "Smart CRM for automated communication, user segmentation and multichannel reminders." }, result: "6+ endpoints REST documentados", stack: ["Node.js", "WhatsApp API", "Brevo", "Swagger"] },
  { name: "MediConnect", type: "Full Stack", role: "Full Stack · No Country", description: { es: "Portal de telemedicina con historias clínicas, autenticación JWT y autorización basada en roles.", en: "Telemedicine portal with electronic health records, JWT authentication and role-based authorization." }, result: "PostgreSQL normalizado en 3FN", stack: ["Angular", "Node.js", "PostgreSQL", "Tailwind"] },
  { name: "Fraud Detection", type: "IA y datos", role: "Machine Learning · No Country", description: { es: "Modelo de detección de fraude con balanceo de clases, análisis exploratorio y feature engineering.", en: "Fraud detection model with class balancing, exploratory analysis and feature engineering." }, result: "AUC-ROC 0.99", stack: ["Python", "scikit-learn", "SMOTE", "pandas"] },
];

export const experiences = [
  { period: { es: "2026 — Actualidad", en: "2026 — Present" }, company: "Fiscalía General del Estado", role: { es: "Pasante de Ingeniería", en: "Engineering Intern" }, category: "Infraestructura", description: { es: "Despliegue de software, telemetría, monitoreo y automatización de soporte aplicando principios de Infrastructure as Code.", en: "Software deployment, telemetry, monitoring and support automation applying Infrastructure as Code principles." } },
  { period: { es: "Oct — Dic 2025", en: "Oct — Dec 2025" }, company: "No Country · ConnectFlow", role: { es: "Desarrollador Backend", en: "Backend Developer" }, category: "Backend", description: { es: "CRM inteligente, integraciones con WhatsApp Cloud API y servicios de correo, APIs documentadas y flujo CI/CD.", en: "Smart CRM, WhatsApp Cloud API and email integrations, documented APIs and CI/CD workflow." } },
  { period: { es: "Sep — Oct 2025", en: "Sep — Oct 2025" }, company: "No Country · MediConnect", role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" }, category: "Full Stack", description: { es: "Backend Node.js, frontend Angular, autenticación JWT, RBAC y diseño de datos clínicos en PostgreSQL.", en: "Node.js backend, Angular frontend, JWT authentication, RBAC and clinical data design in PostgreSQL." } },
  { period: { es: "Abr — Ago 2025", en: "Apr — Aug 2025" }, company: "Foo Talent", role: { es: "Desarrollador Backend", en: "Backend Developer" }, category: "Backend", description: { es: "Talent Match y Buggle: IA generativa, búsqueda vectorial, caché Redis, trazabilidad de errores y monitoreo de producción.", en: "Talent Match and Buggle: generative AI, vector search, Redis caching, error tracing and production monitoring." } },
  { period: { es: "Ene — Mar 2025", en: "Jan — Mar 2025" }, company: "No Country", role: { es: "Backend y Machine Learning", en: "Backend and Machine Learning" }, category: "IA y datos", description: { es: "API REST para Fit Lover y modelo de detección de fraude con AUC-ROC de 0.99.", en: "REST API for Fit Lover and a fraud detection model with 0.99 AUC-ROC." } },
];

export const education = [
  { degree: { es: "Ingeniería en Ciencias de la Computación", en: "Computer Science Engineering" }, institution: "USFX", period: "2019 — 2026", status: { es: "Noveno semestre", en: "Ninth semester" } },
  { degree: { es: "Ingeniería Electrónica", en: "Electronic Engineering" }, institution: "USFX", period: "2017 — 2025", status: { es: "Egresado", en: "Graduate" } },
];

export const certificateEnglish: Record<string, { title: string; summary: string; period: string }> = {
  "Especialización Backend Java": { title: "Java Backend Specialization", summary: "Java, Spring Boot 3, JPA/Hibernate, REST API security, JUnit and Mockito.", period: "July 2024 · 286 hours" },
  "Ethical Hacker e Introduction to Cybersecurity": { title: "Ethical Hacker and Introduction to Cybersecurity", summary: "Attack vectors, network protection, CIA fundamentals and API security.", period: "Sep — Nov 2024" },
  "Cloud Computing e Inteligencia Artificial": { title: "Cloud Computing and Artificial Intelligence", summary: "LLM foundations, cloud generative AI, machine learning and AI ethics.", period: "Jun — Sep 2025" },
  "Desarrollo Full Stack PHP": { title: "Full Stack PHP Development", summary: "CRUD applications with Laravel 10, Vue 3, authentication and MVC architecture.", period: "December 2023 · 38 hours" },
};

export const certificates: ManagedItem[] = [
  { type: "certificate", title: "Especialización Backend Java", organization: "Oracle ONE · Alura Latam", period: "Julio 2024 · 286 horas", summary: "Java, Spring Boot 3, JPA/Hibernate, seguridad en APIs REST, JUnit y Mockito.", tags: ["Java", "Spring Boot", "Testing"], category: "Backend" },
  { type: "certificate", title: "Ethical Hacker e Introduction to Cybersecurity", organization: "Cisco Networking Academy", period: "Sep — Nov 2024", summary: "Vectores de ataque, protección de redes, fundamentos CIA y seguridad en APIs.", tags: ["Cybersecurity", "Networks"], category: "Infraestructura" },
  { type: "certificate", title: "Cloud Computing e Inteligencia Artificial", organization: "AWS · IBM SkillsBuild", period: "Jun — Sep 2025", summary: "Fundamentos de LLMs, IA generativa en la nube, machine learning y ética en IA.", tags: ["AWS", "Generative AI", "ML"], category: "IA y datos" },
  { type: "certificate", title: "Desarrollo Full Stack PHP", organization: "Innovacode", period: "Diciembre 2023 · 38 horas", summary: "Aplicaciones CRUD con Laravel 10, Vue 3, autenticación y arquitectura MVC.", tags: ["Laravel", "Vue", "PHP"], category: "Full Stack" },
];

export const skillGroups = [
  { title: "Backend", items: ["NestJS", "Spring Boot", "Laravel", "Express", "REST APIs", "JWT"] },
  { title: "Datos y cloud", items: ["PostgreSQL", "Redis", "MongoDB", "AWS", "Azure", "Firebase"] },
  { title: "IA y datos", items: ["Python", "scikit-learn", "Azure OpenAI", "Pinecone", "pandas"] },
  { title: "Frontend y entrega", items: ["Angular", "React", "Vue", "Docker", "GitHub Actions", "Sentry"] },
];
