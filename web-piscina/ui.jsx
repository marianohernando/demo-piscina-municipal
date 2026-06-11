// ── Piscina municipal — UI primitives ──

// Inline Lucide-style icons (outline, 1.6 stroke, currentColor)
function Icon({ name, size = 20, color = 'currentColor', sw = 1.6, style }) {
  const P = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    back: <path d="M19 12H5M12 19l-7-7 7-7" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    lock: <g><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></g>,
    mail: <g><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></g>,
    check: <path d="M20 6 9 17l-5-5" />,
    checkCircle: <g><circle cx="12" cy="12" r="9" /><path d="m9 12 2 2 4-4" /></g>,
    x: <path d="M18 6 6 18M6 6l12 12" />,
    xCircle: <g><circle cx="12" cy="12" r="9" /><path d="m15 9-6 6M9 9l6 6" /></g>,
    alert: <g><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z" /></g>,
    ban: <g><circle cx="12" cy="12" r="9" /><path d="m5.6 5.6 12.8 12.8" /></g>,
    sun: <g><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g>,
    wallet: <g><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /><path d="M21 11h-5a2 2 0 0 0 0 4h5v-4Z" /></g>,
    clock: <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
    tag: <g><path d="M3 11.5V5a2 2 0 0 1 2-2h6.5a2 2 0 0 1 1.4.6l7.5 7.5a2 2 0 0 1 0 2.8l-6.6 6.6a2 2 0 0 1-2.8 0L3.6 13a2 2 0 0 1-.6-1.4Z" /><circle cx="7.5" cy="7.5" r="1.3" /></g>,
    pin: <g><path d="M12 21s7-6.3 7-11a7 7 0 0 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></g>,
    scan: <g><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /></g>,
    qr: <g><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v.01M17 21h.01M21 21v-3M21 17.5h-1" /></g>,
    search: <g><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></g>,
    user: <g><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></g>,
    users: <g><circle cx="9" cy="8" r="3.5" /><path d="M3 21a6 6 0 0 1 12 0" /><path d="M16 5.5a3.5 3.5 0 0 1 0 7M21 21a6 6 0 0 0-4-5.6" /></g>,
    calendar: <g><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></g>,
    ticket: <g><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2 2 2 0 0 0 0-4 2 2 0 0 1-2-2H5a2 2 0 0 1-2-2Z" transform="translate(0 1)" /></g>,
    chart: <g><path d="M3 3v18h18" /><path d="M7 15v3M12 10v8M17 6v12" /></g>,
    euro: <g><path d="M18 7a7 7 0 1 0 0 10" /><path d="M4 10h9M4 14h9" /></g>,
    printer: <g><path d="M6 9V3h12v6" /><rect x="6" y="14" width="12" height="7" rx="1" /><path d="M6 18H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2" /></g>,
    refresh: <g><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" /></g>,
    droplet: <path d="M12 3.2 6.3 9.5a8 8 0 1 0 11.4 0L12 3.2Z" />,
    shield: <path d="M12 3 4 6v6c0 5 3.4 7.7 8 9 4.6-1.3 8-4 8-9V6l-8-3Z" />,
    grid: <g><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></g>,
    cart: <g><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h2.5l2.2 12.4a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L20 7H6" /></g>,
    list: <g><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></g>,
    plus: <path d="M12 5v14M5 12h14" />,
    info: <g><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></g>,
    external: <g><path d="M14 4h6v6M20 4l-9 9" /><path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" /></g>,
    download: <g><path d="M12 3v12M7 11l5 5 5-5" /><path d="M5 21h14" /></g>,
    waves: <g><path d="M2 6c1.5 1.4 3 1.4 4.5 0S9.5 4.6 11 6s3 1.4 4.5 0S18.5 4.6 20 6" /><path d="M2 12c1.5 1.4 3 1.4 4.5 0S9.5 10.6 11 12s3 1.4 4.5 0S18.5 10.6 20 12" /><path d="M2 18c1.5 1.4 3 1.4 4.5 0S9.5 16.6 11 18s3 1.4 4.5 0S18.5 16.6 20 18" /></g>,
    shower: <g><path d="M4 21v-9a5 5 0 0 1 10 0M14 6l4-4M16 4l3 3M12 13v.01M9 16v.01M15 16v.01M11 19v.01M14 19v.01" /></g>,
    noFood: <g><circle cx="12" cy="12" r="9" /><path d="M9 8v4M15 8v8M9 14v2M5.6 5.6l12.8 12.8" /></g>,
    flag: <g><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></g>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>{P[name]}</svg>;
}
window.Icon = Icon;

