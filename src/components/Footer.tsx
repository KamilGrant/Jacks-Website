import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SITE } from '../data/content';

const SvgFb = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const SvgIg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const NAV  = ['Home', 'About', 'Services', 'Our Work', 'Reviews', 'Contact'];
const SVCS = ['New Build Brickwork', 'Restoration & Repointing', 'Feature Walls', 'Retaining Walls', 'Outdoor Areas'];

const SOCIAL_LINKS = [
  {
    href: SITE.facebook, label: 'Facebook', handle: '@jdbrickwork',
    icon: <SvgFb size={22} />,
    gradient: '#1877F2',
  },
  {
    href: SITE.instagram, label: 'Instagram', handle: '@jdbrickwork',
    icon: <SvgIg size={22} />,
    gradient: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
  },
  {
    href: SITE.google, label: 'Google', handle: 'JD Brickwork',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    gradient: 'white',
    iconStyle: { border: '1.5px solid rgba(255,255,255,.2)' },
  },
];

export default function Footer() {
  return (
    <footer style={s.footer}>

      {/* ── Prominent social strip ─────────────────────── */}
      <div style={s.socialStrip}>
        <div className="container" style={s.stripInner}>
          <div>
            <p style={s.stripLabel}>Follow Our Work</p>
            <p style={s.stripSub}>Stay up to date with our latest projects and news</p>
          </div>
          <div className="footer-social-cards" style={s.socialCards}>
            {SOCIAL_LINKS.map(sc => (
              <motion.a
                key={sc.label}
                href={sc.href}
                target="_blank"
                rel="noreferrer"
                style={s.socialCard}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                <div style={{ ...s.socialCardIcon, background: sc.gradient, ...(sc as any).iconStyle }}>
                  {sc.icon}
                </div>
                <div>
                  <strong style={s.socialCardLabel}>{sc.label}</strong>
                  <span style={s.socialCardHandle}>{sc.handle}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer grid ──────────────────────────── */}
      <div className="container footer-grid" style={s.grid}>
        <div>
          <a href="#home" style={s.logo}>
            <img src="/logo.svg" alt="JD Brickwork" style={{ height: 36 }} onError={e => (e.currentTarget.style.display = 'none')} />
            <span style={s.logoText}>JD <span style={{ color: 'var(--clr-tan)' }}>Brickwork</span></span>
          </a>
          <p style={s.brandDesc}>Quality bricklaying and construction services. Built to last, crafted with pride.</p>
        </div>

        <div>
          <h4 style={s.colTitle}>Quick Links</h4>
          <ul style={s.linkList}>
            {NAV.map(n => <li key={n}><a href={`#${n.toLowerCase().replace(' ', '')}`} style={s.link}>{n}</a></li>)}
          </ul>
        </div>

        <div>
          <h4 style={s.colTitle}>Services</h4>
          <ul style={s.linkList}>
            {SVCS.map(sv => <li key={sv}><a href="#services" style={s.link}>{sv}</a></li>)}
          </ul>
        </div>

        <div>
          <h4 style={s.colTitle}>Contact</h4>
          <ul style={{ ...s.linkList, gap: 12 }}>
            <li style={s.contactItem}><Phone size={14} style={s.icon} />{SITE.phone}</li>
            <li style={s.contactItem}><Mail size={14} style={s.icon} />{SITE.email}</li>
            <li style={s.contactItem}><MapPin size={14} style={s.icon} />{SITE.area}</li>
          </ul>
        </div>
      </div>

      <div style={s.bottom}>
        <div className="container" style={s.bottomInner}>
          <p style={s.copy}>&copy; {new Date().getFullYear()} JD Brickwork. All rights reserved.</p>
          <p style={s.copy}>Website by <a href="#" style={{ color: 'var(--clr-tan)' }}>Your Agency</a></p>
        </div>
      </div>
    </footer>
  );
}

const s: Record<string, React.CSSProperties> = {
  footer:          { background: 'var(--clr-dark)' },
  socialStrip:     { borderBottom: '1px solid rgba(255,255,255,.08)', padding: '48px 0' },
  stripInner:      { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 },
  stripLabel:      { fontFamily: 'var(--font-head)', fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: 4 },
  stripSub:        { fontSize: '.85rem', color: 'rgba(255,255,255,.4)' },
  socialCards:     { display: 'flex', gap: 16, flexWrap: 'wrap' },
  socialCard:      { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'rgba(255,255,255,.06)', borderRadius: 14, border: '1px solid rgba(255,255,255,.1)', transition: 'all .25s' },
  socialCardIcon:  { width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 },
  socialCardLabel: { display: 'block', fontSize: '.9rem', fontWeight: 700, color: 'white', marginBottom: 2 },
  socialCardHandle:{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)' },
  grid:            { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, paddingTop: 56, paddingBottom: 48 },
  logo:            { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 },
  logoText:        { fontFamily: 'var(--font-head)', fontSize: '1.3rem', fontWeight: 700, color: 'white' },
  brandDesc:       { fontSize: '.85rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.7, maxWidth: 280 },
  colTitle:        { fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--clr-tan)', marginBottom: 20 },
  linkList:        { display: 'flex', flexDirection: 'column', gap: 10 },
  link:            { fontSize: '.85rem', color: 'rgba(255,255,255,.45)' },
  contactItem:     { display: 'flex', alignItems: 'center', gap: 10, fontSize: '.85rem', color: 'rgba(255,255,255,.45)' },
  icon:            { color: 'var(--clr-brick)', flexShrink: 0 },
  bottom:          { borderTop: '1px solid rgba(255,255,255,.08)', padding: '24px 0' },
  bottomInner:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  copy:            { fontSize: '.78rem', color: 'rgba(255,255,255,.28)' },
};
