'use client';
import './styles/base.css';
import './styles/theme.css';
import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
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

export const ChessDisplay = ({
  game,
  fen,
  width,
  height,
  drawable,
  lastMove,
  onMove,
}) => {
  const events = useMemo(() => ({ move: onMove }), [onMove]);
  const styles = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  );
  const chessGround = useRef();
  const element = useRef();
  const movable = useMemo(() => calculateMovable(game), [fen, game]);

  useLayoutEffect(() => {
    if (element.current) {
      chessGround.current = Chessground(element.current, {
        width,
        height,
        fen,
        movable,
        events,
        lastMove,
        animation: {
          duration: 300,
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
      movable,
      events,
      drawable: {
        ...baseDrawableOptions,
        ...drawable,
      },
    });
  }, [drawable, fen, events]);

  return <div ref={element} style={styles} />;
};
