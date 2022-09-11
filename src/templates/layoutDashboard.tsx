import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { classNames } from '@/utils/Functions';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};
function getDirection(locale) {
  if (locale === 'ar') {
    return 'rtl';
  }
  return 'ltr';
}
const Layout = (props: IMainProps) => {
  const [customerBalance, setCustomerBalance] = useState(0);
  const GetCustomerBalance = async () => {
    const res = await axios.get(`/api/customer/customer_balance`);
    setCustomerBalance(parseFloat(res.data?.data));
  };
  useEffect(() => {
    GetCustomerBalance();
  });
  const router = useRouter();
  const navigation = [
    {
      name: 'page.customer.dashboard.navigation_summaries',
      href: `/customer/dashboard`,
      gicon: '&#xe14f;',
      current: true,
    },
    {
      name: 'page.customer.dashboard.navigation_containers',
      href: `/customer/containers/?tab=inShipping`,
      gicon: '&#xf8ee;',
      current: false,
    },
    {
      name: 'page.customer.dashboard.navigation_statement',
      href: '/customer/statement',
      gicon: '&#xe873;',
      current: false,
    },
    {
      name: 'page.customer.dashboard.navigation_price_lists',
      href: `/customer/lists`,
      gicon: '&#xf1b6;',
      current: false,
    },
    {
      name: 'page.customer.dashboard.navigation_estimate_calculator',
      href: '/customer/shippingCalculator',
      gicon: '&#xe24a;',
      current: false,
    },
    {
      name: 'page.customer.dashboard.navigation_tracking',
      href: '/customer/tracking',
      gicon: '&#xf05f;',
      current: false,
    },
    {
      name: 'page.customer.dashboard.navigation_complaints',
      href: '/customer/complaints',
      gicon: '&#xe560;',
      current: false,
    },
    {
      name: 'page.customer.dashboard.navigation_terms_conditions',
      href: '/customer/termsandconditions',
      gicon: '&#xe048;',
      current: false,
    },
  ];
  const { locale } = router;
  if (typeof window !== 'undefined') {
    document.body.setAttribute('dir', getDirection(locale));
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const changeLanguage = (selectedLocale) => {
    document.cookie = `NEXT_LOCALE=${selectedLocale};path=/`;
    window.location.assign(`/${selectedLocale}${router.asPath}`);
  };
  const intl = useIntl();
  let fullName = '';
  const isBulkShippingCustomer = session?.profile[0]?.bulk_shipLoad;
  if (locale === 'ar') {
    fullName = session?.profile[0]?.full_name_ar;
  } else {
    fullName = session?.profile[0]?.full_name;
  }
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
                  <div className="absolute top-0 pt-2 ltr:right-0 ltr:-mr-12 rtl:left-0 rtl:-ml-12">
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
                      <a className="hover:border-0">
                        <img
                          className="h-8 w-auto"
                          src={`/assets/images/logo-${locale}.png`}
                          alt="Nejoum Al Jazeera"
                        />
                      </a>
                    </Link>
                  </div>
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation
                      .filter((item) => {
                        return (
                          item.name !==
                            'page.customer.dashboard.navigation_containers' ||
                          isBulkShippingCustomer === '1'
                        );
                      })
                      .map((item, index) => (
                        <Link key={index} href={item.href}>
                          <a
                            className={classNames(
                              router.pathname === item.href
                                ? 'bg-[#CEDAE5] text-[#0D3C8E]'
                                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
                              'group flex items-center px-2 py-2 text-base rounded-md font-semibold'
                            )}
                          >
                            <i
                              className="material-icons text-lg ltr:mr-2 rtl:ml-2"
                              dangerouslySetInnerHTML={{ __html: item.gicon }}
                            ></i>
                            <FormattedMessage id={item.name} />
                          </a>
                        </Link>
                      ))}
                    {locale === 'en' ? (
                      <a
                        href="#"
                        className="group flex items-center p-2 text-base font-bold"
                        onClick={() => {
                          changeLanguage('ar');
                        }}
                      >
                        <i className="material-icons text-lg ltr:mr-2 rtl:ml-2">
                          &#xe8e2;
                        </i>
                        Arabic
                      </a>
                    ) : (
                      <a
                        href="#"
                        className="group flex items-center p-2 text-base font-bold"
                        onClick={() => {
                          changeLanguage('en');
                        }}
                      >
                        <i className="material-icons text-lg ltr:mr-2 rtl:ml-2">
                          &#xe8e2;
                        </i>
                        English
                      </a>
                    )}
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
                          className="text-medium-gray px-1 text-xs font-medium group-hover:text-gray-700"
                          onClick={() =>
                            signOut({
                              callbackUrl: `${window.location.origin}`,
                            })
                          }
                        >
                          <i className="material-icons text-xs lg:mr-2">
                            &#xe9ba;
                          </i>
                          {intl.formatMessage({ id: 'general.signout' })}
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
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-[15%] md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="bg-light-grey flex min-h-0 flex-1 flex-col border-r border-gray-200">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="mb-12 mt-4 flex shrink-0 items-center px-2">
                <Link href="/">
                  <a className="hover:border-0">
                    <img
                      className="w-auto"
                      src={`/assets/images/logo-${locale}.png`}
                      alt="Nejoum Al Jazeera"
                    />
                  </a>
                </Link>
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-1">
                {navigation
                  .filter((item) => {
                    return (
                      item.name !==
                        'page.customer.dashboard.navigation_containers' ||
                      isBulkShippingCustomer === '1'
                    );
                  })
                  .map((item, index) => (
                    <Link key={index} href={item.href}>
                      <a
                        className={classNames(
                          router.pathname === item.href
                            ? 'bg-[#CEDAE5] text-[#0D3C8E]'
                            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
                          'group flex items-center pl-1 pr-0 py-2 font-semibold rounded-md hover:border-inherit text-xs sm:text-xl hover:border-0'
                        )}
                      >
                        <i
                          className="material-icons text-3xl ltr:mr-2 rtl:ml-2"
                          dangerouslySetInnerHTML={{ __html: item.gicon }}
                        ></i>
                        <FormattedMessage id={item.name} />
                      </a>
                    </Link>
                  ))}
              </nav>
            </div>
            <div className="flex shrink-0 border-t border-gray-200 p-4">
              <div className="flex">
                <div>
                  <i className="material-icons text-yellow-orange text-3xl ltr:mr-2 rtl:ml-2">
                    &#xe853;
                  </i>
                </div>
                <div className="">
                  <Link href="/customer/userprofile">
                    <a className="group block w-full shrink-0 break-all hover:border-0">
                      <p className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 md:text-base lg:text-base">
                        {fullName}
                      </p>
                    </a>
                  </Link>
                  <a
                    href="#"
                    className="group mt-1 block w-full shrink-0 hover:border-0 hover:border-inherit"
                  >
                    <p
                      className="text-medium-gray text-xs font-medium group-hover:text-gray-700"
                      onClick={() =>
                        signOut({
                          callbackUrl: `${window.location.origin}`,
                        })
                      }
                    >
                      <i className="material-icons align-middle text-sm lg:ltr:mr-2 lg:rtl:ml-2">
                        &#xe9ba;
                      </i>
                      {intl.formatMessage({ id: 'general.signout' })}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:w-[100%] ltr:md:pl-[15%] rtl:md:pr-[15%]">
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
              <div className="ltr:text-right rtl:text-left">
                {customerBalance > 0 && (
                  <span className="mt-1 mr-8 inline-flex items-center rounded-lg bg-red-100 px-2.5 py-0.5 text-xl font-medium text-[#A30000]">
                    {customerBalance} AED
                  </span>
                )}
                {customerBalance < 0 && (
                  <span className="mt-1 inline-flex items-center rounded-lg bg-green-100 px-2.5 py-0.5 text-xl font-medium text-green-800">
                    {0 - customerBalance} AED
                  </span>
                )}
              </div>
              <div className="ml-6 px-4 pb-6 sm:px-6 sm:pb-4 md:flex md:justify-between md:px-6 lg:pt-12">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-normal text-white sm:tracking-tight">
                    {intl.formatMessage({ id: 'general.welcome' })}{' '}
                    <span className="font-sen font-bold">{fullName}</span>
                  </h2>
                </div>
                <select
                  onChange={(e) => {
                    changeLanguage(e.target.value);
                  }}
                  defaultValue={locale}
                  className="hidden border-0 bg-transparent p-2 pr-8 text-white focus:outline-none md:ml-2 md:block"
                  title="Select language"
                  name="language"
                >
                  <option value="en" className="text-black">
                    EN
                  </option>
                  <option value="ar" className="text-black">
                    AR
                  </option>
                </select>
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
