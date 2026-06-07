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
  code: Lang;
  name: LocalizedString;
  level: LocalizedString;
}

export interface WorkItem {
  name: string;
  position: LocalizedString;
  url?: string;
  startDate: string;
  endDate: string | null;
  summary: LocalizedString;
  highlights: LocalizedList;
  technologies: string;
  location: LocalizedString;
  modality: LocalizedString;
  current?: boolean;
}

export interface ProjectItem {
  name: string;
  url?: string;
  description: LocalizedString;
  highlights: LocalizedList;
  startDate: string;
  endDate: string | null;
  active: boolean;
}

export interface EducationItem {
  institution: string;
  area: LocalizedString;
  studyType: LocalizedString;
  startDate: string;
  endDate: string;
  summary: LocalizedString;
}

export const cv = {
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
      es: "Ingeniero full-stack con 6+ años construyendo producto escalable. En Wiris desarrollo integraciones MathType y la plataforma Nubric; antes lideré la transformación digital en Rotrafu (+50K servicios, −35% load time).",
      ca: "Enginyer full-stack amb més de 6 anys construint producte escalable. A Wiris desenvolupo integracions MathType i la plataforma Nubric; abans vaig liderar la transformació digital a Rotrafu (+50K serveis, −35% temps de càrrega).",
      en: "Full-stack engineer with 6+ years shipping scalable product. At Wiris I build MathType integrations and the Nubric platform; previously I led digital transformation at Rotrafu (50K+ services, −35% load time).",
    } satisfies LocalizedString,
    summary: {
      es: "Ingeniero de Software Full-Stack con 6+ años de experiencia en producto. Especializado en TypeScript/JavaScript y PHP/Laravel, con foco en arquitectura mantenible (hexagonal, DDD, SOLID), calidad de código y rendimiento. En Wiris desarrollo el SDK multiplataforma de MathType para editores líderes (CKEditor, TinyMCE, Froala, Moodle, Office, Google Docs) y Nubric, plataforma de assessment matemático en Laravel. En Rotrafu escalé la aplicación principal a más de 50.000 servicios activos, reduje tiempos de carga un 35% y lideré ROTRAFU 2.0.",
      ca: "Enginyer de Programari Full-Stack amb més de 6 anys d'experiència en producte. Especialitzat en TypeScript/JavaScript i PHP/Laravel, amb focus en arquitectura mantenible (hexagonal, DDD, SOLID), qualitat de codi i rendiment. A Wiris desenvolupo el SDK multiplataforma de MathType per a editors líders (CKEditor, TinyMCE, Froala, Moodle, Office, Google Docs) i Nubric, plataforma d'assessment matemàtic en Laravel. A Rotrafu vaig escalar l'aplicació principal a més de 50.000 serveis actius, vaig reduir temps de càrrega un 35% i vaig liderar ROTRAFU 2.0.",
      en: "Full-Stack Software Engineer with 6+ years of product experience. Specialized in TypeScript/JavaScript and PHP/Laravel, focused on maintainable architecture (hexagonal, DDD, SOLID), code quality and performance. At Wiris I build the cross-platform MathType SDK for leading editors (CKEditor, TinyMCE, Froala, Moodle, Office, Google Docs) and Nubric, a math assessment platform in Laravel. At Rotrafu I scaled the main application to 50,000+ active services, cut load times by 35% and led ROTRAFU 2.0.",
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
  work: [
    {
      name: "Wiris",
      position: {
        es: "Ingeniero de Software · MathType SDK & Assessment (Nubric)",
        ca: "Enginyer de Programari · MathType SDK & Assessment (Nubric)",
        en: "Software Engineer · MathType SDK & Assessment (Nubric)",
      },
      url: "https://www.wiris.com/",
      startDate: "2024-03-10",
      endDate: null,
      current: true,
      summary: {
        es: "Desarrollo de producto en dos frentes: el SDK multiplataforma de MathType e integraciones para editores líderes (CKEditor, TinyMCE, Froala, Moodle, Microsoft Office, Google Docs), y Nubric (antes Learning Lemur), plataforma de assessment matemático en PHP/Laravel usada por instituciones educativas.",
        ca: "Desenvolupament de producte en dos fronts: el SDK multiplataforma de MathType i integracions per a editors líders (CKEditor, TinyMCE, Froala, Moodle, Microsoft Office, Google Docs), i Nubric (abans Learning Lemur), plataforma d'assessment matemàtic en PHP/Laravel usada per institucions educatives.",
        en: "Product engineering on two tracks: the cross-platform MathType SDK and integrations for leading editors (CKEditor, TinyMCE, Froala, Moodle, Microsoft Office, Google Docs), and Nubric (formerly Learning Lemur), a PHP/Laravel math assessment platform used by educational institutions.",
      },
      highlights: {
        es: [
          "Diseñé el SDK de integraciones de MathType con arquitectura modular y hexagonal, mejorando escalabilidad y mantenibilidad",
          "Optimicé integraciones reduciendo tiempos de carga hasta un 30% en editores de producción",
          "Impulsé la adopción de TypeScript y Deno en el equipo de Integraciones",
          "Desarrollo funcionalidades de evaluación matemática en Nubric (Laravel) con foco en exactitud y rendimiento",
          "Lideré refactors de arquitectura sobre el código heredado de Learning Lemur",
          "Colaboración cross-funcional con producto, diseño y QA en equipos especializados en edtech",
        ],
        ca: [
          "Vaig dissenyar el SDK d'integracions de MathType amb arquitectura modular i hexagonal, millorant l'escalabilitat i la mantenibilitat",
          "Vaig optimitzar integracions reduint temps de càrrega fins a un 30% en editors en producció",
          "Vaig impulsar l'adopció de TypeScript i Deno a l'equip d'Integracions",
          "Desenvolupament de funcionalitats d'avaluació matemàtica a Nubric (Laravel) amb focus en exactitud i rendiment",
          "Vaig liderar refactors d'arquitectura sobre el codi heretat de Learning Lemur",
          "Col·laboració cross-funcional amb producte, disseny i QA en equips especialitzats en edtech",
        ],
        en: [
          "Designed the MathType integrations SDK with modular hexagonal architecture, improving scalability and maintainability",
          "Optimized production editor integrations, cutting load times by up to 30%",
          "Drove TypeScript and Deno adoption on the Integrations team",
          "Build math assessment features on Nubric (Laravel) with a focus on correctness and performance",
          "Led architecture refactors over the legacy Learning Lemur codebase",
          "Cross-functional collaboration with product, design and QA in edtech-focused teams",
        ],
      },
      technologies:
        "TypeScript, JavaScript, Deno, PHP, Laravel, Vue.js, CKEditor, TinyMCE, Froala, Moodle, MS Office & Google Docs APIs, Docker, Git",
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
        es: "Responsable IT y full-stack del diseño, desarrollo y mantenimiento de aplicaciones web para la gestión integral de trámites funerarios. Lideré la transformación digital con soluciones a medida en PHP/Laravel, en paralelo con consultoría en Prime IT (jun–dic 2023).",
        ca: "Responsable IT i full-stack del disseny, desenvolupament i manteniment d'aplicacions web per a la gestió integral de tràmits funeraris. Vaig liderar la transformació digital amb solucions a mida en PHP/Laravel, en paral·lel amb consultoria a Prime IT (juny–des. 2023).",
        en: "IT lead and full-stack engineer designing, building and maintaining web applications for end-to-end funeral paperwork management. Led the company's digital transformation with custom PHP/Laravel solutions, in parallel with consulting at Prime IT (Jun–Dec 2023).",
      },
      highlights: {
        es: [
          "Escalé la aplicación principal hasta más de 50.000 servicios activos sin interrupciones",
          "Reduje tiempos de carga un 35% optimizando arquitectura y consultas a base de datos",
          "Desarrollé ROTRAFU 2.0: rediseño completo mejorando UX, escalabilidad y seguridad",
          "Automaticé procesos internos mejorando la eficiencia operativa un 50%",
          "Reduje vulnerabilidades de seguridad un 40% mediante hardening y buenas prácticas",
        ],
        ca: [
          "Vaig escalar l'aplicació principal fins a més de 50.000 serveis actius sense interrupcions",
          "Vaig reduir temps de càrrega un 35% optimitzant arquitectura i consultes a base de dades",
          "Vaig desenvolupar ROTRAFU 2.0: redisseny complet millorant UX, escalabilitat i seguretat",
          "Vaig automatitzar processos interns millorant l'eficiència operativa un 50%",
          "Vaig reduir vulnerabilitats de seguretat un 40% mitjançant hardening i bones pràctiques",
        ],
        en: [
          "Scaled the main application to 50,000+ active services with zero downtime",
          "Cut load times by 35% through architecture and database query optimization",
          "Built ROTRAFU 2.0: full redesign improving UX, scalability and security",
          "Automated internal processes, boosting operational efficiency by 50%",
          "Reduced security vulnerabilities by 40% through hardening and best practices",
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
        es: "Desarrollador Full-Stack Senior · Consultoría PHP",
        ca: "Desenvolupador Full-Stack Sènior · Consultoria PHP",
        en: "Senior Full-Stack Developer · PHP Consulting",
      },
      url: "https://www.primeit.es",
      startDate: "2023-06-01",
      endDate: "2023-12-01",
      summary: {
        es: "Consultor senior PHP en plantilla, desarrollando soluciones para clientes de distintos sectores mientras mantenía el rol en Rotrafu. Apliqué arquitecturas escalables, SOLID y metodologías ágiles en equipos multidisciplinarios.",
        ca: "Consultor sènior PHP en plantilla, desenvolupant solucions per a clients de diversos sectors mentre mantenia el rol a Rotrafu. Vaig aplicar arquitectures escalables, SOLID i metodologies àgils en equips multidisciplinaris.",
        en: "Senior PHP consultant on staff, delivering solutions for clients across sectors while maintaining my role at Rotrafu. Applied scalable architectures, SOLID and agile methods in cross-functional teams.",
      },
      highlights: {
        es: [
          "Mentoricé a desarrolladores junior en patrones de diseño y buenas prácticas de código",
          "Implementé APIs RESTful robustas siguiendo principios SOLID y Clean Code",
          "Participé en equipos Scrum multidisciplinarios con revisiones de código y entrega continua",
        ],
        ca: [
          "Vaig fer mentoria a desenvolupadors júnior en patrons de disseny i bones pràctiques de codi",
          "Vaig implementar APIs RESTful robustes seguint principis SOLID i Clean Code",
          "Vaig participar en equips Scrum multidisciplinaris amb revisions de codi i entrega contínua",
        ],
        en: [
          "Mentored junior developers on design patterns and coding best practices",
          "Built robust RESTful APIs following SOLID and Clean Code principles",
          "Worked in multidisciplinary Scrum teams with code review and continuous delivery",
        ],
      },
      technologies: "PHP, Laravel, REST APIs, MySQL, Git, Docker, Scrum",
      location: { es: "Barcelona, España", ca: "Barcelona, Espanya", en: "Barcelona, Spain" },
      modality: { es: "Remoto", ca: "Remot", en: "Remote" },
    },
  ] satisfies WorkItem[],
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
        es: "Desarrollador PHP en un equipo de 13 personas, construyendo funcionalidades para Atenea (plataforma UPC basada en Moodle) y resolviendo tickets en el ámbito educativo.",
        ca: "Desenvolupador PHP en un equip de 13 persones, construint funcionalitats per a Atenea (plataforma UPC basada en Moodle) i resolent tiquets en l'àmbit educatiu.",
        en: "PHP developer on a 13-person team, shipping features for Atenea (UPC's Moodle-based LMS) and resolving tickets in the education domain.",
      },
      highlights: {
        es: [
          "Desarrollé funcionalidades clave en Atenea/Moodle mejorando la experiencia de usuario",
          "Resolví incidencias técnicas y tickets de soporte en un entorno ágil",
          "Colaboré con un equipo multidisciplinario de 13 personas en soluciones edtech",
        ],
        ca: [
          "Vaig desenvolupar funcionalitats clau a Atenea/Moodle millorant l'experiència d'usuari",
          "Vaig resoldre incidències tècniques i tiquets de suport en un entorn àgil",
          "Vaig col·laborar amb un equip multidisciplinari de 13 persones en solucions edtech",
        ],
        en: [
          "Shipped key features on Atenea/Moodle, improving user experience",
          "Resolved technical incidents and support tickets in an agile environment",
          "Collaborated with a 13-person cross-functional team on edtech solutions",
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
        es: "Desarrollo full-stack de aplicaciones web en los sectores médico y contable como parte del CFGS DAW dual, usando CodeIgniter 3 y Laravel.",
        ca: "Desenvolupament full-stack d'aplicacions web als sectors mèdic i comptable com a part del CFGS DAW dual, usant CodeIgniter 3 i Laravel.",
        en: "Full-stack development of medical and accounting web applications as part of the dual vocational program, using CodeIgniter 3 and Laravel.",
      },
      highlights: {
        es: [
          "Construí aplicaciones médicas y contables con CodeIgniter 3 y Laravel en producción",
          "Implementé arquitectura MVC en proyectos de gestión empresarial con bases de datos complejas",
          "Trabajé con Git y Docker en un entorno de desarrollo profesional remoto",
        ],
        ca: [
          "Vaig construir aplicacions mèdiques i comptables amb CodeIgniter 3 i Laravel en producció",
          "Vaig implementar arquitectura MVC en projectes de gestió empresarial amb bases de dades complexes",
          "Vaig treballar amb Git i Docker en un entorn de desenvolupament professional remot",
        ],
        en: [
          "Built medical and accounting applications with CodeIgniter 3 and Laravel",
          "Implemented MVC architecture in business management projects with complex databases",
          "Worked with Git and Docker in a professional remote development environment",
        ],
      },
      technologies: "PHP, CodeIgniter, Laravel, MySQL, JavaScript, Docker",
      location: { es: "Barcelona, España", ca: "Barcelona, Espanya", en: "Barcelona, Spain" },
      modality: { es: "Remoto", ca: "Remot", en: "Remote" },
    },
    {
      name: "AMVARA",
      position: {
        es: "Desarrollador Full-Stack · Prácticas",
        ca: "Desenvolupador Full-Stack · Pràctiques",
        en: "Full-Stack Developer · Internship",
      },
      url: "https://www.amvara.consulting/",
      startDate: "2019-08-01",
      endDate: "2019-08-31",
      summary: {
        es: "Desarrollador full-stack en consultoría para el sector automovilístico: web corporativa cometa.amvara.consulting y corrección de tests automatizados en co.meta (mix.amvara.de).",
        ca: "Desenvolupador full-stack en consultoria per al sector automobilístic: web corporativa cometa.amvara.consulting i correcció de tests automatitzats a co.meta (mix.amvara.de).",
        en: "Full-stack developer in consulting for the automotive sector: corporate site cometa.amvara.consulting and automated test fixes on co.meta (mix.amvara.de).",
      },
      highlights: {
        es: [
          "Desarrollé la web corporativa cometa.amvara.consulting para clientes del sector automoción",
          "Corregí tests automatizados en co.meta para mix.amvara.de",
          "Trabajé en un entorno de consultoría con Git y despliegue con Docker",
        ],
        ca: [
          "Vaig desenvolupar la web corporativa cometa.amvara.consulting per a clients del sector automoció",
          "Vaig corregir tests automatitzats a co.meta per a mix.amvara.de",
          "Vaig treballar en un entorn de consultoria amb Git i desplegament amb Docker",
        ],
        en: [
          "Built the corporate website cometa.amvara.consulting for automotive sector clients",
          "Fixed automated tests on co.meta for mix.amvara.de",
          "Worked in a consulting environment with Git and Docker deployment",
        ],
      },
      technologies: "PHP, JavaScript, HTML/CSS, Git, Docker",
      location: {
        es: "El Masnou, Barcelona",
        ca: "El Masnou, Barcelona",
        en: "El Masnou, Barcelona",
      },
      modality: { es: "Presencial", ca: "Presencial", en: "On-site" },
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
        es: "Experiencia internacional en Reino Unido (Erasmus+): aplicación de gestión de incidencias en C# y administración de infraestructura de red para ECTARC.",
        ca: "Experiència internacional al Regne Unit (Erasmus+): aplicació de gestió d'incidències en C# i administració d'infraestructura de xarxa per a ECTARC.",
        en: "International experience in the UK (Erasmus+): incident-management application in C# and network infrastructure administration for ECTARC.",
      },
      highlights: {
        es: [
          "Desarrollé una app de control de incidencias en C# con interfaz Windows Forms",
          "Configuré infraestructura de red y soluciones de conectividad para ECTARC",
          "Trabajé en un equipo multicultural en un entorno internacional",
        ],
        ca: [
          "Vaig desenvolupar una app de control d'incidències en C# amb interfície Windows Forms",
          "Vaig configurar infraestructura de xarxa i solucions de connectivitat per a ECTARC",
          "Vaig treballar en un equip multicultural en un entorn internacional",
        ],
        en: [
          "Built an incident-tracking app in C# with a Windows Forms interface",
          "Configured network infrastructure and connectivity solutions for ECTARC",
          "Worked in a multicultural team in an international setting",
        ],
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
  projects: [
    {
      name: "Nubric (Learning Lemur)",
      url: "https://www.wiris.com/en/nubric/",
      active: true,
      description: {
        es: "Plataforma de assessment matemático en Laravel: creación, autocorrección y reglas programables de ejercicios con MathType integrado, usada por instituciones educativas.",
        ca: "Plataforma d'assessment matemàtic en Laravel: creació, autocorrecció i regles programables d'exercicis amb MathType integrat, usada per institucions educatives.",
        en: "Math assessment platform in Laravel: create, auto-grade and programmatically rule exercises with embedded MathType, used by educational institutions.",
      },
      highlights: {
        es: ["PHP/Laravel", "Assessment matemático", "Producto Wiris"],
        ca: ["PHP/Laravel", "Assessment matemàtic", "Producte Wiris"],
        en: ["PHP/Laravel", "Math assessment", "Wiris product"],
      },
      startDate: "2024-03-10",
      endDate: null,
    },
    {
      name: "MathType Integrations SDK",
      url: "https://www.wiris.com/en/solutions/integrations/",
      active: true,
      description: {
        es: "SDK multiplataforma para integrar MathType en CKEditor, TinyMCE, Froala, Moodle, Office y Google Docs. Arquitectura hexagonal en TypeScript/Deno con −30% load time en integraciones optimizadas.",
        ca: "SDK multiplataforma per integrar MathType a CKEditor, TinyMCE, Froala, Moodle, Office i Google Docs. Arquitectura hexagonal en TypeScript/Deno amb −30% temps de càrrega en integracions optimitzades.",
        en: "Cross-platform SDK to embed MathType in CKEditor, TinyMCE, Froala, Moodle, Office and Google Docs. Hexagonal TypeScript/Deno architecture with up to 30% load-time reduction on optimized integrations.",
      },
      highlights: {
        es: ["TypeScript/Deno", "Arquitectura hexagonal", "Multi-editor"],
        ca: ["TypeScript/Deno", "Arquitectura hexagonal", "Multi-editor"],
        en: ["TypeScript/Deno", "Hexagonal architecture", "Multi-editor"],
      },
      startDate: "2024-03-10",
      endDate: null,
    },
    {
      name: "MathType Add-in for Microsoft Office",
      url: "https://www.wiris.com/en/mathtype/office-tools/",
      active: true,
      description: {
        es: "Add-in para Word y PowerPoint usando Office APIs y el SDK de MathType, construido con Vue.js como parte del ecosistema de integraciones Wiris.",
        ca: "Add-in per a Word i PowerPoint usant Office APIs i el SDK de MathType, construït amb Vue.js com a part de l'ecosistema d'integracions Wiris.",
        en: "Add-in for Word and PowerPoint using Office APIs and the MathType SDK, built with Vue.js as part of the Wiris integrations ecosystem.",
      },
      highlights: {
        es: ["Office APIs", "Vue.js", "SDK MathType"],
        ca: ["Office APIs", "Vue.js", "SDK MathType"],
        en: ["Office APIs", "Vue.js", "MathType SDK"],
      },
      startDate: "2024-06-01",
      endDate: null,
    },
    {
      name: "ROTRAFU 2.0",
      url: "https://www.rotrafu.net/",
      active: true,
      description: {
        es: "Rediseño completo de la app de gestión funeraria en Laravel: UX, escalabilidad y seguridad. +50.000 servicios activos y −35% load time.",
        ca: "Redisseny complet de l'app de gestió funerària en Laravel: UX, escalabilitat i seguretat. +50.000 serveis actius i −35% temps de càrrega.",
        en: "Complete rebuild of the funeral-management app in Laravel: UX, scalability and security. 50,000+ active services and −35% load time.",
      },
      highlights: {
        es: ["Laravel", "50.000+ servicios", "En producción"],
        ca: ["Laravel", "50.000+ serveis", "En producció"],
        en: ["Laravel", "50,000+ services", "In production"],
      },
      startDate: "2020-06-01",
      endDate: "2024-03-01",
    },
    {
      name: "iberent-FS-test",
      url: "https://github.com/Ubaldo-Santos/iberent-FS-test",
      active: false,
      description: {
        es: "Technical assessment full-stack: API y frontend para gestión de reservas. Proyecto de aprendizaje, no producto en producción.",
        ca: "Technical assessment full-stack: API i frontend per a gestió de reserves. Projecte d'aprenentatge, no producte en producció.",
        en: "Full-stack technical assessment: API and frontend for booking management. Learning project, not a production product.",
      },
      highlights: {
        es: ["Technical assessment", "Full-stack", "GitHub"],
        ca: ["Technical assessment", "Full-stack", "GitHub"],
        en: ["Technical assessment", "Full-stack", "GitHub"],
      },
      startDate: "2023-01-01",
      endDate: "2023-06-01",
    },
    {
      name: "HubOS-Tech-Test",
      url: "https://github.com/Ubaldo-Santos/HubOS-Tech-Test",
      active: false,
      description: {
        es: "Prueba técnica de arquitectura y desarrollo backend. Repositorio público de evaluación, no desplegado como servicio.",
        ca: "Prova tècnica d'arquitectura i desenvolupament backend. Repositori públic d'avaluació, no desplegat com a servei.",
        en: "Technical test for architecture and backend development. Public evaluation repo, not deployed as a service.",
      },
      highlights: {
        es: ["Technical assessment", "Backend", "GitHub"],
        ca: ["Technical assessment", "Backend", "GitHub"],
        en: ["Technical assessment", "Backend", "GitHub"],
      },
      startDate: "2022-01-01",
      endDate: "2022-06-01",
    },
    {
      name: "test-api-node",
      url: "https://github.com/Ubaldo-Santos/test-api-node",
      active: false,
      description: {
        es: "API REST con Node.js como ejercicio de aprendizaje y evaluación técnica. Código de referencia, no producto comercial.",
        ca: "API REST amb Node.js com a exercici d'aprenentatge i avaluació tècnica. Codi de referència, no producte comercial.",
        en: "REST API with Node.js as a learning exercise and technical evaluation. Reference code, not a commercial product.",
      },
      highlights: {
        es: ["Node.js", "REST API", "GitHub"],
        ca: ["Node.js", "REST API", "GitHub"],
        en: ["Node.js", "REST API", "GitHub"],
      },
      startDate: "2021-01-01",
      endDate: "2021-06-01",
    },
    {
      name: "M07-UF4-Practicas",
      url: "https://github.com/Ubaldo-Santos/M07-UF4-Practicas",
      active: false,
      description: {
        es: "Prácticas académicas del módulo M07 (Desarrollo web en entorno servidor). Proyecto formativo del CFGS DAW.",
        ca: "Pràctiques acadèmiques del mòdul M07 (Desenvolupament web en entorn servidor). Projecte formatiu del CFGS DAW.",
        en: "Academic practice for module M07 (Server-side web development). Vocational training project from the DAW program.",
      },
      highlights: {
        es: ["CFGS DAW", "PHP", "Aprendizaje"],
        ca: ["CFGS DAW", "PHP", "Aprenentatge"],
        en: ["DAW program", "PHP", "Learning"],
      },
      startDate: "2020-01-01",
      endDate: "2020-06-01",
    },
  ] satisfies ProjectItem[],
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
        es: "Especialización en Ingeniería de Software: arquitecturas escalables, patrones de diseño, metodologías ágiles y desarrollo full-stack aplicado a producto real.",
        ca: "Especialització en Enginyeria del Programari: arquitectures escalables, patrons de disseny, metodologies àgils i desenvolupament full-stack aplicat a producte real.",
        en: "Software Engineering specialization: scalable architectures, design patterns, agile methods and full-stack development applied to real product work.",
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
        es: "Formación dual con experiencia en empresa (XMI Tech). Frameworks PHP modernos, JavaScript y desarrollo full-stack con despliegue en entornos profesionales.",
        ca: "Formació dual amb experiència a empresa (XMI Tech). Frameworks PHP moderns, JavaScript i desenvolupament full-stack amb desplegament en entorns professionals.",
        en: "Dual program with on-the-job experience at XMI Tech. Modern PHP frameworks, JavaScript and full-stack development with professional deployment workflows.",
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
        es: "Sistemas, redes, servidores y virtualización. Base sólida en infraestructura IT que complementa el perfil full-stack y DevOps.",
        ca: "Sistemes, xarxes, servidors i virtualització. Base sòlida en infraestructura IT que complementa el perfil full-stack i DevOps.",
        en: "Systems, networking, servers and virtualization. Solid IT infrastructure foundation complementing a full-stack and DevOps profile.",
      },
    },
  ] satisfies EducationItem[],
  skills: {
    primaryStack: {
      backend: ["PHP", "Laravel"],
      frontend: ["TypeScript", "Vue"],
    },
    languages: ["TypeScript", "JavaScript", "PHP", "C#"],
    backend: ["Laravel", "Deno", "Node.js", "REST", "OpenAPI"],
    frontend: ["Vue.js", "HTML5", "CSS3", "Tailwind CSS"],
    edtech: ["MathType", "CKEditor", "TinyMCE", "Froala", "Moodle"],
    practices: [
      "Arquitectura Hexagonal",
      "DDD",
      "SOLID",
      "Design Patterns",
      "TDD",
    ],
    devops: [
      "Docker",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Unit Testing",
      "Integration Testing",
    ],
    other: ["Electron", "SDK Integrations", "Scrum", "Kanban"],
    ribbon: [
      "TypeScript",
      "PHP",
      "Laravel",
      "Vue.js",
      "Deno",
      "Node.js",
      "Docker",
      "Git",
      "MathType",
      "Moodle",
      "Tailwind",
      "Hexagonal",
      "TDD",
      "CI/CD",
      "OpenAPI",
      "Electron",
    ],
  },
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
