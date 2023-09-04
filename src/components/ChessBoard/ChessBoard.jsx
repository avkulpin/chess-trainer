'use client';
import { useCallback, useState, useEffect } from 'react';
import { ChessDisplay } from './ChessDisplay';
import { useMovesExplorer } from '../../queries/useMovesExplorer';
import { useTimeMachineStore } from '../../store/timeMachine';
import { useGameStore } from '../../store/game';
import { usePracticeStore } from '../../store/practice';
import { usePastVersionGame } from './hooks/usePastVersionGame';
import { useKeyInput } from '../../hooks/useKeyInput';
import { mapMovesToAutoShapes, parseExplorerMoves } from './utils';
import { getRandomFromArray } from '../../utils/misc';

export const ChessBoard = () => {
  const game = useGameStore((state) => state.game);
  const practiceEnabled = usePracticeStore((state) => state.enabled);
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

  const { data: explorerMoves } = useMovesExplorer(fen, {
    onSuccess: ({ moves }) => {
      setDrawable({
        autoShapes: false ? mapMovesToAutoShapes(moves.slice(0, 5)) : [],
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

  useEffect(() => {
    if (practiceEnabled) {
      if (game.turn() === 'b') {
        const bestMoves = parseExplorerMoves(explorerMoves.moves.slice(0, 5));
        const randMove = getRandomFromArray(bestMoves);
        move(randMove.from, randMove.to);
      } else {
        const bestMoves = parseExplorerMoves(explorerMoves.moves.slice(0, 3));
        const history = game.history({ verbose: true });
        const lastMove = history[history.length - 1];
      }
    }
  }, [practiceEnabled, explorerMoves]);

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
