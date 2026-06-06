import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChair,
  FaMoneyBillWave,
  FaTicketAlt,
  FaShieldAlt,
  FaTag,
  FaClock,
  FaArrowLeft,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

/* ── Global Styles ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

    :root {
      --gold: #C9A84C;
      --gold-light: #F0D080;
      --gold-dim: rgba(201,168,76,0.15);
      --dark: #0E0E0F;
      --surface: #141416;
      --card: #1A1A1D;
      --card2: #1F1F23;
      --border: rgba(255,255,255,0.07);
      --border-gold: rgba(201,168,76,0.28);
      --text: #F0EDE8;
      --dim: #7A7672;
      --dim2: #4A4845;
      --green: #4ADE80;
      --red: #F87171;
      --amber: #FBB924;
    }

    *, *::before, *::after { box-sizing: border-box; }

    .ev-root {
      min-height: 100vh;
      background: var(--dark);
      font-family: 'DM Sans', sans-serif;
      color: var(--text);
      background-image:
        linear-gradient(rgba(201,168,76,0.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.018) 1px, transparent 1px);
      background-size: 64px 64px;
    }

    /* ── Animations ── */
    @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes spin     { to{transform:rotate(360deg)} }
    @keyframes kenBurns { from{transform:scale(1)} to{transform:scale(1.08)} }
    @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.45} }
    @keyframes shimmer  {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }

    /* ── Hero ── */
    .ev-hero {
      position: relative;
      height: 72vh;
      min-height: 480px;
      overflow: hidden;
    }

    .ev-hero-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 35%;
      animation: kenBurns 16s ease-in-out alternate infinite;
    }

    .ev-hero-overlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to top, rgba(14,14,15,1) 0%, rgba(14,14,15,0.6) 45%, rgba(14,14,15,0.25) 100%),
        linear-gradient(100deg, rgba(14,14,15,0.85) 0%, transparent 60%);
    }

    .ev-hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    .ev-hero-content {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0 0 52px;
      max-width: 1200px;
      margin: 0 auto;
      padding-left: 40px;
      padding-right: 40px;
    }

    .ev-back-link {
      position: absolute;
      top: 32px;
      left: 40px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--dim);
      text-decoration: none;
      transition: color .2s, gap .2s;
      z-index: 10;
    }
    .ev-back-link:hover { color: var(--gold); gap: 12px; }

    .ev-category-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--gold-dim);
      border: 1px solid var(--border-gold);
      border-radius: 2px;
      padding: 5px 14px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 18px;
      width: fit-content;
      animation: fadeUp .5s ease both;
    }

    .ev-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(44px, 7vw, 88px);
      line-height: 0.92;
      letter-spacing: 0.02em;
      color: var(--text);
      margin-bottom: 20px;
      animation: fadeUp .5s .08s ease both;
    }

    .ev-hero-meta {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      animation: fadeUp .5s .16s ease both;
    }

    .ev-hero-chip {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 13px;
      color: var(--dim);
      font-weight: 500;
    }
    .ev-hero-chip svg { color: var(--gold); opacity: .8; }

    .ev-seats-bar-wrap {
      margin-top: 18px;
      animation: fadeUp .5s .22s ease both;
    }
    .ev-seats-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--dim);
      margin-bottom: 7px;
      display: flex;
      justify-content: space-between;
    }
    .ev-seats-bar {
      height: 4px;
      background: rgba(255,255,255,.08);
      border-radius: 2px;
      max-width: 360px;
      overflow: hidden;
    }
    .ev-seats-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
      border-radius: 2px;
      transition: width .8s ease;
    }

    /* ── Body layout ── */
    .ev-body {
      max-width: 1200px;
      margin: 0 auto;
      padding: 48px 40px 80px;
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 40px;
      align-items: start;
    }

    /* ── Left column ── */
    .ev-left { display: flex; flex-direction: column; gap: 28px; }

    .ev-section {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      overflow: hidden;
      animation: fadeUp .5s ease both;
    }
    .ev-section:nth-child(2) { animation-delay: .06s; }
    .ev-section:nth-child(3) { animation-delay: .12s; }
    .ev-section:nth-child(4) { animation-delay: .18s; }

    .ev-section-header {
      padding: 22px 28px 18px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ev-section-icon {
      width: 32px;
      height: 32px;
      background: var(--gold-dim);
      border: 1px solid var(--border-gold);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gold);
      font-size: 14px;
      flex-shrink: 0;
    }

    .ev-section-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 20px;
      letter-spacing: .06em;
      color: var(--text);
    }

    .ev-section-body { padding: 24px 28px; }

    /* Description */
    .ev-description {
      font-family: 'Playfair Display', serif;
      font-size: 17px;
      color: rgba(240,237,232,.75);
      line-height: 1.75;
    }

    /* Info grid */
    .ev-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .ev-info-cell {
      background: var(--card2);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      transition: border-color .2s;
    }
    .ev-info-cell:hover { border-color: var(--border-gold); }

    .ev-info-icon {
      width: 38px;
      height: 38px;
      background: var(--gold-dim);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }

    .ev-info-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: var(--dim);
      margin-bottom: 4px;
    }

    .ev-info-value {
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
    }

    .ev-info-value.gold { color: var(--gold); font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: .04em; }
    .ev-info-value.green { color: var(--green); }

    /* Highlights */
    .ev-highlights {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .ev-highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 11px;
      padding: 14px 16px;
      background: var(--card2);
      border: 1px solid var(--border);
      border-radius: 2px;
      font-size: 13px;
      color: rgba(240,237,232,.75);
      line-height: 1.5;
      transition: border-color .2s;
    }
    .ev-highlight-item:hover { border-color: var(--border-gold); }
    .ev-highlight-item svg { color: var(--green); font-size: 13px; flex-shrink: 0; margin-top: 2px; }

    /* What's included */
    .ev-includes {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .ev-include-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 16px;
      background: var(--card2);
      border: 1px solid var(--border);
      border-radius: 2px;
      font-size: 14px;
      color: var(--text);
      transition: border-color .2s, background .2s;
    }
    .ev-include-row:hover { border-color: var(--border-gold); background: rgba(201,168,76,0.03); }

    .ev-include-icon {
      width: 34px;
      height: 34px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      flex-shrink: 0;
    }

    /* Testimonials */
    .ev-testimonials { display: flex; flex-direction: column; gap: 14px; }

    .ev-testimonial {
      background: var(--card2);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 18px 20px;
      transition: border-color .2s;
    }
    .ev-testimonial:hover { border-color: var(--border-gold); }

    .ev-stars { color: var(--gold); font-size: 12px; margin-bottom: 8px; display: flex; gap: 3px; }

    .ev-testimonial-text {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 14px;
      color: rgba(240,237,232,.7);
      line-height: 1.6;
      margin-bottom: 10px;
    }

    .ev-testimonial-author {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--gold);
    }

    /* Photo strip */
    .ev-photo-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .ev-photo-strip-item {
      aspect-ratio: 4/3;
      border-radius: 2px;
      overflow: hidden;
      border: 1px solid var(--border);
      transition: border-color .2s, transform .2s;
    }
    .ev-photo-strip-item:hover { border-color: var(--border-gold); transform: scale(1.02); }
    .ev-photo-strip-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(.7) saturate(.7);
      transition: filter .3s, transform .4s;
    }
    .ev-photo-strip-item:hover img { filter: brightness(.9) saturate(1); transform: scale(1.06); }

    /* ── Right / Booking card ── */
    .ev-booking-wrap {
      position: sticky;
      top: 32px;
      animation: fadeUp .5s .1s ease both;
    }

    .ev-booking-card {
      background: var(--card);
      border: 1px solid var(--border-gold);
      border-radius: 4px;
      overflow: hidden;
    }

    .ev-booking-top-img {
      width: 100%;
      height: 130px;
      object-fit: cover;
      object-position: center 30%;
      filter: brightness(.18) saturate(.5);
      display: block;
    }

    .ev-booking-top-overlay {
      background: linear-gradient(180deg, transparent 0%, var(--card) 100%);
      height: 50px;
      margin-top: -50px;
      position: relative;
    }

    .ev-booking-body { padding: 4px 28px 28px; }

    .ev-booking-eyebrow {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 4px;
    }

    .ev-booking-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 30px;
      letter-spacing: .04em;
      color: var(--text);
      margin-bottom: 22px;
    }

    .ev-price-box {
      background: var(--card2);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 16px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .ev-price-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--dim);
    }

    .ev-price-value {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 28px;
      letter-spacing: .04em;
      color: var(--gold);
    }

    .ev-price-value.free { color: var(--green); }

    .ev-availability {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 12px 14px;
      background: rgba(74,222,128,.06);
      border: 1px solid rgba(74,222,128,.15);
      border-radius: 2px;
    }

    .ev-avail-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: rgba(74,222,128,.7);
    }

    .ev-avail-value {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 18px;
      color: var(--green);
      letter-spacing: .04em;
    }

    /* OTP input */
    .ev-otp-input {
      width: 100%;
      background: var(--card2);
      border: 1px solid var(--border-gold);
      border-radius: 2px;
      padding: 14px 16px;
      color: var(--text);
      font-family: 'Bebas Neue', sans-serif;
      font-size: 26px;
      letter-spacing: .4em;
      text-align: center;
      outline: none;
      margin-bottom: 14px;
      transition: border-color .2s, box-shadow .2s;
    }
    .ev-otp-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,.12); }
    .ev-otp-input::placeholder { color: var(--dim2); font-size: 22px; }

    .ev-otp-hint {
      font-size: 12px;
      color: var(--dim);
      text-align: center;
      margin-bottom: 14px;
      line-height: 1.5;
    }

    /* Book button */
    .ev-book-btn {
      width: 100%;
      background: var(--gold);
      color: #0E0E0F;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: .1em;
      text-transform: uppercase;
      border: none;
      border-radius: 2px;
      padding: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: background .2s, transform .15s, box-shadow .2s;
      position: relative;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .ev-book-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,.18) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform .4s;
    }
    .ev-book-btn:hover::after { transform: translateX(100%); }
    .ev-book-btn:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(201,168,76,.3); }
    .ev-book-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
    .ev-book-btn.sold-out { background: var(--dim2); color: var(--dim); cursor: not-allowed; }
    .ev-book-btn.sold-out:hover { transform: none; box-shadow: none; }

    .ev-book-btn.verify-mode { background: transparent; border: 1px solid var(--gold); color: var(--gold); }
    .ev-book-btn.verify-mode:hover { background: var(--gold-dim); }

    /* Spinner */
    @keyframes spin { to{transform:rotate(360deg)} }
    .ev-spinner {
      width: 14px; height: 14px;
      border: 2px solid rgba(14,14,15,.3);
      border-top-color: #0E0E0F;
      border-radius: 50%;
      animation: spin .7s linear infinite;
    }
    .ev-spinner.light {
      border: 2px solid rgba(201,168,76,.3);
      border-top-color: var(--gold);
    }

    .ev-secure-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      font-size: 11px;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--dim2);
    }

    /* Mini trust list */
    .ev-trust-list {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 9px;
    }

    .ev-trust-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: var(--dim);
    }
    .ev-trust-row svg { color: var(--green); font-size: 11px; }

    /* ── Loading / Error ── */
    .ev-loading {
      min-height: 100vh;
      background: var(--dark);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }
    .ev-loading-brand {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 36px;
      letter-spacing: .12em;
      color: var(--gold);
    }
    .ev-loading-ring {
      width: 36px; height: 36px;
      border: 2px solid var(--border-gold);
      border-top-color: var(--gold);
      border-radius: 50%;
      animation: spin .8s linear infinite;
    }
    .ev-loading-text {
      font-size: 11px;
      letter-spacing: .2em;
      color: var(--dim);
      text-transform: uppercase;
      font-weight: 600;
    }

    .ev-not-found {
      min-height: 100vh;
      background: var(--dark);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      text-align: center;
      padding: 40px;
    }
    .ev-404-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 120px;
      color: var(--gold);
      opacity: .15;
      line-height: 1;
    }
    .ev-404-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 36px;
      letter-spacing: .06em;
      color: var(--text);
    }
    .ev-404-sub {
      font-size: 14px;
      color: var(--dim);
      max-width: 320px;
    }
    .ev-404-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--gold);
      color: #0E0E0F;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: .1em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 2px;
      padding: 13px 28px;
      margin-top: 8px;
      transition: background .2s, transform .15s;
    }
    .ev-404-btn:hover { background: var(--gold-light); transform: translateY(-1px); }

    /* ── Responsive ── */
    @media (max-width: 960px) {
      .ev-body { grid-template-columns: 1fr; padding: 32px 20px 60px; }
      .ev-booking-wrap { position: static; }
      .ev-hero-content { padding: 0 20px 40px; }
      .ev-back-link { left: 20px; }
      .ev-info-grid { grid-template-columns: 1fr; }
      .ev-highlights { grid-template-columns: 1fr; }
      .ev-photo-strip { grid-template-columns: repeat(3,1fr); }
    }
  `}</style>
);

/* ── Static data ── */
const GALLERY = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=75",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=75",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=75",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=75",
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=75",
];

const HERO_FALLBACK = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80";

const HIGHLIGHTS = [
  "World-class performers & speakers",
  "Premium seating arrangements",
  "Curated food & beverage experience",
  "Professional photography & memories",
  "Networking with industry leaders",
  "Exclusive after-event reception",
];

const INCLUDES = [
  { icon: "🎟️", bg: "rgba(201,168,76,0.1)",  text: "Entry ticket & digital pass" },
  { icon: "🍽️", bg: "rgba(74,222,128,0.08)", text: "Gourmet refreshments & beverages" },
  { icon: "📸", bg: "rgba(96,165,250,0.08)",  text: "Event photography access" },
  { icon: "🎁", bg: "rgba(248,113,113,0.08)", text: "Exclusive welcome kit & merch" },
  { icon: "🌐", bg: "rgba(251,191,36,0.08)",  text: "Livestream access for 30 days" },
  { icon: "🤝", bg: "rgba(167,139,250,0.08)", text: "Networking app & contacts" },
];

const TESTIMONIALS = [
  { stars: 5, text: "Eventora's events are simply on another level. The attention to detail, the energy — I've never felt so immersed at a live event before.", author: "Priya M. — Regular Attendee" },
  { stars: 5, text: "Booking was seamless and the experience matched every expectation. The venue, the crowd, the vibe — absolutely electric.", author: "Rohan K. — Music & Culture" },
  { stars: 4, text: "Premium feels like an understatement. From entry to the last performance, everything was crafted with purpose.", author: "Aisha S. — Tech Summit" },
];

/* ── Main Component ─────────────────────────────────────────── */
const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/event/${id}`);
        setEvent(data);
      } catch (err) {
        console.error("Event Error =", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    if (!user) { navigate("/login"); return; }
    try {
      setBookingLoading(true);
      if (!showOTP) {
        await api.post("/booking/send-otp");
        setShowOTP(true);
        alert("OTP sent to your registered email!");
      } else {
        await api.post("/booking", { eventId: event._id, otp });
        setBooked(true);
        setShowOTP(false);
        alert("Booking Successful! Check your dashboard.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  const soldOut = event && event.availableSeats === 0;
  const seatsPercent = event ? ((event.totalSeats - event.availableSeats) / event.totalSeats) * 100 : 0;

  /* ── Loading ── */
  if (loading) return (
    <div className="ev-loading">
      <GlobalStyles />
      <div className="ev-loading-brand">EVENTORA</div>
      <div className="ev-loading-ring" />
      <span className="ev-loading-text">Fetching event details…</span>
    </div>
  );

  /* ── Not found (404 fix) ── */
  if (!event) return (
    <div className="ev-not-found">
      <GlobalStyles />
      <div className="ev-404-num">404</div>
      <h2 className="ev-404-title">Event Not Found</h2>
      <p className="ev-404-sub">This event may have been removed or the link is incorrect. Browse our available events below.</p>
      <Link to="/" className="ev-404-btn">← Browse Events</Link>
    </div>
  );

  return (
    <div className="ev-root">
      <GlobalStyles />

      {/* ── Hero ── */}
      <div className="ev-hero">
        <img
          src={event.image || HERO_FALLBACK}
          alt={event.title}
          className="ev-hero-img"
          onError={e => { e.target.src = HERO_FALLBACK; }}
        />
        <div className="ev-hero-overlay" />
        <div className="ev-hero-grid" />

        <Link to="/dashboard" className="ev-back-link">
          <FaArrowLeft size={10} /> Back to Dashboard
        </Link>

        <div className="ev-hero-content">
          {event.category && (
            <div className="ev-category-badge">
              <FaTag size={9} /> {event.category}
            </div>
          )}

          <h1 className="ev-title">{event.title}</h1>

          <div className="ev-hero-meta">
            <div className="ev-hero-chip">
              <FaCalendarAlt size={13} />
              {new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
            <div className="ev-hero-chip">
              <FaMapMarkerAlt size={13} />
              {event.location}
            </div>
            <div className="ev-hero-chip">
              <FaChair size={13} />
              {event.availableSeats} seats left
            </div>
          </div>

          <div className="ev-seats-bar-wrap">
            <div className="ev-seats-label">
              <span>Capacity filled</span>
              <span style={{ color: "var(--gold)" }}>{Math.round(seatsPercent)}%</span>
            </div>
            <div className="ev-seats-bar">
              <div className="ev-seats-fill" style={{ width: `${seatsPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="ev-body">

        {/* LEFT COLUMN */}
        <div className="ev-left">

          {/* About */}
          <div className="ev-section">
            <div className="ev-section-header">
              <div className="ev-section-icon"><FaTicketAlt /></div>
              <span className="ev-section-title">About This Event</span>
            </div>
            <div className="ev-section-body">
              <p className="ev-description">{event.description}</p>
            </div>
          </div>

          {/* Event Details */}
          <div className="ev-section">
            <div className="ev-section-header">
              <div className="ev-section-icon"><FaCalendarAlt /></div>
              <span className="ev-section-title">Event Details</span>
            </div>
            <div className="ev-section-body">
              <div className="ev-info-grid">
                <div className="ev-info-cell">
                  <div className="ev-info-icon" style={{ color: "var(--gold)" }}><FaCalendarAlt /></div>
                  <div>
                    <div className="ev-info-label">Date</div>
                    <div className="ev-info-value">
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                </div>
                <div className="ev-info-cell">
                  <div className="ev-info-icon" style={{ color: "#F87171" }}><FaMapMarkerAlt /></div>
                  <div>
                    <div className="ev-info-label">Location</div>
                    <div className="ev-info-value">{event.location}</div>
                  </div>
                </div>
                <div className="ev-info-cell">
                  <div className="ev-info-icon" style={{ color: "var(--green)" }}><FaChair /></div>
                  <div>
                    <div className="ev-info-label">Available Seats</div>
                    <div className="ev-info-value green">{event.availableSeats} / {event.totalSeats}</div>
                  </div>
                </div>
                <div className="ev-info-cell">
                  <div className="ev-info-icon" style={{ color: "var(--amber)" }}><FaMoneyBillWave /></div>
                  <div>
                    <div className="ev-info-label">Ticket Price</div>
                    <div className={`ev-info-value gold`}>
                      {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice.toLocaleString()}`}
                    </div>
                  </div>
                </div>
                {event.category && (
                  <div className="ev-info-cell">
                    <div className="ev-info-icon" style={{ color: "#A78BFA" }}><FaTag /></div>
                    <div>
                      <div className="ev-info-label">Category</div>
                      <div className="ev-info-value">{event.category}</div>
                    </div>
                  </div>
                )}
                <div className="ev-info-cell">
                  <div className="ev-info-icon" style={{ color: "#60A5FA" }}><FaClock /></div>
                  <div>
                    <div className="ev-info-label">Doors Open</div>
                    <div className="ev-info-value">6:00 PM onwards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="ev-section">
            <div className="ev-section-header">
              <div className="ev-section-icon"><FaStar /></div>
              <span className="ev-section-title">Event Highlights</span>
            </div>
            <div className="ev-section-body">
              <div className="ev-highlights">
                {HIGHLIGHTS.map((h, i) => (
                  <div key={i} className="ev-highlight-item">
                    <FaCheckCircle />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="ev-section">
            <div className="ev-section-header">
              <div className="ev-section-icon" style={{ fontSize: 16 }}>🎁</div>
              <span className="ev-section-title">What's Included</span>
            </div>
            <div className="ev-section-body">
              <div className="ev-includes">
                {INCLUDES.map(({ icon, bg, text }, i) => (
                  <div key={i} className="ev-include-row">
                    <div className="ev-include-icon" style={{ background: bg }}>{icon}</div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="ev-section">
            <div className="ev-section-header">
              <div className="ev-section-icon" style={{ fontSize: 16 }}>📸</div>
              <span className="ev-section-title">Event Gallery</span>
            </div>
            <div className="ev-section-body">
              <div className="ev-photo-strip">
                {GALLERY.map((src, i) => (
                  <div key={i} className="ev-photo-strip-item">
                    <img src={src} alt={`gallery-${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="ev-section">
            <div className="ev-section-header">
              <div className="ev-section-icon"><FaStar /></div>
              <span className="ev-section-title">What Attendees Say</span>
            </div>
            <div className="ev-section-body">
              <div className="ev-testimonials">
                {TESTIMONIALS.map(({ stars, text, author }, i) => (
                  <div key={i} className="ev-testimonial">
                    <div className="ev-stars">
                      {Array.from({ length: stars }).map((_, j) => <FaStar key={j} />)}
                    </div>
                    <p className="ev-testimonial-text">"{text}"</p>
                    <div className="ev-testimonial-author">— {author}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT / BOOKING CARD */}
        <div className="ev-booking-wrap">
          <div className="ev-booking-card">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=70"
              alt=""
              className="ev-booking-top-img"
            />
            <div className="ev-booking-top-overlay" />

            <div className="ev-booking-body">
              <div className="ev-booking-eyebrow">Secure Your Spot</div>
              <div className="ev-booking-title">Reserve a Seat</div>

              {/* Price */}
              <div className="ev-price-box">
                <span className="ev-price-label">Ticket Price</span>
                <span className={`ev-price-value ${event.ticketPrice === 0 ? "free" : ""}`}>
                  {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice.toLocaleString()}`}
                </span>
              </div>

              {/* Availability */}
              <div className="ev-availability" style={soldOut ? { background: "rgba(248,113,113,.06)", borderColor: "rgba(248,113,113,.2)" } : {}}>
                <span className="ev-avail-label" style={soldOut ? { color: "rgba(248,113,113,.7)" } : {}}>
                  {soldOut ? "Sold Out" : "Seats Available"}
                </span>
                <span className="ev-avail-value" style={soldOut ? { color: "var(--red)" } : {}}>
                  {soldOut ? "0" : event.availableSeats}
                </span>
              </div>

              {/* OTP field */}
              {showOTP && (
                <>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="000000"
                    maxLength={6}
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="ev-otp-input"
                    autoFocus
                  />
                  <p className="ev-otp-hint">Enter the 6-digit OTP sent to your email.</p>
                </>
              )}

              {/* Book button */}
              {booked ? (
                <button className="ev-book-btn" disabled style={{ background: "rgba(74,222,128,.12)", color: "var(--green)", border: "1px solid rgba(74,222,128,.2)" }}>
                  <FaCheckCircle /> Booking Confirmed
                </button>
              ) : soldOut ? (
                <button className="ev-book-btn sold-out" disabled>Sold Out</button>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className={`ev-book-btn ${showOTP ? "verify-mode" : ""}`}
                >
                  {bookingLoading
                    ? <><div className={`ev-spinner ${showOTP ? "light" : ""}`} /> Processing…</>
                    : showOTP ? "Verify OTP & Confirm" : "Book Now →"
                  }
                </button>
              )}

              {showOTP && (
                <button
                  onClick={() => { setShowOTP(false); setOtp(""); }}
                  style={{ background: "none", border: "none", color: "var(--dim)", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", cursor: "pointer", width: "100%", textAlign: "center", marginBottom: 12 }}
                >
                  ← Back
                </button>
              )}

              {/* Secure row */}
              <div className="ev-secure-row">
                <FaShieldAlt size={11} /> Secure & Encrypted Booking
              </div>

              {/* Trust points */}
              <div className="ev-trust-list">
                {["Instant booking confirmation via email", "OTP-verified secure checkout", "Cancel anytime before the event", "24/7 attendee support"].map((t, i) => (
                  <div key={i} className="ev-trust-row">
                    <FaCheckCircle /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetail;