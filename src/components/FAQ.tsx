import { useState } from 'react';
import QuoteLink from './QuoteLink';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const FAQS = [
  { q: 'Do you provide free quotes?', a: 'Yes — all quotes are completely free and come with no obligation. We\'ll visit your site, assess the job and provide a detailed written quote within 24–48 hours.' },
  { q: 'Are you fully licensed and insured?', a: 'Absolutely. JD Brickwork is fully licensed with the relevant state authority and holds comprehensive public liability and workers compensation insurance. We\'re happy to provide certificates on request.' },
  { q: 'How long will my project take?', a: 'It depends on the scope. A feature wall might take 1–2 days; a full new-build brickwork package could be several weeks. We\'ll give you a realistic timeline in your quote and keep you updated throughout.' },
  { q: 'Do you supply the bricks and materials?', a: 'We can supply all materials or work with materials you\'ve sourced yourself — whatever works best for you. We have strong relationships with suppliers and can often source bricks at trade pricing.' },
  { q: 'Can you match existing brickwork?', a: 'Yes, brick matching is one of our specialties — particularly for heritage and restoration projects. We\'ll source the closest match available and can often achieve a seamless result.' },
  { q: 'What areas do you service?', a: 'We cover Greater Melbourne and surrounds, including the CBD fringe, eastern suburbs, south-eastern suburbs, Mornington Peninsula and Geelong. Contact us if you\'re unsure whether we cover your area.' },
  { q: 'How do I pay?', a: 'We typically take a deposit to secure your booking, with the balance due on completion. We accept bank transfer, cash and most major cards. Payment terms are outlined clearly in your quote.' },
  { q: 'Do you do small jobs?', a: 'Yes — we take on jobs of all sizes, from a single step repair to full new builds. No job is too small if it needs doing right.' },
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={s.item}>
      <button style={s.question} onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <div style={s.icon}>
          {open ? <Minus size={16} color="white" /> : <Plus size={16} color="var(--clr-brick)" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={s.answer}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [ref, inView]   = useInView();

  return (
    <section id="faq" className="section section-alt">
      <div className="container faq-grid" style={s.wrap}>
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={s.left}
        >
          <p style={s.eyebrow}>Got Questions?</p>
          <h2 style={s.title}>Frequently Asked Questions</h2>
          <p style={s.desc}>Everything you need to know before getting started. Can't find your answer? Just give us a call.</p>
          <QuoteLink style={s.callBtn}>Get a Free Quote</QuoteLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={s.list}
        >
          {FAQS.map((faq, i) => (
            <Item key={i} q={faq.q} a={faq.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrap:     { display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 72, alignItems: 'start' },
  left:     { position: 'sticky', top: 100 },
  eyebrow:  { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-brick)', marginBottom: 12 },
  title:    { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 16, lineHeight: 1.2 },
  desc:     { color: 'var(--clr-muted)', fontSize: '.95rem', lineHeight: 1.7, marginBottom: 32 },
  callBtn:  { display: 'inline-flex', padding: '14px 28px', background: 'var(--clr-brick)', color: 'white', borderRadius: 'var(--radius)', fontWeight: 600, fontSize: '.9rem' },
  list:     { display: 'flex', flexDirection: 'column', gap: 0 },
  item:     { borderBottom: '1px solid var(--clr-border)' },
  question: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '.95rem', fontWeight: 600, color: 'var(--clr-dark)' },
  icon:     { width: 30, height: 30, borderRadius: '50%', background: 'var(--clr-cream)', border: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .2s' },
  answer:   { padding: '0 0 20px', color: 'var(--clr-muted)', fontSize: '.9rem', lineHeight: 1.75 },
};
