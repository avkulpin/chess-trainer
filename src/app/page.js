'use client';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Dynamic as ChessBoard } from '../components/ChessBoard/Dynamic';
import { ChessTimeline } from '../components/ChessTimeline/ChessTimeline';
import { BoardControls } from '../components/BoardControls/BoardControls';
import { PracticeMenu } from '../components/PracticeMenu/PracticeMenu';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Root>
        <MainBoard>
          <ChessBoard />
        </MainBoard>
        <SidePanel>
          <ChessTimeline />
          <BoardControls />
          <PracticeMenu />
        </SidePanel>
      </Root>
    </QueryClientProvider>
  );
}

const Root = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  width: 100vw;
  height: 100vh;
  align-items: start;
  justify-content: center;
`;

const MainBoard = styled.div`
  display: flex;
  height: 100%;
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 25%;
  gap: 10px;

  &:first-child {
    flex-grow: 1;
  }
`;
