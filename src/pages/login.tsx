import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { AppConfig } from '@/utils/AppConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoaderIcon from '@/components/LoaderIcon';

const errors = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
};
const SignInError = ({ error, className }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return <div className={className}>{errorMessage}</div>;
};

export default function Login({ locale }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const { error } = useRouter().query;
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*   useEffect(() => {
      if (!loading && session) {
        router.push('/');
      }
    }, [loading, session]); */

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result =await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: `${locale !== 'en' ? `/${locale}` : ''}/customer/dashboard`,
    });
    console.log("=>(login.tsx:52) result", result);

  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.png`}
          key="favicon"
        />
        <title>Login - {AppConfig.title}</title>
      </Head>
      <div className="bg-[#EDEDED]">
        <div className="flex h-screen flex-col justify-center bg-[#EDEDED] py-12 pt-[10%] sm:px-6 lg:px-8">
          <div className="mx-5 rounded-md bg-white sm:mx-auto sm:w-full sm:max-w-[24rem]">
            <div className="py-5 sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-20 w-auto"
                src="/assets/images/logo-icon-blue.png"
                alt={AppConfig.title}
              />
              <h2 className="text-dark-blue mt-6 text-center text-5xl font-semibold">
                <FormattedMessage id="sign.in" />
              </h2>
            </div>
            <div className="p-4 shadow sm:rounded-lg sm:px-10">
              {error && (
                <SignInError
                  error={error}
                  className="py-4 text-center text-red-400"
                />
              )}

              <form onSubmit={(e) => handleSignIn(e)}>
                <div>
                  <label
                    htmlFor="email"
                    className="text-dark-blue block text-base font-semibold"
                  >
                    <FormattedMessage id="Email" />
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Example@mail.com"
                      autoComplete="email"
                      required
                      className="border-dark-blue block w-full appearance-none rounded-md border-2 px-3 py-2 shadow-sm placeholder:text-gray-600 focus:border-azure-blue focus:outline-none sm:text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-1">
                  <label
                    htmlFor="password"
                    className="text-dark-blue block text-base font-semibold"
                  >
                    <FormattedMessage id="Password" />
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="**********"
                      autoComplete="current-password"
                      required
                      className="border-dark-blue block w-full appearance-none rounded-md border-2 px-3 py-2 shadow-sm placeholder:text-gray-600 focus:border-azure-blue focus:outline-none sm:text-sm"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="border-azure-blue bg-azure-blue hover:bg-dark-blue flex w-full justify-center rounded-md border-2 py-2 px-4 text-base font-semibold text-white shadow-sm"
                    onClick={handleSignIn}
                  >
                    {isSubmitting ? (
                     <LoaderIcon/>
                    ) : (
                      <FormattedMessage id="sign.in" />
                    )}
                  </button>

                  <Link href="/auth/newAccount">
                    <a className="border-azure-blue text-azure-blue hover:bg-dark-blue my-4 flex w-full justify-center rounded-md border-2 bg-white py-2 px-4 text-base font-semibold shadow-sm">
                      <FormattedMessage id="general.apply_for_account" />
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-[#EDEDED] pt-32">
            <Link href="/">
              <img
                className="mx-auto w-[100px] cursor-pointer"
                src="/assets/images/naj-01.png"
                alt="naj"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
