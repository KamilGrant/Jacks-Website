import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useInView } from '../hooks/useInView';

/* PLUG & PLAY: Replace with real Google reviews or connect Google Places API */
const REVIEWS = [
  { id: 1, name: 'Sarah Mitchell',  initials: 'SM', location: 'Toorak, VIC',      rating: 5, time: '2 weeks ago',  text: 'JD Brickwork transformed our front garden with a stunning feature wall. Professional, tidy and finished ahead of schedule. Couldn\'t be happier!' },
  { id: 2, name: 'Tom Robertson',   initials: 'TR', location: 'Brighton, VIC',     rating: 5, time: '1 month ago',  text: 'Used JD Brickwork for a large commercial project. Attention to detail and quality of work was second to none. Highly recommended.' },
  { id: 3, name: 'Linda Kowalski',  initials: 'LK', location: 'Hawthorn, VIC',     rating: 5, time: '6 weeks ago',  text: 'Restored our crumbling heritage fireplace beautifully. Matched the original brick perfectly. Exceptional craftsmen.' },
  { id: 4, name: 'Mark Davidson',   initials: 'MD', location: 'Geelong, VIC',      rating: 5, time: '2 months ago', text: 'Best value and most professional of three quotes. The retaining wall has completely transformed our backyard.' },
  { id: 5, name: 'Priya Sharma',    initials: 'PS', location: 'Doncaster, VIC',    rating: 5, time: '3 months ago', text: 'Absolutely brilliant work on our new build. Arrived on time every day, communicated clearly and the quality is outstanding.' },
  { id: 6, name: 'James O\'Brien', initials: 'JO', location: 'Frankston, VIC',    rating: 5, time: '4 months ago', text: 'Had Jack build a pizza oven and outdoor BBQ area. The whole family is obsessed. Incredible craftsmanship and great value.' },
];

const Stars = ({ n }: { n: number }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {[...Array(n)].map((_, i) => <Star key={i} size={14} fill="#f4b942" color="#f4b942" />)}
  </div>
);

export default function Reviews() {
  const [ref, inView] = useInView();
  const avg = (REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <section id="testimonials" className="section" style={{ background: 'var(--clr-cream)' }}>
      <div className="container">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={s.header}
        >
          <div style={s.googleBadge}>
            {/* Google G logo */}
            <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <div>
              <strong style={{ fontSize: '1rem', color: 'var(--clr-dark)' }}>Google Reviews</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--clr-dark)' }}>{avg}</span>
                <Stars n={5} />
                <span style={{ fontSize: '.78rem', color: 'var(--clr-muted)' }}>({REVIEWS.length} reviews)</span>
              </div>
            </div>
          </div>
          <div>
            <p style={s.eyebrow}>Verified Reviews</p>
            <h2 style={s.title}>What Our Clients Say</h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={24}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{ 640: { slidesPerView: 1 }, 900: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
            style={{ paddingBottom: 56 }}
          >
            {REVIEWS.map(r => (
              <SwiperSlide key={r.id}>
                <div style={s.card}>
                  <div style={s.cardTop}>
                    <div style={s.avatar}>{r.initials}</div>
                    <div>
                      <strong style={s.name}>{r.name}</strong>
                      <span style={s.location}>{r.location}</span>
                    </div>
                    <svg style={{ marginLeft: 'auto' }} width="22" height="22" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  </div>
                  <Stars n={r.rating} />
                  <p style={s.text}>"{r.text}"</p>
                  <span style={s.time}>{r.time}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  header:      { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 },
  googleBadge: { display: 'flex', alignItems: 'center', gap: 14, background: 'white', padding: '16px 24px', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,.08)', border: '1px solid var(--clr-border)' },
  eyebrow:     { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-brick)', marginBottom: 8 },
  title:       { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, color: 'var(--clr-dark)', margin: 0 },
  card:        { background: 'white', borderRadius: 16, padding: '28px 24px', border: '1px solid var(--clr-border)', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 },
  cardTop:     { display: 'flex', alignItems: 'center', gap: 12 },
  avatar:      { width: 42, height: 42, borderRadius: '50%', background: 'var(--clr-brick)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '.9rem', flexShrink: 0 },
  name:        { display: 'block', fontSize: '.875rem', color: 'var(--clr-dark)', fontWeight: 600 },
  location:    { fontSize: '.75rem', color: 'var(--clr-muted)' },
  text:        { fontSize: '.875rem', color: 'var(--clr-text)', lineHeight: 1.7, flex: 1 },
  time:        { fontSize: '.72rem', color: 'var(--clr-muted)', marginTop: 'auto' },
};
