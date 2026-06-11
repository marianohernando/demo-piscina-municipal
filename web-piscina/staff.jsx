// ── Piscina municipal — Control de acceso (escáner, mobile) ──

const SCAN_CASES = {
  ok: {
    tone: 'ok', icon: 'checkCircle', title: 'Acceso permitido',
    holder: 'María del Campo Herrero', theme: 'banos', product: 'Bono 15 Baños',
    detail: [['Accesos', '12 de 15 disponibles'], ['Id del bono', 'PSC-B15-0318'], ['Estado', 'Vigente']],
    confirm: true,
  },
  empty: {
    tone: 'warn', icon: 'alert', title: 'Sin accesos disponibles',
    holder: 'Jorge Antón Vega', theme: 'banos', product: 'Bono 15 Baños',
    detail: [['Accesos', '0 de 15 disponibles'], ['Id del bono', 'PSC-B15-0204'], ['Estado', 'Agotado']],
    note: 'Este bono ha consumido todos sus accesos. Ofrece adquirir uno nuevo.',
  },
  used: {
    tone: 'info', icon: 'clock', title: 'Entrada ya utilizada',
    holder: 'Visitante del día', theme: 'dia', product: 'Entrada de Día · Adulto',
    detail: [['Validez', 'Solo hoy'], ['Utilizada', 'hoy a las 12:48'], ['Id de la entrada', 'PSC-DIA-2207']],
    note: 'Esta entrada de día ya fue validada en una entrada anterior.',
  },
  void: {
    tone: 'error', icon: 'ban', title: 'Pase anulado',
    holder: 'Lucía Prieto Caro', theme: 'temporada', product: 'Abono Temporada',
    detail: [['Estado', 'Anulado el 28 de julio'], ['Motivo', 'Devolución solicitada'], ['Id del abono', 'PSC-2026-0090']],
    note: 'Este abono fue anulado y no permite el acceso.',
  },
  invalid: {
    tone: 'error', icon: 'xCircle', title: 'Código no válido',
    detail: [['Lectura', 'No reconocida'], ['Sugerencia', 'Vuelve a escanear el código']],
    note: 'El código no corresponde a ningún abono o entrada válida.',
  },
};
const TONE = { ok: W.ok, warn: W.warn, error: W.error, info: W.info };

