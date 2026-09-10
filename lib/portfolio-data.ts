/**
 * =============================================================================
 * PORTFOLIO DATA & CONTENT SOURCE OF TRUTH
 * =============================================================================
 * Este es el archivo principal editable donde se gestiona todo el contenido,
 * textos, proyectos, experiencia, habilidades, certificaciones y traducciones
 * (Español / Inglés) del portafolio.
 *
 * Para actualizar cualquier dato del sitio:
 * 1. Modifica las secciones correspondientes a continuación.
 * 2. Guarda el archivo; los cambios se reflejarán automáticamente en la UI.
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// 1. TIPOS Y ESTRUCTURAS DE DATOS
// -----------------------------------------------------------------------------

/** Idiomas soportados por el portafolio */
export type Locale = "es" | "en";

/** Estructura para certificaciones y credenciales verificables */
export type Certificate = {
  title: string;
  titleEn?: string;
  organization: string;
  organizationEn?: string;
  period: string;
  periodEn?: string;
  summary: string;
  summaryEn?: string;
  tags: string[];
  category: string;
  credentialUrl?: string;
  /** Tipo de vista previa en el modal: imagen, PDF o iframe embebido */
  preview?: {
    type: "image" | "pdf" | "embed";
    src: string;
  };
};

// -----------------------------------------------------------------------------
// 2. TEXTOS Y TRADUCCIONES DE LA INTERFAZ (UI COPY)
// -----------------------------------------------------------------------------

