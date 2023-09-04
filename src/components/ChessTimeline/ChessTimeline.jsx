import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Typography } from '../Typography/Typography';
import { ButtonVariant } from '../Button/Button';
import { IconButton } from '../Button/IconButton';
import { Tooltip } from '../Tooltip/Tooltip';
import { SavedFolder } from './DynamicSaveDropdown';
import { useTimeMachineStore } from '../../store/timeMachine';
import { useMovesExplorer } from '../../queries/useMovesExplorer';
import { useGameStore } from '../../store/game';
import { useVariationStore } from '../../store/variation';

export const ChessTimeline = () => {
  const openingName = useRef();
  const fen = useGameStore((state) => state.fen);
  const timeline = useTimeMachineStore((state) => state.timeline);

  useMovesExplorer(fen, {
    onSuccess: (data) => {
      openingName.current = timeline.length
        ? data?.opening?.name || openingName.current
        : data?.opening?.name;
    },
  });

  return (
    <Root>
      <Header>
        <Typography>{openingName.current}</Typography>
        <SavedFolder />
      </Header>
      <Body>
        {!timeline.length && (
          <GameNotationOverlay>
            <GameNotation size={13}>Variation Notation</GameNotation>
          </GameNotationOverlay>
        )}
        <MovesNotation />
      </Body>
    </Root>
  );
};

const MovesNotation = () => {
  const game = useGameStore((state) => state.game);
  const history = useGameStore((state) => state.history);
  const cursorIndex = useTimeMachineStore((state) => state.cursorIndex);
  const travelTo = useTimeMachineStore((state) => state.travelTo);
  const save = useVariationStore((state) => state.saveVariation);

  if (!history.length) {
    return null;
  }

  return (
    <MoveNotationRoot>
      {history.map((item, index) => (
        <Notation
          key={`${item}:${index}`}
          selected={
            cursorIndex !== null
              ? cursorIndex === index + 1
              : history.length === index + 1
          }
          onClick={() => travelTo(index + 1)}
        >
          <Typography size={14}>
            <MoveIndex>{index + 1}.</MoveIndex> {item}
          </Typography>
        </Notation>
      ))}
      <Tooltip
        label="Save variation"
        delay={150}
        onClick={() => save(game.fen())}
      >
        <IconButton src="/icons/save.svg" variant={ButtonVariant.SECONDARY} />
      </Tooltip>
    </MoveNotationRoot>
  );
};

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  max-width: 380px;
  border-radius: 8px;
  background-color: var(--background-panel-color);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #333;
  padding: 10px;
  background-color: var(--background-panel-header-color);
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 2px;
`;

const Notation = styled.div`
  cursor: pointer;
  height: fit-content;
  border-radius: 8px;
  padding: 4px;
  border: 1px solid transparent;
  background-color: transparent;
  transition: 200ms ease background-color;
  will-change: background-color;

  ${({ selected }) =>
    selected &&
    css`
      border: 1px solid var(--highlight-color);
      background-color: var(--border-line-color);
    `}

  ${({ selected }) =>
    !selected &&
    css`
      &:hover {
        background-color: var(--border-line-color);
      }
    `}
`;

const GameNotationOverlay = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const GameNotation = styled(Typography)`
  color: var(--font-bleak-color);
`;

const MoveIndex = styled.span`
  color: var(--font-secondary-color);
`;

const MoveNotationRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;
