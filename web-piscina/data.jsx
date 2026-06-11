// ── Piscina municipal — data & tokens ──
const A = '../assets/';
const DISPLAY = '"Bricolage Grotesque", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, "Helvetica Neue", sans-serif';
const TEXT = '"Hanken Grotesk", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, "Helvetica Neue", sans-serif';
const MONO = '"SF Mono", ui-monospace, "JetBrains Mono", Menlo, monospace';

const W = {
  ivory: '#F6EED9', paper: '#FBF6E9', sunken: '#F0E7D2', well: '#EFE6CF',
  ink: '#1F1F16', inkSoft: '#6E6F60', inkMute: '#8C8B7B', hair: 'rgba(31,31,22,0.10)', hair2: 'rgba(31,31,22,0.07)',
  sage: '#4C5436', sageLo: '#5A6444', sageDeep: '#353D24', gold: '#B89B5E', goldLite: '#E1CA8C',
  ok: '#5B7A4E', warn: '#B98A3E', error: '#9E4B3C', info: '#4E6E7E',
};

// ── Visual themes (faithful to the three real passes) ──
const THEMES = {
  temporada: {
    key: 'temporada', name: 'ABONO TEMPORADA', tag: 'Temporada 2026', kind: 'Residente',
    layout: 'A', institutional: 'Tu\nAyuntamiento', subtitle: null,
    field: '#4C5436', fieldLo: '#586245', edge: '#353D24', bgGradient: null,
    onField: '#F3ECCF', soft: 'rgba(243,236,207,0.60)', accent: '#E1CA8C', accentDeep: '#B89B5E',
    crest: A + 'crest-gold.png', church: A + 'church-gold.png', castle: A + 'castle-gold.png',
    illusOpacity: 0.24, illusFromTop: false, qrBg: '#F3E6C7', qrInk: '#1F1F16', qrBorder: '#B89B5E', seed: 7,
    fields: [{ label: 'Nombre y apellidos', key: 'holder' }, { label: 'Id del abono', key: 'id', mono: true }],
  },
  banos: {
    key: 'banos', name: 'BONO 15 BAÑOS', tag: '15 accesos', kind: 'Verano',
    layout: 'B', institutional: 'Tu Ayuntamiento', subtitle: 'PISCINA MUNICIPAL',
    field: '#1AA3CE', fieldLo: '#46B2D6', edge: '#0E89B0',
    bgGradient: 'radial-gradient(135% 100% at 28% 4%, #4FB7DA 0%, #1AA3CE 48%, #0E89B0 100%)',
    onField: '#FFFFFF', soft: 'rgba(255,255,255,0.74)', accent: '#EAF7FB', accentDeep: '#CDEBF5',
    crest: A + 'crest-white.png', church: A + 'church-white.png', castle: A + 'castle-white.png',
    illusOpacity: 0.32, illusFromTop: true, qrBg: '#FFFFFF', qrInk: '#16242B', qrBorder: null, seed: 23,
    fields: [{ label: 'Baños restantes', key: 'remaining' }, { label: 'Id del bono', key: 'id', mono: true }],
  },
  dia: {
    key: 'dia', name: 'ENTRADA DE DÍA', tag: 'Válida hoy', kind: 'Visitante',
    layout: 'B', institutional: null, subtitle: 'PISCINA MUNICIPAL',
    field: '#7E5570', fieldLo: '#8A5E6A', edge: '#3C2E4F',
    bgGradient: 'linear-gradient(152deg, #4A3A5E 0%, #7E5570 36%, #AC6455 70%, #E6C2A0 100%)',
    onField: '#F6ECDA', soft: 'rgba(246,236,218,0.72)', accent: '#F0D8B6', accentDeep: '#EAC8A2',
    crest: A + 'crest-color.png', church: A + 'church-terra.png', castle: A + 'castle-terra.png',
    illusOpacity: 0.30, illusFromTop: true, qrBg: '#FFFFFF', qrInk: '#2A1E22', qrBorder: null, seed: 41,
    fields: [{ icon: 'user', label: 'Nombre del visitante', key: 'holder' }, { icon: 'calendar', label: 'Fecha', key: 'date' }, { icon: 'ticket', label: 'Id de la entrada', key: 'id', mono: true }],
  },
};

// ── Real catalog (4 products → 3 colorways) ──
const CATALOG = [
  {
    id: 'temporada', theme: 'temporada', name: 'Abono Temporada', short: 'Temporada',
    tag: 'Residente · toda la temporada', price: '30,00', unit: '/ temporada', nominative: true, range: false,
    desc: 'Acceso ilimitado a la piscina municipal durante toda la temporada de verano. Una credencial nominativa que te acompaña cada día.',
    blurb: 'Acceso ilimitado durante toda la temporada de verano.',
    includes: ['Acceso ilimitado del 15 de junio al 31 de agosto', 'Credencial nominativa con tu código', 'Acceso preferente los días de aforo completo'],
  },
  {
    id: 'banos', theme: 'banos', name: 'Bono 15 Baños', short: '15 Baños',
    tag: 'Verano · 15 accesos', price: '20,00', unit: '/ 15 accesos', nominative: false, range: false,
    desc: 'Quince entradas para usar cuando quieras a lo largo de la temporada. Sin caducidad y compartible con quien tú decidas.',
    blurb: 'Quince accesos para usar cuando quieras.',
    includes: ['15 accesos a la piscina municipal', 'Sin caducidad dentro de la temporada', 'Compartible: válido para cualquier persona'],
  },
  {
    id: 'adulto', theme: 'dia', name: 'Entrada de Día · Adulto', short: 'Día · Adulto',
    tag: 'Visitante · válida hoy', price: '4,00', priceWeekend: '6,50', unit: '/ día', nominative: false, range: true,
    desc: 'Una jornada completa de acceso a la piscina. La tarifa varía entre semana y fin de semana o festivo.',
    blurb: 'Una jornada completa de acceso.',
    includes: ['Acceso válido para la jornada de hoy', 'Tarifa reducida de lunes a viernes', 'Vaso grande y zona de césped'],
  },
  {
    id: 'menor', theme: 'dia', name: 'Entrada de Día · Menor', short: 'Día · Menor',
    tag: 'Menor de 14 años', price: '2,50', priceWeekend: '4,00', unit: '/ día', nominative: false, range: true,
    desc: 'Entrada para menores de 14 años, con tarifa reducida. La tarifa varía entre semana y fin de semana o festivo.',
    blurb: 'Entrada reducida para menores de 14 años.',
    includes: ['Acceso válido para la jornada de hoy', 'Para menores de 14 años', 'Se recomienda acompañamiento de un adulto'],
  },
];

const byId = (id) => CATALOG.find(p => p.id === id);
const FOOTER_LINE = 'Piscina municipal · Tu municipio';

Object.assign(window, { A, DISPLAY, TEXT, MONO, W, THEMES, CATALOG, byId, FOOTER_LINE });