export const copy = {
  // ==========================================
  // ESPAÑOL
  // ==========================================
  es: {
    nav: [
      "Inicio",
      "Stack",
      "Sobre mí",
      "Proyectos",
      "Experiencia",
      "Formación",
      "Charlas",
      "Contacto",
    ],
    available: "Disponible para oportunidades y nuevos proyectos",
    heroKicker: "Ingeniero",
    heroTitle: "Full Stack.",
    intro:
      "Soy Miguel Angel Choque Garcia, Ingeniero en Ciencias de la Computación e Ingeniero Electrónico. Construyo productos web de punta a punta: interfaces claras, APIs robustas, datos, IA y despliegues confiables en cloud.",
    projectsButton: "Ver proyectos",
    contactButton: "Hablemos",
    download: "Descargar CV",
    findMe: "Encuéntrame en",
    identityRole: "Full Stack Developer",
    identityLine: "Frontend · Backend · Cloud & DevOps",
    photoPending: "",
    metrics: [
      ["1.er lugar", "Smart Projects 2025"],
      ["16×", "menos latencia usando Redis"],
      ["0.99", "AUC-ROC en detección de fraude"],
      ["2", "ingenierías que conectan software y sistemas"],
    ],
    stackTitle: "Stack completo, ingeniería donde importa.",
    stackLead:
      "Trabajo en todas las capas del producto y conecto desarrollo, datos e infraestructura para entregar soluciones mantenibles.",
    alsoWork: "También trabajo con",
    teamwork: "Forma de trabajo",
    aboutTitle: "Ingeniería con visión de producto.",
    aboutText: [
      "Me motiva convertir problemas reales en productos simples de usar y sólidos por dentro. Mi formación en computación y electrónica me ayuda a comprender tanto el software como los sistemas que lo sostienen.",
      "He construido interfaces, APIs, modelos de datos, soluciones con IA y flujos de entrega para equipos remotos. Busco decisiones técnicas claras, resultados medibles y colaboración sin fricción.",
    ],
    currentFocus: "Enfoque actual",
    contributionTitle: "Lo que aporto al equipo",
    approachTitle: "Mi enfoque",
    projectsTitle: "Proyectos seleccionados",
    projectsLead:
      "Productos reales, retos técnicos concretos y resultados que se pueden medir.",
    viewCode: "Ver código",
    experienceTitle: "Experiencia",
    educationTitle: "Formación y certificaciones",
    talksTitle: "Compartir lo aprendido también es construir.",
    talksLead:
      "Comparto experiencias técnicas, herramientas y aprendizajes prácticos con comunidades de tecnología y software libre.",
    talksSoon: "Próximamente",
    talksDelivered: "Charla impartida",
    talksMore: "También puedo hablar sobre",
    talksTopic: "Tema disponible",
    talksViewPost: "Ver publicación",
    talksCta: "Conversemos sobre una charla",
    contactTitle: "Construyamos algo sólido",
    contactLead:
      "¿Tienes un producto, una oportunidad o una idea? Cuéntame el contexto y te responderé directamente por correo.",
    form: ["Nombre", "Tu correo", "Asunto", "Mensaje", "Enviar mensaje"],
    filters: ["Todos", "Backend", "Full Stack", "IA y datos", "Cloud & DevOps"],
    certificate: "Ver certificado",
    close: "Cerrar",
    footerRole: "Full Stack Developer",
    footerLine: "React · TypeScript · Vite · Tailwind",
    footerSocial: "Conecta",
    footerNav: "Navegación",
    footerMade: "Hecho en Bolivia con mate, código y curiosidad",
    tooltips: {
      projects: "Explorar proyectos y resultados",
      contact: "Ir al formulario de contacto",
      cv: "Abrir el CV en una pestaña nueva",
      language: "Cambiar el sitio a inglés",
      theme: "Cambiar entre tema claro y oscuro",
      github: "Ver mi código y repositorios",
      linkedin: "Conectar conmigo en LinkedIn",
      email: "Escribirme por correo electrónico",
      whatsapp: "Enviarme un mensaje por WhatsApp",
      talkPost: "Ver la publicación de la charla en LinkedIn",
    },
  },

  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    nav: [
      "Home",
      "Stack",
      "About",
      "Projects",
      "Experience",
      "Education",
      "Speaking",
      "Contact",
    ],
    available: "Available for opportunities and new projects",
    heroKicker: "Engineer",
    heroTitle: "Full Stack.",
    intro:
      "I’m Miguel Angel Choque Garcia, a Computer Science Engineer and Electronic Engineer. I build web products end to end: clear interfaces, robust APIs, data, AI and reliable cloud delivery.",
    projectsButton: "View projects",
    contactButton: "Let’s talk",
    download: "Download résumé",
    findMe: "Find me on",
    identityRole: "Full Stack Developer",
    identityLine: "Frontend · Backend · Cloud & DevOps",
    photoPending: "",
    metrics: [
      ["1st", "place · Smart Projects 2025"],
      ["16×", "lower latency using Redis"],
      ["0.99", "AUC-ROC in fraud detection"],
      ["2", "engineering degrees connecting software and systems"],
    ],
    stackTitle: "A complete stack, engineering where it matters.",
    stackLead:
      "I work across every product layer and connect development, data and infrastructure to deliver maintainable solutions.",
    alsoWork: "I also work with",
    teamwork: "How I work",
    aboutTitle: "Engineering with a product mindset.",
    aboutText: [
      "I enjoy turning real problems into products that are simple to use and solid inside. My background in computing and electronics helps me understand both software and the systems supporting it.",
      "I have built interfaces, APIs, data models, AI solutions and delivery workflows for remote teams. I aim for clear technical decisions, measurable outcomes and frictionless collaboration.",
    ],
    currentFocus: "Current focus",
    contributionTitle: "What I bring to a team",
    approachTitle: "My approach",
    projectsTitle: "Selected projects",
    projectsLead:
      "Real products, concrete technical challenges and measurable outcomes.",
    viewCode: "View code",
    experienceTitle: "Experience",
    educationTitle: "Education and certifications",
    talksTitle: "Sharing what I learn is also a way to build.",
    talksLead:
      "I share technical experiences, tools and practical lessons with technology and open-source communities.",
    talksSoon: "Coming soon",
    talksDelivered: "Delivered talk",
    talksMore: "I can also speak about",
    talksTopic: "Available topic",
    talksViewPost: "View post",
    talksCta: "Let’s discuss a talk",
    contactTitle: "Let’s build something solid",
    contactLead:
      "Have a product, an opportunity or an idea? Tell me the context and I’ll reply directly by email.",
    form: ["Name", "Your email", "Subject", "Message", "Send message"],
    filters: ["All", "Backend", "Full Stack", "AI & data", "Cloud & DevOps"],
    certificate: "View certificate",
    close: "Close",
    footerRole: "Full Stack Developer",
    footerLine: "React · TypeScript · Vite · Tailwind",
    footerSocial: "Connect",
    footerNav: "Navigation",
    footerMade: "Made in Bolivia with mate, code and curiosity",
    tooltips: {
      projects: "Explore projects and outcomes",
      contact: "Go to the contact form",
      cv: "Open the résumé in a new tab",
      language: "Switch the site to Spanish",
      theme: "Switch between light and dark themes",
      github: "View my code and repositories",
      linkedin: "Connect with me on LinkedIn",
      email: "Send me an email",
      whatsapp: "Send me a WhatsApp message",
      talkPost: "View the talk post on LinkedIn",
    },
  },
} as const;

