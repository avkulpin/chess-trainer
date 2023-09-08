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

export const ChessDisplay = ({
  game,
  fen,
  orientation,
  drawable,
  lastMove,
  onMove,
  styles,
}) => {
  const events = useMemo(() => ({ move: onMove }), [onMove]);
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
      // width: styles.width,
      // height: styles.height,
      movable,
      events,
      drawable: {
        ...baseDrawableOptions,
        ...drawable,
      },
    });
  }, [drawable, fen, events, styles]);

  useEffect(() => {
    if (chessGround?.current?.state?.orientation !== orientation) {
      chessGround?.current.toggleOrientation();
    }
  }, [orientation]);

  return <div ref={element} style={styles} />;
};
