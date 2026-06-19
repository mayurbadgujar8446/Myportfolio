import React, { useState, useEffect, useRef } from "react";

// Design Tokens
const tokens = {
  colors: {
    bg: "#0a0a0f",
    surface: "#111118",
    card: "#16161f",
    border: "rgba(255,255,255,0.07)",
    accent: "#6366F1",
    accentAlt: "#818CF8",
    text: "#e2e0f0",
    muted: "#7a7890",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  fonts: {
    sans: "'Inter', sans-serif",
    mono: "'Fira Code', monospace",
  },
};

// DATA
const DATA = {
  name: "Mayur Ravindra Badgujar",
  title: "Data Science",
  tagline: "I build scalable web applications",
  location: "Post Fagne, Taluka Dhule, District Dhule, Maharashtra – 424301, India",
  email: "mayurbadgujar8446@gmail.com",
  phone: "+91 9359366578",
  profileImage: "/profile.jpg",
  resumeUrl: "/resume.pdf",
  
  social: [
    { name: "GitHub", url: "https://github.com/mayurbadgujar8446", icon: "GH" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mayurrbadgujar?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: "LI" },
    { name: "CodeChef", url: "https://www.codechef.com/users/mayur_badgujar", icon: "CC" },
  ],

  typewriterWords: ["Software Developer", "AI Enthusiast", "Data Science Learner", "Problem Solver", "Full-Stack Developer"],

  skills: [
    { name: "Python", level: 80 },
    { name: "MySQL", level: 80 },
    { name: "Data Science", level: 70 },
    { name: "Operating Systems", level: 70 },
    { name: "Web Development", level: 60 },
    { name: "Full-Stack Dev", level: 60 },
    { name: "Computer Networks", level: 50 },
  ],

projects: [
  {
    title: "Smart Canteen Management System",
    description: "A full-stack canteen management platform with OTP-based authentication, digital wallet functionality, order management, reward points, email bill generation, and an admin dashboard.",
    github: "https://github.com/mayurbadgujar8446/SmartCanteenManagementSystem",
    live: "Not Deployed",
    featured: true,
  },
  {
    title: "Multilingual Bot Assistant",
    description: "An AI-powered multilingual chatbot using NLP and semantic search to provide intelligent responses across multiple languages through an interactive chat interface.",
    github: "https://github.com/mayurbadgujar8446/Multilingual-Bot-Assistant",
    live: "Not Deployed",
    featured: true,
  },
  {
    title: "Task Management System",
    description: "A web-based task management application enabling users to create, organize, update, and monitor tasks efficiently through a responsive interface.",
    github: "https://github.com/mayurbadgujar8446/Task-Magament-System",
    live: "https://task-magament-system-production.up.railway.app/",
    featured: true,
  },
  {
    title: "Smart Task Scheduler",
    description: "An intelligent scheduling application using Greedy and Dynamic Programming algorithms to optimize task selection, maximize productivity, and manage work schedules.",
    github: "https://github.com/mayurbadgujar8446/TaskScheduler",
    live: "https://taskscheduler-production-dee3.up.railway.app/",
    featured: true,
  }
],

experience: [
  {
    title: "AI & Data Science Student",
    company: "Bachelor's Degree Program",
    period: "2023 – Present",
    description: "Pursuing a degree in Artificial Intelligence & Data Science with focus on machine learning, data analysis, and full-stack development.",
  },
  {
    title: "Full-Stack Developer",
    company: "Personal Projects",
    period: "2022 – Present",
    description: "Built 4+ production-ready applications combining AI, web development, and database management with Python, Flask, and MySQL.",
  },
  {
    title: "Competitive Programmer",
    company: "CodeChef",
    period: "2020 – Present",
    description: "Solved 2000+ coding challenges across Data Structures, Algorithms, and problem-solving paradigms.",
  },
],

  stats: [
    { label: "Projects Built", value: "4+" },
    { label: "Problems Solved", value: "2000+" },
    { label: "Year", value: "2nd" },
  ],

  // NEW: Testimonials
  testimonials: [
    {
      name: "Coming Soon",
      title: "Your testimonials here",
      quote: "Add testimonials from mentors, peers, or project collaborators.",
    },
  ],

  // NEW: Certifications
  certifications: [
    {
      name: "Update This",
      issuer: "Add your certifications",
      date: "Your cert date",
    },
  ],
};

// ============================================================================
// MAIN PORTFOLIO COMPONENT
// ============================================================================

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollTopRef = useRef(null);

  // ============================================================================
  // TYPEWRITER EFFECT
  // ============================================================================
  useEffect(() => {
    const interval = setInterval(() => {
      setTypewriterIndex((prev) => (prev + 1) % DATA.typewriterWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ============================================================================
  // SCROLL VISIBILITY & SCROLL-TO-TOP BUTTON
  // ============================================================================
  useEffect(() => {
    const handleScroll = () => {
      // Show scroll-to-top button
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Track visible sections for animations
      const sections = document.querySelectorAll("[data-section]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        if (isVisible) {
          setVisibleSections((prev) => ({
            ...prev,
            [section.id]: true,
          }));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================================================
  // FORM VALIDATION
  // ============================================================================
  const validateForm = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "Name is required";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!form.message.trim()) {
      errors.message = "Message cannot be empty";
    } else if (form.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  // ============================================================================
  // HANDLE FORM SUBMISSION
  // ============================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    // Validate
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);

    try {
      // Using Formspree
      const response = await fetch("https://formspree.io/f/maqzzgge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });

        // Auto-hide success message after 5 seconds
        setTimeout(() => setSent(false), 5000);
      } else {
        setFormErrors({ submit: "Failed to send message. Try again." });
      }
    } catch (err) {
      setFormErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // SMOOTH SCROLL TO SECTIONS
  // ============================================================================
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ============================================================================
  // CSS STYLES
  // ============================================================================
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: ${tokens.fonts.sans};
      background: ${tokens.colors.bg};
      color: ${tokens.colors.text};
      line-height: 1.6;
    }

    /* ANIMATIONS */
    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes gradShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    @keyframes cardHover {
      0% { transform: translateY(0px) rotateX(0deg); }
      100% { transform: translateY(-10px) rotateX(5deg); }
    }

    @keyframes skillFill {
      from { width: 0%; }
      to { width: var(--skill-level); }
    }

    @keyframes orbit {
      0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes spinLoader {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .fade-up {
      animation: fadeUp 0.6s ease-out forwards;
    }

    .visible { opacity: 1; }

    /* LAYOUT */
    body {
      overflow-x: hidden;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* NAVBAR */
    nav {
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(10px);
      background: rgba(10, 10, 15, 0.8);
      border-bottom: 1px solid ${tokens.colors.border};
      padding: 1rem 0;
    }

    nav .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-weight: 700;
      font-size: 1.2rem;
      color: ${tokens.colors.accent};
      font-family: ${tokens.fonts.mono};
    }

    nav ul {
      display: flex;
      list-style: none;
      gap: 2rem;
      align-items: center;
    }

    nav a {
      color: ${tokens.colors.text};
      text-decoration: none;
      font-size: 0.95rem;
      transition: color 0.3s;
      position: relative;
      cursor: pointer;
    }

    nav a::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${tokens.colors.accent};
      transition: width 0.3s;
    }

    nav a:hover::after {
      width: 100%;
    }

    .theme-toggle {
      background: ${tokens.colors.card};
      border: 1px solid ${tokens.colors.border};
      color: ${tokens.colors.text};
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      font-size: 1.2rem;
    }

    .theme-toggle:hover {
      background: ${tokens.colors.accent};
      transform: scale(1.1);
    }

    /* HERO SECTION */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      animation: fadeUp 0.8s ease-out;
    }

    .profile-pic {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 0 auto 2rem;
      border: 3px solid ${tokens.colors.accent};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 80px;
      background: ${tokens.colors.card};
      overflow: hidden;
      animation: float 3s ease-in-out infinite;
    }

    .profile-pic img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero h1 {
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 700;
      margin: 1rem 0;
      color: ${tokens.colors.text};
    }

    .typewriter {
      height: 1.5em;
      font-size: 1.5rem;
      color: ${tokens.colors.accent};
      font-weight: 600;
      min-width: 250px;
      display: inline-block;
    }

    .cursor {
      animation: blink 1s infinite;
    }

    .hero p {
      font-size: 1.1rem;
      color: ${tokens.colors.muted};
      margin-top: 1rem;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.8rem 2rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s;
      font-family: ${tokens.fonts.sans};
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
    }

    .btn-primary {
      background: ${tokens.colors.accent};
      color: white;
    }

    .btn-primary:hover {
      background: ${tokens.colors.accentAlt};
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    }

    .btn-secondary {
      background: ${tokens.colors.card};
      border: 1px solid ${tokens.colors.border};
      color: ${tokens.colors.text};
    }

    .btn-secondary:hover {
      background: ${tokens.colors.surface};
      border-color: ${tokens.colors.accent};
      transform: translateY(-2px);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* SECTIONS */
    section {
      padding: 5rem 0;
      border-top: 1px solid ${tokens.colors.border};
    }

    section h2 {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 700;
      margin-bottom: 3rem;
      text-align: center;
      background: linear-gradient(135deg, ${tokens.colors.accent}, ${tokens.colors.accentAlt});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* SKILLS SECTION */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .skill-item {
      animation: fadeUp 0.6s ease-out forwards;
      opacity: 0;
    }

    .skill-item:nth-child(1) { animation-delay: 0.1s; }
    .skill-item:nth-child(2) { animation-delay: 0.2s; }
    .skill-item:nth-child(3) { animation-delay: 0.3s; }
    .skill-item:nth-child(4) { animation-delay: 0.4s; }
    .skill-item:nth-child(5) { animation-delay: 0.5s; }
    .skill-item:nth-child(6) { animation-delay: 0.6s; }
    .skill-item:nth-child(7) { animation-delay: 0.7s; }

    .skill-name {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .skill-bar {
      height: 8px;
      background: ${tokens.colors.card};
      border-radius: 10px;
      overflow: hidden;
    }

    .skill-fill {
      height: 100%;
      background: linear-gradient(90deg, ${tokens.colors.accent}, ${tokens.colors.accentAlt});
      border-radius: 10px;
      --skill-level: var(--level);
      animation: skillFill 1s ease-out forwards;
    }

    /* PROJECTS SECTION */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background: ${tokens.colors.card};
      border: 1px solid ${tokens.colors.border};
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s;
      animation: fadeUp 0.6s ease-out forwards;
      opacity: 0;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .project-card:nth-child(1) { animation-delay: 0.1s; }
    .project-card:nth-child(2) { animation-delay: 0.2s; }
    .project-card:nth-child(3) { animation-delay: 0.3s; }
    .project-card:nth-child(4) { animation-delay: 0.4s; }

    .project-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }

    .project-card:hover {
      border-color: ${tokens.colors.accent};
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
    }

    .project-card:hover::before {
      opacity: 1;
    }

    .project-card h3 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
      color: ${tokens.colors.text};
    }

    .project-card p {
      color: ${tokens.colors.muted};
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }

    .project-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .project-links a {
      padding: 0.5rem 1rem;
      border: 1px solid ${tokens.colors.border};
      border-radius: 6px;
      color: ${tokens.colors.accent};
      text-decoration: none;
      font-size: 0.9rem;
      transition: all 0.3s;
    }

    .project-links a:hover {
      background: ${tokens.colors.accent};
      color: white;
    }

    /* EXPERIENCE SECTION */
    .timeline {
      position: relative;
      padding-left: 2rem;
    }

    .timeline::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, ${tokens.colors.accent}, transparent);
    }

    .timeline-item {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      animation: fadeUp 0.6s ease-out forwards;
      opacity: 0;
    }

    .timeline-item:nth-child(1) { animation-delay: 0.1s; }
    .timeline-item:nth-child(2) { animation-delay: 0.2s; }
    .timeline-item:nth-child(3) { animation-delay: 0.3s; }

    .timeline-item::before {
      content: "";
      position: absolute;
      left: -11px;
      top: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${tokens.colors.accent};
      border: 3px solid ${tokens.colors.bg};
      animation: pulse 2s infinite;
    }

    .timeline-item h3 {
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }

    .timeline-item .company {
      color: ${tokens.colors.accent};
      font-size: 0.95rem;
      font-weight: 600;
    }

    .timeline-item .period {
      color: ${tokens.colors.muted};
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .timeline-item p {
      color: ${tokens.colors.muted};
    }

    /* TESTIMONIALS SECTION */
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .testimonial-card {
      background: ${tokens.colors.card};
      border: 1px solid ${tokens.colors.border};
      border-radius: 12px;
      padding: 2rem;
      animation: fadeUp 0.6s ease-out forwards;
      opacity: 0;
      position: relative;
    }

    .testimonial-card:nth-child(1) { animation-delay: 0.1s; }
    .testimonial-card:nth-child(2) { animation-delay: 0.2s; }
    .testimonial-card:nth-child(3) { animation-delay: 0.3s; }

    .testimonial-card::before {
      content: '"';
      position: absolute;
      top: 10px;
      left: 15px;
      font-size: 4rem;
      color: ${tokens.colors.accent};
      opacity: 0.2;
    }

    .testimonial-quote {
      color: ${tokens.colors.text};
      font-size: 1rem;
      margin-bottom: 1.5rem;
      font-style: italic;
      line-height: 1.8;
    }

    .testimonial-author {
      color: ${tokens.colors.accent};
      font-weight: 600;
      margin-bottom: 0.3rem;
    }

    .testimonial-title {
      color: ${tokens.colors.muted};
      font-size: 0.9rem;
    }

    /* CERTIFICATIONS SECTION */
    .certifications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .cert-card {
      background: ${tokens.colors.card};
      border: 1px solid ${tokens.colors.border};
      border-radius: 12px;
      padding: 1.5rem;
      animation: fadeUp 0.6s ease-out forwards;
      opacity: 0;
      transition: all 0.3s;
    }

    .cert-card:nth-child(1) { animation-delay: 0.1s; }
    .cert-card:nth-child(2) { animation-delay: 0.2s; }
    .cert-card:nth-child(3) { animation-delay: 0.3s; }

    .cert-card:hover {
      border-color: ${tokens.colors.accent};
      transform: translateY(-5px);
    }

    .cert-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: ${tokens.colors.accent};
      margin-bottom: 0.5rem;
    }

    .cert-issuer {
      color: ${tokens.colors.text};
      margin-bottom: 0.3rem;
    }

    .cert-date {
      color: ${tokens.colors.muted};
      font-size: 0.9rem;
    }

    /* CONTACT SECTION */
    .contact-form {
      max-width: 600px;
      margin: 0 auto;
      background: ${tokens.colors.card};
      border: 1px solid ${tokens.colors.border};
      border-radius: 12px;
      padding: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
      animation: fadeUp 0.6s ease-out forwards;
      opacity: 0;
    }

    .form-group:nth-child(1) { animation-delay: 0.1s; }
    .form-group:nth-child(2) { animation-delay: 0.2s; }
    .form-group:nth-child(3) { animation-delay: 0.3s; }
    .form-group:nth-child(4) { animation-delay: 0.4s; }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: ${tokens.colors.text};
    }

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      background: ${tokens.colors.surface};
      border: 1px solid ${tokens.colors.border};
      border-radius: 8px;
      color: ${tokens.colors.text};
      font-family: ${tokens.fonts.sans};
      font-size: 1rem;
      transition: all 0.3s;
      resize: vertical;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: ${tokens.colors.accent};
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .error {
      border-color: ${tokens.colors.error} !important;
    }

    .error-message {
      color: ${tokens.colors.error};
      font-size: 0.85rem;
      margin-top: 0.3rem;
    }

    .success-message {
      background: ${tokens.colors.success};
      color: white;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      animation: slideDown 0.3s ease-out;
    }

    .form-error {
      background: ${tokens.colors.error};
      color: white;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      animation: slideDown 0.3s ease-out;
    }

    .loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spinLoader 0.6s linear infinite;
    }

    /* STATS SECTION */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
      text-align: center;
    }

    .stat {
      animation: fadeUp 0.6s ease-out forwards;
      opacity: 0;
    }

    .stat:nth-child(1) { animation-delay: 0.1s; }
    .stat:nth-child(2) { animation-delay: 0.2s; }
    .stat:nth-child(3) { animation-delay: 0.3s; }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: ${tokens.colors.accent};
    }

    .stat-label {
      color: ${tokens.colors.muted};
      font-size: 0.95rem;
    }

    /* FOOTER */
    footer {
      background: ${tokens.colors.surface};
      border-top: 1px solid ${tokens.colors.border};
      padding: 2rem;
      text-align: center;
      color: ${tokens.colors.muted};
    }

    footer a {
      color: ${tokens.colors.accent};
      text-decoration: none;
      transition: color 0.3s;
    }

    footer a:hover {
      color: ${tokens.colors.accentAlt};
    }

    /* SCROLL TO TOP BUTTON */
    .scroll-top-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      background: ${tokens.colors.accent};
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: all 0.3s;
      z-index: 40;
      animation: slideDown 0.3s ease-out;
    }

    .scroll-top-btn:hover {
      background: ${tokens.colors.accentAlt};
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
    }

    .scroll-top-btn:active {
      transform: translateY(0);
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      nav ul {
        gap: 1rem;
        font-size: 0.9rem;
      }

      .hero {
        padding: 2rem 1rem;
      }

      .cta-buttons {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }

      section {
        padding: 3rem 0;
      }

      .scroll-top-btn {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 45px;
        height: 45px;
      }

      input, textarea {
        font-size: 16px;
      }
    }

    @media (max-width: 480px) {
      .hero h1 {
        font-size: 1.8rem;
      }

      .typewriter {
        font-size: 1.2rem;
        min-width: 150px;
      }

      nav a {
        font-size: 0.85rem;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }

      .projects-grid,
      .testimonials-grid,
      .certifications-grid {
        grid-template-columns: 1fr;
      }

      section h2 {
        font-size: 1.5rem;
      }
    }
  `;

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div style={{ background: tokens.colors.bg, color: tokens.colors.text, minHeight: "100vh" }}>
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="logo" role="img" aria-label="MRB Logo">
            &lt;MRB /&gt;
          </div>
          <ul>
            <li>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection("skills"); }} role="button" tabIndex={0}>
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }} role="button" tabIndex={0}>
                Projects
              </a>
            </li>
            <li>
              <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection("experience"); }} role="button" tabIndex={0}>
                Experience
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} role="button" tabIndex={0}>
                Contact
              </a>
            </li>
            <li>
              <button
                className="theme-toggle"
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle dark mode"
                title="Toggle theme"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" data-section>
        <div className="hero-content">
          <div className="profile-pic" role="img" aria-label="Profile picture">
            <span>👤</span>
          </div>
          <h1>{DATA.name}</h1>
          <div className="typewriter">
            {DATA.typewriterWords[typewriterIndex]}
            <span className="cursor">|</span>
          </div>
          <p aria-label="Tagline">{DATA.tagline}</p>
          <div className="cta-buttons">
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection("contact")}
              aria-label="Scroll to contact form"
            >
              Let's Talk 💬
            </button>
            <a
              href={DATA.resumeUrl}
              download="resume.pdf"
              className="btn btn-secondary"
              aria-label="Download resume"
            >
              Download Resume 📄
            </a>
          </div>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
            {DATA.social.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${link.name}`}
                style={{
                  width: "40px",
                  height: "40px",
                  border: `1px solid ${tokens.colors.border}`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: tokens.colors.accent,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = tokens.colors.accent;
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = tokens.colors.accent;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "3rem 0", borderTop: `1px solid ${tokens.colors.border}` }}>
        <div className="container">
          <div className="stats-grid">
            {DATA.stats.map((stat, idx) => (
              <div key={idx} className="stat">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" data-section>
        <div className="container">
          <h2>Skills</h2>
          <div className="skills-grid">
            {DATA.skills.map((skill, idx) => (
              <div key={idx} className="skill-item">
                <div className="skill-name">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{ "--level": `${skill.level}%` } as React.CSSProperties}
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} skill level ${skill.level}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" data-section>
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {DATA.projects.map((project, idx) => (
              <div key={idx} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                    GitHub
                  </a>
                  <a href={project.live} className={project.live === "Not Deployed" ? "disabled" : ""} target={project.live !== "Not Deployed" ? "_blank" : undefined} rel={project.live !== "Not Deployed" ? "noopener noreferrer" : undefined} aria-label={`View ${project.title} live demo`} style={project.live === "Not Deployed" ? { opacity: 0.5, pointerEvents: "none" } : {}}>
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" data-section>
        <div className="container">
          <h2>Experience</h2>
          <div className="timeline">
            {DATA.experience.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <h3>{exp.title}</h3>
                <div className="company">{exp.company}</div>
                <div className="period">{exp.period}</div>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" data-section style={{ display: DATA.testimonials.length > 0 ? "block" : "none" }}>
        <div className="container">
          <h2>Testimonials</h2>
          <div className="testimonials-grid">
            {DATA.testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">{testimonial.name}</div>
                <div className="testimonial-title">{testimonial.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" data-section style={{ display: DATA.certifications.length > 0 ? "block" : "none" }}>
        <div className="container">
          <h2>Certifications</h2>
          <div className="certifications-grid">
            {DATA.certifications.map((cert, idx) => (
              <div key={idx} className="cert-card">
                <div className="cert-name">{cert.name}</div>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-date">{cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" data-section>
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-form">
            {sent && (
              <div className="success-message" role="status" aria-live="polite">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {formErrors.submit && (
              <div className="form-error" role="alert" aria-live="polite">
                ❌ {formErrors.submit}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
                  }}
                  className={formErrors.name ? "error" : ""}
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
                {formErrors.name && (
                  <div id="name-error" className="error-message">
                    {formErrors.name}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                  }}
                  className={formErrors.email ? "error" : ""}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
                {formErrors.email && (
                  <div id="email-error" className="error-message">
                    {formErrors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Your message (min 10 characters)"
                  rows={5}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (formErrors.message) setFormErrors({ ...formErrors, message: "" });
                  }}
                  className={formErrors.message ? "error" : ""}
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                ></textarea>
                {formErrors.message && (
                  <div id="message-error" className="error-message">
                    {formErrors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: "100%" }}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span> Sending...
                  </>
                ) : (
                  "Send Message 🚀"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

{/* FOOTER */}
<footer>
  <div className="container">
    <p>
      © {new Date().getFullYear()} {DATA.name} | Built with React & ❤️ |
      <a href={`mailto:${DATA.email}`} style={{ marginLeft: "0.5rem" }}>
        {DATA.email}
      </a>
    </p>
  </div>
</footer>

      {/* SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          ref={scrollTopRef}
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
