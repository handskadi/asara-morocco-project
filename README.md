# 🐪 Asara Morocco Tours – High-Conversion Landing Page

This is the official landing page for **Asara Morocco Tours**, a premium Berber-owned travel service offering unforgettable private journeys across Morocco. This page is built with speed, SEO, beauty, and conversion in mind.

> 🌍 Live demo: [https://www.asaramoroccotours.com](https://www.asaramoroccotours.com)

---

## 🚀 Tech Stack

- ⚛️ Next.js 15 (App Router)
- 🎨 Tailwind CSS v4
- 📩 Nodemailer for Booking Email
- 💬 Swiper.js for Review Carousel
- 📱 Responsive Design
- 🔐 Gmail App Password Auth
- ⚡️ Optimized for Core Web Vitals

---

## 📁 Project Structure

asara-travel/
├── app/
│ ├── api/
│ │ └── booking/route.ts # POST route to send booking email
│ └── page.tsx # Entire landing page (sections: hero, tours, reviews, booking, etc.)
├── public/
│ └── \*.webp / .jpg # Hero images, trust badges, tours
├── styles/
│ └── globals.css # Tailwind base styles (optional)
├── .env.local # Email credentials
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── README.md

## 🔐 Environment Variables

Create a `.env.local` file in the root:

```env
EMAIL_USER=email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_RECEIVER=email@gmail.com
```
