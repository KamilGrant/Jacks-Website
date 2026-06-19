import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import QuoteLink from './QuoteLink';
import { useEffect, useState } from 'react';
import { SITE } from '../data/content';

/* PLUG & PLAY: Update WHATSAPP_NUMBER with client's number in international format (no +) */
const WHATSAPP_NUMBER = '61400000000';
const WHATSAPP_MSG    = encodeURIComponent('Hi JD Brickwork! I\'d like to get a quote for a bricklaying project.');

export default function MobileCTA() {
  const [show, setShow]     = useState(false);
  const [waOpen, setWaOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Floating WhatsApp button (all screen sizes) ── */}
      <div className="wa-float" style={s.floatWrap}>
        <AnimatePresence>
          {waOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              style={s.waPopup}
            >
              <p style={s.waTitle}>Chat with us on WhatsApp</p>
              <p style={s.waSub}>Send us a message and we'll get back to you.</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noreferrer"
                style={s.waBtn}
              >
                Start Chat
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          style={s.waFab}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setWaOpen(o => !o)}
          aria-label="Chat on WhatsApp"
          animate={show ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.5, delay: 3 }}
        >
          {/* WhatsApp icon */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.button>
      </div>

      {/* ── Sticky call bar — mobile only ── */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={s.callBar}
            className="mobile-call-bar"
          >
            <a href={`tel:${SITE.phone.replace(/ /g,'')}`} style={s.callBtn}>
              <Phone size={18} />
              Call {SITE.phone}
            </a>
            <QuoteLink style={s.quoteBtn}>
              <MessageCircle size={18} />
              Get a Quote
            </QuoteLink>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .wa-float { bottom: 24px; }
        .mobile-call-bar { display: none !important; }
        @media (max-width: 900px) {
          .mobile-call-bar { display: flex !important; }
          .wa-float { bottom: 96px; }
        }
      `}</style>
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  floatWrap: { position: 'fixed', right: 20, zIndex: 1100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 },
  waPopup:   { background: 'white', borderRadius: 14, padding: '16px 20px', boxShadow: '0 8px 40px rgba(0,0,0,.15)', width: 220, border: '1px solid var(--clr-border)' },
  waTitle:   { fontWeight: 700, fontSize: '.85rem', color: 'var(--clr-dark)', margin: '0 0 4px' },
  waSub:     { fontSize: '.75rem', color: 'var(--clr-muted)', margin: '0 0 12px' },
  waBtn:     { display: 'block', textAlign: 'center', background: '#25D366', color: 'white', padding: '9px', borderRadius: 10, fontWeight: 700, fontSize: '.82rem' },
  waFab:     { width: 50, height: 50, borderRadius: '50%', background: '#25D366', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,.4)' },
  callBar:   { position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, display: 'flex', padding: '8px 12px', background: 'white', borderTop: '1px solid var(--clr-border)', gap: 10, boxShadow: '0 -4px 16px rgba(0,0,0,.08)' },
  callBtn:   { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px 8px', background: 'var(--clr-brick)', color: 'white', borderRadius: 10, fontWeight: 700, fontSize: '.82rem' },
  quoteBtn:  { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px 8px', background: 'var(--clr-cream)', color: 'var(--clr-dark)', borderRadius: 10, fontWeight: 700, fontSize: '.82rem', border: '1px solid var(--clr-border)' },
};
