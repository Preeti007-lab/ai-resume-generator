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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={effectiveKey} afterSignOutUrl="/">
      <BrowserRouter>
        <ToastProvider>
          <App hasValidClerkKey={hasValidClerkKey} />
        </ToastProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
