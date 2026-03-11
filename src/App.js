import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["About","Education","Skills","Internships","Projects","Publications","Certifications","Contact"];
const ROLES = ["CSE Graduate","Frontend Developer","Full Stack Developer","Data Analyst"];

const SKILLS = [
  { name: "HTML & CSS",          level: 90, category: "Web"   },
  { name: "JavaScript",          level: 85, category: "Web"   },
  { name: "TypeScript",          level: 72, category: "Web"   },
  { name: "React / Next.js",     level: 80, category: "Web"   },
  { name: "Tailwind CSS",        level: 78, category: "Web"   },
  { name: "Node.js & REST APIs", level: 75, category: "Web"   },
  { name: "Python",              level: 90, category: "Data"  },
  { name: "SQL (MySQL, SQLite)", level: 85, category: "Data"  },
  { name: "Microsoft Excel",     level: 82, category: "Data"  },
  { name: "R Programming",       level: 70, category: "Data"  },
  { name: "Machine Learning & NLP", level: 82, category: "AI/ML" },
  { name: "Power BI & Tableau",  level: 80, category: "Viz"   },
  { name: "Git & GitHub",        level: 85, category: "Tools" },
];

const EDUCATION = [
  { degree:"B.E. Computer Science & Engineering (Data Science)", school:"Annamalai University",                                          year:"2021–2025", score:"8.7 CGPA", icon:"🎓" },
  { degree:"HSC — Class 12",  school:"Sri Vidya Mandir Matric Hr. Sec. School, Gurusamipalayam", year:"2019–2021", score:"89%",      icon:"📚" },
  { degree:"SSLC — Class 10", school:"Government Higher Secondary School, Singalandapuram",      year:"2018–2019", score:"87%",      icon:"🏫" },
];

const INTERNSHIPS = [
  {
    company:"Adshi5", role:"Frontend Developer Internship (Remote)", duration:"June 2025 – December 2025",
    color:"#f59e0b", icon:"💻",
    points:[
      "Developed client websites using Next.js with server-side rendering",
      "Optimized performance via code splitting, lazy loading, and image optimization",
      "Wrote clean semantic HTML, responsive CSS, and interactive JavaScript",
      "Implemented SEO best practices and accessibility standards",
      "Collaborated with design team for pixel-perfect, mobile-responsive interfaces",
    ],
  },
  {
    company:"Deloitte Australia", role:"Virtual Internship (Forage)", duration:"Virtual",
    color:"#06b6d4", icon:"📊",
    points:[
      "Completed real-world consulting projects including data cleaning and analysis",
      "Created client presentations using Excel and Power BI",
    ],
  },
  {
    company:"CodSoft", role:"Virtual Internship", duration:"Virtual",
    color:"#8b5cf6", icon:"🤖",
    points:[
      "Data science and machine learning focused internship",
      "Built Credit Card Fraud Detection model",
      "Improved skills in Python, EDA, and model evaluation techniques",
    ],
  },
];

const PROJECTS = [
    {
    title:"Live Weather App",
    subtitle:"Personal Project | React · OpenWeatherMap API",
    description:"A real-time weather application built with React. Features city search, 5-day forecast, °C/°F toggle, geolocation auto-detect, search history with localStorage, and animated skeleton loading. Deployed on Vercel.",
    tags:["React","REST API","async/await","localStorage","CSS"],
    color:"#06b6d4",
    icon:"🌤",
    links:[
      { label:"Live Demo", url:"https://weather-app-xi-weld-77.vercel.app/" },
    ],
  },
  {
    title:"AI-Powered Conversational Chatbot", subtitle:"Personal Project | Jan 2026 – Feb 2026",
    description:"Developed an AI-powered conversational chatbot using Python through rule-based logic, intent recognition, and sentiment analysis. Handles greetings, small talk, FAQs, emotional responses using NLP. Integrated contextual memory for better flow, deployed via Streamlit.",
    tags:["Python","NLP","Sentiment Analysis","Streamlit","AI"], color:"#f59e0b", icon:"🤖",
  },
  {
    title:"Professional Client Websites", subtitle:"Adshi5 Internship | June – Dec 2025",
    description:"Developed multiple production-ready client websites using Next.js: Gunam Super Speciality Hospital, Accu Dental & Orthodontics (7+ locations), Northern Dental, Nagasai Temple, and Vacaville Dental Group landing page.",
    tags:["Next.js","React","SSR","SEO","CSS"], color:"#10b981", icon:"💼",
    links:[
      { label:"Gunam Hospital",  url:"https://gunamhospital.org/" },
      { label:"Accu Dental",     url:"https://www.accu-dental.com/" },
      { label:"Northern Dental", url:"https://www.northerndental.com/" },
      { label:"Nagasai Temple",  url:"https://www.nagasaitemple.org/" },
    ],
  },
  {
    title:"StuDesk — Student Database Management", subtitle:"Academic Project",
    description:"Built using Python, Streamlit, and SQLite for managing student academic records with a clean dashboard, real-time data updates, and intuitive forms supporting full CRUD operations.",
    tags:["Python","Streamlit","SQLite","CRUD"], color:"#3b82f6", icon:"🎓",
    github:"https://github.com/Deepakragavan1013/StuDesk-Student-Database-Management-System",
  },
  {
    title:"Restaurant Reservation App", subtitle:"Full-Stack Project",
    description:"Full-stack reservation system using React (Frontend), Node.js + Express (Backend), and MySQL (Database). Features booking, editing, viewing, and deleting reservations.",
    tags:["React","Node.js","Express","MySQL"], color:"#ec4899", icon:"🍽️",
    github:"https://github.com/Deepakragavan1013/Restaurant-reservation",
  },
  {
    title:"Credit Card Fraud Detection", subtitle:"ML Project",
    description:"Built a machine learning model to detect fraudulent transactions using classification algorithms, focusing on handling imbalanced data and optimizing prediction accuracy.",
    tags:["Python","Scikit-learn","ML","EDA"], color:"#8b5cf6", icon:"💳",
    github:"https://github.com/Deepakragavan1013/codsoft/blob/main/ctask5%20(1).ipynb",
  },
  {
    title:"MovieLens Data Analysis", subtitle:"Data Analytics Project",
    description:"Performed Exploratory Data Analysis on the MovieLens dataset to uncover user trends and movie preferences using advanced data visualization techniques.",
    tags:["Python","EDA","Pandas","Matplotlib"], color:"#06b6d4", icon:"🎬",
    github:"https://github.com/Deepakragavan1013/MovieLens-data-analysis-",
  },
];

const CERTIFICATIONS = [
  { title:"Microsoft Excel — Learn MS Excel For Data Analysis",      issuer:"Udemy",  url:"https://ude.my/UC-b648d98c-f01c-459b-a37e-telea4c7c212",                                   valid:"May 2025 · No Expiry", icon:"📊" },
  { title:"Frontend Fundamentals (HTML5 & CSS3)",                    issuer:"Pirple", url:"https://www.pirple.com/certificates/p8s6m1diee",                                            valid:"May 2024 · No Expiry", icon:"🌐" },
  { title:"Node.js Crash Course: Build a REST API in a Weekend",     issuer:"Udemy",  url:"https://ude.my/UC-15869344-c36a-4b09-9bf1-fdc28275bd79",                                   valid:"No Expiry",            icon:"⚙️" },
  { title:"Mastering Power BI: From Data to Dashboard",              issuer:"Udemy",  url:"https://ude.my/UC-6e886dbf-6322-4114-8738-71d6afc50887",                                   valid:"No Expiry",            icon:"📈" },
  { title:"Data Mining With Python",                                 issuer:"Pirple", url:"https://www.pirple.com/certificates/yxtpizstlx",                                            valid:"No Expiry",            icon:"🔍" },
  { title:"The Complete JavaScript Course: From Zero to Expert",     issuer:"Udemy",  url:"https://www.udemy.com/certificate/UC-2dacf5d4-a109-4a6b-a98f-0915aa655351/",               valid:"No Expiry",            icon:"✨" },
  { title:"Data Analytics in Python",  issuer:"Certification", valid:"No Expiry", icon:"🐍" },
  { title:"Deep Learning",             issuer:"NPTEL",         valid:"No Expiry", icon:"🧠" },
  { title:"Predictive Analysis",       issuer:"Certification", valid:"No Expiry", icon:"🎯" },
  { title:"AI Tools Workshop",         issuer:"Workshop",      valid:"No Expiry", icon:"🤖" },
  { title:"Prompt Engineering",        issuer:"Certification", valid:"No Expiry", icon:"💬" },
];

