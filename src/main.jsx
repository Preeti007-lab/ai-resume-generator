import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { ToastProvider } from './context/ToastContext';
import { App } from './App';
import './index.css';

// Read Clerk Publishable Key from environment
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
const hasValidClerkKey = Boolean(
  clerkPublishableKey &&
  clerkPublishableKey !== 'pk_test_placeholder_key' &&
  clerkPublishableKey.startsWith('pk_')
);

// Fallback test key if none specified so that ClerkProvider initializes without throwing fatal error
const effectiveKey = clerkPublishableKey || 'pk_test_placeholder_key';

// Custom Clerk branding & localization overrides for ResuBloom
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
  },
  elements: {
    card: {
      boxShadow: '0 20px 35px -5px rgba(168, 85, 247, 0.15), 0 8px 15px -6px rgba(0, 0, 0, 0.08)',
      borderRadius: '1.25rem',
      border: '1.5px solid rgba(216, 180, 254, 0.6)',
      background: 'rgba(250, 245, 255, 0.98)'
    },
    headerTitle: {
      color: '#0f172a',
      fontWeight: '800'
    },
    formButtonPrimary: {
      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      '&:hover': {
        background: 'linear-gradient(135deg, #db2777 0%, #7c3aed 100%)'
      }
    }
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
