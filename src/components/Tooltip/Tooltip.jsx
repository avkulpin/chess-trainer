import { useState, useCallback, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import { Typography } from '../Typography/Typography';
import { modalPopup, modalPopout } from '../styles/keyframes/ModalPopup';

export const Tooltip = forwardRef(
  ({ label, delay = 400, top, children, ...props }, ref) => {
    const timeoutRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const handleShow = useCallback(() => {
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
      }, delay);
    }, [label, delay]);

    const handleHide = useCallback(() => {
      clearInterval(timeoutRef.current);
      setVisible(false);
    }, [label, delay]);

    return (
      <Root
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        {...props}
        ref={ref}
      >
        {children}
        {visible && (
          <Info open={visible} top={top}>
            <Label size={14}>{label}</Label>
            <TipRoot>
              <Tip />
            </TipRoot>
          </Info>
        )}
      </Root>
    );
  },
);

Tooltip.displayName = 'Tooltip';

const Root = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
`;

const Info = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  top: ${({ top }) => top || '-25px'};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 2px 5px;
  border: 1px solid var(--font-bleak-color);
  background-color: var(--background-basic-color);
  backdrop-filter: blur(2px);
  z-index: 100;
  white-space: nowrap;
  width: fit-content;
  cursor: default;

  animation-name: ${({ open }) => (open ? modalPopup : modalPopout)};
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
  animation-duration: 120ms;

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    width: 50%;
    height: 10px;
  }
`;

const Label = styled(Typography)`
  color: var(--font-secondary-color);
`;

const TipRoot = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: end;
  top: 26px;
  overflow: hidden;
  width: 20px;
  height: 10px;
  transform: rotate(180deg);

  @media (max-width: 768px) {
    left: 240px;
  }
`;

const Tip = styled.div`
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  border: 1px solid var(--font-bleak-color);
  background-color: var(--background-basic-color);
`;
