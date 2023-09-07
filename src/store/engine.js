import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

export const engineStore = create(
  subscribeWithSelector((set, get) => ({
    bestMove: null,
    variations: [],
    score: 0.0,
    setEvaluation(evaluation) {
      console.log(Math.min(...evaluation?.variations.map((item) => item.cp)));
      set({
        bestMove: evaluation?.bestMove,
        variations: evaluation?.variations,
        score: Math.min(...evaluation?.variations.map((item) => item.cp)) * -1,
      });
    },
  })),
);

export const useEngineStore = (selector) => engineStore(selector, shallow);
