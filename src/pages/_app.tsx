import { IntlProvider } from "react-intl";
import '../styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ar from "../../lang/ar.json";
import en from "../../lang/en.json";
import { config } from '@fortawesome/fontawesome-svg-core';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import SimpleReactLightbox from 'simple-react-lightbox';
import { useRouter } from "next/router";

config.autoAddCss = false;

const messages = {
  ar,
  en,
};

function getDirection(locale) {
  if (locale === "ar") {
    return "rtl";
  }
  return "ltr";
}

function MyApp({ Component, pageProps,session }) {
  const { locale } = useRouter();
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
