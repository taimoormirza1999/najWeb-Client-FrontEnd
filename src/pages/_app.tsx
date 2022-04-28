import '../styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

config.autoAddCss = false;

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session} refetchInterval={300 * 60}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default MyApp;
