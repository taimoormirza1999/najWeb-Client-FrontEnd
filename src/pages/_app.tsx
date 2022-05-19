import '../styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { Router, useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import SimpleReactLightbox from 'simple-react-lightbox';

import Loader from '@/components/Loader';

import ar from '../../lang/ar.json';
import en from '../../lang/en.json';
import UserContext from '../components/UserContext';

config.autoAddCss = false;

const messages = {
  ar,
  en,
};

function getDirection(locale) {
  if (locale === 'ar') {
    return 'rtl';
  }
  return 'ltr';
}

function MyApp({ Component, pageProps, session }) {
  const { locale = 'en' } = useRouter();
  const [loading, setLoading] = React.useState(false);

  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });
  return (
    <SessionProvider session={session} refetchInterval={300 * 60}>
      <SimpleReactLightbox>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <UserContext.Provider
            value={{
              setLoading,
            }}
          >
            <Component
              {...pageProps}
              dir={getDirection(locale)}
              locale={locale}
            />
            {loading && <Loader></Loader>}
          </UserContext.Provider>
        </IntlProvider>
      </SimpleReactLightbox>
    </SessionProvider>
  );
}

export default MyApp;
