import React, { useState } from 'react';
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
  Download,
  Wand2,
  RefreshCw,
  Sliders,
  Palette,
  ShieldAlert,
  BarChart3,
  Bot
} from 'lucide-react';

export const HomePage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Interactive Showcase State
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('ai-rewrite');
  const [sampleIdx, setSampleIdx] = useState(0);
  const [activeThemeColor, setActiveThemeColor] = useState('#8b5cf6');

  // AI Rewrite Samples
  const rewriteSamples = [
    {
      role: 'Full-Stack Developer',
      before: 'I wrote React components and fixed bugs on the company website.',
      after: '• Engineered high-performance React & TypeScript micro-modules, resolving 45+ critical blockers and reducing initial bundle size by 32%.',
      impact: '+32% Faster Load Time'
    },
    {
      role: 'Product Manager',
      before: 'Managed team deadlines and helped launch the new client portal.',
      after: '• Spearheaded end-to-end delivery of the flagship client portal across 4 cross-functional squads, onboarding 120k+ active users within 60 days.',
      impact: '120k+ Active Users'
    },
    {
      role: 'Data Scientist',
      before: 'Analyzed database records and built machine learning models for predictions.',
      after: '• Architected predictive neural pipelines using Python & PyTorch, boosting customer churn forecasting precision to 94.8% across 1M+ records.',
      impact: '94.8% ML Precision'
    }
  ];

  const currentSample = rewriteSamples[sampleIdx];

  const handleNextSample = () => {
    setSampleIdx((prev) => (prev + 1) % rewriteSamples.length);
  };

  const themeOptions = [
    { name: 'Royal Lavender', color: '#8b5cf6', bg: 'rgba(243, 232, 255, 0.9)' },
    { name: 'Rose Blossom', color: '#ec4899', bg: 'rgba(253, 242, 248, 0.9)' },
    { name: 'Sunny Gold', color: '#ca8a04', bg: 'rgba(254, 249, 195, 0.9)' },
    { name: 'Botanical Sage', color: '#10b981', bg: 'rgba(236, 253, 245, 0.9)' },
    { name: 'Executive Indigo', color: '#4f46e5', bg: 'rgba(238, 242, 255, 0.9)' }
  ];

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
              background: 'rgba(250, 245, 255, 0.85)',
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(216, 180, 254, 0.5)',
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
              background: 'rgba(254, 252, 232, 0.85)',
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(254, 240, 138, 0.7)',
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
              background: 'rgba(250, 245, 255, 0.85)',
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(216, 180, 254, 0.5)',
              backdropFilter: 'blur(8px)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
              <span>Instant Groq AI Synthesis</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE RESUBLOOM FEATURE SHOWCASE (Tabs: AI Rewrite | ATS Match | Styling) */}
          {/* ========================================================================= */}
          <div style={{ marginTop: '4rem', position: 'relative' }}>
            <div className="glass-hero-card" style={{
              padding: '2rem',
              maxWidth: '860px',
              margin: '0 auto',
              textAlign: 'left',
              position: 'relative'
            }}>
              {/* Interactive Showcase Navigation Switcher Tabs */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1.5px solid rgba(216, 180, 254, 0.4)',
                paddingBottom: '1.25rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setActiveShowcaseTab('ai-rewrite')}
                    className="btn btn-sm"
                    style={{
                      background: activeShowcaseTab === 'ai-rewrite' ? 'var(--aurora-gradient)' : 'rgba(243, 232, 255, 0.8)',
                      color: activeShowcaseTab === 'ai-rewrite' ? '#fff' : '#6b21a8',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(216, 180, 254, 0.6)'
                    }}
                  >
                    <Wand2 size={14} />
                    <span>Live AI Rewriter</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveShowcaseTab('ats-score')}
                    className="btn btn-sm"
                    style={{
                      background: activeShowcaseTab === 'ats-score' ? 'var(--aurora-gradient)' : 'rgba(254, 249, 195, 0.8)',
                      color: activeShowcaseTab === 'ats-score' ? '#fff' : '#854d0e',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(254, 240, 138, 0.7)'
                    }}
                  >
                    <BarChart3 size={14} />
                    <span>ATS Keyword Radar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveShowcaseTab('styles')}
                    className="btn btn-sm"
                    style={{
                      background: activeShowcaseTab === 'styles' ? 'var(--aurora-gradient)' : 'rgba(243, 232, 255, 0.8)',
                      color: activeShowcaseTab === 'styles' ? '#fff' : '#6b21a8',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(216, 180, 254, 0.6)'
                    }}
                  >
                    <Palette size={14} />
                    <span>Palette Themes</span>
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span className="badge badge-lavender" style={{ fontSize: '0.75rem' }}>
                    <Bot size={12} /> Groq LLaMA 3.3 Versatile
                  </span>
                </div>
              </div>

              {/* TAB 1: LIVE AI REWRITER DEMONSTRATION */}
              {activeShowcaseTab === 'ai-rewrite' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#581c87', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Target Role:
                      </span>
                      <span className="badge badge-yellow" style={{ fontSize: '0.8125rem' }}>
                        {currentSample.role}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextSample}
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: '0.8125rem', color: '#7e22ce', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
                      title="Switch to another job profile"
                    >
                      <RefreshCw size={13} />
                      <span>Next Role Example</span>
                    </button>
                  </div>

                  {/* Before / After Split Boxes */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    {/* Before Card */}
                    <div style={{
                      background: 'rgba(254, 242, 242, 0.75)',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px dashed #fca5a5'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem', color: '#b91c1c', fontSize: '0.75rem', fontWeight: 700 }}>
                        <span>❌ RAW DRAFT INPUT</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#7f1d1d', fontStyle: 'italic', lineHeight: 1.5 }}>
                        "{currentSample.before}"
                      </p>
                    </div>

                    {/* After Card */}
                    <div style={{
                      background: 'rgba(236, 253, 245, 0.85)',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid #6ee7b7',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#047857', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Check size={14} /> RESUBLOOM AI SYNTHESIS
                        </span>
                        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                          {currentSample.impact}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#064e3b', fontWeight: 500, lineHeight: 1.55 }}>
                        {currentSample.after}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ATS KEYWORD RADAR & COMPLIANCE */}
              {activeShowcaseTab === 'ats-score' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div className="card-yellow" style={{ padding: '1.25rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#854d0e', lineHeight: 1 }}>99%</div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#713f12', marginTop: '0.25rem' }}>ATS Match Score</div>
                      <p style={{ fontSize: '0.75rem', color: '#854d0e', marginTop: '0.25rem' }}>Passes Taleo, Workday & Greenhouse parsers.</p>
                    </div>
                    <div className="card-lavender" style={{ padding: '1.25rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6b21a8', lineHeight: 1 }}>100%</div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#581c87', marginTop: '0.25rem' }}>Action Verb Density</div>
                      <p style={{ fontSize: '0.75rem', color: '#6b21a8', marginTop: '0.25rem' }}>Eliminates weak passive verbs automatically.</p>
                    </div>
                    <div className="card-lavender" style={{ padding: '1.25rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>0 Sec</div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#047857', marginTop: '0.25rem' }}>Recruiter Friction</div>
                      <p style={{ fontSize: '0.75rem', color: '#065f46', marginTop: '0.25rem' }}>Standardized typography & clean hierarchies.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PALETTE THEMES CUSTOMIZER */}
              {activeShowcaseTab === 'styles' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#581c87' }}>
                      Select an accent color theme to preview your resume branding:
                    </span>
                    <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                      {themeOptions.map((thm) => (
                        <button
                          key={thm.name}
                          type="button"
                          onClick={() => setActiveThemeColor(thm.color)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: thm.color,
                            border: activeThemeColor === thm.color ? '3px solid #fff' : '2px solid transparent',
                            boxShadow: activeThemeColor === thm.color ? `0 0 0 2px ${thm.color}` : 'none',
                            cursor: 'pointer',
                            transform: activeThemeColor === thm.color ? 'scale(1.15)' : 'scale(1)',
                            transition: 'all 0.2s ease'
                          }}
                          title={thm.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '1.25rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: `4px solid ${activeThemeColor}`,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.375rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>Executive Resume Layout</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: activeThemeColor, textTransform: 'uppercase' }}>Active Accent</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
                      Typography, section dividers, and skills badges dynamically style to your preferred brand aesthetic.
                    </p>
                  </div>
                </div>
              )}
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
