import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Fragment, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

import { classNames } from '@/utils/Functions';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const navigation = [
  {
    name: 'Summaries',
    href: `/customer/dashboard`,
    gicon: '&#xe14f;',
    current: true,
  },
  {
    name: 'Statement',
    href: '/customer/statement',
    gicon: '&#xe853;',
    current: false,
  },
  {
    name: 'Price Lists',
    href: `/customer/lists`,
    gicon: '&#xe14f;',
    current: false,
  },
  {
    name: 'Estimate Calculator',
    href: '/customer/shippingCalculator',
    gicon: 'e14f',
    current: false,
  },
  {
    name: 'Tracking',
    href: '/customer/tracking',
    gicon: '&#xe853;',
    current: false,
  },
  {
    name: 'Complaints',
    href: '/customer/complaints',
    gicon: '&#xe14f;',
    current: false,
  },
  {
    name: 'Terms & Conditions',
    href: '/customer/termsandconditions',
    gicon: '&#xe14f;',
    current: false,
  },
];
function getDirection(locale) {
  if (locale === 'ar') {
    return 'rtl';
  }
  return 'ltr';
}
const Layout = (props: IMainProps) => {
  const { locale } = useRouter();
  if (typeof window !== 'undefined') {
    document.body.setAttribute('dir', getDirection(locale));
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const fullName = session?.profile[0]?.full_name;
  return (
    <>
      {props.meta}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="bg-light-grey relative flex w-full max-w-xs flex-1 flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex shrink-0 items-center px-4">
                    <Link href="/">
                      <a>
                        <img
                          className="h-8 w-auto"
                          src="/assets/images/logo-en.png"
                          alt="Nejoum Al Jazeera"
                        />
                      </a>
                    </Link>
                  </div>
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <i className="material-icons text-xs lg:mr-2">
                            &#xe14f;
                          </i>
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex shrink-0 border-t border-gray-200 p-4">
                  <a href="#" className="group block shrink-0">
                    <div className="flex">
                      <div>
                        <i className="material-icons text-yellow-orange text-2xl">
                          &#xe853;
                        </i>
                      </div>
                      <div className="">
                        <p className="text-xs font-medium text-gray-700 group-hover:text-gray-900 sm:text-xl">
                          {fullName}
                        </p>
                        <p
                          className="text-medium-gray text-xs font-medium group-hover:text-gray-700"
                          onClick={() =>
                            signOut({
                              callbackUrl: `${window.location.origin}`,
                            })
                          }
                        >
                          <i className="material-icons text-xs lg:mr-2">
                            &#xe9ba;
                          </i>
                          Sign out
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="w-14 shrink-0">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-[20%] md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="bg-light-grey flex min-h-0 flex-1 flex-col border-r border-gray-200">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="mb-12 mt-4 flex shrink-0 items-center px-2">
                <Link href="/">
                  <a>
                    <img
                      className="w-auto"
                      src="/assets/images/logo-en.png"
                      alt="Nejoum Al Jazeera"
                    />
                  </a>
                </Link>
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.current
                          ? 'bg-hover-grey text-gray-900'
                          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
                        'group flex items-center pl-1 pr-0 py-2 font-medium rounded-md hover:border-inherit text-xs sm:text-xl'
                      )}
                    >
                      <i className="material-icons text-3xl lg:mr-2">
                        &#xe14f;
                      </i>
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex shrink-0 border-t border-gray-200 p-4">
              <div className="flex">
                <div>
                  <i className="material-icons text-yellow-orange text-3xl">
                    &#xe853;
                  </i>
                </div>
                <div className="">
                  <Link href="/customer/userprofile">
                    <a className="group block w-full shrink-0 hover:border-inherit">
                      <p className="text-xs font-medium text-gray-700 group-hover:text-gray-900 sm:text-xl ">
                        {fullName}
                      </p>
                    </a>
                  </Link>
                  <a
                    href="#"
                    className="group block w-full shrink-0 hover:border-inherit"
                  >
                    <p
                      className="text-medium-gray text-xs font-medium group-hover:text-gray-700"
                      onClick={() =>
                        signOut({
                          callbackUrl: `${window.location.origin}`,
                        })
                      }
                    >
                      <i className="material-icons text-xs lg:mr-2">&#xe9ba;</i>
                      Sign out
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:w-[100%] ltr:md:pl-[20%] rtl:md:pr-[20%]">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="bg-dark-blue pb-5 pt-8">
              <div className="ml-6 px-4 pb-6 sm:px-6 sm:pb-4 lg:flex lg:justify-between lg:px-6 lg:pt-12">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-normal text-white sm:tracking-tight">
                    Welcome {fullName}
                  </h2>
                </div>
              </div>
            </div>
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

export { Layout };
