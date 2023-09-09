import { useCallback } from 'react';
import { useQuery } from 'react-query';
import debounce from 'lodash/throttle';
import { useEngineStore } from '../store/engine';
import { stockfishEngine } from '../services/stockfish/stockfish';

export const useEngine = () => {
  const updateEvaluation = useEngineStore((state) => state.updateEvaluation);
  const debounceUpdate = useCallback(debounce(updateEvaluation, 100), []);

  const { data: isReady } = useQuery(['engine'], () => stockfishEngine.init(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    evaluate(game) {
      if (!isReady) {
        return;
      }

      stockfishEngine.evaluate(
        {
          moves: game.history({ verbose: true }),
          fen: game.fen(),
          turn: game.turn(),
        },
        debounceUpdate,
      );
    },
  };
};
