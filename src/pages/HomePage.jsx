import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, SignInButton, SignUpButton } from '@clerk/clerk-react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  FileCheck,
  CheckCircle,
  ArrowRight,
  Layers,
  Award,
  Users,
  Target
} from 'lucide-react';

export const HomePage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleStartGenerating = () => {
    if (isSignedIn) {
      navigate('/generate');
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        padding: '5rem 0 4rem',
        borderBottom: '1px solid var(--slate-200)'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '840px' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <span className="badge badge-primary" style={{ padding: '0.375rem 0.875rem', fontSize: '0.8125rem' }}>
              <Sparkles size={14} /> Next-Gen AI Resume Builder
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--slate-900)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Craft Executive, ATS-Ready Resumes with <span style={{
              background: 'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Artificial Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--slate-600)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 2.5rem'
          }}>
            Transform your skills and career history into a compelling, recruiter-approved resume in seconds. Powered by Groq AI and designed for high-impact hiring results.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {isSignedIn ? (
              <Link to="/generate" className="btn btn-primary btn-lg" id="home-cta-generate">
                <Sparkles size={20} />
                <span>Create Your AI Resume Now</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary btn-lg" id="home-cta-signup">
                    <Sparkles size={20} />
                    <span>Get Started Free</span>
                    <ArrowRight size={18} />
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="btn btn-secondary btn-lg" id="home-cta-signin">
                    Sign In
                  </button>
                </SignInButton>
              </>
            )}
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            color: 'var(--slate-500)',
            fontSize: '0.875rem'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <CheckCircle size={16} style={{ color: 'var(--success)' }} /> 100% Free to Use
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <CheckCircle size={16} style={{ color: 'var(--success)' }} /> ATS Optimized Formats
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <CheckCircle size={16} style={{ color: 'var(--success)' }} /> Instant Groq AI Generation
            </span>
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="container" style={{ padding: '5rem 1.5rem 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
            How It Works in 3 Simple Steps
          </h2>
          <p style={{ color: 'var(--slate-600)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto' }}>
            Go from raw experience notes to a polished executive resume in less than two minutes.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {/* Step 1 */}
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              fontSize: '1.25rem',
              fontWeight: 800
            }}>
              1
            </div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
              Enter Profile Details
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              Input your target job title, experience, education, skills, and projects into structured, easy fields.
            </p>
          </div>

          {/* Step 2 */}
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              fontSize: '1.25rem',
              fontWeight: 800
            }}>
              2
            </div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
              AI Synthesizes & Formats
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              Groq AI rewrites your accomplishments with action verbs, industry keywords, and ATS-friendly formatting.
            </p>
          </div>

          {/* Step 3 */}
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              fontSize: '1.25rem',
              fontWeight: 800
            }}>
              3
            </div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
              Store, Print & Share
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              Your resume is securely saved in your personal dashboard. Print directly to PDF or copy text anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section style={{ backgroundColor: 'var(--white)', padding: '5rem 0', borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              Engineered for Career Success
            </h2>
            <p style={{ color: 'var(--slate-600)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto' }}>
              Built specifically to pass Applicant Tracking Systems (ATS) and impress hiring managers.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            <div className="card card-hover" style={{ display: 'flex', gap: '1rem', padding: '1.75rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <Zap size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.0625rem', marginBottom: '0.375rem', color: 'var(--slate-900)' }}>
                  Lightning-Fast AI Generation
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                  Powered by Groq's high-speed inference, get tailored executive summaries and bullet points in seconds.
                </p>
              </div>
            </div>

            <div className="card card-hover" style={{ display: 'flex', gap: '1rem', padding: '1.75rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <Target size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.0625rem', marginBottom: '0.375rem', color: 'var(--slate-900)' }}>
                  ATS-Compliant Structure
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                  Clean typography, standardized section hierarchies, and readable layouts ensure automated systems score your resume high.
                </p>
              </div>
            </div>

            <div className="card card-hover" style={{ display: 'flex', gap: '1rem', padding: '1.75rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.0625rem', marginBottom: '0.375rem', color: 'var(--slate-900)' }}>
                  Secure Clerk Authentication
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                  Your personal career data and generated resumes are strictly isolated and protected under your authenticated account.
                </p>
              </div>
            </div>

            <div className="card card-hover" style={{ display: 'flex', gap: '1rem', padding: '1.75rem' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <Layers size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.0625rem', marginBottom: '0.375rem', color: 'var(--slate-900)' }}>
                  Saved Resumes Dashboard
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                  Store multiple versions tailored to different job applications. View, manage, and delete resumes on demand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="container" style={{ paddingTop: '4.5rem' }}>
        <div style={{
          background: 'var(--accent-gradient)',
          borderRadius: 'var(--radius-xl)',
          padding: '4rem 2rem',
          textAlign: 'center',
          color: 'var(--white)',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--white)', marginBottom: '1rem' }}>
            Ready to Land Your Dream Job?
          </h2>
          <p style={{ fontSize: '1.0625rem', opacity: 0.9, maxWidth: '580px', margin: '0 auto 2rem', color: '#e0e7ff' }}>
            Generate your resume in less than 2 minutes and take your job search to the next level.
          </p>

          {isSignedIn ? (
            <Link to="/generate" className="btn btn-secondary btn-lg" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              <Sparkles size={18} />
              Start Generating Resumes
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <button className="btn btn-secondary btn-lg" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                <Sparkles size={18} />
                Create Free Account
              </button>
            </SignUpButton>
          )}
        </div>
      </section>
    </div>
  );
};
