import '../styles/global.css';

import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session} refetchInterval={300 * 60}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default MyApp;
