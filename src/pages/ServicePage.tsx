import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data/content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SERVICE_DETAIL: Record<string, { description: string; includes: string[]; from: string; image: string }> = {
  'new-build':   { description: 'Full structural brickwork for new residential and commercial builds, from footings to roofline. We work with architects, builders and homeowners to deliver brickwork that is structurally sound, beautifully finished and on schedule.', includes: ['Footing and base course', 'Full wall construction', 'Window and door openings', 'Lintels and arches', 'Clean-up and waste removal'], from: '$280/m²', image: '/images/gallery/g1.jpg' },
  'restoration': { description: 'Expert repointing, tuckpointing and heritage restoration. We specialise in matching original mortar profiles and sourcing period-accurate bricks to achieve seamless restoration results.', includes: ['Mortar rake-out to 20mm', 'Re-pointing with matched mortar', 'Brick replacement where required', 'Heritage colour matching', 'Sealing and protection'], from: '$95/m²', image: '/images/gallery/g3.jpg' },
  'feature':     { description: 'Stunning feature walls, garden beds and paving that add character and value. Whether it\'s a rendered block wall, an exposed brick feature or a complex curved garden bed, we deliver results that make the space.', includes: ['Design consultation', 'Full construction', 'Sealing and finishing', 'Waste removal'], from: '$180/m²', image: '/images/gallery/g2.jpg' },
  'retaining':   { description: 'Structurally sound retaining walls designed to handle lateral soil load while looking great. We handle all footing, drainage and waterproofing requirements.', includes: ['Footing and drainage design', 'Full brick or block construction', 'Agricultural drain installation', 'Waterproof membrane', 'Backfill and compaction'], from: '$220/m²', image: '/images/gallery/g6.jpg' },
  'fireplace':   { description: 'Custom-built brick fireplaces, pizza ovens and outdoor BBQ areas. We design and build from scratch or work with your existing plans to create a centrepiece for your indoor or outdoor living space.', includes: ['Custom design', 'Full brick construction', 'Flue and ventilation', 'Hearth and surround', 'Sealing and finishing'], from: '$3,500', image: '/images/gallery/g4.jpg' },
  'extension':   { description: 'Seamless brick extensions and renovations that match your existing structure perfectly. We source matching brick, replicate existing mortar profiles and deliver extensions that look like they were always there.', includes: ['Brick matching consultation', 'Structural brickwork', 'Window and door integration', 'Tie-in to existing structure', 'Clean-up'], from: '$280/m²', image: '/images/gallery/g5.jpg' },
};

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);
  const detail  = id ? SERVICE_DETAIL[id] : undefined;
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!service || !detail) return (
    <><Navbar />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div><h1 style={{ fontFamily: 'var(--font-head)', marginBottom: 16 }}>Service not found</h1><Link to="/" style={{ color: 'var(--clr-brick)' }}>← Back to home</Link></div>
      </div>
    <Footer /></>
  );

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 80 }}>
        <div style={s.hero}>
          <img src={detail.image} alt={service.title} style={s.heroImg} />
          <div style={s.heroOverlay} />
          <div className="container" style={s.heroContent}>
            <Link to="/#services" style={s.back}><ArrowLeft size={16} /> All Services</Link>
            <p style={s.eyebrow}>Our Services</p>
            <h1 style={s.heroTitle}>{service.title}</h1>
            <p style={s.from}>From {detail.from}</p>
          </div>
        </div>
        <div className="container" style={s.body}>
          <div>
            <h2 style={s.h2}>About This Service</h2>
            <p style={s.desc}>{detail.description}</p>
            <h2 style={s.h2}>What's Included</h2>
            <ul style={s.list}>
              {detail.includes.map(item => (
                <li key={item} style={s.listItem}><CheckCircle2 size={16} color="var(--clr-brick)" />{item}</li>
              ))}
            </ul>
          </div>
          <aside style={s.aside}>
            <div style={s.priceCard}>
              <p style={s.priceLabel}>Starting From</p>
              <p style={s.price}>{detail.from}</p>
              <p style={s.priceNote}>Final price confirmed after free site visit</p>
              <Link to="/#contact" style={s.ctaBtn}>Get a Free Quote</Link>
              <a href="tel:0400000000" style={s.callBtn}>Call Now</a>
            </div>
            <div style={s.otherServices}>
              <p style={s.otherTitle}>Other Services</p>
              {SERVICES.filter(sv => sv.id !== id).map(sv => (
                <Link key={sv.id} to={`/services/${sv.id}`} style={s.otherLink}>{sv.title} →</Link>
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
  hero:        { position: 'relative', height: 440, overflow: 'hidden' },
  heroImg:     { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,18,15,.9), rgba(20,18,15,.4))' },
  heroContent: { position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)', width: '100%' },
  back:        { display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,.7)', fontSize: '.82rem', marginBottom: 16 },
  eyebrow:     { fontSize: '.72rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-tan)', marginBottom: 10 },
  heroTitle:   { fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 8 },
  from:        { color: 'var(--clr-tan)', fontWeight: 600, fontSize: '1.1rem' },
  body:        { display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, padding: '64px 24px 96px', alignItems: 'start', maxWidth: 1180, margin: '0 auto' },
  h2:          { fontFamily: 'var(--font-head)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--clr-dark)', margin: '0 0 16px' },
  desc:        { fontSize: '.95rem', color: 'var(--clr-muted)', lineHeight: 1.85, marginBottom: 36 },
  list:        { display: 'flex', flexDirection: 'column', gap: 12 },
  listItem:    { display: 'flex', alignItems: 'center', gap: 10, fontSize: '.9rem', color: 'var(--clr-text)' },
  aside:       { display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 100 },
  priceCard:   { background: 'var(--clr-cream)', borderRadius: 16, padding: '28px 24px', border: '1px solid var(--clr-border)' },
  priceLabel:  { fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--clr-muted)', marginBottom: 4 },
  price:       { fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 4 },
  priceNote:   { fontSize: '.75rem', color: 'var(--clr-muted)', marginBottom: 20 },
  ctaBtn:      { display: 'block', textAlign: 'center', background: 'var(--clr-brick)', color: 'white', padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: '.875rem', marginBottom: 10 },
  callBtn:     { display: 'block', textAlign: 'center', background: 'white', color: 'var(--clr-dark)', padding: '13px', borderRadius: 10, fontWeight: 600, fontSize: '.875rem', border: '1px solid var(--clr-border)' },
  otherServices:{ background: 'white', borderRadius: 16, padding: '24px', border: '1px solid var(--clr-border)' },
  otherTitle:  { fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--clr-muted)', marginBottom: 14, fontWeight: 700 },
  otherLink:   { display: 'block', fontSize: '.85rem', color: 'var(--clr-brick)', fontWeight: 500, padding: '8px 0', borderBottom: '1px solid var(--clr-border)' },
};
