import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function CtaBanner() {
  const [ref, inView] = useInView();
  return (
    <section style={s.wrap}>
      <div style={s.overlay} />
      {/* PLUG & PLAY: replace /images/cta-bg.jpg */}
      <div style={s.bg} />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 style={s.title}>Ready to Start Your Project?</h2>
          <p style={s.sub}>Get a free, no-obligation quote from JD Brickwork today.</p>
          <motion.a
            href="#contact"
            style={s.btn}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,0,0,.2)' }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Us Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

const s = {
  wrap:    { position: 'relative' as const, padding: '96px 0', overflow: 'hidden' },
  bg:      { position: 'absolute' as const, inset: 0, backgroundImage: 'url(/images/cta-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'var(--clr-dark)' },
  overlay: { position: 'absolute' as const, inset: 0, background: 'rgba(20,18,15,.78)' },
  title:   { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'white', marginBottom: 12 },
  sub:     { color: 'rgba(255,255,255,.72)', marginBottom: 36, fontSize: '1rem' },
  btn:     { display: 'inline-flex', padding: '16px 40px', background: 'white', color: 'var(--clr-dark)', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '.95rem' },
};
