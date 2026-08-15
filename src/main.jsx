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

// Custom Clerk branding & localization overrides
const clerkLocalization = {
  signIn: {
    start: {
      title: 'Sign in to Resume AI Builder',
      subtitle: 'to continue to Resume AI Builder'
    }
  },
  signUp: {
    start: {
      title: 'Create your account',
      subtitle: 'to get started with Resume AI Builder'
    }
  }
};

const clerkAppearance = {
  variables: {
    colorPrimary: '#4f46e5',
    colorTextSecondary: '#64748b',
    borderRadius: '0.75rem',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  },
  elements: {
    card: {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      borderRadius: '1rem'
    },
    headerTitle: {
      color: '#0f172a',
      fontWeight: '700'
    },
    formButtonPrimary: {
      backgroundColor: '#4f46e5',
      '&:hover': {
        backgroundColor: '#4338ca'
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
