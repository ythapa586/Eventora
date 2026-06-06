import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';

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
      --blue: #60A5FA;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .adm-root {
      min-height: 100vh;
      background: var(--dark);
      font-family: 'DM Sans', sans-serif;
      color: var(--text);
      padding: 40px 24px 80px;
      background-image:
        linear-gradient(rgba(201,168,76,0.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.022) 1px, transparent 1px);
      background-size: 64px 64px;
    }

    .adm-inner { max-width: 1200px; margin: 0 auto; }

    /* ── Animations ── */
    @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes spin     { to{transform:rotate(360deg)} }
    @keyframes shimmer  { 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes slideDown{ from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.4} }

    /* ── Hero Banner ── */
    .hero-banner {
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 36px;
      min-height: 220px;
      display: flex;
      align-items: center;
      animation: fadeUp .6s ease both;
      border: 1px solid var(--border-gold);
    }

    .hero-bg-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
      filter: brightness(0.22) saturate(0.6);
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(100deg, rgba(14,14,15,0.96) 0%, rgba(14,14,15,0.7) 55%, rgba(201,168,76,0.08) 100%);
    }

    .hero-grid-lines {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      padding: 40px 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      width: 100%;
    }

    .hero-left { display: flex; flex-direction: column; gap: 6px; }

    .hero-eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--gold);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hero-eyebrow::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 1px;
      background: var(--gold);
    }

    .hero-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(40px, 5vw, 64px);
      line-height: 0.93;
      letter-spacing: 0.02em;
      color: var(--text);
    }

    .hero-title span { color: var(--gold); }

    .hero-sub {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 15px;
      color: var(--dim);
      margin-top: 4px;
    }

    .hero-create-btn {
      background: var(--gold);
      color: #0E0E0F;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: none;
      border-radius: 2px;
      padding: 14px 28px;
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background .2s, transform .15s, box-shadow .2s;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
    }
    .hero-create-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform .4s;
    }
    .hero-create-btn:hover::after { transform: translateX(100%); }
    .hero-create-btn:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(201,168,76,0.3); }
    .hero-create-btn.cancel-mode { background: transparent; color: var(--dim); border: 1px solid var(--border); }
    .hero-create-btn.cancel-mode:hover { background: rgba(248,113,113,0.1); color: var(--red); border-color: rgba(248,113,113,0.3); box-shadow: none; }

    /* ── Stat cards ── */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 36px;
      animation: fadeUp .6s .08s ease both;
    }

    .stat-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 0;
      overflow: hidden;
      position: relative;
      transition: border-color .25s, transform .2s;
    }

    .stat-card:hover { border-color: var(--border-gold); transform: translateY(-2px); }

    .stat-card-img {
      width: 100%;
      height: 80px;
      object-fit: cover;
      filter: brightness(0.18) saturate(0.5);
      display: block;
    }

    .stat-card-img-overlay {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 80px;
      background: linear-gradient(180deg, transparent 0%, var(--card) 100%);
    }

    .stat-body {
      position: relative;
      padding: 16px 20px 20px;
    }

    .stat-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--dim);
      margin-bottom: 6px;
    }

    .stat-value {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 42px;
      line-height: 1;
      letter-spacing: 0.02em;
    }

    .stat-value.green  { color: var(--green); }
    .stat-value.blue   { color: var(--blue); }
    .stat-value.amber  { color: var(--amber); }

    .stat-icon {
      position: absolute;
      top: 16px;
      right: 20px;
      font-size: 22px;
      opacity: 0.18;
    }

    /* ── Create Event Form ── */
    .create-form-wrap {
      background: var(--card);
      border: 1px solid var(--border-gold);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 36px;
      animation: slideDown .4s ease both;
    }

    .form-hero-img {
      width: 100%;
      height: 120px;
      object-fit: cover;
      object-position: center 40%;
      filter: brightness(0.2) saturate(0.5);
      display: block;
    }

    .form-hero-bar {
      position: relative;
      margin-top: -40px;
      padding: 0 36px 0;
      z-index: 2;
    }

    .form-title-bar {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding-bottom: 28px;
      border-bottom: 1px solid var(--border);
    }

    .form-eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 4px;
    }

    .form-heading {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 36px;
      letter-spacing: 0.04em;
      color: var(--text);
    }

    .form-body { padding: 28px 36px 36px; }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }

    .form-full { grid-column: 1 / -1; }

    .field-group { display: flex; flex-direction: column; gap: 7px; }

    .field-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--dim);
    }

    .field-input,
    .field-textarea {
      background: var(--card2);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 12px 14px;
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      outline: none;
      transition: border-color .22s, box-shadow .22s, background .2s;
      width: 100%;
      -webkit-appearance: none;
    }
    .field-input::placeholder, .field-textarea::placeholder { color: var(--dim2); }
    .field-input:focus, .field-textarea:focus {
      border-color: var(--gold);
      background: rgba(201,168,76,0.04);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
    }
    .field-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.4); }

    .field-textarea { height: 110px; resize: vertical; }

    .publish-btn {
      width: 100%;
      background: var(--gold);
      color: #0E0E0F;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: none;
      border-radius: 2px;
      padding: 15px;
      cursor: pointer;
      margin-top: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: background .2s, transform .15s, box-shadow .2s;
      position: relative;
      overflow: hidden;
    }
    .publish-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform .4s;
    }
    .publish-btn:hover::after { transform: translateX(100%); }
    .publish-btn:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(201,168,76,0.28); }

    /* ── Two-column panel ── */
    .panels { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; animation: fadeUp .6s .16s ease both; }

    .panel-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .panel-header-img {
      width: 100%;
      height: 100px;
      object-fit: cover;
      object-position: center 30%;
      filter: brightness(0.15) saturate(0.5);
      display: block;
      flex-shrink: 0;
    }

    .panel-header {
      padding: 20px 24px 16px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .panel-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 22px;
      letter-spacing: 0.06em;
      color: var(--text);
    }

    .panel-count {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--dim);
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 3px 10px;
    }

    .panel-list {
      list-style: none;
      overflow-y: auto;
      max-height: 620px;
      flex: 1;
    }

    .panel-list::-webkit-scrollbar { width: 4px; }
    .panel-list::-webkit-scrollbar-track { background: transparent; }
    .panel-list::-webkit-scrollbar-thumb { background: var(--border-gold); border-radius: 2px; }

    /* ── Event item ── */
    .event-item {
      padding: 18px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      transition: background .2s;
    }
    .event-item:last-child { border-bottom: none; }
    .event-item:hover { background: rgba(255,255,255,0.02); }

    .event-info { flex: 1; min-width: 0; }

    .event-name {
      font-family: 'Playfair Display', serif;
      font-weight: 600;
      font-size: 15px;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 6px;
    }

    .event-meta-row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .event-meta-chip {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      color: var(--dim);
      font-weight: 500;
    }

    .dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
    .dot-blue  { background: var(--blue); }
    .dot-green { background: var(--green); box-shadow: 0 0 6px rgba(74,222,128,.4); }
    .dot-red   { background: var(--red); }

    .delete-btn {
      background: transparent;
      border: 1px solid rgba(248,113,113,0.2);
      color: var(--dim);
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-radius: 2px;
      padding: 7px 14px;
      cursor: pointer;
      transition: background .2s, color .2s, border-color .2s;
      flex-shrink: 0;
    }
    .delete-btn:hover { background: rgba(248,113,113,0.12); color: var(--red); border-color: rgba(248,113,113,0.4); }

    .empty-panel {
      padding: 48px 24px;
      text-align: center;
    }
    .empty-panel-icon { font-size: 32px; opacity: 0.2; margin-bottom: 12px; }
    .empty-panel-text { font-size: 13px; color: var(--dim2); letter-spacing: 0.05em; }

    /* ── Booking item ── */
    .booking-item {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
      border-left: 3px solid transparent;
      transition: background .2s, border-color .2s;
    }
    .booking-item:last-child { border-bottom: none; }
    .booking-item:hover { background: rgba(255,255,255,0.02); }
    .booking-item.pending   { border-left-color: var(--amber); }
    .booking-item.confirmed { border-left-color: var(--green); }
    .booking-item.cancelled { border-left-color: var(--red); }

    .booking-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 14px;
    }

    .booking-event-name {
      font-family: 'Playfair Display', serif;
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
    }

    .booking-badges { display: flex; flex-direction: column; gap: 4px; align-items: flex-end; flex-shrink: 0; }

    .badge {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      border-radius: 1px;
      padding: 3px 8px;
    }
    .badge-confirmed { background: rgba(74,222,128,.12); color: var(--green); border: 1px solid rgba(74,222,128,.2); }
    .badge-cancelled { background: rgba(248,113,113,.12); color: var(--red); border: 1px solid rgba(248,113,113,.2); }
    .badge-pending   { background: rgba(251,185,36,.12); color: var(--amber); border: 1px solid rgba(251,185,36,.2); }
    .badge-paid      { background: rgba(201,168,76,.12); color: var(--gold); border: 1px solid var(--border-gold); }
    .badge-unpaid    { background: rgba(255,255,255,.04); color: var(--dim); border: 1px solid var(--border); }

    .booking-info-box {
      background: rgba(0,0,0,0.2);
      border: 1px solid var(--border);
      border-radius: 2px;
      padding: 12px 14px;
      margin-bottom: 14px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .info-row {
      display: flex;
      align-items: baseline;
      gap: 10px;
      font-size: 13px;
    }

    .info-key {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--dim2);
      min-width: 60px;
      flex-shrink: 0;
    }

    .info-val { color: var(--text); font-size: 13px; }
    .info-val.gold  { color: var(--gold); font-weight: 600; }
    .info-val.green { color: var(--green); font-weight: 600; }
    .info-val.dim   { color: var(--dim); }
    .info-val.email { color: var(--dim); font-size: 12px; }

    .divider-rule { height: 1px; background: var(--border); margin: 4px 0; }

    /* ── Action buttons ── */
    .action-row { display: flex; gap: 8px; flex-wrap: wrap; }

    .action-btn {
      flex: 1;
      min-width: 110px;
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-radius: 2px;
      padding: 9px 12px;
      cursor: pointer;
      border: 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background .2s, color .2s, transform .15s;
    }
    .action-btn:hover { transform: translateY(-1px); }

    .btn-approve-paid {
      background: rgba(74,222,128,.08);
      color: var(--green);
      border-color: rgba(74,222,128,.25);
    }
    .btn-approve-paid:hover { background: rgba(74,222,128,.18); }

    .btn-approve-free {
      background: rgba(255,255,255,.04);
      color: var(--dim);
      border-color: var(--border);
    }
    .btn-approve-free:hover { background: rgba(255,255,255,.08); color: var(--text); }

    .btn-reject {
      flex: 0;
      min-width: 72px;
      background: rgba(248,113,113,.08);
      color: var(--red);
      border-color: rgba(248,113,113,.2);
    }
    .btn-reject:hover { background: rgba(248,113,113,.18); }

    /* ── Loading ── */
    .adm-loading {
      min-height: 100vh;
      background: var(--dark);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }
    .adm-loading-brand {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 36px;
      letter-spacing: .12em;
      color: var(--gold);
    }
    .adm-ring {
      width: 36px; height: 36px;
      border: 2px solid var(--border-gold);
      border-top-color: var(--gold);
      border-radius: 50%;
      animation: spin .8s linear infinite;
    }
    .adm-loading-text {
      font-size: 11px;
      letter-spacing: .2em;
      color: var(--dim);
      text-transform: uppercase;
      font-weight: 600;
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .adm-root { padding: 20px 14px 56px; }
      .hero-content { flex-direction: column; align-items: flex-start; padding: 28px 24px; }
      .stats-row { grid-template-columns: 1fr; }
      .panels { grid-template-columns: 1fr; }
      .form-grid { grid-template-columns: 1fr; }
      .form-hero-bar { padding: 0 20px 0; }
      .form-body { padding: 20px 20px 28px; }
    }
  `}</style>
);

/* ── Unsplash image URLs (static, no API key needed) ── */
const IMGS = {
  heroBanner:  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1400&q=80',
  statRevenue: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=70',
  statClients: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=70',
  statPending: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70',
  formBanner:  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
  eventPanel:  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=70',
  bookPanel:   'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=70',
};

/* ── Main Component ─────────────────────────────────────────── */
const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [event, setEvents] = useState([]);
  const [booking, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '',
    category: '', totalSeats: '', ticketPrice: '', image: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [eventsRes, bookingsRes] = await Promise.all([
        api.get('/event'),
        api.get('/booking/my')
      ]);
      setEvents(eventsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/event', formData);
      setShowEventForm(false);
      setFormData({ title: '', description: '', date: '', location: '', category: '', totalSeats: '', ticketPrice: '', image: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating event');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try { await api.delete(`/event/${id}`); fetchData(); }
      catch { alert('Error deleting event'); }
    }
  };

  const handleConfirmBooking = async (id, paymentStatus) => {
    try { await api.put(`/booking/${id}/confirm`, { paymentStatus }); fetchData(); }
    catch (err) { alert(err.response?.data?.message || 'Error confirming booking'); }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm("Cancel this user's booking request?")) {
      try { await api.delete(`/booking/${id}`); fetchData(); }
      catch (err) { alert(err.response?.data?.message || 'Error cancelling booking'); }
    }
  };

  const totalRevenue = bookings.reduce((s, b) =>
    b.paymentStatus === 'paid' && b.status === 'confirmed' ? s + b.amount : s, 0);
  const paidClients = new Set(
    bookings.filter(b => b.paymentStatus === 'paid' && b.status === 'confirmed').map(b => b.userId?._id)
  ).size;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  const getStatusClass = s => ({ confirmed: 'badge badge-confirmed', cancelled: 'badge badge-cancelled' }[s] ?? 'badge badge-pending');

  if (loading) return (
    <div className="adm-loading" style={{ minHeight:'100vh', background:'#0E0E0F', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}>
      <GlobalStyles />
      <div className="adm-loading-brand">EVENTORA</div>
      <div className="adm-ring" />
      <span className="adm-loading-text">Loading admin panel…</span>
    </div>
  );

  return (
    <div className="adm-root">
      <GlobalStyles />
      <div className="adm-inner">

        {/* ── Hero Banner ── */}
        <div className="hero-banner">
          <img src={IMGS.heroBanner} alt="" className="hero-bg-img" />
          <div className="hero-overlay" />
          <div className="hero-grid-lines" />
          <div className="hero-content">
            <div className="hero-left">
              <p className="hero-eyebrow">Control Centre</p>
              <h1 className="hero-title">Admin<br /><span>Dashboard</span></h1>
              <p className="hero-sub">Manage events and confirm bookings with precision.</p>
            </div>
            <button
              onClick={() => setShowEventForm(!showEventForm)}
              className={`hero-create-btn ${showEventForm ? 'cancel-mode' : ''}`}
            >
              {showEventForm ? '✕ Cancel' : '+ Create Event'}
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="stats-row">
          {[
            { img: IMGS.statRevenue, label: 'Total Revenue',    value: `₹${totalRevenue.toLocaleString()}`, cls: 'green', icon: '₹' },
            { img: IMGS.statClients, label: 'Paid Clients',     value: paidClients,                        cls: 'blue',  icon: '👤' },
            { img: IMGS.statPending, label: 'Pending Requests', value: pendingCount,                       cls: 'amber', icon: '⏳' },
          ].map(({ img, label, value, cls, icon }) => (
            <div className="stat-card" key={label}>
              <img src={img} alt="" className="stat-card-img" />
              <div className="stat-card-img-overlay" />
              <div className="stat-body">
                <div className="stat-label">{label}</div>
                <div className={`stat-value ${cls}`}>{value}</div>
                <div className="stat-icon">{icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Create Event Form ── */}
        {showEventForm && (
          <div className="create-form-wrap">
            <img src={IMGS.formBanner} alt="" className="form-hero-img" />
            <div className="form-hero-bar">
              <div className="form-title-bar">
                <div>
                  <p className="form-eyebrow">New Event</p>
                  <h2 className="form-heading">Create & Publish</h2>
                </div>
              </div>
            </div>
            <div className="form-body">
              <form onSubmit={handleCreateEvent}>
                <div className="form-grid">
                  {[
                    { key: 'title',       placeholder: 'Event Title',                   type: 'text' },
                    { key: 'category',    placeholder: 'Category (e.g. Tech, Music)',    type: 'text' },
                    { key: 'date',        placeholder: '',                               type: 'date' },
                    { key: 'location',    placeholder: 'Location',                       type: 'text' },
                    { key: 'totalSeats',  placeholder: 'Total Seats',                   type: 'number' },
                    { key: 'ticketPrice', placeholder: 'Ticket Price (0 for free)',      type: 'number' },
                  ].map(({ key, placeholder, type }) => (
                    <div className="field-group" key={key}>
                      <label className="field-label">{placeholder || key}</label>
                      <input
                        required
                        type={type}
                        placeholder={placeholder}
                        className="field-input"
                        value={formData[key]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                      />
                    </div>
                  ))}

                  <div className="field-group form-full">
                    <label className="field-label">Image URL</label>
                    <input
                      type="text"
                      placeholder="Direct image link (optional)"
                      className="field-input"
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="field-group form-full">
                    <label className="field-label">Description</label>
                    <textarea
                      required
                      placeholder="Event description…"
                      className="field-textarea"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
                <button type="submit" className="publish-btn" style={{ marginTop: 20 }}>
                  Publish Event →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Two-column panels ── */}
        <div className="panels">

          {/* Events Panel */}
          <div className="panel-card">
            <img src={IMGS.eventPanel} alt="" className="panel-header-img" />
            <div className="panel-header">
              <span className="panel-title">All Events</span>
              <span className="panel-count">{event.length} total</span>
            </div>
            <ul className="panel-list">
              {event.length === 0 ? (
                <li className="empty-panel">
                  <div className="empty-panel-icon">🎪</div>
                  <p className="empty-panel-text">No events created yet</p>
                </li>
              ) : event.map(event => (
                <li key={event._id} className="event-item">
                  <div className="event-info">
                    <div className="event-name">{event.title}</div>
                    <div className="event-meta-row">
                      <div className="event-meta-chip">
                        <div className="dot dot-blue" />
                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="event-meta-chip">
                        <div className={`dot ${event.availableSeats > 0 ? 'dot-green' : 'dot-red'}`} />
                        {event.availableSeats}/{event.totalSeats} seats
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteEvent(event._id)} className="delete-btn">Delete</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bookings Panel */}
          <div className="panel-card">
            <img src={IMGS.bookPanel} alt="" className="panel-header-img" />
            <div className="panel-header">
              <span className="panel-title">Booking Requests</span>
              <span className="panel-count">{bookings.length} total</span>
            </div>
            <ul className="panel-list">
              {bookings.length === 0 ? (
                <li className="empty-panel">
                  <div className="empty-panel-icon">🎟️</div>
                  <p className="empty-panel-text">No bookings yet</p>
                </li>
              ) : bookings.map(booking => (
                <li
                  key={booking._id}
                  className={`booking-item ${booking.status}`}
                >
                  <div className="booking-top">
                    <div className="booking-event-name">
                      {booking.eventId?.title || 'Deleted Event'}
                    </div>
                    <div className="booking-badges">
                      <span className={getStatusClass(booking.status)}>{booking.status}</span>
                      {booking.status !== 'cancelled' && (
                        <span className={`badge ${booking.paymentStatus === 'paid' ? 'badge-paid' : 'badge-unpaid'}`}>
                          {booking.paymentStatus.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="booking-info-box">
                    <div className="info-row">
                      <span className="info-key">User</span>
                      <span className="info-val">{booking.userId?.name}</span>
                      <span className="info-val email">{booking.userId?.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-key">Amount</span>
                      <span className={`info-val ${booking.amount === 0 ? 'green' : 'gold'}`}>
                        {booking.amount === 0 ? 'Free' : `₹${booking.amount.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-key">Date</span>
                      <span className="info-val dim">{new Date(booking.bookedAt).toLocaleString('en-IN')}</span>
                    </div>
                    {booking.eventId && (
                      <>
                        <div className="divider-rule" />
                        <div className="info-row">
                          <span className="info-key">Seats</span>
                          <span className={`info-val ${booking.eventId.availableSeats > 0 ? 'green' : ''}`} style={booking.eventId.availableSeats === 0 ? { color: 'var(--red)' } : {}}>
                            {booking.eventId.availableSeats}
                          </span>
                          <span className="info-val dim">remaining of {booking.eventId.totalSeats}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {booking.status === 'pending' && (
                    <div className="action-row">
                      <button onClick={() => handleConfirmBooking(booking._id, 'paid')} className="action-btn btn-approve-paid">
                        ✓ Approve Paid
                      </button>
                      <button onClick={() => handleConfirmBooking(booking._id, 'not_paid')} className="action-btn btn-approve-free">
                        ✓ Undecided
                      </button>
                      <button onClick={() => handleCancelBooking(booking._id)} className="action-btn btn-reject">
                        ✕ Reject
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;