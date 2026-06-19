import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ImagePlus } from 'lucide-react';
import QuoteLink from './QuoteLink';
import { SITE } from '../data/content';

/*
 * PLUG & PLAY — Hero Image
 * Replace /public/images/hero-bg.jpg with the client's photo.
 * Recommended: a clear shot of a completed brickwork project, 900×1100px+
 */
const HERO_IMAGE = '/images/hero-bg.jpg';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
});

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="home" style={s.section}>
      <div className="container hero-inner" style={s.inner}>

        {/* ── LEFT: Text ─────────────────────────────────── */}
        <div style={s.left}>
          <motion.p {...fade(0.1)} style={s.eyebrow}>
            Est. {SITE.established} · Professional Bricklaying
          </motion.p>

          <motion.h1 {...fade(0.25)} style={s.title}>
            Built to Last.<br />
            <span style={{ color: 'var(--clr-brick)' }}>Crafted with Pride.</span>
          </motion.h1>

          <motion.p {...fade(0.4)} style={s.sub}>
            {SITE.sub}
          </motion.p>

          <motion.div {...fade(0.55)} style={s.btns}>
            <a href="#gallery" style={s.btnPrimary}>View Our Work</a>
            <QuoteLink style={s.btnOutline}>Get a Free Quote</QuoteLink>
          </motion.div>

          {/* Trust badges */}
          <motion.div {...fade(0.7)} style={s.badges}>
            <div style={s.badge}><span style={s.badgeNum}>{SITE.yearsExp}+</span><span style={s.badgeLabel}>Years Experience</span></div>
            <div style={s.badgeDivider} />
            <div style={s.badge}><span style={s.badgeNum}>{SITE.projects}+</span><span style={s.badgeLabel}>Projects Done</span></div>
            <div style={s.badgeDivider} />
            <div style={s.badge}><span style={s.badgeNum}>{SITE.reviews}+</span><span style={s.badgeLabel}>5-Star Reviews</span></div>
          </motion.div>
        </div>

        {/* ── RIGHT: Image ───────────────────────────────── */}
        <motion.div
          className="hero-img-col"
          style={s.right}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="hero-img-frame" style={s.imgFrame}>
            {imgOk ? (
              <img
                src={HERO_IMAGE}
                alt="JD Brickwork — quality bricklaying"
                style={s.img}
                onError={() => setImgOk(false)}
              />
            ) : (
              /* Shown until a real image is provided */
              <div style={s.placeholder}>
                <ImagePlus size={40} color="rgba(155,106,62,.5)" />
                <p style={s.placeholderTitle}>Your Hero Photo Here</p>
                <p style={s.placeholderHint}>
                  Drop your image into<br />
                  <code style={s.code}>/public/images/hero-bg.jpg</code>
                </p>
              </div>
            )}

            {/* Floating accent card */}
            <motion.div
              style={s.accentCard}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div style={s.accentDot} />
              <div>
                <strong style={{ fontSize: '.85rem', color: 'var(--clr-dark)' }}>Free Quotes</strong>
                <p style={{ fontSize: '.72rem', color: 'var(--clr-muted)', margin: 0 }}>No obligation, ever</p>
              </div>
            </motion.div>
          </div>

          {/* Decorative background shape */}
          <div style={s.bgShape} />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        style={s.scrollDown}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown color="var(--clr-muted)" size={22} />
      </motion.a>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  section: {
    height: '100vh', background: 'var(--clr-cream)',
    display: 'flex', alignItems: 'center',
    position: 'relative', overflow: 'hidden',
  },
  inner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 64,
    alignItems: 'center',
    padding: '0 24px',
    height: '100%',
    paddingTop: 80,
  },
  left: {
    display: 'flex', flexDirection: 'column', gap: 0,
  },
  eyebrow: {
    fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em',
    textTransform: 'uppercase', color: 'var(--clr-brick)', marginBottom: 20,
  },
  title: {
    fontFamily: 'var(--font-head)',
    fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
    fontWeight: 700, lineHeight: 1.15,
    color: 'var(--clr-dark)', marginBottom: 24,
  },
  sub: {
    fontSize: '1rem', color: 'var(--clr-muted)',
    lineHeight: 1.8, maxWidth: 480, marginBottom: 40,
  },
  btns:       { display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center',
    padding: '14px 32px', borderRadius: 'var(--radius)',
    background: 'var(--clr-brick)', color: 'white',
    fontWeight: 600, fontSize: '.9rem',
  },
  btnOutline: {
    display: 'inline-flex', alignItems: 'center',
    padding: '14px 32px', borderRadius: 'var(--radius)',
    border: '2px solid var(--clr-border)', color: 'var(--clr-mid)',
    fontWeight: 600, fontSize: '.9rem',
  },
  badges:      { display: 'flex', alignItems: 'center', gap: 24 },
  badge:       { display: 'flex', flexDirection: 'column', gap: 2 },
  badgeNum:    { fontFamily: 'var(--font-head)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--clr-dark)', lineHeight: 1 },
  badgeLabel:  { fontSize: '.72rem', color: 'var(--clr-muted)', textTransform: 'uppercase', letterSpacing: '.1em' },
  badgeDivider:{ width: 1, height: 40, background: 'var(--clr-border)' },

  /* Right image column */
  right: { position: 'relative', height: '100%', display: 'flex', alignItems: 'center' },
  imgFrame: {
    position: 'relative', borderRadius: 24,
    overflow: 'hidden',
    height: 'calc(100vh - 120px)',
    width: '100%',
    boxShadow: '0 24px 64px rgba(0,0,0,.13)',
    background: 'var(--clr-border)',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' },
  placeholder: {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 16,
    background: 'linear-gradient(145deg, #ede8e2, #ddd5c8)',
  },
  placeholderTitle: { fontFamily: 'var(--font-head)', fontSize: '1.1rem', color: 'var(--clr-mid)', fontWeight: 600, margin: 0 },
  placeholderHint:  { fontSize: '.8rem', color: 'var(--clr-muted)', textAlign: 'center', lineHeight: 1.8, margin: 0 },
  code:             { fontFamily: 'monospace', color: 'var(--clr-brick)', fontSize: '.78rem' },

  /* Floating card */
  accentCard: {
    position: 'absolute', bottom: 28, left: 16,
    background: 'white', borderRadius: 14,
    padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12,
    boxShadow: '0 8px 32px rgba(0,0,0,.12)',
  },
  accentDot: { width: 12, height: 12, borderRadius: '50%', background: '#4caf50', flexShrink: 0 },

  /* Background decorative blob */
  bgShape: {
    position: 'absolute', top: -40, right: -60, zIndex: -1,
    width: '75%', aspectRatio: '1',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(155,106,62,.08) 0%, transparent 70%)',
  },

  scrollDown: {
    position: 'absolute', bottom: 24, left: '50%',
    transform: 'translateX(-50%)', zIndex: 1, display: 'block',
  },
};
