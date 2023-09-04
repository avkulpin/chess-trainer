'use client';
import './styles/base.css';
import './styles/theme.css';
import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { useWindowSize } from 'react-use';
import { Chessground } from 'chessground';
import { calculateMovable } from './utils';

const baseDrawableOptions = {
  autoShapes: [],
  shapes: [],
  enabled: true,
  visible: true,
  defaultSnapToValidMove: true,
  eraseOnClick: false,
  brushes: {},
  pieces: { baseUrl: '' },
  prevSvgHash: '',
};

export const ChessDisplay = ({ game, fen, drawable, lastMove, onMove }) => {
  const { width, height } = useWindowSize();
  const events = useMemo(() => ({ move: onMove }), [onMove]);
  const styles = useMemo(
    () => ({
      width: `${Math.min(width, height) - 40}px`,
      height: `${Math.min(width, height) - 40}px`,
    }),
    [width, height],
  );
  const chessGround = useRef();
  const element = useRef();
  const movable = useMemo(() => calculateMovable(game), [fen, game]);

  useLayoutEffect(() => {
    if (element.current) {
      chessGround.current = Chessground(element.current, {
        fen,
        resizable: true,
        movable,
        events,
        lastMove,
        animation: {
          duration: 200,
        },
        drawable: {
          ...baseDrawableOptions,
          ...drawable,
        },
      });
    }
  }, []);

  useEffect(() => {
    chessGround?.current?.set({
      fen,
      width: Math.min(width, height),
      height: Math.min(width, height),
      movable,
      events,
      drawable: {
        ...baseDrawableOptions,
        ...drawable,
      },
    });
  }, [drawable, fen, events, height, width]);

  return <div ref={element} style={styles} />;
};