function Scanner({ exit }) {
  const [demo, setDemo] = React.useState('ok');
  const [phase, setPhase] = React.useState('scan'); // scan | result | done
  const c = SCAN_CASES[demo];
  const color = TONE[c.tone];

  const read = () => setPhase('result');
  const reset = () => setPhase('scan');

  return (
    <div style={{ minHeight: '100%', background: W.ink, color: '#F3ECCF', display: 'flex', flexDirection: 'column', fontFamily: TEXT }}>
      {/* header */}
      <div style={{ padding: '20px 22px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <img src={A + 'crest-gold.png'} alt="" style={{ height: 30 }} />
          <div>
            <div style={{ fontFamily: DISPLAY, fontSize: 15, color: '#F3ECCF', letterSpacing: '0.02em' }}>Control de acceso</div>
            <div style={{ fontSize: 10.5, color: 'rgba(243,236,207,0.5)', letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 2 }}>Piscina municipal</div>
          </div>
        </div>
        <button onClick={exit} style={{ background: 'rgba(243,236,207,0.1)', border: 0, borderRadius: 10, padding: 8, cursor: 'pointer', display: 'flex' }}><Icon name="x" size={18} color="#F3ECCF" /></button>
      </div>

      {/* camera viewer */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 22px 22px' }}>
        <div style={{ position: 'relative', flex: 1, minHeight: 300, borderRadius: 28, overflow: 'hidden',
          background: `radial-gradient(120% 100% at 50% 0%, ${W.sageLo} 0%, ${W.sage} 55%, ${W.sageDeep} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* gold corner brackets */}
          {[['8px', '8px', '0 0', null, '0', null, '0'], ].length === 0 ? null : null}
          <Corner pos={{ top: 18, left: 18 }} dirs={['top', 'left']} />
          <Corner pos={{ top: 18, right: 18 }} dirs={['top', 'right']} />
          <Corner pos={{ bottom: 18, left: 18 }} dirs={['bottom', 'left']} />
          <Corner pos={{ bottom: 18, right: 18 }} dirs={['bottom', 'right']} />
          {phase === 'scan' && (
            <React.Fragment>
              <div className="amp-scanline" style={{ position: 'absolute', left: 28, right: 28, height: 2, background: 'linear-gradient(90deg, transparent, #E1CA8C, transparent)', boxShadow: '0 0 14px #E1CA8C' }} />
              <div style={{ textAlign: 'center', color: 'rgba(243,236,207,0.66)' }}>
                <Icon name="qr" size={42} color="rgba(243,236,207,0.5)" />
                <div style={{ fontSize: 13, marginTop: 14, letterSpacing: '0.02em' }}>Apunta al código del visitante</div>
              </div>
            </React.Fragment>
          )}
          {phase !== 'scan' && (
            <div style={{ textAlign: 'center', color: 'rgba(243,236,207,0.8)' }}>
              <img src={A + 'crest-gold.png'} alt="" style={{ height: 44, opacity: 0.9 }} />
            </div>
          )}
        </div>

        {/* demo case selector */}
        {phase === 'scan' && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 10.5, color: 'rgba(243,236,207,0.45)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>Demo — simular lectura</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['ok', 'Permitido'], ['empty', 'Sin accesos'], ['used', 'Utilizada'], ['void', 'Anulado'], ['invalid', 'No válido']].map(([k, t]) => (
                <button key={k} onClick={() => setDemo(k)} style={{ cursor: 'pointer', borderRadius: 999, padding: '8px 13px', fontFamily: TEXT, fontSize: 12.5,
                  background: demo === k ? 'rgba(243,236,207,0.16)' : 'transparent', color: demo === k ? '#F3ECCF' : 'rgba(243,236,207,0.55)',
                  border: `1px solid ${demo === k ? 'rgba(225,202,140,0.5)' : 'rgba(243,236,207,0.14)'}` }}>{t}</button>
              ))}
            </div>
            <button onClick={read} style={{ marginTop: 16, width: '100%', cursor: 'pointer', borderRadius: 16, padding: '16px', border: 0,
              background: '#E1CA8C', color: W.sageDeep, fontFamily: TEXT, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
              <Icon name="scan" size={18} color={W.sageDeep} /> Leer código
            </button>
          </div>
        )}
      </div>

      {/* result sheet */}
      {phase !== 'scan' && (
        <div className="amp-sheet" style={{ background: W.ivory, color: W.ink, borderRadius: '28px 28px 0 0', padding: '26px 22px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: phase === 'done' ? 0 : 18 }}>
            <span style={{ display: 'flex', width: 46, height: 46, borderRadius: '50%', background: `color-mix(in srgb, ${phase === 'done' ? W.ok : color} 14%, transparent)`, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={phase === 'done' ? 'checkCircle' : c.icon} size={24} color={phase === 'done' ? W.ok : color} sw={1.7} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 21, fontWeight: 400, color: W.ink, lineHeight: 1.1 }}>{phase === 'done' ? 'Acceso registrado' : c.title}</div>
              {c.holder && <div style={{ fontSize: 13, color: W.inkSoft, marginTop: 4 }}>{c.holder}</div>}
            </div>
          </div>

          {phase === 'result' && (
            <React.Fragment>
              {c.product && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 14px', background: W.paper, borderRadius: 14, border: `1px solid ${W.hair}`, marginBottom: 14 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: THEMES[c.theme].field }} />
                  <span style={{ fontFamily: TEXT, fontSize: 14, color: W.ink, fontWeight: 500 }}>{c.product}</span>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: c.confirm ? 20 : 6 }}>
                {c.detail.map(([a, b], i) => (
                  <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '11px 0', borderTop: i ? `1px solid ${W.hair}` : 0 }}>
                    <span style={{ fontFamily: TEXT, fontSize: 13.5, color: W.inkSoft }}>{a}</span>
                    <span style={{ fontFamily: TEXT, fontSize: 13.5, color: W.ink, fontWeight: 500, textAlign: 'right' }}>{b}</span>
                  </div>
                ))}
              </div>
              {c.note && <p style={{ fontFamily: TEXT, fontSize: 13.5, color: W.inkSoft, lineHeight: 1.55, margin: '2px 0 18px' }}>{c.note}</p>}
              {c.confirm
                ? <WButton full size="lg" accent={W.ok} onClick={() => setPhase('done')}>Confirmar acceso</WButton>
                : <WButton full variant="ghost" onClick={reset}>Escanear otro código</WButton>}
            </React.Fragment>
          )}

          {phase === 'done' && (
            <div style={{ marginTop: 20 }}>
              <p style={{ fontFamily: TEXT, fontSize: 14, color: W.inkSoft, lineHeight: 1.6, margin: '0 0 18px' }}>
                Acceso descontado correctamente. Quedan <strong style={{ color: W.ink, fontWeight: 500 }}>11 de 15</strong> baños en este bono.
              </p>
              <WButton full size="lg" onClick={reset}><Icon name="scan" size={17} color="#F3ECCF" /> Escanear el siguiente</WButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
function Corner({ pos, dirs }) {
  const s = { position: 'absolute', width: 26, height: 26, ...pos };
  const b = `2px solid #E1CA8C`;
  const style = { ...s };
  if (dirs.includes('top')) style.borderTop = b;
  if (dirs.includes('bottom')) style.borderBottom = b;
  if (dirs.includes('left')) style.borderLeft = b;
  if (dirs.includes('right')) style.borderRight = b;
  const r = {};
  if (dirs.includes('top') && dirs.includes('left')) style.borderTopLeftRadius = 10;
  if (dirs.includes('top') && dirs.includes('right')) style.borderTopRightRadius = 10;
  if (dirs.includes('bottom') && dirs.includes('left')) style.borderBottomLeftRadius = 10;
  if (dirs.includes('bottom') && dirs.includes('right')) style.borderBottomRightRadius = 10;
  return <div style={style} />;
}
window.Scanner = Scanner;
