import { keyframes } from 'styled-components';

export const modalPopup = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.01);
    filter: blur(20px);
    opacity: 0;
  }
  20% {
    transform: translate(-50%, -50%) scale(0.9);
    filter: blur(5px);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    filter: blur(0px);
    opacity: 1;
  }
`;

export const modalPopout = keyframes`
  0% {
    transform: translate(-50%, -50%) translateY(0px) scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  80% {
    transform: translate(-50%, -50%) translateY(20px) scale(0.98);
    filter: blur(2px);
    opacity: 0.2;
  }
  100% {
    transform: translate(-50%, -50%) translateY(40px) scale(0.97);
    filter: blur(5px);
    opacity: 0;
  }
`;
