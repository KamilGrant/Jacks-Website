import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SITE } from '../data/content';

const NAV_LINKS = [
  { href: '#home',         label: 'Home'       },
  { href: '#about',        label: 'About'       },
  { href: '#services',     label: 'Services'    },
  { href: '#gallery',      label: 'Our Work'    },
  { href: '#testimonials', label: 'Reviews'     },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={styles.nav(scrolled)}
    >
      <div className="container" style={styles.inner}>
        {/* Logo */}
        <a href="#home" style={styles.logo(scrolled)} onClick={close}>
          {/* PLUG & PLAY: replace /logo.svg with actual logo */}
          <img src="/logo.svg" alt="JD Brickwork" style={styles.logoImg} onError={e => (e.currentTarget.style.display = 'none')} />
          <span style={styles.logoText(scrolled)}>
            JD <span style={{ color: 'var(--clr-tan)' }}>Brickwork</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul style={styles.links}>
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                style={styles.link(scrolled, active === l.href.slice(1))}
                onClick={close}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" style={styles.cta} onClick={close}>Get a Quote</a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
          style={styles.hamburger}
        >
          {open ? <X size={22} color={scrolled ? 'var(--clr-dark)' : '#fff'} /> : <Menu size={22} color={scrolled ? 'var(--clr-dark)' : '#fff'} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            style={styles.drawer}
          >
            <ul style={{ paddingTop: 80 }}>
              {NAV_LINKS.map(l => (
                <li key={l.href} style={{ borderBottom: '1px solid var(--clr-border)' }}>
                  <a href={l.href} onClick={close} style={styles.drawerLink}>{l.label}</a>
                </li>
              ))}
              <li style={{ paddingTop: 16 }}>
                <a href="#contact" onClick={close} style={styles.drawerCta}>Get a Free Quote</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const styles = {
  nav: (scrolled: boolean): React.CSSProperties => ({
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    padding: scrolled ? '12px 0' : '20px 0',
    background: scrolled ? 'var(--clr-white)' : 'transparent',
    boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,.08)' : 'none',
    transition: 'all 0.35s ease',
  }),
  inner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } as React.CSSProperties,
  logo: (_scrolled: boolean): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap: 10 }),
  logoImg: { height: 40, width: 'auto' } as React.CSSProperties,
  logoText: (scrolled: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-head)', fontSize: '1.4rem', fontWeight: 700,
    color: scrolled ? 'var(--clr-dark)' : 'white',
    transition: 'color 0.3s',
  }),
  links: { display: 'flex', alignItems: 'center', gap: 28, listStyle: 'none' } as React.CSSProperties,
  link: (scrolled: boolean, active: boolean): React.CSSProperties => ({
    fontSize: '.875rem', fontWeight: 500,
    color: scrolled ? (active ? 'var(--clr-brick)' : 'var(--clr-mid)') : (active ? 'var(--clr-tan)' : 'rgba(255,255,255,.85)'),
    transition: 'color 0.25s',
    position: 'relative',
  }),
  cta: {
    background: 'var(--clr-brick)', color: 'white', padding: '10px 22px',
    borderRadius: 'var(--radius)', fontSize: '.875rem', fontWeight: 600,
    transition: 'background 0.25s',
  } as React.CSSProperties,
  hamburger: { display: 'none', padding: 4, background: 'none', border: 'none', cursor: 'pointer', zIndex: 1001 } as React.CSSProperties,
  drawer: {
    position: 'fixed', top: 0, right: 0, bottom: 0, width: 280,
    background: 'white', boxShadow: '-8px 0 32px rgba(0,0,0,.12)', zIndex: 1000, padding: '0 32px',
  } as React.CSSProperties,
  drawerLink: { display: 'block', padding: '16px 0', fontSize: '1rem', fontWeight: 500, color: 'var(--clr-dark)' } as React.CSSProperties,
  drawerCta: {
    display: 'block', textAlign: 'center' as const, background: 'var(--clr-brick)',
    color: 'white', padding: '14px 24px', borderRadius: 'var(--radius)', fontWeight: 600,
  } as React.CSSProperties,
};
