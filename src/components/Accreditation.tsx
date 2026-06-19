import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileCheck, HardHat, Hammer, Star } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* PLUG & PLAY: Replace placeholder text with the client's real licence number, MBA membership etc. */
const BADGES = [
  { icon: <ShieldCheck size={28} color="var(--clr-brick)" />, title: 'Fully Licensed',    sub: 'Lic. No. XXXXXXX' },
  { icon: <Award       size={28} color="var(--clr-brick)" />, title: 'MBA Member',         sub: 'Master Builders Assoc.' },
  { icon: <FileCheck   size={28} color="var(--clr-brick)" />, title: 'Public Liability',   sub: '$20M Cover' },
  { icon: <HardHat     size={28} color="var(--clr-brick)" />, title: 'WorkSafe Compliant', sub: 'Workers Comp. Insured' },
  { icon: <Hammer      size={28} color="var(--clr-brick)" />, title: '15+ Years Trading',  sub: 'Est. 2009' },
  { icon: <Star        size={28} color="var(--clr-brick)" />, title: '5-Star Rated',       sub: 'Google Reviews' },
];

export default function Accreditation() {
  const [ref, inView] = useInView();
  return (
    <section style={{ background: 'var(--clr-dark)', padding: '56px 0' }}>
      <div className="container">
        <motion.p
          ref={ref as React.Ref<HTMLParagraphElement>}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ textAlign: 'center', color: 'rgba(255,255,255,.35)', fontSize: '.75rem', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 32 }}
        >
          Licensed · Insured · Accredited
        </motion.p>
        <div style={s.grid}>
          {BADGES.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={s.badge}
            >
              <div style={s.iconWrap}>{b.icon}</div>
              <div>
                <strong style={s.badgeTitle}>{b.title}</strong>
                <span style={s.badgeSub}>{b.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  grid:       { display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16 },
  badge:      { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, padding: '24px 16px', background: 'rgba(255,255,255,.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,.08)' },
  iconWrap:   { width: 56, height: 56, background: 'rgba(155,106,62,.12)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  badgeTitle: { display: 'block', fontSize: '.82rem', fontWeight: 700, color: 'white', marginBottom: 4 },
  badgeSub:   { fontSize: '.72rem', color: 'rgba(255,255,255,.4)' },
};
