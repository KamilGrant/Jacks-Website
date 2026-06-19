import { useParams, Link } from 'react-router-dom';
import QuoteLink from '../components/QuoteLink';
import { useEffect } from 'react';
import { MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { SERVICES, SITE } from '../data/content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const LOCATIONS: Record<string, { name: string; desc: string; suburbs: string[] }> = {
  melbourne:  { name: 'Melbourne',          desc: 'Serving Melbourne\'s inner city and surrounding suburbs with premium bricklaying and masonry services.', suburbs: ['Fitzroy', 'Collingwood', 'Richmond', 'South Yarra', 'Prahran', 'St Kilda', 'Port Melbourne', 'Docklands'] },
  toorak:     { name: 'Toorak & Brighton',  desc: 'High-end residential bricklaying in Toorak, Brighton, Hawthorn and the inner east.', suburbs: ['Toorak', 'Brighton', 'Hawthorn', 'Camberwell', 'Kew', 'Glen Waverley', 'Malvern'] },
  geelong:    { name: 'Geelong',            desc: 'Covering Geelong and the Surf Coast with quality bricklaying for new builds, renovations and heritage restoration.', suburbs: ['Geelong CBD', 'Newtown', 'Belmont', 'Torquay', 'Lara', 'Ocean Grove', 'Barwon Heads'] },
  mornington: { name: 'Mornington Peninsula', desc: 'Serving the Mornington Peninsula with bricklaying for new homes, coastal renovations and outdoor living areas.', suburbs: ['Mornington', 'Mount Martha', 'Rosebud', 'Rye', 'Sorrento', 'Portsea', 'Frankston'] },
  dandenong:  { name: 'South East Melbourne', desc: 'Serving Dandenong, Berwick, Cranbourne and the south-east with residential and commercial bricklaying.', suburbs: ['Dandenong', 'Berwick', 'Cranbourne', 'Pakenham', 'Narre Warren', 'Hallam', 'Endeavour Hills'] },
};

