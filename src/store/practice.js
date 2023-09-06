import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { gameStore } from './game';

export const practiceStore = create(
  subscribeWithSelector((set, get) => ({
    game: null,
    enabled: false,
    startPractice() {
      set({
        enabled: true,
      });
    },
    stopPractice() {
      set({
        enabled: false,
      });
    },
  })),
);

gameStore.subscribe(
  (state) => state.history,
  (history) => {
    if (!history.length && practiceStore.getState().enabled) {
      practiceStore.setState({
        enabled: false,
      });
    }
  },
  { fireImmediately: false },
);

export const usePracticeStore = (selector) => practiceStore(selector, shallow);
