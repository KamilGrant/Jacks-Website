import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { PROCESS_STEPS } from '../data/content';

export default function Process() {
  const [ref, inView] = useInView();
  return (
    <section id="process" className="section section-alt">
      <div className="container">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}
        >
          <p style={s.eyebrow}>How It Works</p>
          <h2 style={s.sectionTitle}>Simple, Straightforward Process</h2>
        </motion.div>

        <div style={s.steps}>
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={s.step}
            >
              <motion.div
                style={s.num}
                whileHover={{ scale: 1.1, color: 'var(--clr-brick)' }}
              >
                {step.num}
              </motion.div>
              <div style={s.icon}>
                <div style={s.iconDot} />
              </div>
              <div style={s.content}>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
              {i < PROCESS_STEPS.length - 1 && (
                <motion.div
                  style={s.connector}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.2 + 0.4 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const s = {
  eyebrow:    { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--clr-brick)', marginBottom: 12 },
  sectionTitle:{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, color: 'var(--clr-dark)' },
  steps:      { display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 0, flexWrap: 'wrap' as const },
  step:       { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const, flex: '1', minWidth: 180, padding: '0 12px', position: 'relative' as const },
  num:        { fontFamily: 'var(--font-head)', fontSize: '4rem', fontWeight: 700, color: 'rgba(155,106,62,.15)', lineHeight: 1, marginBottom: 12, cursor: 'default' },
  icon:       { width: 16, height: 16, borderRadius: '50%', border: '3px solid var(--clr-brick)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  iconDot:    { width: 6, height: 6, borderRadius: '50%', background: 'var(--clr-brick)' },
  content:    {},
  stepTitle:  { fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 8 },
  stepDesc:   { fontSize: '.875rem', color: 'var(--clr-muted)', maxWidth: 200, margin: '0 auto' },
  connector:  { position: 'absolute' as const, top: 80, right: -20, width: 40, height: 2, background: 'var(--clr-border)', transformOrigin: 'left' as const },
};
