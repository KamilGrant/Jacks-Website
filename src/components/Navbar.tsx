import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import QuoteLink from './QuoteLink';
import { SERVICES } from '../data/content';

const NAV_LINKS = [
  { href: '#home',         label: 'Home'     },
  { href: '#about',        label: 'About'    },
  { href: '#gallery',      label: 'Our Work' },
  { href: '#testimonials', label: 'Reviews'  },
  { href: '#blog',         label: 'Blog'     },
  { href: '#contact',      label: 'Contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [open, setOpen]               = useState(false);
  const [active, setActive]           = useState('home');
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.3 }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  const close = () => { setOpen(false); setMobileServicesOpen(false); };

  const handleHash = (href: string) => {
    close();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href.slice(1) } });
    } else {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={s.nav(scrolled)}
    >
      <div className="container" style={s.inner}>
        {/* Logo */}
        <a href="#home" style={s.logo} onClick={() => handleHash('#home')}>
          <img src="/logo.svg" alt="JD Brickwork" style={s.logoImg} onError={e => (e.currentTarget.style.display = 'none')} />
          <span style={s.logoText}>JD <span style={{ color: 'var(--clr-tan)' }}>Brickwork</span></span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links" style={s.links}>
          <li key="home">
            <button onClick={() => handleHash('#home')} style={s.link(active === 'home')}>
              Home
            </button>
          </li>

          {/* Services dropdown */}
          <li
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              style={{ ...s.link(active === 'services'), display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={() => handleHash('#services')}
            >
              Services
              <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={14} />
              </motion.span>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  style={s.dropdown}
                >
                  <div style={s.dropdownHeader}>Our Services</div>
                  {SERVICES.map(svc => (
                    <Link
                      key={svc.id}
                      to={`/services/${svc.id}`}
                      style={s.dropdownItem}
                      onClick={() => setServicesOpen(false)}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--clr-cream)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={s.dropdownLabel}>{svc.title}</span>
                      <span style={s.dropdownPrice}>{svc.from}</span>
                    </Link>
                  ))}
                  <div style={s.dropdownFooter}>
                    <button onClick={() => { handleHash('#services'); setServicesOpen(false); }} style={s.dropdownAllLink}>
                      View all services →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Remaining links */}
          {NAV_LINKS.filter(l => l.href !== '#home').map(l => (
            <li key={l.href}>
              <button
                onClick={() => handleHash(l.href)}
                style={s.link(active === l.href.slice(1))}
              >
                {l.label}
              </button>
            </li>
          ))}

          <li>
            <QuoteLink style={s.cta}>Get a Quote</QuoteLink>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
          className="nav-hamburger"
          style={s.hamburger}
        >
          {open ? <X size={22} color="var(--clr-dark)" /> : <Menu size={22} color="var(--clr-dark)" />}
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-links    { display: none !important; }
          .nav-hamburger{ display: flex !important; }
        }
      `}</style>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            style={s.drawer}
          >
            <ul style={{ paddingTop: 80 }}>
              <li style={s.drawerRow}>
                <button onClick={() => handleHash('#home')} style={s.drawerLink}>Home</button>
              </li>

              {/* Mobile services accordion */}
              <li style={s.drawerRow}>
                <button
                  onClick={() => setMobileServicesOpen(o => !o)}
                  style={{ ...s.drawerLink, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                >
                  Services
                  <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      {SERVICES.map(svc => (
                        <Link
                          key={svc.id}
                          to={`/services/${svc.id}`}
                          onClick={close}
                          style={s.drawerSubLink}
                        >
                          {svc.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {NAV_LINKS.filter(l => l.href !== '#home').map(l => (
                <li key={l.href} style={s.drawerRow}>
                  <button onClick={() => handleHash(l.href)} style={s.drawerLink}>{l.label}</button>
                </li>
              ))}

              <li style={{ paddingTop: 16 }}>
                <QuoteLink style={s.drawerCta}>Get a Free Quote</QuoteLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const s: Record<string, any> = {
  nav: (scrolled: boolean): React.CSSProperties => ({
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    padding: scrolled ? '10px 0' : '14px 0',
    background: 'var(--clr-white)',
    boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,.08)' : '0 1px 0 var(--clr-border)',
    transition: 'all 0.35s ease',
  }),
  inner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } as React.CSSProperties,
  logo:    { display: 'flex', alignItems: 'center', gap: 10 } as React.CSSProperties,
  logoImg: { height: 40, width: 'auto' } as React.CSSProperties,
  logoText:{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--clr-dark)' } as React.CSSProperties,
  links:   { display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none' } as React.CSSProperties,
  link: (active: boolean): React.CSSProperties => ({
    fontSize: '.875rem', fontWeight: 500, cursor: 'pointer', background: 'none', border: 'none',
    color: active ? 'var(--clr-brick)' : 'var(--clr-mid)',
    padding: '6px 10px', borderRadius: 6,
    transition: 'color 0.2s',
    fontFamily: 'var(--font-body)',
  }),
  cta: {
    background: 'var(--clr-brick)', color: 'white', padding: '10px 22px',
    borderRadius: 'var(--radius)', fontSize: '.875rem', fontWeight: 600,
    marginLeft: 8,
  } as React.CSSProperties,
  // Dropdown
  dropdown: {
    position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)',
    background: 'white', borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,.14)',
    border: '1px solid var(--clr-border)', minWidth: 260, overflow: 'hidden', zIndex: 10,
  } as React.CSSProperties,
  dropdownHeader: {
    fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em',
    color: 'var(--clr-muted)', padding: '14px 16px 8px',
  } as React.CSSProperties,
  dropdownItem: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '11px 16px', transition: 'background .15s',
  } as React.CSSProperties,
  dropdownLabel: { fontSize: '.875rem', fontWeight: 500, color: 'var(--clr-dark)' } as React.CSSProperties,
  dropdownPrice: { fontSize: '.75rem', color: 'var(--clr-brick)', fontWeight: 600 } as React.CSSProperties,
  dropdownFooter:{ borderTop: '1px solid var(--clr-border)', padding: '12px 16px' } as React.CSSProperties,
  dropdownAllLink:{ fontSize: '.8rem', fontWeight: 600, color: 'var(--clr-brick)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' } as React.CSSProperties,
  // Hamburger
  hamburger: { display: 'none', padding: 4, background: 'none', border: 'none', cursor: 'pointer', zIndex: 1001 } as React.CSSProperties,
  // Mobile drawer
  drawer: {
    position: 'fixed', top: 0, right: 0, bottom: 0, width: 300,
    background: 'white', boxShadow: '-8px 0 32px rgba(0,0,0,.12)', zIndex: 1000, padding: '0 28px', overflowY: 'auto',
  } as React.CSSProperties,
  drawerRow: { borderBottom: '1px solid var(--clr-border)' } as React.CSSProperties,
  drawerLink: {
    display: 'block', padding: '16px 0', fontSize: '1rem', fontWeight: 500,
    color: 'var(--clr-dark)', background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-body)', width: '100%', textAlign: 'left' as const,
  } as React.CSSProperties,
  drawerSubLink: {
    display: 'block', padding: '10px 16px', fontSize: '.875rem', color: 'var(--clr-mid)',
    fontWeight: 500, borderLeft: '2px solid var(--clr-brick)', marginLeft: 8, marginBottom: 2,
  } as React.CSSProperties,
  drawerCta: {
    display: 'block', textAlign: 'center' as const, background: 'var(--clr-brick)',
    color: 'white', padding: '14px 24px', borderRadius: 'var(--radius)', fontWeight: 600,
  } as React.CSSProperties,
};