export default function LocationPage() {
  const { location } = useParams<{ location: string }>();
  const loc = location ? LOCATIONS[location] : undefined;
  useEffect(() => { window.scrollTo(0, 0); }, [location]);

  if (!loc) return (
    <><Navbar />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div><h1 style={{ fontFamily: 'var(--font-head)', marginBottom: 16 }}>Location not found</h1><Link to="/" style={{ color: 'var(--clr-brick)' }}>← Back to home</Link></div>
      </div>
    <Footer /></>
  );

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 80 }}>
        {/* Hero */}
        <div style={s.hero}>
          <div className="container">
            <div style={s.pill}><MapPin size={14} />{loc.name}</div>
            <h1 style={s.heroTitle}>Bricklayer in {loc.name}</h1>
            <p style={s.heroDesc}>{loc.desc}</p>
            <div style={s.heroBtns}>
              <QuoteLink style={s.ctaPrimary}>Get a Free Quote</QuoteLink>
              <a href={`tel:${SITE.phone.replace(/ /g,'')}`} style={s.ctaSecondary}><Phone size={16} />{SITE.phone}</a>
            </div>
          </div>
        </div>

        <div className="container" style={s.body}>
          {/* Services in this area */}
          <div>
            <h2 style={s.h2}>Bricklaying Services in {loc.name}</h2>
            <div style={s.svcGrid}>
              {SERVICES.map(svc => (
                <Link key={svc.id} to={`/services/${svc.id}`} style={s.svcCard}>
                  <strong style={s.svcTitle}>{svc.title}</strong>
                  <p style={s.svcDesc}>{svc.desc}</p>
                  <span style={s.svcLink}>Learn more →</span>
                </Link>
              ))}
            </div>

            {/* Suburbs */}
            <h2 style={{ ...s.h2, marginTop: 48 }}>Suburbs We Cover</h2>
            <div style={s.suburbs}>
              {loc.suburbs.map(sub => (
                <div key={sub} style={s.suburb}><CheckCircle2 size={14} color="var(--clr-brick)" />{sub}</div>
              ))}
            </div>
            <p style={s.subNote}>And many more — contact us to confirm your suburb.</p>
          </div>

          {/* Sidebar */}
          <aside style={s.aside}>
            <div style={s.quoteBox}>
              <h3 style={s.quoteTitle}>Free Quote in {loc.name}</h3>
              <p style={s.quoteSub}>We'll come to your site, assess the job and provide a detailed written quote within 24 hours.</p>
              <QuoteLink style={s.quoteBtn}>Request a Quote</QuoteLink>
              <a href={`tel:${SITE.phone.replace(/ /g,'')}`} style={s.callBtn}><Phone size={15} />Call {SITE.phone}</a>
            </div>
            <div style={s.locLinks}>
              <p style={s.locLinksTitle}>Other Locations</p>
              {Object.entries(LOCATIONS).filter(([k]) => k !== location).map(([k, v]) => (
                <Link key={k} to={`/locations/${k}`} style={s.locLink}>{v.name} →</Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  hero:        { background: 'var(--clr-dark)', padding: '72px 0' },
  pill:        { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(196,168,130,.12)', color: 'var(--clr-tan)', padding: '6px 14px', borderRadius: 50, fontSize: '.75rem', fontWeight: 600, marginBottom: 20 },
  heroTitle:   { fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'white', marginBottom: 16 },
  heroDesc:    { color: 'rgba(255,255,255,.55)', fontSize: '1rem', maxWidth: 560, marginBottom: 32, lineHeight: 1.7 },
  heroBtns:    { display: 'flex', gap: 16, flexWrap: 'wrap' },
  ctaPrimary:  { display: 'inline-flex', alignItems: 'center', padding: '14px 28px', background: 'var(--clr-brick)', color: 'white', borderRadius: 10, fontWeight: 700 },
  ctaSecondary:{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'rgba(255,255,255,.08)', color: 'white', borderRadius: 10, fontWeight: 600, border: '1px solid rgba(255,255,255,.15)' },
  body:        { display: 'grid', gridTemplateColumns: '1fr 300px', gap: 64, padding: '64px 24px 96px', maxWidth: 1180, margin: '0 auto', alignItems: 'start' },
  h2:          { fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 24 },
  svcGrid:     { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  svcCard:     { background: 'var(--clr-cream)', borderRadius: 12, padding: '20px', border: '1px solid var(--clr-border)', display: 'flex', flexDirection: 'column', gap: 8 },
  svcTitle:    { fontSize: '.9rem', color: 'var(--clr-dark)' },
  svcDesc:     { fontSize: '.8rem', color: 'var(--clr-muted)', lineHeight: 1.6 },
  svcLink:     { fontSize: '.78rem', fontWeight: 600, color: 'var(--clr-brick)' },
  suburbs:     { display: 'flex', flexWrap: 'wrap', gap: 10 },
  suburb:      { display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', background: 'var(--clr-cream)', borderRadius: 50, fontSize: '.8rem', border: '1px solid var(--clr-border)' },
  subNote:     { fontSize: '.8rem', color: 'var(--clr-muted)', marginTop: 14 },
  aside:       { position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 20 },
  quoteBox:    { background: 'var(--clr-cream)', borderRadius: 16, padding: '28px 24px', border: '1px solid var(--clr-border)' },
  quoteTitle:  { fontFamily: 'var(--font-head)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 10 },
  quoteSub:    { fontSize: '.82rem', color: 'var(--clr-muted)', lineHeight: 1.6, marginBottom: 20 },
  quoteBtn:    { display: 'block', textAlign: 'center', background: 'var(--clr-brick)', color: 'white', padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: '.875rem', marginBottom: 10 },
  callBtn:     { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'white', color: 'var(--clr-dark)', padding: '13px', borderRadius: 10, fontWeight: 600, fontSize: '.875rem', border: '1px solid var(--clr-border)' },
  locLinks:    { background: 'white', borderRadius: 16, padding: '24px', border: '1px solid var(--clr-border)' },
  locLinksTitle:{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--clr-muted)', marginBottom: 14, fontWeight: 700 },
  locLink:     { display: 'block', fontSize: '.85rem', color: 'var(--clr-brick)', fontWeight: 500, padding: '8px 0', borderBottom: '1px solid var(--clr-border)' },
};
