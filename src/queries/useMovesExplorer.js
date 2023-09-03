import { useQuery } from 'react-query';
import { api } from '../services/api/api';

export const useMovesExplorer = (fen, { onSuccess } = {}) =>
  useQuery(['explorer', fen], async () => api.getExplorerMoves(fen), {
    select: ({ data }) => data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: Boolean(fen),
    keepPreviousData: true,
    onSuccess,
  });
