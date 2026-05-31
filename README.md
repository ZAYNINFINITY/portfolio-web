# Portfolio Web

A modern, responsive portfolio website showcasing projects and skills with a clean UI and smooth user experience.

## ✨ Features

- **Hero Section** - Engaging introduction with call-to-action
- **Projects Showcase** - Display of professional work with project details
- **Skills & Technologies** - Comprehensive tech stack overview
- **Responsive Design** - Optimized for all devices and screen sizes
- **Contact Integration** - Functional contact form with email notifications
- **Modern UI** - Clean, professional aesthetic with smooth animations

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Email Service:** EmailJS
- **Build Tool:** Vite

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
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

3. **Configure EmailJS (for contact form):**
   - Sign up at [EmailJS](https://dashboard.emailjs.com/)
   - Create an Email Service and Template
   - Copy your credentials
   - Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   - Fill in your EmailJS credentials:
   ```
   VITE_APP_EMAILJS_SERVICE_ID=your_service_id
   VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server:**
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

| Variable | Description |
|----------|-------------|
| `VITE_APP_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_APP_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_APP_EMAILJS_PUBLIC_KEY` | EmailJS public key |

> **⚠️ Important:** Never commit your `.env` file. It's already listed in `.gitignore`.

## 📦 Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🐛 Troubleshooting

**Contact form showing errors?**
- Verify EmailJS credentials are correctly set in `.env`
- Ensure the environment file is loaded before the app starts
- Check browser console for detailed error messages

**Styling issues?**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Rebuild Tailwind CSS cache: `npm run build`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.
