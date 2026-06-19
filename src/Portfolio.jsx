// correct 
import { useState, useEffect, useRef } from "react";

// ─── MAYUR'S COMPLETE PORTFOLIO DATA ───
const DATA = {
  // ── Hero Section ──
  name: "Mayur Ravindra Badgujar",
  title: "Data Science",
  tagline: "I build scalable web applications",
  profileImage: "/profile.jpg",

  // ── About Section ──
  about: `I am a motivated Artificial Intelligence and Data Science student with a strong passion for technology, problem-solving, and innovation. I have developed solid programming skills in Python and data analysis tools such as NumPy and Pandas, enabling me to work effectively with data-driven applications and AI-related projects.

In addition to my AI and data science background, I am proficient in full-stack web development, with experience building responsive and user-friendly web applications using HTML, CSS, Node.js, Express.js, and MySQL. I also possess a strong foundation in Data Structures and Algorithms, demonstrated by solving over 2,000 coding problems on competitive programming platforms.`,

  // ── Social / Contact Links ──
  links: {
    github: "https://github.com/mayurbadgujar8446",
    linkedin: "https://www.linkedin.com/in/mayurrbadgujar?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    codechef: "https://www.codechef.com/users/mayur_badgujar",
    email: "mayurbadgujar8446@gmail.com",
    phone: "9359366578",
    resume: "/resume.pdf",
    location: "Post Fagne, Dhule, Maharashtra – 424301, India",
  },

  // ── Skills ──
  skills: [
    { name: "Python",                    level: 80, icon: "🐍" },
    { name: "MySQL",                     level: 80, icon: "🗄️" },
    { name: "Data Science",              level: 70, icon: "📊" },
    { name: "Operating Systems Basic",   level: 70, icon: "💻" },
    { name: "Web Development",           level: 60, icon: "🌐" },
    { name: "Full-Stack Dev",            level: 60, icon: "🚀" },
    { name: "Computer Networks Basic",   level: 50, icon: "🌍" },
  ],

  // ── Projects ──
  projects: [
    {
      title: "Smart Canteen Management System",
      description: "A full-stack canteen management platform with OTP-based authentication, digital wallet functionality, order management, reward points, email bill generation, and an admin dashboard.",
      tags: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/mayurbadgujar8446/SmartCanteenManagementSystem",
      live: "Not Deployed",
      featured: true,
    },
    {
      title: "Multilingual Bot Assistant",
      description: "An AI-powered multilingual chatbot using NLP and semantic search to provide intelligent responses across multiple languages through an interactive chat interface.",
      tags: ["Python", "Flask", "PyTorch", "NLP", "Sentence Transformers"],
      github: "https://github.com/mayurbadgujar8446/Multilingual-Bot-Assistant",
      live: "Not Deployed",
      featured: true,
    },
    {
      title: "Task Management System",
      description: "A web-based task management application enabling users to create, organize, update, and monitor tasks efficiently through a responsive interface.",
      tags: ["Python", "Flask", "SQLite", "Bootstrap", "JavaScript"],
      github: "https://github.com/mayurbadgujar8446/Task-Magament-System",
      live: "https://task-magament-system-production.up.railway.app/",
      featured: true,
    },
    {
      title: "Smart Task Scheduler",
      description: "An intelligent scheduling application using Greedy and Dynamic Programming algorithms to optimize task selection, maximize productivity, and manage work schedules.",
      tags: ["Python", "Flask", "Algorithms", "JavaScript"],
      github: "https://github.com/mayurbadgujar8446/TaskScheduler",
      live: "https://taskscheduler-production-dee3.up.railway.app/",
      featured: true,
    },
  ],

  // ── Experience / Timeline ──
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
      desc: "Solved 2000+ coding challenges across Data Structures, Algorithms, and problem-solving paradigms.",
    },
  ],

  // ── About Stats ──
  stats: [
    { num: "4+", label: "Projects Built" },
    { num: "2000+", label: "Problems Solved" },
    { num: "3rd Year", label: "Artificial Intelligence & Data Science Student" },
  ],

  // ── Contact Section ──
  contactHeading: "Let's Connect",
  contactText: `I am always open to discussing new opportunities, innovative projects, and collaborations in Artificial Intelligence, Data Science, and Full-Stack Development. Whether you have a project idea, a job opportunity, or simply want to connect, feel free to reach out. I'll do my best to respond as soon as possible.`,
};
// ─────────────────────────────────────────────────────────────

