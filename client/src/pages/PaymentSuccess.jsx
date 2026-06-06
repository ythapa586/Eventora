
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTicketAlt, FaArrowRight, FaShieldAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

    :root {
      --gold: #C9A84C; --gold-light: #F0D080; --gold-dim: rgba(201,168,76,0.15);
      --dark: #0E0E0F; --card: #1A1A1D; --card2: #1F1F23;
      --border: rgba(255,255,255,0.07); --border-gold: rgba(201,168,76,0.28);
      --text: #F0EDE8; --dim: #7A7672; --dim2: #4A4845; --green: #4ADE80;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .ps-root {
      min-height: 100vh;
      background: var(--dark);
      font-family: 'DM Sans', sans-serif;
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      position: relative;
      overflow: hidden;
      background-image:
        linear-gradient(rgba(201,168,76,0.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.022) 1px, transparent 1px);
      background-size: 64px 64px;
    }

    /* Background orbs */
    .ps-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
    }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes popIn    { 0%{opacity:0;transform:scale(.6)} 60%{transform:scale(1.08)} 100%{opacity:1;transform:scale(1)} }
    @keyframes ripple   { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.6);opacity:0} }
    @keyframes spin     { to{transform:rotate(360deg)} }
    @keyframes shimmer  {
      0%  { background-position: -400px 0; }
      100%{ background-position:  400px 0; }
    }
    @keyframes dash {
      0%  { stroke-dashoffset: 200; }
      100%{ stroke-dashoffset: 0; }
    }

    .ps-card {
      background: var(--card);
      border: 1px solid var(--border-gold);
      border-radius: 4px;
      width: 100%;
      max-width: 480px;
      overflow: hidden;
      position: relative;
      z-index: 2;
      animation: fadeUp .6s ease both;
    }

    /* Top banner */
    .ps-banner {
      position: relative;
      height: 160px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ps-banner-img {
      position: absolute;
      inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      object-position: center 35%;
      filter: brightness(.15) saturate(.5);
    }

    .ps-banner-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(14,14,15,.3) 0%, var(--card) 100%);
    }

    /* Success icon */
    .ps-icon-wrap {
      position: relative;
      z-index: 2;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ps-ripple {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid rgba(74,222,128,.4);
      animation: ripple 2s ease-out infinite;
    }
    .ps-ripple:nth-child(2) { animation-delay: .6s; }
    .ps-ripple:nth-child(3) { animation-delay: 1.2s; }

    .ps-check-circle {
      width: 72px; height: 72px;
      background: rgba(74,222,128,.12);
      border: 2px solid rgba(74,222,128,.35);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: popIn .6s .2s ease both;
      position: relative;
      z-index: 1;
    }

    .ps-check-svg { overflow: visible; }
    .ps-check-path {
      stroke: var(--green);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      stroke-dasharray: 200;
      stroke-dashoffset: 200;
      animation: dash .5s .7s ease forwards;
    }

    /* Body */
    .ps-body { padding: 28px 32px 36px; }

    .ps-eyebrow {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: var(--green);
      text-align: center;
      margin-bottom: 8px;
      animation: fadeUp .5s .3s ease both;
    }

    .ps-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 44px;
      letter-spacing: .04em;
      color: var(--text);
      text-align: center;
      line-height: 1;
      margin-bottom: 12px;
      animation: fadeUp .5s .35s ease both;
    }

    .ps-subtitle {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 14px;
      color: var(--dim);
      text-align: center;
      line-height: 1.65;
      margin-bottom: 28px;
      animation: fadeUp .5s .4s ease both;
    }

    /* Ticket box */
    .ps-ticket {
      background: var(--card2);
      border: 1px solid var(--border-gold);
      border-radius: 2px;
      margin-bottom: 24px;
      overflow: hidden;
      animation: fadeUp .5s .45s ease both;
      position: relative;
    }

    .ps-ticket-shimmer {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,.06) 50%, transparent 100%);
      background-size: 400px 100%;
      animation: shimmer 2.5s infinite;
    }

    .ps-ticket-top {
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px dashed rgba(201,168,76,.2);
    }

    .ps-ticket-icon {
      width: 38px; height: 38px;
      background: rgba(201,168,76,.1);
      border: 1px solid var(--border-gold);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gold);
      font-size: 16px;
      flex-shrink: 0;
    }

    .ps-ticket-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 2px;
    }

    .ps-ticket-sublabel {
      font-size: 12px;
      color: var(--dim);
    }

    .ps-ticket-bottom {
      padding: 14px 20px;
      display: flex;
      flex-direction: column;
      gap: 9px;
    }

    .ps-info-row {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 13px;
      color: var(--dim);
    }
    .ps-info-row svg { color: var(--gold); opacity: .7; flex-shrink: 0; }
    .ps-info-row span { color: rgba(240,237,232,.7); }

    /* Buttons */
    .ps-btn-primary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      width: 100%;
      background: var(--gold);
      color: #0E0E0F;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: .1em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 2px;
      padding: 15px;
      margin-bottom: 12px;
      transition: background .2s, transform .15s, box-shadow .2s;
      position: relative;
      overflow: hidden;
      animation: fadeUp .5s .52s ease both;
    }
    .ps-btn-primary::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,.18) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform .4s;
    }
    .ps-btn-primary:hover::after { transform: translateX(100%); }
    .ps-btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(201,168,76,.28); }

    .ps-btn-secondary {
      display: block;
      width: 100%;
      background: transparent;
      border: 1px solid var(--border);
      color: var(--dim);
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: .1em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 2px;
      padding: 14px;
      text-align: center;
      transition: border-color .2s, color .2s, background .2s;
      animation: fadeUp .5s .58s ease both;
    }
    .ps-btn-secondary:hover { border-color: var(--border-gold); color: var(--gold); background: var(--gold-dim); }

    .ps-secure {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      font-size: 11px;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--dim2);
      margin-top: 20px;
      animation: fadeUp .5s .62s ease both;
    }
    .ps-secure svg { color: var(--green); }
  `}</style>
);

const PaymentSuccess = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div className="ps-root">
      <GlobalStyles />

      {/* Background orbs */}
      <div className="ps-orb" style={{ width: 400, height: 400, background: "rgba(74,222,128,0.06)", top: "-80px", left: "-100px" }} />
      <div className="ps-orb" style={{ width: 300, height: 300, background: "rgba(201,168,76,0.07)", bottom: "-60px", right: "-80px" }} />

      <div className="ps-card">
        {/* Banner */}
        <div className="ps-banner">
          <img
            src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=70"
            alt=""
            className="ps-banner-img"
          />
          <div className="ps-banner-overlay" />
          <div className="ps-icon-wrap">
            <div className="ps-ripple" />
            <div className="ps-ripple" />
            <div className="ps-ripple" />
            <div className="ps-check-circle">
              <svg className="ps-check-svg" width="32" height="32" viewBox="0 0 32 32">
                <polyline className="ps-check-path" points="6,17 13,24 26,10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="ps-body">
          <p className="ps-eyebrow">Booking Confirmed</p>
          <h1 className="ps-title">You're In!</h1>
          <p className="ps-subtitle">
            Your event registration is confirmed. A ticket and all details have been dispatched to your registered email.
          </p>

          {/* Ticket box */}
          <div className="ps-ticket">
            <div className="ps-ticket-shimmer" />
            <div className="ps-ticket-top">
              <div className="ps-ticket-icon"><FaTicketAlt /></div>
              <div>
                <div className="ps-ticket-label">Event Ticket Generated</div>
                <div className="ps-ticket-sublabel">Your seat has been reserved</div>
              </div>
            </div>
            <div className="ps-ticket-bottom">
              <div className="ps-info-row">
                <FaEnvelope size={11} />
                <span>Confirmation sent to your registered email</span>
              </div>
              <div className="ps-info-row">
                <FaCalendarAlt size={11} />
                <span>Check your dashboard to view booking details</span>
              </div>
              <div className="ps-info-row">
                <FaShieldAlt size={11} />
                <span>Keep your ticket safe — required at entry</span>
              </div>
            </div>
          </div>

          <Link to="/dashboard" className="ps-btn-primary">
            View My Tickets <FaArrowRight size={11} />
          </Link>
          <Link to="/" className="ps-btn-secondary">
            Explore More Events
          </Link>

          <div className="ps-secure">
            <FaShieldAlt size={11} /> Secured by Eventora
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;