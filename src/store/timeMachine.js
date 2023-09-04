import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { produce } from 'immer';
import { gameStore } from './game';
import { isNil } from '../utils/misc';

export const timeMachineStore = create(
  subscribeWithSelector((set, get) => ({
    cursor: null,
    cursorIndex: null,
    timeline: [],
    travelTo(index) {
      const pgn = get().timeline[index];

      if (!isNil(pgn)) {
        set({
          cursor: pgn,
          cursorIndex: index,
        });
      }
    },

    travelBack() {
      const { cursor, timeline } = get();

      if (timeline.length <= 1) {
        return;
      }

      if (cursor === null) {
        set({
          cursor: timeline[timeline.length - 2],
          cursorIndex: timeline.length - 2,
        });
      } else {
        const index = timeline.findIndex((milestone) => milestone === cursor);

        if (index > 0) {
          set({
            cursor: timeline[index - 1],
            cursorIndex: index - 1,
          });
        }
      }
    },
    travelForward() {
      const { cursor, timeline } = get();

      if (cursor === null || timeline.length <= 1) {
        return;
      }

      const index = timeline.findIndex((milestone) => milestone === cursor);

      if (index === timeline.length - 2) {
        set({
          cursor: null,
          cursorIndex: null,
        });
      } else {
        set({
          cursor: timeline[index + 1],
          cursorIndex: index + 1,
        });
      }
    },
    reset() {
      set({
        cursor: null,
        cursorIndex: null,
        timeline: [],
      });
    },
  })),
);

const buildTimelineFromHistory = (history) => {
  const result = [];

  for (let i = 1; i < history.length; i++) {
    result.push(history.slice(0, i).join('\n'));
  }

  return result;
};

gameStore.subscribe(
  (state) => state.game,
  (game) => {
    const timeline = buildTimelineFromHistory(game.history());

    timeMachineStore.setState({
      cursor: null,
      cursorIndex: null,
      timeline: ['', ...timeline],
    });
  },
  { fireImmediately: false },
);

gameStore.subscribe(
  (state) => state.pgn,
  (pgn) => {
    const timeline = timeMachineStore.getState().timeline;

    timeMachineStore.setState({
      cursor: null,
      cursorIndex: null,
      timeline: produce(timeline, (draft) => void draft.push(pgn)),
    });
  },
  { fireImmediately: true },
);

// historyStore.subscribe(
//   (state) => state.cursor,
//   (cursor) => {
//     const history = historyStore.getState().history;
//
//     if (!cursor) {
//       game.reset();
//
//       gameStore.setState({
//         fen: game.fen(),
//       });
//
//       return;
//     }
//
//     const move = history.find((item) => item === cursor);
//
//     if (move) {
//       game.load(move.after);
//       gameStore.setState({
//         fen: game.fen(),
//       });
//     }
//   },
//   { fireImmediately: false },
// );

export const useTimeMachineStore = (selector) =>
  timeMachineStore(selector, shallow);
