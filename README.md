# portfolio-web

My personal portfolio — built with [Hugo](https://gohugo.io/) and the [Toha](https://github.com/hugo-toha/toha) theme.

**Live site:** [zayninfinity.github.io](https://zayninfinity.github.io/)

### Stack

Hugo + Go modules, Tailwind CSS, deployed on Netlify.

### Sections

- **About** — bio, social links, skill badges
- **Skills** — filterable grid with project context per skill
- **Experience** — work history + education
- **Projects** — cards with live links, repos, and descriptions
- **Education** — coursework and extracurriculars

### Updating content

All content lives in `data/en/sections/*.yaml`. No code changes needed — edit the YAML, push, Netlify rebuilds automatically.

| File | Controls |
|------|----------|
| `about.yaml` | Bio, social links, resume |
| `skills.yaml` | Tech stack grid |
| `projects.yaml` | Project cards |
| `experiences.yaml` | Work + education history |

### Running locally

```bash
git clone https://github.com/ZAYNINFINITY/portfolio-web.git
cd portfolio-web
hugo mod install
hugo server
```

Site runs at `localhost:1313`.

### License

MIT
