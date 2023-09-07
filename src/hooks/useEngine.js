import { useQuery } from 'react-query';
import { useEngineStore } from '../store/engine';
import { stockfishEngine } from '../services/stockfish/stockfish';

export const useEngine = () => {
  const setEvaluation = useEngineStore((state) => state.setEvaluation);

  const { data: isReady } = useQuery(['engine'], () => stockfishEngine.init(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    evaluate(moves) {
      if (!isReady) {
        return;
      }

      stockfishEngine.evaluate(moves, setEvaluation);
    },
  };
};
