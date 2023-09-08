import { useRef, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Typography } from '../Typography/Typography';
import { SavedFolder } from './DynamicSaveDropdown';
import { useTimeMachineStore } from '../../store/timeMachine';
import { useMovesExplorer } from '../../queries/useMovesExplorer';
import { useGameStore } from '../../store/game';
import { useVariationStore } from '../../store/variation';
import { toPairs } from '../../utils/misc';

export const ChessTimeline = () => {
  const openingName = useRef();
  const fen = useGameStore((state) => state.fen);
  const history = useGameStore((state) => state.history);

  useMovesExplorer(fen, {
    onSuccess: (data) => {
      openingName.current = history.length
        ? data?.opening?.name || openingName.current
        : data?.opening?.name;
    },
  });

  return (
    <Root>
      <Header>
        <Typography size={16} weight={200}>
          {openingName.current}
        </Typography>
        <SavedFolder />
      </Header>
      <Body>
        {!history.length && (
          <GameNotationOverlay>
            <GameNotation size={14}>Variation Notation</GameNotation>
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
  const historyPairs = useMemo(() => {
    return toPairs(history);
  }, [history]);

  const { data: explorerMoves } = useMovesExplorer(game.fen());

  if (!history.length) {
    return null;
  }

  return (
    <MoveNotationRoot>
      {historyPairs.map(([itemA, itemB], index) => (
        <NotationLine
          key={`${itemA}:${itemB}:${index}`}
          itemA={itemA}
          itemB={itemB}
          index={index + 1}
          isItemASelected={
            cursorIndex !== null
              ? cursorIndex === index * 2 + 1
              : history.length === index * 2 + 1
          }
          isItemBSelected={
            cursorIndex !== null
              ? cursorIndex === index * 2 + 2
              : history.length === index * 2 + 2
          }
          onItemAClick={() => travelTo(index * 2 + 1)}
          onItemBClick={() => travelTo(index * 2 + 2)}
        />
      ))}
      {/*<Tooltip*/}
      {/*  label="Save variation"*/}
      {/*  delay={150}*/}
      {/*  onClick={() =>*/}
      {/*    save({*/}
      {/*      fen: game.fen(),*/}
      {/*      pgn: game.history().join('\n'),*/}
      {/*      name: explorerMoves?.opening?.name,*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*  <IconButton src="/icons/save.svg" variant={ButtonVariant.SECONDARY} />*/}
      {/*</Tooltip>*/}
    </MoveNotationRoot>
  );
};

const NotationLine = ({
  itemA,
  itemB,
  index,
  isItemASelected,
  isItemBSelected,
  onItemAClick,
  onItemBClick,
}) => {
  return (
    <NotationGridLine>
      <MoveNotationIndex>
        <Typography size={14}>
          <MoveIndex>{index}.</MoveIndex>
        </Typography>
      </MoveNotationIndex>
      <MoveNotationIndex>
        <Notation selected={isItemASelected} onClick={onItemAClick}>
          <Typography size={14}>{itemA}</Typography>
        </Notation>
      </MoveNotationIndex>
      {itemB && (
        <MoveNotationIndex>
          <Notation selected={isItemBSelected} onClick={onItemBClick}>
            <Typography size={14}>{itemB}</Typography>
          </Notation>
        </MoveNotationIndex>
      )}
    </NotationGridLine>
  );
};

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: var(--background-panel-color);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #333;
  padding: 10px;
  background-color: var(--background-panel-header-color);
`;

const Body = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  height: 320px;
  overflow: scroll;
  flex-wrap: wrap;
`;

const Notation = styled.div`
  cursor: pointer;
  height: fit-content;
  border-radius: 8px;
  padding: 4px 8px;
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

  &::before {
    content: '';
    background: url('/icons/logo.svg') no-repeat 50% 50%;
    opacity: 0.02;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(1px);
  }
`;

const GameNotation = styled(Typography)`
  color: var(--font-bleak-color);
`;

const MoveIndex = styled.span`
  color: var(--font-secondary-color);
`;

const MoveNotationRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;

  & > :nth-child(even) {
    background-color: var(--background-light-panel-color) !important;
  }
`;

const NotationGridLine = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5px 50px 50px;
  grid-column-gap: 15px;
  height: 40px;
  padding: 0 15px;
`;

const MoveNotationIndex = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  height: 20px;
`;
