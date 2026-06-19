import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import QuoteLink from './QuoteLink';
import { SERVICES } from '../data/content';

const NAV_LINKS = [
  { href: '#about',        label: 'About'    },
  { href: '#gallery',      label: 'Our Work' },
  { href: '#testimonials', label: 'Reviews'  },
  { href: '#blog',         label: 'Blog'     },
  { href: '#contact',      label: 'Contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [open, setOpen]                   = useState(false);
  const [active, setActive]               = useState('home');
  const [servicesOpen, setServicesOpen]   = useState(false);
  const [mobileServOpen, setMobileServOpen] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.25 }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Close drawer when route changes */
  useEffect(() => { setOpen(false); setMobileServOpen(false); }, [location.pathname]);

  const close = () => { setOpen(false); setMobileServOpen(false); };

  const go = (href: string) => {
    close();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href.slice(1) } });
    } else {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── CSS: media-query control (avoids inline-style/CSS specificity war) ── */}
      <style>{`
        .nb-links    { display: flex; }
        .nb-burger   { display: none; }
        .nb-mob-cta  { display: none; }
        .nb-mob-est  { display: none; }

        @media (max-width: 900px) {
          .nb-links   { display: none !important; }
          .nb-burger  { display: flex !important; align-items: center; justify-content: center; }
          .nb-mob-cta { display: flex !important; }
          .nb-mob-est { display: flex !important; align-items: center; }
        }

        /* Shrink logo image on mobile */
        @media (max-width: 900px) {
          .nb-logo-img { height: 28px !important; }
          .nb-logo-text { font-size: .88rem !important; }
        }

        /* Tighten further on very narrow phones */
        @media (max-width: 380px) {
          .nb-mob-est  { padding: 5px 7px !important; font-size: .65rem !important; }
          .nb-mob-cta a, .nb-mob-cta > a { padding: 5px 8px !important; font-size: .65rem !important; }
          .nb-logo-text { display: none !important; }
        }

        /* Landscape short-screen: shrink nav */
        @media (max-height: 500px) and (orientation: landscape) {
          .nb-nav { padding: 6px 0 !important; }
        }
      `}</style>

      <motion.nav
        className="nb-nav"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={s.nav(scrolled)}
      >
        <div className="container" style={s.inner}>

          {/* ── Logo ── */}
          <a href="#home" style={s.logo} onClick={e => { e.preventDefault(); go('#home'); }}>
            <img src="/logo.svg" alt="" className="nb-logo-img" style={s.logoImg} onError={e => (e.currentTarget.style.display = 'none')} />
            <span className="nb-logo-text" style={s.logoText}>JD <span style={{ color: 'var(--clr-tan)' }}>Brickwork</span></span>
          </a>

          {/* ── Desktop nav links ── */}
          <ul className="nb-links" style={s.links}>
            <li>
              <button onClick={() => go('#home')} style={s.link(active === 'home')}>Home</button>
            </li>

            {/* Services dropdown */}
            <li
              style={{ position: 'relative' }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                style={{ ...s.link(active === 'services'), display: 'inline-flex', alignItems: 'center', gap: 4 }}
                onClick={() => go('#services')}
              >
                Services
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                  <ChevronDown size={14} />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    style={s.dropdown}
                  >
                    <div style={s.ddHeader}>Our Services</div>
                    {SERVICES.map(svc => (
                      <Link
                        key={svc.id}
                        to={`/services/${svc.id}`}
                        style={s.ddItem}
                        onClick={() => setServicesOpen(false)}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--clr-cream)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={s.ddLabel}>{svc.title}</span>
                        <span style={s.ddPrice}>{svc.from}</span>
                      </Link>
                    ))}
                    <div style={s.ddFooter}>
                      <button onClick={() => { go('#services'); setServicesOpen(false); }} style={s.ddAll}>
                        View all services →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <button onClick={() => go(l.href)} style={s.link(active === l.href.slice(1))}>
                  {l.label}
                </button>
              </li>
            ))}

            <li>
              <button onClick={() => go('#quote-calculator')} style={s.estimateBtn}>
                Free Estimate
              </button>
            </li>
            <li>
              <QuoteLink style={s.cta}>Get a Quote</QuoteLink>
            </li>
          </ul>

          {/* ── Mobile: always-visible CTA + burger ── */}
          <div className="nb-mob-cta nb-mob-right" style={s.mobRight}>
            <button className="nb-mob-est" onClick={() => go('#quote-calculator')} style={s.mobEst}>
              Free Estimate
            </button>
            <QuoteLink style={s.mobCta}>Get a Quote</QuoteLink>
            <button
              className="nb-burger"
              aria-label="Toggle menu"
              onClick={() => setOpen(o => !o)}
              style={s.burger}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* ── Mobile drawer overlay ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={s.overlay}
              onClick={close}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.26 }}
              style={s.drawer}
            >
              {/* Drawer header */}
              <div style={s.drawerHead}>
                <span style={s.drawerBrand}>JD <span style={{ color: 'var(--clr-brick)' }}>Brickwork</span></span>
                <button onClick={close} style={s.closeBtn} aria-label="Close menu">
                  <X size={20} color="var(--clr-dark)" />
                </button>
              </div>

              <ul style={s.drawerList}>
                <li style={s.drawerRow}>
                  <button onClick={() => go('#home')} style={s.drawerLink}>Home</button>
                </li>

                {/* Services accordion */}
                <li style={s.drawerRow}>
                  <button
                    onClick={() => setMobileServOpen(o => !o)}
                    style={{ ...s.drawerLink, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                  >
                    Services
                    <motion.span animate={{ rotate: mobileServOpen ? 180 : 0 }}>
                      <ChevronDown size={16} color="var(--clr-mid)" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileServOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        {SERVICES.map(svc => (
                          <Link key={svc.id} to={`/services/${svc.id}`} onClick={close} style={s.subLink}>
                            {svc.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {NAV_LINKS.map(l => (
                  <li key={l.href} style={s.drawerRow}>
                    <button onClick={() => go(l.href)} style={s.drawerLink}>{l.label}</button>
                  </li>
                ))}

                <li style={s.drawerRow}>
                  <button onClick={() => go('#quote-calculator')} style={s.drawerLink}>
                    Free Estimate Calculator
                  </button>
                </li>
              </ul>

              <div style={s.drawerBottom}>
                <QuoteLink style={s.drawerCta}>Get a Free Quote</QuoteLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const s: Record<string, any> = {
  nav: (scrolled: boolean): React.CSSProperties => ({
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    padding: scrolled ? '10px 0' : '14px 0',
    background: 'var(--clr-white)',
    boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,.1)' : '0 1px 0 var(--clr-border)',
    transition: 'padding .3s, box-shadow .3s',
  }),
  inner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 16, minWidth: 0,
  } as React.CSSProperties,

  /* Logo */
  logo:    { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, minWidth: 0 } as React.CSSProperties,
  logoImg: { height: 36, width: 'auto', flexShrink: 0 } as React.CSSProperties,
  logoText:{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1rem, 3vw, 1.4rem)', fontWeight: 700, color: 'var(--clr-dark)', whiteSpace: 'nowrap' } as React.CSSProperties,

  /* Desktop links */
  links:  { display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none', flexShrink: 0 } as React.CSSProperties,
  link: (active: boolean): React.CSSProperties => ({
    fontSize: '.82rem', fontWeight: 500, cursor: 'pointer', background: 'none', border: 'none',
    color: active ? 'var(--clr-brick)' : 'var(--clr-mid)',
    padding: '6px 8px', borderRadius: 6, transition: 'color .2s', fontFamily: 'var(--font-body)',
  }),
  estimateBtn: {
    fontSize: '.82rem', fontWeight: 600, cursor: 'pointer',
    border: '1.5px solid var(--clr-brick)', color: 'var(--clr-brick)',
    padding: '7px 14px', borderRadius: 'var(--radius)',
    background: 'transparent', fontFamily: 'var(--font-body)', marginLeft: 4,
  } as React.CSSProperties,
  cta: {
    background: 'var(--clr-brick)', color: 'white',
    padding: '9px 18px', borderRadius: 'var(--radius)',
    fontSize: '.82rem', fontWeight: 600, marginLeft: 6,
  } as React.CSSProperties,

  /* Dropdown */
  dropdown: {
    position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)',
    background: 'white', borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,.14)',
    border: '1px solid var(--clr-border)', minWidth: 260, overflow: 'hidden', zIndex: 10,
  } as React.CSSProperties,
  ddHeader: { fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--clr-muted)', padding: '14px 16px 8px' } as React.CSSProperties,
  ddItem:   { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', transition: 'background .15s' } as React.CSSProperties,
  ddLabel:  { fontSize: '.875rem', fontWeight: 500, color: 'var(--clr-dark)' } as React.CSSProperties,
  ddPrice:  { fontSize: '.75rem', color: 'var(--clr-brick)', fontWeight: 600 } as React.CSSProperties,
  ddFooter: { borderTop: '1px solid var(--clr-border)', padding: '12px 16px' } as React.CSSProperties,
  ddAll:    { fontSize: '.8rem', fontWeight: 600, color: 'var(--clr-brick)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' } as React.CSSProperties,

  /* Mobile right cluster */
  mobRight: { display: 'none', alignItems: 'center', gap: 5, flexShrink: 0 } as React.CSSProperties,
  mobEst: {
    background: 'none', border: '1.5px solid var(--clr-brick)', color: 'var(--clr-brick)',
    padding: '6px 9px', borderRadius: 'var(--radius)',
    fontSize: '.72rem', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer',
  } as React.CSSProperties,
  mobCta: {
    background: 'var(--clr-brick)', color: 'white',
    padding: '6px 10px', borderRadius: 'var(--radius)',
    fontSize: '.72rem', fontWeight: 700, whiteSpace: 'nowrap',
  } as React.CSSProperties,
  burger: {
    padding: 8, background: 'none', border: 'none', cursor: 'pointer',
    color: 'var(--clr-dark)', borderRadius: 8,
  } as React.CSSProperties,

  /* Overlay */
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1100,
  } as React.CSSProperties,

  /* Drawer */
  drawer: {
    position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(320px, 85vw)',
    background: 'white', zIndex: 1200,
    display: 'flex', flexDirection: 'column', overflowY: 'auto',
  } as React.CSSProperties,
  drawerHead: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 24px', borderBottom: '1px solid var(--clr-border)',
  } as React.CSSProperties,
  drawerBrand: { fontFamily: 'var(--font-head)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--clr-dark)' } as React.CSSProperties,
  closeBtn: { padding: 6, background: 'var(--clr-cream)', border: 'none', cursor: 'pointer', borderRadius: 8 } as React.CSSProperties,
  drawerList: { flex: 1, padding: '8px 0', listStyle: 'none' } as React.CSSProperties,
  drawerRow:  { borderBottom: '1px solid var(--clr-border)' } as React.CSSProperties,
  drawerLink: {
    display: 'block', padding: '15px 24px', fontSize: '.95rem', fontWeight: 500,
    color: 'var(--clr-dark)', background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-body)', width: '100%', textAlign: 'left' as const,
  } as React.CSSProperties,
  subLink: {
    display: 'block', padding: '10px 24px 10px 36px', fontSize: '.85rem',
    color: 'var(--clr-brick)', fontWeight: 500, borderLeft: '3px solid var(--clr-brick)',
    marginLeft: 24,
  } as React.CSSProperties,
  drawerBottom: { padding: '20px 24px', borderTop: '1px solid var(--clr-border)' } as React.CSSProperties,
  drawerCta: {
    display: 'block', textAlign: 'center' as const,
    background: 'var(--clr-brick)', color: 'white',
    padding: '14px 24px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '.9rem',
  } as React.CSSProperties,
};
