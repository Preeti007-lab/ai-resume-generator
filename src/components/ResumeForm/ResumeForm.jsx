import React, { useState } from 'react';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { ObjectiveSection } from './ObjectiveSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { CertificationsSection } from './CertificationsSection';
import { AchievementsSection } from './AchievementsSection';
import { Sparkles, Wand2, RotateCcw, FileCheck2, AlertCircle } from 'lucide-react';

const INITIAL_FORM_STATE = {
  fullName: '',
  targetRole: '',
  email: '',
  phone: '',
  location: '',
  links: '',
  objective: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: []
};

const SAMPLE_DATA = {
  fullName: 'Sarah Jenkins',
  targetRole: 'Senior Full Stack Software Engineer',
  email: 'sarah.jenkins@example.com',
  phone: '+1 (415) 890-1234',
  location: 'San Francisco, CA (Open to Remote)',
  links: 'github.com/sarahjenkins • linkedin.com/in/sarah-jenkins',
  objective: 'Passionate Senior Full Stack Engineer with 6+ years of experience designing, developing, and deploying resilient cloud-native applications. Expert in React, Node.js, and distributed architecture. Dedicated to building delightful user experiences and mentoring high-performing engineering teams.',
  experience: [
    {
      id: '1',
      role: 'Senior Software Engineer',
      company: 'Vanguard Cloud Technologies',
      location: 'San Francisco, CA',
      startDate: 'Mar 2022',
      endDate: 'Present',
      isCurrent: true,
      highlights: '• Architected a high-throughput microservices pipeline using Node.js, Kafka, and MongoDB processing 5M+ daily transactions.\n• Reduced page bundle sizes by 42% and improved Core Web Vitals to 98% through advanced React code-splitting and SSR.\n• Led cross-functional team of 6 engineers across bi-weekly sprints, improving delivery velocity by 25%.'
    },
    {
      id: '2',
      role: 'Full Stack Engineer',
      company: 'Apex Digital Solutions',
      location: 'Austin, TX',
      startDate: 'Jul 2019',
      endDate: 'Feb 2022',
      isCurrent: false,
      highlights: '• Built customer-facing dashboard with React, Redux, and Express, increasing user engagement by 30%.\n• Designed and maintained automated CI/CD pipelines with GitHub Actions and Docker reducing deployment defects by 50%.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Texas at Austin',
      degree: 'Bachelor of Science in Computer Science',
      graduationYear: '2015 - 2019',
      gpa: '3.88 / 4.0 (Dean\'s Honor List)'
    }
  ],
  skills: [
    'React', 'TypeScript', 'Node.js', 'Express', 'JavaScript (ES6+)',
    'MongoDB', 'PostgreSQL', 'Docker', 'AWS (S3, Lambda, ECS)',
    'GraphQL', 'RESTful APIs', 'Jest/Cypress', 'Git', 'CI/CD'
  ],
  projects: [
    {
      id: '1',
      name: 'OmniStream — Realtime Analytics Dashboard',
      techStack: 'React, TypeScript, WebSocket, Go, Redis',
      link: 'github.com/sarahjenkins/omnistream',
      description: 'Engineered an open-source real-time event analytics dashboard visualizing millions of streaming metrics with sub-100ms latency.'
    },
    {
      id: '2',
      name: 'DevPulse — AI Code Review Bot',
      techStack: 'Node.js, Groq API, GitHub Webhooks, Tailwind CSS',
      link: 'github.com/sarahjenkins/devpulse-bot',
      description: 'Created a automated GitHub bot that performs context-aware code reviews, saving engineering teams 4+ hours per week.'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      year: '2023'
    },
    {
      id: '2',
      name: 'Meta Certified Front-End Developer',
      issuer: 'Meta / Coursera',
      year: '2022'
    }
  ],
  achievements: [
    'Winner of 2023 Cloud Innovation Hackathon among 300+ international developers',
    'Published technical article on Micro-Frontends read by 45k+ engineers on Medium',
    'Mentor for Women in Tech mentorship cohort, guiding 8 junior developers into software roles'
  ]
};

export const ResumeForm = ({ onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName || !formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.targetRole || !formData.targetRole.trim()) {
      newErrors.targetRole = 'Target Job Title is required';
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadSample = () => {
    setFormData(SAMPLE_DATA);
    setErrors({});
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear the entire form?')) {
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Top Helper Bar with Quick Sample Filler */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        padding: '0.875rem 1.25rem',
        backgroundColor: 'var(--slate-100)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--slate-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--slate-700)' }}>
          <Sparkles size={16} style={{ color: 'var(--primary)' }} />
          <span>Fill in your details below or load sample data to test AI generation.</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleLoadSample}
            className="btn btn-secondary btn-sm"
            style={{ backgroundColor: 'var(--white)' }}
          >
            <Wand2 size={14} style={{ color: 'var(--accent)' }} />
            Load Sample Profile
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--slate-500)' }}
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      {/* Validation Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--danger-light)',
            border: '1px solid #fca5a5',
            borderRadius: 'var(--radius-md)',
            color: 'var(--danger)',
            fontSize: '0.875rem',
            marginBottom: '1.5rem'
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Please correct the following errors:</p>
            <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
              {Object.values(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Form Sections */}
      <PersonalDetailsSection data={formData} onChange={setFormData} errors={errors} />
      <ObjectiveSection data={formData} onChange={setFormData} errors={errors} />
      <ExperienceSection data={formData} onChange={setFormData} />
      <EducationSection data={formData} onChange={setFormData} />
      <SkillsSection data={formData} onChange={setFormData} />
      <ProjectsSection data={formData} onChange={setFormData} />
      <CertificationsSection data={formData} onChange={setFormData} />
      <AchievementsSection data={formData} onChange={setFormData} />

      {/* Bottom Sticky Submission Banner */}
      <div style={{
        position: 'sticky',
        bottom: '1rem',
        zIndex: 30,
        marginTop: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--slate-200)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--slate-900)', marginBottom: '0.125rem' }}>Ready to transform your profile?</h4>
          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
            AI will optimize your phrasing, ATS scoring, and executive formatting.
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={isGenerating}
          id="btn-generate-resume"
          style={{ minWidth: '220px' }}
        >
          <Sparkles size={18} />
          {isGenerating ? 'Generating Resume...' : 'Generate AI Resume'}
        </button>
      </div>
    </form>
  );
};
