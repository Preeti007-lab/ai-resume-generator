import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, SignInButton, SignUpButton } from '@clerk/clerk-react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Award,
  Users,
  Target,
  FileText,
  Star,
  Check,
  TrendingUp,
  Cpu,
  Lock,
  Download
} from 'lucide-react';

export const HomePage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '5rem' }}>
      {/* Background Aurora Glow Spheres & Geometric Grid Mesh */}
      <div className="mesh-bg-grid" />
      <div className="aurora-sphere aurora-sphere-1" />
      <div className="aurora-sphere aurora-sphere-2" />
      <div className="aurora-sphere aurora-sphere-3" />

      {/* Hero Section */}
      <section style={{ padding: '4.5rem 0 3.5rem', position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '960px' }}>
          
          {/* Top Pill Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            <span className="badge badge-aurora" style={{
              padding: '0.45rem 1.15rem',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 16px rgba(236, 72, 153, 0.18)'
            }}>
              <span>🌸</span>
              <span>ResuBloom • Next-Gen AI Career Engine</span>
              <span style={{
                background: 'var(--aurora-gradient)',
                color: '#fff',
                padding: '0.1rem 0.5rem',
                borderRadius: '999px',
                fontSize: '0.7rem',
                fontWeight: 700
              }}>v2.0</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: 'var(--slate-900)',
            marginBottom: '1.5rem',
            lineHeight: 1.12
          }}>
            Craft Executive, ATS-Ready Resumes with{' '}
            <span style={{
              background: 'var(--aurora-gradient-2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Artificial Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
            color: 'var(--slate-600)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
            maxWidth: '720px',
            margin: '0 auto 2.5rem'
          }}>
            Transform your skills and career history into a high-impact, recruiter-approved resume in seconds. Powered by Groq AI and formatted for elite corporate screening.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            {isSignedIn ? (
              <Link to="/generate" className="btn btn-primary btn-lg" id="home-cta-generate" style={{ padding: '0.95rem 2rem', fontSize: '1.0625rem' }}>
                <Sparkles size={20} />
                <span>Create Your AI Resume Now</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary btn-lg" id="home-cta-signup" style={{ padding: '0.95rem 2rem', fontSize: '1.0625rem' }}>
                    <Sparkles size={20} />
                    <span>Get Started Free</span>
                    <ArrowRight size={18} />
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="btn btn-secondary btn-lg" id="home-cta-signin" style={{ padding: '0.95rem 1.75rem' }}>
                    Sign In
                  </button>
                </SignInButton>
              </>
            )}
          </div>

          {/* Feature Highlights Pills */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            color: 'var(--slate-600)',
            fontSize: '0.875rem',
            fontWeight: 500
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.75)',
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--slate-200)',
              backdropFilter: 'blur(8px)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
              <span>100% Free to Use</span>
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.75)',
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--slate-200)',
              backdropFilter: 'blur(8px)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
              <span>99% ATS Pass Rate</span>
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.75)',
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--slate-200)',
              backdropFilter: 'blur(8px)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
              <span>Instant Groq AI Synthesis</span>
            </div>
          </div>

          {/* Interactive Live Mockup Showcase Card */}
          <div style={{ marginTop: '4rem', position: 'relative' }}>
            <div className="glass-hero-card" style={{
              padding: '2.5rem 2rem',
              maxWidth: '820px',
              margin: '0 auto',
              textAlign: 'left',
              position: 'relative'
            }}>
              {/* Top Mockup Status Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--slate-200)',
                paddingBottom: '1.25rem',
                marginBottom: '1.75rem',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--aurora-gradient)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                  }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0 }}>
                      Alex Morgan
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600, margin: 0 }}>
                      Senior Full-Stack Engineer & AI Specialist
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                    <Check size={12} /> ATS Score: 98/100
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                    <Sparkles size={12} /> AI Enhanced
                  </span>
                </div>
              </div>

              {/* Sample Resume Preview Lines */}
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Executive Summary
                  </span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)', marginTop: '0.25rem', lineHeight: 1.55 }}>
                    Accomplished Full-Stack Engineer with 6+ years specializing in distributed cloud infrastructure, microservices, and React ecosystems. Spearheaded architecture migrations resulting in 40% latency reduction.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'rgba(238, 242, 255, 0.6)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(199, 210, 254, 0.6)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>⚡ CORE EXPERTISE</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--slate-700)' }}>React • Node.js • TypeScript • Cloud Architecture</div>
                  </div>
                  <div style={{ background: 'rgba(236, 253, 245, 0.6)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(167, 243, 208, 0.6)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)', marginBottom: '0.25rem' }}>🎯 KEY IMPACT</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--slate-700)' }}>Scaled enterprise platform from 10k to 500k active users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="container" style={{ padding: '5rem 1.5rem 3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge badge-primary" style={{ fontSize: '0.8rem' }}>
              <TrendingUp size={13} /> Simplified Workflow
            </span>
          </div>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
            How It Works in 3 Simple Steps
          </h2>
          <p style={{ color: 'var(--slate-600)', fontSize: '1.0625rem', maxWidth: '560px', margin: '0 auto' }}>
            Go from raw experience notes to a polished executive resume in less than two minutes.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {/* Step 1: Light Lavender Card */}
          <div className="card-lavender" style={{ padding: '2.25rem 2rem', textAlign: 'center' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(233, 213, 255, 0.95)',
              color: '#7e22ce',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.35rem',
              fontWeight: 800,
              border: '1.5px solid rgba(216, 180, 254, 0.9)',
              boxShadow: '0 4px 12px rgba(168, 85, 247, 0.18)'
            }}>
              1
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.625rem', color: '#581c87' }}>
              Enter Profile Details
            </h3>
            <p style={{ fontSize: '0.9375rem', color: '#6b21a8', lineHeight: 1.6 }}>
              Input your target job title, career history, education, skills, and key projects into structured fields.
            </p>
          </div>

          {/* Step 2: Light Yellow Card */}
          <div className="card-yellow" style={{ padding: '2.25rem 2rem', textAlign: 'center' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(254, 240, 138, 0.95)',
              color: '#854d0e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.35rem',
              fontWeight: 800,
              border: '1.5px solid rgba(253, 224, 71, 0.9)',
              boxShadow: '0 4px 12px rgba(234, 179, 8, 0.18)'
            }}>
              2
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.625rem', color: '#713f12' }}>
              AI Synthesizes & Formats
            </h3>
            <p style={{ fontSize: '0.9375rem', color: '#854d0e', lineHeight: 1.6 }}>
              Groq AI rewrites your accomplishments with action verbs, industry keywords, and ATS-friendly formatting.
            </p>
          </div>

          {/* Step 3: Light Lavender Card */}
          <div className="card-lavender" style={{ padding: '2.25rem 2rem', textAlign: 'center' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(233, 213, 255, 0.95)',
              color: '#7e22ce',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.35rem',
              fontWeight: 800,
              border: '1.5px solid rgba(216, 180, 254, 0.9)',
              boxShadow: '0 4px 12px rgba(168, 85, 247, 0.18)'
            }}>
              3
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.625rem', color: '#581c87' }}>
              Store, Print & Share
            </h3>
            <p style={{ fontSize: '0.9375rem', color: '#6b21a8', lineHeight: 1.6 }}>
              Your resume is securely stored in your personal dashboard. Print directly to PDF or copy text anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge badge-lavender" style={{ fontSize: '0.8rem' }}>
              <Cpu size={13} /> Enterprise Quality
            </span>
          </div>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
            Engineered for Career Success
          </h2>
          <p style={{ color: 'var(--slate-600)', fontSize: '1.0625rem', maxWidth: '600px', margin: '0 auto' }}>
            Built specifically to pass Applicant Tracking Systems (ATS) and impress hiring managers.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {/* Feature 1: Lavender Card */}
          <div className="card-lavender" style={{ display: 'flex', gap: '1.25rem', padding: '2rem' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(233, 213, 255, 0.95)',
              color: '#7e22ce',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(168, 85, 247, 0.18)'
            }}>
              <Zap size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.375rem', color: '#581c87' }}>
                Lightning-Fast AI Generation
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#6b21a8', lineHeight: 1.55 }}>
                Powered by Groq's high-speed inference, get tailored executive summaries and bullet points in seconds.
              </p>
            </div>
          </div>

          {/* Feature 2: Yellow Card */}
          <div className="card-yellow" style={{ display: 'flex', gap: '1.25rem', padding: '2rem' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(254, 240, 138, 0.95)',
              color: '#854d0e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(234, 179, 8, 0.18)'
            }}>
              <Target size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.375rem', color: '#713f12' }}>
                ATS-Compliant Structure
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#854d0e', lineHeight: 1.55 }}>
                Clean typography, standardized section hierarchies, and readable layouts ensure automated systems score your resume high.
              </p>
            </div>
          </div>

          {/* Feature 3: Lavender Card */}
          <div className="card-lavender" style={{ display: 'flex', gap: '1.25rem', padding: '2rem' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(233, 213, 255, 0.95)',
              color: '#7e22ce',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(168, 85, 247, 0.18)'
            }}>
              <Lock size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.375rem', color: '#581c87' }}>
                Secure Clerk Authentication
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#6b21a8', lineHeight: 1.55 }}>
                Your personal career data and generated resumes are strictly isolated and protected under your authenticated account.
              </p>
            </div>
          </div>

          {/* Feature 4: Yellow Card */}
          <div className="card-yellow" style={{ display: 'flex', gap: '1.25rem', padding: '2rem' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(254, 240, 138, 0.95)',
              color: '#854d0e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(234, 179, 8, 0.18)'
            }}>
              <Layers size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.375rem', color: '#713f12' }}>
                Saved Resumes Dashboard
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#854d0e', lineHeight: 1.55 }}>
                Store multiple versions tailored to different job applications. View, manage, and delete resumes on demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Radiant CTA Banner */}
      <section className="container" style={{ paddingTop: '3rem' }}>
        <div style={{
          background: 'var(--aurora-gradient)',
          borderRadius: 'var(--radius-xl)',
          padding: '4.5rem 2rem',
          textAlign: 'center',
          color: 'var(--white)',
          boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}>
          {/* Subtle Ambient Radial Glow inside CTA */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--white)', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
            Ready to Land Your Dream Job?
          </h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.95, maxWidth: '600px', margin: '0 auto 2.5rem', color: '#f1f5f9', position: 'relative', zIndex: 1 }}>
            Generate your executive resume in less than 2 minutes and take your career search to the next level.
          </p>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {isSignedIn ? (
              <Link to="/generate" className="btn btn-secondary btn-lg" style={{ color: 'var(--primary)', fontWeight: 700, padding: '1rem 2.25rem', fontSize: '1.0625rem' }}>
                <Sparkles size={18} />
                <span>Start Generating Resumes</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <SignUpButton mode="modal">
                <button className="btn btn-secondary btn-lg" style={{ color: 'var(--primary)', fontWeight: 700, padding: '1rem 2.25rem', fontSize: '1.0625rem' }}>
                  <Sparkles size={18} />
                  <span>Create Free Account</span>
                  <ArrowRight size={18} />
                </button>
              </SignUpButton>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
