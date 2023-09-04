'use client';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChessBoard } from '../components/ChessBoard/ChessBoard';
import { ChessTimeline } from '../components/ChessTimeline/ChessTimeline';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Root>
        <ChessBoard />
        <ChessTimeline />
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
  align-items: center;
  justify-content: center;
`;
