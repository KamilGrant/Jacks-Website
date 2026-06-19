import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Calculator, ChevronRight, CheckCircle2, Send } from 'lucide-react';
import { SITE } from '../data/content';

const SERVICES = [
  { id: 'feature-wall',  label: 'Feature Wall',         basePerM2: 180 },
  { id: 'retaining',     label: 'Retaining Wall',        basePerM2: 220 },
  { id: 'new-build',     label: 'New Build Brickwork',   basePerM2: 280 },
  { id: 'repointing',    label: 'Repointing',            basePerM2: 95  },
  { id: 'paving',        label: 'Paving',                basePerM2: 130 },
  { id: 'fireplace-bbq', label: 'Fireplace / BBQ',       basePerM2: 350 },
];

const MATERIALS = [
  { id: 'standard', label: 'Standard Brick', multiplier: 1    },
  { id: 'face',     label: 'Face Brick',     multiplier: 1.25 },
  { id: 'heritage', label: 'Heritage Brick', multiplier: 1.55 },
  { id: 'stone',    label: 'Natural Stone',  multiplier: 1.85 },
];

type Step = 'service' | 'details' | 'result';

export default function QuoteCalculator() {
  const [ref, inView] = useInView();
  const [step, setStep]       = useState<Step>('service');
  const [service, setService] = useState('');
  const [material, setMaterial] = useState('standard');
  const [length, setLength]   = useState('');
  const [height, setHeight]   = useState('');
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [sent, setSent] = useState(false);

  const selectedSvc = SERVICES.find(s => s.id === service);
  const selectedMat = MATERIALS.find(m => m.id === material)!;
  const area  = parseFloat(length || '0') * parseFloat(height || '0');
  const low   = selectedSvc ? Math.round(area * selectedSvc.basePerM2 * selectedMat.multiplier * 0.85) : 0;
  const high  = selectedSvc ? Math.round(area * selectedSvc.basePerM2 * selectedMat.multiplier * 1.15) : 0;

  const fmt = (n: number) => n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });

  return (
    <section className="section" id="quote-calculator" style={{ background: 'var(--clr-dark)' }}>
      <div className="container" style={s.wrap}>
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={s.header}
        >
          <div style={s.iconWrap}><Calculator size={28} color="var(--clr-tan)" /></div>
          <p style={s.eyebrow}>Instant Estimate</p>
          <h2 style={s.title}>How Much Will Your Project Cost?</h2>
          <p style={s.desc}>Get a ballpark figure in 60 seconds. We'll follow up with a precise quote after a free site visit.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={s.card}
        >
          {/* Progress bar */}
          <div style={s.progress}>
            {(['service', 'details', 'result'] as Step[]).map((st, i) => (
              <div key={st} style={s.progressStep}>
                <div style={s.progressDot(step === st || (st === 'service' && step !== 'service') || (st === 'details' && step === 'result'))}>
                  {i + 1}
                </div>
                <span style={s.progressLabel}>{st === 'service' ? 'Service' : st === 'details' ? 'Details' : 'Estimate'}</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1 — Service */}
            {step === 'service' && (
              <motion.div key="service" {...fade}>
                <p style={s.stepTitle}>What service do you need?</p>
                <div style={s.serviceGrid}>
                  {SERVICES.map(svc => (
                    <button key={svc.id} style={s.serviceBtn(service === svc.id)} onClick={() => setService(svc.id)}>
                      {svc.label}
                    </button>
                  ))}
                </div>
                <p style={s.stepTitle}>Material type</p>
                <div style={s.matGrid}>
                  {MATERIALS.map(m => (
                    <button key={m.id} style={s.matBtn(material === m.id)} onClick={() => setMaterial(m.id)}>
                      {m.label}
                    </button>
                  ))}
                </div>
                <button
                  style={s.nextBtn(!!service)}
                  disabled={!service}
                  onClick={() => setStep('details')}
                >
                  Next <ChevronRight size={16} />
                </button>
              </motion.div>
            )}

            {/* STEP 2 — Dimensions + contact */}
            {step === 'details' && (
              <motion.div key="details" {...fade}>
                <p style={s.stepTitle}>Approximate dimensions</p>
                <div style={s.row}>
                  <div style={s.fGroup}>
                    <label style={s.label}>Length (metres)</label>
                    <input style={s.input} type="number" min="0" placeholder="e.g. 6" value={length} onChange={e => setLength(e.target.value)} />
                  </div>
                  <div style={s.fGroup}>
                    <label style={s.label}>Height (metres)</label>
                    <input style={s.input} type="number" min="0" placeholder="e.g. 1.8" value={height} onChange={e => setHeight(e.target.value)} />
                  </div>
                </div>
                <p style={s.stepTitle}>Your contact details</p>
                <div style={s.fGroup}>
                  <label style={s.label}>Name</label>
                  <input style={s.input} type="text" placeholder="Jack Smith" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div style={s.row}>
                  <div style={s.fGroup}>
                    <label style={s.label}>Phone</label>
                    <input style={s.input} type="tel" placeholder="0400 000 000" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                  <div style={s.fGroup}>
                    <label style={s.label}>Email</label>
                    <input style={s.input} type="email" placeholder="jack@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={s.backBtn} onClick={() => setStep('service')}>Back</button>
                  <button style={s.nextBtn(!!(length && height && name))} disabled={!(length && height && name)} onClick={() => setStep('result')}>
                    Get My Estimate <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Result */}
            {step === 'result' && (
              <motion.div key="result" {...fade}>
                {!sent ? (
                  <>
                    {/* Estimate range */}
                    <div style={s.estimateBox}>
                      <p style={{ ...s.stepTitle, marginTop: 0, textAlign: 'center' }}>Your Estimate, {name.split(' ')[0]}</p>
                      <div style={s.estimate}>
                        <span style={s.estimateLow}>{fmt(low)}</span>
                        <span style={s.estimateDash}> – </span>
                        <span style={s.estimateHigh}>{fmt(high)}</span>
                      </div>
                      <p style={s.estimateNote}>
                        Based on ~{area.toFixed(1)}m² of {selectedSvc?.label} in {selectedMat.label.toLowerCase()}.
                        Rough guide only — confirmed after free site visit.
                      </p>
                    </div>

                    {/* Job summary */}
                    <div style={s.summaryGrid}>
                      {[
                        ['Service',   selectedSvc?.label ?? ''],
                        ['Material',  selectedMat.label],
                        ['Dimensions',`${length}m × ${height}m`],
                        ['Area',      `~${area.toFixed(1)} m²`],
                      ].map(([k, v]) => (
                        <div key={k} style={s.summaryItem}>
                          <span style={s.summaryKey}>{k}</span>
                          <span style={s.summaryVal}>{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Request formal quote */}
                    <div style={s.quoteRequest}>
                      <p style={s.quoteRequestTitle}>Request a Formal Quote</p>
                      <p style={s.quoteRequestDesc}>
                        Send your estimate details directly to JD Brickwork and we'll confirm a precise price after a free site visit.
                      </p>
                      <a
                        href={`mailto:${SITE.email}?subject=Quote Request — ${selectedSvc?.label}&body=Hi JD Brickwork,%0A%0AI'd like to request a formal quote based on the following estimate:%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(selectedSvc?.label ?? '')}%0AMaterial: ${encodeURIComponent(selectedMat.label)}%0ADimensions: ${length}m x ${height}m (approx. ${area.toFixed(1)} m²)%0AEstimate range: ${fmt(low)} – ${fmt(high)}%0A%0APlease contact me to arrange a site visit.%0A%0AThanks`}
                        style={s.sendBtn}
                        onClick={() => setSent(true)}
                      >
                        <Send size={16} />
                        Send Enquiry &amp; Request Quote
                      </a>
                      <div style={s.orDivider}><span>or</span></div>
                      <a href={`tel:${SITE.phone.replace(/ /g,'')}`} style={s.callBtn}>Call {SITE.phone}</a>
                    </div>

                    <button style={{ ...s.backBtn, marginTop: 16, width: '100%' }} onClick={() => { setStep('service'); setService(''); setLength(''); setHeight(''); setSent(false); }}>
                      Start Over
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <CheckCircle2 size={56} color="#4caf50" style={{ margin: '0 auto 16px' }} />
                    <p style={{ ...s.stepTitle, textAlign: 'center', marginTop: 0 }}>Enquiry Sent!</p>
                    <p style={{ fontSize: '.875rem', color: 'var(--clr-muted)', marginBottom: 24 }}>
                      We've received your details and will be in touch to arrange a free site visit.
                    </p>
                    <button style={s.backBtn} onClick={() => { setStep('service'); setService(''); setLength(''); setHeight(''); setSent(false); }}>
                      Start a new estimate
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

const fade = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -20 },
  transition: { duration: 0.3 },
};

const s: Record<string, any> = {
  wrap:   { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' },
  header: { color: 'white' },
  iconWrap: { width: 60, height: 60, background: 'rgba(196,168,130,.12)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  eyebrow: { fontSize: '.78rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--clr-tan)', marginBottom: 12 },
  title:   { fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.2 },
  desc:    { color: 'rgba(255,255,255,.55)', fontSize: '.95rem', lineHeight: 1.7 },
  card:    { background: 'white', borderRadius: 20, padding: '40px 36px' },
  progress:      { display: 'flex', gap: 24, marginBottom: 32, justifyContent: 'center' },
  progressStep:  { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
  progressDot:   (active: boolean): React.CSSProperties => ({ width: 32, height: 32, borderRadius: '50%', background: active ? 'var(--clr-brick)' : 'var(--clr-border)', color: active ? 'white' : 'var(--clr-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', fontWeight: 700 }),
  progressLabel: { fontSize: '.72rem', color: 'var(--clr-muted)', textTransform: 'uppercase' as const, letterSpacing: '.08em' },
  stepTitle: { fontSize: '.85rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.1em', color: 'var(--clr-mid)', marginBottom: 16, marginTop: 24 },
  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 },
  serviceBtn: (active: boolean): React.CSSProperties => ({ padding: '12px 16px', borderRadius: 10, border: `2px solid ${active ? 'var(--clr-brick)' : 'var(--clr-border)'}`, background: active ? 'rgba(155,106,62,.08)' : 'white', color: active ? 'var(--clr-brick)' : 'var(--clr-text)', fontWeight: 500, fontSize: '.85rem', cursor: 'pointer', textAlign: 'left', transition: 'all .2s' }),
  matGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 8 },
  matBtn:  (active: boolean): React.CSSProperties => ({ padding: '10px 8px', borderRadius: 10, border: `2px solid ${active ? 'var(--clr-brick)' : 'var(--clr-border)'}`, background: active ? 'rgba(155,106,62,.08)' : 'white', color: active ? 'var(--clr-brick)' : 'var(--clr-text)', fontWeight: 500, fontSize: '.75rem', cursor: 'pointer', textAlign: 'center', transition: 'all .2s' }),
  nextBtn: (enabled: boolean): React.CSSProperties => ({ marginTop: 24, width: '100%', padding: '14px', background: enabled ? 'var(--clr-brick)' : 'var(--clr-border)', color: enabled ? 'white' : 'var(--clr-muted)', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.9rem', cursor: enabled ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all .2s' }),
  backBtn: { padding: '14px 24px', background: 'var(--clr-cream)', color: 'var(--clr-mid)', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: '.9rem', cursor: 'pointer' },
  row:     { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  fGroup:  { display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 16 },
  label:   { fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.1em', color: 'var(--clr-mid)' },
  input:   { padding: '12px 14px', border: '1.5px solid var(--clr-border)', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--clr-text)', outline: 'none' },
  estimateBox:  { background: 'var(--clr-cream)', borderRadius: 14, padding: '24px', textAlign: 'center' as const, marginBottom: 20 },
  estimate:     { display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4, margin: '12px 0' },
  estimateLow:  { fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 700, color: 'var(--clr-dark)' },
  estimateDash: { fontSize: '1.4rem', color: 'var(--clr-muted)' },
  estimateHigh: { fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 700, color: 'var(--clr-brick)' },
  estimateNote: { fontSize: '.78rem', color: 'var(--clr-muted)', lineHeight: 1.6, margin: '0 auto' },
  summaryGrid:  { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 },
  summaryItem:  { display: 'flex', flexDirection: 'column' as const, gap: 2, padding: '10px 14px', background: 'white', border: '1px solid var(--clr-border)', borderRadius: 10 },
  summaryKey:   { fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.1em', color: 'var(--clr-muted)' },
  summaryVal:   { fontSize: '.875rem', fontWeight: 600, color: 'var(--clr-dark)' },
  quoteRequest: { background: 'rgba(155,106,62,.06)', border: '1.5px solid rgba(155,106,62,.25)', borderRadius: 14, padding: '24px', marginBottom: 12 },
  quoteRequestTitle: { fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--clr-dark)', marginBottom: 8 },
  quoteRequestDesc:  { fontSize: '.82rem', color: 'var(--clr-muted)', lineHeight: 1.6, marginBottom: 16 },
  sendBtn:  { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px', background: 'var(--clr-brick)', color: 'white', borderRadius: 10, fontWeight: 700, fontSize: '.9rem', marginBottom: 12 },
  orDivider:{ textAlign: 'center' as const, fontSize: '.75rem', color: 'var(--clr-muted)', marginBottom: 12, position: 'relative' as const },
  callBtn:  { display: 'block', textAlign: 'center' as const, padding: '12px', background: 'white', color: 'var(--clr-dark)', border: '1.5px solid var(--clr-border)', borderRadius: 10, fontWeight: 600, fontSize: '.875rem' },
};
