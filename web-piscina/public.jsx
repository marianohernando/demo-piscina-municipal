// ── Piscina municipal — Landing (inicio único) + Product detail ──

const HORARIO = [
  ['Temporada', '15 de junio – 31 de agosto'],
  ['De lunes a domingo', '11:00 – 20:30'],
  ['Último acceso', '20:00'],
];
const NORMAS = [
  ['shower', 'Dúchate antes de entrar al agua.'],
  ['waves', 'Uso del gorro recomendado en el vaso grande.'],
  ['noFood', 'No se permite comida ni vidrio en la zona de agua.'],
  ['users', 'Los menores de 12 años entran acompañados.'],
];

function Landing({ go, select, onBuy }) {
  const hero = THEMES.temporada;
  return (
    <div>
      {/* hero */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <Motif src="church-white.png" opacity={0.2} width={540} pos={{ left: -70, top: 10 }} />
        </div>
        <Page style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(32px,5vw,72px)', flexWrap: 'wrap', padding: 'clamp(44px,6vw,60px) 0 clamp(40px,5vw,52px)' }}>
            <div style={{ flex: '1 1 440px', maxWidth: 560 }}>
              <Eyebrow>Tu Ayuntamiento · Temporada 2026</Eyebrow>
              <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(40px,5.4vw,60px)', lineHeight: 1.04, letterSpacing: '-0.02em', color: W.ink, margin: '22px 0 0' }}>Tu piscina<br/>municipal.</h1>
              <p style={{ fontFamily: TEXT, fontSize: 18, lineHeight: 1.65, color: W.inkSoft, margin: '24px 0 0', maxWidth: 460 }}>
                El Ayuntamiento abre la piscina municipal del 15 de junio al 31 de agosto. Consulta horarios y tarifas y obtén tu acceso en línea.
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
                <WButton size="lg" onClick={() => go('abonos')}>Ver abonos <Icon name="arrow" size={17} color="#F3ECCF" /></WButton>
                <WButton variant="ghost" size="lg" onClick={() => go('horarios')}>Horarios y tarifas</WButton>
              </div>
            </div>
            <div style={{ flex: '0 0 auto', position: 'relative', width: 'min(400px, 100%)' }}>
              <div style={{ background: W.paper, padding: 9, borderRadius: 28, boxShadow: '0 40px 90px rgba(31,31,22,0.26)', transform: 'rotate(-3deg)' }}>
                <img src="img/pueblo-2.png" alt="Piscina municipal" style={{ width: '100%', display: 'block', borderRadius: 20 }} />
              </div>
              <div style={{ position: 'absolute', right: -16, bottom: -30, transform: 'rotate(5deg)', filter: 'drop-shadow(0 26px 50px rgba(31,31,22,0.32))' }}>
                <PassPreview t={hero} width={172} />
              </div>
            </div>
          </div>
        </Page>
      </div>

      {/* products */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <Motif src="engravings/flores-1.png" opacity={0.18} width={440} pos={{ right: '-3%', top: 24 }} />
          <Motif src="engravings/campos-1.png" opacity={0.22} width={1000} pos={{ left: '50%', bottom: -40, transform: 'translateX(-50%)' }} />
        </div>
        <Page style={{ position: 'relative', zIndex: 1 }}>
        <div id="abonos" style={{ paddingTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 30 }}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,32px)', color: W.ink, letterSpacing: '-0.01em', margin: 0 }}>Elige tu acceso</h2>
            <span style={{ fontFamily: TEXT, fontSize: 14, color: W.inkSoft }}>Cuatro formas de entrar a la piscina</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 22 }}>
            {CATALOG.map(p => {
              const t = THEMES[p.theme];
              return (
                <div key={p.id} style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 26, padding: 22,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 14px 40px rgba(31,31,22,0.10)',
                  transition: 'transform 300ms var(--ease, ease), box-shadow 300ms' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 26px 60px rgba(31,31,22,0.16)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(31,31,22,0.10)'; }}>
                  <PassPreview t={t} width={158} />
                  <div style={{ fontFamily: DISPLAY, fontSize: 18, color: W.ink, marginTop: 20, textAlign: 'center', letterSpacing: '0.01em' }}>{p.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.accentDeep, marginTop: 8, textAlign: 'center' }}>{p.tag}</div>
                  <p style={{ fontSize: 13, color: W.inkSoft, lineHeight: 1.6, textAlign: 'center', margin: '12px 0 0', minHeight: 62 }}>{p.blurb}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, margin: '16px 0' }}>
                    <span style={{ fontFamily: DISPLAY, fontSize: 26, color: W.ink, fontVariantNumeric: 'tabular-nums' }}>{priceLabel(p)}</span>
                  </div>
                  <WButton full accent={t.field} onClick={() => select(p.id)}>Ver y adquirir</WButton>
                </div>
              );
            })}
          </div>
        </div>

        {/* how it works */}
        <div style={{ paddingTop: 88 }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <Ornament color={W.gold} width={120} style={{ margin: '0 auto 22px' }} />
            <Eyebrow style={{ display: 'block', marginBottom: 12 }}>En tres pasos</Eyebrow>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(26px,3.4vw,34px)', color: W.ink, margin: 0 }}>Cómo funciona</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 22 }}>
            {[['01', 'euro', 'Adquiere online', 'Elige tu abono y paga de forma segura en menos de un minuto.'],
              ['02', 'mail', 'Recibe tu código', 'Tu credencial llega al correo con un código QR único.'],
              ['03', 'qr', 'Accede con un gesto', 'Muestra el código en la entrada de la piscina. Eso es todo.']].map(([n, ic, t, d]) => (
              <div key={n} style={{ position: 'relative', overflow: 'hidden', background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 24, padding: '30px 28px 28px', boxShadow: '0 14px 40px rgba(31,31,22,0.10)', transition: 'transform 300ms var(--ease, ease), box-shadow 300ms' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 26px 60px rgba(31,31,22,0.16)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(31,31,22,0.10)'; }}>
                <span style={{ position: 'absolute', right: 14, top: 0, fontFamily: DISPLAY, fontSize: 84, fontWeight: 300, color: W.sage, opacity: 0.08, lineHeight: 1 }}>{n}</span>
                <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 14, background: W.well, alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}><Icon name={ic} size={22} color={W.sage} /></div>
                <div style={{ fontFamily: TEXT, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: W.gold, marginBottom: 8 }}>Paso {n}</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 20, color: W.ink, marginBottom: 10 }}>{t}</div>
                <p style={{ fontFamily: TEXT, fontSize: 14.5, color: W.inkSoft, lineHeight: 1.65, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Page>
      </div>

<PoolExperience go={go} />
      <WFooter go={go} onSection={go} />
    </div>
  );
}
window.Landing = Landing;

function ProductDetail({ product, go, onBuy }) {
  const p = product, t = THEMES[p.theme];
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Motif src="engravings/campos-1.png" opacity={0.14} width={1000} pos={{ left: '50%', bottom: 20, transform: 'translateX(-50%)' }} />
        <Motif src="engravings/flores-1.png" opacity={0.12} width={360} pos={{ right: '-2%', top: 30 }} />
      </div>
      <Page style={{ position: 'relative', zIndex: 1, paddingTop: 36 }}>
        <span onClick={() => go('abonos')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: TEXT, fontSize: 14, color: W.inkSoft, cursor: 'pointer', marginBottom: 32 }}>
          <Icon name="back" size={18} /> Volver a los abonos
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.85fr) 1fr', gap: 'clamp(36px,5vw,72px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PassPreview t={t} width={300} style={{ transform: 'rotate(-2deg)' }} />
          </div>
          <div>
            <Eyebrow color={t.accentDeep}>{p.tag}</Eyebrow>
            <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(32px,4.2vw,44px)', color: W.ink, letterSpacing: '-0.02em', margin: '16px 0 0', lineHeight: 1.08 }}>{p.name}</h1>
            <p style={{ fontFamily: TEXT, fontSize: 17, lineHeight: 1.65, color: W.inkSoft, margin: '20px 0 0', maxWidth: 460 }}>{p.desc}</p>

            <div style={{ margin: '28px 0', padding: '20px 0', borderTop: `1px solid ${W.hair}`, borderBottom: `1px solid ${W.hair}` }}>
              {p.range ? (
                <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                  <PriceBlock label="Entre semana" sub="lunes a viernes" value={`${p.price} €`} />
                  <PriceBlock label="Fin de semana y festivos" sub="sábado, domingo y festivos" value={`${p.priceWeekend} €`} />
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: DISPLAY, fontSize: 40, fontWeight: 300, color: W.ink, fontVariantNumeric: 'tabular-nums' }}>{p.price} €</span>
                  <span style={{ fontFamily: TEXT, fontSize: 15, color: W.inkSoft }}>{p.unit}</span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: 30 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: W.inkSoft, marginBottom: 16 }}>Qué incluye</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {p.includes.map((inc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ flexShrink: 0, marginTop: 1, color: t.accentDeep }}><Icon name="check" size={18} color={t.accentDeep} sw={2} /></span>
                    <span style={{ fontFamily: TEXT, fontSize: 15, color: W.ink, lineHeight: 1.5 }}>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <WButton size="lg" accent={t.field} onClick={() => onBuy(p.id)}>{p.theme === 'dia' ? 'Adquirir entrada' : 'Adquirir abono'} <Icon name="arrow" size={17} color={t.onField} /></WButton>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: TEXT, fontSize: 13, color: W.inkSoft }}>
                <Icon name="lock" size={15} color={W.gold} /> Pago seguro
              </span>
            </div>
          </div>
        </div>
      </Page>
      <WFooter go={go} onSection={go} />
    </div>
  );
}
function PriceBlock({ label, sub, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: W.inkSoft }}>{label}</div>
      <div style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 300, color: W.ink, margin: '8px 0 4px', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontFamily: TEXT, fontSize: 12.5, color: W.inkMute }}>{sub}</div>
    </div>
  );
}
window.ProductDetail = ProductDetail;
