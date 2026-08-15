# 🌸 ResuBloom — Complete Project Source Code Reference

> **Unified, organized, single-document source code reference for ResuBloom: AI Resume & Career Engine.**

---

## 📑 Table of Contents

1. [Backend Services & Core](#1-backend-services--core)
   - [backend/server.js](#backendserverjs)
   - [backend/app.js](#backendappjs)
   - [backend/config/db.js](#backendconfigdbjs)
   - [backend/middleware/authMiddleware.js](#backendmiddlewareauthmiddlewarejs)
   - [backend/middleware/errorHandler.js](#backendmiddlewareerrorhandlerjs)
   - [backend/models/Resume.js](#backendmodelsresumejs)
   - [backend/routes/resumeRoutes.js](#backendroutesresumeroutesjs)
   - [backend/routes/healthRoutes.js](#backendrouteshealthroutesjs)
   - [backend/controllers/resumeController.js](#backendcontrollersresumecontrollerjs)
   - [backend/services/groqService.js](#backendservicesgroqservicejs)
2. [Frontend Architecture & State](#2-frontend-architecture--state)
   - [index.html](#indexhtml)
   - [src/main.jsx](#srcmainjsx)
   - [src/App.jsx](#srcappjsx)
   - [src/services/api.js](#srcservicesapijs)
   - [src/context/ToastContext.jsx](#srccontexttoastcontextjsx)
3. [Frontend Aesthetic & UI Components](#3-frontend-aesthetic--ui-components)
   - [src/components/Navbar.jsx](#srccomponentsnavbarjsx)
   - [src/components/Footer.jsx](#srccomponentsfooterjsx)
   - [src/components/FloatingPetals.jsx](#srccomponentsfloatingpetalsjsx)
   - [src/components/FloralBackdrop.jsx](#srccomponentsfloralbackdropjsx)
   - [src/components/ResumeCard.jsx](#srccomponentsresumecardjsx)
   - [src/components/LoadingSpinner.jsx](#srccomponentsloadingspinnerjsx)
4. [Frontend Page Views](#4-frontend-page-views)
   - [src/pages/HomePage.jsx](#srcpageshomepagejsx)
   - [src/pages/GenerateResume.jsx](#srcpagesgenerateresumejsx)
   - [src/pages/MyResumesPage.jsx](#srcpagesmyresumespagejsx)
5. [Design System & Configuration](#5-design-system--configuration)
   - [src/index.css](#srcindexcss)
   - [package.json](#packagejson)
   - [vite.config.js](#viteconfigjs)
   - [tailwind.config.js](#tailwindconfigjs)

---

# 1. Backend Services & Core

### `backend/server.js`
```javascript
import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

// Load environment variables from .env
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  console.log('🚀 Initializing AI Resume Generator Backend...');

  // Connect to MongoDB
  await connectDB();

  // Create Express App
  const app = createApp();

  const server = app.listen(PORT, () => {
    console.log(`✨ Server running on http://localhost:${PORT}`);
    console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 Clerk Auth: ${process.env.CLERK_SECRET_KEY ? 'Configured' : 'Missing CLERK_SECRET_KEY'}`);
    console.log(`🤖 Groq AI: ${process.env.GROQ_API_KEY ? 'Configured (' + (process.env.GROQ_MODEL || 'llama-3.3-70b-versatile') + ')' : 'Missing GROQ_API_KEY'}`);
  });

  // Graceful shutdown
  const handleShutdown = (signal) => {
    console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
};

startServer().catch((err) => {
  console.error('Fatal Server Boot Error:', err);
  process.exit(1);
});
```

### `backend/app.js`
```javascript
import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import resumeRoutes from './routes/resumeRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export const createApp = () => {
  const app = express();

  // CORS configuration
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
  ].filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(null, true);
      },
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
      maxAge: 86400
    })
  );

  // Body parsers with safe limits
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // 1. Diagnostic / Health Route (Public)
  app.use('/', healthRoutes);

  // 2. Clerk Global Auth Middleware
  if (process.env.CLERK_SECRET_KEY && process.env.CLERK_SECRET_KEY.trim()) {
    app.use(clerkMiddleware());
  }

  // 3. Mount Application Protected Resume Routes
  app.use('/', resumeRoutes);

  // 4. 404 & Centralized Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
```

### `backend/config/db.js`
```javascript
import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('⚠️ MONGODB_URI is not set in environment variables.');
    return null;
  }

  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    return null;
  }
};

export const getDBStatus = () => {
  if (!process.env.MONGODB_URI) return 'unconfigured';
  const state = mongoose.connection.readyState;
  switch (state) {
    case 0: return 'disconnected';
    case 1: return 'connected';
    case 2: return 'connecting';
    case 3: return 'disconnecting';
    default: return 'unknown';
  }
};
```

### `backend/middleware/authMiddleware.js`
```javascript
import { getAuth } from '@clerk/express';

export const requireClerkAuth = (req, res, next) => {
  if (!process.env.CLERK_SECRET_KEY || !process.env.CLERK_SECRET_KEY.trim()) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Authentication required. Server CLERK_SECRET_KEY is not configured.',
        code: 'UNAUTHORIZED'
      }
    });
  }

  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required. Please provide a valid Clerk authentication session token.',
          code: 'UNAUTHORIZED'
        }
      });
    }

    req.clerkUserId = auth.userId;
    req.clerkSessionId = auth.sessionId;
    next();
  } catch (error) {
    console.error('Clerk Auth Middleware Error:', error.message);
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid or expired authentication credentials.',
        code: 'INVALID_TOKEN'
      }
    });
  }
};
```

### `backend/models/Resume.js`
```javascript
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: [true, 'Clerk user ID is required'],
      index: true,
      trim: true
    },
    title: {
      type: String,
      default: 'Professional Resume',
      trim: true
    },
    targetRole: {
      type: String,
      default: '',
      trim: true
    },
    userEmail: {
      type: String,
      default: '',
      trim: true
    },
    resumeInput: {
      personalDetails: {
        fullName: { type: String, default: '' },
        targetRole: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        links: { type: String, default: '' }
      },
      objective: { type: String, default: '' },
      experience: { type: Array, default: [] },
      education: { type: Array, default: [] },
      skills: { type: Array, default: [] },
      projects: { type: Array, default: [] },
      certifications: { type: Array, default: [] },
      achievements: { type: Array, default: [] }
    },
    generatedResume: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Generated resume content is required']
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        return ret;
      }
    }
  }
);

resumeSchema.index({ clerkUserId: 1, createdAt: -1 });

export const Resume = mongoose.model('Resume', resumeSchema);
```

### `backend/services/groqService.js`
```javascript
import Groq from 'groq-sdk';

export class GroqService {
  constructor() {
    this.model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  }

  get client() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY is not configured in backend environment variables.');
    }
    return new Groq({ apiKey });
  }

  async generateResume(resumeInput) {
    const prompt = this.buildPrompt(resumeInput);

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are an elite Senior Executive Resume Writer and Applicant Tracking System (ATS) optimization specialist.
Your mission is to take raw candidate information and craft a compelling, high-impact, professional resume.

CRITICAL RULES:
1. DO NOT fabricate or invent qualifications, past companies, degrees, dates, awards, or factual experiences that the candidate did not provide.
2. Polish and enhance phrasing: Use strong action verbs (e.g., "Architected", "Spearheaded", "Streamlined", "Accelerated"), quantify impact where indicated, and eliminate weak passive phrasing.
3. Write a high-impact 2-4 sentence Professional Summary tailored precisely to the candidate's target job title.
4. Cleanly format work experience into crisp, impactful bullet points.
5. Return ONLY a valid JSON object matching the requested schema with no surrounding conversational text or markdown code fences.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 3000,
        response_format: { type: 'json_object' }
      });

      const rawContent = response.choices[0]?.message?.content;
      if (!rawContent || !rawContent.trim()) {
        throw new Error('Groq AI returned an empty completion.');
      }

      let parsed = JSON.parse(rawContent);
      return this.normalizeResumeOutput(parsed, resumeInput);
    } catch (error) {
      console.error('Groq AI Service Error:', error.message);
      throw error;
    }
  }

  buildPrompt(input) {
    const personal = input.personalDetails || {
      fullName: input.fullName || '',
      targetRole: input.targetRole || '',
      email: input.email || '',
      phone: input.phone || '',
      location: input.location || '',
      links: input.links || ''
    };

    return `Transform the following candidate data into a polished executive ATS resume in JSON format:
${JSON.stringify({ personalDetails: personal, input }, null, 2)}`;
  }

  normalizeResumeOutput(aiResult, originalInput) {
    return {
      personalDetails: aiResult.personalDetails || originalInput.personalDetails || {},
      objective: aiResult.objective || originalInput.objective || '',
      experience: Array.isArray(aiResult.experience) ? aiResult.experience : [],
      education: Array.isArray(aiResult.education) ? aiResult.education : [],
      skills: Array.isArray(aiResult.skills) ? aiResult.skills : [],
      projects: Array.isArray(aiResult.projects) ? aiResult.projects : [],
      certifications: Array.isArray(aiResult.certifications) ? aiResult.certifications : [],
      achievements: Array.isArray(aiResult.achievements) ? aiResult.achievements : []
    };
  }
}

export const groqService = new GroqService();
```

---

# 2. Frontend Architecture & State

### `src/main.jsx`
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { ToastProvider } from './context/ToastContext';
import { App } from './App';
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
const hasValidClerkKey = Boolean(
  clerkPublishableKey &&
  clerkPublishableKey !== 'pk_test_placeholder_key' &&
  clerkPublishableKey.startsWith('pk_')
);

const effectiveKey = clerkPublishableKey || 'pk_test_placeholder_key';

const clerkLocalization = {
  signIn: {
    start: {
      title: 'Sign in to ResuBloom',
      subtitle: 'to continue your career journey with ResuBloom'
    }
  },
  signUp: {
    start: {
      title: 'Create your ResuBloom account',
      subtitle: 'to begin crafting executive AI resumes'
    }
  }
};

const clerkAppearance = {
  variables: {
    colorPrimary: '#8b5cf6',
    colorTextSecondary: '#64748b',
    borderRadius: '0.75rem',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={effectiveKey}
      afterSignOutUrl="/"
      localization={clerkLocalization}
      appearance={clerkAppearance}
    >
      <BrowserRouter>
        <ToastProvider>
          <App hasValidClerkKey={hasValidClerkKey} />
        </ToastProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
```

### `src/services/api.js`
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const parseErrorResponse = async (response) => {
  try {
    const errorData = await response.json();
    return errorData.error?.message || errorData.message || `Request failed with status ${response.status}`;
  } catch {
    return `Server returned ${response.status} ${response.statusText}`;
  }
};

export const generateResume = async (resumeData, getToken) => {
  const token = getToken ? await getToken() : null;
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(resumeData),
  });

  if (!response.ok) {
    const message = await parseErrorResponse(response);
    throw new Error(message);
  }

  const result = await response.json();
  return result.data || result.resume || result;
};

export const getResumes = async (getToken) => {
  const token = getToken ? await getToken() : null;
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/getresumes`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const message = await parseErrorResponse(response);
    throw new Error(message);
  }

  const result = await response.json();
  return result.data || result.resumes || [];
};

export const deleteResume = async (resumeId, getToken) => {
  const token = getToken ? await getToken() : null;
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/deleteresume`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ id: resumeId }),
  });

  if (!response.ok) {
    const message = await parseErrorResponse(response);
    throw new Error(message);
  }

  return await response.json();
};

export const apiService = {
  generateResume,
  getResumes,
  deleteResume
};

export default apiService;
```

---

# 3. Frontend Aesthetic & UI Components

### `src/components/FloatingPetals.jsx`
```javascript
import React, { useMemo } from 'react';

export const FloatingPetals = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${(i * 4.6 + Math.random() * 3) % 100}%`,
      animationDuration: `${7 + (i % 6) * 2.2}s`,
      animationDelay: `${(i * 0.7) % 8}s`,
      size: 14 + (i % 4) * 6,
      opacity: 0.35 + (i % 5) * 0.12,
      petalType: i % 3,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="floating-petals-container no-print pointer-events-none fixed inset-0 overflow-hidden z-0"
      style={{ pointerEvents: 'none' }}
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal-particle absolute select-none"
          style={{
            left: p.left,
            top: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `petalFall ${p.animationDuration} linear infinite`,
            animationDelay: p.animationDelay,
            filter: 'drop-shadow(0 2px 4px rgba(244, 114, 182, 0.25))',
          }}
        >
          {p.petalType === 0 ? '🌸' : p.petalType === 1 ? '🌺' : '✨'}
        </span>
      ))}
    </div>
  );
};
```

### `src/components/Navbar.jsx`
```javascript
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Sparkles, FileText, Plus, FolderOpen, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="navbar no-print">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-brand" onClick={closeMobile}>
          <div className="nav-logo-icon">
            <span style={{ fontSize: '1.15rem' }}>🌸</span>
          </div>
          <span style={{ letterSpacing: '-0.03em' }}>
            Resu<span style={{ background: 'var(--aurora-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bloom</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>

            <SignedIn>
              <li>
                <NavLink to="/generate" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Plus size={15} />
                  <span>Create Resume</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-resumes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <FolderOpen size={15} />
                  <span>My Resumes</span>
                </NavLink>
              </li>
            </SignedIn>
          </ul>
        </nav>

        {/* User Authentication Actions */}
        <div className="nav-actions">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn btn-ghost btn-sm">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn btn-primary btn-sm">
                <Sparkles size={14} />
                <span>Get Started</span>
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
```

---

# 4. Configuration & Design System

### `src/index.css` (Extract)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --lavender-50: #faf5ff;
  --lavender-100: #f3e8ff;
  --lavender-200: #e9d5ff;
  --yellow-50: #fefce8;
  --yellow-100: #fef9c3;
  --yellow-200: #fef08a;
  --aurora-gradient: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%);
  --floral-gradient: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f3e8ff 100%);
}

.card-lavender {
  background: rgba(245, 243, 255, 0.88);
  backdrop-filter: blur(18px);
  border: 1.5px solid rgba(216, 180, 254, 0.6);
  border-radius: 18px;
  padding: 1.75rem;
}

.card-yellow {
  background: rgba(254, 252, 232, 0.9);
  backdrop-filter: blur(18px);
  border: 1.5px solid rgba(254, 240, 138, 0.7);
  border-radius: 18px;
  padding: 1.75rem;
}
```
