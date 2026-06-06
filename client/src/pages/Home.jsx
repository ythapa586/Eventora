import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaRegClock,
  FaTicketAlt,
  FaShieldAlt,
  FaArrowRight,
  FaFire,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/* ─── Event image data with auto-slideshow ───────────────────── */
const EVENT_IMAGES = {
  "tech fest": [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
  ],
  "music": [
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
  ],
  "startup": [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
  ],
  "gaming": [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
  ],
  "ai": [
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  ],
};

/* Match an event title to an image set */
function getImagesForEvent(title = "", index = 0) {
  const t = title.toLowerCase();
  if (t.includes("tech") || t.includes("fest"))   return EVENT_IMAGES["tech fest"];
  if (t.includes("music") || t.includes("night")) return EVENT_IMAGES["music"];
  if (t.includes("startup") || t.includes("summit")) return EVENT_IMAGES["startup"];
  if (t.includes("gaming") || t.includes("championship")) return EVENT_IMAGES["gaming"];
  if (t.includes("ai") || t.includes("workshop")) return EVENT_IMAGES["ai"];
  // fallback by index
  const keys = Object.keys(EVENT_IMAGES);
  return EVENT_IMAGES[keys[index % keys.length]];
}

/* ─── Inline global styles ─────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

    :root {
      --gold: #C9A84C;
      --gold-light: #F0D080;
      --charcoal: #0E0E0F;
      --surface: #161618;
      --card: #1C1C1F;
      --muted: #5A5A65;
      --text: #F0EDE8;
      --text-dim: #9A9490;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--charcoal); color: var(--text); font-family: 'DM Sans', sans-serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33%       { transform: translateY(-18px) rotate(2deg); }
      66%       { transform: translateY(-8px) rotate(-1deg); }
    }
    @keyframes scanline {
      0%   { top: -10%; }
      100% { top: 110%; }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes imgFade {
      from { opacity: 0; transform: scale(1.06); }
      to   { opacity: 1; transform: scale(1); }
    }

    .hero-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(68px, 12vw, 160px);
      line-height: 0.9;
      letter-spacing: 0.01em;
      background: linear-gradient(135deg, #F0EDE8 0%, var(--gold) 45%, #F0EDE8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: fadeUp 1s ease both;
    }
    .hero-sub {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: clamp(18px, 2.5vw, 26px);
      color: var(--text-dim);
      animation: fadeUp 1s 0.2s ease both;
    }
    .hero-cta { animation: fadeUp 1s 0.4s ease both; }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 10px;
      background: var(--gold); color: #0E0E0F;
      font-family: 'DM Sans', sans-serif; font-weight: 600;
      font-size: 15px; letter-spacing: 0.04em; text-transform: uppercase;
      padding: 14px 32px; border-radius: 2px; text-decoration: none;
      transition: background 0.25s, transform 0.2s;
    }
    .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 10px;
      border: 1px solid rgba(240,237,232,0.25); color: var(--text);
      font-family: 'DM Sans', sans-serif; font-weight: 500;
      font-size: 15px; letter-spacing: 0.04em; text-transform: uppercase;
      padding: 14px 32px; border-radius: 2px; text-decoration: none;
      transition: border-color 0.25s, background 0.25s, transform 0.2s;
    }
    .btn-ghost:hover { border-color: var(--gold); background: rgba(201,168,76,0.08); transform: translateY(-2px); }

    .section-label {
      font-family: 'DM Sans', sans-serif; font-size: 11px;
      font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
    }
    .section-heading {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(42px, 6vw, 80px); line-height: 0.95;
      color: var(--text); letter-spacing: 0.02em;
    }

    .feature-card {
      background: var(--card); border: 1px solid rgba(201,168,76,0.12);
      border-radius: 4px; padding: 40px 32px;
      transition: border-color 0.3s, transform 0.3s;
      position: relative; overflow: hidden;
    }
    .feature-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .feature-card:hover { border-color: rgba(201,168,76,0.4); transform: translateY(-6px); }
    .feature-card:hover::before { opacity: 1; }

    /* ── Event card with slideshow ── */
    .event-card {
      background: var(--card); border: 1px solid rgba(255,255,255,0.06);
      border-radius: 4px; overflow: hidden;
      transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .event-card:hover {
      transform: translateY(-8px); border-color: rgba(201,168,76,0.3);
      box-shadow: 0 24px 60px rgba(0,0,0,0.5);
    }

    .slide-img {
      width: 100%; height: 100%; object-fit: cover; display: block;
      animation: imgFade 0.7s ease both;
    }

    /* Dot indicators */
    .slide-dots { display: flex; gap: 5px; }
    .slide-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: rgba(255,255,255,0.3); cursor: pointer;
      transition: background 0.3s, transform 0.2s;
      border: none; padding: 0;
    }
    .slide-dot.active { background: var(--gold); transform: scale(1.3); }

    /* Arrow buttons */
    .slide-arrow {
      position: absolute; top: 50%; transform: translateY(-50%);
      background: rgba(14,14,15,0.6); border: 1px solid rgba(201,168,76,0.3);
      color: var(--gold); border-radius: 2px;
      width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; opacity: 0; transition: opacity 0.25s, background 0.2s;
      z-index: 3;
    }
    .event-card:hover .slide-arrow { opacity: 1; }
    .slide-arrow:hover { background: rgba(201,168,76,0.2); }
    .slide-arrow-left  { left: 8px; }
    .slide-arrow-right { right: 8px; }

    /* Progress bar */
    @keyframes progress { from { width: 0%; } to { width: 100%; } }
    .slide-progress-bar {
      position: absolute; bottom: 0; left: 0; height: 2px;
      background: var(--gold); animation: progress 3s linear;
    }

    .search-bar {
      background: var(--card); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 3px; transition: border-color 0.25s, box-shadow 0.25s;
    }
    .search-bar:focus-within { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
    .search-bar input {
      background: transparent; border: none; outline: none;
      color: var(--text); font-family: 'DM Sans', sans-serif;
      font-size: 16px; width: 100%;
    }
    .search-bar input::placeholder { color: var(--muted); }

    .ticker-wrap { background: var(--gold); overflow: hidden; white-space: nowrap; padding: 10px 0; }
    .ticker-inner { display: inline-block; animation: ticker 28s linear infinite; }
    .ticker-item {
      display: inline-block; font-family: 'Bebas Neue', sans-serif;
      font-size: 14px; letter-spacing: 0.15em; color: #0E0E0F; padding: 0 40px;
    }
    .ticker-dot {
      display: inline-block; width: 5px; height: 5px;
      background: rgba(14,14,15,0.4); border-radius: 50%;
      vertical-align: middle; margin-right: 40px;
    }

    .stat-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(48px, 7vw, 88px); color: var(--gold); line-height: 1;
    }
    .grid-bg {
      background-image:
        linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .tag {
      display: inline-block; font-size: 11px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      padding: 4px 10px; border-radius: 2px;
      background: rgba(201,168,76,0.15); color: var(--gold);
      border: 1px solid rgba(201,168,76,0.25);
    }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
    .animate-in { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .animate-in.visible { opacity: 1; transform: translateY(0); }
    .loading-skeleton {
      background: linear-gradient(90deg, var(--card) 25%, rgba(255,255,255,0.05) 50%, var(--card) 75%);
      background-size: 800px 100%; animation: shimmer 1.5s infinite; border-radius: 4px;
    }
  `}</style>
);

/* ─── Scroll-animation hook ─────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Image Slideshow component ──────────────────────────────── */
const ImageSlideshow = ({ images, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0); // force re-render for progress bar animation

  const goTo = (idx) => {
    setCurrent(idx);
    setKey(k => k + 1);
  };
  const prev = (e) => { e.preventDefault(); e.stopPropagation(); goTo((current - 1 + images.length) % images.length); };
  const next = (e) => { e.preventDefault(); e.stopPropagation(); goTo((current + 1) % images.length); };

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
      setKey(k => k + 1);
    }, interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <img
        key={`${current}-${key}`}
        src={images[current]}
        alt={`slide ${current + 1}`}
        className="slide-img"
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(14,14,15,0.85) 0%, transparent 55%)"
      }} />

      {/* Progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.1)" }}>
        <div key={key} className="slide-progress-bar" />
      </div>

      {/* Arrows */}
      <button className="slide-arrow slide-arrow-left" onClick={prev} aria-label="Previous image">
        <FaChevronLeft style={{ fontSize: 11 }} />
      </button>
      <button className="slide-arrow slide-arrow-right" onClick={next} aria-label="Next image">
        <FaChevronRight style={{ fontSize: 11 }} />
      </button>

      {/* Dots */}
      <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", zIndex: 3 }}>
        <div className="slide-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`slide-dot${i === current ? " active" : ""}`}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Image counter */}
      <div style={{
        position: "absolute", top: 10, right: 10, zIndex: 3,
        background: "rgba(14,14,15,0.65)", borderRadius: 2,
        padding: "2px 8px", fontSize: 11, color: "rgba(240,237,232,0.7)",
        fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em"
      }}>
        {current + 1}/{images.length}
      </div>
    </div>
  );
};

/* ─── Components ─────────────────────────────────────────────── */
const TickerBanner = () => {
  const items = ["Discover Events", "Book Instantly", "Live Experiences", "Music", "Tech", "Business", "Gaming", "Culture"];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            {i < doubled.length - 1 && <span className="ticker-dot" />}
          </span>
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color, delay }) => {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="feature-card animate-in" style={{ transitionDelay: delay }}>
      <div style={{
        width: 56, height: 56, borderRadius: 3,
        background: `rgba(${color},0.12)`,
        border: `1px solid rgba(${color},0.25)`,
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24
      }}>
        <Icon style={{ fontSize: 24, color: `rgb(${color})` }} />
      </div>
      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.04em", marginBottom: 10, color: "var(--text)" }}>
        {title}
      </h3>
      <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
};

/* Static events list shown when API has no data */
const STATIC_EVENTS = [
  {
    _id: "static-1",
    title: "Tech Fest 2026",
    location: "Bangalore, India",
    date: "2026-03-15",
    category: "Tech",
  },
  {
    _id: "static-2",
    title: "Music Night",
    location: "Mumbai, India",
    date: "2026-04-20",
    category: "Music",
  },
  {
    _id: "static-3",
    title: "Startup Summit",
    location: "Delhi, India",
    date: "2026-05-10",
    category: "Business",
  },
  {
    _id: "static-4",
    title: "Gaming Championship",
    location: "Hyderabad, India",
    date: "2026-06-05",
    category: "Gaming",
  },
  {
    _id: "static-5",
    title: "AI Workshop",
    location: "Pune, India",
    date: "2026-07-18",
    category: "Tech",
  },
];

const EventCard = ({ event, index }) => {
  const ref = useScrollReveal();
  const images = getImagesForEvent(event.title, index);

  const categoryColors = {
    Tech: "rgba(100,180,255,0.15)",
    Music: "rgba(255,100,180,0.15)",
    Business: "rgba(100,255,160,0.15)",
    Gaming: "rgba(180,100,255,0.15)",
  };
  const cat = event.category || ["Music", "Tech", "Business", "Gaming", "AI"][index % 5];

  return (
    <div ref={ref} className="event-card animate-in" style={{ transitionDelay: `${index * 80}ms` }}>
      {/* Slideshow image area */}
      <div style={{ position: "relative", height: 220 }}>
        <ImageSlideshow images={images} interval={3000 + index * 500} />

        {/* Category tag on top of slideshow */}
        <div style={{ position: "absolute", top: 14, left: 14, zIndex: 4 }}>
          <span className="tag">{cat}</span>
        </div>

        {index < 3 && (
          <div style={{ position: "absolute", top: 14, right: 46, zIndex: 4, display: "flex", alignItems: "center", gap: 5 }}>
            <FaFire style={{ color: "var(--gold)", fontSize: 12 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Hot</span>
          </div>
        )}
      </div>

      <div style={{ padding: "20px 22px 24px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 12, color: "var(--text)", lineHeight: 1.3 }}>
          {event.title}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-dim)", fontSize: 13 }}>
            <FaMapMarkerAlt style={{ color: "var(--gold)", fontSize: 11, flexShrink: 0 }} />
            {event.location}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-dim)", fontSize: 13 }}>
            <FaRegClock style={{ color: "var(--gold)", fontSize: 11, flexShrink: 0 }} />
            {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        </div>
        <Link to={`/event/${event._id}`} className="btn-primary" style={{ display: "flex", justifyContent: "center" }}>
  View Details <FaArrowRight style={{ fontSize: 13 }} />
</Link>
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────── */
const Home = () => {
  const [event, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const statsRef = useScrollReveal();
  const featureHeadRef = useScrollReveal();
  const eventsHeadRef = useScrollReveal();

  useEffect(() => {
    const timeout = setTimeout(fetchEvents, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get("/event");
      setEvents(data && data.length > 0 ? data : STATIC_EVENTS);
    } catch (err) {
      console.error(err);
      setEvents(STATIC_EVENTS);
    } finally {
      setLoading(false);
    }
  };

  const filtered = event.filter(e =>
    e.title?.toLowerCase().includes(search.toLowerCase()) ||
    e.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: "var(--charcoal)", minHeight: "100vh" }}>
      <GlobalStyles />

      {/* ── HERO ── */}
      <section className="grid-bg" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(201,168,76,0.12)", top: "-100px", right: "-100px" }} />
        <div className="orb" style={{ width: 350, height: 350, background: "rgba(100,50,200,0.08)", bottom: "0", left: "-80px" }} />
        <div style={{ position: "absolute", top: "18%", right: "8%", width: 80, height: 80, border: "1px solid rgba(201,168,76,0.2)", borderRadius: 2, animation: "float 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "22%", right: "15%", width: 40, height: 40, background: "rgba(201,168,76,0.08)", borderRadius: 50, animation: "float 5s 1s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", animation: "scanline 8s linear infinite", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 40px 80px", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 800 }}>
            <div className="section-label" style={{ marginBottom: 20, animation: "fadeIn 0.8s ease both" }}>✦ The Premier Event Platform</div>
            <h1 className="hero-title">
              Experience<br />
              <span style={{ WebkitTextStroke: "1px rgba(201,168,76,0.6)", WebkitTextFillColor: "transparent" }}>Extraordinary</span><br />
              Events
            </h1>
            <p className="hero-sub" style={{ maxWidth: 520, marginTop: 24, marginBottom: 40 }}>
              Discover, book, and immerse yourself in curated events that redefine the art of experience.
            </p>
            <div className="hero-cta" style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <Link to="/register" className="btn-primary">Get Started <FaArrowRight style={{ fontSize: 13 }} /></Link>
              <Link to="/login" className="btn-ghost">Sign In</Link>
            </div>
            <div style={{ marginTop: 60, display: "flex", gap: 40, animation: "fadeUp 1s 0.6s ease both", opacity: 0 }}>
              {[["500+", "Events"], ["50K+", "Attendees"], ["4.9★", "Rating"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "var(--gold)", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, var(--gold))" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)" }}>Scroll</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <TickerBanner />

      {/* ── SEARCH ── */}
      <div style={{ background: "var(--surface)", padding: "32px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="search-bar" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 22px" }}>
            <FaSearch style={{ color: "var(--gold)", fontSize: 16, flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search events by name or city…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <span style={{ fontSize: 12, color: "var(--text-dim)", whiteSpace: "nowrap" }}>{filtered.length} results</span>}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "64px 40px" }}>
        <div ref={statsRef} className="animate-in" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {[{ n: "500+", label: "Curated Events" }, { n: "50K+", label: "Happy Attendees" }, { n: "120+", label: "Cities Covered" }, { n: "99%", label: "Satisfaction Rate" }].map(({ n, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div className="stat-num">{n}</div>
              <div style={{ fontSize: 13, color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div ref={featureHeadRef} className="animate-in" style={{ marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 14 }}>Why Eventora</div>
          <h2 className="section-heading">Built for the<br />Modern Explorer</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <FeatureCard icon={FaTicketAlt} title="Instant Booking" desc="Reserve your spot in seconds with OTP-verified, zero-friction checkout. No queues, no hassle." color="201,168,76" delay="0ms" />
          <FeatureCard icon={FaShieldAlt} title="Secure Access" desc="Military-grade encryption and verified identity checks keep every transaction airtight." color="100,210,140" delay="100ms" />
          <FeatureCard icon={FaCalendarAlt} title="Curated Events" desc="Every event is hand-picked from music, tech, business and gaming universes. Only the best." color="180,100,220" delay="200ms" />
          <FeatureCard icon={FaStar} title="Rated & Reviewed" desc="Real reviews from real attendees. Make informed decisions backed by community trust." color="240,140,80" delay="300ms" />
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section style={{ padding: "0 40px 100px", background: "var(--charcoal)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={eventsHeadRef} className="animate-in" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 14 }}>On the Horizon</div>
              <h2 className="section-heading">Upcoming<br />Events</h2>
            </div>
            <Link to="/events" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--gold)", textDecoration: "none", fontSize: 14, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: 2 }}>
              View All <FaArrowRight style={{ fontSize: 12 }} />
            </Link>
          </div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ borderRadius: 4, overflow: "hidden" }}>
                  <div className="loading-skeleton" style={{ height: 220 }} />
                  <div style={{ background: "var(--card)", padding: "20px 22px 24px" }}>
                    <div className="loading-skeleton" style={{ height: 20, marginBottom: 12, width: "70%" }} />
                    <div className="loading-skeleton" style={{ height: 14, marginBottom: 8, width: "50%" }} />
                    <div className="loading-skeleton" style={{ height: 14, marginBottom: 20, width: "40%" }} />
                    <div className="loading-skeleton" style={{ height: 42 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-dim)" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, marginBottom: 12, color: "var(--muted)" }}>No Events Found</div>
              <p style={{ fontSize: 15 }}>Try adjusting your search query.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {filtered.map((event, i) => (
                <EventCard key={event._id} event={event} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #1A1500 0%, #0E0E0F 50%, #0A0010 100%)", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "80px 40px", textAlign: "center" }}>
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(201,168,76,0.08)", top: "-100px", left: "50%", transform: "translateX(-50%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Ready to Begin?</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(42px, 7vw, 80px)", color: "var(--text)", marginBottom: 20, lineHeight: 0.95 }}>
            Your Next Unforgettable<br />Experience Awaits
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: 16, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Join thousands of explorers who have discovered the extraordinary through Eventora.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" className="btn-primary">Create Account <FaArrowRight style={{ fontSize: 13 }} /></Link>
            <Link to="/login" className="btn-ghost">Explore Events</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--charcoal)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: "0.08em", color: "var(--gold)" }}>EVENTORA</div>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>© {new Date().getFullYear()} Eventora. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: "var(--text-dim)", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "var(--gold)"}
              onMouseLeave={e => e.target.style.color = "var(--text-dim)"}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
    
  );
};

console.log(event);
export default Home;