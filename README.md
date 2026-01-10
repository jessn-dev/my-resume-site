# 🚀 Professional Machine Console & Portfolio

A high-performance, terminal-inspired portfolio built with **Next.js 14**, featuring dynamic Git contribution graphs, professional experience logs, and a secure contact system. This project is designed to mimic a high-end engineering workstation or IDE.

---

## ✨ Features

* **Interactive Terminal Aesthetics:** A high-fidelity UI utilizing "glassmorphism," CSS backdrops, and monospace typography to simulate a modern engineering terminal.
* **Dynamic GitHub Contribution Heatmap:** An automated activity graph that visualizes professional tenure using authentic GitHub dark-mode color scales (`#0e4429`, `#26a641`, `#39d353`).
* **Zero-Jitter Navigation:** Custom-engineered tab navigation using strict CSS Grid fractional units to ensure layout stability during hover and state transitions.
* **Bento-Box Experience Design:** A modular layout that organizes complex technical data into digestible "machine panels" for education, certifications, and work history.
* **Secure Server-Side Communication:** A contact system powered by Next.js Server Actions and the Resend API, keeping sensitive credentials secure behind the server boundary.
* **Framer Motion Card Sequencing:** Smooth, hardware-accelerated transitions between narrative cards using `AnimatePresence`.
* **Responsive Terminal Viewport:** A fully responsive design that maintains the terminal "console" look across mobile, tablet, and desktop resolutions.

---

## 🛠️ Tech Stack

### **Core Framework & Language**
* **Next.js 14 (App Router):** Leveraging Server Components and Server Actions for optimal performance.
* **React:** For modular, component-based UI development.
* **TypeScript:** Ensuring strict type safety across the entire application.

### **Styling & UI Components**
* **Tailwind CSS:** Powering the "Cyberpunk/Minimalist" dark theme and responsive grid layouts.
* **Framer Motion:** Handling card transitions and smooth entry animations for console logs.
* **Lucide React:** A clean, consistent icon set for system diagnostics.

### **Backend & Deployment**
* **Vercel:** Optimized hosting platform with native support for Next.js Server Actions.
* **Resend:** Modern Email API service used for the secure Contact Form.

---

## 📂 Project Structure



```text
src/
├── app/
│   ├── actions.ts          # Server Actions for email (Resend API)
│   ├── globals.css         # Global styles & custom scrollbar definitions
│   └── page.tsx            # Main entry point (Hero, Experience, About, Contact)
├── components/
│   ├── Experience.tsx      # GitHub-style contribution graph & work logs
│   ├── About.tsx           # Bento-box narrative with machine-panel layout
│   ├── Contact.tsx         # Client-side form with Server Action integration
│   ├── PhilosophyTerminal. # Interactive terminal component
│   └── ui/
│       ├── CardSwap.tsx    # Framer Motion card rotation utility
│       └── PanelFrame.tsx  # Shared wrapper for console-style windows
├── data/
│   └── resume.ts           # Centralized data (Jobs, Education, Certs)
└── lib/
    └── utils.ts            # Tailwind class merging (clsx/tailwind-merge)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:git 

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
