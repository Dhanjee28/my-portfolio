# Portfolio — Project Structure

```
src/
├── App.jsx                  # Root component — assembles all sections
│
├── data/
│   └── portfolioData.js     # All static content: skills, projects, typing strings
│                              → Edit this file to update your info, add projects, etc.
│
├── hooks/
│   └── usePortfolio.js      # Custom hooks: useTyping, useReveal
│                              → Reusable logic extracted from components
│
├── components/
│   ├── Navbar.jsx            # Top navigation bar + mobile menu
│   ├── Hero.jsx              # Landing hero section
│   ├── About.jsx             # About me section
│   ├── Skills.jsx            # Skills grid with category filter + SkillBar sub-component
│   ├── Projects.jsx          # Project cards grid with filter + modal trigger
│   ├── ProjectModal.jsx      # Project detail modal (opened from Projects)
│   ├── Contact.jsx           # Contact info + contact form
│   └── Footer.jsx            # Footer with socials
│
└── styles/
    ├── globals.css           # CSS variables, resets, shared utilities, animations
    ├── Navbar.css            # Nav + mobile menu styles
    ├── Hero.css              # Hero section styles
    ├── About.css             # About section styles
    ├── Skills.css            # Skills grid + skill card styles
    ├── Projects.css          # Project cards + modal styles
    └── Contact.css           # Contact form + links styles
```

## Common tasks

| What you want to do              | File to edit                        |
|----------------------------------|-------------------------------------|
| Update your bio / chips          | `components/About.jsx`              |
| Add / edit a skill               | `data/portfolioData.js` → `SKILLS`  |
| Add / edit a project             | `data/portfolioData.js` → `PROJECTS`|
| Change typing animation strings  | `data/portfolioData.js` → `TYPING_STRINGS` |
| Change colors / theme            | `styles/globals.css` → `:root`      |
| Update contact info              | `components/Contact.jsx`            |
| Change nav links                 | `components/Navbar.jsx`             |
