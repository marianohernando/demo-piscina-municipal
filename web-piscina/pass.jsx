// ── Piscina municipal — credential components ──

function FauxQR({ size = 200, seed = 7, fg = '#1F1F16', bg = '#F3E6C7', radius = 6 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    cv.width = size * dpr; cv.height = size * dpr;
    const ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
    const N = 29, m = size / N;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = fg;
    let s = seed; const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      if ((x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9)) continue;
      if (rnd() > 0.52) ctx.fillRect(x * m, y * m, m, m);
    }
    const finder = (fx, fy) => {
      ctx.fillStyle = fg; ctx.fillRect(fx * m, fy * m, 7 * m, 7 * m);
      ctx.fillStyle = bg; ctx.fillRect((fx + 1) * m, (fy + 1) * m, 5 * m, 5 * m);
      ctx.fillStyle = fg; ctx.fillRect((fx + 2) * m, (fy + 2) * m, 3 * m, 3 * m);
    };
    finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
  }, [size, seed, fg, bg]);
  return <canvas ref={ref} style={{ width: size, height: size, display: 'block', borderRadius: radius }} />;
}
window.FauxQR = FauxQR;

function Ornament({ color, width = 200, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width, opacity: 0.85, ...style }}>
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.5 }} />
      <div style={{ width: 7, height: 7, background: color, transform: 'rotate(45deg)' }} />
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.5 }} />
    </div>
  );
}
window.Ornament = Ornament;

function PassMiniIcon({ name, color, size = 17 }) {
  const P = {
    user: <g><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></g>,
    calendar: <g><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></g>,
    ticket: <g><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2 2 2 0 0 0 0-4 2 2 0 0 1-2-2H5a2 2 0 0 1-2-2Z" transform="translate(0 1)" /><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 0 0 4v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v0a2 2 0 0 0 0-4Z" /></g>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{P[name]}</svg>;
}

// ── Web portrait preview (compact, no fields) ──
function PassPreview({ t, width = 250, showQR = false, style }) {
  const bg = t.bgGradient || `radial-gradient(125% 95% at 50% 6%, ${t.fieldLo} 0%, ${t.field} 50%, ${t.edge} 100%)`;
  const Crest = () => <img src={t.crest} alt="" style={{ height: t.key === 'dia' ? 48 : 42, opacity: 0.96 }} />;
  const Titl = () => <div style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 18, letterSpacing: '0.09em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.1, color: t.onField }}>{t.name}</div>;
  return (
    <div style={{ position: 'relative', width, aspectRatio: '0.62', borderRadius: 22, overflow: 'hidden', background: bg,
      boxShadow: '0 18px 50px rgba(31,31,22,0.26)', color: t.onField, fontFamily: TEXT,
      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 18px', boxSizing: 'border-box', ...style }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '42%', height: '70%', overflow: 'hidden', opacity: t.illusOpacity, zIndex: 0, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(to top, #000 60%, transparent 96%)', maskImage: 'linear-gradient(to top, #000 60%, transparent 96%)' }}>
        <img src={t.church} alt="" style={{ position: 'absolute', left: '-8%', bottom: 0, height: '100%' }} />
      </div>
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: '42%', height: '70%', overflow: 'hidden', opacity: t.illusOpacity, zIndex: 0, pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(to top, #000 60%, transparent 96%)', maskImage: 'linear-gradient(to top, #000 60%, transparent 96%)' }}>
        <img src={t.castle} alt="" style={{ position: 'absolute', right: '-10%', bottom: 0, height: '100%' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', flex: 1 }}>
        {t.layout === 'A'
          ? <React.Fragment><Titl /><div style={{ marginTop: 12 }}><Crest /></div></React.Fragment>
          : <React.Fragment><Crest /><div style={{ marginTop: 10 }}><Titl /></div></React.Fragment>}
        {t.subtitle && <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.14em', color: t.soft, marginTop: 7 }}>{t.subtitle}</div>}
        {showQR
          ? <div style={{ marginTop: 16, background: t.qrBg, borderRadius: 16, padding: 11, position: 'relative' }}>
              {t.qrBorder && <div style={{ position: 'absolute', inset: 6, borderRadius: 11, border: `1.5px solid ${t.qrBorder}`, opacity: 0.5 }} />}
              <FauxQR size={118} seed={t.seed} fg={t.qrInk} bg={t.qrBg} radius={4} />
            </div>
          : <div style={{ flex: 1 }} />}
        <div style={{ marginTop: 'auto', paddingTop: 16 }}><Ornament color={t.accent} width={110} /></div>
      </div>
    </div>
  );
}
window.PassPreview = PassPreview;

function Title({ t, size = 27 }) {
  return <div style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: size, letterSpacing: '0.09em', textAlign: 'center', lineHeight: 1.05, color: t.onField }}>{t.name}</div>;
}
function Subtitle({ t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, width: '88%', maxWidth: 300 }}>
      <div style={{ flex: 1, height: 1, background: t.onField, opacity: 0.35 }} />
      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', color: t.soft, whiteSpace: 'nowrap' }}>{t.subtitle}</span>
      <div style={{ flex: 1, height: 1, background: t.onField, opacity: 0.35 }} />
    </div>
  );
}
function DottedRule({ t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px auto', width: '70%' }}>
      <div style={{ flex: 1, borderTop: `1px dotted ${t.accent}`, opacity: 0.55 }} />
      <div style={{ width: 4, height: 4, borderRadius: '50%', background: t.accent, opacity: 0.7 }} />
      <div style={{ flex: 1, borderTop: `1px dotted ${t.accent}`, opacity: 0.55 }} />
    </div>
  );
}
function FieldLines({ t, data }) {
  if (t.key === 'dia') {
    return (
      <div style={{ width: '100%', marginTop: 22 }}>
        {t.fields.map((f, i) => (
          <div key={i}>
            {i > 0 && <DottedRule t={t} />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0' }}>
              <PassMiniIcon name={f.icon} color={t.accentDeep} />
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.soft, marginTop: 8 }}>{f.label}</div>
              <div style={{ fontSize: 14, marginTop: 5, color: t.onField, fontFamily: f.mono ? MONO : TEXT, letterSpacing: f.mono ? '0.04em' : 0 }}>{data[f.key] || '\u00A0'}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ width: '100%', marginTop: 24 }}>
      {t.fields.map((f, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.soft, textAlign: 'center' }}>{f.label}</div>
          <div style={{ textAlign: 'center', fontSize: 15, marginTop: 7, color: t.onField, fontFamily: f.mono ? MONO : TEXT, letterSpacing: f.mono ? '0.04em' : '0.01em' }}>{data[f.key] || '\u00A0'}</div>
          <div style={{ height: 1, background: t.accent, opacity: t.key === 'temporada' ? 0.5 : 0.6, marginTop: 9 }} />
        </div>
      ))}
    </div>
  );
}

