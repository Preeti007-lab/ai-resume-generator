# 🌸 ResuBloom — AI Resume & Career Engine

> **Craft executive, ATS-optimized professional resumes in seconds with Groq AI intelligence, botanical floral aesthetics, and Clerk authentication.**

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/Preeti007-lab/ai-resume-generator)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite)](https://vitejs.dev/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-LLaMA_3.3_70B-f55036)](https://groq.com/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Authentication-6c47ff?logo=clerk)](https://clerk.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47a248?logo=mongodb)](https://www.mongodb.com/)

---

## 🔗 Repository Links

- **GitHub Repository**: [https://github.com/Preeti007-lab/ai-resume-generator](https://github.com/Preeti007-lab/ai-resume-generator)
- **Live Backend API (Render)**: `https://preeti-resume-backend.onrender.com`
- **Live Health Endpoint**: `https://preeti-resume-backend.onrender.com/health`

---

## ✨ Features

- 🌸 **Botanical & Floral Glassmorphic UI**: Ambient falling cherry blossom petals, botanical SVG clusters, and custom pastel lavender (`#f3e8ff`) & sunny yellow (`#fefce8`) glass surfaces.
- ⚡ **Lightning-Fast AI Generation**: Powered by Groq's high-speed LLaMA 3.3 70B inference engine for instant action-verb synthesis and quantifiable impact metrics.
- 🎯 **ATS-Optimized Formatting**: 99% keyword compliance, standard typography hierarchy, and zero recruiter friction layout.
- 🔒 **Secure User Isolation**: Protected by Clerk Authentication and isolated MongoDB user profiles.
- 📄 **Live Interactive Mockup & Builder**: 4-step interactive wizard (Personal Info, Experience, Skills, Education & Projects) with instant split-screen real-time paper rendering.
- 🖨️ **1-Click PDF Export & Clean Print**: Built-in `@media print` styling that hides floating visual overlays and generates pixel-perfect A4/Letter white paper resumes.
- 🎨 **Dynamic Palette Switcher**: Real-time accent styling (Royal Lavender, Rose Blossom, Sunny Gold, Botanical Sage, Executive Slate).

---

## 📂 Project Architecture & Directory Structure

```text
ai-resume-generator/
├── backend/                         # Express.js REST API & AI Server
│   ├── config/                      # Database & Groq initialization
│   │   ├── db.js                    # MongoDB Mongoose connection
│   │   └── groq.js                  # Groq SDK configuration
│   ├── middleware/                  # Security & Clerk Auth validation
│   │   └── clerkAuth.js             # Clerk session JWT verification
│   ├── models/                      # Mongoose Database Schemas
│   │   └── Resume.js                # Resume data model & schema
│   ├── routes/                      # API Endpoints
│   │   ├── aiRoutes.js              # AI Resume Generation routes
│   │   └── resumeRoutes.js          # CRUD Resume storage routes
│   ├── services/                    # Business Logic & Prompt Engineering
│   │   └── groqService.js           # Strict JSON ATS resume synthesis prompt
│   ├── app.js                       # Express app configuration & middleware
│   └── server.js                    # Server startup & port listener
│
├── src/                             # React 18 + Vite Frontend Application
│   ├── assets/                      # Static assets & icons
│   ├── components/                  # Reusable UI & Aesthetic Components
│   │   ├── FloatingPetals.jsx       # 22 falling & swaying botanical petals
│   │   ├── FloralBackdrop.jsx       # Botanical corner SVG floral clusters
│   │   ├── Navbar.jsx               # ResuBloom glassmorphic header navigation
│   │   ├── Footer.jsx               # ResuBloom glassmorphic footer
│   │   ├── ResumeCard.jsx           # Pastel lavender & yellow resume cards
│   │   ├── LoadingSpinner.jsx       # Animated loading indicator
│   │   ├── ErrorBoundary.jsx        # React UI error boundary
│   │   └── Toast.jsx                # Toast notifications component
│   ├── context/                     # Application State Management
│   │   └── ToastContext.jsx         # Global toast notification provider
│   ├── pages/                       # Page Views & Routes
│   │   ├── HomePage.jsx             # Hero, Live AI Rewriter, ATS radar & cards
│   │   ├── GenerateResume.jsx       # 4-Step Builder & real-time live mockup
│   │   └── MyResumesPage.jsx        # Saved resumes dashboard & management
│   ├── services/                    # API Client layer
│   │   └── api.js                   # Axios/Fetch integration with Clerk Auth
│   ├── App.jsx                      # Main React Router configuration
│   ├── index.css                    # Botanical Floral & Pastel Design System
│   └── main.jsx                     # ClerkProvider & Root DOM Mounting
│
├── .env.example                     # Environment variables template
├── index.html                       # ResuBloom metadata & Google Fonts
├── package.json                     # Node.js dependencies & scripts
├── tailwind.config.js               # Tailwind CSS configuration
└── vite.config.js                   # Vite bundler & Rollup chunk splitting
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 6, React Router DOM v6, Lucide Icons |
| **Styling** | Vanilla CSS Design Tokens, Tailwind CSS, Glassmorphism, CSS Animations |
| **Authentication** | Clerk (`@clerk/clerk-react`, `@clerk/express`) |
| **AI Inference** | Groq SDK (`llama-3.3-70b-versatile`) |
| **Backend** | Node.js, Express.js 5 |
| **Database** | MongoDB Atlas via Mongoose ORM |
| **Hosting** | Render (Backend API), Vercel (Frontend Client) |

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Preeti007-lab/ai-resume-generator.git
cd ai-resume-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
# Frontend Environment Variables
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=https://preeti-resume-backend.onrender.com

# Backend Environment Variables
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/resubloom
GROQ_API_KEY=gsk_...
CLERK_SECRET_KEY=sk_test_...
CLERK_PUBLISHABLE_KEY=pk_test_...
FRONTEND_URL=http://localhost:5173
```

### 4. Run the Development Server
```bash
# Start Frontend Development Server
npm run dev

# (Optional) Start Local Backend Server
npm run server
```
Open `http://localhost:5173` in your browser.

---

## 📦 Production Build Verification

To verify that the frontend builds with 0 errors and 0 warnings:
```bash
npm run build
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
