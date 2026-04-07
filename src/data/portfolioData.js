// ─── Typing Animation Strings ─────────────────────────────────────────────────
export const TYPING_STRINGS = [
  "Full-Stack Developer",
  "React Enthusiast",
  "SQL Specialist",
  "Backend Architect",
  "CS Graduate @ KIIT",
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS = [
  { name: "Java",               level: 85, cat: "Languages"    },
  { name: "Python",             level: 80, cat: "Languages"    },
  { name: "C++",                level: 72, cat: "Languages"    },
  { name: "JavaScript",         level: 85, cat: "Languages"    },
  { name: "SQL",                level: 90, cat: "Languages"    },
  { name: "React.js",           level: 82, cat: "Frontend"     },
  { name: "Node.js",            level: 78, cat: "Backend"      },
  { name: "Express.js",         level: 76, cat: "Backend"      },
  { name: "REST API",           level: 88, cat: "Backend"      },
  { name: "MySQL",              level: 88, cat: "Databases"    },
  { name: "MongoDB",            level: 74, cat: "Databases"    },
  { name: "Query Optimization", level: 85, cat: "Databases"    },
  { name: "OpenCV",             level: 78, cat: "ML/CV"        },
  { name: "NumPy / Pandas",     level: 80, cat: "ML/CV"        },
  { name: "Git & GitHub",       level: 88, cat: "Tools"        },
  { name: "Microservices",      level: 72, cat: "Architecture" },
  { name: "OOP & DSA",          level: 85, cat: "Architecture" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 1,
    name: "Employee Directory",
    tagline: "Full-Stack CRUD System",
    desc: "RESTful API with 12+ endpoints for employee management, JWT auth, and Azure deployment.",
    longDesc:
      "A production-grade employee directory built with ASP.NET Core Web API and MySQL. Features normalized database schema, three-tier MVC architecture with dependency injection, and full Swagger documentation for seamless frontend integration.",
    tags: ["Full-Stack", "Backend"],
    stack: ["ASP.NET Core", "MySQL", "Entity Framework", "LINQ", "JWT", "Swagger", "Azure"],
    highlights: [
      "Architected RESTful API with 12+ endpoints supporting CRUD, handling 500+ concurrent requests with sub-200ms response time",
      "Designed normalized schema cutting query execution time by 35%",
      "Implemented 3-tier MVC with dependency injection achieving 85% unit test coverage",
      "Integrated JWT authentication, logging middleware, and Azure cloud deployment",
    ],
    icon: "🗂️",
    gradient: "linear-gradient(135deg, #1a1a3e 0%, #0f2a1a 100%)",
    featured: true,
    category: "backend",
  },
  {
    id: 2,
    name: "Stock Prediction ML",
    tagline: "Machine Learning Forecasting",
    desc: "ML model predicting stock movements using historical data, technical indicators, and trend analysis.",
    longDesc:
      "A machine learning pipeline for stock price prediction leveraging Python, pandas, and scikit-learn. Processes historical OHLCV data, engineers technical indicators (RSI, MACD, Bollinger Bands), and trains ensemble models for directional forecasting.",
    tags: ["ML", "Python"],
    stack: ["Python", "pandas", "NumPy", "scikit-learn", "Matplotlib", "yfinance"],
    highlights: [
      "Built feature engineering pipeline with 20+ technical indicators from raw OHLCV data",
      "Trained ensemble models achieving ~72% directional accuracy on test data",
      "Visualized model predictions vs actuals with interactive Matplotlib dashboards",
      "Automated data fetching via yfinance API for real-time inference",
    ],
    icon: "📈",
    gradient: "linear-gradient(135deg, #0f1e3a 0%, #1a0f2e 100%)",
    featured: false,
    category: "ml",
  },
  {
    id: 3,
    name: "Air Canvas",
    tagline: "Gesture-Controlled Drawing",
    desc: "Real-time computer vision app that turns your fingertip into a paintbrush — no hardware needed.",
    longDesc:
      "A real-time gesture-controlled drawing application powered by Mediapipe and OpenCV. Detects hand landmarks at 30+ FPS and maps fingertip coordinates to canvas operations. Supports multi-color drawing, erase, and clear gestures.",
    tags: ["CV", "Python"],
    stack: ["Python", "OpenCV", "Mediapipe", "NumPy", "Git"],
    highlights: [
      "Built gesture-controlled drawing reaching 30+ FPS and 95% recognition accuracy",
      "Optimized frame processing lowering latency by 40% via vectorized NumPy operations",
      "Delivered multi-color drawing modes with fingertip coordinate tracking",
      "Intuitive draw, erase, and clear controls using hand pose detection",
    ],
    icon: "✋",
    gradient: "linear-gradient(135deg, #1f0a2e 0%, #0a1f1a 100%)",
    featured: true,
    category: "ml",
  },
];

export const CATEGORIES = ["All", "Backend", "ML"];