import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { SITE } from '../data/content';

/*
 * PLUG & PLAY — Instagram Feed
 * Replace the placeholder grid below with real Instagram images once
 * the client has an active account. Each item maps to a post.
 * To connect live: use the Instagram Basic Display API (free).
 */
const INSTA_POSTS = [
  { id: 1, img: '/images/gallery/g1.jpg', likes: 47, caption: 'New build coming along nicely 🧱' },
  { id: 2, img: '/images/gallery/g2.jpg', likes: 83, caption: 'Feature wall complete ✅'          },
  { id: 3, img: '/images/gallery/g3.jpg', likes: 61, caption: 'Heritage restoration done right'   },
  { id: 4, img: '/images/gallery/g4.jpg', likes: 94, caption: 'Outdoor BBQ area — client loved it'},
  { id: 5, img: '/images/gallery/g5.jpg', likes: 55, caption: 'Commercial project wrapped up'     },
  { id: 6, img: '/images/gallery/g6.jpg', likes: 72, caption: 'Retaining wall, Toorak'            },
];

const SvgIg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const SvgFb = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export default function SocialSection() {
  const [ref, inView] = useInView();

  return (
    <section style={s.section} id="social">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={s.header}
        >
          <div>
            <p style={s.eyebrow}>Follow Our Work</p>
            <h2 style={s.title}>See Our Latest Projects</h2>
            <p style={s.desc}>Follow JD Brickwork on social media to see our latest projects, tips and behind-the-scenes content.</p>
          </div>

          {/* Social follow buttons */}
          <div style={s.followBtns}>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" style={s.igBtn}>
              <SvgIg />
              Follow on Instagram
            </a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" style={s.fbBtn}>
              <SvgFb />
              Like on Facebook
            </a>
          </div>
        </motion.div>

        {/* Instagram grid */}
        <div style={s.grid}>
          {INSTA_POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={s.post}
              whileHover="hover"
            >
              <img src={post.img} alt={post.caption} style={s.postImg} />
              <motion.div
                style={s.postOverlay}
                variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
                initial="initial"
              >
                <div style={s.postLikes}><HeartIcon />{post.likes}</div>
                <p style={s.postCaption}>{post.caption}</p>
              </motion.div>
              {/* Instagram icon badge */}
              <div style={s.igBadge}><SvgIg /></div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={s.bottomCta}
        >
          <a href={SITE.instagram} target="_blank" rel="noreferrer" style={s.viewMore}>
            View more on Instagram →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  section:     { background: 'var(--clr-dark)', padding: '96px 0' },
  header:      { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 48 },
  eyebrow:     { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-tan)', marginBottom: 12 },
  title:       { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, color: 'white', marginBottom: 12 },
  desc:        { color: 'rgba(255,255,255,.45)', fontSize: '.9rem', maxWidth: 440, lineHeight: 1.7 },
  followBtns:  { display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 },
  igBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '13px 24px', borderRadius: 12, fontWeight: 700, fontSize: '.875rem',
    background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    color: 'white',
  },
  fbBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '13px 24px', borderRadius: 12, fontWeight: 700, fontSize: '.875rem',
    background: '#1877F2', color: 'white',
  },
  grid:        { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 },
  post:        { position: 'relative', aspectRatio: '1', overflow: 'hidden', display: 'block' },
  postImg:     { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s ease' },
  postOverlay: {
    position: 'absolute', inset: 0,
    background: 'rgba(20,18,15,.72)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 10, padding: 16,
  },
  postLikes:   { display: 'flex', alignItems: 'center', gap: 6, color: 'white', fontWeight: 700, fontSize: '.9rem' },
  postCaption: { color: 'rgba(255,255,255,.85)', fontSize: '.72rem', textAlign: 'center', lineHeight: 1.5, margin: 0 },
  igBadge:     { position: 'absolute', top: 10, right: 10, color: 'rgba(255,255,255,.7)', pointerEvents: 'none' },
  bottomCta:   { textAlign: 'center', marginTop: 32 },
  viewMore:    { fontSize: '.875rem', fontWeight: 600, color: 'var(--clr-tan)', letterSpacing: '.04em' },
};