// -----------------------------------------------------------------------------
// 3. TECNOLOGÍAS DESTACADAS DEL HERO
// -----------------------------------------------------------------------------
/** Etiquetas / píldoras mostradas en la sección principal (Hero) */
export const heroTechnologies = [
  "TypeScript",
  "Angular",
  "React",
  "NestJS",
  "Spring Boot",
  "PostgreSQL",
  "Docker",
  "AWS · Azure",
];

// -----------------------------------------------------------------------------
// 4. PROYECTOS DESTACADOS
// -----------------------------------------------------------------------------
/**
 * Proyectos visibles en la sección de 'Trabajo / Proyectos'.
 * Cada uno incluye filtros de categoría, descripciones bilingües, stack y enlace a código.
 */
export const projects = [
  {
    name: "CareerGenius",
    type: "Full Stack",
    role: {
      es: "Full Stack · Proyecto propio",
      en: "Full Stack · Personal project",
    },
    description: {
      es: "Plataforma de orientación vocacional para Bolivia con test adaptativo, recomendaciones académicas y planes de estudio generados con IA.",
      en: "AI-powered career guidance platform for Bolivia with adaptive assessments, academic recommendations and personalized study plans.",
    },
    result: {
      es: "Producto end-to-end desplegado y contenerizado",
      en: "Deployed and containerized end-to-end product",
    },
    stack: ["React", "TypeScript", "NestJS", "MongoDB", "Gemini", "Docker"],
    codeUrl: "https://github.com/mickychog/career-genius",
  },
  {
    name: "Control por Gestos",
    type: "IA y datos",
    role: {
      es: "Visión artificial · Proyecto académico",
      en: "Computer vision · Academic project",
    },
    description: {
      es: "Sistema de interacción sin contacto que reconoce gestos de la mano en tiempo real y los traduce en acciones del mouse, volumen y brillo.",
      en: "Touchless interaction system that recognizes hand gestures in real time and maps them to mouse, volume and brightness controls.",
    },
    result: {
      es: "Precisión superior al 95% en clasificación de gestos",
      en: "Over 95% gesture classification accuracy",
    },
    stack: ["Python", "Vision Transformer", "MediaPipe", "OpenCV", "PyTorch"],
    codeUrl: "https://github.com/mickychog/control_por_gestos",
  },
  {
    name: "Talent Match",
    type: "IA y datos",
    role: { es: "Backend · Foo Talent", en: "Backend · Foo Talent" },
    description: {
      es: "Plataforma de matching de talento con procesamiento inteligente de CVs y búsqueda vectorial de candidatos.",
      en: "Talent matching platform with intelligent résumé processing and vector candidate search.",
    },
    result: {
      es: "1.er lugar · Smart Projects 2025",
      en: "1st place · Smart Projects 2025",
    },
    stack: ["NestJS", "Azure OpenAI", "Pinecone", "Redis"],
    codeUrl: "https://github.com/jonanfu/backend-foo-talent",
  },
  {
    name: "ConnectFlow",
    type: "Backend",
    role: { es: "Backend · No Country", en: "Backend · No Country" },
    description: {
      es: "CRM inteligente para automatizar comunicaciones, segmentar usuarios y programar recordatorios multicanal.",
      en: "Smart CRM for automated communication, user segmentation and multichannel reminders.",
    },
    result: {
      es: "6+ endpoints REST documentados",
      en: "6+ documented REST endpoints",
    },
    stack: ["Node.js", "WhatsApp API", "Brevo", "Swagger"],
    codeUrl: "https://github.com/G33-NoCountry/startup-crm",
  },
  {
    name: "MediConnect",
    type: "Full Stack",
    role: { es: "Full Stack · No Country", en: "Full Stack · No Country" },
    description: {
      es: "Portal de telemedicina con historias clínicas, autenticación JWT y autorización basada en roles.",
      en: "Telemedicine portal with electronic health records, JWT authentication and role-based authorization.",
    },
    result: {
      es: "API REST documentada y preparada con Docker",
      en: "Documented, Docker-ready REST API",
    },
    stack: ["Angular", "TypeScript", "Express", "MySQL", "Swagger", "Docker"],
    codeUrl: "https://github.com/nicoflorentin/api-nocountry",
  },
  {
    name: "Fraud Detection",
    type: "IA y datos",
    role: {
      es: "Machine Learning · No Country",
      en: "Machine Learning · No Country",
    },
    description: {
      es: "Modelo de detección de fraude con balanceo de clases, análisis exploratorio y feature engineering.",
      en: "Fraud detection model with class balancing, exploratory analysis and feature engineering.",
    },
    result: { es: "AUC-ROC 0.99", en: "AUC-ROC 0.99" },
    stack: ["Python", "scikit-learn", "SMOTE", "pandas"],
    codeUrl: "https://github.com/No-Country-simulation/equipo-c23-13-data",
  },
];

