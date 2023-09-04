import { useMemo } from 'react';
import styled from 'styled-components';
import { IconButton } from '../Button/IconButton';
import { RoundIconButton } from '../Button/RoundIconButton';
import { Tooltip } from '../Tooltip/Tooltip';
import { ButtonVariant } from '../Button/Button';
import { useGameStore } from '../../store/game';
import { usePracticeStore } from '../../store/practice';

export const PracticeMenu = () => {
  const history = useGameStore((state) => state.history);
  const practiceEnabled = usePracticeStore((state) => state.enabled);
  const startPractice = usePracticeStore((state) => state.startPractice);
  const stopPractice = usePracticeStore((state) => state.stopPractice);
  const disabled = useMemo(() => !history.length, [history]);

  return (
    <Root>
      {practiceEnabled ? (
        <Tooltip label="Stop practice" delay={400} disabled={disabled}>
          <IconButton
            disabled={disabled}
            src="/icons/controls/stop.svg"
            variant={ButtonVariant.WARNING}
            onClick={stopPractice}
          />
        </Tooltip>
      ) : (
        <>
          <Tooltip label="Practice solo" delay={400} disabled={disabled}>
            <IconButton
              disabled={disabled}
              src="/icons/run.svg"
              variant={ButtonVariant.SECONDARY}
              onClick={startPractice}
            />
          </Tooltip>
          <Tooltip label="Practice against bot" delay={400} disabled={disabled}>
            <IconButton
              disabled={disabled}
              src="/icons/robot.svg"
              variant={ButtonVariant.SECONDARY}
            />
          </Tooltip>
        </>
      )}
    </Root>
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

const ControlButton = styled(RoundIconButton)`
  width: 40px;
  height: 40px;
`;
