import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { Chess } from 'chess.js';

export const game = new Chess();

if (typeof window !== 'undefined') {
  window.__GAME__ = game;
}

const initializeGame = (notation, isPGN = false) => {
  let game;

  if (isPGN) {
    game = new Chess();
    game.loadPgn(notation);
  } else {
    game = new Chess(notation);
  }

  const history = game.history();

  return {
    game,
    fen: game.fen(),
    pgn: history.join('\n'),
    history,
  };
};

const getGameUpdate = (game) => {
  const history = game.history();

  return {
    fen: game.fen(),
    pgn: history.join('\n'),
    history,
  };
};

export const gameStore = create(
  subscribeWithSelector((set, get) => ({
    ...initializeGame(),
    currentMove: null,
    load(notation, isPGN = false) {
      set({
        ...initializeGame(notation, isPGN),
      });
    },
    reset() {
      const game = get().game;
      game.reset();
      set({ ...getGameUpdate(get().game), currentMove: null });
    },
    move(from, to) {
      const game = get().game;
      const move = game.move({ from, to });

      if (move) {
        set({
          ...getGameUpdate(game),
          currentMove: move,
        });
      }
    },
    undo() {
      const game = get().game;
      const move = game.undo();

      if (move) {
        const history = game.history();

        set({
          ...getGameUpdate(game),
          currentMove: history[history.length - 1] || null,
        });
      }
    },
  })),
);

// gameStore.subscribe(
//   (state) => state.lastMove,
//   (lastMove) => {
//     const history = historyStore.getState().history;
//     // game.history().join('\n') - get pgn
//
//     if (lastMove) {
//       const foundIndex = history.findIndex((item) => item === lastMove);
//
//       const newHistory =
//         foundIndex > -1
//           ? [...history.slice(0, foundIndex), lastMove]
//           : [...history, lastMove];
//
//       historyStore.setState({
//         history: newHistory,
//         cursor: lastMove,
//       });
//     } else {
//       game.reset();
//
//       historyStore.setState({
//         cursor: null,
//       });
//
//       gameStore.setState({
//         fen: game.fen(),
//       });
//     }
//   },
//   { fireImmediately: false },
// );

export const useGameStore = (selector) => gameStore(selector, shallow);
