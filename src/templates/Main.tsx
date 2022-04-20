import Link from 'next/link';
import { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react'

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const { data: session } = useSession()

  return (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="text-3xl font-bold text-gray-900">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div>
        <div>
          <ul className="flex flex-wrap text-xl">
            <li className="mr-6">
              <Link href="/">
                <a className="border-none text-gray-700 hover:text-gray-900">
                  Home
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/about/">
                <a className="border-none text-gray-700 hover:text-gray-900">
                  About
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/customer/dashboard/">
                <a className="border-none text-gray-700 hover:text-gray-900">
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="mr-6">
              {!session ?
              <Link href="/login/">
                <a className="border-none text-gray-700 hover:text-gray-900">
                  Sign In
                </a>
              </Link>
              :
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: `${window.location.origin}`
                  })
                }
              >
                Sign out
              </button>
              }
            </li>
          </ul>
        </div>
      </div>

      <div className="content py-5 text-xl">{props.children}</div>

      <div className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}
      </div>
    </div>
  </div>
);
}

export { Main };
