import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import {
  Sparkles,
  User,
  Briefcase,
  Wrench,
  GraduationCap,
  FolderGit2,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  ChevronLeft,
  Wand2,
  RotateCcw,
  Printer,
  Copy,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Trophy,
  ZoomIn,
  ZoomOut,
  Palette,
  Eye,
  AlertCircle,
  FileText
} from 'lucide-react';
import { generateResume } from '../services/api';
import { useToast } from '../context/ToastContext';
import { GenerationProgress } from '../components/UI/LoadingSpinner';

const INITIAL_DATA = {
  fullName: '',
  targetRole: '',
  email: '',
  phone: '',
  location: '',
  links: '',
  objective: '',
  experience: [
    {
      id: '1',
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      highlights: ''
    }
  ],
  skills: [],
  education: [
    {
      id: '1',
      institution: '',
      degree: '',
      graduationYear: '',
      gpa: ''
    }
  ],
  projects: []
};

const SAMPLE_DATA = {
  fullName: 'Sarah Jenkins',
  targetRole: 'Senior Full Stack Software Engineer',
  email: 'sarah.jenkins@example.com',
  phone: '+1 (415) 890-1234',
  location: 'San Francisco, CA',
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
  skills: [
    'React', 'TypeScript', 'Node.js', 'Express', 'JavaScript (ES6+)',
    'MongoDB', 'PostgreSQL', 'Docker', 'AWS (S3, Lambda, ECS)',
    'GraphQL', 'RESTful APIs', 'Jest/Cypress', 'Git', 'CI/CD'
  ],
  education: [
    {
      id: '1',
      institution: 'University of Texas at Austin',
      degree: 'Bachelor of Science in Computer Science',
      graduationYear: '2015 - 2019',
      gpa: '3.88 / 4.0'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'OmniStream — Realtime Analytics Dashboard',
      techStack: 'React, TypeScript, WebSocket, Redis',
      link: 'github.com/sarahjenkins/omnistream',
      description: 'Engineered an open-source real-time event analytics dashboard visualizing millions of streaming metrics with sub-100ms latency.'
    }
  ]
};

const POPULAR_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'Next.js',
  'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'GraphQL', 'Git', 'REST APIs', 'Java'
];

const THEMES = [
  { id: 'indigo', name: 'Executive Indigo', primary: '#4f46e5', light: '#eef2ff', border: '#c7d2fe' },
  { id: 'slate', name: 'Modern Slate', primary: '#0f172a', light: '#f1f5f9', border: '#cbd5e1' },
  { id: 'emerald', name: 'Classic Emerald', primary: '#059669', light: '#ecfdf5', border: '#a7f3d0' },
  { id: 'rose', name: 'Vibrant Rose', primary: '#e11d48', light: '#fff1f2', border: '#fecdd3' }
];

