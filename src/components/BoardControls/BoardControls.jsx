import { useMemo } from 'react';
import styled from 'styled-components';
import { RoundIconButton } from '../Button/RoundIconButton';
import { useGameStore } from '../../store/game';
import { useTimeMachineStore } from '../../store/timeMachine';
import { isNil } from '../../utils/misc';

export const BoardControls = () => {
  const history = useGameStore((state) => state.history);
  const cursorIndex = useTimeMachineStore((state) => state.cursorIndex);
  const travelBack = useTimeMachineStore((state) => state.travelBack);
  const travelForward = useTimeMachineStore((state) => state.travelForward);
  const travelTo = useTimeMachineStore((state) => state.travelTo);
  const disabled = useMemo(() => !history.length, [history]);

  const hasReachedTopLeft = useMemo(
    () => cursorIndex === 0,
    [cursorIndex, history],
  );
  const hasReachedTopRight = useMemo(
    () => isNil(cursorIndex) || cursorIndex === history.length,
    [cursorIndex, history],
  );

  return (
    <Root>
      <ControlButton
        onClick={() => travelTo(0)}
        disabled={disabled || hasReachedTopLeft}
        src="/icons/controls/skip-left.svg"
      />
      <ControlButton
        onClick={travelBack}
        disabled={disabled || hasReachedTopLeft}
        src="/icons/controls/arrow-left.svg"
      />
      <ControlButton
        onClick={travelForward}
        disabled={disabled || hasReachedTopRight}
        src="/icons/controls/arrow-right.svg"
      />
      <ControlButton
        onClick={() => travelTo(history.length)}
        disabled={disabled || hasReachedTopRight}
        src="/icons/controls/skip-right.svg"
      />
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
