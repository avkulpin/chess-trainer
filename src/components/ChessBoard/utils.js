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

export const mapMovesToAutoShapes2 = (moves) =>
  moves.map((move, index) => {
    const brush = getBrushByLevel(index);

    return {
      orig: move?.uci?.slice?.(0, 2),
      dest: move?.uci?.slice?.(2),
      customSvg: {
        html: '<path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="#fff"></path>',
      },
    };
  });

export const parseExplorerMoves = (moves) =>
  moves.map((move) => ({
    from: move?.uci?.slice?.(0, 2),
    to: move?.uci?.slice?.(2),
  }));

export const getBrushByLevel = (level) => levelBrushMap[level];
