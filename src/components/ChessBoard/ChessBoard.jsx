'use client';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { ChessDisplay } from './ChessDisplay';
import { useMovesExplorer } from '../../queries/useMovesExplorer';
import { useTimeMachineStore } from '../../store/timeMachine';
import { useGameStore } from '../../store/game';
import { usePracticeStore } from '../../store/practice';
import { usePastVersionGame } from './hooks/usePastVersionGame';
import { useKeyInput } from '../../hooks/useKeyInput';
import { useStockfish } from '../../hooks/useStockfish';
import { mapMovesToAutoShapes, parseExplorerMoves } from './utils';
import { getRandomFromArray } from '../../utils/misc';

export const ChessBoard = () => {
  const game = useGameStore((state) => state.game);
  const orientation = useGameStore((state) => state.orientation);
  const practiceEnabled = usePracticeStore((state) => state.enabled);
  const mainFen = useGameStore((state) => state.fen);
  const move = useGameStore((state) => state.move);
  const undo = useGameStore((state) => state.undo);
  const reset = useGameStore((state) => state.reset);
  const load = useGameStore((state) => state.load);
  const toggleOrientation = useGameStore((state) => state.toggleOrientation);
  const currentMove = useGameStore((state) => state.currentMove);
  const travelBack = useTimeMachineStore((state) => state.travelBack);
  const travelNext = useTimeMachineStore((state) => state.travelForward);
  const pastVersionGame = usePastVersionGame();

  const [drawable, setDrawable] = useState({});
  const lastMove = useMemo(
    () => (currentMove ? [currentMove?.from, currentMove?.to] : null),
    [currentMove],
  );

  // useHistoryStore((state) => state.cursor); /* To trigger redraw hack */

  useKeyInput([
    ['Escape', () => void reset()],
    ['ArrowLeft', () => travelBack()],
    ['ArrowRight', () => travelNext()],
    ['Backspace', () => void undo()],
    ['f', () => void toggleOrientation()],
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

  const { move: engineMove, findMove } = useStockfish({
    duration: 10 * 1000 * 60,
    increment: 2 * 1000,
    skillLevel: 20,
    filepath: 'stockfish/stockfish.js',
  });

  useEffect(() => {
    const botMove = orientation === 'white' ? 'b' : 'w';

    if (practiceEnabled && game.turn() === botMove && engineMove) {
      move(engineMove.from, engineMove.to);
    }
  }, [engineMove, practiceEnabled, game, orientation]);

  useEffect(() => {
    const botMove = orientation === 'white' ? 'b' : 'w';

    if (practiceEnabled && game.turn() === botMove) {
      findMove({
        history: game.history({ verbose: true }),
        accelerate: false,
      });
    }
  }, [practiceEnabled, currentMove, game, orientation]);

  // useEffect(() => {
  //   if (practiceEnabled) {
  //     if (game.turn() === 'b') {
  //       const bestMoves = parseExplorerMoves(explorerMoves.moves.slice(0, 5));
  //       const randMove = getRandomFromArray(bestMoves);
  //       move(randMove.from, randMove.to);
  //     } else {
  //       const bestMoves = parseExplorerMoves(explorerMoves.moves.slice(0, 3));
  //       const history = game.history({ verbose: true });
  //       const lastMove = history[history.length - 1];
  //     }
  //   }
  // }, [practiceEnabled, explorerMoves]);

  return (
    <ChessDisplay
      fen={fen}
      game={mainGame}
      orientation={orientation}
      width="600px"
      height="600px"
      lastMove={lastMove}
      drawable={drawable}
      onMove={handleMove}
    />
  );
};