export const GenerateResume = () => {

  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [skillInput, setSkillInput] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [zoomScale, setZoomScale] = useState(1);
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [copied, setCopied] = useState(false);

  // Field change handlers
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Experience handlers
  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          role: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          highlights: ''
        }
      ]
    }));
  };

  const handleRemoveExperience = (idx) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx)
    }));
  };

  const handleExperienceChange = (idx, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.experience];
      updated[idx] = { ...updated[idx], [field]: value };
      if (field === 'isCurrent' && value === true) {
        updated[idx].endDate = 'Present';
      }
      return { ...prev, experience: updated };
    });
  };

  // Skill handlers
  const handleAddSkill = (e) => {
    e?.preventDefault();
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    const items = trimmed.split(',').map((s) => s.trim()).filter((s) => s && !formData.skills.includes(s));
    if (items.length > 0) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, ...items] }));
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  const handleQuickAddSkill = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  // Education handlers
  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          institution: '',
          degree: '',
          graduationYear: '',
          gpa: ''
        }
      ]
    }));
  };

  const handleRemoveEducation = (idx) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx)
    }));
  };

  const handleEducationChange = (idx, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.education];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, education: updated };
    });
  };

  // Projects handlers
  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now().toString(),
          name: '',
          techStack: '',
          link: '',
          description: ''
        }
      ]
    }));
  };

  const handleRemoveProject = (idx) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
  };

  const handleProjectChange = (idx, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.projects];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  // Validation
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.targetRole.trim()) newErrors.targetRole = 'Target Job Title is required';
      if (!formData.email.trim()) newErrors.email = 'Email address is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleLoadSample = () => {
    setFormData(SAMPLE_DATA);
    setErrors({});
    showSuccess('Sample professional profile loaded!');
  };

  const handleReset = () => {
    if (window.confirm('Clear all resume information?')) {
      setFormData(INITIAL_DATA);
      setErrors({});
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Copy Plain Text
  const handleCopyText = () => {
    let text = `${formData.fullName || 'Candidate Name'}\n${formData.targetRole || ''}\n${formData.email} | ${formData.phone} | ${formData.location}\n\n`;
    if (formData.objective) text += `OBJECTIVE / SUMMARY\n${formData.objective}\n\n`;
    if (formData.experience?.length > 0) {
      text += `WORK EXPERIENCE\n`;
      formData.experience.forEach((e) => {
        if (e.role || e.company) {
          text += `${e.role} — ${e.company} (${e.startDate} - ${e.endDate || 'Present'})\n${e.highlights}\n\n`;
        }
      });
    }
    if (formData.skills?.length > 0) {
      text += `SKILLS\n${formData.skills.join(', ')}\n\n`;
    }
    if (formData.education?.length > 0) {
      text += `EDUCATION\n`;
      formData.education.forEach((ed) => {
        if (ed.institution || ed.degree) {
          text += `${ed.degree}, ${ed.institution} (${ed.graduationYear})\n`;
        }
      });
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showSuccess('Resume text copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Generate with Backend AI
  const handleGenerateAI = async () => {
    if (!validateStep(1)) {
      setActiveStep(1);
      showError('Please complete your Personal Details before generating.');
      return;
    }

    setIsGenerating(true);
    setGenerationStep(0);

    const t1 = setTimeout(() => setGenerationStep(1), 600);
    const t2 = setTimeout(() => setGenerationStep(2), 1400);
    const t3 = setTimeout(() => setGenerationStep(3), 2200);

    try {
      const token = await getToken();
      const payload = {
        ...formData,
        userId: user?.id,
        userEmail: user?.primaryEmailAddress?.emailAddress || formData.email
      };

      const response = await generateResume(payload, token);
      const generated = response.resume || response.data || response;

      // Update form with AI enriched data if structured response returned
      if (generated && typeof generated === 'object') {
        const raw = generated.data || generated;
        setFormData((prev) => ({
          ...prev,
          fullName: raw.fullName || raw.personalDetails?.fullName || prev.fullName,
          targetRole: raw.targetRole || raw.personalDetails?.targetRole || prev.targetRole,
          objective: raw.objective || raw.summary || prev.objective,
          experience: Array.isArray(raw.experience) && raw.experience.length > 0 ? raw.experience : prev.experience,
          skills: Array.isArray(raw.skills) && raw.skills.length > 0 ? raw.skills : prev.skills
        }));
      }

      showSuccess('Resume successfully synthesized with AI and saved to dashboard!');
    } catch (err) {
      console.error('Generation failed:', err);
      showError(err.message || 'Failed to generate resume with AI.');
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setIsGenerating(false);
    }
  };

  // Steps definition
  const steps = [
    { id: 1, title: 'Personal Info', icon: User, desc: 'Contact & Summary' },
    { id: 2, title: 'Experience', icon: Briefcase, desc: 'Career History' },
    { id: 3, title: 'Skills', icon: Wrench, desc: 'Core Competencies' },
    { id: 4, title: 'Education & More', icon: GraduationCap, desc: 'Degrees & Projects' }
  ];

  return (
    <div className="min-h-screen pb-16 pt-6 relative z-10">
      {/* Top Header Controls Bar */}
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 mb-6 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-md">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50/90 border border-indigo-100/90 text-xs font-semibold text-indigo-700 mb-1.5">
              <Sparkles size={12} className="text-indigo-600" />
              <span>Interactive Multi-Step Builder</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              ResuBloom • AI Resume Creator & Live Mockup
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white/90 hover:bg-white text-slate-700 transition border border-slate-200 shadow-xs hover:shadow-sm"
              title="Load prefilled sample software developer profile"
            >
              <Wand2 size={15} className="text-indigo-600" />
              <span>Load Sample Profile</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-100/80 text-slate-500 transition border border-transparent"
              title="Clear all fields"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition shadow-md hover:shadow-lg disabled:opacity-60 transform hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              <span>{isGenerating ? 'Synthesizing...' : 'Generate with AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left Form Steps | Right Paper Mockup */}
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Loading overlay if generating */}
        {isGenerating && (
          <div className="mb-6 no-print">
            <GenerationProgress currentStep={generationStep} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: MULTI-STEP RESUME BUILDER PANEL (5/12 or 6/12 on large screens) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6 no-print">
            {/* Step Navigation Tabs with Light Lavender & Yellow Tones */}
            <div className="bg-gradient-to-r from-purple-100/90 via-yellow-50/90 to-purple-100/90 backdrop-blur-xl p-2 sm:p-3 rounded-2xl border border-purple-200/80 shadow-md flex items-center justify-between gap-1.5 overflow-x-auto">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                const isPassed = activeStep > step.id;
                // Alternating lavender and soft sunny yellow theme for tabs
                const isYellow = idx % 2 === 1;

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      if (activeStep === 1 && !validateStep(1) && step.id > 1) return;
                      setActiveStep(step.id);
                    }}
                    className={`flex-1 min-w-[90px] sm:min-w-[110px] flex flex-col items-center py-2.5 px-2 rounded-xl text-center transition-all ${isActive
                      ? isYellow
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md font-bold'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-bold'
                      : isPassed
                        ? isYellow
                          ? 'bg-yellow-100/90 text-yellow-900 border border-yellow-200/90 hover:bg-yellow-200'
                          : 'bg-purple-100/90 text-purple-900 border border-purple-200/90 hover:bg-purple-200'
                        : isYellow
                          ? 'bg-yellow-50/80 text-yellow-800 border border-yellow-200/50 hover:bg-yellow-100/80'
                          : 'bg-purple-50/80 text-purple-800 border border-purple-200/50 hover:bg-purple-100/80'
                      }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Icon size={16} className={isActive ? (isYellow ? 'text-amber-950' : 'text-white') : isYellow ? 'text-yellow-700' : 'text-purple-700'} />
                      <span className="text-xs font-bold uppercase tracking-wider">Step {step.id}</span>
                    </div>
                    <span className="text-xs truncate max-w-full font-medium">{step.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Step Form Content Cards */}
            <div className="bg-purple-50/85 backdrop-blur-xl rounded-2xl border border-purple-200/70 shadow-md p-6 sm:p-7 flex flex-col">
              {/* STEP 1: PERSONAL INFO */}
              {activeStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <User size={20} className="text-indigo-600" />
                      Personal & Contact Information
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Enter your identification details, contact channels, and executive target title.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handlePersonalChange}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border ${errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                          } focus:outline-none focus:ring-4 transition text-slate-800`}
                      />
                      {errors.fullName && <p className="text-xs text-red-500 font-medium mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Target Job Title */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Target Job Title / Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="targetRole"
                        value={formData.targetRole}
                        onChange={handlePersonalChange}
                        placeholder="e.g. Senior Full Stack Software Engineer"
                        className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border ${errors.targetRole ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                          } focus:outline-none focus:ring-4 transition text-slate-800`}
                      />
                      {errors.targetRole && <p className="text-xs text-red-500 font-medium mt-1">{errors.targetRole}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handlePersonalChange}
                        placeholder="sarah.jenkins@example.com"
                        className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                          } focus:outline-none focus:ring-4 transition text-slate-800`}
                      />
                      {errors.email && <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePersonalChange}
                        placeholder="+1 (415) 890-1234"
                        className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition text-slate-800"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Location / City
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handlePersonalChange}
                        placeholder="San Francisco, CA"
                        className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition text-slate-800"
                      />
                    </div>

                    {/* Links */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        LinkedIn / Portfolio URL
                      </label>
                      <input
                        type="text"
                        name="links"
                        value={formData.links}
                        onChange={handlePersonalChange}
                        placeholder="linkedin.com/in/username"
                        className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition text-slate-800"
                      />
                    </div>

                    {/* Summary / Objective */}
                    <div className="sm:col-span-2 mt-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Career Objective & Summary
                        </label>
                        <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          Groq AI Polished
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        name="objective"
                        value={formData.objective}
                        onChange={handlePersonalChange}
                        placeholder="Passionate engineer with expertise in modern web frameworks, cloud deployments, and designing scalable architectures..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition text-slate-800 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: EXPERIENCE */}
              {activeStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Briefcase size={20} className="text-indigo-600" />
                        Work Experience
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Add past and current roles starting with the most recent.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition"
                    >
                      <Plus size={14} /> Add Role
                    </button>
                  </div>

                  {formData.experience.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                      <p className="text-sm text-slate-500 mb-3">No work history added yet.</p>
                      <button
                        type="button"
                        onClick={handleAddExperience}
                        className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50"
                      >
                        + Add First Position
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.experience.map((exp, idx) => (
                        <div
                          key={exp.id || idx}
                          className="bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3 relative group"
                        >
                          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                            <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                              Position #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveExperience(idx)}
                              className="text-slate-400 hover:text-red-500 p-1 transition"
                              title="Delete position"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                                Job Title
                              </label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                                placeholder="e.g. Senior Software Engineer"
                                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                                Company
                              </label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                                placeholder="e.g. Acme Corp"
                                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                                Start Date
                              </label>
                              <input
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)}
                                placeholder="e.g. Mar 2022"
                                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                                End Date
                              </label>
                              <input
                                type="text"
                                value={exp.isCurrent ? 'Present' : exp.endDate}
                                disabled={exp.isCurrent}
                                onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)}
                                placeholder="e.g. Dec 2023 or Present"
                                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none disabled:bg-slate-100"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="checkbox"
                              id={`curr-role-${idx}`}
                              checked={!!exp.isCurrent}
                              onChange={(e) => handleExperienceChange(idx, 'isCurrent', e.target.checked)}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`curr-role-${idx}`} className="text-xs text-slate-700 cursor-pointer font-medium">
                              I currently work in this position
                            </label>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                              Key Highlights & Impact (Bullet Points)
                            </label>
                            <textarea
                              rows={3}
                              value={exp.highlights}
                              onChange={(e) => handleExperienceChange(idx, 'highlights', e.target.value)}
                              placeholder="• Spearheaded microservices migration improving throughput by 40%&#10;• Mentored 4 junior engineers on distributed systems"
                              className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none leading-relaxed"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: SKILLS */}
              {activeStep === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Wrench size={20} className="text-indigo-600" />
                      Skills & Technologies
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Add programming languages, frameworks, developer tools, and domain proficiencies.
                    </p>
                  </div>

                  {/* Add skill input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Add Custom Skill
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        placeholder="Type skill & hit Enter (e.g. React, Docker, Python)"
                        className="flex-1 px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition shadow-xs"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Active Skill Chips */}
                  <div>
                    <span className="block text-xs font-semibold text-slate-700 mb-2">
                      Selected Skills ({formData.skills.length}):
                    </span>
                    {formData.skills.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No skills added yet. Select from suggestions below or type your own.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-indigo-400 hover:text-indigo-800 transition"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Popular Suggestions */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Popular Tech Stack Suggestions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SKILLS.map((skill) => {
                        const isAdded = formData.skills.includes(skill);
                        if (isAdded) return null;
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleQuickAddSkill(skill)}
                            className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200 transition"
                          >
                            + {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: EDUCATION & PROJECTS */}
              {activeStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Education Section */}
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                      <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                        <GraduationCap size={18} className="text-indigo-600" />
                        Education
                      </h2>
                      <button
                        type="button"
                        onClick={handleAddEducation}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        <Plus size={13} /> Add Degree
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.education.map((edu, idx) => (
                        <div key={edu.id || idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-600">Degree #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveEducation(idx)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
                              placeholder="University / College Name"
                              className="px-3 py-1.5 text-xs sm:text-sm bg-white rounded-lg border border-slate-200"
                            />
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                              placeholder="Degree & Major (e.g. B.S. Computer Science)"
                              className="px-3 py-1.5 text-xs sm:text-sm bg-white rounded-lg border border-slate-200"
                            />
                            <input
                              type="text"
                              value={edu.graduationYear}
                              onChange={(e) => handleEducationChange(idx, 'graduationYear', e.target.value)}
                              placeholder="Year / Duration (e.g. 2018 - 2022)"
                              className="px-3 py-1.5 text-xs sm:text-sm bg-white rounded-lg border border-slate-200"
                            />
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) => handleEducationChange(idx, 'gpa', e.target.value)}
                              placeholder="GPA / Honors (Optional)"
                              className="px-3 py-1.5 text-xs sm:text-sm bg-white rounded-lg border border-slate-200"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                      <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                        <FolderGit2 size={18} className="text-indigo-600" />
                        Key Projects
                      </h2>
                      <button
                        type="button"
                        onClick={handleAddProject}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        <Plus size={13} /> Add Project
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.projects.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No projects added yet.</p>
                      ) : (
                        formData.projects.map((proj, idx) => (
                          <div key={proj.id || idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-600">Project #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveProject(idx)}
                                className="text-slate-400 hover:text-red-500"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={proj.name}
                                onChange={(e) => handleProjectChange(idx, 'name', e.target.value)}
                                placeholder="Project Name"
                                className="px-3 py-1.5 text-xs sm:text-sm bg-white rounded-lg border border-slate-200"
                              />
                              <input
                                type="text"
                                value={proj.techStack}
                                onChange={(e) => handleProjectChange(idx, 'techStack', e.target.value)}
                                placeholder="Tech Stack (e.g. React, Next.js, Node)"
                                className="px-3 py-1.5 text-xs sm:text-sm bg-white rounded-lg border border-slate-200"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={proj.description}
                              onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                              placeholder="Project description and key metrics..."
                              className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white rounded-lg border border-slate-200"
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step Navigation Controls (Prev / Next) */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeStep === 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                {activeStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
                  >
                    <span>Next Step</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition"
                  >
                    <Sparkles size={16} />
                    <span>Generate AI Resume</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: BLANK SHEET PAPER MOCKUP TEMPLATE (7/12 on large screens) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4">
            {/* Paper Mockup Controls Bar (Hidden during print) */}
            <div className="bg-gradient-to-r from-purple-50/90 via-yellow-50/90 to-purple-50/90 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border border-purple-200/80 shadow-md flex flex-wrap items-center justify-between gap-3 no-print">
              {/* Palette / Theme Selector */}
              <div className="flex items-center gap-2">
                <Palette size={16} className="text-slate-500" />
                <span className="text-xs font-semibold text-slate-600">Style:</span>
                <div className="flex items-center gap-1.5">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme)}
                      className={`w-6 h-6 rounded-full border-2 transition ${selectedTheme.id === theme.id ? 'scale-110 shadow-sm ring-2 ring-indigo-300' : 'opacity-70 hover:opacity-100'
                        }`}
                      style={{ backgroundColor: theme.primary, borderColor: '#ffffff' }}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons: Copy Text & Print PDF */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  title="Copy plain text"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition"
                  title="Print or export to PDF"
                >
                  <Printer size={14} />
                  <span>Print / PDF</span>
                </button>
              </div>
            </div>

            {/* The White Paper Canvas Container */}
            <div className="relative overflow-hidden flex justify-center bg-slate-200/50 p-2 sm:p-6 rounded-2xl border border-slate-300/80 shadow-inner">
              {/* Realistic A4 White Paper Canvas */}
              <div
                id="resume-mockup-paper"
                className="w-full max-w-[800px] min-h-[960px] bg-white text-slate-800 p-8 sm:p-12 rounded-lg shadow-2xl transition-all font-sans leading-relaxed"
                style={{
                  boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.15), 0 5px 15px -3px rgba(0, 0, 0, 0.08)',
                  borderTop: `4px solid ${selectedTheme.primary}`
                }}
              >
                {/* 1. Header & Contact Details */}
                <div className="border-b-2 pb-5 mb-6" style={{ borderColor: '#0f172a' }}>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {formData.fullName || <span className="text-slate-300 font-normal">Candidate Name</span>}
                  </h1>

                  <div className="text-sm font-semibold tracking-wide mt-0.5" style={{ color: selectedTheme.primary }}>
                    {formData.targetRole || <span className="text-slate-300 font-normal">Target Job Title</span>}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-2.5 font-medium">
                    {formData.email ? (
                      <span className="inline-flex items-center gap-1">
                        <Mail size={12} className="text-slate-400" />
                        {formData.email}
                      </span>
                    ) : (
                      <span className="text-slate-300 inline-flex items-center gap-1">
                        <Mail size={12} /> email@example.com
                      </span>
                    )}

                    {formData.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone size={12} className="text-slate-400" />
                        {formData.phone}
                      </span>
                    )}

                    {formData.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        {formData.location}
                      </span>
                    )}

                    {formData.links && (
                      <span className="inline-flex items-center gap-1">
                        <Globe size={12} className="text-slate-400" />
                        {formData.links}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Professional Summary Section */}
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2 flex items-center gap-1.5">
                    <User size={13} style={{ color: selectedTheme.primary }} />
                    Professional Summary
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {formData.objective || (
                      <span className="text-slate-300 italic">
                        Your synthesized career summary and executive profile statement will appear here...
                      </span>
                    )}
                  </p>
                </div>

                {/* 3. Work Experience Section */}
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3 flex items-center gap-1.5">
                    <Briefcase size={13} style={{ color: selectedTheme.primary }} />
                    Work Experience
                  </h2>

                  {formData.experience.filter((e) => e.role || e.company || e.highlights).length === 0 ? (
                    <div className="text-xs text-slate-300 italic py-2">
                      Roles, dates, company names, and bulleted accomplishments will be listed here...
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.experience.map((exp, idx) => {
                        if (!exp.role && !exp.company && !exp.highlights) return null;
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex flex-wrap justify-between items-baseline gap-1 text-xs">
                              <div>
                                <span className="font-bold text-slate-900 text-sm">
                                  {exp.role || 'Role Title'}
                                </span>
                                <span className="text-slate-600 font-medium"> — {exp.company || 'Company'}</span>
                                {exp.location && <span className="text-slate-400"> ({exp.location})</span>}
                              </div>
                              <span className="text-slate-500 font-medium">
                                {exp.startDate || ''} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                              </span>
                            </div>

                            {exp.highlights && (
                              <div className="text-xs text-slate-600 pl-4 mt-1 leading-relaxed">
                                {exp.highlights.includes('\n') || exp.highlights.includes('•') ? (
                                  <ul className="list-disc space-y-1">
                                    {exp.highlights
                                      .split('\n')
                                      .map((l) => l.replace(/^•\s*/, '').trim())
                                      .filter(Boolean)
                                      .map((line, i) => (
                                        <li key={i}>{line}</li>
                                      ))}
                                  </ul>
                                ) : (
                                  <p>{exp.highlights}</p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 4. Skills Section */}
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5 flex items-center gap-1.5">
                    <Wrench size={13} style={{ color: selectedTheme.primary }} />
                    Skills & Technical Expertise
                  </h2>
                  {formData.skills.length === 0 ? (
                    <div className="text-xs text-slate-300 italic">
                      Added skills, frameworks, and tools will be displayed in ATS-optimized pills...
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {formData.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Education Section */}
                {formData.education.some((ed) => ed.institution || ed.degree) && (
                  <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2 flex items-center gap-1.5">
                      <GraduationCap size={13} style={{ color: selectedTheme.primary }} />
                      Education
                    </h2>
                    <div className="space-y-2">
                      {formData.education.map((edu, idx) => {
                        if (!edu.institution && !edu.degree) return null;
                        return (
                          <div key={idx} className="flex justify-between items-baseline text-xs">
                            <div>
                              <span className="font-bold text-slate-900">{edu.degree || 'Degree'}</span>
                              <span className="text-slate-600">, {edu.institution || 'University'}</span>
                              {edu.gpa && <span className="text-slate-400"> (GPA: {edu.gpa})</span>}
                            </div>
                            <span className="text-slate-500 font-medium">{edu.graduationYear}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 6. Projects Section */}
                {formData.projects.some((p) => p.name || p.description) && (
                  <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2 flex items-center gap-1.5">
                      <FolderGit2 size={13} style={{ color: selectedTheme.primary }} />
                      Projects
                    </h2>
                    <div className="space-y-2.5">
                      {formData.projects.map((proj, idx) => {
                        if (!proj.name && !proj.description) return null;
                        return (
                          <div key={idx} className="text-xs space-y-0.5">
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold text-slate-900">{proj.name}</span>
                              {proj.techStack && (
                                <span className="text-[11px] font-medium text-indigo-600">
                                  [{proj.techStack}]
                                </span>
                              )}
                            </div>
                            {proj.description && <p className="text-slate-600">{proj.description}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateResume;
