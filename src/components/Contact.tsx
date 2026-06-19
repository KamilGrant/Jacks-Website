import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Globe } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { SITE } from '../data/content';

const SERVICES = ['New Build Brickwork','Restoration & Repointing','Feature Walls & Paving','Retaining Walls','Fireplaces & BBQs','Extensions & Renovations','Other'];

export default function Contact() {
  const [ref, inView] = useInView();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const required = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]');
    let valid = true;
    required.forEach(f => {
      if (!f.value.trim()) { f.style.borderColor = '#c0392b'; valid = false; }
      f.addEventListener('input', () => (f.style.borderColor = ''), { once: true });
    });
    if (!valid) return;

    setStatus('sending');
    // PLUG & PLAY: replace with Formspree/Netlify/EmailJS endpoint
    setTimeout(() => { setStatus('sent'); form.reset(); setTimeout(() => setStatus('idle'), 5000); }, 1400);
  };

  const INFO = [
    { icon: <Phone size={18} />, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/ /g,'')}` },
    { icon: <Mail size={18} />, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: <MapPin size={18} />, label: 'Service Area', value: SITE.area, href: undefined },
    { icon: <Clock size={18} />, label: 'Hours', value: SITE.hours, href: undefined },
  ];

  return (
    <section id="contact" className="section">
      <div className="container" style={s.grid}>
        {/* Info */}
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p style={s.eyebrow}>Get In Touch</p>
          <h2 style={s.title}>Let's Talk About Your Project</h2>
          <p style={s.sub}>Fill in the form and we'll get back to you within 24 hours with a free quote.</p>
          <ul style={s.infoList}>
            {INFO.map(i => (
              <li key={i.label} style={s.infoItem}>
                <div style={s.infoIcon}>{i.icon}</div>
                <div>
                  <strong style={s.infoLabel}>{i.label}</strong>
                  {i.href
                    ? <a href={i.href} style={s.infoValue}>{i.value}</a>
                    : <span style={s.infoValue}>{i.value}</span>}
                </div>
              </li>
            ))}
          </ul>
          <div style={s.socials}>
            {[
              { href: SITE.facebook, icon: <Facebook size={15} />, label: 'Facebook' },
              { href: SITE.instagram, icon: <Instagram size={15} />, label: 'Instagram' },
              { href: SITE.google, icon: <Globe size={15} />, label: 'Google' },
            ].map(sc => (
              <motion.a key={sc.label} href={sc.href} aria-label={sc.label} style={s.social} whileHover={{ background: 'var(--clr-brick)', color: 'white', borderColor: 'var(--clr-brick)' }}>
                {sc.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={s.formWrap}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div style={s.row}>
              <Field id="firstName" label="First Name *" type="text" placeholder="Jack" required />
              <Field id="lastName"  label="Last Name *"  type="text" placeholder="Smith" required />
            </div>
            <Field id="email" label="Email Address *" type="email" placeholder="jack@example.com" required />
            <Field id="phone" label="Phone Number"    type="tel"   placeholder="0400 000 000" />
            <div style={s.fGroup}>
              <label style={s.label} htmlFor="service">Service Required</label>
              <select id="service" name="service" style={s.input}>
                <option value="">Select a service…</option>
                {SERVICES.map(sv => <option key={sv}>{sv}</option>)}
              </select>
            </div>
            <div style={s.fGroup}>
              <label style={s.label} htmlFor="message">Tell Us About Your Project *</label>
              <textarea id="message" name="message" required rows={5} placeholder="Describe your project, location and timeline…" style={{ ...s.input, resize: 'vertical', minHeight: 130 }} />
            </div>
            <motion.button
              type="submit"
              disabled={status !== 'idle'}
              style={s.submitBtn(status)}
              whileHover={status === 'idle' ? { y: -2, boxShadow: '0 8px 24px rgba(155,106,62,.35)' } : {}}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && 'Sending…'}
              {status === 'sent' && '✓ Message Sent!'}
            </motion.button>
            <p style={s.note}>We'll respond within 24 hours. No spam, ever.</p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ id, label, type, placeholder, required }: { id: string; label: string; type: string; placeholder: string; required?: boolean }) {
  return (
    <div style={s.fGroup}>
      <label style={s.label} htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} required={required} style={s.input} />
    </div>
  );
}

const s = {
  grid:      { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '72px', alignItems: 'start' },
  eyebrow:   { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'var(--clr-brick)', marginBottom: 12 },
  title:     { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 14 },
  sub:       { color: 'var(--clr-muted)', marginBottom: 36, fontSize: '.95rem' },
  infoList:  { display: 'flex', flexDirection: 'column' as const, gap: 20, marginBottom: 32 },
  infoItem:  { display: 'flex', alignItems: 'flex-start', gap: 16 },
  infoIcon:  { width: 44, height: 44, background: 'rgba(155,106,62,.1)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-brick)', flexShrink: 0 },
  infoLabel: { display: 'block', fontSize: '.72rem', textTransform: 'uppercase' as const, letterSpacing: '.1em', color: 'var(--clr-muted)', marginBottom: 2 },
  infoValue: { fontSize: '.9rem', color: 'var(--clr-text)' },
  socials:   { display: 'flex', gap: 12 },
  social:    { width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-muted)', transition: 'all .25s' },
  formWrap:  { background: 'var(--clr-cream)', borderRadius: 'var(--radius-lg)', padding: '48px 40px', border: '1px solid var(--clr-border)' },
  row:       { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  fGroup:    { display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 20 },
  label:     { fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.1em', color: 'var(--clr-mid)' },
  input:     { padding: '13px 16px', border: '1.5px solid var(--clr-border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--clr-text)', background: 'white', outline: 'none', transition: 'border .25s', width: '100%' },
  submitBtn: (status: 'idle'|'sending'|'sent'): React.CSSProperties => ({
    width: '100%', padding: '15px', borderRadius: 'var(--radius)', border: 'none', cursor: status !== 'idle' ? 'default' : 'pointer',
    background: status === 'sent' ? '#27ae60' : 'var(--clr-brick)',
    color: 'white', fontWeight: 700, fontSize: '.95rem', fontFamily: 'var(--font-body)',
    transition: 'all .25s',
  }),
  note:      { textAlign: 'center' as const, fontSize: '.78rem', color: 'var(--clr-muted)', marginTop: 12 },
};
