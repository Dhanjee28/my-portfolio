export type Project = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  stack: string[];
  highlights: string[];
  image?: string;
  github?: string;
  caseStudy?: string;
  featured?: boolean;
};

export type OpenSourceContribution = {
  project: string;
  title: string;
  description: string;
  status: "Open PR" | "Merged";
  tags: string[];
  highlights: string[];
  url: string;
};

export const profile = {
  firstName: "Dhanjee",
  lastName: "Tiwari",
  initials: "DT",
  tag: "Open to backend and product engineering roles",
  title: "Backend Engineer",
  location: "Hyderabad, India",
  education: "B.Tech CSE, KIIT University, Class of 2025",
  company: "Cognizant Technology Solutions",
  links: {
    github: "https://github.com/Dhanjee28",
    linkedin: "https://linkedin.com/in/dhanjeetiwari",
    email: "mailto:dhanjee.tiwari458@gmail.com",
    emailLabel: "dhanjee.tiwari458@gmail.com",
    phone: "tel:+916204946431",
    phoneLabel: "+91-6204946431",
  },
};

export const typingLine =
  "Backend Engineer | Node.js + TypeScript | Production Debugging | PostgreSQL + Redis + Docker";

export const specRows = [
  {
    label: "Movement",
    value: "Node.js | TypeScript | Express",
  },
  {
    label: "Power Reserve",
    value: "PostgreSQL | Redis | MySQL",
  },
  {
    label: "Complications",
    value: "Token-family rotation | Lua rate limiter | RBAC",
  },
  {
    label: "Case",
    value: "Docker | Prisma | Zod",
  },
  {
    label: "Service Log",
    value: "Production debugging at Cognizant, Hyderabad",
  },
];

export const aboutChips = [
  "Node.js + TypeScript",
  "Production Debugging",
  "PostgreSQL + Redis",
  "DSA in C++",
  "Seiko Modding",
  "Content Creation",
];

export const skills = [
  {
    category: "Backend",
    items: ["Node.js", "TypeScript", "Express", "Prisma", "REST API Design", "JWT Auth", "Zod"],
  },
  {
    category: "Data",
    items: ["PostgreSQL", "MySQL", "Redis", "Sequelize", "SQL", "Query Debugging"],
  },
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "C++", "Java", "Python", "SQL"],
  },
  {
    category: "Tooling",
    items: ["Docker", "Git + GitHub", "Postman", "Claude Code", "ChatGPT", "Cursor"],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    name: "Train Booking Backend",
    tagline: "IRCTC-style booking API",
    description:
      "A backend project focused on auth, rate limiting, booking flow, database design, and API reliability.",
    longDescription:
      "RailInfo is a train booking backend modeled around real booking-system constraints: authentication, refresh-token rotation, token reuse detection, abuse-resistant rate limiting, and safer seat-booking behavior under concurrent requests.",
    tags: ["Backend", "Featured"],
    stack: ["Node.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Redis", "Docker", "Zod", "JWT"],
    highlights: [
      "25+ REST endpoints covering auth, search, booking, and admin flows",
      "JWT refresh-token rotation with family-based reuse detection",
      "Redis rate limiter backed by a Lua script so check-and-decrement stays atomic",
      "Seat-booking transactions designed to reduce double-allocation risk",
      "30+ unit tests covering auth flows, booking logic, and edge cases",
    ],
    image: "/theme/railinfo.png",
    github: "https://github.com/Dhanjee28/RailInfo",
    caseStudy: "/case-studies/railinfo",
    featured: true,
  },
  {
    id: 2,
    name: "Employee Management System",
    tagline: "Role-based access done properly",
    description:
      "REST API for employee CRUD with role-based access control, JWT auth, and a normalized MySQL schema.",
    longDescription:
      "An employee management backend built with Node.js, Express, MySQL, and Sequelize. The focus is authorization design: admins, managers, and employees have separate access rules enforced through middleware.",
    tags: ["Backend"],
    stack: ["Node.js", "Express", "MySQL", "Sequelize", "JWT", "RBAC"],
    highlights: [
      "RBAC enforced through middleware instead of scattered route checks",
      "JWT authentication with protected routes across the API surface",
      "Normalized MySQL schema managed through Sequelize models",
      "Separated routes, controllers, and data access for maintainability",
    ],
    image: "/theme/employee-management.png",
    github: "https://github.com/Dhanjee28/Employee_Direct-",
  },
  {
    id: 3,
    name: "Air Canvas",
    tagline: "Draw in the air with your fingertip",
    description:
      "A computer vision app that tracks hand landmarks and turns fingertip movement into brush strokes.",
    longDescription:
      "A gesture-controlled drawing application built with OpenCV and Mediapipe. It detects hand landmarks in real time and maps fingertip coordinates to canvas actions such as drawing, erasing, switching colors, and clearing.",
    tags: ["Computer Vision"],
    stack: ["Python", "OpenCV", "Mediapipe", "NumPy"],
    highlights: [
      "Real-time hand landmark detection mapped to canvas coordinates",
      "Gesture-based controls for draw, erase, color switch, and clear",
      "NumPy frame processing used to keep interaction responsive",
    ],
    image: "/theme/air-canvas.png",
  },
];

