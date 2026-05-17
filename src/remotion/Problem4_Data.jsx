import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion'

// 330 frames = 11 seconds at 30fps
const BG = '#0A0A0C'

const TABLE_HEADERS = ['Fecha', 'Importe', 'Unids.', 'Margen', 'Total']
const TABLE_ROWS = [
  ['12/03/24', '1.240 €', '32', '18 %', '1.463 €'],
  ['13/03/24', '890 €',   '19', '22 %', '1.086 €'],
  ['14/03/24', '2.105 €', '47', '15 %', '2.421 €'],
  ['15/03/24', '760 €',   '16', '24 %', '942 €'],
  ['16/03/24', '1.680 €', '38', '19 %', '1.999 €'],
  ['17/03/24', '1.340 €', '29', '21 %', '1.621 €'],
]

// ── Layout constants (composition is 640×480) ──
// Column widths must match <colgroup> below
const COL_W   = [82, 76, 58, 66, 76]           // px per column
const TABLE_W = 358                              // sum of COL_W
const ROW_H   = 22                              // px per data/header row
const HDR_H   = 23                              // header row (includes 1px border-bottom)
const TABLE_H = HDR_H + 6 * ROW_H              // 155
const TBL_L   = Math.round((640 - TABLE_W) / 2) // 141 — left edge of table
const TBL_T   = Math.round((480 - TABLE_H) / 2) // 163 — top edge of table

// Helpers
const colX = (i) => TBL_L + COL_W.slice(0, i).reduce((a, b) => a + b, 0)
const rowY  = (i) => TBL_T + HDR_H + i * ROW_H  // i=0 = first data row

// Cursor waypoints — tip lands inside each highlighted cell
const CUR = {
  frames: [56,  74,                        86,                        102,                       118,                       128],
  x:      [320, colX(3) + COL_W[3] / 2,   colX(3) + COL_W[3] / 2,   colX(1) + COL_W[1] / 2,   colX(3) + COL_W[3] / 2,   colX(3) + COL_W[3] / 2],
  y:      [TBL_T + 12, rowY(0) + ROW_H / 2, rowY(0) + ROW_H / 2,   rowY(2) + ROW_H / 2,      rowY(2) + ROW_H / 2,      rowY(2) + ROW_H / 2],
}

// Highlights — exactly aligned to col/row boundaries
const HIGHLIGHTS = [
  { frame: 74,  x: colX(3), y: rowY(0), w: COL_W[3], h: ROW_H }, // Margen, row 0
  { frame: 102, x: colX(1), y: rowY(2), w: COL_W[1], h: ROW_H }, // Importe, row 2
  { frame: 118, x: colX(3), y: rowY(2), w: COL_W[3], h: ROW_H }, // Margen, row 2
]

export default function Problem4_Data() {
  const frame = useCurrentFrame()

  // Global fade out
  const globalOpacity = interpolate(frame, [298, 330], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // ── ACT 1: Setup (0-56) ──

  // Chat bubble slides in from top
  const chatOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const chatY = interpolate(frame, [0, 22], [-16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  // Table fades in slowly
  const tableOpacity = interpolate(frame, [12, 56], [0, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // ── ACT 2: Cursor wanders (56-136) ──
  const cursorOpacity = interpolate(frame, [56, 70, 122, 136], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const cursorX = interpolate(frame, CUR.frames, CUR.x, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })
  const cursorY = interpolate(frame, CUR.frames, CUR.y, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  })

  // Cell highlights
  const highlightOps = HIGHLIGHTS.map(h =>
    interpolate(frame, [h.frame, h.frame + 8, h.frame + 18, h.frame + 26], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  )

  // ── ACT 3: Peak (148-270) ──

  // Table + chat fade almost invisible
  const tableFinalOp = frame >= 148
    ? interpolate(frame, [148, 166], [tableOpacity, 0.07], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : tableOpacity
  const chatFinalOp = frame >= 148
    ? interpolate(frame, [148, 162], [chatOpacity, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : chatOpacity

  // "Los datos: ahí." (frames 156-174)
  const peak1Opacity = interpolate(frame, [156, 172], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const peak1Y = interpolate(frame, [156, 172], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  // "La respuesta: 47 minutos de búsqueda." (frames 178-196)
  const peak2Opacity = interpolate(frame, [178, 196], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const peak2Y = interpolate(frame, [178, 196], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  // "Decisión tomada por intuición." (frames 202-218)
  const peak3Opacity = interpolate(frame, [202, 218], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
      <div
        style={{
          opacity: globalOpacity,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Incoming chat question — top */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: `translateX(-50%) translateY(${chatY}px)`,
            opacity: chatFinalOp,
            background: 'rgba(67,97,238,0.12)',
            border: '1px solid rgba(67,97,238,0.2)',
            borderRadius: 12,
            padding: '8px 16px',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>
            💬&nbsp; Oye, ¿cuánto facturamos la semana pasada?
          </span>
        </div>

        {/* Data table */}
        <div style={{ opacity: tableFinalOp }}>
          <table style={{ borderCollapse: 'collapse', fontFamily: "'Syne Mono', monospace", fontSize: '0.62rem', tableLayout: 'fixed', width: TABLE_W }}>
            <colgroup>
              {COL_W.map((w, i) => <col key={i} style={{ width: w }} />)}
            </colgroup>
            <thead>
              <tr>
                {TABLE_HEADERS.map(h => (
                  <th key={h} style={{ padding: '5px 14px', color: 'rgba(255,255,255,0.35)', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '5px 14px', color: 'rgba(255,255,255,0.55)', textAlign: 'right', letterSpacing: '0.03em' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cursor + highlights SVG — matches full composition (640×480) */}
        <svg width={640} height={480} viewBox="0 0 640 480" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {HIGHLIGHTS.map((h, i) => (
            <rect key={i} x={h.x} y={h.y} width={h.w} height={h.h} fill="rgba(67,97,238,0.18)" rx={2} opacity={highlightOps[i]} />
          ))}
          <g transform={`translate(${cursorX}, ${cursorY})`} opacity={cursorOpacity}>
            <path d="M0,0 L0,18 L4.5,13 L7.5,20 L9.5,19 L6.5,12 L12,12 Z" fill="white" stroke="rgba(0,0,0,0.2)" strokeWidth={0.5} />
          </g>
        </svg>

        {/* ── PEAK — three lines, stays ~1.4s before fade out ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              opacity: peak1Opacity,
              transform: `translateY(${peak1Y}px)`,
              fontFamily: "'Syne Mono', monospace",
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.1em',
              textAlign: 'center',
            }}
          >
            Los datos: ahí.
          </div>
          <div
            style={{
              opacity: peak2Opacity,
              transform: `translateY(${peak2Y}px)`,
              fontFamily: "'Instrument Serif', serif",
              fontSize: 24,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.25,
            }}
          >
            La respuesta:<br />47 minutos de búsqueda.
          </div>
          <div
            style={{
              opacity: peak3Opacity,
              fontFamily: "'Syne Mono', monospace",
              fontSize: 11,
              color: '#F72585',
              letterSpacing: '0.08em',
              textAlign: 'center',
            }}
          >
            Decisión tomada por intuición.
          </div>
        </div>

      </div>
    </AbsoluteFill>
  )
}
