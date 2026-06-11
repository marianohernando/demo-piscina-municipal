// ── Piscina municipal — Pool info, Privacy, Gallery ──

function InfoCard({ icon, title, children, style }) {
  return (
    <div style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 24, padding: 'clamp(22px,2.6vw,30px)', boxShadow: '0 4px 24px rgba(31,31,22,0.04)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ display: 'flex', width: 40, height: 40, borderRadius: 12, background: W.well, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={20} color={W.sage} />
        </span>
        <h3 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 400, color: W.ink, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function PoolInfo({ go }) {
  const rows = [
    ['Abono temporada', '30,00 €', 'toda la temporada'],
    ['Bono 15 baños', '20,00 €', '15 accesos'],
    ['Entrada adulto', '4,00 € / 6,50 €', 'entre semana / finde'],
    ['Entrada menor (–14)', '2,50 € / 4,00 €', 'entre semana / finde'],
  ];
  const horario = [
    ['Temporada', '15 de junio – 31 de agosto'],
    ['Todos los días', '11:00 – 20:30'],
    ['Baño nocturno (sáb)', '21:00 – 23:30'],
  ];
  const normas = [
    ['shower', 'Dúchate antes de entrar al agua.'],
    ['waves', 'Uso del gorro recomendado en el vaso grande.'],
    ['noFood', 'No se permite comida ni vidrio en la zona de agua.'],
    ['users', 'Los menores de 12 años entran acompañados.'],
  ];
  return (
    <div>
      {/* header — real pool photo goes here (placeholder until provided) */}
      <div style={{ position: 'relative', height: 'clamp(280px, 38vw, 420px)', overflow: 'hidden',
        background: `linear-gradient(152deg, #2E7C97 0%, #1AA3CE 42%, #46B2D6 100%)`,
        filter: 'saturate(0.9) contrast(0.98) brightness(1.02)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.16,
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.5) 0 2px, transparent 2px 22px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(31,31,22,0.06) 0%, rgba(246,238,217,0) 40%, rgba(246,238,217,0.55) 82%, #F6EED9 100%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.85)' }}>
          <Icon name="waves" size={30} color="rgba(255,255,255,0.85)" />
          <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.04em' }}>fotografía de la piscina municipal</span>
        </div>
        <div style={{ position: 'absolute', left: 'clamp(20px,5vw,56px)', bottom: 36, maxWidth: 720 }}>
          <Eyebrow color="rgba(255,255,255,0.85)">Información práctica</Eyebrow>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(30px,4.4vw,46px)', color: '#fff', letterSpacing: '-0.02em', margin: '12px 0 0', textShadow: '0 1px 20px rgba(31,31,22,0.18)' }}>Piscina municipal</h1>
        </div>
      </div>

      <Page style={{ paddingTop: 44 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <InfoCard icon="clock" title="Horarios">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {horario.map(([a, b], i) => (
                <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '13px 0', borderTop: i ? `1px solid ${W.hair}` : 0 }}>
                  <span style={{ fontFamily: TEXT, fontSize: 14.5, color: W.inkSoft }}>{a}</span>
                  <span style={{ fontFamily: TEXT, fontSize: 14.5, color: W.ink, fontWeight: 500 }}>{b}</span>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard icon="tag" title="Tarifas">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {rows.map(([a, b, c], i) => (
                <div key={a} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, padding: '13px 0', borderTop: i ? `1px solid ${W.hair}` : 0 }}>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontFamily: TEXT, fontSize: 14.5, color: W.ink, display: 'block' }}>{a}</span>
                    <span style={{ fontFamily: TEXT, fontSize: 12, color: W.inkMute }}>{c}</span>
                  </span>
                  <span style={{ fontFamily: TEXT, fontSize: 14.5, color: W.ink, fontWeight: 500, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{b}</span>
                </div>
              ))}
            </div>
            <WButton variant="ghost" size="sm" full style={{ marginTop: 18 }} onClick={() => go('abonos')}>Adquirir un abono <Icon name="arrow" size={15} color={W.gold} /></WButton>
          </InfoCard>

          <InfoCard icon="info" title="Normas de uso">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {normas.map(([ic, txt]) => (
                <div key={txt} style={{ display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                  <span style={{ flexShrink: 0, marginTop: 1 }}><Icon name={ic} size={19} color={W.gold} /></span>
                  <span style={{ fontFamily: TEXT, fontSize: 14.5, color: W.ink, lineHeight: 1.5 }}>{txt}</span>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard icon="pin" title="Dónde estamos">
            <p style={{ fontFamily: TEXT, fontSize: 14.5, color: W.ink, lineHeight: 1.7, margin: '0 0 16px' }}>
              Calle de la Piscina, s/n<br/>Tu pueblo
            </p>
            <div style={{ position: 'relative', height: 150, borderRadius: 16, overflow: 'hidden', background: W.well, border: `1px solid ${W.hair}` }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.5,
                backgroundImage: `linear-gradient(${W.hair} 1px, transparent 1px), linear-gradient(90deg, ${W.hair} 1px, transparent 1px)`, backgroundSize: '26px 26px' }} />
              <span style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)' }}><Icon name="pin" size={26} color={W.error} /></span>
              <span style={{ position: 'absolute', left: '50%', bottom: 12, transform: 'translateX(-50%)', fontFamily: MONO, fontSize: 11, color: W.inkMute }}>mapa de situación</span>
            </div>
          </InfoCard>
        </div>
      </Page>
      <WFooter go={go} />
    </div>
  );
}
window.PoolInfo = PoolInfo;

function Privacy({ go }) {
  const blocks = [
    ['Responsable del tratamiento', 'Tu Ayuntamiento. Plaza Mayor, s/n · Tu pueblo. Correo de contacto: contacto@tupiscina.es'],
    ['Datos que tratamos', 'Nombre y apellidos, correo electrónico y, cuando el producto es nominativo, el número de DNI. Para el pago, la pasarela trata los datos de tu tarjeta sin que nosotros los almacenemos.'],
    ['Finalidad', 'Emitir y gestionar tu acceso a la piscina municipal, enviarte la credencial con tu código y validar tu entrada en el control de acceso.'],
    ['Base legal', 'La ejecución de la relación que estableces al adquirir un abono o entrada, y el cumplimiento de las obligaciones del Ayuntamiento como prestador del servicio.'],
    ['Conservación', 'Conservamos tus datos mientras tu abono esté vigente y, después, durante los plazos legalmente exigibles. Transcurridos, se suprimen.'],
    ['Tus derechos', 'Puedes acceder, rectificar y suprimir tus datos, así como oponerte o limitar su tratamiento, escribiendo a contacto@tupiscina.es. También puedes reclamar ante la Agencia Española de Protección de Datos.'],
    ['Cookies', 'Esta web usa únicamente cookies técnicas necesarias para recordar tu sesión durante la compra. No utilizamos cookies de análisis ni de publicidad.'],
  ];
  return (
    <div>
      <Page max={760} style={{ paddingTop: 52 }}>
        <Eyebrow>Cumplimiento RGPD</Eyebrow>
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(30px,4vw,42px)', color: W.ink, letterSpacing: '-0.02em', margin: '14px 0 10px' }}>Privacidad y aviso legal</h1>
        <p style={{ fontFamily: TEXT, fontSize: 16, color: W.inkSoft, lineHeight: 1.65, maxWidth: 560, margin: '0 0 8px' }}>
          Tratamos tus datos con el mismo cuidado con que cuidamos tu piscina. Aquí te explicamos qué recogemos y para qué.
        </p>
        <Ornament color={W.gold} width={120} style={{ margin: '36px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {blocks.map(([t, d], i) => (
            <div key={t} style={{ padding: '24px 0', borderTop: `1px solid ${W.hair}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14, alignItems: 'start' }}>
                <span style={{ fontFamily: DISPLAY, fontSize: 14, color: W.gold, letterSpacing: '0.08em', paddingTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: 19, fontWeight: 400, color: W.ink, margin: '0 0 10px' }}>{t}</h3>
                  <p style={{ fontFamily: TEXT, fontSize: 15, color: W.inkSoft, lineHeight: 1.7, margin: 0 }}>{d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Page>
      <WFooter go={go} />
    </div>
  );
}
window.Privacy = Privacy;

function Gallery({ go }) {
  return (
    <div>
      <Page style={{ paddingTop: 52 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Eyebrow style={{ textAlign: 'center' }}>Patrimonio que cabe en el bolsillo</Eyebrow>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(30px,4vw,44px)', color: W.ink, letterSpacing: '-0.02em', margin: '14px 0 14px' }}>Las credenciales</h1>
          <p style={{ fontFamily: TEXT, fontSize: 16.5, color: W.inkSoft, lineHeight: 1.65, maxWidth: 540, margin: '0 auto' }}>
            Tres accesos, tres colores. Cada pase guarda el mismo cuidado y un código que es solo tuyo.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px,3vw,40px)', maxWidth: 1100, margin: '0 auto', alignItems: 'start' }}>
          {['temporada', 'banos', 'dia'].map(k => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <FullPass t={THEMES[k]} holder="María del Campo Herrero" id={k === 'temporada' ? 'PSC-2026-0042' : k === 'banos' ? 'PSC-B15-0318' : 'PSC-DIA-2207'} remaining="15" date="2 ago 2026" qrSize={150} />
              <div style={{ fontFamily: TEXT, fontSize: 13, color: W.inkSoft }}>{byId(k === 'temporada' ? 'temporada' : k === 'banos' ? 'banos' : 'adulto').tag}</div>
            </div>
          ))}
        </div>
      </Page>
      <WFooter go={go} />
    </div>
  );
}
window.Gallery = Gallery;
