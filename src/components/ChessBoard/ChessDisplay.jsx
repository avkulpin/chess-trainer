'use client';
import './base.css';
import './theme.css';
import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { Chessground } from 'chessground';

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

export const ChessDisplay = (props) => {
  const events = useMemo(() => ({ move: props.onMove }), []);
  const chessGround = useRef();
  const element = useRef();

  const { style, width, height } = props;

  useLayoutEffect(() => {
    if (element.current) {
      chessGround.current = Chessground(element.current, {
        ...props,
        events,
        animation: {
          duration: 300,
        },
        drawable: {
          ...baseDrawableOptions,
          ...props.drawable,
        },
      });
    }
  }, []);

  useEffect(() => {
    chessGround?.current?.set({
      ...props,
      drawable: {
        ...baseDrawableOptions,
        ...props.drawable,
      },
    });
  }, [props]);

  const styleProps = { style: { ...style } };
  if (width) {
    styleProps.style.width = props.width;
  }

  if (height) {
    styleProps.style.height = props.height;
  }

  return <div ref={element} style={styleProps.style} />;
};
