import '../styles/global.css';
import { SessionProvider } from "next-auth/react"

import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session} refetchInterval={300 * 60}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default MyApp;
