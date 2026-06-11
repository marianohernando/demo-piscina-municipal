// ── Piscina municipal — Admin: sale, search, bond detail ──

const ADMIN_BONDS = [
  { id: 'PSC-2026-0042', theme: 'temporada', holder: 'María del Campo Herrero', dni: '12345678A', tone: 'ok', status: 'Vigente', product: 'Abono Temporada', extra: 'Acceso ilimitado', issued: '2 jun 2026' },
  { id: 'PSC-B15-0318', theme: 'banos', holder: 'Carlos Ruiz Bermejo', dni: '—', tone: 'ok', status: '12 / 15 accesos', product: 'Bono 15 Baños', extra: '12 de 15 disponibles', issued: '28 may 2026' },
  { id: 'PSC-B15-0204', theme: 'banos', holder: 'Jorge Antón Vega', dni: '—', tone: 'warn', status: 'Agotado', product: 'Bono 15 Baños', extra: '0 de 15 disponibles', issued: '14 may 2026' },
  { id: 'PSC-DIA-2207', theme: 'dia', holder: 'Visitante del día', dni: '—', tone: 'info', status: 'Utilizada', product: 'Entrada de Día', extra: 'Validada hoy 12:48', issued: '3 jun 2026' },
  { id: 'PSC-2026-0090', theme: 'temporada', holder: 'Lucía Prieto Caro', dni: '87654321B', tone: 'error', status: 'Anulado', product: 'Abono Temporada', extra: 'Anulado el 28 jul', issued: '20 may 2026' },
];
window.ADMIN_BONDS = ADMIN_BONDS;