// ── Inline Styles (design tokens) ──
const token = {
  bg:       "#0a0a0f",
  surface:  "#111118",
  card:     "#16161f",
  border:   "rgba(255,255,255,0.07)",
  accent:   "#6366F1",       // Indigo - Professional & Modern
  accentAlt:"#818CF8",       // Lighter Indigo shade
  text:     "#e2e0f0",
  muted:    "#7a7890",
  fontSans: "'Inter', 'Segoe UI', sans-serif",
  fontMono: "'Fira Code', 'JetBrains Mono', monospace",
};

// ── Keyframe injection (runs once) ──
const injectKeyframes = () => {
  if (document.getElementById("pf-keyframes")) return;
  const style = document.createElement("style");
  style.id = "pf-keyframes";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: ${token.bg}; color: ${token.text}; font-family: ${token.fontSans}; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes float    { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
    @keyframes spinSlow { from { transform:rotateY(0deg); } to { transform:rotateY(360deg); } }
    @keyframes pulse    { 0%,100% { box-shadow: 0 0 0 0 rgba(124,111,255,0.4); } 70% { box-shadow: 0 0 0 12px rgba(124,111,255,0); } }
    @keyframes shimmer  { from { background-position: -400px 0; } to { background-position: 400px 0; } }
    @keyframes orbit    { from { transform:rotate(0deg) translateX(90px) rotate(0deg); } to { transform:rotate(360deg) translateX(90px) rotate(-360deg); } }
    @keyframes blink    { 0%,100% { opacity:1; } 50% { opacity:0; } }
    @keyframes gradShift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }

    .fade-up    { animation: fadeUp 0.7s ease both; }
    .fade-in    { animation: fadeIn 0.6s ease both; }

    .nav-link { color: ${token.muted}; text-decoration:none; font-size:14px; transition:color 0.2s; }
    .nav-link:hover { color: ${token.text}; }

    .btn-primary {
      background: ${token.accent};
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 12px 28px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(124,111,255,0.35); }

    .btn-outline {
      background: transparent;
      color: ${token.accent};
      border: 1.5px solid ${token.accent};
      border-radius: 8px;
      padding: 11px 26px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    .btn-outline:hover { background: rgba(124,111,255,0.1); transform:translateY(-2px); }

    .card-3d {
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      transform-style: preserve-3d;
    }
    .card-3d:hover {
      transform: perspective(800px) rotateY(-4deg) rotateX(3deg) translateY(-6px);
      box-shadow: 8px 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,111,255,0.2);
    }

    .skill-bar-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, ${token.accent}, ${token.accentAlt});
      transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
    }

    .tag {
      background: rgba(124,111,255,0.12);
      color: ${token.accentAlt};
      border: 1px solid rgba(124,111,255,0.2);
      border-radius: 20px;
      padding: 3px 12px;
      font-size: 12px;
      font-family: ${token.fontMono};
    }

    .section-label {
      font-size: 12px;
      font-family: ${token.fontMono};
      color: ${token.accent};
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .timeline-dot {
      width:14px; height:14px;
      border-radius:50%;
      background: ${token.accent};
      border: 3px solid ${token.bg};
      animation: pulse 2s infinite;
      flex-shrink:0;
    }

    .input-field {
      background: ${token.card};
      border: 1.5px solid ${token.border};
      border-radius: 8px;
      color: ${token.text};
      padding: 12px 16px;
      font-size: 15px;
      font-family: ${token.fontSans};
      width: 100%;
      outline: none;
      transition: border-color 0.2s;
    }
    .input-field:focus { border-color: ${token.accent}; }

    .floating-shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.12;
      pointer-events: none;
    }

    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background: ${token.bg}; }
    ::-webkit-scrollbar-thumb { background: ${token.accent}; border-radius:3px; }
  `;
  document.head.appendChild(style);
};

// ── Intersection Observer hook for scroll-triggered animations ──
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

// ── Typewriter effect hook ──
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

// ── Nav ──
function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Skills", "Projects", "Experience", "Contact"];
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? `rgba(10,10,15,0.85)` : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${token.border}` : "none",
      transition: "all 0.3s",
      padding:"0 5vw",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      height:64,
    }}>
      {/* Mayur's Logo */}
      <span style={{ fontWeight:700, fontSize:20, color:token.accent, fontFamily:token.fontMono }}>
        {"<MRB />"}
      </span>
      <div style={{ display:"flex", gap:32, alignItems:"center" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
        ))}
       <a
  href={DATA.links.resume}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-outline"
  style={{ padding:"8px 18px", fontSize:13 }}
