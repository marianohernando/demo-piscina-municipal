// ── Piscina municipal — public chrome (nav, footer, cookies) ──
const AYTO_URL = '#';

function DemoBanner() {
  return (
    <div style={{ background: '#1F1F16', color: '#E1CA8C', fontFamily: TEXT, fontSize: 13, textAlign: 'center', padding: '9px 20px', letterSpacing: '0.02em', lineHeight: 1.5 }}>
      Web de demostración — así quedaría la de tu pueblo, con vuestro escudo y vuestros precios
    </div>
  );
}
window.DemoBanner = DemoBanner;

function WNav({ onTop, onSection, onBuy, onStaff }) {
  const link = (t, onClick) => (
    <span onClick={onClick} style={{ fontFamily: TEXT, fontSize: 14, cursor: 'pointer', color: W.inkSoft, paddingBottom: 3, borderBottom: '1px solid transparent', transition: 'color 150ms' }}
      onMouseEnter={e => e.currentTarget.style.color = W.ink} onMouseLeave={e => e.currentTarget.style.color = W.inkSoft}>{t}</span>
  );
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 30 }}>
    <DemoBanner />
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      padding: '16px clamp(20px, 5vw, 56px)', borderBottom: `1px solid ${W.hair}`, background: 'rgba(246,238,217,0.92)' }}>
      <CrestLockup size={38} onClick={onTop} />
      <div className="amp-nav-mid" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        <nav className="amp-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {link('Abonos', () => onSection('abonos'))}
          {link('Horarios', () => onSection('horarios'))}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: TEXT, fontSize: 14, color: W.inkSoft, transition: 'color 150ms' }}>
            Ayuntamiento <Icon name="external" size={14} color={W.gold} />
          </span>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="amp-nav-personal"><WButton variant="ghost" size="sm" onClick={onStaff}><Icon name="lock" size={15} color={W.gold} /> Personal</WButton></span>
          <WButton size="sm" onClick={onBuy}>Comprar <Icon name="arrow" size={16} color="#F3ECCF" /></WButton>
        </div>
      </div>
    </div>
    </div>
  );
}
window.WNav = WNav;

function WFooter({ go, onSection }) {
  onSection = onSection || go;
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: W.sage, color: '#F3ECCF', padding: '52px clamp(20px,5vw,56px) 40px', marginTop: 80 }}>
      <img src={A + 'castle-gold.png'} alt="" style={{ position: 'absolute', right: 24, bottom: -36, height: 240, opacity: 0.12, pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(to top, #000 55%, transparent 92%)', maskImage: 'linear-gradient(to top, #000 55%, transparent 92%)' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
        <div style={{ maxWidth: 340 }}>
          <img src={A + 'crest-white.png'} alt="Escudo municipal" style={{ height: 54, marginBottom: 16, opacity: 0.95 }} />
          <div style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 300, letterSpacing: '0.01em' }}>Piscina municipal</div>
          <div style={{ fontSize: 13, color: 'rgba(243,236,207,0.62)', marginTop: 14, lineHeight: 1.8 }}>
            Calle de la Piscina, s/n<br/>Tu pueblo<br/>{FOOTER_LINE}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E1CA8C', marginBottom: 16 }}>Acceso</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <FLink onClick={() => onSection('abonos')}>Abonos y entradas</FLink>
              <FLink onClick={() => onSection('horarios')}>Horarios y tarifas</FLink>
              <FLink onClick={() => onBuyTop(onSection)}>Comprar</FLink>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E1CA8C', marginBottom: 16 }}>Información</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, color: 'rgba(243,236,207,0.72)' }}>Tu Ayuntamiento <Icon name="external" size={13} color="#E1CA8C" /></span>
              <FLink onClick={() => go('privacy')}>Privacidad y aviso legal</FLink>
              <FLink onClick={() => go('staff')}>Acceso del personal</FLink>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 1, marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(225,202,140,0.2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 18 }}>
        <Ornament color="#E1CA8C" width={120} />
        <div style={{ fontSize: 11.5, color: 'rgba(243,236,207,0.55)', letterSpacing: '0.04em' }}>© 2026 Tu Ayuntamiento</div>
      </div>
    </div>
  );
}
function onBuyTop(onSection) { onSection('abonos'); }
function FLink({ onClick, children }) {
  return <span onClick={onClick} style={{ fontSize: 13.5, color: 'rgba(243,236,207,0.72)', cursor: 'pointer' }}
    onMouseEnter={e => e.currentTarget.style.color = '#F3ECCF'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(243,236,207,0.72)'}>{children}</span>;
}
window.WFooter = WFooter;

function CookieBanner() {
  const [open, setOpen] = React.useState(() => {
    try { return sessionStorage.getItem('amp_cookies') !== 'ok'; } catch (e) { return true; }
  });
  if (!open) return null;
  const dismiss = () => { try { sessionStorage.setItem('amp_cookies', 'ok'); } catch (e) {} setOpen(false); };
  return (
    <div className="amp-noprint" style={{ position: 'fixed', left: 'clamp(16px,4vw,40px)', bottom: 'clamp(16px,4vw,40px)', maxWidth: 420, zIndex: 60,
      background: W.paper, borderRadius: 20, padding: 22, boxShadow: '0 12px 40px rgba(31,31,22,0.18)', border: `1px solid ${W.hair}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
        <Icon name="shield" size={18} color={W.gold} />
        <div style={{ fontFamily: DISPLAY, fontSize: 16, color: W.ink }}>Cookies técnicas</div>
      </div>
      <p style={{ fontFamily: TEXT, fontSize: 13.5, color: W.inkSoft, lineHeight: 1.6, margin: '0 0 16px' }}>
        Usamos solo cookies técnicas, necesarias para que la compra de tu abono funcione. No hay seguimiento ni publicidad.
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <WButton size="sm" onClick={dismiss}>Entendido</WButton>
        <WButton variant="ghost" size="sm" onClick={dismiss}>Solo las necesarias</WButton>
      </div>
    </div>
  );
}
window.CookieBanner = CookieBanner;

function Page({ children, max = 1080, pad = true, style }) {
  return <div style={{ maxWidth: max, margin: '0 auto', padding: pad ? '0 clamp(20px,5vw,56px)' : 0, ...style }}>{children}</div>;
}
window.Page = Page;
