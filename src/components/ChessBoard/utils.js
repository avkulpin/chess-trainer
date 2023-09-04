import { SQUARES } from 'chess.js';

const levelBrushMap = {
  0: {
    color: 'green',
    lineWidth: 15,
  },
  1: {
    color: 'yellow',
    lineWidth: 12,
  },
  2: {
    color: 'red',
    lineWidth: 9,
  },
  3: {
    color: 'blue',
    lineWidth: 6,
  },
  4: {
    color: 'purple',
    lineWidth: 3,
  },
};

const orientationMap = {
  white: 'w',
  black: 'b',
};

export const calculateMovable = (game) => {
  const dests = new Map();

  SQUARES.forEach((s) => {
    const ms = game.moves({ square: s, verbose: true });
    if (ms.length) {
      dests.set(
        s,
        ms.map((m) => m.to),
      );
    }
  });

  return {
    free: false,
    dests,
  };
};

export const mapMovesToAutoShapes = (moves) =>
  moves.map((move, index) => {
    const brush = getBrushByLevel(index);

    return {
      orig: move?.uci?.slice?.(0, 2),
      dest: move?.uci?.slice?.(2),
      brush: brush.color,
      modifiers: {
        lineWidth: brush.lineWidth,
      },
    };
  });

export const parseExplorerMoves = (moves) =>
  moves.map((move) => ({
    from: move?.uci?.slice?.(0, 2),
    to: move?.uci?.slice?.(2),
  }));

export const getBrushByLevel = (level) => levelBrushMap[level];
