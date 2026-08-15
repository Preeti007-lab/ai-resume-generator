import React from 'react';
import { Sparkles, Shield, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="no-print" style={{
      marginTop: 'auto',
      backgroundColor: 'rgba(250, 245, 255, 0.92)',
      backdropFilter: 'blur(16px)',
      borderTop: '1.5px solid rgba(216, 180, 254, 0.4)',
      padding: '2.5rem 0 1.5rem',
      fontSize: '0.875rem',
      color: 'var(--slate-600)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(216, 180, 254, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div className="nav-logo-icon" style={{ width: 30, height: 30 }}>
              <span style={{ fontSize: '1rem' }}>🌸</span>
            </div>
            <span style={{ fontWeight: 800, color: 'var(--slate-900)', fontSize: '1.0625rem', letterSpacing: '-0.02em' }}>
              Resu<span style={{ background: 'var(--aurora-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bloom</span>
            </span>
            <span style={{ color: 'var(--slate-500)', fontSize: '0.8125rem' }}>— AI Resume & Career Engine</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#854d0e', background: 'rgba(254, 249, 195, 0.8)', padding: '0.25rem 0.625rem', borderRadius: '999px', fontSize: '0.8125rem', fontWeight: 600 }}>
              <Zap size={13} style={{ color: '#ca8a04' }} /> Powered by Groq AI
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#6b21a8', background: 'rgba(243, 232, 255, 0.8)', padding: '0.25rem 0.625rem', borderRadius: '999px', fontSize: '0.8125rem', fontWeight: 600 }}>
              <Shield size={13} style={{ color: '#9333ea' }} /> Clerk Auth Secured
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
          <p>© {new Date().getFullYear()} ResuBloom. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link to="/" style={{ color: 'var(--lavender-800)', fontWeight: 500 }}>Home</Link>
            <Link to="/generate" style={{ color: 'var(--lavender-800)', fontWeight: 500 }}>Generate</Link>
            <Link to="/my-resumes" style={{ color: 'var(--lavender-800)', fontWeight: 500 }}>My Resumes</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