// -----------------------------------------------------------------------------
// 5. EXPERIENCIA LABORAL / TRAYECTORIA
// -----------------------------------------------------------------------------
/** Historial cronológico de experiencia laboral y pasantías */
export const experiences = [
  {
    period: { es: "2026 — Actualidad", en: "2026 — Present" },
    company: "Fiscalía General del Estado",
    role: {
      es: "Pasante de Ingeniería de Software y DevOps",
      en: "Software and DevOps Engineering Intern",
    },
    category: "Cloud & DevOps",
    description: {
      es: "Desarrollo de un sistema de telemetría y observabilidad en Go para entornos Linux. Automatización de despliegues, monitoreo de infraestructura y soporte aplicando Infrastructure as Code.",
      en: "Development of a Go-based telemetry and observability system for Linux environments. Deployment automation, infrastructure monitoring and support using IaC.",
    },
  },
  {
    period: { es: "Oct — Dic 2025", en: "Oct — Dec 2025" },
    company: "No Country · ConnectFlow",
    role: { es: "Desarrollador Backend", en: "Backend Developer" },
    category: "Backend",
    description: {
      es: "CRM inteligente, integraciones con WhatsApp Cloud API y servicios de correo, APIs documentadas y flujo CI/CD.",
      en: "Smart CRM, WhatsApp Cloud API and email integrations, documented APIs and CI/CD workflow.",
    },
  },
  {
    period: { es: "Sep — Oct 2025", en: "Sep — Oct 2025" },
    company: "No Country · MediConnect",
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    category: "Full Stack",
    description: {
      es: "Backend Node.js, frontend Angular, autenticación JWT, RBAC y diseño de datos clínicos en PostgreSQL.",
      en: "Node.js backend, Angular frontend, JWT authentication, RBAC and clinical data design in PostgreSQL.",
    },
  },
  {
    period: { es: "Abr — Ago 2025", en: "Apr — Aug 2025" },
    company: "Foo Talent",
    role: { es: "Desarrollador Backend", en: "Backend Developer" },
    category: "Backend",
    description: {
      es: "Talent Match y Buggle: IA generativa, búsqueda vectorial, caché Redis, trazabilidad de errores y monitoreo de producción.",
      en: "Talent Match and Buggle: generative AI, vector search, Redis caching, error tracing and production monitoring.",
    },
  },
  {
    period: { es: "Ene — Mar 2025", en: "Jan — Mar 2025" },
    company: "No Country",
    role: {
      es: "Backend y Machine Learning",
      en: "Backend and Machine Learning",
    },
    category: "IA y datos",
    description: {
      es: "API REST para Fit Lover y modelo de detección de fraude con AUC-ROC de 0.99.",
      en: "REST API for Fit Lover and a fraud detection model with 0.99 AUC-ROC.",
    },
  },
];

