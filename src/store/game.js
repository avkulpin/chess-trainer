import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { Chess } from 'chess.js';
import { historyStore } from './history';

const baseDrawableOptions = {
  autoShapes: [],
  shapes: [],
  enabled: true,
  visible: true,
  defaultSnapToValidMove: true,
  eraseOnClick: false,
  brushes: {},
  pieces: { baseUrl: '' },
  prevSvgHash: '',
};

export const game = new Chess();

if (typeof window !== 'undefined') {
  window.__GAME__ = game;
}

export const gameStore = create(
  subscribeWithSelector((set, get) => ({
    game,
    fen: game.fen(),
    lastMove: null,
    drawable: baseDrawableOptions,
    updateLastMove(lastMove) {
      set({
        lastMove,
      });
    },
    redraw(drawable) {
      set({
        drawable: {
          ...get().drawable,
          ...drawable,
        },
      });
    },
    forceUpdate() {
      set({
        drawable: {
          ...get().drawable,
          brush: {},
        },
      });
    },
    load(fen) {
      game.load(fen);

      set({
        fen,
        drawable: {
          ...get().drawable,
          brush: {},
        },
      });
    },
  })),
);

gameStore.subscribe(
  (state) => state.lastMove,
  (lastMove) => {
    const history = historyStore.getState().history;

    if (lastMove) {
      const foundIndex = history.findIndex((item) => item === lastMove);

      const newHistory =
        foundIndex > -1
          ? [...history.slice(0, foundIndex), lastMove]
          : [...history, lastMove];

      historyStore.setState({
        history: newHistory,
        cursor: lastMove,
      });
    } else {
      game.reset();

      historyStore.setState({
        cursor: null,
      });

      gameStore.setState({
        fen: game.fen(),
      });
    }
  },
  { fireImmediately: false },
);

export const useGameStore = (selector) => gameStore(selector, shallow);
