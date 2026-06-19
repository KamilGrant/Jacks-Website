import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';
import QuoteLink from './QuoteLink';
import { useInView } from '../hooks/useInView';

/* PLUG & PLAY: update suburbs to match the client's actual service area */
const SUBURBS = [
  'Melbourne CBD', 'Toorak', 'Brighton', 'Hawthorn', 'Richmond',
  'South Yarra', 'St Kilda', 'Prahran', 'Doncaster', 'Box Hill',
  'Frankston', 'Dandenong', 'Cranbourne', 'Geelong', 'Werribee',
  'Footscray', 'Sunshine', 'Essendon', 'Brunswick', 'Fitzroy',
  'Mornington', 'Rosebud', 'Pakenham', 'Berwick', 'Narre Warren',
];

export default function ServiceArea() {
  const [ref, inView] = useInView();

  return (
    <section id="service-area" className="section">
      <div className="container service-area-grid" style={s.wrap}>
        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="map-wrap"
          style={s.mapWrap}
          ref={ref as React.Ref<HTMLDivElement>}
        >
          {/*
            PLUG & PLAY: Replace this iframe src with a Google Maps embed URL
            for the client's specific service area.
            Go to maps.google.com → Share → Embed a map → copy the src URL.
          */}
          <iframe
            title="JD Brickwork Service Area"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353!3d-37.8172099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d9d3b6da95d8!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1700000000000"
            style={s.map}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Suburb list */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p style={s.eyebrow}>Where We Work</p>
          <h2 style={s.title}>Service Area</h2>
          <p style={s.desc}>We cover Greater Melbourne and surrounds. Not sure if we service your area? Give us a call — we may still be able to help.</p>

          <div style={s.tagWrap}>
            {SUBURBS.map(sub => (
              <div key={sub} style={s.tag}>
                <MapPin size={12} color="var(--clr-brick)" />
                {sub}
              </div>
            ))}
          </div>

          <div style={s.note}>
            <CheckCircle2 size={16} color="var(--clr-brick)" />
            <span>Don't see your suburb? <QuoteLink style={{ color: 'var(--clr-brick)', fontWeight: 600 }}>Contact us</QuoteLink> — we cover many more areas.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrap:    { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' },
  mapWrap: { borderRadius: 20, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,.12)', height: 480, position: 'relative' },
  map:     { width: '100%', height: '100%', border: 'none', display: 'block' },
  eyebrow: { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-brick)', marginBottom: 12 },
  title:   { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 16 },
  desc:    { color: 'var(--clr-muted)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: 28 },
  tagWrap: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  tag:     { display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'var(--clr-cream)', border: '1px solid var(--clr-border)', borderRadius: 50, fontSize: '.78rem', color: 'var(--clr-text)', fontWeight: 500 },
  note:    { display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px', background: 'rgba(155,106,62,.06)', borderRadius: 12, border: '1px solid rgba(155,106,62,.15)', fontSize: '.85rem', color: 'var(--clr-muted)' },
};
