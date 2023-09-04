import { useMemo } from 'react';
import styled from 'styled-components';
import { IconButton } from '../Button/IconButton';
import { RoundIconButton } from '../Button/RoundIconButton';
import { useGameStore } from '../../store/game';
import { useTimeMachineStore } from '../../store/timeMachine';
import { isNil } from '../../utils/misc';
import { Tooltip } from '../Tooltip/Tooltip';
import { ButtonVariant } from '../Button/Button';

export const PracticeMenu = () => {
  const history = useGameStore((state) => state.history);
  // const cursorIndex = useTimeMachineStore(state => state.cursorIndex);
  // const travelBack = useTimeMachineStore(state => state.travelBack);
  // const travelForward = useTimeMachineStore(state => state.travelForward);
  // const travelTo = useTimeMachineStore(state => state.travelTo);
  const disabled = useMemo(() => !history.length, [history]);

  return (
    <Root>
      <Tooltip label="Practice solo" delay={200} disabled={disabled}>
        <IconButton
          disabled={disabled}
          src="/icons/run.svg"
          variant={ButtonVariant.SECONDARY}
        />
      </Tooltip>
      <Tooltip label="Practice against bot" delay={200} disabled={disabled}>
        <IconButton
          disabled={disabled}
          src="/icons/robot.svg"
          variant={ButtonVariant.SECONDARY}
        />
      </Tooltip>
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
