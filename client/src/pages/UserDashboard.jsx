import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaTimesCircle } from 'react-icons/fa';

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
      --card-hover: #1F1F23;
      --border: rgba(255,255,255,0.07);
      --border-gold: rgba(201,168,76,0.28);
      --text: #F0EDE8;
      --dim: #7A7672;
      --dim2: #4A4845;
    }

    .dashboard-root {
      min-height: 100vh;
      background: var(--dark);
      font-family: 'DM Sans', sans-serif;
      color: var(--text);
      padding: 40px 24px 64px;
      background-image:
        linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .dashboard-inner {
      max-width: 1100px;
      margin: 0 auto;
    }

    /* ── Hero card ── */
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

    .hero-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 40px 48px;
      margin-bottom: 48px;
      display: flex;
      align-items: center;
      gap: 32px;
      position: relative;
      overflow: hidden;
      animation: fadeUp 0.6s ease both;
    }

    .hero-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 50%);
      pointer-events: none;
    }

    .hero-card::after {
      content: 'EVENTORA';
      position: absolute;
      right: -10px;
      top: 50%;
      transform: translateY(-50%);
      font-family: 'Bebas Neue', sans-serif;
      font-size: 120px;
      color: rgba(201,168,76,0.04);
      pointer-events: none;
      letter-spacing: 0.05em;
      line-height: 1;
    }

    .avatar {
      width: 72px;
      height: 72px;
      background: linear-gradient(135deg, var(--gold) 0%, #8B6A1F 100%);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 32px;
      color: #0E0E0F;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .hero-text {
      position: relative;
      z-index: 1;
    }

    .hero-eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 6px;
    }

    .hero-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(32px, 4vw, 48px);
      line-height: 0.95;
      color: var(--text);
      letter-spacing: 0.02em;
      margin-bottom: 10px;
    }

    .hero-status {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 12px;
      color: var(--dim);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ADE80;
      box-shadow: 0 0 8px rgba(74,222,128,0.5);
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* ── Section header ── */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
      animation: fadeUp 0.6s 0.1s ease both;
    }

    .section-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 28px;
      letter-spacing: 0.05em;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .section-title svg {
      color: var(--gold);
    }

    .section-count {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--dim);
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 4px 12px;
    }

    /* ── Empty state ── */
    .empty-state {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 80px 40px;
      text-align: center;
      animation: fadeUp 0.6s 0.15s ease both;
    }

    .empty-icon-wrap {
      width: 72px;
      height: 72px;
      background: rgba(201,168,76,0.06);
      border: 1px solid var(--border-gold);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }

    .empty-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 28px;
      letter-spacing: 0.05em;
      color: var(--dim);
      margin-bottom: 8px;
    }

    .empty-sub {
      font-size: 14px;
      color: var(--dim2);
      margin-bottom: 32px;
    }

    .browse-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--gold);
      color: #0E0E0F;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 2px;
      padding: 13px 28px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      position: relative;
      overflow: hidden;
    }

    .browse-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform 0.4s;
    }
    .browse-btn:hover::after { transform: translateX(100%); }
    .browse-btn:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.25); }

    /* ── Booking grid ── */
    .bookings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    /* ── Booking card ── */
    .booking-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
      animation: fadeUp 0.5s ease both;
    }

    .booking-card:hover {
      border-color: var(--border-gold);
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.1);
    }

    .card-body {
      padding: 24px 24px 20px;
      flex-grow: 1;
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 18px;
      gap: 12px;
    }

    .event-title {
      font-family: 'Playfair Display', serif;
      font-size: 17px;
      color: var(--text);
      line-height: 1.3;
      font-weight: 600;
    }

    .badges {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: flex-end;
      flex-shrink: 0;
    }

    .badge {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      border-radius: 1px;
      padding: 3px 8px;
    }

    .badge-confirmed { background: rgba(74,222,128,0.12); color: #4ADE80; border: 1px solid rgba(74,222,128,0.2); }
    .badge-cancelled { background: rgba(248,113,113,0.12); color: #F87171; border: 1px solid rgba(248,113,113,0.2); }
    .badge-pending   { background: rgba(251,191,36,0.12); color: #FBB924; border: 1px solid rgba(251,191,36,0.2); }
    .badge-paid      { background: rgba(201,168,76,0.12); color: var(--gold); border: 1px solid var(--border-gold); }
    .badge-unpaid    { background: rgba(255,255,255,0.04); color: var(--dim); border: 1px solid var(--border); }

    .card-meta {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .meta-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--dim);
    }

    .meta-row strong {
      color: rgba(240,237,232,0.6);
      font-weight: 500;
      min-width: 72px;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .meta-value {
      color: var(--text);
      font-size: 13px;
    }

    .deleted-event {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      color: #F87171;
      font-size: 14px;
    }

    /* ── Card footer ── */
    .card-footer {
      padding: 14px 24px;
      border-top: 1px solid var(--border);
      background: rgba(0,0,0,0.15);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .view-link {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gold);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s, gap 0.2s;
    }
    .view-link:hover { color: var(--gold-light); gap: 9px; }

    .cancel-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--dim2);
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s;
      padding: 0;
    }
    .cancel-btn:hover { color: #F87171; }

    .cancelled-label {
      width: 100%;
      text-align: center;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--dim2);
      font-style: italic;
    }

    /* ── Loading ── */
    .loading-screen {
      min-height: 100vh;
      background: var(--dark);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Bebas Neue', sans-serif;
      gap: 24px;
    }

    .loading-brand {
      font-size: 36px;
      letter-spacing: 0.12em;
      color: var(--gold);
    }

    @keyframes spin { to { transform: rotate(360deg); } }
    .loader-ring {
      width: 36px;
      height: 36px;
      border: 2px solid var(--border-gold);
      border-top-color: var(--gold);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .loading-text {
      font-size: 12px;
      letter-spacing: 0.2em;
      color: var(--dim);
      text-transform: uppercase;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
    }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .dashboard-root { padding: 24px 16px 48px; }
      .hero-card { padding: 28px 24px; flex-direction: column; align-items: flex-start; gap: 20px; }
      .hero-card::after { display: none; }
      .bookings-grid { grid-template-columns: 1fr; }
    }
  `}</style>
);

/* ── Arrow icon ── */
const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Main Component ─────────────────────────────────────────── */
const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/booking/my');
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking request?')) {
      try {
        await api.delete(`/booking/${id}`);
        fetchBookings();
      } catch (error) {
        alert(error.response?.data?.message || 'Error cancelling booking');
      }
    }
  };

  const getStatusBadgeClass = (status) => ({
    confirmed: 'badge badge-confirmed',
    cancelled:  'badge badge-cancelled',
  }[status] ?? 'badge badge-pending');

  if (loading) return (
    <div className="loading-screen">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@600&display=swap');
        :root{--dark:#0E0E0F;--gold:#C9A84C;--border-gold:rgba(201,168,76,0.28);--dim:#7A7672}
        .loading-screen{min-height:100vh;background:var(--dark);display:flex;flex-direction:column;
          align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;gap:20px}
        .loading-brand{font-size:36px;letter-spacing:.12em;color:var(--gold)}
        @keyframes spin{to{transform:rotate(360deg)}}
        .loader-ring{width:36px;height:36px;border:2px solid var(--border-gold);border-top-color:var(--gold);
          border-radius:50%;animation:spin .8s linear infinite}
        .loading-text{font-size:12px;letter-spacing:.2em;color:var(--dim);text-transform:uppercase;
          font-family:'DM Sans',sans-serif;font-weight:600}`}
      </style>
      <div className="loading-brand">EVENTORA</div>
      <div className="loader-ring" />
      <span className="loading-text">Loading your dashboard…</span>
    </div>
  );

  return (
    <div className="dashboard-root">
      <GlobalStyles />
      <div className="dashboard-inner">

        {/* ── Hero / Profile card ── */}
        <div className="hero-card">
          <div className="avatar">{user?.name.charAt(0)}</div>
          <div className="hero-text">
            <p className="hero-eyebrow">Member Portal</p>
            <h1 className="hero-name">Welcome back,<br />{user?.name}</h1>
            <div className="hero-status">
              <span className="status-dot" />
              User Dashboard
            </div>
          </div>
        </div>

        {/* ── Section header ── */}
        <div className="section-header">
          <h2 className="section-title">
            <FaTicketAlt size={18} /> My Booking Requests
          </h2>
          {bookings.length > 0 && (
            <span className="section-count">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {/* ── Empty state ── */}
        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-wrap">
              <FaTicketAlt size={28} color="var(--gold)" style={{ opacity: 0.5 }} />
            </div>
            <h3 className="empty-title">No bookings yet</h3>
            <p className="empty-sub">Discover upcoming events and reserve your place.</p>
            <Link to="/" className="browse-btn">
              Browse Events <ArrowRight />
            </Link>
          </div>
        ) : (
          /* ── Bookings grid ── */
          <div className="bookings-grid">
            {bookings.map((booking, i) => (
              <div
                key={booking._id}
                className="booking-card"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="card-body">
                  {booking.eventId ? (
                    <>
                      <div className="card-top">
                        <h3 className="event-title">{booking.eventId.title}</h3>
                        <div className="badges">
                          <span className={getStatusBadgeClass(booking.status)}>
                            {booking.status}
                          </span>
                          {booking.status !== 'cancelled' && (
                            <span className={`badge ${booking.paymentStatus === 'paid' ? 'badge-paid' : 'badge-unpaid'}`}>
                              {booking.paymentStatus.replace('_', ' ')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="card-meta">
                        <div className="meta-row">
                          <strong>Date</strong>
                          <span className="meta-value">
                            {new Date(booking.eventId.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="meta-row">
                          <strong>Amount</strong>
                          <span className="meta-value" style={{ color: 'var(--gold)' }}>
                            {booking.amount === 0 ? 'Free' : `₹${booking.amount.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="meta-row">
                          <strong>Requested</strong>
                          <span className="meta-value">
                            {new Date(booking.bookedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="deleted-event">Event details unavailable — this event may have been removed.</p>
                  )}
                </div>

                <div className="card-footer">
                  {booking.eventId && booking.status !== 'cancelled' ? (
                    <>
                      <Link to={`/event/${booking.eventId._id}`} className="view-link">
                        View Event <ArrowRight />
                      </Link>
                      <button onClick={() => cancelBooking(booking._id)} className="cancel-btn">
                        <FaTimesCircle size={11} /> Cancel
                      </button>
                    </>
                  ) : (
                    <span className="cancelled-label">Booking Cancelled</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;
