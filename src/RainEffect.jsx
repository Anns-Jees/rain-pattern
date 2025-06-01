import React from 'react';

export default function RainEffect() {
  const columns = 15;
  const tailLength = 5; // tail + drop length
  const totalDrops = columns * 7;

  // Tail base color (dark blue)
  const baseColor = [0, 31, 77]; // RGB for #001f4d

  // Helper to convert RGB + opacity to rgba string
  const rgba = (rgb, alpha) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;

  return (
    <div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden">
      {[...Array(totalDrops)].map((_, i) => {
        const col = i % columns;
        const leftPercent = (col + 0.5) * (100 / columns);
        const delay = Math.random() * 5;
        const leftOffset = (Math.random() - 0.5) * (100 / columns) * 0.6;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${leftPercent + leftOffset}%`,
              top: '-50px',
              animation: `fall 1.2s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            {[...Array(tailLength)].map((_, idx) => {
              // opacity goes from 1 (drop) to ~0.1 (tail end)
              const opacity = 1 - idx * (0.9 / (tailLength - 1));
              return (
                <div
                  key={idx}
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: rgba(baseColor, opacity),
                    marginBottom: 1,
                    transform: `translateY(-${idx * 11}px)`,
                    borderRadius: 2,
                  }}
                />
              );
            })}
          </div>
        );
      })}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
