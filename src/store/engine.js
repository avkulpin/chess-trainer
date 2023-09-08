import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { stockfishEngine } from '../services/stockfish/stockfish';

export const engineStore = create(
  subscribeWithSelector((set, get) => ({
    bestMove: null,
    work: null,
    evaluation: null,
    updateEvaluation(evaluation) {
      const update = {};

      if (evaluation.evaluation) {
        update.evaluation = evaluation.evaluation;
      }

      if (evaluation.bestMove) {
        update.bestMove = evaluation.bestMove;
      }

      if (evaluation.work) {
        update.work = evaluation.work;
      }

      set({
        ...update,
      });
    },
  })),
);

export const useEngineStore = (selector) => engineStore(selector, shallow);
