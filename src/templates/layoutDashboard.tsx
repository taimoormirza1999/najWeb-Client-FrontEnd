import { faBell, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { ChevronRightIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import {
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { UserContext } from '@/components/userContext';
import { classNames } from '@/utils/Functions';

import PushNotificationLayout from '../components/PushNotificationLayout';

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
  const localStorageCustomerKey = 'customer';
  const mountedRef = useRef(true);
  const { profile } = useContext(UserContext);
  const [notify, setNotify] = useState([]);
  const [customerBalance, setCustomerBalance] = useState(0);
  const [generalNotification, setGeneralNotification] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const GetCustomerBalance = async () => {
    const res = await axios.get(`/api/customer/customer_balance/`);
    setCustomerBalance(parseFloat(res.data?.data));
  };
  const getGeneralNotification = async () => {
    const res = await axios.get(`/api/customer/getnotifications`);
    setNotify(res.data.data ? res.data.data : []);
    setGeneralNotification(1);
  };
  const setSeenNotification = async (id, index) => {
    if (notify[index]) {
      setNotify(notify.filter((_, i) => i !== index));
    }
    await axios.post(`/api/customer/seennotification`, {
      id,
    });
  };
  const setSeenNotificationAll = async () => {
    await axios.post(`/api/customer/seennotification`);
    setNotify([]);
  };

  useEffect(() => {
    if (mountedRef.current) {
      GetCustomerBalance();
      if (generalNotification === 0) {
        getGeneralNotification();
      }
    }
    return () => {
      mountedRef.current = false;
    };
  }, []);
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
      name: 'page.customer.dashboard.navigation_cars',
      gicon: '&#xe531;',
      current: false,
      children: [
        { 
          name: 'page.customer.dashboard.navigation_towing_cars',
          href: '/customer/cars/towing',
        },
        { 
          name: 'page.customer.dashboard.navigation_warehouse_cars',
          href: '/customer/cars/warehouse',
        },
      ],
    },
    {
      name: 'page.customer.dashboard.navigation_statement',
      href: '/customer/statement',
      gicon: '&#xe873;',
      current: false,
    },
    {
      name: 'page.customer.dashboard.announcements',
      href: '/customer/announcements',
      gicon: '&#xef49;',
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
  const changeLanguage = (selectedLocale) => {
    document.cookie = `NEXT_LOCALE=${selectedLocale};path=/`;
    window.location.assign(`/${selectedLocale}${router.asPath}`);
  };
  const intl = useIntl();
  const isBulkShippingCustomer = profile?.isBulkShippingCustomer || false;

  useEffect(() => {
    const membershipId = profile?.membership_id;
    if (membershipId) {
      localStorage.setItem(localStorageCustomerKey, membershipId);
    }
  }, [profile]);

  useEffect(() => {
    const onStorageUpdate = (e) => {
      if (e.key !== localStorageCustomerKey) return;
      const membershipId = profile?.membership_id;
      // if (typeof membershipId === 'undefined') return;
      const lastMembershipId = e.oldValue;
      if (lastMembershipId !== membershipId || lastMembershipId === '') {
        window.location.href = '/';
      }
    };

    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  const handleSignOut = async () => {
    localStorage.setItem(localStorageCustomerKey, '-');
    await signOut({
      callbackUrl: `${window.location.origin}`,
    });
  };

  const filterNavigation = () => {
    return navigation.filter((item) => {
      return (
        (isBulkShippingCustomer === true ||
          item.name !== 'page.customer.dashboard.navigation_containers')
      );
    });
  };

  const toggleSideBar = () => {
    setIsExpanded(!isExpanded);
  };

  const sideBarAnimation = {
    transition: 'all .3s',
  };

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
                    {filterNavigation().map((item, index) => (
                      <li key={index} className="list-none">
                        {!item.children ? (
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
                        ) : (
                          <Disclosure as="div">
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    router.pathname === item.href ? 'bg-[#CEDAE5] text-[#0D3C8E]' : 'text-gray-600 hover:bg-gray-300 hover:text-gray-900',
                                    'flex items-center w-full text-left rounded-md pl-1 py-2 text-sm sm:text-xl font-semibold text-gray-700'
                                  )}
                                >
                                  <i
                                    className="material-icons text-lg ltr:mr-2 rtl:ml-2"
                                    dangerouslySetInnerHTML={{ __html: item.gicon }}
                                  ></i>
                                  {isExpanded && <FormattedMessage id={item.name} />}
                                  <ChevronRightIcon
                                    className={classNames(
                                      open ? 'rotate-90 text-gray-600' : 'text-gray-600',
                                      'ml-auto h-5 w-5 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel as="ul" className="mt-1 px-2">
                                  {item.children.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      {/* 44px */}
                                      <Disclosure.Button
                                        as="a"
                                        href={subItem.href}
                                        className={classNames(
                                          router.pathname === subItem.href ? 'bg-gray-300' : 'hover:bg-gray-300',
                                          'block hover:border-0 hover:text-gray-900 py-2 pr-2 pl-9 text-sm sm:text-xl font-semibold text-gray-700'
                                        )}
                                      >
                                        <FormattedMessage id={subItem.name} />
                                      </Disclosure.Button>
                                    </li>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )}
                      </li>
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
                          {profile?.fullName}
                        </p>
                        <p
                          className="text-medium-gray px-1 text-xs font-medium group-hover:text-gray-700"
                          onClick={handleSignOut}
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
        <div
          style={sideBarAnimation}
          className={`relative hidden transition-width duration-800 md:fixed md:inset-y-0 md:flex  md:flex-col ${isExpanded ? 'w-[15%]' : 'w-12'
            }`}
        >
          <button
            style={sideBarAnimation}
            type="button"
            className={`absolute top-2 rounded-full -ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center bg-white text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-999 ${isExpanded ? '-right-5' : 'right-1'
              } `}
            onClick={toggleSideBar}
          >
            <span className="sr-only">Open sidebar</span>
            <i
              className={`material-icons text-sm ${isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
            >
              &#xe5d2;
            </i>
          </button>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div
            className={`bg-light-grey flex min-h-0 flex-1 flex-col border-r border-gray-200 ${!isExpanded ? 'pt-8' : ''
              }`}
          >
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="mb-12 mt-4 flex shrink-0 items-center px-2">
                <Link href="/">
                  <a className="hover:border-0">
                    {isExpanded ? (
                      <img
                        className="w-auto"
                        src={`/assets/images/logo-${locale}.png`}
                        alt="Nejoum Al Jazeera"
                      />
                    ) : (
                      <img src="/assets/images/logo-icon-blue.png" />
                    )}
                  </a>
                </Link>
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-1">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="space-y-1">
                      {filterNavigation().map((item, index) => (
                        <li key={index}>
                          {!item.children ? (
                            <Link href={item.href}>
                              <a
                                href={item.href}
                                className={classNames(
                                  router.pathname === item.href
                                    ? 'bg-[#CEDAE5] text-[#0D3C8E]'
                                    : 'text-gray-600 hover:bg-gray-300 hover:text-gray-900',
                                  'group flex items-center pl-1 pr-0 py-2 font-semibold rounded-md hover:border-inherit text-xs sm:text-xl hover:border-0'
                                )}
                              >
                                <i
                                  className={`material-icons text-3xl  ${isExpanded ? 'ltr:mr-2 rtl:ml-2' : ''
                                    } `}
                                  dangerouslySetInnerHTML={{ __html: item.gicon }}
                                ></i>
                                {isExpanded && <FormattedMessage id={item.name} />}
                              </a>
                            </Link>
                          ) : (
                            <Disclosure as="div">
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    className={classNames(
                                      router.pathname === item.href ? 'bg-[#CEDAE5] text-[#0D3C8E]' : 'text-gray-600 hover:bg-gray-300 hover:text-gray-900',
                                      'flex items-center w-full text-left rounded-md pl-1 py-2 text-sm sm:text-xl font-semibold text-gray-700'
                                    )}
                                  >
                                    <i
                                      className={`material-icons text-3xl  ${isExpanded ? 'ltr:mr-2 rtl:ml-2' : ''
                                        } `}
                                      dangerouslySetInnerHTML={{ __html: item.gicon }}
                                    ></i>
                                    {isExpanded && <FormattedMessage id={item.name} />}
                                    <ChevronRightIcon
                                      className={classNames(
                                        open ? 'rotate-90 text-gray-600' : 'text-gray-600',
                                        'ml-auto h-5 w-5 shrink-0'
                                      )}
                                      aria-hidden="true"
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel as="ul" className="mt-1 px-2">
                                    {item.children.map((subItem, subIndex) => (
                                      <li key={subIndex}>
                                        {/* 44px */}
                                        <Disclosure.Button
                                          as="a"
                                          href={subItem.href}
                                          className={classNames(
                                            router.pathname === item.href ? 'bg-gray-300' : 'hover:bg-gray-300',
                                            'block hover:border-0 hover:text-gray-900 py-2 pr-2 pl-9 text-sm sm:text-xl font-semibold text-gray-700'
                                          )}
                                        >
                                        <FormattedMessage id={subItem.name} />
                                        </Disclosure.Button>
                                      </li>
                                    ))}
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex shrink-0 border-t border-gray-200 p-4">
              <div className="flex">
                {isExpanded ? (
                  <div>
                    <div>
                      <i className="material-icons text-yellow-orange text-3xl ltr:mr-2 rtl:ml-2">
                        &#xe853;
                      </i>
                    </div>
                    <div className="">
                      <Link href="/customer/userprofile">
                        <a className="group block w-full shrink-0 break-all hover:border-0">
                          <p className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 md:text-base lg:text-base">
                            {profile?.fullName}
                          </p>
                        </a>
                      </Link>
                      <a
                        href="#"
                        className="group mt-1 block w-full shrink-0 hover:border-0 hover:border-inherit"
                      >
                        <p
                          className="text-medium-gray text-xs font-medium group-hover:text-gray-700"
                          onClick={handleSignOut}
                        >
                          <i className="material-icons align-middle text-sm lg:ltr:mr-2 lg:rtl:ml-2">
                            &#xe9ba;
                          </i>
                          {intl.formatMessage({ id: 'general.signout' })}
                        </p>
                      </a>
                    </div>
                  </div>
                ) : (
                  <p onClick={handleSignOut}>
                    <i className="material-icons cursor-pointer align-middle text-xl lg:ltr:mr-2 lg:rtl:ml-2">
                      &#xe9ba;
                    </i>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          style={sideBarAnimation}
          className={`flex flex-1 flex-col md:w-[100%] ${isExpanded
            ? 'ltr:md:pl-[15%] rtl:md:pr-[15%]'
            : 'ltr:md:pl-12 rtl:md:pr-12'
            }`}
        >
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
            <div className="bg-dark-blue pb-2 pt-2">
              <div className="pb-5 ltr:text-right rtl:text-left">
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
              <div className="ml-2 md:ml-6 px-4 pb-4 px-2 md:px-6 sm:pb-4 md:flex md:justify-between md:px-1 lg:pt-1">
                <div className="max-w-xl">
                  <h2 className="text-xl lg:text-3xl font-normal text-white sm:tracking-tight">
                    {intl.formatMessage({ id: 'general.welcome' })}{' '}
                    <span className="font-sen font-bold">
                      {profile?.fullName}
                    </span>
                  </h2>
                </div>
                <div className="mr-2 text-right">
                  <Popover className="relative inline-block">
                    {() => (
                      <>
                        <Popover.Button>
                          {notify.length ? (
                            <span className="absolute right-[-10px] top-[-20px] rounded-lg bg-red-700 py-0 px-1 text-white">
                              {notify.length}
                            </span>
                          ) : (
                            ''
                          )}
                          <FontAwesomeIcon
                            icon={faBell}
                            onClick={() => getGeneralNotification()}
                            className="text-white"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute right-0 z-50 mt-1 w-screen max-w-xs px-2 sm:px-0">
                            <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative grid max-h-[65vh] min-h-[2vh] gap-6 overflow-y-auto bg-white px-5 py-6 sm:gap-8 sm:p-6">
                                {notify.map((item, key) => (
                                  <div
                                    key={item.id}
                                    className="-m-3 block rounded-md bg-gray-200 p-3 transition duration-150 ease-in-out text-left rtl:text-right"
                                  >
                                    <div className="absolute right-[7px] shrink-0">
                                      <XCircleIcon
                                        className="mt-[-5px] mr-[10px] h-5 w-5 cursor-pointer text-red-400"
                                        aria-hidden="true"
                                        onClick={() =>
                                          setSeenNotification(item.id, key)
                                        }
                                      />
                                    </div>
                                    <p className="text-base font-medium text-gray-900">
                                      {item.subject}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-800">
                                      {item.notification_text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              {notify.length ? (
                                <div className="border-t-2 bg-white">
                                  <button className="p-4">
                                    Mark all as read
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      onClick={() => setSeenNotificationAll()}
                                      className="ml-1 text-gray-500"
                                    />
                                  </button>
                                  <button className="p-4">
                                    Delete
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      onClick={() => setSeenNotificationAll()}
                                      className="ml-1 text-red-600"
                                    />
                                  </button>
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                  <select
                    onChange={(e) => {
                      changeLanguage(e.target.value);
                    }}
                    defaultValue={locale}
                    className="hidden border-0 bg-transparent p-2 pr-8 text-white focus:outline-none md:ml-2 md:inline-block"
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
            </div>
            {props.children}
            <PushNotificationLayout></PushNotificationLayout>
          </main>
        </div>
      </div>
    </>
  );
};

export { Layout };
