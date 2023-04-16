import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <SessionProvider>
      <div className={inter.className}>
        <Toaster />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