function AdminSale() {
  const [sel, setSel] = React.useState('temporada');
  const [name, setName] = React.useState('');
  const [dni, setDni] = React.useState('');
  const [method, setMethod] = React.useState('efectivo');
  const [when, setWhen] = React.useState('week');
  const [register, setRegister] = React.useState(false);
  const [emitted, setEmitted] = React.useState(null);
  const emittedRef = React.useRef(null);
  const p = byId(sel), t = THEMES[p.theme];
  const unit = p.range ? (when === 'week' ? p.price : p.priceWeekend) : p.price;
  const valid = name.trim() && (!p.nominative || dni.trim().length >= 8);

  if (emitted) {
    return (
      <div className="amp-rise" style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
        <Icon name="checkCircle" size={42} color={W.ok} sw={1.4} />
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 30, color: W.ink, margin: '18px 0 8px' }}>Credencial emitida</h1>
        <p style={{ fontFamily: TEXT, fontSize: 15, color: W.inkSoft, margin: '0 0 26px' }}>{emitted.id} · {emitted.method === 'efectivo' ? 'Efectivo' : 'Tarjeta'} · {emitted.unit} €{emitted.register ? ' · acceso registrado' : ''}</p>
        <div ref={emittedRef} style={{ width: 300, maxWidth: '100%', margin: '0 auto' }}>
          <FullPass t={THEMES[byId(emitted.sel).theme]} holder={emitted.name} id={emitted.id} remaining={byId(emitted.sel).theme === 'banos' ? '15' : undefined} date={byId(emitted.sel).theme === 'dia' ? 'hoy · 2026' : undefined} qrSize={168} />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
          <WButton accent={t.field} onClick={() => printCredential(emittedRef.current)}><Icon name="printer" size={17} color={t.onField} /> Imprimir credencial</WButton>
          <WButton variant="ghost" onClick={() => downloadCredential(emittedRef.current, `${emitted.id}.png`)}><Icon name="download" size={16} color={W.gold} /> Descargar</WButton>
          <WButton variant="ghost" onClick={() => { setEmitted(null); setName(''); setDni(''); }}>Nueva venta</WButton>
        </div>
      </div>
    );
  }

  const emit = () => {
    const n = String(Math.floor(Math.random() * 9000) + 1000);
    const tag = p.theme === 'temporada' ? 'PSC-2026' : p.theme === 'banos' ? 'PSC-B15' : 'PSC-DIA';
    setEmitted({ id: `${tag}-${n}`, name: name.trim(), method, unit, register, sel });
  };

  return (
    <div className="amp-rise">
      <Eyebrow>Taquilla</Eyebrow>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(28px,3.4vw,36px)', color: W.ink, letterSpacing: '-0.02em', margin: '12px 0 28px' }}>Venta presencial</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 340px', gap: 'clamp(24px,3vw,40px)', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: W.inkSoft, marginBottom: 14 }}>Producto</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 28 }}>
            {CATALOG.map(prod => {
              const on = sel === prod.id, pt = THEMES[prod.theme];
              return (
                <button key={prod.id} onClick={() => setSel(prod.id)} style={{ textAlign: 'left', cursor: 'pointer', borderRadius: 16, padding: '15px 16px',
                  background: on ? W.well : W.paper, border: `1px solid ${on ? W.gold : W.hair}`, transition: 'all 200ms', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 4, background: pt.field, flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontFamily: TEXT, fontSize: 14, fontWeight: 500, color: W.ink }}>{prod.name}</span>
                    <span style={{ display: 'block', fontFamily: TEXT, fontSize: 12.5, color: W.inkSoft, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{priceLabel(prod)}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {p.range && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: W.inkSoft, marginBottom: 10 }}>Tarifa</div>
              <div style={{ display: 'flex', gap: 10, maxWidth: 360 }}>
                <Seg active={when === 'week'} onClick={() => setWhen('week')} label="Entre semana" price={`${p.price} €`} />
                <Seg active={when === 'weekend'} onClick={() => setWhen('weekend')} label="Finde o festivo" price={`${p.priceWeekend} €`} />
              </div>
            </div>
          )}

          <WField label="Nombre y apellidos" value={name} onChange={setName} placeholder="Nombre del titular" icon="user" />
          {p.nominative && <WField label="DNI" value={dni} onChange={setDni} placeholder="00000000A" icon="ticket" mono hint="Obligatorio para el abono de temporada." />}

          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: W.inkSoft, marginBottom: 10 }}>Método de pago</div>
            <div style={{ display: 'flex', gap: 10, maxWidth: 360 }}>
              <Seg active={method === 'efectivo'} onClick={() => setMethod('efectivo')} label="Efectivo" price="en taquilla" />
              <Seg active={method === 'tarjeta'} onClick={() => setMethod('tarjeta')} label="Tarjeta" price="datáfono" />
            </div>
          </div>

          <label onClick={() => setRegister(!register)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, cursor: 'pointer', padding: '14px 16px', background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 14 }}>
            <span>
              <span style={{ display: 'block', fontFamily: TEXT, fontSize: 14, fontWeight: 500, color: W.ink }}>Registrar acceso ahora</span>
              <span style={{ display: 'block', fontFamily: TEXT, fontSize: 12.5, color: W.inkSoft, marginTop: 2 }}>Descuenta una entrada al emitir.</span>
            </span>
            <span style={{ flexShrink: 0, width: 46, height: 28, borderRadius: 999, background: register ? W.sage : W.hair, position: 'relative', transition: 'background 200ms' }}>
              <span style={{ position: 'absolute', top: 3, left: register ? 21 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left 200ms', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </span>
          </label>
        </div>

        {/* summary */}
        <div style={{ position: 'sticky', top: 90, background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 22, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><PassPreview t={t} width={150} /></div>
          <SumRow label={p.name} val="" />
          <div style={{ height: 1, background: W.hair, margin: '14px 0' }} />
          <SumRow label="Importe" val={`${unit} €`} />
          <SumRow label="Pago" val={method === 'efectivo' ? 'Efectivo' : 'Tarjeta'} />
          <div style={{ height: 1, background: W.hair, margin: '14px 0' }} />
          <SumRow label="Total" val={`${unit} €`} bold />
          <WButton full size="lg" accent={t.field} disabled={!valid} style={{ marginTop: 18 }} onClick={emit}><Icon name="printer" size={17} color={t.onField} /> Emitir e imprimir</WButton>
        </div>
      </div>
    </div>
  );
}
window.AdminSale = AdminSale;

function AdminSearch({ onOpen }) {
  const [q, setQ] = React.useState('');
  const res = ADMIN_BONDS.filter(b => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return b.holder.toLowerCase().includes(s) || b.dni.toLowerCase().includes(s) || b.id.toLowerCase().includes(s);
  });
  return (
    <div className="amp-rise">
      <Eyebrow>Recuperación de credenciales</Eyebrow>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(28px,3.4vw,36px)', color: W.ink, letterSpacing: '-0.02em', margin: '12px 0 24px' }}>Búsqueda</h1>
      <div style={{ maxWidth: 480, marginBottom: 28 }}>
        <WField label="Buscar por nombre, DNI o id" value={q} onChange={setQ} placeholder="María, 12345678A, PSC-2026-0042…" icon="search" style={{ marginBottom: 0 }} />
      </div>
      <div style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto', gap: 16, padding: '14px 22px', borderBottom: `1px solid ${W.hair}`, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: W.inkSoft }}>
          <span>Titular</span><span>Id</span><span>Producto</span><span>Estado</span>
        </div>
        {res.length === 0 && <div style={{ padding: '32px 22px', fontFamily: TEXT, fontSize: 14, color: W.inkSoft, textAlign: 'center' }}>No hay resultados para “{q}”.</div>}
        {res.map((b, i) => (
          <button key={b.id} onClick={() => onOpen(b)} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto', gap: 16, alignItems: 'center',
            padding: '16px 22px', border: 0, borderTop: i ? `1px solid ${W.hair}` : 0, background: 'transparent', transition: 'background 150ms' }}
            onMouseEnter={e => e.currentTarget.style.background = W.well} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span>
              <span style={{ display: 'block', fontFamily: TEXT, fontSize: 14.5, color: W.ink }}>{b.holder}</span>
              <span style={{ display: 'block', fontFamily: TEXT, fontSize: 12, color: W.inkMute, marginTop: 2 }}>{b.dni !== '—' ? b.dni : b.issued}</span>
            </span>
            <span style={{ fontFamily: MONO, fontSize: 12.5, color: W.inkSoft }}>{b.id}</span>
            <span style={{ fontFamily: TEXT, fontSize: 13.5, color: W.inkSoft }}>{b.product}</span>
            <Pill tone={b.tone}>{b.status}</Pill>
          </button>
        ))}
      </div>
    </div>
  );
}
window.AdminSearch = AdminSearch;

