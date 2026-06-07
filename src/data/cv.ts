// CV business data. Keep portfolio UI labels, SEO copy and helper text in src/i18n/translations.ts.
//
// This is intentionally a TypeScript "JSON-like" object instead of a .json file:
// - comments explain each field for humans and AI agents generating CV content;
// - TypeScript validates the shape at build time;
// - all translatable CV content uses { es, ca, en } so the same data powers every language.
//
// Editing rule of thumb:
// - Put facts about the person, companies, projects, education and skills here.
// - Put button labels, section titles, page subtitles and interface descriptions in translations.ts.

export type Lang = "es" | "ca" | "en";
export type LocalizedString = Record<Lang, string>;
export type LocalizedList = Record<Lang, string[]>;

export interface ProfileItem {
  network: string;
  username: string;
  url: string;
}

export interface LanguageItem {
  // BCP-47 language code used in structured data and machine-readable output.
  code: Lang;
  name: LocalizedString;
  level: LocalizedString;
}

export interface WorkItem {
  // Public company or organization name as it should appear in the CV.
  name: string;
  // Role title. Keep concise; this is used in cards and in the printable CV.
  position: LocalizedString;
  // Optional public URL for the company.
  url?: string;
  // ISO date (YYYY-MM-DD). Month/year is rendered from this value.
  startDate: string;
  // ISO date or null for current roles.
  endDate: string | null;
  // Short paragraph describing scope and context of the role.
  summary: LocalizedString;
  // Impact bullets. Prefer measurable outcomes and shipped work.
  highlights: LocalizedList;
  // Comma-separated stack for display chips and the printable CV.
  technologies: string;
  // City/country or remote region shown next to the role.
  location: LocalizedString;
  // Remote, hybrid or on-site.
  modality: LocalizedString;
  // Marks the role with the "present/current" UI label.
  current?: boolean;
}

export interface ProjectItem {
  // Project/product name as recruiters or stakeholders would recognize it.
  name: string;
  // Optional public URL (product page, repo, marketplace listing, etc.).
  url?: string;
  // One-sentence business description of the project.
  description: LocalizedString;
  // Tags or compact highlights shown as chips.
  highlights: LocalizedList;
  // ISO date (YYYY-MM-DD).
  startDate: string;
  // ISO date or null when the project is active.
  endDate: string | null;
  // Controls active/archived presentation.
  active: boolean;
}

export interface EducationItem {
  // School, university or training provider.
  institution: string;
  // Subject area or specialization.
  area: LocalizedString;
  // Degree, certificate or program name.
  studyType: LocalizedString;
  // ISO date (YYYY-MM-DD).
  startDate: string;
  // ISO date (YYYY-MM-DD).
  endDate: string;
  // Short description of relevant focus areas.
  summary: LocalizedString;
}

