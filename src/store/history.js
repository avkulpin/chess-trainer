import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { game, gameStore } from './game';

export const historyStore = create(
  subscribeWithSelector((set, get) => ({
    history: [],
    cursor: null,
    delete() {
      const { history, cursor } = get();
      const index = history.findIndex((item) => item === cursor);

      if (index === 0) {
        set({
          history: [],
          cursor: null,
        });
      } else if (index > 0) {
        if (index > 0) {
          set({
            history: history.slice(0, index),
            cursor: history[index - 1],
          });
        }
      }
    },
    back() {
      const { history, cursor } = get();
      const index = history.findIndex((item) => item === cursor);

      if (index === 0) {
        set({
          cursor: null,
        });
      } else if (index > 0) {
        if (index > 0) {
          set({
            cursor: history[index - 1],
          });
        }
      }
    },
    next() {
      const { history, cursor } = get();
      const index = history.findIndex((item) => item === cursor);

      if (index < history.length - 1) {
        set({
          cursor: history[index + 1],
        });
      }
    },
    moveTo(move) {
      const { history } = get();
      const newMove = history.find((item) => item === move);

      if (newMove) {
        set({
          cursor: newMove,
        });
      }
    },
  })),
);

historyStore.subscribe(
  (state) => state.cursor,
  (cursor) => {
    const history = historyStore.getState().history;

    if (!cursor) {
      game.reset();

      gameStore.setState({
        fen: game.fen(),
      });

      return;
    }

    const move = history.find((item) => item === cursor);

    if (move) {
      game.load(move.after);
      gameStore.setState({
        fen: game.fen(),
      });
    }
  },
  { fireImmediately: false },
);

export const useHistoryStore = (selector) => historyStore(selector, shallow);
