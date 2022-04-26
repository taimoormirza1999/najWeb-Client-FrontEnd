import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, Transition } from '@headlessui/react';
import {
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services/shipping' },
  { name: 'Cars Showroom', href: '#' },
  { name: 'Career', href: '/career' },
  { name: 'About Nejoum', href: '/about/story' },
  { name: 'Contact Us', href: '#' },
];

const solutions = [
  {
    name: 'Analytics',
    description:
      'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorClickIcon,
  },
  {
    name: 'Security',
    description: "Your customers' data will be safe and secure.",
    href: '#',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: ViewGridIcon,
  },
  {
    name: 'Automations',
    description:
      'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: RefreshIcon,
  },
  {
    name: 'Reports',
    description:
      'Get detailed reports that will help you make more informed decisions ',
    href: '#',
    icon: DocumentReportIcon,
  },
];
const resources = [
  {
    name: 'Help Center',
    description:
      'Get all of your questions answered in our forums or contact support.',
    href: '#',
  },
  {
    name: 'Guides',
    description:
      'Learn how to maximize our platform to get the most out of it.',
    href: '#',
  },
  {
    name: 'Events',
    description:
      'See what meet-ups and other events we might be planning near you.',
    href: '#',
  },
  {
    name: 'Security',
    description: 'Understand how we take your privacy seriously.',
    href: '#',
  },
];

const Layout = (props: IMainProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation('common');

  const changeLanguage = (e) => {
    const selectedLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: selectedLocale });
  };

  return (
    <div>
      {props.meta}
      <Popover className="relative bg-white">
        <div className="py-10"></div>
        <div className="mb-7 flex items-center justify-between md:justify-start md:space-x-10">
          <div className="flex justify-end lg:w-0 lg:basis-1/5">
            <Link href="/">
              <a className="hover:border-0">
                <span className="sr-only">{AppConfig.title}</span>
                <img
                  className="h-10 w-auto sm:h-14"
                  src="/assets/images/logo-en.png"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="bg-dark-blue !ml-4 hidden basis-4/5 py-4 pr-5 md:flex">
            <nav className="hidden w-full items-center justify-center space-x-10 md:flex">
              <div className="flex items-center justify-center">
                <div className="hidden space-x-6 lg:block">
                  {navigation.map((link) => (
                    <Link href={link.href} key={link.name}>
                      <a className="text-base font-medium text-white hover:text-indigo-50">
                        {t(link.name)}
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
              <i className="material-icons text-white lg:mr-2">&#xe7fd;</i>
              <Link href="/login">
                <a className="whitespace-nowrap rounded-sm bg-blue-500 py-1 px-2 font-light italic text-white hover:border-none">
                  Sign in
                </a>
              </Link>
              <Link href="#">
                <a className="ml-5 whitespace-nowrap rounded-sm bg-white py-1 px-2 italic hover:border-none hover:text-blue-500">
                  Sign up
                </a>
              </Link>
              <select
                onChange={changeLanguage}
                defaultValue={locale}
                className="ml-2 border-0 bg-transparent text-white focus:outline-none"
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
            className="absolute inset-x-0 top-0 origin-top-right p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
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
                    {solutions.map((solution) => (
                      <a
                        key={solution.name}
                        href={solution.href}
                        className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white">
                          <solution.icon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900">
                          {solution.name}
                        </div>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Pricing
                  </a>

                  <a
                    href="#"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Docs
                  </a>

                  <a
                    href="#"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Enterprise
                  </a>
                  {resources.map((resource) => (
                    <a
                      key={resource.name}
                      href={resource.href}
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      {resource.name}
                    </a>
                  ))}
                </div>
                <div className="mt-6">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Sign up
                  </a>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{' '}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {props.children}

      <footer className="bg-outer-space py-12">
        <div className="container mx-auto">
          <div className="flex justify-center">
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
            <div className="basis-[65%] pl-8">
              <div className="footer-menu flex justify-between pt-12 text-white">
                <div>
                  <h4 className="text-xl font-semibold">Services</h4>
                  <ul>
                    <li>
                      <a href="#" className="text-white">
                        Buying From Auctions
                      </a>
                    </li>
                    <li>
                      <a href="#">Shipping Cars</a>
                    </li>
                    <li>
                      <a href="#">Selling Cars</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Legal</h4>
                  <ul>
                    <li>
                      <a href="#">Terms & Conditions</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Company</h4>
                  <ul>
                    <li>
                      <a href="#">Our Story</a>
                    </li>
                    <li>
                      <a href="#">About Nejoum</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Contact Us</h4>
                  <ul>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Nejoum Branches</a>
                    </li>
                    <li>
                      <a href="#">Career</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="basis-[25%]">
              <div className="flex justify-end gap-3">
                <span className="py-1 text-white">Follow us</span>
                <a href="#" className="hover:border-0">
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className="text-4xl text-white"
                  />
                </a>
                <a href="#" className="hover:border-0">
                  <FontAwesomeIcon
                    icon={faInstagramSquare}
                    className="text-4xl text-white"
                  />
                </a>
                <a href="#" className="hover:border-0">
                  <FontAwesomeIcon
                    icon={faTwitterSquare}
                    className="text-4xl text-white"
                  />
                </a>
                <a href="#" className="hover:border-0">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="text-4xl text-white"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-white">
            <div className="self-end">
              <h4 className="text-lg font-semibold">We are in</h4>
              <p className="text-lg font-light">
                UAE - USA - Oman - Jordan - Iraq - Yemen - Cambodia
              </p>
            </div>

            <div>
              <p className="font-light">Subscribe for anouncements</p>
              <form method="post" action="" className="py-4">
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
              <h4 className="text-lg font-semibold">UAE Working Hours</h4>
              <p className="text-lg">Sat - Thu : 08:30 am - 01:00 pm / </p>
              <p className="text-lg">04:00 pm - 09:00 pm</p>
            </div>
          </div>

          <div className="my-5 border"></div>

          <div className="flex justify-between pt-12">
            <div className="text-white">
              <p className="text-lg font-light">© 20222 Nejoum Aljazeera</p>
            </div>

            <div className="self-end text-white">
              <p className="text-lg">Industrial Area 4, Sharjah, UAE</p>
              <p className="text-lg">Nejoum Aljazeera Used Cars L.L.C.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { Layout };
