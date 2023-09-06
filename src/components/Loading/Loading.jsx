'use client';

import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { Typography } from '../Typography/Typography';

export const Loading = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 800);
  }, []);

  if (loaded) {
    return null;
  }

  return (
    <Root>
      <LogoGroup>
        <Image src="/icons/logo.svg" alt="Chess Logo" width={75} height={75} />
        <Typography weight={200}>rookie.li</Typography>
      </LogoGroup>
    </Root>
  );
};

const Root = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: var(--background-basic-color);
`;

const Glow = keyframes`
  0% {
    opacity: 1;
  }
  
  100% {
    opacity: 0.3;
  }
`;

const LogoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: progress;

  animation-name: ${Glow};
  animation-duration: 600ms;
  animation-direction: alternate;
  animation-iteration-count: infinite;
`;
