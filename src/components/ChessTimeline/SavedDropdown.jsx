import { useState, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FolderButton } from './FolderButton';
import { Tooltip } from '../Tooltip/Tooltip';
import { Typography } from '../Typography/Typography';
import { BinButton } from './BinButton';
import { ChessDisplay } from '../ChessBoard/ChessDisplay';
import { useOutsideAction } from '../../hooks/useOutsideAction';
import { useVariationStore } from '../../store/variation';
import { useGameStore } from '../../store/game';

export const SavedFolder = () => {
  const ref = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleChange = () => {};

  return (
    <Root>
      <Tooltip label="Saved variations" delay={150} ref={ref}>
        <FolderButton onClick={() => setDropdownOpen((state) => !state)} />
      </Tooltip>
      <SavedDropdown
        parentRef={ref}
        open={isDropdownOpen}
        onChange={handleChange}
        onClose={() => setDropdownOpen(false)}
      />
    </Root>
  );
};

export const SavedDropdown = ({ parentRef, open, onClose }) => {
  const load = useGameStore((state) => state.load);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const variations = useVariationStore((state) => state.variations);
  const deleteVariation = useVariationStore((state) => state.deleteVariation);

  if (open && !visible) {
    return setVisible(true);
  }

  const handleAnimationEnd = useCallback(() => {
    if (!open) {
      setVisible(open);
    }
  }, [open]);

  useOutsideAction(ref, () => onClose(), parentRef);

  return (
    <DropdownRoot
      ref={ref}
      open={open}
      visible={visible}
      onAnimationEnd={handleAnimationEnd}
    >
      {variations?.map?.((variation) => (
        <VariationButton
          key={variation.pgn}
          onClick={() => {
            load(variation);
            onClose();
          }}
        >
          <LabelWrap>
            <Typography size={12}>{variation.name}</Typography>
          </LabelWrap>
          <LabelWrap>
            <Typography size={12}>{variation.pgn}</Typography>
          </LabelWrap>
          {/*<Board>*/}
          {/*  <ChessDisplay*/}
          {/*    width="110px"*/}
          {/*    height="110px"*/}
          {/*    fen={variation}*/}
          {/*    coordinates={false}*/}
          {/*  />*/}
          {/*</Board>*/}
          <BinButton
            onClick={() => {
              deleteVariation(variation);
            }}
          />
        </VariationButton>
      ))}
    </DropdownRoot>
  );
};

const slideIn = keyframes`
  0% {
    transform: translateY(-10%) translateX(-50%) perspective(500px) rotateX(-20deg);
    filter: blur(20px);
    opacity: 0;
  }
  20% {
    transform: translateY(-5%) translateX(-50%) perspective(500px) rotateX(-10deg);
    filter: blur(5px);
    opacity: 1;
  }
  100% {
    transform: translateY(0) translateX(-50%) perspective(500px) rotateX(0);
    filter: blur(0px);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(-50%) perspective(500px) rotateX(0);
    filter: blur(0px);
    opacity: 1;
  }
  10% {
    transform: translateX(-50%) perspective(500px) rotateX(-10deg);
    filter: blur(2px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(-50%) perspective(500px) rotateX(-20deg);
    filter: blur(10px);
    opacity: 0;
  }
`;

const Root = styled.div`
  position: relative;
`;

const DropdownRoot = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  position: absolute;
  z-index: 10;
  transform: translateX(-50%);
  top: 65px;
  background-color: var(--background-panel-color);
  border: 1px solid var(--font-bleak-color);
  width: 500px;
  border-radius: 16px;
  padding: 24px;

  animation-name: ${({ open }) => (open ? slideIn : slideOut)};
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
  animation-duration: 200ms;

  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  left: unset;
  right: -180px;
`;

const VariationButton = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const LabelWrap = styled.div`
  display: flex;
  overflow-x: hidden;
`;

const Board = styled.div`
  display: flex;
  gap: 5px;
  padding: 8px;
  cursor: pointer;
  border: var(--border-radius-sm);
  transition: 200ms ease background-color;
  will-change: background-color;
`;

// const TipRoot = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: end;
//   top: -14px;
//   overflow: hidden;
//   width: 20px;
//   height: 14px;
//   left: 250px;
// `;
//
// const Tip = styled.div`
//   position: absolute;
//   top: 50%;
//   width: 20px;
//   height: 20px;
//   transform: rotate(45deg);
//   background-color: var(--background-panel-color);
//   border: 1px solid var(--font-bleak-color);
// `;