export const openSourceContributions: OpenSourceContribution[] = [
  {
    project: "Soroban Guard Kit",
    title: "Docker local development setup",
    description:
      "Added a reproducible Docker workflow for running and validating the Next.js application locally, together with practical contributor documentation.",
    status: "Open PR",
    tags: ["Docker", "Docker Compose", "Next.js", "Developer Experience"],
    highlights: [
      "Added Docker Compose and Docker ignore configuration for a cleaner local setup",
      "Documented build, run, logs, shell access, checks, and troubleshooting workflows",
      "Validated linting, type checks, tests, and production builds inside containers",
    ],
    url: "https://github.com/SorobanGuard-Labs/soroban-guard-kit/pull/16",
  },
];

export const notes = [
  {
    id: 1,
    title: "Why my refresh tokens rotate in families",
    context: "Train Booking Backend",
    body:
      "Simple refresh tokens have a dangerous failure mode: if one is stolen, an attacker may keep minting access tokens. In RailInfo, every refresh retires the old token and issues a new one in the same family. If a retired token appears again, the family is revoked and the user signs in again.",
    tags: ["Auth", "Security"],
  },
  {
    id: 2,
    title: "Rate limiting that survives race conditions",
    context: "Train Booking Backend",
    body:
      "A naive Redis limiter can read the count in Node, check it, and then increment it. Concurrent requests can slip through that gap. Moving the check and update into a Lua script makes the operation atomic inside Redis.",
    tags: ["Redis", "Concurrency"],
  },
  {
    id: 3,
    title: "Debugging when the connector is the problem",
    context: "Enterprise analytics dashboard work",
    body:
      "Sometimes the hard part is not the SQL query. It is the path the data is allowed to travel. Working within HTTP/ODBC constraints taught me to validate connection paths, refresh behavior, and reporting assumptions before treating the dashboard as broken.",
    tags: ["Debugging", "Data"],
  },
];

export const railInfoCaseStudy = {
  problem:
    "Build a train booking backend that feels closer to a real production API than a tutorial CRUD app.",
  architecture: [
    {
      title: "API Layer",
      body: "Express API layer written in TypeScript.",
    },
    {
      title: "Database",
      body: "PostgreSQL database accessed through Prisma.",
    },
    {
      title: "Rate Limiting",
      body: "Redis for rate limiting and hot-path protections.",
    },
    {
      title: "Authentication",
      body: "JWT access tokens with refresh-token rotation.",
    },
    {
      title: "Debugging Signals",
      body: "Structured logs and API tests for debugging behavior.",
    },
  ],
  decisions: [
    {
      title: "Token family rotation",
      body:
        "Refresh tokens are rotated on use. Reuse of an old token is treated as a replay signal and invalidates the token family.",
    },
    {
      title: "Redis Lua limiter",
      body:
        "The limiter keeps the check and update in Redis so concurrent requests cannot pass through a read-update race window.",
    },
    {
      title: "Transaction-aware booking",
      body:
        "Booking logic is designed around database transactions so availability and allocation are handled as one flow.",
    },
    {
      title: "Defensible API surface",
      body:
        "Routes are organized around auth, train search, booking, and admin flows, with validation and error handling close to the boundaries.",
    },
  ],
  visuals: [
    "Architecture diagram: client -> Express API -> Prisma -> PostgreSQL, plus Redis and logger.",
    "Auth flow diagram: login -> access token + refresh token -> refresh -> rotate -> reuse detection.",
    "Database ERD from Prisma models: user, train, route/station, booking, token family/session.",
    "Postman or Bruno screenshots for login, refresh, booking, and rate-limit failure cases.",
  ],
  improvements: [
    "Add CI so tests run on every pull request.",
    "Publish API documentation with example requests and responses.",
    "Add more load/concurrency tests around booking behavior.",
    "Add observability screenshots showing logs and common failure paths.",
  ],
};
