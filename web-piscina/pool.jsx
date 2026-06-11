// ── Piscina municipal — "La piscina" experience (premium depth) ──
const REDUCE = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

const SH_SOFT = '0 14px 40px rgba(31,31,22,0.10)';
const SH_FLOAT = '0 24px 60px rgba(31,31,22,0.16)';
const SH_PHOTO = '0 44px 100px rgba(31,31,22,0.30)';

function Reveal({ children, delay = 0, y = 26, as = 'div', style, className }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(REDUCE);
  React.useEffect(() => {
    if (REDUCE) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  const Comp = as;
  return (
    <Comp ref={ref} className={className} style={{
      opacity: seen ? 1 : 0, transform: seen ? 'none' : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      ...style }}>{children}</Comp>
  );
}
window.Reveal = Reveal;

// dark heritage motif (white/gold engraving → black) as a beige watermark
function Motif({ src, opacity = 0.12, width = 520, pos = {}, flip = false, style }) {
  return (
    <img src={A + src} alt="" aria-hidden="true" style={{
      position: 'absolute', width, opacity, pointerEvents: 'none', userSelect: 'none',
      filter: 'brightness(0) saturate(0)', transform: flip ? 'scaleX(-1)' : 'none',
      WebkitMaskImage: 'radial-gradient(120% 120% at 50% 50%, #000 55%, transparent 100%)',
      maskImage: 'radial-gradient(120% 120% at 50% 50%, #000 55%, transparent 100%)', ...pos, ...style }} />
  );
}
window.Motif = Motif;

function FloatCard({ children, style, hover = true }) {
  return (
    <div style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 26, boxShadow: SH_SOFT,
      transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), box-shadow 300ms', ...style }}
      onMouseEnter={hover ? (e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = SH_FLOAT; }) : undefined}
      onMouseLeave={hover ? (e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = SH_SOFT; }) : undefined}>
      {children}
    </div>
  );
}
window.FloatCard = FloatCard;