function WButton({ children, variant = 'primary', accent, onClick, full, size = 'md', disabled, style }) {
  const pad = size === 'lg' ? '16px 26px' : size === 'sm' ? '10px 16px' : '13px 22px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 14 : 15;
  const base = { fontFamily: TEXT, fontSize: fs, fontWeight: 500, borderRadius: 14, padding: pad,
    cursor: disabled ? 'not-allowed' : 'pointer', border: 0, transition: 'opacity 150ms, background 150ms, transform 150ms',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: full ? '100%' : undefined,
    opacity: disabled ? 0.45 : 1, ...style };
  const ac = accent || W.sage;
  const v = variant === 'primary' ? { background: ac, color: '#F3ECCF' }
    : variant === 'gold' ? { background: W.gold, color: '#fff' }
    : variant === 'ghost' ? { background: 'transparent', color: W.ink, boxShadow: `inset 0 0 0 1px ${W.hair}` }
    : { background: 'transparent', color: ac, boxShadow: `inset 0 0 0 1px ${ac}` };
  return <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{ ...base, ...v }}
    onMouseEnter={e => { if (!disabled && variant === 'primary') e.currentTarget.style.opacity = 0.9; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; if (!disabled && variant === 'primary') e.currentTarget.style.opacity = 1; }}
    onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = 'scale(0.98)'; }}
    onMouseUp={e => e.currentTarget.style.transform = 'none'}>{children}</button>;
}
window.WButton = WButton;

function WField({ label, value, onChange, placeholder, hint, mono, type = 'text', icon, optional, style }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'block', marginBottom: 18, ...style }}>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: W.inkSoft }}>{label}</span>
        {optional && <span style={{ fontSize: 11, color: W.inkMute, letterSpacing: 0, textTransform: 'none' }}>opcional</span>}
      </span>
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}><Icon name={icon} size={17} color={focus ? W.gold : W.inkMute} /></span>}
        <input value={value} onChange={e => onChange && onChange(e.target.value)} placeholder={placeholder} type={type}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ width: '100%', boxSizing: 'border-box', fontFamily: mono ? MONO : TEXT,
            fontSize: 16, color: W.ink, background: W.paper, borderRadius: 14, padding: icon ? '14px 16px 14px 42px' : '14px 16px',
            border: `1px solid ${focus ? W.gold : W.hair}`, outline: 'none',
            boxShadow: focus ? '0 0 0 3px rgba(184,155,94,0.18)' : 'none', transition: 'border-color 250ms, box-shadow 250ms' }} />
      </div>
      {hint && <span style={{ display: 'block', fontSize: 12, color: W.inkSoft, marginTop: 7 }}>{hint}</span>}
    </label>
  );
}
window.WField = WField;

// status pill (functional colors)
function Pill({ tone = 'ok', children, style }) {
  const map = { ok: W.ok, warn: W.warn, error: W.error, info: W.info, neutral: W.inkSoft };
  const c = map[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: TEXT, fontSize: 12.5, fontWeight: 500,
      color: c, background: `color-mix(in srgb, ${c} 12%, transparent)`, borderRadius: 999, padding: '5px 12px', whiteSpace: 'nowrap', ...style }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c }} /> {children}
    </span>
  );
}
window.Pill = Pill;

// crest + wordmark lockup
function CrestLockup({ size = 38, light, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: onClick ? 'pointer' : 'default' }}>
      <img src={A + 'crest-color.png'} alt="Escudo municipal" style={{ height: size }} />
      <div style={{ lineHeight: 1.05 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: size * 0.42, color: light ? '#F3ECCF' : W.ink, letterSpacing: '0.01em' }}>Piscina municipal</div>
        <div style={{ fontSize: size * 0.25, color: light ? 'rgba(243,236,207,0.6)' : W.gold, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 3 }}>Tu municipio</div>
      </div>
    </div>
  );
}
window.CrestLockup = CrestLockup;

// eyebrow label
function Eyebrow({ children, color, style }) {
  return <div style={{ fontFamily: TEXT, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: color || W.gold, ...style }}>{children}</div>;
}
window.Eyebrow = Eyebrow;

// price (live, from catalog product)
function priceLabel(p) {
  if (p.range) return `${p.price}\u2013${p.priceWeekend} €`;
  return `${p.price} €`;
}
window.priceLabel = priceLabel;
