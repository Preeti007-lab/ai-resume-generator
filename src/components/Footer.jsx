import React from 'react';
import { Sparkles, Shield, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="no-print" style={{
      marginTop: 'auto',
      backgroundColor: 'var(--white)',
      borderTop: '1px solid var(--slate-200)',
      padding: '2.5rem 0 1.5rem',
      fontSize: '0.875rem',
      color: 'var(--slate-500)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--slate-100)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div className="nav-logo-icon" style={{ width: 28, height: 28 }}>
              <Sparkles size={16} />
            </div>
            <span style={{ fontWeight: 700, color: 'var(--slate-800)', fontSize: '1rem' }}>
              Resume<span style={{ color: 'var(--primary)' }}>AI</span>
            </span>
            <span style={{ color: 'var(--slate-400)' }}>— Gen-AI Resume Builder</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--slate-600)' }}>
              <Zap size={14} style={{ color: 'var(--warning)' }} /> Powered by Groq AI
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--slate-600)' }}>
              <Shield size={14} style={{ color: 'var(--success)' }} /> Clerk Auth Secured
            </span>
          </div>
        </div>

        <div style={{
          paddingTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8125rem'
        }}>
          <p>© {new Date().getFullYear()} ResumeAI Generator. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link to="/" style={{ color: 'var(--slate-500)' }}>Home</Link>
            <Link to="/generate" style={{ color: 'var(--slate-500)' }}>Generate</Link>
            <Link to="/my-resumes" style={{ color: 'var(--slate-500)' }}>My Resumes</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
