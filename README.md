# Zain Ul Abideen — Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/b1b93b02-f278-440b-ae1b-304e9f4c4ab5/deploy-status)](https://app.netlify.com/sites/toha/deploys)

Personal portfolio website built with [Hugo](https://gohugo.io/) and the [Toha](https://github.com/hugo-toha/toha) theme. Deployed on Netlify.

**Live:** [zayninfinity.github.io](https://zayninfinity.github.io/)

---

## About

Full-Stack Developer and CS student at **Pak-Austria Fachhochschule Institute of Applied Sciences and Technology**, Islamabad. Building production-grade web applications with the MERN stack.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Vite |
| Backend | Node.js, Express.js, Socket.io |
| Database | MongoDB, MySQL |
| Auth | OAuth 2.0, JWT, Passport.js |
| Languages | JavaScript, Python, C++ |
| Tools | Git, GitHub, VS Code, GitHub Actions |

---

## Featured Projects

| Project | Description | Link |
|---------|-------------|------|
| **Collaborative Workspace** | Real-time MERN collaboration platform with live chat, Kanban boards, OAuth 2.0 | [GitHub](https://github.com/ZAYNINFINITY/collaborative-workspace) |
| **POS-it** | Offline POS system built with Electron, React, and SQLite | Coming Soon |
| **ZSE Store** | Live e-commerce site for sanitary & electric products | [zsesanitary.com](https://zsesanitary.com) |
| **ScrollStreak** | Chrome/Edge extension tracking Instagram Reels watched | [Netlify](https://scrollstreak.netlify.app) |
| **Car Auction System** | Full auction platform with bidding, Python + MySQL | [GitHub](https://github.com/ZAYNINFINITY/CARAUCTION-MANAGEMENT-SYSTEM) |

---

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version)
- [Go](https://go.dev/dl/)
- [Node.js](https://nodejs.org/)
- [mise](https://mise.jdx.dev/) (optional — manages all dependencies)

### Installation

```bash
# Clone the repo
git clone https://github.com/ZAYNINFINITY/portfolio-web.git
cd portfolio-web

# Install dependencies
mise install
# OR manually: hugo mod install

# Start dev server
hugo server
```

The site will be available at `http://localhost:1313/`.

---

## Structure

```
├── data/en/sections/    # Content configuration (YAML)
│   ├── about.yaml       # Bio, social links, badges
│   ├── skills.yaml      # Tech skills with descriptions
│   ├── projects.yaml    # Project cards
│   ├── experiences.yaml # Work & education history
│   └── ...
├── static/images/       # Static assets
├── layouts/             # Custom Hugo templates
├── hugo.yaml            # Hugo config
└── netlify.toml         # Netlify deploy config
```

---

## How to Update Content

All site content lives in `data/en/sections/*.yaml` files. Edit them directly — no code changes needed.

- **Add a project:** Edit `data/en/sections/projects.yaml`
- **Update skills:** Edit `data/en/sections/skills.yaml`
- **Change bio:** Edit `data/en/sections/about.yaml`

---

## Deployment

Automatically deployed to **Netlify** on every push to `main`.

---

## License

MIT

---

Built by [Zain Ul Abideen](https://github.com/ZAYNINFINITY)
