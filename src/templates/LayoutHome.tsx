import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { Fragment, ReactNode, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";

import AnnouncementsCarousel from '@/components/Announcement/AnnouncementsCarousel';
import CustomModal from '@/components/CustomModal';
import { AppConfig } from '@/utils/AppConfig';
import { classNames } from '@/utils/Functions';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  announcements?: Announcement[];
};

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services/shipping' },
  { name: 'Cars Showroom', href: '/cars/showroom' },
  { name: 'Career', href: '/career' },
  { name: 'About Nejoum', href: '/about/story' },
  { name: 'Contact Us', href: '/contact' },
];

export interface Announcement {
  title_english: string;
  title_arabic: string;
  body_english: string;
  body_arabic: string;
  announcement_type: string;
  file_path: string;
}

const Layout = (props: IMainProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { locale } = router;
  //const { t } = useTranslation('common');
  const [anouncementModalOpen, setAnouncementModalOpen] = useState(false);
  const closeAnouncementButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [anouncementDetail, setAnouncementDetail] = useState<Announcement>({
    title_english: '',
    title_arabic: '',
    body_english: '',
    body_arabic: '',
    announcement_type: '',
    file_path: '',
  });

  const changeLanguage = (e) => {
    const selectedLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${e.target.value}`;
    router.push(router.pathname, router.asPath, { locale: selectedLocale });
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  };

  return (
    <>
      <CustomModal
        showOn={anouncementModalOpen}
        initialFocus={closeAnouncementButtonRef}
        onClose={() => {
          setAnouncementModalOpen(false);
          contentRef?.current?.classList.remove('blur-sm');
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <Dialog.Title
            as="h3"
            className="text-xl font-bold leading-6 md:text-2xl lg:text-3xl"
          >
            {anouncementDetail.title_english}
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-4 text-lg md:text-xl lg:py-6 lg:text-2xl">
              {anouncementDetail.body_english}
            </p>
            {anouncementDetail.file_path != null ? (
              <Link
                href={
                  process.env.NEXT_PUBLIC_SERVER_URL +
                  anouncementDetail.file_path.substring(1)
                }
                passHref
              >
                <a
                  target="_blank"
                  className="cursor-pointer text-xl font-bold italic"
                >
                  (View attached files)
                </a>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              setAnouncementModalOpen(false);
              contentRef?.current?.classList.remove('blur-sm');
            }}
            ref={closeAnouncementButtonRef}
          >
            Close
          </button>
        </div>
      </CustomModal>
      <div ref={contentRef}>
        {props.meta}

        {props.announcements !== undefined ? (
          <div className="bg-light-grey mb-5 xl:flex">
            <div className="bg-teal-blue relative flex basis-1/3 items-center justify-center p-2">
              <div className="top-0 right-0 hidden w-[75px] overflow-hidden xl:absolute xl:inline-block">
                <div className="bg-light-grey h-[110px] origin-top-left -rotate-45"></div>
              </div>
              <h3 className="text-center text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                Important Anouncements
              </h3>
            </div>
            <div className="text-dark-blue basis-2/3" >
              <AnnouncementsCarousel >
                {props.announcements.map((row, index) => (
                  <div className="embla__slide" key={index}>
                    <div className="embla__slide__inner pb-9 xl:pb-0">
                      <p className="p-2 pr-2 text-[14px] md:text-xl xl:pr-6">
                        <span className="font-bold">{row.title_english}. </span>
                        {row.body_english.substring(0, 220)}...
                        {row.announcement_type === '1' ? (
                          <span
                            className="ml-2 cursor-pointer text-lg font-semibold italic"
                            onClick={() => {
                              setAnouncementDetail(row);
                              setAnouncementModalOpen(true);
                              contentRef?.current?.classList.add('blur-sm');
                            }}
                          >
                            (Read more)
                          </span>
                        ) : (
                          <Link
                            href={
                              process.env.NEXT_PUBLIC_SERVER_URL +
                              row.file_path.substring(1)
                            }
                            passHref
                          >
                            <a
                              target="_blank"
                              className="ml-2 cursor-pointer text-lg font-semibold italic"
                            >
                              (Read more)
                            </a>
                          </Link>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </AnnouncementsCarousel>
            </div>
          </div>
        ) : (
          <div className="my-5"></div>
        )}
        <Popover className="relative bg-white">
          <div className="mb-7 flex items-center justify-between lg:justify-start lg:space-x-10">
            <div className="flex justify-end lg:w-0 lg:basis-[18%]">
              <Link href="/">
                <a className="hover:border-0">
                  <span className="sr-only">{AppConfig.title}</span>
                  <img
                    className="h-10 w-auto sm:h-14"
                    src="/assets/images/logo-en.png"
                    alt={AppConfig.title}
                  />
                </a>
              </Link>
            </div>
            <div className="-my-2 -mr-2 lg:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="bg-dark-blue !ml-4 hidden basis-[88%] py-4 pr-5 lg:flex">
              <nav className="hidden w-full items-center justify-center space-x-10 md:flex">
                <div className="flex items-center justify-center">
                  <div className="hidden space-x-6 lg:block">
                    {navigation.map((link) => (
                      <Link href={link.href} key={link.name}>
                        <a className="text-base font-medium text-white hover:text-indigo-50">
                          <FormattedMessage id= "page.home.title"/>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
                  {navigation.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-base font-medium text-white hover:text-indigo-50"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </nav>
              <div className="hidden items-center justify-start md:flex md:flex-1 md:basis-[35%] lg:w-0">
                <i className="material-icons text-white lg:mr-2 rtl:ml-2">&#xe7fd;</i>
                <div className="lg:hidden xl:block">
                  {session?.token ? (
                    <>
                      <Link href="/customer/dashboard">
                        <a className="whitespace-nowrap rounded-sm bg-blue-500 py-[6px] px-2 font-light italic text-white hover:border-none">
                          Dashboard
                        </a>
                      </Link>
                      <Link href="/auth/newAccount">
                        <a
                          className="ml-5 whitespace-nowrap rounded-sm bg-white py-[6px] px-2 italic hover:border-none hover:text-blue-500 lg:hidden xl:inline-block"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </a>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <a className="whitespace-nowrap rounded-sm bg-blue-500 py-[6px] px-2 font-light italic text-white hover:border-none">
                        <FormattedMessage id="Sign in" />
                        </a>
                      </Link>
                      <Link href="/auth/newAccount">
                        <a className="ml-5 whitespace-nowrap rounded-sm bg-white py-[6px] px-2 italic hover:border-none hover:text-blue-500">
                          Sign up
                        </a>
                      </Link>
                    </>
                  )}
                </div>
                <div className="hidden lg:block xl:hidden">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-white">
                        Account
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {session?.token ? (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/customer/dashboard">
                                    <a
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100'
                                          : 'text-gray-700',
                                        'block px-4 py-2'
                                      )}
                                    >
                                      Dashboard
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : 'text-gray-700',
                                      'block px-4 py-2'
                                    )}
                                    onClick={handleSignOut}
                                  >
                                    Sign Out
                                  </a>
                                )}
                              </Menu.Item>
                            </>
                          ) : (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/login">
                                    <a
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100'
                                          : 'text-gray-700',
                                        'block px-4 py-2'
                                      )}
                                    >
                                      <FormattedMessage id="Sign in" />
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/auth/newAccount">
                                    <a
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100'
                                          : 'text-gray-700',
                                        'block px-4 py-2'
                                      )}
                                    >
                                      Sign Up
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            </>
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <select
                  onChange={changeLanguage}
                  defaultValue={locale}
                  className="ml-2 border-0 bg-transparent text-white focus:outline-none"
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

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-10 origin-top-right p-2 transition lg:hidden"
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="/assets/images/logo-en.png"
                        alt={AppConfig.title}
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid grid-cols-1 gap-7">
                      {navigation.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                        >
                          <div className="ml-4 text-base font-medium text-gray-900">
                            {link.name}
                          </div>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="mt-6">
                    {session?.token ? (
                      <>
                        <Link href="/customer/dashboard">
                          <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Dashboard
                          </a>
                        </Link>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                          <Link href="/login">
                            <a
                              className="text-indigo-600 hover:text-indigo-500"
                              onClick={handleSignOut}
                            >
                              Sign Out
                            </a>
                          </Link>
                        </p>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/newAccount">
                          <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Sign up
                          </a>
                        </Link>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                          Existing customer?{' '}
                          <Link href="/login">
                            <a className="text-indigo-600 hover:text-indigo-500">
                            <FormattedMessage id="Sign in" />
                            </a>
                          </Link>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        {props.children}

        <footer className="bg-outer-space py-12">
          <div className="container mx-auto">
            <div className="flex-col flex-wrap justify-center sm:flex sm:flex-row">
              <div className="basis-[10%]">
                <Link href="/">
                  <a>
                    <img
                      src="/assets/images/logo-white-3.png"
                      className="h-12"
                      alt={AppConfig.title}
                    />
                  </a>
                </Link>
              </div>
              <div className="basis-[65%] sm:pl-8 md:pl-4">
                <div className="footer-menu mb-10 flex flex-col justify-between gap-4 pt-12 text-white sm:flex-row lg:mb-0">
                  <div>
                    <h4 className="text-xl font-semibold">
                      <FormattedMessage id="Services" />
                    </h4>
                    <ul>
                      <li>
                        <Link href="/">
                          <a className="text-white">
                            <FormattedMessage id="Buying From Auctions" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services/shipping">
                          <a>
                            <FormattedMessage id="Shipping Cars" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/cars/showroom">
                          <a>
                            <FormattedMessage id="Selling Cars" />
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">Legal</h4>
                    <ul>
                      <li>
                        <Link href="/customer/termsandconditions">
                          <a>
                            <FormattedMessage id="Terms & Conditions" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <a href="#">
                          <FormattedMessage id="Privacy Policy" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">
                      <FormattedMessage id="Company" />
                    </h4>
                    <ul>
                      <li>
                        <Link href="/about/story">
                          <a>
                            <FormattedMessage id="Our Story" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/vision">
                          <a>
                            <FormattedMessage id="About Nejoum" />
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">
                      <FormattedMessage id="Contact Us" />
                    </h4>
                    <ul>
                      <li>
                        <Link href="/customer/complaint">
                          <a>
                            <FormattedMessage id="Customer Service" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/branches">
                          <a>
                            <FormattedMessage id="Nejoum Branches" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/career">
                          <a>Career</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="basis-[25%]">
                <div className="mb-8 flex gap-3 sm:justify-end lg:mb-0">
                  <span className="py-1 text-white">
                    <FormattedMessage id="Follow us" />
                  </span>
                  <Link
                    href="https://www.facebook.com/NejoumaljazeeraCars/"
                    passHref
                  >
                    <a className="hover:border-0" target="_blank">
                      <FontAwesomeIcon
                        icon={faFacebookSquare}
                        className="text-4xl text-white"
                      />
                    </a>
                  </Link>
                  <Link
                    href="https://www.instagram.com/nejoumaljazeera/"
                    passHref
                  >
                    <a className="hover:border-0" target="_blank">
                      <FontAwesomeIcon
                        icon={faInstagramSquare}
                        className="text-4xl text-white"
                      />
                    </a>
                  </Link>
                  <Link href="#" passHref>
                    <a className="hover:border-0" target="_blank">
                      <FontAwesomeIcon
                        icon={faTwitterSquare}
                        className="text-4xl text-white"
                      />
                    </a>
                  </Link>
                  <Link
                    href="https://ae.linkedin.com/in/nejoum-aljazeera-345362167"
                    passHref
                  >
                    <a className="hover:border-0" target="_blank">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="text-4xl text-white"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex-wrap justify-between text-white sm:flex">
              <div className="mb-8 self-end lg:mb-0">
                <h4 className="text-lg font-semibold">
                  <FormattedMessage id="We are in" />
                </h4>
                <p className="text-lg font-light">
                  <FormattedMessage id="UAE - USA - Oman - Jordan - Iraq - Yemen - Cambodia" />
                </p>
              </div>

              <div>
                <p className="font-light">
                  <FormattedMessage id="Subscribe for anouncements" />
                </p>
                <form method="post" action="" className="mb-4 py-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="rounded-md border border-white bg-transparent placeholder:text-sm placeholder:text-white"
                  />
                  <input
                    type="submit"
                    value="Ok"
                    className="-ml-1 rounded-r-md border bg-white px-4 py-2 pt-[11px] text-sm text-black"
                  />
                </form>
                <h4 className="text-lg font-semibold">
                  <FormattedMessage id="UAE Working Hours" />
                </h4>
                <p className="text-[16px] md:text-lg">
                  <FormattedMessage id="Sat - Thu : 08:30 am - 01:00 pm /" />{' '}
                </p>
                <p className="text-[16px] md:text-lg">
                  <FormattedMessage id="04:00 pm - 09:00 pm" />
                </p>
              </div>
            </div>

            <div className="my-5 border"></div>

            <div className="flex-wrap justify-between gap-4 pt-2 text-center sm:flex sm:pt-12 sm:text-left">
              <div className="text-white">
                <p className="text-lg font-light">© 2022 Nejoum Aljazeera</p>
              </div>

              <div className="self-end text-white">
                <p className="text-[16px] md:text-lg">
                  <FormattedMessage id="Industrial Area 4, Sharjah, UAE" />
                </p>
                <p className="text-[16px] md:text-lg">
                  <FormattedMessage id="Nejoum Aljazeera Used Cars L.L.C." />
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export { Layout };