>
          Resume ↗
        </a>
      </div>
    </nav>
  );
}

// ── 3D Floating Orb (hero decoration) ──
function Orb({ size, color, top, left, delay = 0 }) {
  return (
    <div className="floating-shape" style={{
      width:size, height:size, background:color,
      top, left,
      animation:`float ${4 + delay}s ease-in-out infinite`,
      animationDelay:`${delay}s`,
    }} />
  );
}

// ── Hero Section ──
function Hero() {
  // EDIT: Add/remove/change the rotating words below
  const rotatingWords = ["Software Developer", "AI Enthusiast", "Data Science Learner", "Problem Solver", "Full-Stack Developer"];
  const typed = useTypewriter(rotatingWords);

  return (
    <section id="hero" style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden", padding:"0 5vw",
    }}>
      {/* Ambient background orbs */}
      <Orb size={500} color={token.accent}  top="-10%"  left="-5%"   delay={0} />
      <Orb size={350} color="#a78bfa"        top="50%"   left="70%"   delay={1.5} />
      <Orb size={200} color="#6ee7b7"        top="80%"   left="10%"   delay={3} />

      {/* Grid overlay */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize:"60px 60px",
        zIndex:0,
      }} />

      <div style={{ position:"relative", zIndex:1, maxWidth:750, textAlign:"center" }}>
        {/* Greeting */}
        <p className="section-label fade-up" style={{ marginBottom:16 }}>
          Hello, world. I'm
        </p>

        {/* Name — BIG */}
        <h1 className="fade-up" style={{
          fontSize:"clamp(42px, 8vw, 90px)",
          fontWeight:700,
          lineHeight:1.05,
          marginBottom:16,
          background:`linear-gradient(135deg, ${token.text} 30%, ${token.accent} 100%)`,
          WebkitBackgroundClip:"text",
          WebkitTextFillColor:"transparent",
          backgroundSize:"200%",
          animation:"gradShift 6s ease infinite",
          animationDelay:"0.5s",
        }}>
          {DATA.name}
        </h1>

        {/* Typewriter */}
        <h2 style={{
          fontSize:"clamp(20px, 3vw, 32px)", fontWeight:400, color:token.muted,
          marginBottom:24, minHeight:40,
        }}>
          <span style={{ color:token.accent, fontFamily:token.fontMono }}>{">"}</span>{" "}
          {typed}
          <span style={{ animation:"blink 1s step-end infinite", color:token.accent }}>|</span>
        </h2>

        <p style={{ fontSize:17, color:token.muted, maxWidth:520, margin:"0 auto 40px", lineHeight:1.7 }}>
          {DATA.tagline}
        </p>

        {/* CTA buttons */}
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact"  className="btn-outline">Let's Talk</a>
        </div>

        {/* Social links */}
        <div style={{ marginTop:48, display:"flex", gap:24, justifyContent:"center" }}>
          {[
            { label:"GitHub",   href:DATA.links.github      },
            { label:"LinkedIn", href:DATA.links.linkedin    },
            { label:"CodeChef", href:DATA.links.codechef    },
            { label:"Email",    href:`mailto:${DATA.links.email}` },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{ color:token.muted, fontSize:13, textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = token.accent}
              onMouseLeave={e => e.target.style.color = token.muted}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About Section ──
function About() {
  const ref = useRef(); const visible = useInView(ref);
  return (
    <section id="about" ref={ref} style={{ padding:"100px 5vw", maxWidth:1100, margin:"0 auto" }}>
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
        transition:"all 0.8s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {/* Left: text */}
        <div>
          <p className="section-label" style={{ marginBottom:12 }}>01. About Me</p>
          <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:700, marginBottom:24 }}>
            Who I Am
          </h2>
          <p style={{ color:token.muted, lineHeight:1.85, fontSize:16, marginBottom:20 }}>
            {DATA.about}
          </p>
          {/* EDIT: Add more fun facts or highlights here */}
          <div style={{ display:"flex", gap:32, marginTop:32 }}>
            {[
              { num:"4+", label:"Projects Built" },
              { num:"2000+", label:"Problems Solved" },
              { num:"3rd Year", label:"Artificial Intelligence & Data Science Student" },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontSize:32, fontWeight:700, color:token.accent }}>{s.num}</p>
                <p style={{ fontSize:13, color:token.muted }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: profile photo with 3D tilt card */}
        <div style={{ display:"flex", justifyContent:"center" }}>
          <div className="card-3d" style={{
            width:280, height:280, borderRadius:20,
            background:`linear-gradient(135deg, ${token.accent}33, ${token.card})`,
            border:`1px solid ${token.border}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            overflow:"hidden", position:"relative",
          }}>
            {/* EDIT: Replace the emoji below with an <img> tag once you have your photo:
                <img src={DATA.profileImage} alt="Profile" style={{width:"100%",height:"100%",objectFit:"cover"}} />
            */}
            <span style={{ fontSize:80 }}>👤</span>

            {/* decorative corner accent */}
            <div style={{
              position:"absolute", bottom:-2, right:-2,
              width:80, height:80,
              background:`linear-gradient(135deg, transparent 40%, ${token.accent}66 100%)`,
              borderRadius:"0 0 20px 0",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills Section ──
function Skills() {
  const ref = useRef(); const visible = useInView(ref);
  return (
    <section id="skills" ref={ref} style={{
      padding:"100px 5vw", background:token.surface,
    }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <p className="section-label" style={{ marginBottom:12 }}>02. Skills</p>
        <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:700, marginBottom:56 }}>
          What I Work With
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
          {DATA.skills.map((sk, i) => (
            <div key={sk.name} className="card-3d" style={{
              background:token.card, border:`1px solid ${token.border}`,
              borderRadius:16, padding:"24px 28px",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
              transition:`all 0.6s ease ${i * 0.08}s`,
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:22 }}>{sk.icon}</span>
                  <span style={{ fontWeight:600, fontSize:15 }}>{sk.name}</span>
                </div>
                <span style={{ fontFamily:token.fontMono, fontSize:13, color:token.accent }}>{sk.level}%</span>
              </div>
              {/* Skill progress bar */}
              <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:4, height:6, overflow:"hidden" }}>
                <div className="skill-bar-fill" style={{ width: visible ? `${sk.level}%` : "0%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects Section ──
function Projects() {
  const ref = useRef(); const visible = useInView(ref);
  return (
    <section id="projects" ref={ref} style={{ padding:"100px 5vw" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <p className="section-label" style={{ marginBottom:12 }}>03. Projects</p>
        <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:700, marginBottom:56 }}>
          Things I've Built
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:28 }}>
          {DATA.projects.map((p, i) => (
            <div key={p.title} className="card-3d" style={{
              background:token.card,
              border:`1px solid ${p.featured ? token.accent + "55" : token.border}`,
              borderRadius:20, padding:"28px 28px 24px",
              position:"relative", overflow:"hidden",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
              transition:`all 0.7s ease ${i * 0.12}s`,
            }}>
              {/* Featured badge */}
              {p.featured && (
                <span style={{
                  position:"absolute", top:16, right:16,
                  background:`${token.accent}22`, color:token.accent,
                  border:`1px solid ${token.accent}44`,
                  borderRadius:20, padding:"2px 10px", fontSize:11, fontFamily:token.fontMono,
                }}>★ Featured</span>
              )}

              {/* Top icon bar */}
              <div style={{ fontSize:28, marginBottom:20 }}>
                {/* EDIT: Add an icon or project screenshot here */}
                📁
              </div>

              <h3 style={{ fontSize:20, fontWeight:700, marginBottom:10 }}>{p.title}</h3>
              <p style={{ color:token.muted, fontSize:14, lineHeight:1.7, marginBottom:20 }}>{p.description}</p>

              {/* Tech tags */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              {/* Links */}
              <div style={{ display:"flex", gap:20 }}>
                <a href={p.github} target="_blank" rel="noreferrer" style={{
                  color:token.muted, fontSize:13, textDecoration:"none",
                  display:"flex", alignItems:"center", gap:6,
                  transition:"color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = token.text}
                  onMouseLeave={e => e.target.style.color = token.muted}>
                  GitHub ↗
                </a>
                <a href={p.live} target="_blank" rel="noreferrer" style={{
                  color:token.accent, fontSize:13, textDecoration:"none",
                  display:"flex", alignItems:"center", gap:6,
                }}>
                  Live  ↗
                </a>
              </div>

              {/* Decorative accent line */}
              <div style={{
                position:"absolute", bottom:0, left:0, right:0, height:2,
                background: p.featured
                  ? `linear-gradient(90deg, ${token.accent}, ${token.accentAlt})`
                  : "transparent",
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Experience / Timeline Section ──
function Experience() {
  const ref = useRef(); const visible = useInView(ref);
  return (
    <section id="experience" ref={ref} style={{ padding:"100px 5vw", background:token.surface }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <p className="section-label" style={{ marginBottom:12 }}>04. Experience</p>
        <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:700, marginBottom:56 }}>
          Where I've Worked
        </h2>
        {/* Timeline */}
        <div style={{ position:"relative" }}>
          {/* Vertical line */}
          <div style={{
            position:"absolute", left:6, top:0, bottom:0, width:2,
            background:`linear-gradient(180deg, ${token.accent}, transparent)`,
          }} />

          {DATA.experience.map((exp, i) => (
            <div key={exp.role} style={{
              display:"flex", gap:28, marginBottom:48,
              paddingLeft:6,
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-30px)",
              transition:`all 0.6s ease ${i * 0.15}s`,
            }}>
              <div style={{ paddingTop:4 }}>
                <div className="timeline-dot" />
              </div>
              <div style={{
                background:token.card, border:`1px solid ${token.border}`,
                borderRadius:16, padding:"20px 24px", flex:1,
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

// ── Contact Section ──
function Contact() {
  const ref = useRef(); 
  const visible = useInView(ref);
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // VALIDATION FUNCTION
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
      errors.message = "Message is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // VALIDATE FIRST
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      const response = await fetch("https://formspree.io/f/maqzzgge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 3000);
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message. Please check your internet connection.");
    }
  };

  return (
    <section id="contact" ref={ref} style={{ padding:"100px 5vw" }}>
      <div style={{
        maxWidth:620, margin:"0 auto", textAlign:"center",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
        transition:"all 0.8s ease",
      }}>
        <p className="section-label" style={{ marginBottom:12 }}>05. Contact</p>
        <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:700, marginBottom:20 }}>
          {DATA.contactHeading}
        </h2>
        <p style={{ color:token.muted, fontSize:16, lineHeight:1.8, marginBottom:48 }}>
          {DATA.contactText}
        </p>

        {sent ? (
          <div style={{
            background:`${token.accent}15`, border:`1px solid ${token.accent}44`,
            borderRadius:16, padding:32, color:token.accent, fontSize:18, fontWeight:600,
          }}>
            ✓ Message sent! I'll get back to you soon.
          </div>
        ) : (
          <div style={{
            background:token.card, border:`1px solid ${token.border}`,
            borderRadius:20, padding:"40px 36px", textAlign:"left",
          }}>
            {[
              { key:"name",    label:"Name",    type:"text",     placeholder:"Your Name" },
              { key:"email",   label:"Email",   type:"email",    placeholder:"your.email@example.com" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:20 }}>
                <label style={{ display:"block", color:token.muted, fontSize:13, marginBottom:6 }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="input-field"
                  value={form[f.key]}
                  onChange={e => {
                    setForm({ ...form, [f.key]: e.target.value });
                    if (formErrors[f.key]) {
                      setFormErrors({ ...formErrors, [f.key]: "" });
                    }
                  }}
                  style={{
                    borderColor: formErrors[f.key] ? "#ef4444" : undefined,
                  }}
                />
                {formErrors[f.key] && (
                  <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>
                    {formErrors[f.key]}
                  </p>
                )}
              </div>
            ))}
            <div style={{ marginBottom:28 }}>
              <label style={{ display:"block", color:token.muted, fontSize:13, marginBottom:6 }}>Message</label>
              <textarea
                rows={5}
                placeholder="Let me know about your project or opportunity..."
                className="input-field"
                style={{ 
                  resize:"vertical",
                  borderColor: formErrors.message ? "#ef4444" : undefined,
                }}
                value={form.message}
                onChange={e => {
                  setForm({ ...form, message: e.target.value });
                  if (formErrors.message) {
                    setFormErrors({ ...formErrors, message: "" });
                  }
                }}
              />
              {formErrors.message && (
                <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>
                  {formErrors.message}
                </p>
              )}
            </div>
            <button className="btn-primary" onClick={handleSubmit} style={{ width:"100%", fontSize:16 }}>
              Send Message →
            </button>
          </div>
        )}

        {/* Direct email link */}
        <p style={{ marginTop:32, color:token.muted, fontSize:14 }}>
          Or email me directly at{" "}
          <a href={`mailto:${DATA.links.email}`}
            style={{ color:token.accent, textDecoration:"none" }}>
            {DATA.links.email}
          </a>
        </p>
      </div>
    </section>
  );
}

        {/* Direct email link */}
        <p style={{ marginTop:32, color:token.muted, fontSize:14 }}>
          Or email me directly at{" "}
          <a href={`mailto:${DATA.links.email}`}
            style={{ color:token.accent, textDecoration:"none" }}>
            {DATA.links.email}
          </a>
        </p>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer style={{
      padding:"32px 5vw", borderTop:`1px solid ${token.border}`,
      textAlign:"center", color:token.muted, fontSize:13,
    }}>
      {/* EDIT: Replace name and year */}
      <p>Designed &amp; Built by <span style={{ color:token.accent }}>Mayur Ravindra Badgujar</span> · {new Date().getFullYear()}</p>
    </footer>
  );
}

// ══════════════════════════════════════════════
//  ROOT APP
// ══════════════════════════════════════════════
export default function Portfolio() {
  useEffect(() => { injectKeyframes(); }, []);

  return (
    <div style={{ background:token.bg, color:token.text, fontFamily:token.fontSans }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
