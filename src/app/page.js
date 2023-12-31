'use client';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Dynamic as ChessBoard } from '../components/ChessBoard/Dynamic';
import { ChessTimeline } from '../components/ChessTimeline/ChessTimeline';
import { BoardControls } from '../components/BoardControls/BoardControls';
import { PracticeMenu } from '../components/PracticeMenu/PracticeMenu';
import { Loading } from '../components/Loading/Loading';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Root>
        <MainBoard>
          <ChessBoard />
        </MainBoard>
        <SidePanel>
          <SidePanelInner>
            <ChessTimeline />
            <BoardControls />
            <PracticeMenu />
          </SidePanelInner>
        </SidePanel>
      </Root>
    </QueryClientProvider>
  );
}

const Root = styled.div`
  display: flex;
  padding-top: 20px;
  gap: 20px;
  align-items: stretch;
  justify-content: center;

  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

const MainBoard = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  max-height: 100vh;
  overflow: hidden;
  max-width: calc(100vh - 50px);
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  flex-shrink: 0;

  @media (max-width: 970px) {
    width: 100%;
  }
`;

const SidePanelInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;
