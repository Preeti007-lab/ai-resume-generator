# 🌸 ResuBloom — AI Resume & Career Engine

> **An intelligent, ATS-optimized resume builder powered by Groq AI (LLaMA 3.3 70B), Clerk Authentication, and MongoDB.**

---

## 🎯 1. Problem Statement

Over **75% of resumes are rejected by Applicant Tracking Systems (ATS)** before reaching human recruiters. Job seekers face three core challenges:
- **Unquantified & Passive Content**: Bullet points often describe daily duties with weak phrasing instead of quantifiable business impact.
- **ATS Parsing Incompatibilities**: Complex multi-column templates and non-standard layouts break automated parsers.
- **Paywalls & High Latency**: Existing resume builders are gated behind subscriptions or suffer from slow generation speeds.

---

## 💡 2. Approach

ResuBloom provides a streamlined, full-stack AI-powered solution:
- **High-Speed AI Synthesis**: Uses Groq's LLaMA 3.3 70B model to rewrite candidate experience with strong action verbs and metrics in under 2 seconds via strict JSON schemas.
- **ATS-Standard Single-Column Layout**: Guarantees parser readability with standardized typography hierarchy and automated `@media print` PDF generation.
- **Modern Interactive Experience**: 4-step wizard with real-time split-screen paper rendering, botanical pastel aesthetic, and custom palette styling.
- **Secure Data Isolation**: Strict user-isolated MongoDB storage authenticated via Clerk JWT tokens.

---

## 🚀 3. Setup & Usage Instructions

### Prerequisites
- **Node.js** (v18+) and **npm**
- **MongoDB Atlas Database URI**
- **Groq API Key**
- **Clerk Publishable & Secret Keys**

---

### Installation & Environment Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Preeti007-lab/ai-resume-generator.git
   cd ai-resume-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables** in a `.env` file at the root:
   ```env
   # Frontend
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   VITE_API_URL=https://preeti-resume-backend.onrender.com

   # Backend
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/resubloom
   GROQ_API_KEY=gsk_...
   GROQ_MODEL=llama-3.3-70b-versatile
   CLERK_SECRET_KEY=sk_test_...
   CLERK_PUBLISHABLE_KEY=pk_test_...
   FRONTEND_URL=http://localhost:5173
   ```

---

### Running the Application

- **Start Frontend Development Server**:
  ```bash
  npm run dev
  ```
  Open `http://localhost:5173` in your browser.

- **Start Local Backend Server** *(Optional if using live Render backend)*:
  ```bash
  npm run server
  ```

- **Build for Production**:
  ```bash
  npm run build
  ```

---

### User Walkthrough

1. **Sign In**: Click **"Get Started"** to sign in securely with Clerk.
2. **Enter Details**: Navigate to **"Create Resume"** and fill the 4-step wizard *(or click "Load Sample Profile")*.
3. **Generate**: Click **"Generate AI Resume"** to trigger instant Groq AI synthesis.
4. **Preview & Style**: Review your live paper preview and select an accent theme.
5. **Export**: Click **"Print / PDF"** to save a clean white A4/Letter resume, or **"Copy Text"** for clipboard copying.
6. **Manage**: Access saved resumes anytime from the **"My Resumes"** dashboard.

---

## 🔗 Quick Links
- **GitHub Repository**: [https://github.com/Preeti007-lab/ai-resume-generator](https://github.com/Preeti007-lab/ai-resume-generator)
- **Source Code Reference**: [SOURCE_CODE.md](SOURCE_CODE.md)
- **Live Backend API**: `https://preeti-resume-backend.onrender.com`
