// ── Piscina municipal — Admin: shell, login, panel, indicators ──

function AdminLogin({ onLogin }) {
  const [user, setUser] = React.useState('ayuntamiento');
  const [pass, setPass] = React.useState('demo2026');
  const submit = () => onLogin();
  return (
    <div style={{ minHeight: '100vh', background: W.ivory, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: TEXT }}>
      <div style={{ position: 'relative', overflow: 'hidden', width: 'min(420px, 100%)', background: W.paper, borderRadius: 28, padding: 'clamp(28px,4vw,40px)', boxShadow: '0 24px 70px rgba(31,31,22,0.16)', border: `1px solid ${W.hair}` }}>
        <img src={A + 'church-gold.png'} alt="" style={{ position: 'absolute', left: -30, bottom: -20, height: 220, opacity: 0.05, pointerEvents: 'none' }} />
        <img src={A + 'castle-gold.png'} alt="" style={{ position: 'absolute', right: -40, top: -20, height: 200, opacity: 0.05, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 30 }}>
            <img src={A + 'crest-color.png'} alt="Escudo municipal" style={{ height: 56 }} />
            <h1 style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 400, color: W.ink, margin: '18px 0 4px' }}>Gestión de la piscina</h1>
            <p style={{ fontFamily: TEXT, fontSize: 13.5, color: W.inkSoft, margin: 0 }}>Acceso del personal del Ayuntamiento</p>
          </div>
          <WField label="Usuario" value={user} onChange={setUser} placeholder="ayuntamiento" icon="user" />
          <WField label="Contraseña" value={pass} onChange={setPass} placeholder="••••••••" icon="lock" type="password" />
          <WButton full size="lg" onClick={submit} style={{ marginTop: 6 }}>Entrar</WButton>
          <div style={{ textAlign: 'center', fontFamily: TEXT, fontSize: 12, color: W.inkMute, marginTop: 18 }}>Acceso de demostración · pulsa entrar</div>
        </div>
      </div>
    </div>
  );
}
window.AdminLogin = AdminLogin;

const ADMIN_NAV = [
  ['panel', 'Panel', 'grid'],
  ['sale', 'Venta presencial', 'euro'],
  ['search', 'Búsqueda', 'search'],
  ['indicators', 'Indicadores', 'chart'],
  ['scanner', 'Control de acceso', 'scan'],
];

function AdminShell({ section, go, onLogout, children }) {
  return (
    <div style={{ minHeight: '100vh', background: W.ivory, fontFamily: TEXT, display: 'flex', flexDirection: 'column' }}>
      {/* topbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px clamp(16px,3vw,28px)', background: W.paper, borderBottom: `1px solid ${W.hair}`, position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <img src={A + 'crest-color.png'} alt="" style={{ height: 32 }} />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 15, color: W.ink }}>Gestión de la piscina</div>
            <div style={{ fontSize: 10, color: W.gold, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 2 }}>Tu Ayuntamiento</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: TEXT, fontSize: 13, color: W.inkSoft }}>Personal · Taquilla</span>
          <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${W.hair}`, borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontFamily: TEXT, fontSize: 13, color: W.ink }}>Salir</button>
        </div>
      </div>
      <div className="amp-admin-body" style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
        {/* side nav */}
        <div className="amp-admin-side" style={{ width: 232, flexShrink: 0, borderRight: `1px solid ${W.hair}`, padding: '22px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {ADMIN_NAV.map(([k, t, ic]) => {
            const on = section === k;
            return (
              <button key={k} onClick={() => go(k)} style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', cursor: 'pointer',
                background: on ? W.well : 'transparent', color: on ? W.ink : W.inkSoft, border: 0, borderRadius: 12, padding: '11px 14px', fontFamily: TEXT, fontSize: 14, fontWeight: on ? 500 : 400, transition: 'background 200ms' }}>
                <Icon name={ic} size={18} color={on ? W.sage : W.inkMute} /> {t}
              </button>
            );
          })}
          <div style={{ marginTop: 'auto', paddingTop: 18 }}>
            <Ornament color={W.gold} width="100%" style={{ opacity: 0.5 }} />
            <div style={{ fontFamily: TEXT, fontSize: 11, color: W.inkMute, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>{FOOTER_LINE}</div>
          </div>
        </div>
        {/* content */}
        <div style={{ flex: 1, minWidth: 0, padding: 'clamp(24px,3vw,40px)' }}>{children}</div>
      </div>
    </div>
  );
}
window.AdminShell = AdminShell;

function Metric({ label, value, sub, icon, tone }) {
  return (
    <div style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 20, padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: W.inkSoft }}>{label}</span>
        <Icon name={icon} size={18} color={tone || W.gold} />
      </div>
      <div style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 300, color: W.ink, margin: '14px 0 4px', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{value}</div>
      <div style={{ fontFamily: TEXT, fontSize: 12.5, color: W.inkMute }}>{sub}</div>
    </div>
  );
}
window.Metric = Metric;

