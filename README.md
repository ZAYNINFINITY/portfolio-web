# Portfolio Website

**Live Demo:** [https://portfolio-zeta-snowy-61.vercel.app](https://portfolio-zeta-snowy-61.vercel.app)

Personal portfolio website showcasing full-stack projects, developer tools, startup experiments, and technical work.

---

## 📸 Preview

### Homepage
[Your homepage screenshot here]

### Projects Showcase
[Your projects page screenshot here]

---

## 🎯 Featured Projects

### **ScrollStreak**
Chrome extension that tracks Instagram Reel usage and turns scrolling into a competitive experience with friends. Built with JavaScript, Firebase, and real-time Socket.io features.

### **AI POS System**
Full-stack point of sale platform with real-time inventory management, sales analytics, and payment processing. Features Python backend, modern UI, and cloud database integration.

### **Startup Experiments**
Collection of product-focused projects exploring social, productivity, and consumer software ideas. Rapid prototyping and user validation work.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Python, Express.js
- **Database:** Firebase Realtime Database
- **Authentication:** Firebase Auth
- **Email Service:** EmailJS
- **Deployment:** Vercel

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ZAYNINFINITY/portfolio-web.git
cd portfolio-web
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

4. **Fill in your credentials:**
```env
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Note:** Get these from [EmailJS Dashboard](https://dashboard.emailjs.com/). See `.env.example` for details.

5. **Start the development server:**
```bash
npm run dev
```

---

## 🔨 Build

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_APP_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_APP_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_APP_EMAILJS_PUBLIC_KEY` | EmailJS public key |

> ⚠️ **Important:** Never commit your `.env` file. It's already in `.gitignore`.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) file for details.

---

**Made by Zayn Ali** • [GitHub](https://github.com/ZAYNINFINITY)