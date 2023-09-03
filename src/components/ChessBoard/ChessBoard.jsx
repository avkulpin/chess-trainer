'use client';
import { useCallback } from 'react';
import styled from 'styled-components';
import { ChessDisplay } from './ChessDisplay';
import { useMovesExplorer } from '../../queries/useMovesExplorer';
import { useKeyInput } from '../../hooks/useKeyInput';
import { calculateMovable, mapMovesToAutoShapes } from './utils';
import { useHistoryStore } from '../../store/history';
import { useGameStore } from '../../store/game';

export const ChessBoard = () => {
  const game = useGameStore((state) => state.game);
  const fen = useGameStore((state) => state.fen);
  const lastMove = useGameStore((state) => state.lastMove);
  const redraw = useGameStore((state) => state.redraw);
  const drawable = useGameStore((state) => state.drawable);
  const updateLastMove = useGameStore((state) => state.updateLastMove);
  const forceUpdate = useGameStore((state) => state.forceUpdate);
  const backHistory = useHistoryStore((state) => state.back);
  const nextHistory = useHistoryStore((state) => state.next);
  const deleteHistory = useHistoryStore((state) => state.delete);

  useHistoryStore((state) => state.cursor); /* To trigger redraw hack */

  useKeyInput([
    [
      'Escape',
      () => {
        game.reset();
        updateLastMove(null);
        forceUpdate();
      },
    ],
    ['ArrowLeft', () => backHistory()],
    ['ArrowRight', () => nextHistory()],
    [
      'Backspace',
      () => {
        deleteHistory();
        forceUpdate();
      },
    ],
  ]);

  useMovesExplorer(fen, {
    onSuccess: ({ moves }) => {
      redraw({
        autoShapes: mapMovesToAutoShapes(moves.slice(0, 5)),
      });
    },
  });

  const handleMove = useCallback(
    (from, to) => {
      const move = game.move({ from, to });

      if (move) {
        updateLastMove(move);
      }
    },
    [updateLastMove],
  );

  return (
    <Root>
      <ChessDisplay
        width="600px"
        height="600px"
        fen={fen}
        lastMove={lastMove ? [lastMove.from, lastMove.to] : null}
        movable={calculateMovable(game)}
        onMove={handleMove}
        drawable={drawable}
      />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
