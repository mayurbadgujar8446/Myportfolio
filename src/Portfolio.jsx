import { useState, useEffect, useRef } from "react";

// ─── MAYUR'S COMPLETE PORTFOLIO DATA ───
const DATA = {
  name: "Mayur Ravindra Badgujar",
  title: "Data Science",
  tagline: "I build scalable web applications",
  profileImage: "/profileImage.jpeg",

  about: `I am a motivated Artificial Intelligence and Data Science student with a strong passion for technology, problem-solving, and innovation. I have developed solid programming skills in Python and data analysis tools such as NumPy and Pandas, enabling me to work effectively with data-driven applications and AI-related projects.

In addition to my AI and data science background, I am proficient in full-stack web development, with experience building responsive and user-friendly web applications using HTML, CSS, Node.js, Express.js, and MySQL. I also possess a strong foundation in Data Structures and Algorithms, demonstrated by solving over 1,500 coding problems on competitive programming platforms.`,

  links: {
    github: "https://github.com/mayurbadgujar8446",
    linkedin: "https://www.linkedin.com/in/mayurrbadgujar?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    codechef: "https://www.codechef.com/users/mayur_badgujar",
    email: "mayurbadgujar8446@gmail.com",
    phone: "9359366578",
    resume: "/MayurResume.pdf",
    location: "Post Fagne, Dhule, Maharashtra – 424301, India",
  },

  skills: [
    { name: "Python",                  level: 80 },
    { name: "MySQL",                   level: 75 },
    { name: "Data Science",            level: 60 },
    { name: "Operating Systems Basic", level: 65 },
    { name: "Web Development",         level: 60 },
    { name: "Full-Stack Dev",          level: 60 },
    { name: "Computer Networks Basic", level: 50 },
  ],

  projects: [
    {
      title: "Smart Canteen Management System",
      description: "A full-stack canteen management platform with OTP-based authentication, digital wallet functionality, order management, reward points, email bill generation, and an admin dashboard.",
      tags: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/mayurbadgujar8446/SmartCanteenManagementSystem",
      live: "Not Deployed",
    },
    {
      title: "Multilingual Bot Assistant",
      description: "An AI-powered multilingual chatbot using NLP and semantic search to provide intelligent responses across multiple languages through an interactive chat interface.",
      tags: ["Python", "Flask", "PyTorch", "NLP", "Sentence Transformers"],
      github: "https://github.com/mayurbadgujar8446/Multilingual-Bot-Assistant",
      live: "Not Deployed",
    },
    {
      title: "Task Management System",
      description: "A web-based task management application enabling users to create, organize, update, and monitor tasks efficiently through a responsive interface.",
      tags: ["Python", "Flask", "SQLite", "Bootstrap", "JavaScript"],
      github: "https://github.com/mayurbadgujar8446/Task-Magament-System",
      live: "https://task-magament-system-production.up.railway.app/",
    },
    {
      title: "Smart Task Scheduler",
      description: "An intelligent scheduling application using Greedy and Dynamic Programming algorithms to optimize task selection, maximize productivity, and manage work schedules.",
      tags: ["Python", "Flask", "Algorithms", "JavaScript"],
      github: "https://github.com/mayurbadgujar8446/TaskScheduler",
      live: "https://taskscheduler-production-dee3.up.railway.app/",
    },
  ],

  experience: [
    {
      role: "AI & Data Science Student",
      company: "Bachelor's Degree Program",
      period: "2024 – Present",
      desc: "Pursuing a degree in Artificial Intelligence & Data Science with focus on machine learning, data analysis, and full-stack development.",
    },
    {
      role: "Full-Stack Developer",
      company: "Personal Projects",
      period: "2025 – Present",
      desc: "Built 4+ production-ready applications combining AI, web development, and database management with Python, Flask, and MySQL.",
    },
    {
      role: "Competitive Programmer",
      company: "CodeChef",
      period: "2024 – Present",
      desc: "Solved 1500+ coding challenges across Data Structures, Algorithms, and problem-solving paradigms.",
    },
  ],

  stats: [
    { num: "4+", label: "Projects built" },
    { num: "1500+", label: "Problems solved" },
    { num: "3rd year", label: "AI & Data Science student" },
  ],

  contactHeading: "Let's connect",
  contactText: `I am always open to discussing new opportunities, innovative projects, and collaborations in Artificial Intelligence, Data Science, and Full-Stack Development. Whether you have a project idea, a job opportunity, or simply want to connect, feel free to reach out. I'll do my best to respond as soon as possible.`,
};

