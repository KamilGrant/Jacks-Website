import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import { SITE } from '../data/content';

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay } }),
};

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.08) translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP floating particle effect on the overlay
  useEffect(() => {
    gsap.to('.hero-particle', {
      y: -20, opacity: 0.6, duration: 2.5,
      ease: 'sine.inOut', stagger: 0.4, repeat: -1, yoyo: true,
    });
  }, []);

  return (
    <section id="home" style={s.section}>
      {/* BG image — PLUG & PLAY: replace /images/hero-bg.jpg */}
      <div ref={bgRef} style={s.bg} />
      <div style={s.overlay} />

      {/* Decorative particles */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="hero-particle" style={s.particle(i)} />
      ))}

      <div className="container" style={s.content}>
        <motion.p
          variants={variants} initial="hidden" animate="visible" custom={0.2}
          style={s.eyebrow}
        >
          Est. in Excellence · {SITE.established}
        </motion.p>

        <motion.h1
          variants={variants} initial="hidden" animate="visible" custom={0.45}
          style={s.title}
        >
          Built to Last.<br />
          <span style={{ color: 'var(--clr-tan)' }}>Crafted with Pride.</span>
        </motion.h1>

        <motion.p
          variants={variants} initial="hidden" animate="visible" custom={0.65}
          style={s.sub}
        >
          {SITE.sub}
        </motion.p>

        <motion.div
          variants={variants} initial="hidden" animate="visible" custom={0.85}
          style={s.btns}
        >
          <a href="#gallery" style={s.btnPrimary}>View Our Work</a>
          <a href="#contact" style={s.btnOutline}>Get a Free Quote</a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        style={s.scrollDown}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown color="white" size={24} />
      </motion.a>
    </section>
  );
}

const s = {
  section: {
    position: 'relative' as const, minHeight: '100vh',
    display: 'flex', alignItems: 'center', overflow: 'hidden',
  },
  bg: {
    position: 'absolute' as const, inset: 0,
    backgroundImage: 'url(/images/hero-bg.jpg)',
    backgroundSize: 'cover', backgroundPosition: 'center',
    backgroundColor: 'var(--clr-dark)',
    transform: 'scale(1.08)',
    willChange: 'transform',
  },
  overlay: {
    position: 'absolute' as const, inset: 0,
    background: 'linear-gradient(135deg, rgba(20,18,15,.82) 0%, rgba(35,28,20,.58) 60%, rgba(20,18,15,.42) 100%)',
  },
  particle: (i: number): React.CSSProperties => ({
    position: 'absolute',
    width: 4 + i * 2, height: 4 + i * 2,
    borderRadius: '50%',
    background: 'var(--clr-tan)',
    opacity: 0.25,
    top: `${15 + i * 15}%`,
    left: `${70 + i * 5}%`,
  }),
  content: {
    position: 'relative' as const, zIndex: 1,
    maxWidth: 720, padding: '120px 24px 80px',
  },
  eyebrow: {
    fontSize: '.78rem', fontWeight: 600, letterSpacing: '.2em',
    textTransform: 'uppercase' as const, color: 'var(--clr-tan)', marginBottom: 20,
  },
  title: {
    fontFamily: 'var(--font-head)',
    fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
    fontWeight: 700, lineHeight: 1.1,
    color: 'white', marginBottom: 24,
  },
  sub: {
    fontSize: 'clamp(.9rem, 1.5vw, 1.05rem)',
    color: 'rgba(255,255,255,.78)', maxWidth: 580,
    marginBottom: 40, lineHeight: 1.8,
  },
  btns: { display: 'flex', gap: 16, flexWrap: 'wrap' as const },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 32px', borderRadius: 'var(--radius)',
    background: 'var(--clr-brick)', color: 'white',
    fontWeight: 600, fontSize: '.9rem', transition: 'all .25s',
  },
  btnOutline: {
    display: 'inline-flex', alignItems: 'center',
    padding: '14px 32px', borderRadius: 'var(--radius)',
    border: '2px solid rgba(255,255,255,.55)', color: 'white',
    fontWeight: 600, fontSize: '.9rem', transition: 'all .25s',
  },
  scrollDown: {
    position: 'absolute' as const, bottom: 32, left: '50%',
    transform: 'translateX(-50%)', zIndex: 1, display: 'block',
  },
};
