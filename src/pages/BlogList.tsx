import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BlogList() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 80 }}>
        <div style={s.hero}>
          <div className="container">
            <p style={s.eyebrow}>Knowledge Base</p>
            <h1 style={s.title}>Expert Bricklaying Guides</h1>
            <p style={s.sub}>Practical advice from 15+ years in the trade — helping you make the right decisions for your project.</p>
          </div>
        </div>
        <div className="container" style={s.grid}>
          {BLOG_POSTS.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={s.card}>
              <div style={s.imgWrap}>
                <img src={post.image} alt={post.title} style={s.img} />
                <div style={s.cat}><Tag size={10} />{post.category}</div>
              </div>
              <div style={s.body}>
                <div style={s.meta}>
                  <span style={s.date}>{post.date}</span>
                  <span>·</span>
                  <Clock size={12} color="var(--clr-muted)" />
                  <span style={s.date}>{post.readTime}</span>
                </div>
                <h2 style={s.cardTitle}>{post.title}</h2>
                <p style={s.excerpt}>{post.excerpt}</p>
                <span style={s.read}>Read article <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  hero:      { background: 'var(--clr-dark)', padding: '72px 0', marginBottom: 64 },
  eyebrow:   { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-tan)', marginBottom: 16 },
  title:     { fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 16 },
  sub:       { color: 'rgba(255,255,255,.55)', fontSize: '1rem', maxWidth: 560 },
  grid:      { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28, paddingBottom: 96 },
  card:      { display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--clr-border)' },
  imgWrap:   { position: 'relative', aspectRatio: '16/9', overflow: 'hidden' },
  img:       { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  cat:       { position: 'absolute', top: 14, left: 14, background: 'var(--clr-brick)', color: 'white', padding: '5px 12px', borderRadius: 50, fontSize: '.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 },
  body:      { padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 },
  meta:      { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 },
  date:      { fontSize: '.72rem', color: 'var(--clr-muted)' },
  cardTitle: { fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 10, lineHeight: 1.35 },
  excerpt:   { fontSize: '.85rem', color: 'var(--clr-muted)', lineHeight: 1.7, flex: 1, marginBottom: 16 },
  read:      { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.82rem', fontWeight: 700, color: 'var(--clr-brick)' },
};