/* ── helpers ─────────────────────────────────────────────── */
function useIntersection(ref, threshold = 0.08) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return v;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const v = useIntersection(ref);
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(22px)", transition:`opacity .6s ease ${delay}s, transform .6s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function TypingRoles() {
  const [idx,setIdx] = useState(0);
  const [text,setText] = useState("");
  const [del,setDel] = useState(false);
  useEffect(() => {
    const full = ROLES[idx]; let t;
    if (!del && text.length < full.length)       t = setTimeout(() => setText(full.slice(0,text.length+1)), 80);
    else if (!del && text.length === full.length) t = setTimeout(() => setDel(true), 1800);
    else if (del && text.length > 0)              t = setTimeout(() => setText(text.slice(0,-1)), 45);
    else { setDel(false); setIdx((idx+1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [text,del,idx]);
  return <span style={{color:"#f59e0b",fontWeight:700}}>{text}<span style={{animation:"blink 1s step-end infinite"}}>|</span></span>;
}

function SkillBar({ skill }) {
  const ref = useRef();
  const v = useIntersection(ref);
  const C = { Data:"#f59e0b","AI/ML":"#8b5cf6",Web:"#06b6d4",Viz:"#10b981",Tools:"#ec4899" };
  const color = C[skill.category] || "#f59e0b";
  return (
    <div ref={ref} className="card">
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontSize:".85rem",fontWeight:600}}>{skill.name}</span>
        <span style={{fontSize:"11px",color,fontWeight:700}}>{skill.level}%</span>
      </div>
      <div style={{height:6,background:"rgba(255,255,255,.06)",borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:4,width:v?`${skill.level}%`:"0%",background:`linear-gradient(90deg,${color},${color}88)`,transition:"width 1.3s cubic-bezier(.16,1,.3,1)"}} />
      </div>
      <span style={{fontSize:"10px",color:"#5a5470",background:`${color}18`,padding:"2px 8px",borderRadius:20,border:`1px solid ${color}28`,marginTop:6,display:"inline-block"}}>{skill.category}</span>
    </div>
  );
}

const GH = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

/* ── main component ──────────────────────────────────────── */
export default function Portfolio() {
  const [active,setActive] = useState("About");
  const [menuOpen,setMenuOpen] = useState(false);
  const [form,setForm] = useState({name:"",email:"",message:""});
  const [sent,setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 130;
      for (let i = NAV_ITEMS.length-1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].toLowerCase());
        if (el && el.offsetTop <= y) { setActive(NAV_ITEMS[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"});
    setMenuOpen(false);
  };

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#09090f",color:"#e8e6f0",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=Syne:wght@700;800&display=swap');

        /* ── reset ── */
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{overflow-x:hidden;-webkit-text-size-adjust:100%}
        img{max-width:100%;display:block}
        a{color:inherit;text-decoration:none}
        button{font-family:inherit}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#f59e0b;border-radius:2px}

        /* ── reusable ── */
        .card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:1.25rem;transition:border-color .3s,transform .3s,box-shadow .3s}
        .card:hover{border-color:rgba(245,158,11,.35);transform:translateY(-3px);box-shadow:0 12px 36px rgba(245,158,11,.07)}
        .tag{display:inline-block;padding:2px 9px;border-radius:20px;font-size:10.5px;font-weight:600;background:rgba(245,158,11,.1);color:#f59e0b;border:1px solid rgba(245,158,11,.22);margin:2px}
        .sh{font-family:'Syne',sans-serif;font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:800;letter-spacing:-1px;margin-bottom:.25rem}
        .sl{width:44px;height:4px;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:2px;margin-bottom:2rem}
        .lbtn{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);border-radius:8px;font-size:11.5px;color:#f59e0b;transition:all .2s;cursor:pointer;white-space:nowrap}
        .lbtn:hover{background:rgba(245,158,11,.22)}
        .cinput{width:100%;padding:12px 15px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#e8e6f0;font-family:inherit;font-size:14px;outline:none;transition:border-color .2s}
        .cinput:focus{border-color:#f59e0b}
        .cinput::placeholder{color:#5a5470}

        /* ── nav ── */
        .npill{padding:6px 11px;border-radius:30px;font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;border:none;background:transparent;color:#9991b0;white-space:nowrap}
        .npill.act,.npill:hover{background:rgba(245,158,11,.15);color:#f59e0b}
        .hirebtn{position:relative;overflow:hidden;padding:8px 16px;border-radius:30px;font-size:12.5px;font-weight:700;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#000;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:5px;box-shadow:0 4px 18px rgba(245,158,11,.35);transition:transform .2s,box-shadow .2s;white-space:nowrap;text-decoration:none;flex-shrink:0}
        .hirebtn::after{content:'';position:absolute;top:-50%;left:-75%;width:50%;height:200%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);transform:skewX(-20deg);animation:sweep 2.8s ease-in-out infinite}
        .hirebtn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(245,158,11,.5)}
        .hburg{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:6px;border:none;background:transparent;flex-shrink:0}
        .hburg span{width:20px;height:2px;background:#e8e6f0;border-radius:2px;transition:all .3s;display:block}
        .mmenu{display:none;position:fixed;top:56px;left:0;right:0;bottom:0;background:rgba(9,9,15,.98);backdrop-filter:blur(20px);padding:.75rem 1rem;z-index:98;flex-direction:column;gap:2px;overflow-y:auto}
        .mmenu.open{display:flex}

        /* ── hero name ── */
        .hname{font-family:'Syne',sans-serif;font-weight:800;line-height:1.15;background:linear-gradient(135deg,#fff 0%,#f59e0b 40%,#ef4444 70%,#fff 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;padding-bottom:4px;word-break:break-word}

        /* ── profile ring ── */
        .pring{position:relative;flex-shrink:0}
        .pring::before{content:'';position:absolute;inset:-4px;border-radius:50%;background:conic-gradient(#f59e0b,#ef4444,#8b5cf6,#f59e0b);animation:spin 4s linear infinite}
        .pring::after{content:'';position:absolute;inset:-2px;border-radius:50%;background:#09090f}
        .pring img,.pring .pph{position:relative;z-index:1;width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}
        .pph{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:2.4rem;background:linear-gradient(135deg,#1a1a2e,#16213e)}

        /* ── keyframes ── */
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes sweep{0%{left:-75%}100%{left:125%}}
        @keyframes floatup{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes orbit{from{transform:rotate(0deg) translateX(120px) rotate(0deg)}to{transform:rotate(360deg) translateX(120px) rotate(-360deg)}}
        @keyframes orbit2{from{transform:rotate(180deg) translateX(85px) rotate(-180deg)}to{transform:rotate(540deg) translateX(85px) rotate(-540deg)}}
        @keyframes pglow{0%,100%{box-shadow:0 0 0 0 rgba(245,158,11,.35)}50%{box-shadow:0 0 0 10px rgba(245,158,11,0)}}

        /* ════════════════════════════════════
           RESPONSIVE BREAKPOINTS
           ════════════════════════════════════

           xs   : < 480px   (small phones)
           sm   : 480–767px (large phones)
           md   : 768–1023px (tablets / iPads)
           lg   : 1024–1279px (laptops)
           xl   : 1280px+   (large screens)
        */

        /* ── xl: large screens ── */
        @media(min-width:1280px){
          .herogrid{gap:5rem!important}
          .pring{width:210px!important;height:210px!important}
        }

        /* ── md: tablets / iPads (768–1023) ── */
        @media(max-width:1023px){
          .navlinks{display:none!important}
          .hburg{display:flex!important}
          .herogrid{grid-template-columns:1fr!important;text-align:center;gap:2rem!important}
          .profside{justify-content:center!important;order:-1}
          .herobtns{justify-content:center!important}
          .herobadge{justify-content:center!important}
          .orbitring{display:none!important}
          .pring{width:150px!important;height:150px!important}
          .statsgrid{grid-template-columns:repeat(4,1fr)!important;gap:.6rem!important}
          .contactgrid{grid-template-columns:1fr 1fr!important}
          .projectsgrid{grid-template-columns:repeat(2,1fr)!important}
          .skillsgrid{grid-template-columns:repeat(2,1fr)!important}
          .certgrid{grid-template-columns:repeat(2,1fr)!important}
        }

        /* ── sm: large phones (480–767) ── */
        @media(max-width:767px){
          .hname{font-size:clamp(1.5rem,6vw,2.1rem)!important;letter-spacing:-.5px!important}
          .pring{width:120px!important;height:120px!important}
          .statsgrid{grid-template-columns:repeat(2,1fr)!important;gap:.5rem!important}
          .projectsgrid{grid-template-columns:1fr!important}
          .skillsgrid{grid-template-columns:1fr!important}
          .certgrid{grid-template-columns:1fr!important}
          .contactgrid{grid-template-columns:1fr!important}
          .pubcard{flex-direction:column!important;gap:.75rem!important}
          .hire-label{display:none}
          .hirebtn{padding:8px 10px!important;border-radius:50%!important;width:36px!important;height:36px!important;justify-content:center!important}
          .hirebtn::after{display:none}
          #about{padding:76px 4vw 48px!important}
          .herogrid{gap:1.5rem!important}
        }

        /* ── xs: small phones (< 480) ── */
        @media(max-width:479px){
          nav{padding:0 .85rem!important}
          .hname{font-size:clamp(1.25rem,7.5vw,1.7rem)!important;letter-spacing:0!important}
          .pring{width:100px!important;height:100px!important}
          .statsgrid{grid-template-columns:repeat(2,1fr)!important;gap:.4rem!important}
          .card{padding:1rem!important}
          .sh{font-size:1.5rem!important}
          .herobtns a,.herobtns button{padding:9px 14px!important;font-size:12.5px!important}
          .mmenu{padding:.5rem .75rem}
        }
      `}</style>

      {/* ══ NAVBAR ══════════════════════════════════════════ */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(9,9,15,.95)",backdropFilter:"blur(22px)",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"0 1.25rem",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",gap:".5rem"}}>

        <button onClick={() => go("About")} style={{border:"none",background:"none",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(.68rem,1.8vw,.9rem)",backgroundImage:"linear-gradient(135deg,#f59e0b,#ef4444)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:".3px",whiteSpace:"nowrap",flexShrink:0,padding:0}}>
          DEEPAKRAGAVAN J
        </button>

        <div className="navlinks" style={{display:"flex",gap:0,flexShrink:1,overflow:"hidden"}}>
          {NAV_ITEMS.map(n => (
            <button key={n} className={`npill${active===n?" act":""}`} onClick={() => go(n)}>{n}</button>
          ))}
        </div>

        <div style={{display:"flex",alignItems:"center",gap:".5rem",flexShrink:0}}>
          <a href="mailto:cf012deepakragavan@gmail.com" className="hirebtn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span className="hire-label">Hire Me</span>
          </a>
          <button className="hburg" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span style={{transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none"}} />
            <span style={{opacity:menuOpen?0:1}} />
            <span style={{transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none"}} />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div className={`mmenu${menuOpen?" open":""}`}>
        {NAV_ITEMS.map(n => (
          <button key={n} className={`npill${active===n?" act":""}`} onClick={() => go(n)}
            style={{textAlign:"left",width:"100%",padding:"11px 14px",borderRadius:10,fontSize:"14px"}}>
            {n}
          </button>
        ))}
        <div style={{borderTop:"1px solid rgba(255,255,255,.07)",marginTop:".6rem",paddingTop:".6rem"}}>
          <a href="mailto:cf012deepakragavan@gmail.com"
            style={{display:"flex",alignItems:"center",gap:8,padding:"11px 14px",color:"#f59e0b",fontSize:"13px",fontWeight:600}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            cf012deepakragavan@gmail.com
          </a>
        </div>
      </div>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section id="about" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"80px 5vw 60px",position:"relative",overflow:"hidden"}}>
        {/* bg glows */}
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 70% at 60% 45%,rgba(245,158,11,.06),transparent)",pointerEvents:"none"}} />
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 40% 50% at 15% 70%,rgba(239,68,68,.04),transparent)",pointerEvents:"none"}} />

        {/* orbiting rings */}
        <div className="orbitring" style={{position:"absolute",top:"50%",right:"6%",width:250,height:250,borderRadius:"50%",border:"1px solid rgba(245,158,11,.1)",transform:"translateY(-50%)",pointerEvents:"none"}}>
          <div style={{position:"absolute",top:"50%",left:"50%",width:9,height:9,borderRadius:"50%",background:"#f59e0b",marginLeft:-4.5,marginTop:-4.5,animation:"orbit 8s linear infinite",boxShadow:"0 0 12px #f59e0b"}} />
        </div>
        <div className="orbitring" style={{position:"absolute",top:"50%",right:"6%",width:172,height:172,borderRadius:"50%",border:"1px dashed rgba(239,68,68,.12)",transform:"translateY(-50%)",pointerEvents:"none"}}>
          <div style={{position:"absolute",top:"50%",left:"50%",width:6,height:6,borderRadius:"50%",background:"#ef4444",marginLeft:-3,marginTop:-3,animation:"orbit2 5s linear infinite",boxShadow:"0 0 8px #ef4444"}} />
        </div>

        {/* floating particles */}
        {[{t:"22%",l:"4%",s:4,d:"0s",r:"7s"},{t:"68%",l:"2%",s:3,d:"1.2s",r:"9s"},{t:"78%",l:"87%",s:3,d:".6s",r:"8s"}].map((p,i) => (
          <div key={i} style={{position:"absolute",top:p.t,left:p.l,width:p.s,height:p.s,borderRadius:"50%",background:"#f59e0b",opacity:.4,animation:`floatup ${p.r} ease-in-out infinite`,animationDelay:p.d,pointerEvents:"none",boxShadow:`0 0 ${p.s*3}px #f59e0b`}} />
        ))}

        <div className="herogrid" style={{maxWidth:1200,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr auto",gap:"3.5rem",alignItems:"center"}}>

          {/* ── left: text ── */}
          <div>
            <div className="herobadge" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 13px",background:"rgba(245,158,11,.1)",borderRadius:30,border:"1px solid rgba(245,158,11,.2)",marginBottom:"1.2rem"}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",flexShrink:0,animation:"pglow 2s infinite"}} />
              <span style={{fontSize:11.5,color:"#f59e0b",fontWeight:600}}>Open to Work</span>
            </div>

            <h1 className="hname" style={{fontSize:"clamp(1.8rem,3.2vw,3rem)",marginBottom:".8rem"}}>
              Deepakragavan J
            </h1>

            <p style={{fontSize:"clamp(.9rem,1.8vw,1.1rem)",color:"#9991b0",marginBottom:"1.2rem",minHeight:"1.8rem"}}>
              <TypingRoles />
            </p>

            <p style={{fontSize:".9rem",color:"#7a7290",lineHeight:1.85,maxWidth:500,marginBottom:"1.8rem"}}>
              Computer Science Engineering graduate specializing in Data Science. Builds production-ready web apps with Next.js, ML pipelines with Python, and insightful dashboards with Power BI & Tableau.
            </p>

            <div className="herobtns" style={{display:"flex",gap:".75rem",flexWrap:"wrap"}}>
              <button onClick={() => go("Projects")} style={{padding:"11px 24px",background:"linear-gradient(135deg,#f59e0b,#ef4444)",borderRadius:30,fontWeight:700,fontSize:13.5,color:"#000",border:"none",cursor:"pointer"}}>
                View Projects
              </button>
              <a href="https://www.linkedin.com/in/deepakragavan-j/" target="_blank" rel="noreferrer"
                style={{padding:"11px 18px",background:"rgba(255,255,255,.05)",borderRadius:30,fontWeight:600,fontSize:13.5,color:"#e8e6f0",border:"1px solid rgba(255,255,255,.12)",display:"inline-flex",alignItems:"center",gap:7}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/Deepakragavan1013" target="_blank" rel="noreferrer"
                style={{padding:"11px 18px",background:"rgba(255,255,255,.05)",borderRadius:30,fontWeight:600,fontSize:13.5,color:"#e8e6f0",border:"1px solid rgba(255,255,255,.12)",display:"inline-flex",alignItems:"center",gap:7}}>
                {GH} GitHub
              </a>
            </div>
          </div>

          {/* ── right: photo + stats ── */}
          <div className="profside" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"1.4rem"}}>
            <div className="pring" style={{width:190,height:190}}>
              <img src="assets/profile.jpg" alt="Deepakragavan J"
                onError={e => { e.target.style.display="none"; document.getElementById("pph").style.display="flex"; }} />
              <div id="pph" className="pph" style={{display:"none"}}>
                <span>👨‍💻</span>
                <span style={{fontSize:"9px",color:"#7a7290",textAlign:"center",lineHeight:1.4}}>Add assets/profile.jpg</span>
              </div>
            </div>

            <div className="statsgrid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".65rem"}}>
              {[
                {n:"8.7",  l:"CGPA",         sub:null},
                {n:"5+",   l:"Live Websites", sub:"via Internship"},
                {n:"6+",   l:"Projects",      sub:null},
                {n:"11+",  l:"Certs",         sub:null},
              ].map(({n,l,sub}) => (
                <div key={l} className="card" style={{textAlign:"center",padding:".85rem .7rem"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.5rem",fontWeight:800,color:"#f59e0b"}}>{n}</div>
                  <div style={{fontSize:"10px",color:"#7a7290",marginTop:3,fontWeight:500}}>{l}</div>
                  {sub && <div style={{fontSize:"9px",color:"#f59e0b",opacity:.75,marginTop:2,fontWeight:600}}>{sub}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTENT ═════════════════════════════════════════ */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 5vw"}}>

        {/* EDUCATION */}
        <section id="education" style={{padding:"70px 0"}}>
          <FadeIn><div className="sh">Education</div><div className="sl"/></FadeIn>
          <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            {EDUCATION.map((e,i) => (
              <FadeIn key={i} delay={i*.1}>
                <div className="card" style={{display:"flex",gap:"1rem",alignItems:"flex-start"}}>
                  <div style={{fontSize:"1.4rem",flexShrink:0,background:"rgba(245,158,11,.1)",width:46,height:46,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"}}>{e.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",marginBottom:3}}>{e.degree}</div>
                    <div style={{color:"#9991b0",fontSize:".84rem"}}>{e.school}</div>
                    <div style={{display:"flex",gap:"1rem",marginTop:7,flexWrap:"wrap"}}>
                      <span style={{fontSize:"11px",color:"#7a7290"}}>📅 {e.year}</span>
                      <span style={{fontSize:"11px",color:"#f59e0b",fontWeight:700}}>🏆 {e.score}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{padding:"70px 0"}}>
          <FadeIn><div className="sh">Skills</div><div className="sl"/></FadeIn>
          <div className="skillsgrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:".9rem"}}>
            {SKILLS.map((s,i) => <FadeIn key={s.name} delay={i*.05}><SkillBar skill={s}/></FadeIn>)}
          </div>
        </section>

        {/* INTERNSHIPS */}
        <section id="internships" style={{padding:"70px 0"}}>
          <FadeIn><div className="sh">Internships</div><div className="sl"/></FadeIn>
          <div style={{display:"flex",flexDirection:"column",gap:"1.1rem"}}>
            {INTERNSHIPS.map((it,i) => (
              <FadeIn key={i} delay={i*.1}>
                <div className="card" style={{borderLeft:`3px solid ${it.color}`}}>
                  <div style={{display:"flex",gap:"1rem",alignItems:"flex-start",marginBottom:".9rem"}}>
                    <span style={{fontSize:"1.5rem",flexShrink:0}}>{it.icon}</span>
                    <div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".97rem"}}>{it.company}</div>
                      <div style={{color:it.color,fontSize:".81rem",fontWeight:600}}>{it.role}</div>
                      <div style={{color:"#7a7290",fontSize:"11px",marginTop:2}}>📅 {it.duration}</div>
                    </div>
                  </div>
                  <ul style={{paddingLeft:"1.1rem",display:"flex",flexDirection:"column",gap:5}}>
                    {it.points.map((p,j) => <li key={j} style={{fontSize:".83rem",color:"#a09ab8",lineHeight:1.65}}>{p}</li>)}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{padding:"70px 0"}}>
          <FadeIn><div className="sh">Projects</div><div className="sl"/></FadeIn>
          <div className="projectsgrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1.1rem"}}>
            {PROJECTS.map((p,i) => (
              <FadeIn key={i} delay={i*.07}>
                <div className="card" style={{height:"100%",display:"flex",flexDirection:"column",borderTop:`2px solid ${p.color}`}}>
                  <div style={{display:"flex",gap:".85rem",alignItems:"center",marginBottom:".7rem"}}>
                    <span style={{fontSize:"1.6rem",background:`${p.color}18`,padding:"7px",borderRadius:10,flexShrink:0}}>{p.icon}</span>
                    <div style={{minWidth:0}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".88rem",lineHeight:1.35}}>{p.title}</div>
                      <div style={{fontSize:"10px",color:"#7a7290",marginTop:2}}>{p.subtitle}</div>
                    </div>
                  </div>
                  <p style={{fontSize:".81rem",color:"#9991b0",lineHeight:1.72,flex:1,marginBottom:".85rem"}}>{p.description}</p>
                  <div style={{marginBottom:".7rem"}}>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                  <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="lbtn">{GH} GitHub</a>}
                    {p.links?.map(l => <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="lbtn">🔗 {l.label}</a>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* PUBLICATIONS */}
        <section id="publications" style={{padding:"70px 0"}}>
          <FadeIn><div className="sh">Publications</div><div className="sl"/></FadeIn>
          <FadeIn delay={.1}>
            <div className="card pubcard" style={{borderLeft:"3px solid #f59e0b",display:"flex",gap:"1.4rem",alignItems:"flex-start"}}>
              <div style={{fontSize:"2.2rem",flexShrink:0}}>📄</div>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:7,lineHeight:1.45}}>
                  Scalable Data Processing for Social Media Analysis with Sentiment Analysis
                </div>
                <div style={{color:"#9991b0",fontSize:".84rem",marginBottom:5}}><strong style={{color:"#f59e0b"}}>Journal:</strong> IJPREMS, Vol. 05, Issue 04, April 2025</div>
                <div style={{color:"#9991b0",fontSize:".84rem",marginBottom:8}}><strong style={{color:"#f59e0b"}}>Paper ID:</strong> IJPREMS50400029837</div>
                <a href="https://doi.org/10.58257/IJPREMS39784" target="_blank" rel="noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:6,color:"#f59e0b",fontSize:".84rem",fontWeight:600}}>
                  🔗 DOI: 10.58257/IJPREMS39784
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" style={{padding:"70px 0"}}>
          <FadeIn><div className="sh">Certifications</div><div className="sl"/></FadeIn>
          <div className="certgrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:".9rem"}}>
            {CERTIFICATIONS.map((c,i) => (
              <FadeIn key={i} delay={i*.04}>
                <div className="card" style={{display:"flex",gap:".9rem",alignItems:"flex-start"}}>
                  <span style={{fontSize:"1.3rem",flexShrink:0}}>{c.icon}</span>
                  <div>
                    <div style={{fontSize:".82rem",fontWeight:600,lineHeight:1.4,marginBottom:3}}>
                      {c.url
                        ? <a href={c.url} target="_blank" rel="noreferrer" style={{color:"#e8e6f0"}}>{c.title}</a>
                        : c.title}
                    </div>
                    <div style={{fontSize:"11px",color:"#f59e0b",fontWeight:600}}>{c.issuer}</div>
                    <div style={{fontSize:"10.5px",color:"#5a5470",marginTop:2}}>{c.valid}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{padding:"70px 0"}}>
          <FadeIn><div className="sh">Contact Me</div><div className="sl"/></FadeIn>
          <div className="contactgrid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2.5rem"}}>
            <FadeIn delay={.1}>
              <div>
                <p style={{color:"#9991b0",lineHeight:1.85,marginBottom:"1.6rem",fontSize:".9rem"}}>
                  Actively looking for full-time opportunities in Data Analytics, Frontend Development, or ML Engineering. Let's connect!
                </p>
                <div style={{display:"flex",flexDirection:"column",gap:".9rem"}}>
                  {[
                    {icon:"📧",label:"Email",    val:"cf012deepakragavan@gmail.com",     href:"mailto:cf012deepakragavan@gmail.com"},
                    {icon:"📞",label:"Phone",    val:"+91 8608682275",                   href:"tel:+918608682275"},
                    {icon:"📍",label:"Location", val:"Namakkal, Tamil Nadu — 637412",    href:null},
                    {icon:"🔗",label:"LinkedIn", val:"linkedin.com/in/deepakragavan-j",  href:"https://www.linkedin.com/in/deepakragavan-j/"},
                    {icon:"💻",label:"GitHub",   val:"github.com/Deepakragavan1013",     href:"https://github.com/Deepakragavan1013"},
                  ].map(({icon,label,val,href}) => (
                    <div key={label} style={{display:"flex",gap:".85rem",alignItems:"center"}}>
                      <span style={{fontSize:"1rem",width:28,textAlign:"center",flexShrink:0}}>{icon}</span>
                      <div style={{minWidth:0}}>
                        <div style={{fontSize:"10px",color:"#5a5470",fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
                        {href
                          ? <a href={href} target="_blank" rel="noreferrer" style={{fontSize:".84rem",color:"#f59e0b",wordBreak:"break-all"}}>{val}</a>
                          : <span style={{fontSize:".84rem",color:"#9991b0"}}>{val}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={.2}>
              {sent ? (
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:300,gap:"1rem",textAlign:"center"}}>
                  <div style={{fontSize:"3rem"}}>✅</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.2rem",color:"#22c55e"}}>Message Sent!</div>
                  <p style={{color:"#7a7290"}}>Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:".85rem"}}>
                  <input  className="cinput" placeholder="Full Name"      value={form.name}    onChange={e => setForm({...form,name:e.target.value})} />
                  <input  className="cinput" placeholder="Email Address"  value={form.email}   onChange={e => setForm({...form,email:e.target.value})} />
                  <textarea className="cinput" rows={5} placeholder="Your Message..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} style={{resize:"vertical"}} />
                  <button
                    onClick={async () => {
                      const r = await fetch("https://formspree.io/f/mkgrwvvw",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
                      if (r.ok) setSent(true);
                    }}
                    style={{padding:"13px",background:"linear-gradient(135deg,#f59e0b,#ef4444)",borderRadius:12,fontWeight:700,fontSize:14,color:"#000",border:"none",cursor:"pointer"}}>
                    Send Message →
                  </button>
                </div>
              )}
            </FadeIn>
          </div>
        </section>

        <footer style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"1.8rem 0",textAlign:"center",color:"#5a5470",fontSize:".82rem"}}>
          Designed & Built by <span style={{color:"#f59e0b",fontWeight:700}}>Deepakragavan J</span> · {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}