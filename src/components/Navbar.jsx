import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser
} from '@clerk/clerk-react';
import { Sparkles, FileText, Menu, X, PlusCircle, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const closeMobile = () => setMobileMenuOpen(false);

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

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Home
              </NavLink>
            </li>

            <SignedIn>
              <li>
                <NavLink
                  to="/generate"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Generate Resume
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-resumes"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  My Resumes
                </NavLink>
              </li>
            </SignedIn>
          </ul>
        </nav>

        {/* Auth Actions (Desktop) */}
        <div className="nav-actions">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn btn-ghost btn-sm" id="btn-signin">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn btn-primary btn-sm" id="btn-signup">
                Sign Up Free
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <Link to="/generate" className="btn btn-primary btn-sm">
                <PlusCircle size={15} />
                <span>New Resume</span>
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: {
                      width: 36,
                      height: 36,
                      border: '2px solid var(--primary-light)',
                    }
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav open">
          <NavLink
            to="/"
            onClick={closeMobile}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{ fontSize: '1.0625rem', padding: '0.5rem 0' }}
          >
            Home
          </NavLink>

          <SignedIn>
            <NavLink
              to="/generate"
              onClick={closeMobile}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ fontSize: '1.0625rem', padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <PlusCircle size={18} />
              Generate Resume
            </NavLink>
            <NavLink
              to="/my-resumes"
              onClick={closeMobile}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ fontSize: '1.0625rem', padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <LayoutDashboard size={18} />
              My Resumes
            </NavLink>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                {user?.primaryEmailAddress?.emailAddress || user?.fullName || 'Account'}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              <SignInButton mode="modal">
                <button className="btn btn-secondary" style={{ width: '100%' }} onClick={closeMobile}>
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={closeMobile}>
                  Sign Up Free
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      )}
    </header>
  );
};
