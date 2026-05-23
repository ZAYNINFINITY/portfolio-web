# portfolio-web

A clean, modern portfolio website built with React and Tailwind CSS.

## Features

- Hero Section with quick summary
- About Me section
- Projects showcase
- Experience & Education
- Skills & Technologies
- Contact form with EmailJS integration
- Responsive design

## Tech Stack

- React + Vite
- Tailwind CSS
- EmailJS

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Set up EmailJS (to fix 401 errors):**
   - Sign up at https://dashboard.emailjs.com/
   - Create an Email Service
   - Create an Email Template
   - Copy your Service ID, Template ID, and Public Key
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your EmailJS credentials in `.env`:
     ```
     VITE_APP_EMAILJS_SERVICE_ID=your_service_id
     VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
     ```

3. **Start development server:**
```bash
npm run dev
```

## Troubleshooting

### 401 Error on Contact Form
If you see a 401 error when trying to submit the contact form, it means EmailJS is not configured. Follow the "Set up EmailJS" steps above.

### 404 Error on Page Load
This was caused by a missing `grid.svg` file - **now fixed**. The file has been created at `public/images/grid.svg`.

## Environment Variables

- `VITE_APP_EMAILJS_SERVICE_ID` - EmailJS service ID (get from dashboard)
- `VITE_APP_EMAILJS_TEMPLATE_ID` - EmailJS template ID (get from dashboard)  
- `VITE_APP_EMAILJS_PUBLIC_KEY` - EmailJS public key (get from Account Settings)

**Never commit your `.env` file!** It's already in `.gitignore`.

## Contact

- Email: zaynbu269@gmail.com
- GitHub: https://github.com/ZAYNINFINITY
- LinkedIn: https://www.linkedin.com/in/zain-ul-abideen-429735231/
