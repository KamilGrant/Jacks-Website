import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import QuoteLink from './QuoteLink';
import { useInView } from '../hooks/useInView';
import { SITE } from '../data/content';

const CHECKS = [
  'Fully licensed & insured',
  'Free, no-obligation quotes',
  'Residential & commercial projects',
  'On time, every time',
];

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="section" ref={ref as React.Ref<HTMLElement>}>
      <div className="container" style={s.grid}>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={s.imgWrap}
        >
          {/* PLUG & PLAY: replace /images/about-main.jpg */}
          <div style={s.imgMain}>
            <img src="/images/about-main.jpg" alt="JD Brickwork team" style={s.img} />
          </div>
          {/* PLUG & PLAY: replace /images/about-accent.jpg */}
          <div style={s.imgAccent}>
            <img src="/images/about-accent.jpg" alt="Brickwork detail" style={{ ...s.img, aspectRatio: '1' }} />
          </div>
          <div style={s.badge}>
            <Award size={28} color="white" />
            <div>
              <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.7)', display: 'block' }}>Trusted Since</span>
              <strong style={{ fontSize: '1.3rem', color: 'white' }}>{SITE.established}</strong>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          style={s.text}
        >
          <p style={s.eyebrow}>Who We Are</p>
          <h2 style={s.title}>A Legacy of Solid Craftsmanship</h2>
          {/* PLUG & PLAY: Replace these paragraphs with the client's own description */}
          <p style={s.p}>
            JD Brickwork has been building and restoring structures across the region for over {SITE.yearsExp} years.
            Founded on the belief that quality should never be compromised, we take pride in every brick we lay —
            whether it's a feature garden wall, a full house build, or a heritage restoration project.
          </p>
          <p style={s.p}>
            Our team of skilled tradesmen brings decades of combined experience and an eye for detail that sets our
            work apart. We work closely with homeowners, architects and developers to deliver results that are both
            beautiful and built to last.
          </p>
          <ul style={s.list}>
            {CHECKS.map(c => (
              <li key={c} style={s.listItem}>
                <CheckCircle2 size={16} color="var(--clr-brick)" style={{ flexShrink: 0 }} />
                {c}
              </li>
            ))}
          </ul>
          <QuoteLink style={s.btn}>Work With Us</QuoteLink>
        </motion.div>
      </div>
    </section>
  );
}

const s = {
  grid:      { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' },
  imgWrap:   { position: 'relative' as const },
  imgMain:   { borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,.14)' },
  imgAccent: {
    position: 'absolute' as const, bottom: -40, right: -32,
    width: '52%', border: '5px solid white', borderRadius: 'var(--radius-lg)',
    overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,.14)',
  },
  img:       { width: '100%', objectFit: 'cover' as const, aspectRatio: '4/5', background: 'var(--clr-border)', display: 'block' },
  badge:     {
    position: 'absolute' as const, top: 32, left: -24,
    background: 'var(--clr-brick)', padding: '18px 22px',
    borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center',
    gap: 12, boxShadow: '0 6px 24px rgba(0,0,0,.18)',
  },
  text:      { paddingLeft: 16 },
  eyebrow:   { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--clr-brick)', marginBottom: 12 },
  title:     { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 20, lineHeight: 1.2 },
  p:         { color: 'var(--clr-muted)', marginBottom: 16, fontSize: '.95rem' },
  list:      { margin: '28px 0 36px', display: 'flex', flexDirection: 'column' as const, gap: 12 },
  listItem:  { display: 'flex', alignItems: 'center', gap: 10, fontSize: '.9rem', fontWeight: 500 },
  btn:       {
    display: 'inline-flex', padding: '14px 32px',
    background: 'var(--clr-brick)', color: 'white',
    borderRadius: 'var(--radius)', fontWeight: 600, fontSize: '.9rem',
  },
};
