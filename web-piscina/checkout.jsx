// ── Piscina municipal — checkout: Buy, Pay, Success, Cancelled ──

function Check({ checked, onChange, children }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
      <span onClick={() => onChange(!checked)} style={{ flexShrink: 0, marginTop: 1, width: 22, height: 22, borderRadius: 7,
        border: `1px solid ${checked ? W.sage : W.hair}`, background: checked ? W.sage : W.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms' }}>
        {checked && <Icon name="check" size={14} color="#F3ECCF" sw={2.4} />}
      </span>
      <span style={{ fontFamily: TEXT, fontSize: 13.5, color: W.inkSoft, lineHeight: 1.55 }}>{children}</span>
    </label>
  );
}

function BuyView({ product, go, onPay }) {
  const p = product, t = THEMES[p.theme];
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [dni, setDni] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [when, setWhen] = React.useState('week'); // for range products
  const unit = p.range ? (when === 'week' ? p.price : p.priceWeekend) : p.price;
  const emailOk = /.+@.+\..+/.test(email);
  const valid = name.trim() && emailOk && consent && (!p.nominative || dni.trim().length >= 8);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Motif src="engravings/campos-1.png" opacity={0.12} width={1000} pos={{ left: '50%', bottom: 30, transform: 'translateX(-50%)' }} />
      </div>
      <Page style={{ position: 'relative', zIndex: 1, paddingTop: 36, minHeight: '60vh' }}>
        <span onClick={() => go('detail')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: TEXT, fontSize: 14, color: W.inkSoft, cursor: 'pointer', marginBottom: 30 }}>
          <Icon name="back" size={18} /> Volver
        </span>
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(28px,3.6vw,38px)', color: W.ink, letterSpacing: '-0.02em', margin: '0 0 36px' }}>Completa tu compra</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.9fr) 1.1fr', gap: 'clamp(32px,4vw,56px)', alignItems: 'start' }}>
          {/* summary */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: W.inkSoft, marginBottom: 16 }}>Tu pedido</div>
            <div style={{ display: 'flex', gap: 20, background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 24, padding: 22, boxShadow: '0 14px 40px rgba(31,31,22,0.08)' }}>
              <PassPreview t={t} width={120} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 18, color: W.ink, lineHeight: 1.2 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: W.inkSoft, marginTop: 6 }}>{p.tag}</div>
                <div style={{ height: 1, background: W.hair, margin: '18px 0' }} />
                <SumRow label={p.range ? (when === 'week' ? 'Tarifa entre semana' : 'Tarifa fin de semana') : 'Acceso'} val={`${unit} €`} />
                <SumRow label="Gestión" val="0,00 €" />
                <div style={{ height: 1, background: W.hair, margin: '14px 0' }} />
                <SumRow label="Total" val={`${unit} €`} bold />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 18, color: W.inkSoft, fontSize: 12.5 }}>
              <Icon name="lock" size={15} color={W.gold} /> Pago cifrado. No guardamos los datos de tu tarjeta.
            </div>
          </div>

          {/* form */}
          <div style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 26, padding: 'clamp(24px,3vw,34px)', boxShadow: '0 14px 40px rgba(31,31,22,0.10)' }}>
            {p.range && (
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: W.inkSoft, marginBottom: 10 }}>Día de la visita</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Seg active={when === 'week'} onClick={() => setWhen('week')} label="Entre semana" price={`${p.price} €`} />
                  <Seg active={when === 'weekend'} onClick={() => setWhen('weekend')} label="Finde o festivo" price={`${p.priceWeekend} €`} />
                </div>
              </div>
            )}
            <WField label="Nombre y apellidos" value={name} onChange={setName} placeholder="María del Campo Herrero" icon="user" />
            <WField label="Correo electrónico" value={email} onChange={setEmail} placeholder="tu@correo.es" icon="mail" hint="Te enviaremos la credencial a este correo." />
            {p.nominative && <WField label="DNI" value={dni} onChange={setDni} placeholder="00000000A" icon="ticket" mono hint="El abono de temporada es nominativo." />}
            <div style={{ height: 1, background: W.hair, margin: '6px 0 22px' }} />
            <Check checked={consent} onChange={setConsent}>
              He leído y acepto la <span onClick={(e) => { e.stopPropagation(); go('privacy'); }} style={{ color: W.gold, textDecoration: 'underline', cursor: 'pointer' }}>política de privacidad</span> y el tratamiento de mis datos para emitir y gestionar el acceso.
            </Check>
            <WButton full size="lg" accent={t.field} disabled={!valid} style={{ marginTop: 24 }}
              onClick={() => onPay({ product: p, buyer: { name: name.trim(), email: email.trim(), dni: dni.trim() }, unit, when })}>
              <Icon name="lock" size={16} color={t.onField} /> Pagar {unit} €
            </WButton>
            {!valid && <div style={{ fontFamily: TEXT, fontSize: 12, color: W.inkMute, textAlign: 'center', marginTop: 12 }}>Completa tus datos y acepta la privacidad para continuar.</div>}
          </div>
        </div>
      </Page>
      <WFooter go={go} />
    </div>
  );
}
function SumRow({ label, val, bold }) {
  return <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: TEXT, fontSize: bold ? 16 : 13.5, color: bold ? W.ink : W.inkSoft, fontWeight: bold ? 600 : 400, padding: '4px 0', fontVariantNumeric: 'tabular-nums' }}><span>{label}</span><span>{val}</span></div>;
}
function Seg({ active, onClick, label, price }) {
  return (
    <button onClick={onClick} style={{ flex: 1, textAlign: 'left', cursor: 'pointer', borderRadius: 14, padding: '12px 14px',
      background: active ? W.well : W.paper, border: `1px solid ${active ? W.gold : W.hair}`, transition: 'all 200ms', fontFamily: TEXT }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: W.ink }}>{label}</div>
      <div style={{ fontSize: 13, color: W.inkSoft, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>{price}</div>
    </button>
  );
}
window.BuyView = BuyView;

function PayView({ order, onDone, onCancel }) {
  React.useEffect(() => {
    const id = setTimeout(onDone, 2600);
    return () => clearTimeout(id);
  }, []);
  return (
    <div style={{ minHeight: '78vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
      <img src={A + 'crest-color.png'} alt="Escudo municipal" style={{ height: 64, opacity: 0.96, marginBottom: 28 }} />
      <div className="amp-spin" style={{ width: 38, height: 38, borderRadius: '50%', border: `2.5px solid ${W.hair}`, borderTopColor: W.gold, marginBottom: 28 }} />
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 28, color: W.ink, letterSpacing: '-0.01em', margin: '0 0 12px' }}>Te llevamos a un pago seguro</h1>
      <p style={{ fontFamily: TEXT, fontSize: 15.5, color: W.inkSoft, lineHeight: 1.6, maxWidth: 380, margin: '0 0 8px' }}>
        Estamos conectando con la pasarela de pago. No cierres esta ventana.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: TEXT, fontSize: 12.5, color: W.inkMute, margin: '6px 0 32px' }}>
        <Icon name="lock" size={14} color={W.gold} /> Conexión cifrada · {order ? `${order.unit} €` : ''}
      </div>
      <WButton variant="ghost" onClick={onCancel}>Cancelar</WButton>
    </div>
  );
}
window.PayView = PayView;

