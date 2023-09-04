'use client';
import { useCallback, useState } from 'react';
import { ChessDisplay } from './ChessDisplay';
import { useMovesExplorer } from '../../queries/useMovesExplorer';
import { useTimeMachineStore } from '../../store/timeMachine';
import { useGameStore } from '../../store/game';
import { usePastVersionGame } from './hooks/usePastVersionGame';
import { useKeyInput } from '../../hooks/useKeyInput';
import { mapMovesToAutoShapes } from './utils';

export const ChessBoard = () => {
  const game = useGameStore((state) => state.game);
  const mainFen = useGameStore((state) => state.fen);
  const move = useGameStore((state) => state.move);
  const undo = useGameStore((state) => state.undo);
  const reset = useGameStore((state) => state.reset);
  const load = useGameStore((state) => state.load);
  const lastMove = useGameStore(
    ({ currentMove }) => currentMove && [currentMove?.from, currentMove?.to],
  );
  const travelBack = useTimeMachineStore((state) => state.travelBack);
  const travelNext = useTimeMachineStore((state) => state.travelForward);
  const pastVersionGame = usePastVersionGame();
  const [drawable, setDrawable] = useState({});

  // useHistoryStore((state) => state.cursor); /* To trigger redraw hack */

  useKeyInput([
    ['Escape', () => void reset()],
    ['ArrowLeft', () => travelBack()],
    ['ArrowRight', () => travelNext()],
    ['Backspace', () => void undo()],
  ]);

  const mainGame = pastVersionGame || game;
  const fen = pastVersionGame?.fen?.() || mainFen;

  useMovesExplorer(fen, {
    onSuccess: ({ moves }) => {
      setDrawable({
        autoShapes: mapMovesToAutoShapes(moves.slice(0, 5)),
      });
    },
  });

  const handleMove = useCallback(
    (from, to) => {
      if (pastVersionGame) {
        pastVersionGame.move({ from, to });
        load(pastVersionGame.history().join('\n'), true);
      } else {
        move(from, to);
      }
    },
    [pastVersionGame, game],
  );

  return (
    <ChessDisplay
      fen={fen}
      game={mainGame}
      width="600px"
      height="600px"
      lastMove={lastMove}
      drawable={drawable}
      onMove={handleMove}
    />
  );
};