function AdminBondDetail({ bond, back }) {
  const b = bond, t = THEMES[b.theme];
  const [anulado, setAnulado] = React.useState(b.tone === 'error');
  const history = [
    ['Hoy · 12:48', 'Acceso validado en entrada'],
    ['Ayer · 19:02', 'Acceso validado en entrada'],
    ['28 may · 11:15', 'Credencial emitida online'],
  ];
  return (
    <div className="amp-rise">
      <span onClick={back} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: TEXT, fontSize: 14, color: W.inkSoft, cursor: 'pointer', marginBottom: 24 }}>
        <Icon name="back" size={18} /> Volver a la búsqueda
      </span>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'clamp(28px,4vw,48px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><PassPreview t={t} width={260} showQR /></div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
            <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(26px,3.2vw,34px)', color: W.ink, letterSpacing: '-0.01em', margin: 0 }}>{b.holder}</h1>
            <Pill tone={anulado ? 'error' : b.tone}>{anulado ? 'Anulado' : b.status}</Pill>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 13.5, color: W.inkSoft, marginBottom: 24 }}>{b.id}</div>

          <div style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 18, padding: '6px 22px', marginBottom: 24 }}>
            {[['Producto', b.product], ['Estado', b.extra], ['DNI', b.dni], ['Emitido', b.issued]].map(([a, c], i) => (
              <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '14px 0', borderTop: i ? `1px solid ${W.hair}` : 0 }}>
                <span style={{ fontFamily: TEXT, fontSize: 13.5, color: W.inkSoft }}>{a}</span>
                <span style={{ fontFamily: TEXT, fontSize: 13.5, color: W.ink, fontWeight: 500 }}>{c}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 30 }}>
            <WButton variant="ghost" onClick={() => window.print()}><Icon name="printer" size={16} color={W.gold} /> Reimprimir</WButton>
            <WButton variant="ghost"><Icon name="mail" size={16} color={W.gold} /> Reenviar por correo</WButton>
            {!anulado && <WButton variant="outline" accent={W.error} onClick={() => setAnulado(true)}><Icon name="ban" size={16} color={W.error} /> Anular</WButton>}
          </div>

          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: W.inkSoft, marginBottom: 14 }}>Historial de accesos</div>
          <div>
            {history.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderTop: i ? `1px solid ${W.hair}` : 0 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: W.gold, flexShrink: 0 }} />
                <span style={{ fontFamily: TEXT, fontSize: 13.5, color: W.inkSoft, width: 130, flexShrink: 0 }}>{h[0]}</span>
                <span style={{ fontFamily: TEXT, fontSize: 13.5, color: W.ink }}>{h[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
window.AdminBondDetail = AdminBondDetail;
