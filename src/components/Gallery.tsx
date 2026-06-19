import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ZoomIn } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { GALLERY_ITEMS, GALLERY_FILTERS } from '../data/content';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const [ref, inView] = useInView();

  const filtered = useMemo(
    () => filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === filter),
    [filter]
  );

  const slides = filtered.map(i => ({ src: i.src, title: i.title, alt: i.alt }));

  return (
    <section id="gallery" className="section">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}
        >
          <p style={s.eyebrow}>Portfolio</p>
          <h2 style={s.sectionTitle}>Our Work</h2>
          <p style={s.sectionDesc}>Every project tells a story. Here's a look at some of what we've built.</p>
        </motion.div>

        {/* Filter pills */}
        <div style={s.filters}>
          {GALLERY_FILTERS.map(f => (
            <motion.button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={s.pill(filter === f.key)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="gallery-grid" style={s.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                style={s.item(i === 0 && filter === 'all')}
                onClick={() => setLightboxIdx(i)}
                whileHover="hover"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  style={s.img}
                  loading="lazy"
                />
                <motion.div
                  style={s.overlay}
                  variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
                  initial="initial"
                >
                  <ZoomIn color="white" size={28} />
                  <span style={s.overlayLabel}>{item.title}</span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        open={lightboxIdx >= 0}
        index={lightboxIdx}
        close={() => setLightboxIdx(-1)}
        slides={slides}
        on={{ view: ({ index }) => setLightboxIdx(index) }}
      />
    </section>
  );
}

const s = {
  eyebrow:     { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--clr-brick)', marginBottom: 12 },
  sectionTitle:{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 16 },
  sectionDesc: { color: 'var(--clr-muted)', fontSize: '.95rem' },
  filters:     { display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' as const, marginBottom: 40 },
  pill: (active: boolean): React.CSSProperties => ({
    padding: '9px 22px', borderRadius: 50, fontSize: '.825rem', fontWeight: 600,
    border: '2px solid', cursor: 'pointer',
    borderColor: active ? 'var(--clr-brick)' : 'var(--clr-border)',
    background: active ? 'var(--clr-brick)' : 'transparent',
    color: active ? 'white' : 'var(--clr-muted)',
    transition: 'all .25s',
  }),
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 } as React.CSSProperties,
  item: (isFirst: boolean): React.CSSProperties => ({
    gridColumn: isFirst ? 'span 2' : undefined,
    gridRow: isFirst ? 'span 2' : undefined,
    borderRadius: 'var(--radius-lg)', overflow: 'hidden',
    cursor: 'pointer', position: 'relative', aspectRatio: isFirst ? 'auto' : '1',
    background: 'var(--clr-border)',
  }),
  img:         { width: '100%', height: '100%', objectFit: 'cover' as const, display: 'block', transition: 'transform .5s ease' },
  overlay:     {
    position: 'absolute' as const, inset: 0,
    background: 'rgba(30,22,15,.6)',
    display: 'flex', flexDirection: 'column' as const,
    alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  overlayLabel:{ color: 'white', fontSize: '.78rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' as const },
};
