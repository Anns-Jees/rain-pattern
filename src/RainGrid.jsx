import React, { useEffect, useState } from 'react';

const ROWS = 15;
const COLS = 20;
const DROP_LENGTH = 6;

const COLORS = [
  '#0074D9',  // bright blue
  '#7F00FF',  // violet
  '#FF1493',  // pink
  '#FF4500',  // orange-red
  '#FFA500',  // orange
  '#FFFF00',  // yellow
  '#00FFFF',  // cyan
];

function index(row, col) {
  return row * COLS + col;
}

export default function RainGrid() {
  const [drops, setDrops] = useState([]);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);

  function getRandomColor(exclude) {
    let newColor;
    do {
      newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    } while (newColor === exclude);
    return newColor;
  }

  useEffect(() => {
    // Initialize drops in each column with random start row
    const initialDrops = Array.from({ length: COLS }).map((_, i) => ({
      col: i,
      headRow: Math.floor(Math.random() * ROWS),
    }));
    setDrops(initialDrops);

    const interval = setInterval(() => {
      setDrops((prevDrops) => {
        let colorChanged = false;
        const updatedDrops = prevDrops.map((drop) => {
          const newHeadRow = drop.headRow + 1;
          if (newHeadRow - DROP_LENGTH > ROWS) {
            colorChanged = true;
            return {
              col: drop.col,
              headRow: 0,
            };
          }
          return {
            ...drop,
            headRow: newHeadRow,
          };
        });

        if (colorChanged) {
          setCurrentColor((prev) => getRandomColor(prev));
        }

        return updatedDrops;
      });
    }, 50); // speed of falling

    return () => clearInterval(interval);
  }, []);

  const cells = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let opacity = 0;

      for (const drop of drops) {
        const start = drop.headRow - DROP_LENGTH;
        const end = drop.headRow;
        if (col === drop.col && row >= start && row <= end) {
          // Fade from 0 at top cell to 1 at bottom cell
          opacity = 1 - (row - start) / DROP_LENGTH;
          break;
        }
      }

      cells.push(
        <div
          key={index(row, col)}
          style={{
            width: 10,
            height: 10,
            backgroundColor: opacity > 0 ? currentColor : '#111',
            opacity,
            transition: 'background-color 0.5s ease, opacity 0.1s ease',
            border: '1px solid #222',
            boxSizing: 'border-box',
          }}
        />
      );
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 10px)`,
        gridTemplateRows: `repeat(${ROWS}, 10px)`,
        gap: 1,
        backgroundColor: 'black',
        width: COLS * 11,
        height: ROWS * 11,
        margin: 'auto',
        marginTop: 20,
      }}
    >
      {cells}
    </div>
  );
}
