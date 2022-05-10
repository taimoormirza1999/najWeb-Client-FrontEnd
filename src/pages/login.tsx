import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useState } from 'react';

import { AppConfig } from '@/utils/AppConfig';

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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const { error } = useRouter().query;

  /*   useEffect(() => {
      if (!loading && session) {
        router.push('/');
      }
    }, [loading, session]); */

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: `${window.location.origin}/customer/dashboard`,
    });
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
      <div className="bg-teal-blue flex h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mx-5 rounded-md bg-white sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-5 sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-20 w-auto"
              src="/assets/images/logo-icon-blue.png"
              alt={AppConfig.title}
            />
            <h2 className="text-dark-blue mt-6 text-center text-5xl font-semibold">
              Sign in
            </h2>
          </div>
          <div className="p-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <SignInError
                error={error}
                className="py-4 text-center text-red-400"
              />
            )}

            <form className="space-y-6" onSubmit={(e) => handleSignIn(e)}>
              <div>
                <label
                  htmlFor="email"
                  className="text-dark-blue block text-xl font-semibold"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-dark-blue block text-xl font-semibold"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="border-azure-blue bg-azure-blue hover:bg-dark-blue flex w-full justify-center rounded-md border-2 py-2 px-4 text-lg font-semibold text-white shadow-sm"
                  onClick={handleSignIn}
                >
                  Sign in
                </button>

                <Link href="/auth/newAccount">
                  <a className="border-azure-blue text-azure-blue hover:bg-dark-blue my-4 flex w-full justify-center rounded-md border-2 bg-white py-2 px-4 text-lg font-semibold shadow-sm">
                    Apply For Account
                  </a>
                </Link>
              </div>
            </form>
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
