import React, { useMemo, useState } from "react";
import logo from "./assets/logo1.png";
import nicole from "./assets/nicole.jpg";


// ✅ Put these certificate images inside: src/assets/
import cyberImg from "./assets/cyber.png";
import deviceImg from "./assets/device.png";
import excelImg from "./assets/excel.png";
import accessImg from "./assets/access.png";

/* ===================== DATA ===================== */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzarewz";

const projectsData = [
  {
    title: "EduVerso",
    desc: "Learning platform with gamified modules, admin panel, and student system.",
    tags: ["React", "Node", "SQL"],
    live: "#",
    code: "#",
  },
  {
    title: "UI/UX Case Study",
    desc: "Redesigned a mobile interface focusing on accessibility and clarity.",
    tags: ["Figma", "UX", "Prototype"],
    live: "#",
    code: null,
  },
  {
    title: "Personal Website",
    desc: "Responsive portfolio site with smooth navigation and clean layout.",
    tags: ["HTML", "CSS", "JS"],
    live: "#",
    code: "#",
  },
];

/* SVG Icon component (no libraries needed) */
const SkillIcon = ({ name }) => {
  const common = { width: 44, height: 44, viewBox: "0 0 64 64", fill: "none" };

  const icons = {
    js: (
      <svg {...common}>
        <rect x="12" y="10" width="40" height="44" rx="6" stroke="white" strokeWidth="3" />
        <text x="32" y="40" textAnchor="middle" fontSize="18" fill="white" fontWeight="800">
          JS
        </text>
      </svg>
    ),
    react: (
      <svg {...common}>
        <circle cx="32" cy="32" r="4" fill="white" />
        <ellipse cx="32" cy="32" rx="20" ry="9" stroke="white" strokeWidth="3" />
        <ellipse cx="32" cy="32" rx="20" ry="9" stroke="white" strokeWidth="3" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="20" ry="9" stroke="white" strokeWidth="3" transform="rotate(120 32 32)" />
      </svg>
    ),
    node: (
      <svg {...common}>
        <path d="M32 10l18 10v24L32 54 14 44V20L32 10z" stroke="white" strokeWidth="3" />
        <text x="32" y="37" textAnchor="middle" fontSize="14" fill="white" fontWeight="800">
          JS
        </text>
      </svg>
    ),
    express: (
      <svg {...common}>
        <text x="32" y="38" textAnchor="middle" fontSize="26" fill="white" fontWeight="600">
          ex
        </text>
      </svg>
    ),
    mongo: (
      <svg {...common}>
        <path
          d="M32 10c6 10 10 14 10 24 0 11-6 20-10 20s-10-9-10-20c0-10 4-14 10-24z"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    ),
    tailwind: (
      <svg {...common}>
        <path
          d="M18 26c4-6 10-8 16-6 4 2 6 6 8 10 4 6 10 8 16 6"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M14 38c4-6 10-8 16-6 4 2 6 6 8 10 4 6 10 8 16 6"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    ),
    python: (
      <svg {...common}>
        <path d="M22 18c0-4 3-6 8-6h8c5 0 8 2 8 6v10H22V18z" stroke="white" strokeWidth="3" />
        <path d="M42 46c0 4-3 6-8 6h-8c-5 0-8-2-8-6V36h24v10z" stroke="white" strokeWidth="3" />
        <circle cx="28" cy="20" r="2" fill="white" />
        <circle cx="36" cy="44" r="2" fill="white" />
      </svg>
    ),
    java: (
      <svg {...common}>
        <path d="M32 14c6 6-4 8 2 14 6 6 2 10-4 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 46h16" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 50c4 2 8 2 12 0" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  };

  return <div className="skillIcon">{icons[name]}</div>;
};

const skillsData = [
  { icon: "js", title: "JavaScript (ES6+)", desc: "Core language for building interactive and dynamic web experiences." },
  { icon: "react", title: "React", desc: "Component-based library for building fast, reusable, and responsive user interfaces." },
  { icon: "node", title: "Node.js", desc: "JavaScript runtime used for developing scalable backend applications." },
  { icon: "express", title: "Express", desc: "Lightweight Node.js framework for creating APIs and backend services." },
  { icon: "mongo", title: "MongoDB", desc: "NoSQL database for storing flexible and structured application data." },
  { icon: "tailwind", title: "Tailwind CSS", desc: "Utility-first CSS framework for designing clean and responsive interfaces." },
  { icon: "python", title: "Python", desc: "Versatile language used for automation, scripting, and web applications." },
  { icon: "java", title: "Java", desc: "Object-oriented programming language commonly used for backend and system development." },
];

const certificatesData = [
  {
    img: cyberImg,
    title: "Introduction to Cybersecurity",
    org: "Cisco",
    issued: "Issued Dec 6, 2025",
  },
  {
    img: deviceImg,
    title: "IT Specialist - Device Configuration and Management",
    org: "Certiport, a Pearson VUE business",
    issued: "Issued Dec 15, 2025",
  },
  {
    img: excelImg,
    title: "Microsoft Office Specialist: Excel Associate (Office 2019)",
    org: "Microsoft",
    issued: "Issued May 26, 2023",
  },
  {
    img: accessImg,
    title: "Microsoft Office Specialist: Microsoft Access Expert (Office 2019)",
    org: "Microsoft",
    issued: "Issued Dec 21, 2025",
  },
];


/* ===================== APP ===================== */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", msg: "" });
  const year = useMemo(() => new Date().getFullYear(), []);

  const handleNavClick = () => setMenuOpen(false);

  // ✅ REAL CONTACT FORM (Formspree)
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    setFormStatus({ type: "info", msg: "Sending..." });

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(formEl),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setFormStatus({ type: "success", msg: "✅ Message sent! Thank you for reaching out." });
        formEl.reset();
      } else {
        setFormStatus({ type: "error", msg: "❌ Failed to send. Please try again or email me directly." });
      }
    } catch {
      setFormStatus({ type: "error", msg: "❌ Network error. Please try again or email me directly." });
    }
  };

  return (
    <>
      {/* ===================== HEADER ===================== */}
      <header className="site-header">
        <nav className="nav container">
          <a className="logo" href="#home" onClick={handleNavClick}>
            <img src={logo} alt="Logo" className="logo-img" />
          </a>

          <div className={`links ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={handleNavClick}>About</a>
            <a href="#projects" onClick={handleNavClick}>Projects</a>
            <a href="#skills" onClick={handleNavClick}>Skills</a>
            <a href="#certificates" onClick={handleNavClick}>Certificates</a>
            <a href="#contact" onClick={handleNavClick}>Contact</a>
          </div>

          <button
            className="menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            ☰
          </button>
        </nav>
      </header>

      <main id="home" className="container">
        {/* ===================== HERO ===================== */}
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">BSIT Student • UI/UX • Web Dev</p>
            <h1>
              Hi, I’m <span className="accent">Nicole Iris</span>.
            </h1>
            <p className="sub">
              I’m a passionate student developer who enjoys building clean, user-friendly web experiences
              and creative projects.
            </p>
            <div className="cta">
              <a className="btn primary" href="#projects">View Projects</a>
              <a className="btn" href="#contact">Contact Me</a>
            </div>
          </div>

          <div className="hero-card">
            <div className="avatar">
  <img src={nicole} alt="Nicole Iris" className="avatar-img" />
  <div className="avatar-badge">✨ Available for OJT</div>
</div>


            <div className="quick">
              <p><strong>Location:</strong> Philippines</p>
              <p>
                <strong>Email:</strong>{" "}
                <a className="link" href="mailto:ncamuaa@gmail.com">ncamuaa@gmail.com</a>
              </p>
              <p><strong>Focus:</strong> UI/UX • Front-end</p>
            </div>

            <div className="social">
              <a href="https://github.com/ncamuaa" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/nicole-camua0423/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT ME ===================== */}
        <section id="about" className="section">
          <h2>About Me</h2>

          {/* ✅ Pills beside the paragraph */}
          <div className="about-card">
            <div className="about-text">
              <p>
                Hi! I’m <span className="highlight">Nicole Iris</span>, a passionate BSIT student with a strong interest in{" "}
                <strong>web development</strong> and <strong>UI/UX design</strong>.
              </p>

              <p>
                I enjoy creating clean, visually appealing, and user-friendly digital experiences that balance
                functionality and design.
              </p>

              <p>
                I actively explore technologies such as <strong>JavaScript</strong>, <strong>React</strong>, and{" "}
                <strong>Node.js</strong> while building meaningful projects that help me grow as a developer.
              </p>

              <p>
                Outside of coding, I value continuous learning, collaboration, and personal growth, and I strive to
                improve myself every day.
              </p>
            </div>

            <div className="about-highlights">
              <span className="about-pill">✨ 500-hour OJT / Internship Ready</span>
              <span className="about-pill">🎨 UI/UX & Front-end Focused</span>
              <span className="about-pill">🤝 Collaborative & Detail-Oriented</span>
              <span className="about-pill">📚 Always Learning</span>
            </div>
          </div>
        </section>

      {/* ===================== PROJECTS ===================== */}
<section id="projects" className="section">
  <h2>Projects</h2>
  <p className="section-sub">
    Selected projects showcasing my skills in web development and UI/UX design.
  </p>

  <div className="grid">
    {projectsData.map((p) => (
      <article className="card" key={p.title}>
        <h3>{p.title}</h3>
        <p>{p.desc}</p>

        <div className="tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </article>
    ))}
  </div>
</section>


        {/* ===================== SKILLS ===================== */}
        <section id="skills" className="section">
          <h2>Skill Set</h2>
          <p className="section-sub">
            Technologies and tools I use to build modern, creative, and functional web applications.
          </p>

          <div className="grid">
            {skillsData.map((s) => (
              <article className="card skillCard" key={s.title}>
                <SkillIcon name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== CERTIFICATES ===================== */}
        <section id="certificates" className="section">
          <h2>Certificates</h2>
          <p className="section-sub">
            Certifications that support my technical skills and continuous learning.
          </p>

          <div className="cert-grid">
            {certificatesData.map((c) => (
              <article className="cert-card" key={c.title}>
                <div className="cert-imgWrap">
                  <img className="cert-img" src={c.img} alt={c.title} />
                </div>

                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-org">{c.org}</p>

                <div className="cert-meta">
                  {c.issued && <p>{c.issued}</p>}
                  {c.expires && <p>{c.expires}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className="section">
          <h2>Contact</h2>
          <p className="section-sub">Want to work together? Send me a message.</p>

          <div className="contact-card">
            <form onSubmit={handleContactSubmit}>
              <input type="hidden" name="_subject" value="New message from Nicole's portfolio!" />

              <label>
                Name
                <input name="name" placeholder="Your name" required />
              </label>

              <label>
                Email
                <input name="email" type="email" placeholder="you@email.com" required />
              </label>

              <label>
                Message
                <textarea name="message" rows="5" placeholder="Write your message..." required />
              </label>

              <button className="btn primary" type="submit">Send</button>

              {formStatus.msg && <p className="note" style={{ marginTop: 10 }}>{formStatus.msg}</p>}
            </form>

            <div className="contact-info">
              <p>
                <strong>Email:</strong>{" "}
                <a className="link" href="mailto:ncamuaa@gmail.com">ncamuaa@gmail.com</a>
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a className="link" href="https://github.com/ncamuaa" target="_blank" rel="noreferrer">
                  github.com/ncamuaa
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a className="link" href="https://www.linkedin.com/in/nicole-camua0423/" target="_blank" rel="noreferrer">
                  linkedin.com/in/nicole-camua0423
                </a>
              </p>
              <p className="note">You can also email me directly—I'll reply as soon as I can.</p>
            </div>
          </div>
        </section>

        {/* ===================== FOOTER ===================== */}
        <footer className="footer">
          <p>© {year} Nicole Iris. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
