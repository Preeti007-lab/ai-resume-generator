import React from 'react';
import { useAuth, SignInButton } from '@clerk/clerk-react';
import { LoadingSpinner } from './UI/LoadingSpinner';
import { Lock, LogIn, Sparkles } from 'lucide-react';

export const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // If Clerk is still resolving authentication state
  if (!isLoaded) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner message="Verifying authentication..." size={32} />
      </div>
    );
  }

  // If user is not authenticated, show sign-in gate
  if (!isSignedIn) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card animate-fade-in" style={{ maxWidth: '480px', width: '100%', textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Lock size={28} />
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--slate-900)' }}>
            Authentication Required
          </h2>
          <p style={{ color: 'var(--slate-600)', fontSize: '0.9375rem', marginBottom: '2rem', lineHeight: 1.5 }}>
            Please sign in to your account with Clerk to generate AI resumes and manage your saved documents.
          </p>

          <SignInButton mode="modal">
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              <LogIn size={18} />
              <span>Sign In with Clerk</span>
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return children;
};
