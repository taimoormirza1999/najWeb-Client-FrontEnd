import '../styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { IntlProvider } from 'react-intl';
import SimpleReactLightbox from 'simple-react-lightbox';

import ar from '../../lang/ar.json';
import en from '../../lang/en.json';

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
  const { locale } = useRouter();
  console.log(useRouter());
  return (
    <SessionProvider session={session} refetchInterval={300 * 60}>
      <SimpleReactLightbox>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <Component {...pageProps} dir={getDirection(locale)} />
        </IntlProvider>
      </SimpleReactLightbox>
    </SessionProvider>
  );
}

export default MyApp;