// -----------------------------------------------------------------------------
// 6. FORMACIÓN ACADÉMICA
// -----------------------------------------------------------------------------
/** Grados y estudios universitarios */
export const education = [
  {
    degree: {
      es: "Ingeniería en Ciencias de la Computación",
      en: "Computer Science Engineering",
    },
    institution: "USFX",
    period: "2019 — 2026",
    status: { es: "Noveno semestre", en: "Ninth semester" },
  },
  {
    degree: { es: "Ingeniería Electrónica", en: "Electronic Engineering" },
    institution: "USFX",
    period: "2017 — 2025",
    status: { es: "Egresado", en: "Graduate" },
  },
];

// -----------------------------------------------------------------------------
// 7. CERTIFICACIONES Y CREDENCIALES
// -----------------------------------------------------------------------------
/**
 * Certificados con información bilingüe, tags y enlaces/vistas previas.
 * Al hacer clic en la tarjeta se abre el modal con estos datos.
 */
export const certificates: Certificate[] = [
  {
    title: "Artificial Intelligence Fundamentals",
    titleEn: "Artificial Intelligence Fundamentals",
    organization: "IBM SkillsBuild",
    period: "Septiembre 2025",
    periodEn: "September 2025",
    summary:
      "Principios de inteligencia artificial, machine learning, deep learning, NLP y ética aplicada en sistemas inteligentes.",
    summaryEn:
      "Artificial intelligence fundamentals, machine learning, deep learning, NLP, and ethical considerations in AI systems.",
    tags: ["AI", "Machine Learning", "IBM"],
    category: "IA y datos",
    credentialUrl: "https://www.credly.com/badges/6ad2774f-533f-452f-bab3-5c755ea8a357",
  },
  {
    title: "Agile Explorer",
    titleEn: "Agile Explorer",
    organization: "IBM SkillsBuild",
    period: "Septiembre 2025",
    periodEn: "September 2025",
    summary:
      "Mentalidad ágil, diseño iterativo, tableros visuales Kanban y mejora continua en proyectos de desarrollo de software.",
    summaryEn:
      "Agile mindset, iterative design, Kanban visual boards, and continuous improvement in software development projects.",
    tags: ["Agile", "Kanban", "IBM"],
    category: "Full Stack",
    credentialUrl: "https://www.credly.com/badges/6f7cd18d-a999-43cc-a274-f0609c6be00f",
  },
  {
    title: "AWS Educate Introduction to Generative AI - Training Badge",
    titleEn: "AWS Educate Introduction to Generative AI - Training Badge",
    organization: "Amazon Web Services (AWS)",
    period: "Junio 2025",
    periodEn: "June 2025",
    summary:
      "Conceptos fundamentales de IA generativa, modelos base (Foundational Models), LLMs y casos de uso prácticos en la nube de AWS.",
    summaryEn:
      "Foundational concepts of Generative AI, foundation models, LLMs, and practical cloud use cases on AWS.",
    tags: ["AWS", "Generative AI", "Cloud"],
    category: "IA y datos",
    credentialUrl: "https://www.credly.com/badges/3c4b67d1-5e87-4a5f-ae22-779ed6083fc3",
  },
  {
    title: "Scrum Foundation Learner 2025",
    titleEn: "Scrum Foundation Learner 2025",
    organization: "CertiProf",
    period: "Febrero 2025",
    periodEn: "February 2025",
    summary:
      "Estructura del marco Scrum, roles (Product Owner, Scrum Master, Developers), ceremonias, artefactos y entregas incrementales.",
    summaryEn:
      "Scrum framework structure, roles (Product Owner, Scrum Master, Developers), ceremonies, artifacts, and incremental delivery.",
    tags: ["Scrum", "Agile", "CertiProf"],
    category: "Full Stack",
    credentialUrl: "https://www.credly.com/badges/e4c4cc17-d870-47ae-a82c-922a8323ed68",
  },
  {
    title: "Ethical Hacker",
    titleEn: "Ethical Hacker",
    organization: "Cisco Networking Academy",
    period: "Noviembre 2024",
    periodEn: "November 2024",
    summary:
      "Metodologías de hacking ético, análisis de vulnerabilidades, pruebas de penetración, vectores de ataque y aseguramiento de sistemas.",
    summaryEn:
      "Ethical hacking methodologies, vulnerability assessment, penetration testing, attack vectors, and systems hardening.",
    tags: ["Ethical Hacking", "Cybersecurity", "Cisco"],
    category: "Cloud & DevOps",
    credentialUrl: "https://www.credly.com/badges/64a36457-71b1-4a9c-a34d-70661670345a",
  },
  {
    title: "Introduction to Cybersecurity",
    titleEn: "Introduction to Cybersecurity",
    organization: "Cisco Networking Academy",
    period: "Septiembre 2024",
    periodEn: "September 2024",
    summary:
      "Fundamentos de seguridad de la información, confidencialidad, integridad y disponibilidad (tríada CIA), y mitigación de amenazas.",
    summaryEn:
      "Information security essentials, confidentiality, integrity and availability (CIA triad), and threat mitigation.",
    tags: ["Cybersecurity", "Networks", "Cisco"],
    category: "Cloud & DevOps",
    credentialUrl: "https://www.credly.com/badges/8e26bd13-4bd9-4ea1-9f13-15791059b0c8",
  },
  {
    title: "Especialización Backend Java",
    titleEn: "Java Backend Specialization",
    organization: "Oracle ONE · Alura Latam",
    period: "Julio 2024 · 286 horas",
    periodEn: "July 2024 · 286 hours",
    summary:
      "Java, Spring Boot 3, JPA/Hibernate, seguridad en APIs REST, JUnit y Mockito.",
    summaryEn:
      "Java, Spring Boot 3, JPA/Hibernate, REST API security, JUnit and Mockito.",
    tags: ["Java", "Spring Boot", "Testing"],
    category: "Backend",
    credentialUrl: "https://drive.google.com/file/d/1cqeTAE8nhmXtXz5z8k5Iv7mJGqhrpv9k/view?usp=sharing",
    preview: {
      type: "embed",
      src: "https://drive.google.com/file/d/1cqeTAE8nhmXtXz5z8k5Iv7mJGqhrpv9k/preview",
    },
  },
  {
    title: "Desarrollo Full Stack PHP",
    titleEn: "Full Stack PHP Development",
    organization: "Innovacode",
    period: "Diciembre 2023 · 38 horas",
    periodEn: "December 2023 · 38 hours",
    summary:
      "Aplicaciones CRUD con Laravel 10, Vue 3, autenticación y arquitectura MVC.",
    summaryEn:
      "CRUD applications with Laravel 10, Vue 3, authentication and MVC architecture.",
    tags: ["Laravel", "Vue", "PHP"],
    category: "Full Stack",
    credentialUrl: "https://drive.google.com/file/d/1s-WzMtRA2fODlEThwlZDk_--SppoW1Z_/view?usp=sharing",
    preview: {
      type: "embed",
      src: "https://drive.google.com/file/d/1s-WzMtRA2fODlEThwlZDk_--SppoW1Z_/preview",
    },
  },
];

