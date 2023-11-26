import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import CustomModal from '@/components/customModal';
import { AppConfig } from '@/utils/AppConfig';
import { classNames } from '@/utils/Functions';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  announcements?: Announcement[];
};

const navigation = [
  { name: 'general.home', href: '/' },
  { name: 'general.services', href: '/services/shipping' },
  { name: 'general.carsShowroom', href: '/cars/showroom' },
  { name: 'general.career', href: '/career' },
  { name: 'general.about', href: '/about/story' },
  { name: 'general.contact', href: '/contact' },
];

export interface Announcement {
  title_english: string;
  title_arabic: string;
  body_english: string;
  body_arabic: string;
  announcement_type: string;
  file_path: string;
}

function getDirection(locale) {
  if (locale === 'ar') {
    return 'rtl';
  }
  return 'ltr';
}
const Layout = (props: IMainProps) => {
  const intl = useIntl();
  const router = useRouter();
  const { locale } = router;
  if (typeof window !== 'undefined') {
    document.body.setAttribute('dir', getDirection(locale));
  }
  const { data: session } = useSession();
  const [headerFixed, setHeaderFixed] = useState(false);

  const [anouncementModalOpen, setAnouncementModalOpen] = useState(false);
  const closeAnouncementButtonRef = useRef(null);
  const [anouncementDetail, setAnouncementDetail] = useState<Announcement>({
    title_english: '',
    title_arabic: '',
    body_english: '',
    body_arabic: '',
    announcement_type: '',
    file_path: '',
  });

  useEffect(() => {
    // window.addEventListener('scroll', () => {
    //   setHeaderFixed(window.scrollY > 120);
    // });
  }, []);

  const changeLanguage = (selectedLocale) => {
    document.cookie = `NEXT_LOCALE=${selectedLocale};path=/`;
    router.push(router.pathname, router.asPath, { locale: selectedLocale });
  };

  const handleSignOut = async () => {
    localStorage.setItem('customer', '');
    await signOut({
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
            }}
            ref={closeAnouncementButtonRef}
          >
            Close
          </button>
        </div>
      </CustomModal>
      <div>
        {props.meta}

        {/* {props.announcements ? (
          <div className="bg-light-grey mb-5 xl:flex">
            <div className="bg-teal-blue relative flex basis-1/3 items-center justify-center p-2 before:absolute before:top-0 before:border-t-[#ebebeb] ltr:before:right-0 ltr:before:border-l-[#005fb7] rtl:before:left-0 rtl:before:border-r-[#005fb7] xl:before:border-t-[105px] ltr:xl:before:border-l-[100px] rtl:xl:before:border-r-[100px] 2xl:before:border-t-[76px]">
              <h3 className="text-center text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                Important Anouncements
              </h3>
            </div>
            <div className="text-dark-blue basis-2/3">
              <AnnouncementsCarousel>
                {props.announcements.map((row, index) => (
                  <div
                    className="relative flex-1"
                    style={{ flex: '0 0 100%' }}
                    key={index}
                  >
                    <div className="pb-9 xl:pb-0">
                      <p className="p-2 pr-2 text-[14px] rtl:text-right md:text-xl xl:pr-6">
                        <span className="font-bold">
                          {locale === 'ar'
                            ? row.title_arabic
                            : row.title_english}
                          .{' '}
                        </span>
                        {locale === 'ar'
                          ? `${row.body_arabic.substring(0, 200)} ...`
                          : `${row.body_english.substring(0, 220)} ...`}
                        {row.announcement_type === '1' ? (
                          <span
                            className="ml-2 cursor-pointer text-lg font-semibold italic"
                            onClick={() => {
                              setAnouncementDetail(row);
                              setAnouncementModalOpen(true);
                            }}
                          >
                            (<FormattedMessage id="read.more" />)
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
                              (<FormattedMessage id="read.more" />)
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
        )} */}
        <Popover
          className={classNames(
            headerFixed ? 'sticky header-fixed shadow-xl top-0 z-50 ' : '',
            'relative bg-white'
          )}
        >
          <div className="mb-7 flex items-center justify-between px-4 sm:py-1 md:px-8 lg:p-0 xl:justify-start xl:gap-4">
            <div
              className={classNames(
                headerFixed ? 'bg-white' : 'bg-dark-blue',
                'basis-[7%] p-9 hidden lg:block'
              )}
            ></div>
            <div className="flex justify-end ">
              <Link href="/">
                <a className="hover:border-0">
                  <span className="sr-only">{AppConfig.title}</span>
                  <img
                    className="w-52"
                    src={`/assets/images/logo-${locale}.png`}
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
            <div
              className={classNames(
                headerFixed ? 'bg-white' : 'bg-dark-blue',
                'hidden w-full py-4 pr-5 ltr:!ml-4 rtl:!mr-4 lg:flex'
              )}
            >
              <nav className="hidden w-full items-center justify-center space-x-10 md:flex">
                <div className="flex items-center justify-center">
                  <div className="hidden gap-x-6 lg:flex">
                    {navigation.map((link) => (
                      <Link href={link.href} key={link.name}>
                        <a
                          className={classNames(
                            headerFixed
                              ? 'text-dark-blue font-semibold hover:text-blue-700'
                              : 'text-white font-medium hover:text-indigo-50',
                            'text-base'
                          )}
                        >
                          <FormattedMessage id={link.name} />
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
                  {navigation.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <a className="text-base font-medium text-white hover:text-indigo-50">
                        <FormattedMessage id={link.name} />
                      </a>
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="hidden items-center justify-center md:flex md:flex-1 lg:basis-[35%] xl:basis-[55%]">
                <i className="material-icons text-white rtl:ml-2 lg:ltr:mr-2">
                  &#xe7fd;
                </i>
                <div className="lg:hidden xl:block">
                  {session?.token ? (
                    <>
                      <Link href="/customer/dashboard">
                        <a className="border-azure-blue bg-azure-blue whitespace-nowrap rounded-sm border py-[6px] px-2 text-white hover:border">
                          <FormattedMessage id="general.dashboard" />
                        </a>
                      </Link>
                      <Link href="/auth/newAccount">
                        <a
                          className={classNames(
                            headerFixed ? 'border-azure-blue' : 'border-white',
                            'border whitespace-nowrap rounded-sm bg-white py-[4px] px-2 hover:border hover:text-blue-500 ltr:ml-5 rtl:mr-5 lg:hidden xl:inline-block'
                          )}
                          onClick={handleSignOut}
                        >
                          <FormattedMessage id="general.signout" />
                        </a>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <a className="border-azure-blue bg-azure-blue mx-2 whitespace-nowrap rounded-sm border py-[6px] px-2 text-white hover:border">
                          <FormattedMessage id="sign.in" />
                        </a>
                      </Link>
                      <Link href="/auth/newAccount">
                        <a
                          className={classNames(
                            headerFixed ? 'border-azure-blue' : 'border-white',
                            'border ml-5 whitespace-nowrap rounded-sm bg-white py-[6px] px-2 hover:border hover:text-blue-500'
                          )}
                        >
                          <FormattedMessage id="sign.up" />
                        </a>
                      </Link>
                    </>
                  )}
                </div>
                <div className="hidden lg:block xl:hidden">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md p-2 text-white">
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
                                      <FormattedMessage id="general.dashboard" />
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
                                    <FormattedMessage id="general.signout" />
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
                                      <FormattedMessage id="sign.in" />
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
                                      <FormattedMessage id="sign.up" />
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
                  onChange={(e) => {
                    changeLanguage(e.target.value);
                  }}
                  defaultValue={locale}
                  className={classNames(
                    headerFixed ? 'text-dark-blue' : ' text-white',
                    'border-0 bg-transparent focus:outline-none focus:ring-0 ltr:ml-2 rtl:pl-10 rtl:mr-2'
                  )}
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
                        src={`/assets/images/logo-${locale}.png`}
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
                        <Link key={link.name} href={link.href}>
                          <a className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                            <div className="ml-4 text-base font-medium text-gray-900">
                              <FormattedMessage id={link.name} />
                            </div>
                          </a>
                        </Link>
                      ))}
                      {locale === 'en' ? (
                        <a
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                          onClick={() => {
                            changeLanguage('ar');
                          }}
                        >
                          <div className="ml-4 text-base font-medium text-gray-900">
                            <i className="material-icons text-lg ltr:mr-2 rtl:ml-2">
                              &#xe8e2;
                            </i>
                            Arabic
                          </div>
                        </a>
                      ) : (
                        <a
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                          onClick={() => {
                            changeLanguage('en');
                          }}
                        >
                          <div className="ml-4 text-base font-medium text-gray-900">
                            <i className="material-icons text-lg ltr:mr-2 rtl:ml-2">
                              &#xe8e2;
                            </i>
                            English
                          </div>
                        </a>
                      )}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="mt-6">
                    {session?.token ? (
                      <>
                        <Link href="/customer/dashboard">
                          <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            <FormattedMessage id="general.dashboard" />
                          </a>
                        </Link>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                          <Link href="/login">
                            <a
                              className="text-indigo-600 hover:text-indigo-500"
                              onClick={handleSignOut}
                            >
                              <FormattedMessage id="general.signout" />
                            </a>
                          </Link>
                        </p>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/newAccount">
                          <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            <FormattedMessage id="sign.up" />
                          </a>
                        </Link>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                          Existing customer?{' '}
                          <Link href="/login">
                            <a className="text-indigo-600 hover:text-indigo-500">
                              <FormattedMessage id="sign.in" />
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
            <div className="flex flex-col flex-wrap justify-center xl:flex-row">
              <div className="basis-[14%]">
                <Link href="/">
                  <a>
                    <img
                      src={`/assets/images/logo-white-3-${locale}.png`}
                      className="w-60"
                      alt={AppConfig.title}
                    />
                  </a>
                </Link>
              </div>
              <div className="my-8 basis-[38%] xl:pl-4">
                <div className="footer-menu mb-10 flex flex-col justify-between gap-4 pt-12 text-white sm:flex-row">
                  <div>
                    <h4 className="text-lg font-semibold md:text-xl">
                      <FormattedMessage id="general.services" />
                    </h4>
                    <ul className="text-base font-light md:text-lg">
                      {/* <li>
                        <Link href="/">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="buying.from.auctions" />
                          </a>
                        </Link>
                      </li> */}
                      <li>
                        <Link href="/services/shipping">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="shipping.cars" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/cars/showroom">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="selling.cars" />
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* <div>
                    <h4 className="text-lg font-semibold md:text-xl">
                      <FormattedMessage id="legal" />
                    </h4>
                    <ul className="text-base font-light md:text-lg">
                      <li>
                        <Link href="/customer/termsandconditions">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="page.customer.dashboard.navigation_terms_conditions" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="privacy.policy" />
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                  <div>
                    <h4 className="text-lg font-semibold md:text-xl">
                      <FormattedMessage id="company" />
                    </h4>
                    <ul className="text-base font-light md:text-lg">
                      <li>
                        <Link href="/about/story">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="our.story" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/vision">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="general.about" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="privacy_policy.title" />
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Link href="/contact">
                      <a className="text-xl font-semibold text-white">
                        <FormattedMessage id="general.contact" />
                      </a>
                    </Link>
                    <ul className="text-base font-light md:text-lg">
                      {/* <li>
                        <Link href="/customer/complaint">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="customer.service" />
                          </a>
                        </Link>
                      </li> */}
                      <li>
                        <Link href="/branches">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="nejoum.branches" />
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/career">
                          <a className="text-white hover:border-b-0">
                            <FormattedMessage id="general.career" />
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="basis-[48%]">
                <div className="mb-8 flex justify-between gap-3 md:justify-start xl:mb-0 xl:justify-end">
                  <span className="py-1 text-white">
                    <FormattedMessage id="follow.us" />
                  </span>
                  <Link href="https://www.facebook.com/people/Nejoum-Al-Jazeera/100091505176068/" passHref>
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
                  <Link href="https://twitter.com/Nejoumae" passHref>
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

            <div className="flex flex-col justify-between text-white lg:flex-row">
              <div className="mb-8 lg:mb-0 lg:self-end">
                <h4 className="text-lg font-semibold">
                  <FormattedMessage id="we.are.in" />
                </h4>
                <p className="text-base font-light md:text-lg">
                  <FormattedMessage id="uae_usa_oman_jordan_iraq_yemen_cambodia" />
                </p>
              </div>

              <div>
                <div className="hidden">
                  <p className="font-light">
                    <FormattedMessage id="subscribe.for.anouncements" />
                  </p>
                  <form method="post" action="" className="mb-4 py-4">
                    <input
                      type="email"
                      name="email"
                      placeholder={intl.formatMessage({ id: 'Email' })}
                      className="rounded-md border border-white bg-transparent placeholder:text-sm placeholder:text-white"
                    />
                    <input
                      type="submit"
                      value="Ok"
                      className="-ml-1 rounded-r-md border bg-white px-4 py-2 pt-[11px] text-sm text-black"
                    />
                  </form>
                </div>
                <h4 className="text-lg font-semibold">
                  <FormattedMessage id="uae.working.hours" />
                </h4>
                <p className="text-base md:text-lg">
                  <FormattedMessage id="Sat-Thu:08:30am-01:00pm/" />
                </p>
                <p className="text-base md:text-lg"></p>
              </div>
            </div>

            <div className="my-5 border"></div>

            <div className="flex-wrap justify-between gap-4 pt-2 text-center sm:flex sm:pt-12 sm:ltr:text-left sm:rtl:text-right">
              <div className="text-white">
                <p className="text-lg font-light">
                  © {new Date().getFullYear()} Nejoum Aljazeera
                </p>
              </div>

              <div className="self-end text-white">
                <p className="text-base md:text-lg">
                  <FormattedMessage id="Industrial.Area4.Sharjah.UAE" />
                </p>
                <p className="text-base md:text-lg">
                  <FormattedMessage id="Nejoum_Aljazeera_Used_Cars_L.L.C." />
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
