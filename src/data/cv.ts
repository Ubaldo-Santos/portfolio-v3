// Single source of truth for CV facts and all portfolio copy (narrative, SEO, page subtitles).
//
// This is intentionally a TypeScript "JSON-like" object instead of a .json file:
// - comments explain each field for humans and AI agents generating CV content;
// - TypeScript validates the shape at build time;
// - all translatable content uses { es, ca, en } so the same data powers every language.
//
// UI chrome only (nav labels, buttons, a11y, errors) lives in src/i18n/translations.ts.
// Use {{years}} where copy should reflect careerStartDate automatically (via withYears()).

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
  featured?: boolean;
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

export type CvMetaPage = "home" | "experience" | "projects" | "skills" | "contact" | "cv";

export interface MetaPageCopy {
  title: LocalizedString;
  description: LocalizedString;
  ogDescription: LocalizedString;
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
    /** First professional role — used to compute years of experience automatically. */
    careerStartDate: "2020-06-01",
    tagline: {
      /** Hero lead — home “Qué hago” block + OG card first line. */
      lead: {
        es: "Ingeniero full-stack con {{years}} años de experiencia.",
        ca: "Enginyer full-stack amb {{years}} anys d'experiència.",
        en: "Full-stack engineer with {{years}} years of experience.",
      } satisfies LocalizedString,
      /** Short Wiris team arc — OG card + og:description on home. */
      ogBriefing: {
        es: "@WIRIS. Construyendo Nubric con el equipo Assessment. Anteriormente en el equipo de integraciones de MathType.",
        ca: "@WIRIS. Construint Nubric amb l'equip Assessment. Anteriorment a l'equip d'integracions de MathType.",
        en: "@WIRIS. Building Nubric with the Assessment team. Previously on the MathType Integrations team.",
      } satisfies LocalizedString,
      detail: {
        es: "En Wiris estoy construyendo Nubric con el equipo Assessment. Previamente en el equipo de integraciones de MathType, integré MathType en Google Workspace, Office add-ins, Moodle y editores WYSIWYG. Anteriormente lideré la transformación digital en Rotrafu (+50K servicios, −35% load time).",
        ca: "A Wiris estic construint Nubric amb l'equip Assessment. Prèviament a l'equip d'integracions de MathType, vaig integrar MathType a Google Workspace, Office add-ins, Moodle i editors WYSIWYG. Anteriorment vaig liderar la transformació digital a Rotrafu (+50K serveis, −35% temps de càrrega).",
        en: "At Wiris I'm building Nubric with the Assessment team. Previously on the MathType Integrations team, I integrated MathType across Google Workspace, Office add-ins, Moodle and WYSIWYG editors. Earlier I led digital transformation at Rotrafu (50K+ services, −35% load time).",
      } satisfies LocalizedString,
    },
    summary: {
      es: "Ingeniero de Software Full-Stack con {{years}} años de experiencia en producto. Especializado en TypeScript/JavaScript y PHP/Laravel, con foco en arquitectura mantenible (hexagonal, DDD, SOLID), calidad de código y rendimiento. En Wiris estoy construyendo Nubric con el equipo Assessment; previamente en el equipo de integraciones de MathType integré MathType en Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author y más editores. En Rotrafu escalé la aplicación principal a más de 50.000 servicios activos, reduje tiempos de carga un 35% y lideré ROTRAFU 2.0.",
      ca: "Enginyer de Programari Full-Stack amb {{years}} anys d'experiència en producte. Especialitzat en TypeScript/JavaScript i PHP/Laravel, amb focus en arquitectura mantenible (hexagonal, DDD, SOLID), qualitat de codi i rendiment. A Wiris estic construint Nubric amb l'equip Assessment; prèviament a l'equip d'integracions de MathType vaig integrar MathType a Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author i més editors. A Rotrafu vaig escalar l'aplicació principal a més de 50.000 serveis actius, vaig reduir temps de càrrega un 35% i vaig liderar ROTRAFU 2.0.",
      en: "Full-Stack Software Engineer with {{years}} years of product experience. Specialized in TypeScript/JavaScript and PHP/Laravel, focused on maintainable architecture (hexagonal, DDD, SOLID), code quality and performance. At Wiris I'm building Nubric with the Assessment team; previously on the MathType Integrations team, I integrated MathType across Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author and more editors. At Rotrafu I scaled the main application to 50,000+ active services, cut load times by 35% and led ROTRAFU 2.0.",
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
        es: "Ingeniero de Software · Assessment",
        ca: "Enginyer de Programari · Assessment",
        en: "Software Engineer · Assessment",
      },
      url: "https://www.wiris.com/",
      startDate: "2025-04-10",
      endDate: null,
      current: true,
      featured: true,
      summary: {
        es: "Equipo de producto especializado en assessment matemático. Desarrollo Nubric (antes Learning Lemur), plataforma en PHP/Laravel para crear, autocorregir y programar reglas de ejercicios con MathType integrado, usada por instituciones educativas.",
        ca: "Equip de producte especialitzat en assessment matemàtic. Desenvolupo Nubric (abans Learning Lemur), plataforma en PHP/Laravel per crear, autocorregir i programar regles d'exercicis amb MathType integrat, usada per institucions educatives.",
        en: "Product team focused on math assessment. I build Nubric (formerly Learning Lemur), a PHP/Laravel platform to create, auto-grade and programmatically rule exercises with embedded MathType, used by educational institutions.",
      },
      highlights: {
        es: [
          "Desarrollo funcionalidades de evaluación matemática en Nubric (Laravel) con foco en exactitud y rendimiento",
          "Lideré refactors de arquitectura sobre el código heredado de Learning Lemur",
          "Colaboración cross-funcional con producto, diseño y QA en equipo especializado en edtech",
        ],
        ca: [
          "Desenvolupament de funcionalitats d'avaluació matemàtica a Nubric (Laravel) amb focus en exactitud i rendiment",
          "Vaig liderar refactors d'arquitectura sobre el codi heretat de Learning Lemur",
          "Col·laboració cross-funcional amb producte, disseny i QA en equip especialitzat en edtech",
        ],
        en: [
          "Build math assessment features on Nubric (Laravel) with a focus on correctness and performance",
          "Led architecture refactors over the legacy Learning Lemur codebase",
          "Cross-functional collaboration with product, design and QA on an edtech-focused team",
        ],
      },
      technologies: "PHP, Laravel, MathType, Docker, Git",
      location: { es: "Barcelona, España", ca: "Barcelona, Espanya", en: "Barcelona, Spain" },
      modality: { es: "Híbrido", ca: "Híbrid", en: "Hybrid" },
    },
    {
      name: "Wiris",
      position: {
        es: "Ingeniero de Software · MathType Integrations",
        ca: "Enginyer de Programari · MathType Integrations",
        en: "Software Engineer · MathType Integrations",
      },
      url: "https://www.wiris.com/",
      startDate: "2024-03-10",
      endDate: "2025-04-09",
      featured: true,
      summary: {
        es: "Desarrollo de integraciones MathType en el ecosistema edtech: Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author y otros editores WYSIWYG. Incluye el SDK multiplataforma y cada conector de producto, con arquitectura modular en TypeScript/Deno.",
        ca: "Desenvolupament d'integracions MathType a l'ecosistema edtech: Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author i altres editors WYSIWYG. Inclou el SDK multiplataforma i cada connector de producte, amb arquitectura modular en TypeScript/Deno.",
        en: "Built MathType integrations across the edtech ecosystem: Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author and other WYSIWYG editors. Includes the cross-platform SDK and each product connector, with modular TypeScript/Deno architecture.",
      },
      highlights: {
        es: [
          "Mantuve y evolucioné integraciones MathType en Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author y más editores",
          "Diseñé el SDK de integraciones con arquitectura modular y hexagonal, mejorando escalabilidad y mantenibilidad",
          "Optimicé integraciones reduciendo tiempos de carga hasta un 30% en editores de producción",
          "Impulsé la adopción de TypeScript y Deno en el equipo de Integraciones",
          "Colaboración cross-funcional con producto, diseño y QA en equipo especializado en edtech",
        ],
        ca: [
          "Vaig mantenir i evolucionar integracions MathType a Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author i més editors",
          "Vaig dissenyar el SDK d'integracions amb arquitectura modular i hexagonal, millorant l'escalabilitat i la mantenibilitat",
          "Vaig optimitzar integracions reduint temps de càrrega fins a un 30% en editors en producció",
          "Vaig impulsar l'adopció de TypeScript i Deno a l'equip d'Integracions",
          "Col·laboració cross-funcional amb producte, disseny i QA en equip especialitzat en edtech",
        ],
        en: [
          "Maintained and evolved MathType integrations across Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author and more editors",
          "Designed the integrations SDK with modular hexagonal architecture, improving scalability and maintainability",
          "Optimized production editor integrations, cutting load times by up to 30%",
          "Drove TypeScript and Deno adoption on the Integrations team",
          "Cross-functional collaboration with product, design and QA on an edtech-focused team",
        ],
      },
      technologies:
        "TypeScript, JavaScript, Deno, Vue.js, CKEditor, TinyMCE, Froala, Moodle, Oxygen Web Author, Google Workspace, Office Add-ins, Docker, Git",
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
      featured: true,
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
      name: "MathType Integrations",
      url: "https://www.wiris.com/en/solutions/integrations/",
      active: true,
      description: {
        es: "Integraciones MathType en Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author y más editores. SDK multiplataforma con arquitectura hexagonal en TypeScript/Deno y −30% load time en integraciones optimizadas.",
        ca: "Integracions MathType a Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author i més editors. SDK multiplataforma amb arquitectura hexagonal en TypeScript/Deno i −30% temps de càrrega en integracions optimitzades.",
        en: "MathType integrations across Google Workspace, Office add-ins, Moodle, CKEditor, TinyMCE, Froala, Oxygen Web Author and more editors. Cross-platform SDK with hexagonal TypeScript/Deno architecture and up to 30% load-time reduction on optimized integrations.",
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
    backend: ["Laravel", "Deno", "Node", "REST", "OpenAPI", "AI"],
    frontend: ["Vue", "HTML5", "CSS3", "Tailwind CSS"],
    edtech: [
      "MathType",
      "Google Workspace",
      "Office Add-ins",
      "Moodle",
      "CKEditor",
      "TinyMCE",
      "Froala",
      "Oxygen Web Author",
    ],
    practices: {
      es: ["Arquitectura Hexagonal", "DDD", "SOLID", "Patrones de Diseño", "TDD"],
      ca: ["Arquitectura Hexagonal", "DDD", "SOLID", "Patrons de Disseny", "TDD"],
      en: ["Hexagonal Architecture", "DDD", "SOLID", "Design Patterns", "TDD"],
    } satisfies LocalizedList,
    devops: ["Docker", "Git", "GitHub Actions", "CI/CD", "Unit Testing", "Integration Testing"],
    other: ["Electron", "SDK Integrations", "Scrum", "Kanban"],
    ribbon: [
      "TypeScript",
      "PHP",
      "Laravel",
      "Vue",
      "Deno",
      "Node",
      "AI",
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
  copy: {
    pages: {
      home: {
        selectedWorkSub: {
          es: "Roles donde he entregado producto con impacto medible.",
          ca: "Rols on he lliurat producte amb impacte mesurable.",
          en: "Roles where I've shipped product with measurable impact.",
        },
      },
      experience: {
        subtitle: {
          es: "{{years}} años construyendo producto escalable con impacto medible.",
          ca: "{{years}} anys construint producte escalable amb impacte mesurable.",
          en: "{{years}} years building scalable product with measurable impact.",
        },
      },
      projects: {
        subtitle: {
          es: "Producto en producción y evaluaciones técnicas verificables.",
          ca: "Producte en producció i avaluacions tècniques verificables.",
          en: "Production product and verifiable technical assessments.",
        },
      },
      skills: {
        subtitle: {
          es: "Stack verificado, prácticas de ingeniería e idiomas.",
          ca: "Stack verificat, pràctiques d'enginyeria i idiomes.",
          en: "Verified stack, engineering practices and languages.",
        },
      },
      contact: {
        subtitle: {
          es: "Cuéntame en qué estás trabajando.",
          ca: "Explica'm en què estàs treballant.",
          en: "Tell me what you're working on.",
        },
        availability: {
          es: "Respondo en menos de 24 h en días laborables.",
          ca: "Responc en menys de 24 h en dies laborables.",
          en: "I reply within 24 h on business days.",
        },
        preferred: {
          es: "Preferiblemente por email para conversaciones técnicas; LinkedIn para presentaciones.",
          ca: "Preferiblement per correu per a converses tècniques; LinkedIn per a presentacions.",
          en: "Email is best for technical conversations; LinkedIn for intros.",
        },
      },
      cv: {
        subtitle: {
          es: "Versión optimizada para impresión y parsers ATS.",
          ca: "Versió optimitzada per a impressió i parsers ATS.",
          en: "Optimized for print and ATS parsers.",
        },
        printHint: {
          es: "Pulsa imprimir y guarda como PDF.",
          ca: "Prem imprimir i desa com a PDF.",
          en: "Hit print and save as PDF.",
        },
      },
    },
    meta: {
      keywords:
        "Ubaldo Santos, Ubaldo Santos Patón, full-stack engineer, TypeScript, PHP, Laravel, Vue, Wiris, Nubric, Barcelona, MathType, AI, Copilot, Cursor, OpenRouter, MCP",
      pages: {
        home: {
          title: {
            es: "Ubaldo Santos Patón — Ingeniero de Software Full-Stack",
            ca: "Ubaldo Santos Patón — Enginyer de Programari Full-Stack",
            en: "Ubaldo Santos Patón — Full-Stack Software Engineer",
          },
          description: {
            es: "Ingeniero full-stack con {{years}} años en producto. En Wiris: Assessment (Nubric) e integraciones MathType. Ex-Rotrafu (+50K servicios).",
            ca: "Enginyer full-stack amb {{years}} anys en producte. A Wiris: Assessment (Nubric) i integracions MathType. Ex-Rotrafu (+50K serveis).",
            en: "Full-stack engineer with {{years}} years in product. At Wiris: Assessment (Nubric) and MathType integrations. Ex-Rotrafu (50K+ services).",
          },
          ogDescription: {
            es: "En Wiris estoy construyendo Nubric con el equipo Assessment. Previamente en el equipo de integraciones de MathType.",
            ca: "A Wiris estic construint Nubric amb l'equip Assessment. Prèviament a l'equip d'integracions de MathType.",
            en: "At Wiris I'm building Nubric with the Assessment team. Previously on the MathType Integrations team.",
          },
        },
        experience: {
          title: {
            es: "Experiencia — Ubaldo Santos Patón",
            ca: "Experiència — Ubaldo Santos Patón",
            en: "Experience — Ubaldo Santos Patón",
          },
          description: {
            es: "{{years}} años en producto: Wiris (Assessment & MathType Integrations), Rotrafu (+50K servicios, −35% load time), Prime IT, iThinkUPC.",
            ca: "{{years}} anys en producte: Wiris (Assessment & MathType Integrations), Rotrafu (+50K serveis, −35% temps de càrrega), Prime IT, iThinkUPC.",
            en: "{{years}} years in product: Wiris (Assessment & MathType Integrations), Rotrafu (50K+ services, −35% load time), Prime IT, iThinkUPC.",
          },
          ogDescription: {
            es: "Trayectoria en producto e ingeniería.",
            ca: "Trajectòria en producte i enginyeria.",
            en: "Trajectory in product and engineering.",
          },
        },
        projects: {
          title: {
            es: "Proyectos — Ubaldo Santos Patón",
            ca: "Projectes — Ubaldo Santos Patón",
            en: "Projects — Ubaldo Santos Patón",
          },
          description: {
            es: "Nubric, MathType Integrations, Office Add-in, ROTRAFU 2.0 y evaluaciones técnicas en GitHub.",
            ca: "Nubric, MathType Integrations, Office Add-in, ROTRAFU 2.0 i avaluacions tècniques a GitHub.",
            en: "Nubric, MathType Integrations, Office Add-in, ROTRAFU 2.0 and verifiable GitHub technical assessments.",
          },
          ogDescription: {
            es: "Producto real y proyectos de aprendizaje verificables.",
            ca: "Producte real i projectes d'aprenentatge verificables.",
            en: "Production product and verifiable learning projects.",
          },
        },
        skills: {
          title: {
            es: "Skills & IA — Ubaldo Santos Patón",
            ca: "Skills & IA — Ubaldo Santos Patón",
            en: "Skills & AI — Ubaldo Santos Patón",
          },
          description: {
            es: "Stack verificado: TypeScript, PHP/Laravel, Vue, edtech (MathType, Moodle), arquitectura hexagonal, DevOps e IA aplicada.",
            ca: "Stack verificat: TypeScript, PHP/Laravel, Vue, edtech (MathType, Moodle), arquitectura hexagonal, DevOps i IA aplicada.",
            en: "Verified stack: TypeScript, PHP/Laravel, Vue, edtech (MathType, Moodle), hexagonal architecture, DevOps and applied AI.",
          },
          ogDescription: {
            es: "Stack, prácticas e IA aplicada en producto.",
            ca: "Stack, pràctiques i IA aplicada en producte.",
            en: "Stack, practices and AI applied in product.",
          },
        },
        cv: {
          title: {
            es: "CV — Ubaldo Santos Patón",
            ca: "CV — Ubaldo Santos Patón",
            en: "CV — Ubaldo Santos Patón",
          },
          description: {
            es: "Curriculum imprimible y optimizado para parsers ATS de Ubaldo Santos Patón.",
            ca: "Currículum imprimible i optimitzat per a parsers ATS d'Ubaldo Santos Patón.",
            en: "Printable, ATS-friendly résumé of Ubaldo Santos Patón.",
          },
          ogDescription: {
            es: "Pulsa imprimir y guarda como PDF.",
            ca: "Prem imprimir i desa com a PDF.",
            en: "Hit print and save as PDF.",
          },
        },
        contact: {
          title: {
            es: "Contacto — Ubaldo Santos Patón",
            ca: "Contacte — Ubaldo Santos Patón",
            en: "Contact — Ubaldo Santos Patón",
          },
          description: {
            es: "Contacta con Ubaldo Santos Patón: email, teléfono, LinkedIn y GitHub.",
            ca: "Contacta amb Ubaldo Santos Patón: correu, telèfon, LinkedIn i GitHub.",
            en: "Contact Ubaldo Santos Patón: email, phone, LinkedIn and GitHub.",
          },
          ogDescription: {
            es: "Hablemos.",
            ca: "Parlem.",
            en: "Let's talk.",
          },
        },
      } satisfies Record<CvMetaPage, MetaPageCopy>,
    },
    ai: {
      kicker: {
        es: "IA en mi día a día y en producto",
        ca: "IA al meu dia a dia i al producte",
        en: "AI in my workflow and in product",
      },
      title: {
        es: "Skills + IA",
        ca: "Skills + IA",
        en: "Skills + AI",
      },
      body: {
        es: "Uso IA como copiloto a diario (GitHub Copilot a nivel organización, Cursor CLI con reglas en el repo, OpenRouter para enrutar a varios modelos con fallback, MCP para conectar el modelo a datos reales). También la he integrado en producto, no solo en mi editor.",
        ca: "Faig servir IA com a copilot a diari (GitHub Copilot a nivell d'organització, Cursor CLI amb regles al repo, OpenRouter per enrutar a diversos models amb fallback, MCP per connectar el model a dades reals). També l'he integrada en producte, no només al meu editor.",
        en: "I use AI as a copilot daily (GitHub Copilot at the org level, Cursor CLI with rules versioned in the repo, OpenRouter to route between models with fallback, MCP to connect the model to real data). I've also shipped AI into product, not just my editor.",
      },
      tags: ["GitHub Copilot (org)", "Cursor CLI", "OpenRouter", "MCP", "Agent Skills"],
    },
  },
  seo: {
    knowsAbout: {
      es: [
        "TypeScript",
        "PHP",
        "Laravel",
        "Vue",
        "React",
        "Edtech",
        "MathType",
        "Nubric",
        "Arquitectura hexagonal",
        "DevOps",
        "IA aplicada",
      ],
      ca: [
        "TypeScript",
        "PHP",
        "Laravel",
        "Vue",
        "React",
        "Edtech",
        "MathType",
        "Nubric",
        "Arquitectura hexagonal",
        "DevOps",
        "IA aplicada",
      ],
      en: [
        "TypeScript",
        "PHP",
        "Laravel",
        "Vue",
        "React",
        "Edtech",
        "MathType",
        "Nubric",
        "Hexagonal architecture",
        "DevOps",
        "Applied AI",
      ],
    } satisfies LocalizedList,
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