function SuccessView({ order, passId, go, onHome }) {
  const p = order.product, t = THEMES[p.theme];
  const passRef = React.useRef(null);
  const date = p.theme === 'dia' ? (order.when === 'weekend' ? 'sáb · finde 2026' : 'hoy · 2026') : undefined;
  return (
    <div>
      <Page max={620} style={{ paddingTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Icon name="checkCircle" size={46} color={W.ok} sw={1.4} />
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(30px,4vw,38px)', color: W.ink, letterSpacing: '-0.01em', margin: '22px 0 12px' }}>Tu acceso está listo</h1>
        <p style={{ fontFamily: TEXT, fontSize: 16, color: W.inkSoft, lineHeight: 1.65, maxWidth: 420, margin: '0 0 14px' }}>
          Lo hemos enviado a <strong style={{ color: W.ink, fontWeight: 500 }}>{order.buyer.email}</strong>. Llévalo siempre contigo.
        </p>
        <div ref={passRef} style={{ width: 320, maxWidth: '100%', marginTop: 24 }}>
          <FullPass t={t} holder={order.buyer.name} id={passId} date={date} remaining={p.theme === 'banos' ? '15' : undefined} qrSize={176} />
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap', justifyContent: 'center' }}>
          <WButton accent={t.field} onClick={() => downloadCredential(passRef.current, `credencial-${passId}.png`)}><Icon name="download" size={17} color={t.onField} /> Descargar credencial</WButton>
          <WButton variant="ghost" onClick={onHome}>Volver al inicio</WButton>
        </div>
        <p style={{ fontFamily: TEXT, fontSize: 14, color: W.inkSoft, marginTop: 32 }}>Muestra este código en el acceso. Eso es todo.</p>
      </Page>
      <WFooter go={go} />
    </div>
  );
}
window.SuccessView = SuccessView;

function CancelledView({ order, go, onRetry, onHome }) {
  return (
    <div>
      <Page max={560} style={{ paddingTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '60vh' }}>
        <span style={{ display: 'flex', width: 56, height: 56, borderRadius: '50%', background: W.well, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="x" size={24} color={W.inkSoft} />
        </span>
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(28px,3.6vw,34px)', color: W.ink, letterSpacing: '-0.01em', margin: '24px 0 12px' }}>Has cancelado el pago</h1>
        <p style={{ fontFamily: TEXT, fontSize: 16, color: W.inkSoft, lineHeight: 1.65, maxWidth: 400, margin: '0 0 32px' }}>
          No se ha realizado ningún cargo. Tu pedido sigue disponible cuando quieras retomarlo.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <WButton onClick={onRetry}>Reintentar el pago</WButton>
          <WButton variant="ghost" onClick={onHome}>Volver al inicio</WButton>
        </div>
      </Page>
      <WFooter go={go} />
    </div>
  );
}
window.CancelledView = CancelledView;
