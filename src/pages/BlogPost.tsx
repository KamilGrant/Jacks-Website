import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) return (
    <><Navbar />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-head)', marginBottom: 16 }}>Post not found</h1>
          <Link to="/" style={{ color: 'var(--clr-brick)' }}>← Back to home</Link>
        </div>
      </div>
    <Footer /></>
  );

  return (
    <>
      <Navbar />
      <article style={{ paddingTop: 80 }}>
        {/* Hero */}
        <div style={s.hero}>
          <img src={post.image} alt={post.title} style={s.heroImg} />
          <div style={s.heroOverlay} />
          <div className="container" style={s.heroContent}>
            <Link to="/blog" style={s.back}><ArrowLeft size={16} /> All Articles</Link>
            <div style={s.meta}>
              <span style={s.cat}><Tag size={11} />{post.category}</span>
              <span style={s.metaText}>{post.date}</span>
              <span>·</span>
              <Clock size={12} color="rgba(255,255,255,.6)" />
              <span style={s.metaText}>{post.readTime}</span>
            </div>
            <h1 style={s.title}>{post.title}</h1>
          </div>
        </div>

        {/* Body */}
        <div className="container" style={s.body}>
          <div style={s.content}>
            {post.content.split('\n\n').map((block, i) => {
              if (block.startsWith('## ')) return <h2 key={i} style={s.h2}>{block.slice(3)}</h2>;
              if (block.startsWith('**') && block.endsWith('**')) return <p key={i} style={{ ...s.p, fontWeight: 700, color: 'var(--clr-dark)' }}>{block.slice(2, -2)}</p>;
              return <p key={i} style={s.p}>{block}</p>;
            })}
          </div>

          {/* CTA box */}
          <aside style={s.cta}>
            <h3 style={s.ctaTitle}>Ready to Get Started?</h3>
            <p style={s.ctaDesc}>Get a free, no-obligation quote from JD Brickwork. We'll come to your site and give you an honest assessment.</p>
            <Link to="/#contact" style={s.ctaBtn}>Get a Free Quote</Link>
          </aside>
        </div>
      </article>
      <Footer />
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  hero:        { position: 'relative', height: 480, overflow: 'hidden' },
  heroImg:     { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,18,15,.9) 0%, rgba(20,18,15,.4) 100%)' },
  heroContent: { position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)', width: '100%' },
  back:        { display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,.7)', fontSize: '.82rem', marginBottom: 16 },
  meta:        { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 },
  cat:         { display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--clr-brick)', color: 'white', padding: '4px 12px', borderRadius: 50, fontSize: '.7rem', fontWeight: 700 },
  metaText:    { fontSize: '.78rem', color: 'rgba(255,255,255,.6)' },
  title:       { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', lineHeight: 1.2, maxWidth: 800 },
  body:        { display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, padding: '64px 24px', alignItems: 'start', maxWidth: 1180, margin: '0 auto' },
  content:     {},
  h2:          { fontFamily: 'var(--font-head)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--clr-dark)', margin: '36px 0 16px' },
  p:           { fontSize: '.95rem', color: 'var(--clr-muted)', lineHeight: 1.85, marginBottom: 20 },
  cta:         { background: 'var(--clr-cream)', borderRadius: 16, padding: '32px 28px', border: '1px solid var(--clr-border)', position: 'sticky', top: 100 },
  ctaTitle:    { fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 12 },
  ctaDesc:     { fontSize: '.875rem', color: 'var(--clr-muted)', lineHeight: 1.7, marginBottom: 24 },
  ctaBtn:      { display: 'block', textAlign: 'center', background: 'var(--clr-brick)', color: 'white', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: '.9rem' },
};