// -----------------------------------------------------------------------------
// 8. GRUPOS DE HABILIDADES TÉCNICAS (STACK & SKILLS)
// -----------------------------------------------------------------------------
/** Secciones de habilidades técnicas organizadas por especialidad */
export const skillGroups = [
  {
    icon: "frontend",
    title: { es: "Frontend", en: "Frontend" },
    lead: {
      es: "Interfaces accesibles, rápidas y orientadas al producto.",
      en: "Accessible, fast and product-oriented interfaces.",
    },
    items: [
      "Angular",
      "React",
      "Vue 3",
      "TypeScript",
      "Tailwind",
      "HTML · CSS",
    ],
  },
  {
    icon: "backend",
    title: { es: "Backend", en: "Backend" },
    lead: {
      es: "APIs mantenibles, autenticación y arquitectura limpia.",
      en: "Maintainable APIs, authentication and clean architecture.",
    },
    items: [
      "NestJS",
      "Spring Boot 3",
      "Laravel 10",
      "Express",
      "REST · OpenAPI",
      "JWT · RBAC",
    ],
  },
  {
    icon: "data",
    title: { es: "Datos e IA", en: "Data & AI" },
    lead: {
      es: "Datos confiables e inteligencia aplicada a casos reales.",
      en: "Reliable data and intelligence applied to real use cases.",
    },
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Azure OpenAI",
      "Pinecone",
      "scikit-learn",
    ],
  },
  {
    icon: "cloud",
    title: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
    lead: {
      es: "Entrega automatizada, observabilidad e infraestructura.",
      en: "Automated delivery, observability and infrastructure.",
    },
    items: [
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "AWS",
      "Azure",
      "Sentry · IaC",
    ],
  },
  {
    icon: "quality",
    title: { es: "Testing y calidad", en: "Testing & quality" },
    lead: {
      es: "Calidad integrada desde el diseño hasta producción.",
      en: "Quality built in from design to production.",
    },
    items: ["TDD", "JUnit 5", "Mockito", "Unit tests", "Integration", "SOLID"],
  },
  {
    icon: "systems",
    title: { es: "Sistemas", en: "Systems" },
    lead: {
      es: "Una mirada de ingeniería que une software y electrónica.",
      en: "An engineering perspective connecting software and electronics.",
    },
    items: [
      "Telemetría",
      "Monitoreo",
      "Automatización",
      "Redes",
      "Electrónica",
      "Soporte",
    ],
  },
];

