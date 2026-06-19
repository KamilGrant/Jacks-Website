import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useInView } from '../hooks/useInView';
import { TESTIMONIALS } from '../data/content';

export default function Testimonials() {
  const [ref, inView] = useInView();
  return (
    <section id="testimonials" className="section" style={{ background: 'var(--clr-cream)' }}>
      <div className="container">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}
        >
          <p style={s.eyebrow}>What Clients Say</p>
          <h2 style={s.sectionTitle}>Don't Just Take Our Word For It</h2>
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
            {TESTIMONIALS.map(t => (
              <SwiperSlide key={t.id}>
                <div style={s.card}>
                  <div style={s.stars}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f4b942" color="#f4b942" />)}
                  </div>
                  <p style={s.text}>{t.text}</p>
                  <div style={s.author}>
                    <div style={s.avatar}>{t.initials}</div>
                    <div>
                      <strong style={s.name}>{t.name}</strong>
                      <span style={s.location}>{t.location}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

const s = {
  eyebrow:     { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--clr-brick)', marginBottom: 12 },
  sectionTitle:{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, color: 'var(--clr-dark)' },
  card:        { background: 'white', borderRadius: 'var(--radius-lg)', padding: '36px 32px', border: '1px solid var(--clr-border)', height: '100%' },
  stars:       { display: 'flex', gap: 4, marginBottom: 18 },
  text:        { fontSize: '.93rem', color: 'var(--clr-text)', lineHeight: 1.75, marginBottom: 28, fontStyle: 'italic' as const },
  author:      { display: 'flex', alignItems: 'center', gap: 14 },
  avatar:      { width: 44, height: 44, borderRadius: '50%', background: 'var(--clr-brick)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', flexShrink: 0 },
  name:        { display: 'block', fontSize: '.9rem', color: 'var(--clr-dark)' },
  location:    { fontSize: '.78rem', color: 'var(--clr-muted)' },
};
