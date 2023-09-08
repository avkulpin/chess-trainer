import { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '../Button/IconButton';
import { Tooltip } from '../Tooltip/Tooltip';
import { ButtonVariant } from '../Button/Button';
import { useGameStore } from '../../store/game';
import { usePracticeStore } from '../../store/practice';
import { useEngineStore } from '../../store/engine';
import { Counter } from './Counter';
import { Typography } from '../Typography/Typography';

export const PracticeMenu = () => {
  const practiceEnabled = usePracticeStore((state) => state.enabled);
  const startPractice = usePracticeStore((state) => state.startPractice);
  const stopPractice = usePracticeStore((state) => state.stopPractice);
  const disabled = useMemo(() => false, []);

  return (
    <Root>
      {practiceEnabled ? (
        <>
          <Tooltip label="Stop practice" delay={400} disabled={disabled}>
            <IconButton
              disabled={disabled}
              src="/icons/controls/stop.svg"
              variant={ButtonVariant.WARNING}
              onClick={stopPractice}
            />
          </Tooltip>
          <EngineInfo />
        </>
      ) : (
        <>
          <Tooltip label="Practice solo" delay={400} disabled={disabled}>
            <IconButton
              src="/icons/run.svg"
              disabled={disabled}
              variant={ButtonVariant.SECONDARY}
              onClick={startPractice}
            />
          </Tooltip>
          <Tooltip label="Practice against bot" delay={400} disabled={disabled}>
            <IconButton
              src="/icons/robot.svg"
              disabled={disabled}
              variant={ButtonVariant.SECONDARY}
              onClick={startPractice}
            />
          </Tooltip>
        </>
      )}
    </Root>
  );
};

const getCurrentUserTurn = (orientation, turn) => {
  const map = {
    white: 'w',
    black: 'b',
  };

  return map[orientation] === turn;
};

const EngineInfo = () => {
  const currentMove = useGameStore((state) => state.currentMove);
  const orientation = useGameStore((state) => state.orientation);
  const evaluation = useEngineStore((state) => state.evaluation);
  const work = useEngineStore((state) => state.work);
  const bestMove = useEngineStore((state) => state.bestMove);

  let score = evaluation?.cp;
  const userTurn = getCurrentUserTurn(orientation, work?.turn);

  if (!userTurn) {
    score *= -1;
  }

  return (
    <Info>
      {currentMove?.lan === `${bestMove?.from}${bestMove?.to}` && !userTurn ? (
        <Typography size={12} color="#599a11">
          Found the best move
        </Typography>
      ) : (
        <Counter value={score} />
      )}
    </Info>
  );
};

const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100px;
  border-radius: var(--border-radius-sm);
  background-color: var(--background-panel-color);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
