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
        <Loading />
        <ChessBoard />
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
  padding: 20px;
  gap: 20px;
  align-items: start;
  justify-content: center;

  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;

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
