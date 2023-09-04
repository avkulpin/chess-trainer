import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

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

export const usePracticeStore = (selector) => practiceStore(selector, shallow);