// ── FULL credential — QR is the hero ──
function FullPass({ t, holder = 'Nombre y apellidos', id = 'PSC-2026-0042', remaining = '14', date = 'Hoy', qrSize = 184, style }) {
  const data = { holder, id, remaining, date };
  const bg = t.bgGradient || `radial-gradient(125% 95% at 50% 8%, ${t.fieldLo} 0%, ${t.field} 48%, ${t.edge} 100%)`;
  const flankH = t.illusFromTop ? '82%' : '64%';
  const mask = { WebkitMaskImage: 'linear-gradient(to top, #000 62%, transparent 96%)', maskImage: 'linear-gradient(to top, #000 62%, transparent 96%)' };
  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: 36, overflow: 'hidden', background: bg,
      boxShadow: '0 24px 70px rgba(31,31,22,0.30)', padding: '32px 26px 26px', boxSizing: 'border-box', color: t.onField, fontFamily: TEXT, ...style }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '46%', height: flankH, overflow: 'hidden', opacity: t.illusOpacity, zIndex: 0, pointerEvents: 'none', ...mask }}>
        <img src={t.church} alt="" style={{ position: 'absolute', left: '-6%', bottom: 0, height: '100%' }} />
      </div>
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: '46%', height: flankH, overflow: 'hidden', opacity: t.illusOpacity, zIndex: 0, pointerEvents: 'none', ...mask }}>
        <img src={t.castle} alt="" style={{ position: 'absolute', right: '-8%', bottom: 0, height: '100%' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {t.layout === 'A' ? (
          <React.Fragment>
            <Title t={t} />
            <div style={{ marginTop: 18 }}><img src={t.crest} alt="Escudo municipal" style={{ height: 56, opacity: 0.97 }} /></div>
            {t.institutional && <div style={{ fontSize: 12.5, color: t.soft, textAlign: 'center', marginTop: 8, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{t.institutional}</div>}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img src={t.crest} alt="Escudo municipal" style={{ height: t.key === 'dia' ? 64 : 56, opacity: 0.97 }} />
            {t.institutional && <div style={{ fontSize: 11.5, color: t.soft, textAlign: 'center', marginTop: 8, marginBottom: 6 }}>{t.institutional}</div>}
            <div style={{ marginTop: t.institutional ? 8 : 16 }}><Title t={t} size={30} /></div>
            {t.subtitle && <Subtitle t={t} />}
          </React.Fragment>
        )}
        <div style={{ position: 'relative', marginTop: 24, background: t.qrBg, borderRadius: 24, padding: 15, boxShadow: '0 10px 30px rgba(0,0,0,0.20)' }}>
          {t.qrBorder && <div style={{ position: 'absolute', inset: 7, borderRadius: 18, border: `1.5px solid ${t.qrBorder}`, opacity: 0.55, pointerEvents: 'none' }} />}
          <FauxQR size={qrSize} seed={t.seed} fg={t.qrInk} bg={t.qrBg} radius={5} />
        </div>
        <FieldLines t={t} data={data} />
        <div style={{ marginTop: 18 }}><Ornament color={t.accent} width={120} /></div>
      </div>
    </div>
  );
}
window.FullPass = FullPass;

// ── MINI — collapsed wallet / admin card ──
function MiniPass({ t, holder, sub, status = 'Activo', onClick, style }) {
  const bg = t.bgGradient || `radial-gradient(120% 140% at 50% 0%, ${t.fieldLo} 0%, ${t.field} 55%, ${t.edge} 100%)`;
  return (
    <div onClick={onClick} style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', background: bg,
      boxShadow: '0 10px 30px rgba(31,31,22,0.22)', color: t.onField, padding: '18px 20px', boxSizing: 'border-box', fontFamily: TEXT, ...style }}>
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: '46%', height: '150%', overflow: 'hidden', opacity: t.key === 'temporada' ? 0.18 : 0.24, zIndex: 0, pointerEvents: 'none' }}>
        <img src={t.castle} alt="" style={{ position: 'absolute', right: '-12%', bottom: '-8%', height: '100%' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 17, letterSpacing: '0.08em' }}>{t.name}</div>
          <div style={{ fontSize: 12, color: t.soft, marginTop: 6 }}>{holder}</div>
        </div>
        <img src={t.crest} alt="" style={{ height: 30, opacity: 0.92 }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.soft }}>{sub || t.tag}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: t.onField }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.accent }} /> {status}
        </span>
      </div>
    </div>
  );
}
window.MiniPass = MiniPass;