function GlassFact({ icon, label, value }) {
  return (
    <div className="amp-glass-dark" style={{ flex: '0 0 auto', borderRadius: 18, padding: '15px 22px', minWidth: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'rgba(255,255,255,0.8)' }}>
        <Icon name={icon} size={16} color="#E1CA8C" />
        <span style={{ fontFamily: TEXT, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      </div>
      <div style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 400, color: '#fff', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>{value}</div>
    </div>
  );
}

function PoolExperience({ go }) {
  const heroRef = React.useRef(null);
  React.useEffect(() => {
    if (REDUCE) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = heroRef.current; if (!el) return;
        const prog = el.parentElement.getBoundingClientRect().top / (window.innerHeight || 800);
        el.style.transform = `translate3d(0, ${(-prog * 70).toFixed(1)}px, 0) scale(1.12)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const norms = [
    ['shower', 'Dúchate antes de entrar al agua.'],
    ['waves', 'Uso del gorro recomendado en el vaso grande.'],
    ['noFood', 'No se permite comida ni vidrio en la zona de agua.'],
    ['users', 'Los menores de 12 años entran acompañados.'],
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* ── immersive hero ── */}
      <div id="horarios" style={{ position: 'relative', marginTop: 'clamp(44px,7vw,96px)', height: 'clamp(520px, 80vh, 780px)', overflow: 'hidden', background: '#2c3a2a' }}>
        <img ref={heroRef} src="img/pueblo-1.png" alt="Piscina municipal"
          style={{ position: 'absolute', inset: '-6% 0', width: '100%', height: '112%', objectFit: 'cover', transform: 'scale(1.12)', willChange: 'transform' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,18,12,0.58) 0%, rgba(20,18,12,0.32) 26%, rgba(20,18,12,0.36) 52%, rgba(20,18,12,0.7) 86%, rgba(20,18,12,0.85) 100%)' }} />
        <img src={A + 'engravings/campos-1.png'} alt="" aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', opacity: 0.2, mixBlendMode: 'screen', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 90, background: 'linear-gradient(to bottom, #F6EED9 0%, rgba(246,238,217,0) 100%)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, background: 'linear-gradient(to top, #F6EED9 0%, rgba(246,238,217,0) 100%)', zIndex: 1, pointerEvents: 'none' }} />
        <Page style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: 'clamp(40px,5vw,64px)', paddingBottom: 'clamp(120px,15vw,180px)' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ width: 8, height: 8, background: '#E1CA8C', transform: 'rotate(45deg)' }} />
              <span style={{ fontFamily: TEXT, fontSize: 12, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(246,236,218,0.92)' }}>La piscina municipal · Tu pueblo</span>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(40px,6.4vw,78px)', lineHeight: 0.98, letterSpacing: '-0.025em', color: '#fff', margin: '0 auto', maxWidth: 900, textShadow: '0 2px 44px rgba(0,0,0,0.45)' }}>
              Un baño en<br/>tu piscina municipal
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p style={{ fontFamily: TEXT, fontSize: 'clamp(16px,1.7vw,19px)', lineHeight: 1.6, color: 'rgba(246,236,218,0.92)', margin: '22px auto 0', maxWidth: 520, textShadow: '0 1px 20px rgba(0,0,0,0.5)' }}>
              Agua fresca, césped y sombra. El verano de tu pueblo, como siempre.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div style={{ display: 'flex', gap: 12, margin: '30px auto 0', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 760 }}>
              <GlassFact icon="calendar" label="Temporada" value="15 jun – 31 ago" />
              <GlassFact icon="clock" label="Cada día" value="11:00 – 20:30" />
              <GlassFact icon="pin" label="Dónde" value="Calle de la Piscina, s/n" />
            </div>
          </Reveal>
        </Page>
      </div>

      {/* ── visita: floating photo + floating cards over beige w/ motif ── */}
      <div style={{ position: 'relative', background: 'linear-gradient(180deg, #F6EED9 0%, #F2E9D2 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <Motif src="castle-white.png" opacity={0.22} width={720} pos={{ right: '-8%', top: '8%' }} />
          <Motif src="church-white.png" opacity={0.16} width={460} pos={{ left: '-7%', bottom: '8%' }} />
          <Motif src="engravings/campos-1.png" opacity={0.1} width={1100} pos={{ left: '50%', bottom: -30, transform: 'translateX(-50%)' }} />
        </div>

        <Page style={{ position: 'relative', zIndex: 1, paddingBottom: 'clamp(48px,6vw,88px)' }}>
          {/* two-image collage */}
          <Reveal y={36} style={{ marginTop: 'clamp(48px, 7vw, 96px)' }}>
            <div style={{ position: 'relative', width: 'min(880px, 100%)', margin: '0 auto', paddingBottom: 'clamp(44px,5vw,76px)' }}>
              <div style={{ position: 'relative', width: '74%', marginLeft: 'auto', background: W.paper, padding: 10, borderRadius: 28, boxShadow: SH_PHOTO, transform: 'rotate(-1.4deg)' }}>
                <img src="img/piscina.png" alt="El vaso grande a media tarde" style={{ width: '100%', display: 'block', borderRadius: 20 }} />
                <div style={{ position: 'absolute', right: 24, top: 22, background: 'rgba(31,31,22,0.82)', borderRadius: 999, padding: '8px 15px', boxShadow: '0 8px 22px rgba(31,31,22,0.22)' }}>
                  <span style={{ fontFamily: TEXT, fontSize: 12.5, color: '#F3ECCF', fontWeight: 500, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>Vaso grande · 25 m</span>
                </div>
              </div>
              <div style={{ position: 'absolute', left: 0, bottom: 0, width: '40%', background: W.paper, padding: 8, borderRadius: 22, boxShadow: SH_FLOAT, transform: 'rotate(3deg)' }}>
                <img src="img/pueblo-4.png" alt="Las fiestas de verano en la piscina" style={{ width: '100%', display: 'block', borderRadius: 15 }} />
              </div>
            </div>
          </Reveal>

          <Reveal style={{ textAlign: 'center', margin: 'clamp(52px,6vw,88px) auto 38px' }}>
            <Eyebrow style={{ display: 'block' }}>Tu visita</Eyebrow>
          </Reveal>

          {/* two floating cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
            <Reveal>
              <FloatCard style={{ padding: 30, height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ display: 'flex', width: 42, height: 42, borderRadius: 13, background: W.well, alignItems: 'center', justifyContent: 'center' }}><Icon name="clock" size={20} color={W.sage} /></span>
                  <h4 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 400, color: W.ink, margin: 0 }}>Horarios</h4>
                </div>
                {[['Temporada', '15 jun – 31 ago'], ['De lunes a domingo', '11:00 – 20:30'], ['Último acceso', '20:00']].map(([a, b], i) => (
                  <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '14px 0', borderTop: i ? `1px solid ${W.hair}` : 0 }}>
                    <span style={{ fontFamily: TEXT, fontSize: 14.5, color: W.inkSoft }}>{a}</span>
                    <span style={{ fontFamily: TEXT, fontSize: 14.5, color: W.ink, fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </FloatCard>
            </Reveal>
            <Reveal delay={110}>
              <FloatCard style={{ padding: 30, height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ display: 'flex', width: 42, height: 42, borderRadius: 13, background: W.well, alignItems: 'center', justifyContent: 'center' }}><Icon name="info" size={20} color={W.sage} /></span>
                  <h4 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 400, color: W.ink, margin: 0 }}>Normas de uso</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {norms.map(([ic, txt]) => (
                    <div key={txt} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ flexShrink: 0, marginTop: 1 }}><Icon name={ic} size={18} color={W.gold} /></span>
                      <span style={{ fontFamily: TEXT, fontSize: 14.5, color: W.ink, lineHeight: 1.5 }}>{txt}</span>
                    </div>
                  ))}
                </div>
              </FloatCard>
            </Reveal>
          </div>

          {/* ubicación + mapa */}
          <Reveal style={{ marginTop: 22 }}>
            <FloatCard hover={false} style={{ overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', boxShadow: SH_FLOAT }}>
              <div style={{ padding: 'clamp(28px,3vw,44px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <span style={{ display: 'flex', width: 42, height: 42, borderRadius: 13, background: W.well, alignItems: 'center', justifyContent: 'center' }}><Icon name="pin" size={20} color={W.sage} /></span>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 400, color: W.ink, margin: 0 }}>Dónde estamos</h3>
                </div>
                <p style={{ fontFamily: TEXT, fontSize: 16.5, color: W.ink, lineHeight: 1.7, margin: '0 0 6px' }}>Calle de la Piscina, s/n<br/>Tu pueblo</p>
                <p style={{ fontFamily: TEXT, fontSize: 14.5, color: W.inkSoft, lineHeight: 1.65, margin: '0 0 24px', maxWidth: 380 }}>En el corazón de tu pueblo.</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <WButton style={{ whiteSpace: 'nowrap' }}><Icon name="pin" size={16} color="#F3ECCF" /> Cómo llegar</WButton>
                  <WButton variant="ghost" style={{ whiteSpace: 'nowrap' }}>Ver en Google Maps <Icon name="external" size={15} color={W.gold} /></WButton>
                </div>
              </div>
              <div style={{ position: 'relative', minHeight: 360, background: W.well }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: `linear-gradient(${W.hair} 1px, transparent 1px), linear-gradient(90deg, ${W.hair} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <Icon name="pin" size={28} color={W.error} /><span style={{ fontFamily: MONO, fontSize: 11, color: W.inkMute }}>Calle de la Piscina · Tu pueblo</span>
                </div>
                {/* mapa placeholder — en producción se insertará el embed real */}
              </div>
            </FloatCard>
          </Reveal>
        </Page>
      </div>
    </div>
  );
}
window.PoolExperience = PoolExperience;