// -----------------------------------------------------------------------------
// 9. LO QUE APORTO AL EQUIPO (CONTRIBUCIONES)
// -----------------------------------------------------------------------------
/** Puntos de valor y diferenciadores clave para equipos de trabajo */
export const contributions = [
  {
    icon: "fullstack",
    title: { es: "Ejecución Full Stack", en: "Full stack execution" },
    text: {
      es: "Puedo avanzar desde la interfaz y la API hasta los datos y el despliegue.",
      en: "I can move from the interface and API through data and deployment.",
    },
  },
  {
    icon: "architecture",
    title: { es: "Arquitectura pragmática", en: "Pragmatic architecture" },
    text: {
      es: "Elijo soluciones claras, mantenibles y proporcionadas al problema.",
      en: "I choose clear, maintainable solutions proportionate to the problem.",
    },
  },
  {
    icon: "cloud",
    title: { es: "Cloud & DevOps", en: "Cloud & DevOps" },
    text: {
      es: "Automatización, observabilidad y entregas repetibles desde el inicio.",
      en: "Automation, observability and repeatable delivery from the start.",
    },
  },
  {
    icon: "ai",
    title: { es: "IA aplicada", en: "Applied AI" },
    text: {
      es: "Integro IA cuando mejora una tarea, una decisión o una métrica real.",
      en: "I use AI when it improves a task, a decision or a real metric.",
    },
  },
];

