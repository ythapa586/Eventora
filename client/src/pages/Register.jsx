import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

/* ── Global Styles ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

    :root {
      --gold: #C9A84C;
      --gold-light: #F0D080;
      --gold-dim: rgba(201,168,76,0.15);
      --dark: #0E0E0F;
      --surface: #141416;
      --card: #1A1A1D;
      --border: rgba(255,255,255,0.07);
      --border-gold: rgba(201,168,76,0.28);
      --text: #F0EDE8;
      --dim: #7A7672;
      --dim2: #4A4845;
    }

    .login-root {
      min-height: 100vh;
      background: var(--dark);
      display: flex;
      font-family: 'DM Sans', sans-serif;
      color: var(--text);
    }

    /* ── Left panel ── */
    .login-left {
      flex: 1;
      position: relative;
      overflow: hidden;
      display: none;
    }
    @media (min-width: 900px) { .login-left { display: flex; } }

    .login-left-bg {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(160deg, rgba(201,168,76,0.18) 0%, transparent 40%),
        linear-gradient(to bottom, #0A0A0B, #131210);
      background-image:
        linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px),
        linear-gradient(160deg, rgba(201,168,76,0.18) 0%, transparent 40%),
        linear-gradient(to bottom, #0A0A0B, #131210);
      background-size: 50px 50px, 50px 50px, 100% 100%, 100% 100%;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }

    .left-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 52px 56px;
      width: 100%;
    }

    .brand {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 32px;
      letter-spacing: 0.1em;
      color: var(--gold);
      text-decoration: none;
    }

    .left-headline {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .left-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(52px, 5.5vw, 80px);
      line-height: 0.92;
      letter-spacing: 0.01em;
      background: linear-gradient(135deg, #F0EDE8 0%, var(--gold) 55%, #F0EDE8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .left-sub {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 18px;
      color: var(--dim);
      margin-top: 18px;
      line-height: 1.55;
      max-width: 320px;
    }

    .left-quotes {
      border-left: 2px solid var(--border-gold);
      padding-left: 20px;
      margin-top: 52px;
    }

    .quote-text {
      font-size: 14px;
      color: var(--dim);
      line-height: 1.65;
      font-style: italic;
    }
    .quote-author {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--gold);
      margin-top: 10px;
    }

    .left-bottom {
      display: flex;
      gap: 32px;
    }
    .left-stat-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 36px;
      color: var(--gold);
      line-height: 1;
    }
    .left-stat-label {
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--dim);
      margin-top: 3px;
    }

    /* Floating geo shapes */
    @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(3deg)} }
    @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-2deg)} }
    .geo { position: absolute; border: 1px solid var(--border-gold); border-radius: 2px; }
    .geo-a { width: 80px; height: 80px; top: 20%; right: 14%; animation: floatA 8s ease-in-out infinite; }
    .geo-b { width: 44px; height: 44px; bottom: 28%; right: 8%; background: rgba(201,168,76,0.06); animation: floatB 6s 1s ease-in-out infinite; }
    .geo-c { width: 24px; height: 24px; top: 42%; right: 26%; border-color: rgba(201,168,76,0.12); animation: floatA 10s 2s ease-in-out infinite; }

    /* ── Right panel (form) ── */
    .login-right {
      width: 100%;
      max-width: 520px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 32px;
      position: relative;
    }
    @media (min-width: 900px) { .login-right { border-left: 1px solid var(--border); } }

    .form-container {
      width: 100%;
      max-width: 400px;
    }

    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    .form-container { animation: fadeUp 0.7s ease both; }

    .form-eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 10px;
    }

    .form-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(40px, 5vw, 56px);
      line-height: 0.95;
      color: var(--text);
      letter-spacing: 0.02em;
      margin-bottom: 6px;
    }

    .form-subtitle {
      font-size: 14px;
      color: var(--dim);
      margin-bottom: 40px;
      line-height: 1.5;
    }

    /* Input group */
    .input-group {
      margin-bottom: 22px;
    }

    .input-label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--dim);
      margin-bottom: 8px;
      transition: color 0.2s;
    }

    .input-wrap {
      position: relative;
    }

    .input-field {
      width: 100%;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 13px 16px 13px 44px;
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      outline: none;
      transition: border-color 0.25s, box-shadow 0.25s, background 0.2s;
      -webkit-appearance: none;
    }
    .input-field::placeholder { color: var(--dim2); }
    .input-field:focus {
      border-color: var(--gold);
      background: rgba(201,168,76,0.04);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
    }
    .input-field:focus + .input-label { color: var(--gold); }

    .input-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      opacity: 0.35;
      transition: opacity 0.2s;
    }
    .input-wrap:focus-within .input-icon { opacity: 0.7; }

    /* OTP field */
    .otp-field {
      width: 100%;
      background: var(--card);
      border: 1px solid var(--border-gold);
      border-radius: 3px;
      padding: 16px 16px;
      color: var(--text);
      font-family: 'Bebas Neue', sans-serif;
      font-size: 28px;
      letter-spacing: 0.4em;
      text-align: center;
      outline: none;
      transition: border-color 0.25s, box-shadow 0.25s;
    }
    .otp-field:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
    }

    .otp-hint {
      font-size: 13px;
      color: var(--dim);
      text-align: center;
      margin-top: 10px;
      line-height: 1.5;
    }

    /* Submit button */
    .submit-btn {
      width: 100%;
      background: var(--gold);
      color: #0E0E0F;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: none;
      border-radius: 3px;
      padding: 15px;
      cursor: pointer;
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      position: relative;
      overflow: hidden;
    }
    .submit-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform 0.4s;
    }
    .submit-btn:hover::after { transform: translateX(100%); }
    .submit-btn:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.25); }
    .submit-btn:active { transform: translateY(0); }
    .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

    /* Spinner */
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner {
      width: 16px; height: 16px;
      border: 2px solid rgba(14,14,15,0.3);
      border-top-color: #0E0E0F;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    /* Error */
    .error-box {
      background: rgba(220, 60, 60, 0.1);
      border: 1px solid rgba(220, 60, 60, 0.25);
      border-radius: 3px;
      padding: 12px 16px;
      font-size: 13px;
      color: #FF8080;
      margin-bottom: 24px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      line-height: 1.5;
    }

    /* Divider */
    .divider {
      display: flex;
      align-items: center;
      gap: 14px;
      margin: 28px 0;
    }
    .divider-line { flex: 1; height: 1px; background: var(--border); }
    .divider-text { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dim2); }

    /* Footer */
    .form-footer {
      text-align: center;
      font-size: 14px;
      color: var(--dim);
      margin-top: 28px;
    }
    .form-footer a {
      color: var(--gold);
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }
    .form-footer a:hover { color: var(--gold-light); }

    /* OTP back button */
    .back-btn {
      background: none;
      border: none;
      color: var(--dim);
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0;
      margin-bottom: 24px;
      transition: color 0.2s;
    }
    .back-btn:hover { color: var(--gold); }

    /* Mobile brand */
    .mobile-brand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 44px;
    }
    @media (min-width: 900px) { .mobile-brand { display: none; } }

    /* Trust badges */
    .trust-row {
      display: flex;
      gap: 20px;
      margin-top: 28px;
      flex-wrap: wrap;
    }
    .trust-badge {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 12px;
      color: var(--dim);
    }
    .trust-badge svg { opacity: 0.5; }
  `}</style>
);

/* ── Icon helpers ────────────────────────────────────────────── */
const MailIcon = () => (
  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F0EDE8" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);
const LockIcon = () => (
  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F0EDE8" strokeWidth="2" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);
const KeyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6M15.5 7.5l3 3"/>
  </svg>
);

/* ── Main Component ─────────────────────────────────────────── */
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, verifyOtp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        if (!showOTP) {
            await register(name, email, password);
            setShowOTP(true);
        } else {
            await verifyOtp(email, otp);
            navigate('/dashboard');
        }
    } catch (err) {
        setError(
            err.response?.data?.message ||
            err.message ||
            'Something went wrong'
        );
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="login-root">
      <GlobalStyles />

      {/* ── Left decorative panel ── */}
      <div className="login-left">
        <div className="login-left-bg" />
        <div className="orb" style={{ width: 380, height: 380, background: 'rgba(201,168,76,0.1)', top: '-60px', left: '-80px' }} />
        <div className="orb" style={{ width: 260, height: 260, background: 'rgba(80,40,140,0.08)', bottom: '40px', right: '-40px' }} />
        <div className="geo geo-a" />
        <div className="geo geo-b" />
        <div className="geo geo-c" />

        <div className="left-content">
          {/* Brand */}
          <Link to="/" className="brand">EVENTORA</Link>

          {/* Headline */}
          <div className="left-headline">
<h2 className="left-title">
    Create<br />Your<br />Journey
</h2>            <p className="left-sub">
    Join thousands of attendees discovering unforgettable experiences.
</p>

            {/* Quote */}
            <div className="left-quotes">
              <p className="quote-text">
                "The best events don't just entertain — they transform. Eventora made every experience feel personal."
              </p>
              <p className="quote-author">— Priya M., Regular Attendee</p>
            </div>
          </div>

          {/* Stats */}
          <div className="left-bottom">
            {[['500+', 'Events'], ['50K+', 'Attendees'], ['4.9★', 'Rating']].map(([n, l]) => (
              <div key={l}>
                <div className="left-stat-num">{n}</div>
                <div className="left-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="login-right">
        <div className="form-container">

          {/* Mobile top bar */}
          <div className="mobile-brand">
            <Link to="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: '0.1em', color: 'var(--gold)', textDecoration: 'none' }}>
              EVENTORA
            </Link>
          </div>

          {/* Back button in OTP mode */}
          {showOTP && (
            <button className="back-btn" onClick={() => { setShowOTP(false); setError(''); setOtp(''); }}>
              <BackArrow /> Back to Sign In
            </button>
          )}

          {/* Heading */}
         <p className="form-eyebrow">
    {showOTP ? 'Verify Account' : 'Join Eventora'}
</p>

<h1 className="form-title">
    {showOTP ? <>Verify<br />OTP</> : <>Create<br />Account</>}
</h1>

<p className="form-subtitle">
    {showOTP
        ? `We sent a 6-digit code to ${email}`
        : 'Create your Eventora account'}
</p>
          {/* Error */}
          {error && (
            <div className="error-box" role="alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/>
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
         <form onSubmit={handleSubmit} noValidate>
  {!showOTP ? (
    <>
      {/* Full Name Field */}
      <div className="input-group">
          <label className="input-label">Full Name</label>
          <div className="input-wrap">
              <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
          </div>
      </div>

      {/* Email Field */}
      <div className="input-group">
          <label className="input-label" htmlFor="email">
              Email Address
          </label>
          <div className="input-wrap">
              <MailIcon />
              <input
                  id="email"
                  type="email"
                  required
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
          </div>
      </div>

      {/* Password Field */}
      {/* Password Field */}
<div className="input-group">
  <label className="input-label" htmlFor="password">
    Password
  </label>

  <div className="input-wrap">
    <LockIcon />

    <input
      id="password"
      type="password"
      required
      placeholder="Enter your password"
      className="input-field"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
</div>
    </>
  ) : (
              <div className="input-group" style={{ marginBottom: 8 }}>
                <label className="input-label" htmlFor="otp" style={{ textAlign: 'center', display: 'block' }}>Verification Code</label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  required
                  autoFocus
                  placeholder="000000"
                  className="otp-field"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                />
                <p className="otp-hint">Check your inbox and enter the 6-digit code above.</p>
              </div>
            )}

           <button type="submit" className="submit-btn" disabled={loading}>
    {loading ? (
        <>
            <div className="spinner" />
            Processing...
        </>
    ) : (
        <>
            {showOTP ? 'Verify & Complete' : 'Create Account'}
            <ArrowRight />
        </>
    )}
</button>
          </form>

          {/* Trust row */}
          <div className="trust-row">
            <div className="trust-badge"><ShieldIcon /> SSL Encrypted</div>
            <div className="trust-badge"><KeyIcon /> OTP Verified</div>
          </div>

          {/* Divider + register */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">New here?</span>
            <div className="divider-line" />
          </div>

          <p className="form-footer">
    Already have an account?{' '}
    <Link to="/login">Sign In</Link>
</p>
        </div>
      </div>
    </div>
  );
};

export default Register;