// ── Theme tokens ──
const fontSans = "'IBM Plex Sans', 'Segoe UI', sans-serif";
const fontMono = "'IBM Plex Mono', monospace";

const themes = {
  dark: {
    bg: "#0f1419",
    surface: "#151b22",
    card: "#1a222b",
    border: "rgba(255,255,255,0.10)",
    accent: "#2dd4bf",
    accentAlt: "#5eead4",
    onAccent: "#0f1419",
    text: "#e6edf3",
    muted: "#8b98a5",
    fontSans,
    fontMono,
  },
  light: {
    bg: "#f8fafb",
    surface: "#eef2f4",
    card: "#ffffff",
    border: "rgba(0,0,0,0.12)",
    accent: "#0f766e",
    accentAlt: "#14b8a6",
    onAccent: "#ffffff",
    text: "#14202b",
    muted: "#55636f",
    fontSans,
    fontMono,
  },
};

// Pushes the active theme into CSS variables so the injected stylesheet follows it
const applyTheme = (t) => {
  const root = document.documentElement;
  root.style.setProperty("--bg", t.bg);
  root.style.setProperty("--surface", t.surface);
  root.style.setProperty("--card", t.card);
  root.style.setProperty("--border", t.border);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-alt", t.accentAlt);
  root.style.setProperty("--on-accent", t.onAccent);
  root.style.setProperty("--text", t.text);
  root.style.setProperty("--muted", t.muted);
};

// ── Stylesheet injection (runs once) ──
const injectKeyframes = () => {
  if (document.getElementById("pf-keyframes")) return;
  const style = document.createElement("style");
  style.id = "pf-keyframes";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: ${fontSans}; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes blink  { 0%,100% { opacity:1; } 50% { opacity:0; } }
    @keyframes spin   { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }

    .fade-up { animation: fadeUp 0.6s ease both; }

    a:focus-visible, button:focus-visible, .input-field:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .nav-link { color: var(--muted); text-decoration:none; font-size:14px; transition:color 0.2s; }
    .nav-link:hover { color: var(--text); }

    .btn-primary {
      background: var(--accent);
      color: var(--on-accent);
      border: 1.5px solid var(--accent);
      border-radius: 6px;
      padding: 12px 28px;
      font-size: 15px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    .btn-primary:disabled { cursor: not-allowed; }

    .btn-outline {
      background: transparent;
      color: var(--accent);
      border: 1.5px solid var(--accent);
      border-radius: 6px;
      padding: 11px 26px;
      font-size: 15px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }

    .card { transition: border-color 0.2s; }
    .card:hover { border-color: var(--accent) !important; }

    .skill-bar-fill {
      height: 100%;
      border-radius: 3px;
      background: var(--accent);
      transition: width 1s ease;
    }

    .tag {
      color: var(--muted);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 3px 10px;
      font-size: 12px;
      font-family: ${fontMono};
    }

    .input-field {
      background: var(--bg);
      border: 1.5px solid var(--border);
      border-radius: 6px;
      color: var(--text);
      padding: 12px 16px;
      font-size: 15px;
      font-family: ${fontSans};
      width: 100%;
    }
    .input-field:focus { border-color: var(--accent); }

    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius:3px; }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .fade-up, .skill-bar-fill { animation: none; transition: none; }
    }

    /* ──── MOBILE ──── */
    @media (max-width: 768px) {
      nav { padding: 0 4vw !important; }
      .nav-link { display: none; }

      h1 { font-size: clamp(32px, 9vw, 48px) !important; line-height: 1.15 !important; }

      section { padding: 64px 5vw !important; }

      #about > div { grid-template-columns: 1fr !important; gap: 40px !important; }
      #skills > div > div { grid-template-columns: 1fr !important; gap: 16px !important; }
      #projects > div > div { grid-template-columns: 1fr !important; gap: 16px !important; }

      .card { padding: 20px !important; }

      .input-field { padding: 10px 12px; font-size: 14px; }
      form { padding: 24px 20px !important; }

      button[aria-label="Scroll to top"] {
        bottom: 20px !important;
        right: 20px !important;
      }
    }

    @media (max-width: 480px) {
      nav { height: 56px !important; }
      section { padding: 48px 5vw !important; }
      .btn-primary, .btn-outline { padding: 9px 18px; font-size: 14px; }
      .tag { padding: 2px 8px; font-size: 11px; }
    }
  `;
  document.head.appendChild(style);
};

// ── Hooks ──
function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useTypewriter(words, speed = 120, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, display.length + 1));
        if (display.length + 1 === word.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setDisplay(word.slice(0, display.length - 1));
        if (display.length - 1 === 0) { setDeleting(false); setIdx(i => i + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [display, deleting, idx, words, speed, pause]);
  return display;
}

// ══════════════════════════════════════════════
//  SECTION COMPONENTS
// ══════════════════════════════════════════════

const sectionTitle = { fontSize:"clamp(28px,4vw,40px)", fontWeight:700, marginBottom:48 };

// ── Nav ──
function Nav({ theme, toggleTheme, currentToken }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <nav
      style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        background: scrolled ? currentToken.bg : "transparent",
        borderBottom: scrolled ? `1px solid ${currentToken.border}` : "1px solid transparent",
        transition: "background 0.2s",
        padding:"0 5vw",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        height:64,
      }}
      aria-label="Main navigation"
    >
      <a
        href="#hero"
        style={{ fontWeight:600, fontSize:18, color:currentToken.accent, fontFamily:currentToken.fontMono, textDecoration:"none" }}
        aria-label="Mayur's Portfolio - Home"
      >
        MRB
      </a>

      <div style={{ display:"flex", gap:28, alignItems:"center" }}>
        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="nav-link"
            aria-label={`Navigate to ${l} section`}
          >
            {l}
          </a>
        ))}

        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: `1.5px solid ${currentToken.border}`,
            borderRadius: 6,
            padding: "7px 14px",
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "inherit",
            color: currentToken.text,
          }}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <a
          href="/MayurResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
          style={{ padding: "7px 16px", fontSize: 13 }}
          aria-label="Download Resume (PDF)"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}

// ── Hero ──
function Hero({ currentToken }) {
  const token = currentToken;
  const rotatingWords = ["Software Developer", "AI Enthusiast", "Data Science Learner", "Problem Solver", "Full-Stack Developer"];
  const typed = useTypewriter(rotatingWords);

  return (
    <section
      id="hero"
      style={{
        minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        padding:"0 5vw",
      }}
      aria-label="Hero section"
    >
      <div style={{ maxWidth:750, textAlign:"center" }}>
        <p className="fade-up" style={{ marginBottom:16, color:token.muted, fontSize:16 }}>
          Hi, I'm
        </p>

        <h1
          className="fade-up"
          style={{ fontSize:"clamp(44px, 8vw, 84px)", fontWeight:700, marginBottom:16, lineHeight:1.05 }}
          aria-label={DATA.name}
        >
          {DATA.name}
        </h1>

        <h2
          style={{ fontSize:24, fontWeight:400, color:token.accent, marginBottom:24, minHeight:36 }}
          aria-live="polite"
          aria-atomic="true"
        >
          {typed}
          <span style={{ animation:"blink 1s step-end infinite" }}>|</span>
        </h2>

        <p style={{ color:token.muted, fontSize:18, lineHeight:1.7, marginBottom:32 }}>
          {DATA.tagline}
        </p>

        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#projects" className="btn-primary" aria-label="View My Work - Projects section">View my work</a>
          <a href="#contact" className="btn-outline" aria-label="Let's Talk - Contact section">Get in touch</a>
        </div>

        <div style={{ marginTop:48, display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
          {[
            { label:"GitHub",   href:DATA.links.github },
            { label:"LinkedIn", href:DATA.links.linkedin },
            { label:"CodeChef", href:DATA.links.codechef },
            { label:"Email",    href:`mailto:${DATA.links.email}` },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              style={{ color:token.muted, fontSize:14, textDecoration:"underline", textUnderlineOffset:4 }}
              aria-label={`Visit ${s.label}`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ──
function About({ currentToken }) {
  const token = currentToken;
  return (
    <section id="about" style={{ padding:"100px 5vw", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
        <div>
          <h2 style={{ ...sectionTitle, marginBottom:24 }}>About me</h2>
          <p style={{ color:token.muted, lineHeight:1.85, fontSize:16, marginBottom:20, whiteSpace:"pre-line" }}>
            {DATA.about}
          </p>
          <div style={{ display:"flex", gap:32, marginTop:32, flexWrap:"wrap" }}>
            {DATA.stats.map(s => (
              <div key={s.label}>
                <p style={{ fontSize:28, fontWeight:700, color:token.accent }}>{s.num}</p>
                <p style={{ fontSize:13, color:token.muted, maxWidth:140 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", justifyContent:"center" }}>
          <div style={{
            width:280, height:280, borderRadius:8,
            background:token.card,
            border:`1px solid ${token.border}`,
            overflow:"hidden",
          }}>
            <img
              src={DATA.profileImage}
              alt="Mayur Ravindra Badgujar"
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ──
function Skills({ currentToken }) {
  const token = currentToken;
  const ref = useRef();
  const visible = useInView(ref);
  return (
    <section id="skills" ref={ref} style={{ padding:"100px 5vw", background:token.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <h2 style={sectionTitle}>Skills</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
          {DATA.skills.map(sk => (
            <div key={sk.name} className="card" style={{
              background:token.card, border:`1px solid ${token.border}`,
              borderRadius:8, padding:"24px 28px",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, alignItems:"center" }}>
                <span style={{ fontWeight:600, fontSize:15 }}>{sk.name}</span>
                <span style={{ fontFamily:token.fontMono, fontSize:13, color:token.accent }}>{sk.level}%</span>
              </div>
              <div
                style={{ background:token.border, borderRadius:3, height:6, overflow:"hidden" }}
                role="progressbar"
                aria-valuenow={sk.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${sk.name} proficiency`}
              >
                <div className="skill-bar-fill" style={{ width: visible ? `${sk.level}%` : "0%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──
function Projects({ currentToken }) {
  const token = currentToken;
  return (
    <section id="projects" style={{ padding:"100px 5vw" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <h2 style={sectionTitle}>Projects</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:28 }}>
          {DATA.projects.map(p => {
            const deployed = p.live !== "Not Deployed";
            return (
              <div key={p.title} className="card" style={{
                background:token.card,
                border:`1px solid ${token.border}`,
                borderRadius:8, padding:"28px",
                display:"flex", flexDirection:"column",
              }}>
                <h3 style={{ fontSize:20, fontWeight:700, marginBottom:10 }}>{p.title}</h3>
                <p style={{ color:token.muted, fontSize:14, lineHeight:1.7, marginBottom:20 }}>{p.description}</p>

                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>

                <div style={{ display:"flex", gap:20, marginTop:"auto" }}>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color:token.text, fontSize:14, textDecoration:"underline", textUnderlineOffset:4 }}
                  >
                    GitHub
                  </a>
                  <a
                    href={deployed ? p.live : "#projects"}
                    onClick={(e) => {
                      if (!deployed) {
                        e.preventDefault();
                        alert("This project is not deployed yet. The source code is on GitHub.");
                      }
                    }}
                    target={deployed ? "_blank" : undefined}
                    rel="noreferrer"
                    style={{ color:token.accent, fontSize:14, textDecoration:"underline", textUnderlineOffset:4 }}
                  >
                    {deployed ? "Live demo" : "Not deployed"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Experience ──
function Experience({ currentToken }) {
  const token = currentToken;
  return (
    <section id="experience" style={{ padding:"100px 5vw", background:token.surface }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <h2 style={sectionTitle}>Experience</h2>
        <div style={{ position:"relative" }}>
          <div style={{
            position:"absolute", left:6, top:0, bottom:0, width:2,
            background:token.border,
          }} />

          {DATA.experience.map(exp => (
            <div key={exp.role} style={{ display:"flex", gap:28, marginBottom:40 }}>
              <div style={{ paddingTop:22, flexShrink:0 }}>
                <div style={{
                  width:14, height:14, borderRadius:"50%",
                  background:token.accent, border:`3px solid ${token.surface}`,
                }} />
              </div>
              <div style={{
                background:token.card, border:`1px solid ${token.border}`,
                borderRadius:8, padding:"20px 24px", flex:1,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:6 }}>
                  <div>
                    <h3 style={{ fontWeight:700, fontSize:17 }}>{exp.role}</h3>
                    <span style={{ color:token.accent, fontSize:14 }}>{exp.company}</span>
                  </div>
                  <span style={{ color:token.muted, fontSize:13, fontFamily:token.fontMono }}>{exp.period}</span>
                </div>
                <p style={{ color:token.muted, fontSize:14, lineHeight:1.7, marginTop:8 }}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ──
function Contact({ currentToken }) {
  const token = currentToken;
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Enter your name.";
    if (!form.email.trim()) {
      errors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Enter a valid email address, like name@example.com.";
    }
    if (!form.message.trim()) errors.message = "Enter a message.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setLoading(true);
    try {
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
        setTimeout(() => setSent(false), 4000);
      } else {
        alert("Your message was not sent. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Your message was not sent. Check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const errorBox = {
    border: "1px solid #ef4444",
    borderRadius: 6,
    padding: "8px 12px",
    marginTop: 6,
    color: "#ef4444",
    fontSize: 13,
    fontWeight: 500,
  };

  return (
    <section
      id="contact"
      style={{ padding:"100px 5vw" }}
      aria-label="Contact section"
    >
      <div style={{ maxWidth:620, margin:"0 auto", textAlign:"center" }}>
        <h2 style={{ ...sectionTitle, marginBottom:20 }}>{DATA.contactHeading}</h2>
        <p style={{ color:token.muted, fontSize:16, lineHeight:1.8, marginBottom:48 }}>
          {DATA.contactText}
        </p>

        {sent ? (
          <div
            role="status"
            style={{
              border:`1px solid ${token.accent}`,
              borderRadius:8, padding:32, color:token.accent, fontSize:18, fontWeight:600,
            }}
          >
            Message sent. I'll get back to you soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            style={{
              background:token.card, border:`1px solid ${token.border}`,
              borderRadius:8, padding:"40px 36px", textAlign:"left",
            }}
          >
            {[
              { key:"name",  label:"Name",  type:"text",  placeholder:"Your name" },
              { key:"email", label:"Email", type:"email", placeholder:"you@example.com" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:20 }}>
                <label
                  htmlFor={f.key}
                  style={{ display:"block", color:token.muted, fontSize:14, marginBottom:6 }}
                >
                  {f.label}
                </label>
                <input
                  id={f.key}
                  type={f.type}
                  placeholder={f.placeholder}
                  className="input-field"
                  value={form[f.key]}
                  onChange={e => {
                    setForm({ ...form, [f.key]: e.target.value });
                    if (formErrors[f.key]) setFormErrors({ ...formErrors, [f.key]: "" });
                  }}
                  aria-invalid={!!formErrors[f.key]}
                  aria-describedby={formErrors[f.key] ? `${f.key}-error` : undefined}
                  style={{ borderColor: formErrors[f.key] ? "#ef4444" : undefined }}
                />
                {formErrors[f.key] && (
                  <div id={`${f.key}-error`} role="alert" style={errorBox}>
                    {formErrors[f.key]}
                  </div>
                )}
              </div>
            ))}

            <div style={{ marginBottom:28 }}>
              <label
                htmlFor="message"
                style={{ display:"block", color:token.muted, fontSize:14, marginBottom:6 }}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project or opportunity"
                className="input-field"
                value={form.message}
                onChange={e => {
                  setForm({ ...form, message: e.target.value });
                  if (formErrors.message) setFormErrors({ ...formErrors, message: "" });
                }}
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? "message-error" : undefined}
                style={{
                  resize:"vertical",
                  borderColor: formErrors.message ? "#ef4444" : undefined,
                }}
              />
              {formErrors.message && (
                <div id="message-error" role="alert" style={errorBox}>
                  {formErrors.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              aria-busy={loading}
              style={{ width:"100%", fontSize:16, opacity: loading ? 0.6 : 1 }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: 16,
                      height: 16,
                      border: "2px solid rgba(128,128,128,0.4)",
                      borderTopColor: "currentColor",
                      borderRadius: "50%",
                      animation: "spin 0.6s linear infinite",
                      marginRight: 8,
                      verticalAlign: "middle",
                    }}
                    aria-hidden="true"
                  />
                  Sending
                </>
              ) : (
                "Send message"
              )}
            </button>

            <p style={{ marginTop:14, color:token.muted, fontSize:13, textAlign:"center" }}>
              Your details are only used to reply to you.
            </p>
          </form>
        )}

        <p style={{ marginTop:32, color:token.muted, fontSize:14 }}>
          Or email me directly at{" "}
          <a
            href={`mailto:${DATA.links.email}`}
            style={{ color:token.accent, textDecoration:"underline", textUnderlineOffset:4 }}
          >
            {DATA.links.email}
          </a>
        </p>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer({ currentToken }) {
  const token = currentToken;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{
      padding:"32px 5vw", borderTop:`1px solid ${token.border}`,
      textAlign:"center", color:token.muted, fontSize:13,
    }}>
      <p>Designed and built by <span style={{ color:token.accent }}>Mayur Ravindra Badgujar</span>, {new Date().getFullYear()}</p>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            background: token.accent,
            color: token.onAccent,
            border: "none",
            borderRadius: 6,
            width: 44,
            height: 44,
            cursor: "pointer",
            fontSize: 20,
            zIndex: 99,
          }}
          aria-label="Scroll to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
}

// ══════════════════════════════════════════════
//  ROOT APP
// ══════════════════════════════════════════════
export default function Portfolio() {
  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  const currentToken = themes[theme];

  useEffect(() => {
    injectKeyframes();
  }, []);

  useEffect(() => {
    applyTheme(themes[theme]);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

  return (
    <div style={{ background:currentToken.bg, color:currentToken.text, fontFamily:currentToken.fontSans }}>
      <Nav theme={theme} toggleTheme={toggleTheme} currentToken={currentToken} />
      <Hero currentToken={currentToken} />
      <About currentToken={currentToken} />
      <Skills currentToken={currentToken} />
      <Projects currentToken={currentToken} />
      <Experience currentToken={currentToken} />
      <Contact currentToken={currentToken} />
      <Footer currentToken={currentToken} />
    </div>
  );
}
