import dynamic from 'next/dynamic';
import { Loading } from '../Loading/Loading';

export const Dynamic = dynamic(
  () => import('./ChessBoard').then((module) => module.ChessBoard),
  { ssr: false },
);
