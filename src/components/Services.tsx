import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, RotateCcw, Layers, Shield, Flame, HardHat, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SERVICES } from '../data/content';

const ICON_MAP: Record<string, React.ReactNode> = {
  Building2:  <Building2 size={22} />,
  RotateCcw:  <RotateCcw size={22} />,
  Layers:     <Layers size={22} />,
  Shield:     <Shield size={22} />,
  Flame:      <Flame size={22} />,
  HardHat:    <HardHat size={22} />,
};

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [ref, inView] = useInView();
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,.12)' }}
      style={s.card}
    >
      <motion.div
        style={s.icon}
        whileHover={{ background: 'var(--clr-brick)', color: 'white' }}
        transition={{ duration: 0.2 }}
      >
        <span style={{ color: 'var(--clr-brick)' }}>{ICON_MAP[service.icon]}</span>
      </motion.div>
      <h3 style={s.cardTitle}>{service.title}</h3>
      <p style={s.cardDesc}>{service.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
        <span style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--clr-brick)' }}>{(service as any).from}</span>
        <Link to={`/services/${service.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '.78rem', fontWeight: 600, color: 'var(--clr-muted)' }}>
          Learn more <ArrowRight size={12} />
        </Link>
      </div>
      {/* Animated bottom bar */}
      <motion.div
        style={s.bar}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Services() {
  const [ref, inView] = useInView();
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}
        >
          <p style={s.eyebrow}>What We Do</p>
          <h2 style={s.sectionTitle}>Our Services</h2>
          <p style={s.sectionDesc}>From foundations to feature walls, we handle every aspect of brickwork with skill and care.</p>
        </motion.div>

        <div className="services-grid" style={s.grid}>
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} service={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const s = {
  eyebrow:     { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--clr-brick)', marginBottom: 12 },
  sectionTitle:{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 16 },
  sectionDesc: { color: 'var(--clr-muted)', fontSize: '.95rem' },
  grid:        { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 },
  card: {
    background: 'white', padding: '40px 32px', borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--clr-border)', position: 'relative' as const,
    overflow: 'hidden', cursor: 'default',
  },
  icon: {
    width: 56, height: 56, background: 'rgba(155,106,62,.1)',
    borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', marginBottom: 24, transition: 'all .2s',
  },
  cardTitle:   { fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 12 },
  cardDesc:    { fontSize: '.875rem', color: 'var(--clr-muted)', lineHeight: 1.7 },
  bar:         { position: 'absolute' as const, bottom: 0, left: 0, right: 0, height: 3, background: 'var(--clr-brick)', transformOrigin: 'left' as const },
};