// -----------------------------------------------------------------------------
// 10. METODOLOGÍA / ENFOQUE DE TRABAJO
// -----------------------------------------------------------------------------
/** Proceso paso a paso aplicado para resolver problemas y construir software */
export const approach = [
  {
    n: "01",
    icon: "discover",
    es: "Entender el problema",
    en: "Understand the problem",
    text: {
      es: "Aclarar la necesidad, las personas y el resultado esperado.",
      en: "Clarify the need, the people involved and the expected outcome.",
    },
  },
  {
    n: "02",
    icon: "design",
    es: "Diseñar la solución",
    en: "Design the solution",
    text: {
      es: "Definir flujos, contratos y límites antes de elegir herramientas.",
      en: "Define flows, contracts and boundaries before choosing tools.",
    },
  },
  {
    n: "03",
    icon: "build",
    es: "Construir de punta a punta",
    en: "Build end to end",
    text: {
      es: "Conectar interfaz, API, datos e infraestructura en un flujo coherente.",
      en: "Connect interface, API, data and infrastructure into one coherent flow.",
    },
  },
  {
    n: "04",
    icon: "validate",
    es: "Validar y automatizar",
    en: "Validate and automate",
    text: {
      es: "Probar lo importante y automatizar entregas repetibles.",
      en: "Test what matters and automate repeatable delivery.",
    },
  },
  {
    n: "05",
    icon: "measure",
    es: "Medir y evolucionar",
    en: "Measure and evolve",
    text: {
      es: "Observar el producto, aprender y volver al problema con evidencia.",
      en: "Observe the product, learn and return to the problem with evidence.",
    },
  },
];

// -----------------------------------------------------------------------------
// 11. CHARLAS Y COMUNIDAD
// -----------------------------------------------------------------------------
/** Charlas técnicas impartidas en eventos / conferencias */
export const talks = [
  {
    title: { es: "Kubernetes en tu Laptop", en: "Kubernetes on Your Laptop" },
    event: "FLISOL Sucre 2026",
    date: { es: "24 de abril de 2026", en: "April 24, 2026" },
    location: "Sucre, Bolivia",
    description: {
      es: "Mi primera charla técnica, enfocada en acercar Kubernetes y DevOps a entornos locales de aprendizaje y experimentación.",
      en: "My first technical talk, focused on bringing Kubernetes and DevOps to local learning and experimentation environments.",
    },
    image: "/images/talks/flisol-2026-kubernetes.webp",
    imageAlt: {
      es: "Miguel Angel Choque Garcia durante la charla Kubernetes en tu Laptop en FLISOL Sucre 2026",
      en: "Miguel Angel Choque Garcia speaking about Kubernetes on Your Laptop at FLISOL Sucre 2026",
    },
    postUrl:
      "https://www.linkedin.com/posts/miguel-choque-garcia_flisol2026-sucre-devops-activity-7458166562500341760-X6sG",
    tags: ["Kubernetes", "DevOps", "Linux", "Software Libre"],
  },
];

/** Temas adicionales disponibles para dar conferencias, talleres o meetups */
export const talkTopics = [
  {
    icon: "frontend",
    title: { es: "Full Stack sin fricción", en: "Frictionless full stack" },
    text: {
      es: "Contratos claros entre interfaz, API y datos.",
      en: "Clear contracts across interface, API and data.",
    },
  },
  {
    icon: "ai",
    title: {
      es: "IA útil en productos reales",
      en: "Useful AI in real products",
    },
    text: {
      es: "Del prototipo a una integración medible y observable.",
      en: "From prototype to a measurable, observable integration.",
    },
  },
  {
    icon: "performance",
    title: { es: "Rendimiento y DevOps", en: "Performance & DevOps" },
    text: {
      es: "Caché, telemetría y despliegues que reducen incertidumbre.",
      en: "Caching, telemetry and delivery that reduce uncertainty.",
    },
  },
];

// -----------------------------------------------------------------------------
// 12. FUNCIONES DE UTILIDAD
// -----------------------------------------------------------------------------
/**
 * Retorna la versión localizada (ES o EN) de un certificado.
 */
export function localizeCertificate(
  item: Certificate,
  locale: Locale,
): Certificate {
  if (locale === "es") return item;
  return {
    ...item,
    title: item.titleEn?.trim() || item.title,
    organization: item.organizationEn?.trim() || item.organization,
    period: item.periodEn?.trim() || item.period,
    summary: item.summaryEn?.trim() || item.summary,
  };
}
