import { Globe, Phone, Mail, MapPin } from 'lucide-react';

const SvgFb = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const SvgIg = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
import { SITE } from '../data/content';

const NAV = ['Home', 'About', 'Services', 'Our Work', 'Reviews', 'Contact'];
const SVCS = ['New Build Brickwork', 'Restoration & Repointing', 'Feature Walls', 'Retaining Walls', 'Outdoor Areas'];

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div className="container" style={s.grid}>
        {/* Brand */}
        <div>
          <a href="#home" style={s.logo}>
            <img src="/logo.svg" alt="JD Brickwork" style={{ height: 36 }} onError={e => (e.currentTarget.style.display = 'none')} />
            <span style={s.logoText}>JD <span style={{ color: 'var(--clr-tan)' }}>Brickwork</span></span>
          </a>
          <p style={s.brandDesc}>Quality bricklaying and construction services. Built to last, crafted with pride.</p>
        </div>

        {/* Quick links */}
        <div>
          <h4 style={s.colTitle}>Quick Links</h4>
          <ul style={s.linkList}>
            {NAV.map(n => (
              <li key={n}><a href={`#${n.toLowerCase().replace(' ', '')}`} style={s.link}>{n}</a></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 style={s.colTitle}>Services</h4>
          <ul style={s.linkList}>
            {SVCS.map(sv => <li key={sv}><a href="#services" style={s.link}>{sv}</a></li>)}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={s.colTitle}>Contact</h4>
          <ul style={{ ...s.linkList, gap: 12 }}>
            <li style={s.contactItem}><Phone size={14} style={s.icon} />{SITE.phone}</li>
            <li style={s.contactItem}><Mail size={14} style={s.icon} />{SITE.email}</li>
            <li style={s.contactItem}><MapPin size={14} style={s.icon} />{SITE.area}</li>
          </ul>
          <div style={s.socials}>
            {[
              { href: SITE.facebook, icon: <SvgFb />, label: 'Facebook' },
              { href: SITE.instagram, icon: <SvgIg />, label: 'Instagram' },
              { href: SITE.google, icon: <Globe size={14} />, label: 'Google' },
            ].map(sc => (
              <a key={sc.label} href={sc.href} aria-label={sc.label} style={s.social}>{sc.icon}</a>
            ))}
          </div>
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

const s = {
  footer:      { background: 'var(--clr-dark)', paddingTop: 72 },
  grid:        { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, paddingBottom: 48 },
  logo:        { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 },
  logoText:    { fontFamily: 'var(--font-head)', fontSize: '1.3rem', fontWeight: 700, color: 'white' },
  brandDesc:   { fontSize: '.85rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.7, maxWidth: 280 },
  colTitle:    { fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.15em', color: 'var(--clr-tan)', marginBottom: 20 },
  linkList:    { display: 'flex', flexDirection: 'column' as const, gap: 10 },
  link:        { fontSize: '.85rem', color: 'rgba(255,255,255,.45)', transition: 'color .25s' },
  contactItem: { display: 'flex', alignItems: 'center', gap: 10, fontSize: '.85rem', color: 'rgba(255,255,255,.45)' },
  icon:        { color: 'var(--clr-brick)', flexShrink: 0 },
  socials:     { display: 'flex', gap: 10, marginTop: 20 },
  social:      { width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.4)' },
  bottom:      { borderTop: '1px solid rgba(255,255,255,.08)', padding: '24px 0' },
  bottomInner: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  copy:        { fontSize: '.78rem', color: 'rgba(255,255,255,.28)' },
};
