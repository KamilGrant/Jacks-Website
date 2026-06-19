import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useInView } from '../hooks/useInView';
import { SITE } from '../data/content';

const STATS = [
  { value: SITE.yearsExp, suffix: '+', label: 'Years Experience' },
  { value: SITE.projects, suffix: '+', label: 'Projects Completed' },
  { value: 100,           suffix: '%', label: 'Satisfaction Rate'  },
  { value: SITE.reviews,  suffix: '+', label: '5-Star Reviews'     },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inViewRef, inView] = useInView(0.5);

  useEffect(() => {
    if (!inView || !ref.current) return;
    gsap.fromTo(
      ref.current,
      { textContent: '0' },
      {
        textContent: value,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        onUpdate() {
          if (ref.current) ref.current.textContent = Math.ceil(parseFloat(ref.current.textContent || '0')).toString();
        },
      }
    );
  }, [inView, value]);

  return (
    <div ref={inViewRef as React.Ref<HTMLDivElement>}>
      <span ref={ref} style={s.num}>0</span>
      <span style={s.suffix}>{suffix}</span>
    </div>
  );
}

export default function Stats() {
  const [ref, inView] = useInView();
  return (
    <section style={s.bar}>
      <div className="container" style={s.grid}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            ref={i === 0 ? ref as React.Ref<HTMLDivElement> : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={s.item}
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <p style={s.label}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const s = {
  bar:    { background: 'var(--clr-dark)', padding: '56px 0' },
  grid:   { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, textAlign: 'center' as const },
  item:   { padding: 16 },
  num:    { fontFamily: 'var(--font-head)', fontSize: '2.8rem', fontWeight: 700, color: 'var(--clr-tan)' },
  suffix: { fontFamily: 'var(--font-head)', fontSize: '2rem',   fontWeight: 700, color: 'var(--clr-tan)' },
  label:  { color: 'rgba(255,255,255,.55)', fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase' as const, marginTop: 6 },
};
