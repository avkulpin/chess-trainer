import Image from 'next/image';
import styled, { css } from 'styled-components';

export const RoundIconButton = ({
  src,
  width = 20,
  height = 20,
  disabled,
  ...props
}) => {
  return (
    <Root width={width} height={height} disabled={disabled} {...props}>
      <Image src={src} alt="Round Button Icon" width={width} height={height} />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 10px;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  background-color: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: 200ms ease background-color, 200ms ease opacity;
  will-change: background-color, opacity;
  user-select: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
`;
