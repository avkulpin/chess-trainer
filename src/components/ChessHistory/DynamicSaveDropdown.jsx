import dynamic from 'next/dynamic';

export const SavedFolder = dynamic(
  () => import('./SavedDropdown').then((module) => module.SavedFolder),
  { ssr: false },
);
