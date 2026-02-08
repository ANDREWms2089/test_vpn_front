import React, { useMemo } from 'react';
import './FanfareConfetti.css';

const SQUARE_COLORS = ['#22d3ee', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];
const DOT_COLORS = ['#22d3ee', '#fb923c', '#60a5fa', '#34d399', '#a78bfa'];
const SAUSAGE_COLORS = ['#fb923c', '#22d3ee', '#60a5fa', '#a78bfa'];

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const RIBBON_PATH = 'M0.979472 55.6939C5.69804 51.7298 11.1644 48.2281 12.5802 42.5497C14.8862 33.301 4.3273 23.8281 6.63326 14.5794C8.12153 8.61027 14.5717 5.20004 19.4511 0.979572';

function FanfareConfetti() {
  const pieces = useMemo(() => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const r = seededRandom(i * 7.3);
      result.push({
        key: `sq-l-${i}`,
        type: 'square',
        side: 'left',
        color: SQUARE_COLORS[Math.floor(seededRandom(i * 2.1) * SQUARE_COLORS.length)],
        offset: 5 + r * 35,
        size: 6 + Math.floor(seededRandom(i * 5.7) * 6),
        delay: seededRandom(i * 3.1) * 0.35,
        duration: 2.8 + seededRandom(i * 13.7) * 1.2,
        peakX: 35 + seededRandom(i * 11) * 45,
        peakY: -30 - seededRandom(i * 17) * 55,
      });
    }
    for (let i = 0; i < 7; i++) {
      const r = seededRandom(i * 9.1);
      result.push({
        key: `sq-r-${i}`,
        type: 'square',
        side: 'right',
        color: SQUARE_COLORS[Math.floor(seededRandom(i * 4.2) * SQUARE_COLORS.length)],
        offset: 5 + r * 35,
        size: 6 + Math.floor(seededRandom(i * 6.3) * 6),
        delay: seededRandom(i * 5.2) * 0.35,
        duration: 2.8 + seededRandom(i * 15.1) * 1.2,
        peakX: -(35 + seededRandom(i * 13) * 45),
        peakY: -30 - seededRandom(i * 19) * 55,
      });
    }
    for (let i = 0; i < 6; i++) {
      const r = seededRandom(i * 4.7);
      result.push({
        key: `dot-l-${i}`,
        type: 'dot',
        side: 'left',
        color: DOT_COLORS[Math.floor(seededRandom(i * 1.9) * DOT_COLORS.length)],
        offset: 10 + r * 40,
        size: 4 + Math.floor(seededRandom(i * 3.2) * 5),
        delay: seededRandom(i * 2.7) * 0.3,
        duration: 2.8 + seededRandom(i * 12.3) * 1.2,
        peakX: 40 + seededRandom(i * 9) * 50,
        peakY: -25 - seededRandom(i * 14) * 60,
      });
    }
    for (let i = 0; i < 6; i++) {
      const r = seededRandom(i * 5.3);
      result.push({
        key: `dot-r-${i}`,
        type: 'dot',
        side: 'right',
        color: DOT_COLORS[Math.floor(seededRandom(i * 2.5) * DOT_COLORS.length)],
        offset: 10 + r * 40,
        size: 4 + Math.floor(seededRandom(i * 4.1) * 5),
        delay: seededRandom(i * 3.4) * 0.3,
        duration: 2.8 + seededRandom(i * 14.1) * 1.2,
        peakX: -(40 + seededRandom(i * 11) * 50),
        peakY: -25 - seededRandom(i * 16) * 60,
      });
    }
    const ribbonSpec = [
      { side: 'left', tier: 'upper', peakY: -55, peakX: 32, offset: 3 },
      { side: 'left', tier: 'upper', peakY: -50, peakX: 62, offset: 25 },
      { side: 'left', tier: 'middle', peakY: -32, peakX: 48, offset: 45 },
      { side: 'left', tier: 'lower', peakY: -12, peakX: 38, offset: 6 },
      { side: 'right', tier: 'upper', peakY: -55, peakX: -32, offset: 3 },
      { side: 'right', tier: 'upper', peakY: -50, peakX: -62, offset: 25 },
      { side: 'right', tier: 'middle', peakY: -32, peakX: -48, offset: 45 },
      { side: 'right', tier: 'lower', peakY: -12, peakX: -38, offset: 6 },
    ];
    ribbonSpec.forEach((spec, i) => {
      const rotation = 0;
      result.push({
        key: `ribbon-${spec.side[0]}-${i}`,
        type: 'sausage',
        side: spec.side,
        color: SAUSAGE_COLORS[i % SAUSAGE_COLORS.length],
        offset: spec.offset,
        path: RIBBON_PATH,
        delay: 0.2 + i * 0.08,
        duration: 3.2,
        peakX: spec.peakX,
        peakY: spec.peakY,
        rotation,
        floatPhase: i * 0.2,
        zIndex: spec.tier === 'lower' ? (i % 2 === 0 ? 1 : 3) : 2,
      });
    });
    return result;
  }, []);

  return (
    <div className="fanfare-confetti" aria-hidden="true">
      {pieces.map((p) =>
        p.type === 'square' ? (
          <div
            key={p.key}
            className={`fanfare-piece fanfare-square fanfare-${p.side}`}
            style={{
              bottom: `${p.offset}px`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              '--delay': `${p.delay}s`,
              '--duration': `${p.duration}s`,
              '--peak-x': `${p.peakX}vw`,
              '--peak-y': `${p.peakY}vh`,
            }}
          />
        ) : p.type === 'dot' ? (
          <div
            key={p.key}
            className={`fanfare-piece fanfare-dot fanfare-${p.side}`}
            style={{
              bottom: `${p.offset}px`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              '--delay': `${p.delay}s`,
              '--duration': `${p.duration}s`,
              '--peak-x': `${p.peakX}vw`,
              '--peak-y': `${p.peakY}vh`,
            }}
          />
        ) : (
          <div
            key={p.key}
            className={`fanfare-piece fanfare-sausage-wrap fanfare-${p.side}`}
            style={{
              bottom: `${p.offset}px`,
              zIndex: p.zIndex ?? 2,
              '--delay': `${p.delay}s`,
              '--duration': `${p.duration}s`,
              '--peak-x': `${p.peakX}vw`,
              '--peak-y': `${p.peakY}vh`,
              '--rotation': `${p.rotation}deg`,
              '--float-phase': p.floatPhase,
            }}
          >
            <svg className="fanfare-ribbon" viewBox="0 0 21 57" preserveAspectRatio="none">
              <path d={p.path} stroke={p.color} strokeWidth="1.96" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )
      )}
    </div>
  );
}

export default FanfareConfetti;