function AdminPanel({ go }) {
  const actions = [
    ['sale', 'Vender presencial', 'Emite un abono o entrada en taquilla.', 'euro'],
    ['search', 'Buscar un bono', 'Recupera, reenvía o anula una credencial.', 'search'],
    ['indicators', 'Indicadores', 'Accesos, ventas e ingresos del verano.', 'chart'],
    ['scanner', 'Control de acceso', 'Abre el escáner de entrada.', 'scan'],
  ];
  return (
    <div className="amp-rise">
      <Eyebrow>Martes · 3 de junio de 2026</Eyebrow>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(28px,3.4vw,36px)', color: W.ink, letterSpacing: '-0.02em', margin: '12px 0 30px' }}>Buenos días, Ayuntamiento.</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 18, marginBottom: 38 }}>
        <Metric label="Accesos hoy" value="142" sub="+18 frente a ayer" icon="users" />
        <Metric label="Ventas hoy" value="18" sub="9 online · 9 en taquilla" icon="ticket" />
        <Metric label="Ingresos hoy" value="386,50 €" sub="acumulado del día" icon="euro" />
        <Metric label="Bonos activos" value="314" sub="vigentes esta temporada" icon="wallet" />
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: W.inkSoft, marginBottom: 16 }}>Acciones rápidas</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {actions.map(([k, t, d, ic]) => (
          <button key={k} onClick={() => go(k)} style={{ textAlign: 'left', cursor: 'pointer', background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 20, padding: 22, transition: 'transform 250ms, box-shadow 250ms', display: 'flex', gap: 16, alignItems: 'flex-start' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 34px rgba(31,31,22,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            <span style={{ display: 'flex', width: 42, height: 42, borderRadius: 13, background: W.well, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={ic} size={20} color={W.sage} /></span>
            <span>
              <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 17, color: W.ink, marginBottom: 5 }}>{t}</span>
              <span style={{ display: 'block', fontFamily: TEXT, fontSize: 13.5, color: W.inkSoft, lineHeight: 1.5 }}>{d}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
window.AdminPanel = AdminPanel;

function Bars({ data, max, color, fmt }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(6px,1.4vw,16px)', height: 180 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ fontFamily: TEXT, fontSize: 11.5, color: W.inkSoft, fontVariantNumeric: 'tabular-nums' }}>{fmt ? fmt(d.v) : d.v}</div>
          <div style={{ width: '100%', maxWidth: 46, height: `${(d.v / max) * 130}px`, background: color, borderRadius: '8px 8px 4px 4px', transition: 'height 400ms var(--ease)' }} />
          <div style={{ fontFamily: TEXT, fontSize: 12, color: W.inkMute }}>{d.l}</div>
        </div>
      ))}
    </div>
  );
}

function AdminIndicators() {
  const accesos = [{ l: 'L', v: 96 }, { l: 'M', v: 124 }, { l: 'X', v: 142 }, { l: 'J', v: 118 }, { l: 'V', v: 165 }, { l: 'S', v: 248 }, { l: 'D', v: 232 }];
  const ingresos = [{ l: 'L', v: 210 }, { l: 'M', v: 286 }, { l: 'X', v: 386 }, { l: 'J', v: 305 }, { l: 'V', v: 442 }, { l: 'S', v: 690 }, { l: 'D', v: 612 }];
  const sales = [
    ['11:48', 'Bono 15 Baños', 'Taquilla · efectivo', '20,00 €'],
    ['11:32', 'Entrada adulto', 'Online · tarjeta', '6,50 €'],
    ['10:57', 'Abono Temporada', 'Online · tarjeta', '30,00 €'],
    ['10:20', 'Entrada menor', 'Taquilla · efectivo', '2,50 €'],
    ['09:46', 'Entrada adulto', 'Taquilla · tarjeta', '4,00 €'],
  ];
  return (
    <div className="amp-rise">
      <Eyebrow>Resumen del verano</Eyebrow>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 300, fontSize: 'clamp(28px,3.4vw,36px)', color: W.ink, letterSpacing: '-0.02em', margin: '12px 0 28px' }}>Indicadores</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 18, marginBottom: 30 }}>
        <Metric label="Accesos · semana" value="1.125" sub="media 161 / día" icon="users" />
        <Metric label="Ingresos · semana" value="2.931 €" sub="media 419 € / día" icon="euro" />
        <Metric label="Abonos vendidos" value="346" sub="de temporada y bonos" icon="wallet" />
        <Metric label="Ocupación media" value="68 %" sub="sobre el aforo" icon="chart" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18, marginBottom: 30 }}>
        <div style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 20, padding: 24 }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 17, color: W.ink, marginBottom: 6 }}>Accesos por día</div>
          <div style={{ fontFamily: TEXT, fontSize: 12.5, color: W.inkSoft, marginBottom: 22 }}>Última semana</div>
          <Bars data={accesos} max={260} color={W.sage} />
        </div>
        <div style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 20, padding: 24 }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 17, color: W.ink, marginBottom: 6 }}>Ingresos por día</div>
          <div style={{ fontFamily: TEXT, fontSize: 12.5, color: W.inkSoft, marginBottom: 22 }}>Última semana</div>
          <Bars data={ingresos} max={720} color={W.gold} fmt={(v) => `${v}€`} />
        </div>
      </div>
      <div style={{ background: W.paper, border: `1px solid ${W.hair}`, borderRadius: 20, padding: 24 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 17, color: W.ink, marginBottom: 18 }}>Ventas recientes</div>
        <div>
          {sales.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr 1fr auto', gap: 16, alignItems: 'center', padding: '13px 0', borderTop: i ? `1px solid ${W.hair}` : 0 }}>
              <span style={{ fontFamily: MONO, fontSize: 13, color: W.inkMute }}>{s[0]}</span>
              <span style={{ fontFamily: TEXT, fontSize: 14, color: W.ink }}>{s[1]}</span>
              <span style={{ fontFamily: TEXT, fontSize: 13, color: W.inkSoft }}>{s[2]}</span>
              <span style={{ fontFamily: TEXT, fontSize: 14, color: W.ink, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{s[3]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
window.AdminIndicators = AdminIndicators;
