import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/*
 * PLUG & PLAY — Video Section
 * Option A (YouTube): Set VIDEO_TYPE = 'youtube' and paste the video ID into VIDEO_ID
 * Option B (direct):  Set VIDEO_TYPE = 'direct' and paste the video URL into VIDEO_URL
 * The thumbnail shows until the user clicks play.
 * THUMBNAIL: replace /images/video-thumb.jpg with a still from the video
 */
const VIDEO_TYPE: 'youtube' | 'direct' | 'placeholder' = 'placeholder';
const VIDEO_ID   = 'dQw4w9WgXcQ'; // YouTube video ID — replace this
const VIDEO_URL  = '';              // Direct video URL — replace this

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const [ref, inView]         = useInView();

  return (
    <section className="section" id="video" style={{ background: 'var(--clr-dark)' }}>
      <div className="container" style={s.wrap}>
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={s.text}
        >
          <p style={s.eyebrow}>See Us In Action</p>
          <h2 style={s.title}>Watch How We Work</h2>
          <p style={s.desc}>
            60 seconds is all it takes to see why our clients keep coming back. Watch Jack and the team
            in action on a recent project.
          </p>
          <ul style={s.points}>
            {['Expert craftsmanship on every job', 'Clean, tidy worksite guaranteed', 'On time, every time', 'Quality materials only'].map(p => (
              <li key={p} style={s.point}>
                <div style={s.dot} />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={s.videoWrap}
        >
          {!playing ? (
            /* Thumbnail + play button */
            <div style={s.thumb} onClick={() => VIDEO_TYPE !== 'placeholder' && setPlaying(true)}>
              <img src="/images/about-main.jpg" alt="Video thumbnail" style={s.thumbImg} />
              <div style={s.overlay} />
              <motion.div
                style={s.playBtn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={28} color="var(--clr-brick)" fill="var(--clr-brick)" style={{ marginLeft: 3 }} />
              </motion.div>
              {VIDEO_TYPE === 'placeholder' && (
                <div style={s.plugNote}>
                  <span>PLUG & PLAY</span>
                  <p>Set VIDEO_TYPE in VideoSection.tsx<br />to 'youtube' or 'direct' to activate</p>
                </div>
              )}
            </div>
          ) : VIDEO_TYPE === 'youtube' ? (
            <iframe
              style={s.iframe}
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <video src={VIDEO_URL} style={s.iframe} controls autoPlay />
          )}
        </motion.div>
      </div>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrap:     { display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'center' },
  text:     {},
  eyebrow:  { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-tan)', marginBottom: 12 },
  title:    { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.2 },
  desc:     { color: 'rgba(255,255,255,.55)', fontSize: '.95rem', lineHeight: 1.7, marginBottom: 28 },
  points:   { display: 'flex', flexDirection: 'column', gap: 12 },
  point:    { display: 'flex', alignItems: 'center', gap: 12, fontSize: '.9rem', color: 'rgba(255,255,255,.7)' },
  dot:      { width: 8, height: 8, borderRadius: '50%', background: 'var(--clr-brick)', flexShrink: 0 },
  videoWrap:{ borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', boxShadow: '0 24px 64px rgba(0,0,0,.4)', position: 'relative' },
  thumb:    { width: '100%', height: '100%', cursor: 'pointer', position: 'relative' },
  thumbImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  overlay:  { position: 'absolute', inset: 0, background: 'rgba(20,18,15,.45)' },
  playBtn:  { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 72, height: 72, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,.3)' },
  plugNote: { position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,.6)', fontSize: '.78rem', lineHeight: 1.6 },
  iframe:   { width: '100%', height: '100%', border: 'none', display: 'block' },
};