export const cv = {
  // Personal and contact data used across header, contact page, footer and printable CV.
  basics: {
    name: "Ubaldo Santos Patón",
    givenName: "Ubaldo",
    familyName: "Santos Patón",
    label: {
      es: "Ingeniero de Software Full-Stack · TypeScript · PHP · Laravel · Vue",
      ca: "Enginyer de Programari Full-Stack · TypeScript · PHP · Laravel · Vue",
      en: "Full-Stack Software Engineer · TypeScript · PHP · Laravel · Vue",
    } satisfies LocalizedString,
    tagline: {
      es: "Ingeniero full-stack con 6+ años en producto. Especializado en TypeScript y PHP/Laravel: SDKs multiplataforma, integraciones edtech y plataformas de assessment con foco en calidad, arquitectura y rendimiento.",
      ca: "Enginyer full-stack amb més de 6 anys en producte. Especialitzat en TypeScript i PHP/Laravel: SDKs multiplataforma, integracions edtech i plataformes d'assessment amb focus en qualitat, arquitectura i rendiment.",
      en: "Full-stack engineer with 6+ years in product. Specialized in TypeScript and PHP/Laravel: cross-platform SDKs, edtech integrations and assessment platforms with a focus on quality, architecture and performance.",
    } satisfies LocalizedString,
    summary: {
      es: "Ingeniero de Software Full-Stack con más de 6 años de experiencia en producto. Especializado en TypeScript/JavaScript y PHP/Laravel, con foco en calidad de código, arquitectura mantenible, accesibilidad y rendimiento. Actualmente en Wiris en el equipo de Assessment desarrollando Nubric (antes Learning Lemur) en Laravel, una plataforma de assessment matemático. Previamente, en el equipo de Integraciones desarrollé el SDK multiplataforma de MathType.",
      ca: "Enginyer de Programari Full-Stack amb més de 6 anys d'experiència en producte. Especialitzat en TypeScript/JavaScript i PHP/Laravel, amb focus en qualitat de codi, arquitectura mantenible, accessibilitat i rendiment. Actualment a Wiris a l'equip d'Assessment desenvolupant Nubric (abans Learning Lemur) en Laravel, una plataforma d'assessment matemàtic. Prèviament, a l'equip d'Integracions vaig desenvolupar el SDK multiplataforma de MathType.",
      en: "Full-Stack Software Engineer with 6+ years of product experience. Specialized in TypeScript/JavaScript and PHP/Laravel, focused on code quality, maintainable architecture, accessibility and performance. Currently at Wiris on the Assessment team developing Nubric (formerly Learning Lemur) in Laravel, a math assessment platform. Previously, on the Integrations team I built the cross-platform MathType SDK.",
    } satisfies LocalizedString,
    email: "u.santospaton@gmail.com",
    phone: "+34 654 455 339",
    location: {
      es: "Badalona, Barcelona · España",
      ca: "Badalona, Barcelona · Espanya",
      en: "Badalona, Barcelona · Spain",
    } satisfies LocalizedString,
    address: {
      locality: "Badalona, Barcelona",
      countryCode: "ES",
    },
    url: "https://ubaldo.is-a.dev",
    profiles: [
      {
        network: "LinkedIn",
        username: "ubaldo-santos",
        url: "https://www.linkedin.com/in/ubaldo-santos",
      },
      {
        network: "GitHub",
        username: "usantos-at-wiris",
        url: "https://github.com/usantos-at-wiris",
      },
    ] satisfies ProfileItem[],
  },
  // Professional roles, newest first. Consecutive roles with the same company are grouped in the experience page.
  work: [
    {
      name: "Wiris",
      position: {
        es: "Ingeniero de Software · Assessment (Nubric)",
        ca: "Enginyer de Programari · Assessment (Nubric)",
        en: "Software Engineer · Assessment (Nubric)",
      },
      url: "https://www.wiris.com/",
      startDate: "2025-04-10",
      endDate: null,
      current: true,
      summary: {
        es: "Desarrollo de Nubric (anteriormente Learning Lemur) en PHP/Laravel: plataforma de assessment matemático que permite crear y autocorregir ejercicios con MathType integrado, usada por instituciones educativas. Trabajo en un equipo de producto especializado en herramientas de evaluación en el ámbito de las matemáticas.",
        ca: "Desenvolupament de Nubric (anteriorment Learning Lemur) en PHP/Laravel: plataforma d'assessment matemàtic que permet crear i autocorregir exercicis amb MathType integrat, usada per institucions educatives. Treball en un equip de producte especialitzat en eines d'avaluació en l'àmbit de les matemàtiques.",
        en: "Building Nubric (formerly Learning Lemur) in PHP/Laravel: a math assessment platform to create and auto-grade exercises with MathType embedded, used by educational institutions. I work on a product team specialized in math assessment tooling.",
      },
      highlights: {
        es: [
          "Desarrollo de funcionalidades de evaluación matemática en Laravel con foco en exactitud y rendimiento",
          "Mejoras de arquitectura y refactor del código heredado de Learning Lemur",
          "Colaboración estrecha con producto, diseño y QA en un equipo cross-funcional",
          "Integración con el motor matemático de Wiris (MathType) y servicios internos",
        ],
        ca: [
          "Desenvolupament de funcionalitats d'avaluació matemàtica en Laravel amb focus en exactitud i rendiment",
          "Millores d'arquitectura i refactor del codi heretat de Learning Lemur",
          "Col·laboració estreta amb producte, disseny i QA en un equip cross-funcional",
          "Integració amb el motor matemàtic de Wiris (MathType) i serveis interns",
        ],
        en: [
          "Build math assessment features in Laravel with a focus on correctness and performance",
          "Architecture improvements and refactors over the legacy Learning Lemur codebase",
          "Close collaboration with product, design and QA in a cross-functional team",
          "Integration with the Wiris math engine (MathType) and internal services",
        ],
      },
      technologies: "PHP, Laravel, MySQL, JavaScript, Vue.js, REST APIs, Docker, Git",
      location: { es: "Barcelona, España", ca: "Barcelona, Espanya", en: "Barcelona, Spain" },
      modality: { es: "Híbrido", ca: "Híbrid", en: "Hybrid" },
    },
    {
      name: "Wiris",
      position: {
        es: "Ingeniero de Software · Integraciones (MathType)",
        ca: "Enginyer de Programari · Integracions (MathType)",
        en: "Software Engineer · Integrations (MathType)",
      },
      url: "https://www.wiris.com/",
      startDate: "2024-03-10",
      endDate: "2025-04-09",
      summary: {
        es: "Desarrollo del SDK multiplataforma de MathType y de integraciones para editores líderes (CKEditor, TinyMCE, Froala, Moodle, Microsoft Office, Google Docs) con arquitectura modular y escalable.",
        ca: "Desenvolupament del SDK multiplataforma de MathType i d'integracions per a editors líders (CKEditor, TinyMCE, Froala, Moodle, Microsoft Office, Google Docs) amb arquitectura modular i escalable.",
        en: "Built the cross-platform MathType SDK and integrations for leading editors (CKEditor, TinyMCE, Froala, Moodle, Microsoft Office, Google Docs) with a modular, scalable architecture.",
      },
      highlights: {
        es: [
          "Diseñé el SDK de integraciones de MathType con arquitectura modular, mejorando escalabilidad",
          "Optimicé integraciones reduciendo tiempos de carga hasta un 30%",
          "Impulsé la adopción de TypeScript y Deno en el equipo",
          "Implementé soluciones cross-platform y multilenguaje",
        ],
        ca: [
          "Vaig dissenyar el SDK d'integracions de MathType amb arquitectura modular, millorant l'escalabilitat",
          "Vaig optimitzar integracions reduint temps de càrrega fins a un 30%",
          "Vaig impulsar l'adopció de TypeScript i Deno a l'equip",
          "Vaig implementar solucions cross-platform i multillenguatge",
        ],
        en: [
          "Designed the MathType integrations SDK with a modular architecture, improving scalability",
          "Optimized integrations cutting load times by up to 30%",
          "Pushed TypeScript and Deno adoption across the team",
          "Implemented cross-platform, multi-language integration solutions",
        ],
      },
      technologies:
        "TypeScript, JavaScript, Deno, Vue.js, CKEditor, TinyMCE, Froala, Moodle, MS Office & Google Docs APIs",
      location: { es: "Barcelona, España", ca: "Barcelona, Espanya", en: "Barcelona, Spain" },
      modality: { es: "Híbrido", ca: "Híbrid", en: "Hybrid" },
    },
    {
      name: "Rotrafu",
      position: {
        es: "Desarrollador Full-Stack · Responsable IT",
        ca: "Desenvolupador Full-Stack · Responsable IT",
        en: "Full-Stack Developer · IT Lead",
      },
      url: "https://www.rotrafu.net/",
      startDate: "2020-06-01",
      endDate: "2024-03-01",
      summary: {
        es: "Responsable IT y full-stack del diseño, desarrollo y mantenimiento de aplicaciones web para la gestión integral de trámites funerarios. Lideré la transformación digital con soluciones a medida en PHP/Laravel.",
        ca: "Responsable IT i full-stack del disseny, desenvolupament i manteniment d'aplicacions web per a la gestió integral de tràmits funeraris. Vaig liderar la transformació digital amb solucions a mida en PHP/Laravel.",
        en: "IT lead and full-stack engineer in charge of designing, building and maintaining web applications for end-to-end funeral paperwork management. Led the company's digital transformation with custom PHP/Laravel solutions.",
      },
      highlights: {
        es: [
          "Escalé la aplicación principal hasta más de 50.000 servicios activos sin interrupciones",
          "Reduje tiempos de carga un 35% optimizando arquitectura y consultas",
          "Desarrollé ROTRAFU 2.0: rediseño completo (UX, escalabilidad, seguridad)",
          "Automaticé procesos internos mejorando la eficiencia operativa un 50%",
          "Reduje vulnerabilidades de seguridad un 40%",
        ],
        ca: [
          "Vaig escalar l'aplicació principal fins a més de 50.000 serveis actius sense interrupcions",
          "Vaig reduir temps de càrrega un 35% optimitzant arquitectura i consultes",
          "Vaig desenvolupar ROTRAFU 2.0: redisseny complet (UX, escalabilitat, seguretat)",
          "Vaig automatitzar processos interns millorant l'eficiència operativa un 50%",
          "Vaig reduir vulnerabilitats de seguretat un 40%",
        ],
        en: [
          "Scaled the main application to 50,000+ active services with zero downtime",
          "Cut load times by 35% via architecture and query optimization",
          "Built ROTRAFU 2.0: full redesign (UX, scalability, security)",
          "Automated internal processes, boosting operational efficiency by 50%",
          "Reduced security vulnerabilities by 40%",
        ],
      },
      technologies: "PHP, Laravel, MySQL, JavaScript, REST APIs, Git, Docker, Agile",
      location: {
        es: "Hospitalet de Llobregat, Barcelona",
        ca: "Hospitalet de Llobregat, Barcelona",
        en: "Hospitalet de Llobregat, Barcelona",
      },
      modality: { es: "Remoto", ca: "Remot", en: "Remote" },
    },
    {
      name: "Prime IT",
      position: {
        es: "Desarrollador Full-Stack · Consultoría",
        ca: "Desenvolupador Full-Stack · Consultoria",
        en: "Full-Stack Developer · Consulting",
      },
      url: "https://www.primeit.es",
      startDate: "2023-06-01",
      endDate: "2023-12-01",
      summary: {
        es: "Consultor de software especializado en PHP. Proyectos de diversos sectores aplicando arquitecturas escalables y buenas prácticas.",
        ca: "Consultor de programari especialitzat en PHP. Projectes de diversos sectors aplicant arquitectures escalables i bones pràctiques.",
        en: "PHP software consultant. Projects across multiple sectors applying scalable architectures and best practices.",
      },
      highlights: {
        es: [
          "Mentoría a desarrolladores junior en patrones y buenas prácticas",
          "APIs RESTful robustas y escalables",
          "Metodologías ágiles (Scrum) en equipos multidisciplinarios",
        ],
        ca: [
          "Mentoria a desenvolupadors júnior en patrons i bones pràctiques",
          "APIs RESTful robustes i escalables",
          "Metodologies àgils (Scrum) en equips multidisciplinaris",
        ],
        en: [
          "Mentored junior developers on patterns and best practices",
          "Robust, scalable RESTful APIs",
          "Scrum and agile in cross-functional teams",
        ],
      },
      technologies: "PHP, Laravel, REST APIs, MySQL, Git, Docker, Scrum",
      location: { es: "Barcelona, España", ca: "Barcelona, Espanya", en: "Barcelona, Spain" },
      modality: { es: "Remoto", ca: "Remot", en: "Remote" },
    },
  ] satisfies WorkItem[],
  // Internships, dual training and early career placements, newest first.
  trainee: [
    {
      name: "iThinkUPC",
      position: {
        es: "Desarrollador Full-Stack · Prácticas (Moodle)",
        ca: "Desenvolupador Full-Stack · Pràctiques (Moodle)",
        en: "Full-Stack Developer · Internship (Moodle)",
      },
      url: "https://www.thinkupc.com/en/",
      startDate: "2023-03-01",
      endDate: "2023-06-01",
      summary: {
        es: "Desarrollador PHP en equipo de 13 personas. Funcionalidades para Atenea (plataforma UPC basada en Moodle).",
        ca: "Desenvolupador PHP en equip de 13 persones. Funcionalitats per a Atenea (plataforma UPC basada en Moodle).",
        en: "PHP developer in a 13-person team. Features for Atenea (UPC's Moodle-based LMS).",
      },
      highlights: {
        es: [
          "Funcionalidades clave en Atenea/Moodle",
          "Resolución de tickets y soporte",
          "Trabajo ágil en equipo multidisciplinario",
        ],
        ca: [
          "Funcionalitats clau a Atenea/Moodle",
          "Resolució de tiquets i suport",
          "Treball àgil en equip multidisciplinari",
        ],
        en: [
          "Key features on Atenea/Moodle",
          "Ticket resolution and support",
          "Agile work in a cross-functional team",
        ],
      },
      technologies: "PHP, Moodle, MySQL, REST APIs, Git",
      location: { es: "Barcelona, España", ca: "Barcelona, Espanya", en: "Barcelona, Spain" },
      modality: { es: "Híbrido", ca: "Híbrid", en: "Hybrid" },
    },
    {
      name: "XMI Tech",
      position: {
        es: "Desarrollador Full-Stack · Formación Dual",
        ca: "Desenvolupador Full-Stack · Formació Dual",
        en: "Full-Stack Developer · Dual Training",
      },
      url: "https://xmitech.com/",
      startDate: "2020-09-01",
      endDate: "2021-06-01",
      summary: {
        es: "Aplicaciones web en los sectores médico y contable con CodeIgniter 3 y Laravel.",
        ca: "Aplicacions web als sectors mèdic i comptable amb CodeIgniter 3 i Laravel.",
        en: "Medical and accounting web applications with CodeIgniter 3 and Laravel.",
      },
      highlights: {
        es: ["Apps con CodeIgniter 3 y Laravel", "MVC en proyectos empresariales", "Git y Docker"],
        ca: ["Apps amb CodeIgniter 3 i Laravel", "MVC en projectes empresarials", "Git i Docker"],
        en: ["Apps with CodeIgniter 3 and Laravel", "MVC in enterprise projects", "Git and Docker"],
      },
      technologies: "PHP, CodeIgniter, Laravel, MySQL, JavaScript, Docker",
      location: { es: "Barcelona, España", ca: "Barcelona, Espanya", en: "Barcelona, Spain" },
      modality: { es: "Remoto", ca: "Remot", en: "Remote" },
    },
    {
      name: "ITPro / ECTARC (Erasmus+)",
      position: {
        es: "Software Developer · Administración de Redes",
        ca: "Software Developer · Administració de Xarxes",
        en: "Software Developer · Network Administration",
      },
      url: "https://ectarc.com/",
      startDate: "2019-05-01",
      endDate: "2019-07-01",
      summary: {
        es: "Experiencia internacional en Reino Unido (Erasmus+). App de gestión de incidencias en C# y administración de red.",
        ca: "Experiència internacional al Regne Unit (Erasmus+). App de gestió d'incidències en C# i administració de xarxa.",
        en: "International experience in the UK (Erasmus+). Incident-management app in C# and network admin.",
      },
      highlights: {
        es: [
          "App C# Windows Forms",
          "Configuración de infraestructura de red",
          "Equipo multicultural",
        ],
        ca: [
          "App C# Windows Forms",
          "Configuració d'infraestructura de xarxa",
          "Equip multicultural",
        ],
        en: ["C# Windows Forms app", "Network infrastructure setup", "Multicultural team"],
      },
      technologies: "C#, .NET, Networking",
      location: {
        es: "Llangollen, Reino Unido",
        ca: "Llangollen, Regne Unit",
        en: "Llangollen, United Kingdom",
      },
      modality: { es: "Presencial", ca: "Presencial", en: "On-site" },
    },
  ] satisfies WorkItem[],
  // Representative shipped products/projects. These are business CV content, not UI cards.
  projects: [
    {
      name: "Nubric (Learning Lemur)",
      url: "https://www.wiris.com/en/nubric/",
      active: true,
      description: {
        es: "Plataforma de assessment matemático en Laravel: creación y autocorrección de ejercicios con MathType embebido.",
        ca: "Plataforma d'assessment matemàtic en Laravel: creació i autocorrecció d'exercicis amb MathType embegut.",
        en: "Math assessment platform in Laravel: build and auto-grade exercises with embedded MathType.",
      },
      highlights: {
        es: ["PHP/Laravel", "Assessment matemático", "Equipo de producto en Wiris"],
        ca: ["PHP/Laravel", "Assessment matemàtic", "Equip de producte a Wiris"],
        en: ["PHP/Laravel", "Math assessment", "Wiris product team"],
      },
      startDate: "2025-04-10",
      endDate: null,
    },
    {
      name: "MathType Integrations SDK",
      url: "https://www.wiris.com/en/solutions/integrations/",
      active: true,
      description: {
        es: "SDK multiplataforma para integrar MathType en editores. Arquitectura hexagonal y TypeScript.",
        ca: "SDK multiplataforma per integrar MathType en editors. Arquitectura hexagonal i TypeScript.",
        en: "Cross-platform SDK to integrate MathType into editors. Hexagonal architecture and TypeScript.",
      },
      highlights: {
        es: ["TypeScript", "Arquitectura Hexagonal", "Multi-editor"],
        ca: ["TypeScript", "Arquitectura Hexagonal", "Multi-editor"],
        en: ["TypeScript", "Hexagonal Architecture", "Multi-editor"],
      },
      startDate: "2024-03-01",
      endDate: "2025-04-09",
    },
    {
      name: "MathType Add-in for Microsoft Office",
      url: "https://www.wiris.com/en/mathtype/office-tools/",
      active: true,
      description: {
        es: "Add-in para Word y PowerPoint usando APIs de Office y el SDK de MathType, con Vue.js.",
        ca: "Add-in per a Word i PowerPoint usant APIs d'Office i el SDK de MathType, amb Vue.js.",
        en: "Add-in for Word and PowerPoint using Office APIs and the MathType SDK, built with Vue.js.",
      },
      highlights: {
        es: ["Office APIs", "Vue.js", "SDK MathType"],
        ca: ["Office APIs", "Vue.js", "SDK MathType"],
        en: ["Office APIs", "Vue.js", "MathType SDK"],
      },
      startDate: "2024-06-01",
      endDate: "2025-04-09",
    },
    {
      name: "ROTRAFU 2.0",
      url: "https://www.rotrafu.net/",
      active: true,
      description: {
        es: "Rediseño completo de la app de gestión funeraria en Laravel: UX, escalabilidad y seguridad. +50.000 servicios.",
        ca: "Redisseny complet de l'app de gestió funerària en Laravel: UX, escalabilitat i seguretat. +50.000 serveis.",
        en: "Complete rebuild of the funeral-management app in Laravel: UX, scalability and security. 50,000+ services.",
      },
      highlights: {
        es: ["Laravel", "50.000+ servicios", "En producción"],
        ca: ["Laravel", "50.000+ serveis", "En producció"],
        en: ["Laravel", "50,000+ services", "In production"],
      },
      startDate: "2020-06-01",
      endDate: "2024-03-01",
    },
  ] satisfies ProjectItem[],
  // Formal education and training, newest first.
  education: [
    {
      institution: "Universitat Oberta de Catalunya",
      area: {
        es: "Ingeniería de Software",
        ca: "Enginyeria del Programari",
        en: "Software Engineering",
      },
      studyType: {
        es: "Grado en Ingeniería Informática",
        ca: "Grau en Enginyeria Informàtica",
        en: "BSc in Computer Engineering",
      },
      startDate: "2020-01-01",
      endDate: "2025-06-01",
      summary: {
        es: "Especialización en Ingeniería de Software: arquitecturas escalables, patrones, metodologías ágiles, full-stack.",
        ca: "Especialització en Enginyeria del Programari: arquitectures escalables, patrons, metodologies àgils, full-stack.",
        en: "Software Engineering specialization: scalable architectures, design patterns, agile, full-stack.",
      },
    },
    {
      institution: "INS La Pineda",
      area: {
        es: "Desarrollo de Aplicaciones Web",
        ca: "Desenvolupament d'Aplicacions Web",
        en: "Web Application Development",
      },
      studyType: {
        es: "CFGS DAW (Dual)",
        ca: "CFGS DAW (Dual)",
        en: "Higher Vocational Degree (Dual)",
      },
      startDate: "2019-09-01",
      endDate: "2021-06-01",
      summary: {
        es: "Formación dual con experiencia en empresa. Frameworks PHP y JavaScript modernos.",
        ca: "Formació dual amb experiència a empresa. Frameworks PHP i JavaScript moderns.",
        en: "Dual program with on-the-job experience. Modern PHP and JS frameworks.",
      },
    },
    {
      institution: "IES La Pineda",
      area: {
        es: "Administración de Sistemas Informáticos en Red",
        ca: "Administració de Sistemes Informàtics en Xarxa",
        en: "Network Systems Administration",
      },
      studyType: { es: "CFGS ASIR", ca: "CFGS ASIR", en: "Higher Vocational Degree" },
      startDate: "2016-09-01",
      endDate: "2018-06-01",
      summary: {
        es: "Sistemas, redes, servidores, virtualización, DevOps.",
        ca: "Sistemes, xarxes, servidors, virtualització, DevOps.",
        en: "Systems, networking, servers, virtualization, DevOps.",
      },
    },
  ] satisfies EducationItem[],
  // Skills taxonomy used by the homepage, skills page and printable CV.
  skills: {
    // Primary stack shown on the homepage and skills page callout.
    primaryStack: {
      backend: ["PHP", "Laravel"],
      frontend: ["TypeScript", "Vue"],
    },
    // Programming and markup languages.
    languages: ["TypeScript", "JavaScript", "PHP", "SQL", "HTML", "CSS"],
    // Frameworks, runtimes and frontend/backend libraries.
    frameworks: [
      "Laravel",
      "Vue.js",
      "Node.js",
      "Deno",
      "CodeIgniter",
      "Angular",
      "Electron",
      "Tailwind CSS",
    ],
    // Databases and persistence technologies.
    databases: ["MySQL", "MongoDB"],
    // Engineering practices and architecture keywords.
    practices: [
      "Arquitectura Hexagonal",
      "DDD",
      "TDD",
      "SOLID",
      "Clean Code",
      "Refactoring",
      "Testing",
    ],
    // Tools, platforms and delivery practices.
    tooling: ["Git", "GitHub Actions", "Docker", "Linux", "Vite", "CI/CD"],
    // Product integrations, platforms and domains.
    integrations: [
      "MathType",
      "Moodle",
      "CKEditor",
      "TinyMCE",
      "Froala",
      "MS Office",
      "Google Docs",
    ],
    // Hero ribbon keywords. Keep short because they scroll horizontally.
    ribbon: [
      "PHP",
      "Laravel",
      "TypeScript",
      "Vue.js",
      "Deno",
      "Node.js",
      "Docker",
      "MySQL",
      "MongoDB",
      "Git",
      "GitHub Actions",
      "Vite",
      "Tailwind",
      "Edtech",
      "MathType",
      "Moodle",
      "AI",
      "MCP",
    ],
  },
  // Spoken languages and proficiency levels.
  languages: [
    {
      code: "es",
      name: { es: "Español", ca: "Espanyol", en: "Spanish" },
      level: { es: "Nativo", ca: "Natiu", en: "Native" },
    },
    {
      code: "ca",
      name: { es: "Catalán", ca: "Català", en: "Catalan" },
      level: { es: "Nativo", ca: "Natiu", en: "Native" },
    },
    {
      code: "en",
      name: { es: "Inglés", ca: "Anglès", en: "English" },
      level: { es: "Avanzado (B2)", ca: "Avançat (B2)", en: "Advanced (B2)" },
    },
  ] satisfies LanguageItem[],
} as const;

export function pick<T extends LocalizedString | LocalizedList>(
  field: T,
  lang: Lang,
): T extends LocalizedList ? string[] : string {
  // @ts-expect-error narrowed at runtime
  return field[lang];
}
