import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { StyledComponentsProvider } from '../providers/StyledComponentsProvider';
import { Loading } from '../components/Loading/Loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chess Opening Trainer',
  description: 'Chess Opening Trainer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Loading />
        <StyledComponentsProvider>{children}</StyledComponentsProvider>
        <Script src="/stockfish/v15/stockfish.js" />
      </body>
    </html>
  );
}
