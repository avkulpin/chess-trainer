import dynamic from 'next/dynamic';

export const Dynamic = dynamic(
  () => import('./ChessBoard').then((module) => module.ChessBoard),
  { ssr: false },
);
