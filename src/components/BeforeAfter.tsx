import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ArrowLeftRight } from 'lucide-react';

/* PLUG & PLAY: swap these image paths for the client's own before/after photos */
const BEFORE_IMG = '/images/before.jpg';
const AFTER_IMG  = '/images/after.jpg';

export default function BeforeAfter() {
  const [pos, setPos]       = useState(50); // % from left
  const [dragging, setDrag] = useState(false);
  const wrapRef             = useRef<HTMLDivElement>(null);
  const [ref, inView]       = useInView();

  const getPos = useCallback((clientX: number) => {
    if (!wrapRef.current) return;
    const { left, width } = wrapRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPos(pct);
  }, []);

  // Mouse
  const onMouseDown = () => setDrag(true);
  const onMouseMove = (e: React.MouseEvent) => dragging && getPos(e.clientX);
  const onMouseUp   = () => setDrag(false);

  // Touch
  const onTouchMove = (e: React.TouchEvent) => getPos(e.touches[0].clientX);

  return (
    <section className="section section-alt" id="before-after">
      <div className="container">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}
        >
          <p style={s.eyebrow}>Transformations</p>
          <h2 style={s.title}>See the Difference</h2>
          <p style={s.desc}>Drag the slider to reveal the before and after of our work.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={wrapRef}
          style={{ ...s.wrap, cursor: dragging ? 'grabbing' : 'grab' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchMove={onTouchMove}
        >
          {/* AFTER (full width underneath) */}
          <img src={AFTER_IMG} alt="After brickwork" style={s.img} draggable={false} />

          {/* BEFORE (clipped to left side) */}
          <div style={{ ...s.beforeWrap, width: `${pos}%` }}>
            <img src={BEFORE_IMG} alt="Before brickwork" style={{ ...s.img, minWidth: wrapRef.current?.offsetWidth ?? 800 }} draggable={false} />
          </div>

          {/* Labels */}
          <div style={s.labelBefore}>BEFORE</div>
          <div style={s.labelAfter}>AFTER</div>

          {/* Divider line */}
          <div style={{ ...s.divider, left: `${pos}%` }}>
            <div style={s.handle}>
              <ArrowLeftRight size={18} color="var(--clr-brick)" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  eyebrow: { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-brick)', marginBottom: 12 },
  title:   { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 16 },
  desc:    { color: 'var(--clr-muted)', fontSize: '.95rem' },
  wrap: {
    position: 'relative', borderRadius: 20, overflow: 'hidden',
    maxWidth: 900, margin: '0 auto',
    aspectRatio: '16/9', userSelect: 'none',
    boxShadow: '0 24px 64px rgba(0,0,0,.15)',
  },
  img:         { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  beforeWrap:  { position: 'absolute', top: 0, left: 0, height: '100%', overflow: 'hidden' },
  divider:     { position: 'absolute', top: 0, bottom: 0, width: 3, background: 'white', transform: 'translateX(-50%)', zIndex: 10 },
  handle: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 48, height: 48, borderRadius: '50%',
    background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  labelBefore: {
    position: 'absolute', top: 20, left: 20, zIndex: 11,
    background: 'rgba(0,0,0,.55)', color: 'white',
    padding: '6px 14px', borderRadius: 50,
    fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em',
  },
  labelAfter: {
    position: 'absolute', top: 20, right: 20, zIndex: 11,
    background: 'var(--clr-brick)', color: 'white',
    padding: '6px 14px', borderRadius: 50,
    fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em',
  },
};
