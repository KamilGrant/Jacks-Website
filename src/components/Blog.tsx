import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { BLOG_POSTS } from '../data/blog';

export default function Blog() {
  const [ref, inView] = useInView();
  return (
    <section id="blog" className="section section-alt">
      <div className="container">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}
        >
          <div>
            <p style={s.eyebrow}>Knowledge Base</p>
            <h2 style={s.title}>Expert Advice & Guides</h2>
          </div>
          <Link to="/blog" style={s.viewAll}>
            View all articles <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div style={s.grid}>
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} style={s.card}>
                <div style={s.imgWrap}>
                  <img src={post.image} alt={post.title} style={s.img} />
                  <div style={s.catBadge}><Tag size={10} />{post.category}</div>
                </div>
                <div style={s.body}>
                  <div style={s.meta}>
                    <span style={s.date}>{post.date}</span>
                    <span style={s.dot2}>·</span>
                    <Clock size={12} color="var(--clr-muted)" />
                    <span style={s.date}>{post.readTime}</span>
                  </div>
                  <h3 style={s.cardTitle}>{post.title}</h3>
                  <p style={s.excerpt}>{post.excerpt}</p>
                  <span style={s.readMore}>Read article <ArrowRight size={14} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  eyebrow:   { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-brick)', marginBottom: 12 },
  title:     { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, color: 'var(--clr-dark)', margin: 0 },
  viewAll:   { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: 'var(--clr-brick)' },
  grid:      { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 },
  card:      { display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--clr-border)', transition: 'box-shadow .25s, transform .25s' },
  imgWrap:   { position: 'relative', aspectRatio: '16/9', overflow: 'hidden' },
  img:       { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' },
  catBadge:  { position: 'absolute', top: 14, left: 14, background: 'var(--clr-brick)', color: 'white', padding: '5px 12px', borderRadius: 50, fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', display: 'flex', alignItems: 'center', gap: 5 },
  body:      { padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 },
  meta:      { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 },
  date:      { fontSize: '.72rem', color: 'var(--clr-muted)' },
  dot2:      { color: 'var(--clr-muted)', fontSize: '.72rem' },
  cardTitle: { fontFamily: 'var(--font-head)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 10, lineHeight: 1.35 },
  excerpt:   { fontSize: '.85rem', color: 'var(--clr-muted)', lineHeight: 1.7, flex: 1, marginBottom: 16 },
  readMore:  { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.82rem', fontWeight: 700, color: 'var(--clr-brick)' },
};
