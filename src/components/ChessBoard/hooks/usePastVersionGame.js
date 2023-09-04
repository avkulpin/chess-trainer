import { useMemo } from 'react';
import { Chess } from 'chess.js';
import { useTimeMachineStore } from '../../../store/timeMachine';

export const usePastVersionGame = () => {
  const cursor = useTimeMachineStore((state) => state.cursor);

  return useMemo(() => {
    if (cursor !== null) {
      const game = new Chess();

      game.loadPgn(cursor);

      return game;
    }

    return null;
  }, [cursor]);
};
