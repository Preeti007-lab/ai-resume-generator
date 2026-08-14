import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { GenerateResume } from './pages/GenerateResume';
import { MyResumesPage } from './pages/MyResumesPage';
import { AlertCircle, Key } from 'lucide-react';

export const App = ({ hasValidClerkKey }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Clerk Key Missing Warning Banner if applicable */}
      {!hasValidClerkKey && (
        <div
          role="alert"
          style={{
            backgroundColor: '#fffbeb',
            borderBottom: '1px solid #fde68a',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.625rem',
            color: '#92400e',
            fontSize: '0.875rem',
            fontWeight: 500,
            zIndex: 100
          }}
        >
          <Key size={16} style={{ flexShrink: 0 }} />
          <span>
            <strong>Clerk Setup:</strong> Please set your <code>VITE_CLERK_PUBLISHABLE_KEY</code> in <code>.env</code> with your Clerk publishable key.
          </span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar />

      {/* Main Application Routes */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route
            path="/generate"
            element={
              <ProtectedRoute>
                <GenerateResume />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-resumes"
            element={
              <ProtectedRoute>
                <MyResumesPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
