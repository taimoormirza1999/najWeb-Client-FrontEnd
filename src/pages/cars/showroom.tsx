import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';

import ApplyForAccount from '@/components/ApplyForAccount';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactDetails from '@/components/ContactDetails';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Showroom = () => {
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const dummyCars = [...Array(20)];

  return (
    <Layout meta={<Meta title="Cars Showroom" description="Cars Showroom" />}>
      <Transition.Root show={redirectModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setRedirectModalOpen}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block w-2/5 overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:p-6 sm:align-middle">
                <div>
                  <div className="text-dark-blue mt-6 text-center sm:mt-16">
                    <Dialog.Title
                      as="h3"
                      className="text-5xl font-bold leading-6"
                    >
                      Redirecting
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="mb-4 py-6 text-3xl">
                        You’ll be redirected to to LinkedIn.com. Please press
                        “Continue” to confirm
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center gap-4 sm:mt-6">
                  <button
                    type="button"
                    className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-10 py-2.5 text-2xl font-medium"
                    onClick={() => {
                      setRedirectModalOpen(false);
                      contentRef?.current?.classList.remove('blur-sm');
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <Link
                    href="https://ae.linkedin.com/company/nejoumaljazeera"
                    passHref
                  >
                    <a
                      target={'_blank'}
                      className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-10 py-2.5 text-2xl font-medium text-white hover:border-0 hover:bg-blue-500"
                      onClick={() => {
                        setRedirectModalOpen(false);
                        contentRef?.current?.classList.remove('blur-sm');
                      }}
                    >
                      Continue
                    </a>
                  </Link>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="container mx-auto">
        <Breadcrumbs breadcrumbs={[{ name: 'Cars Showroom', href: '#' }]} />
      </div>

      <h3 className="text-dark-blue py-2 text-center text-6xl font-semibold">
        Cars Showroom
      </h3>

      <div className="container mx-auto">
        <p className="py-3">
          <i className="material-icons text-yellow-orange align-middle text-5xl">
            &#xe164;
          </i>
          <span className="text-dark-blue ml-4 align-middle text-4xl">
            Find Your Car
          </span>
        </p>

        <div className="my-8 flex gap-10">
          <div className="basis-1/5">
            <Menu as="div" className="relative inline-block w-full text-left">
              <div>
                <Menu.Button className="border-dark-blue relative w-full justify-center border bg-white py-3 pr-20 text-xl font-medium italic text-gray-700 ">
                  Year
                  <span className="bg-dark-blue absolute right-0 top-0 h-full p-4 text-center">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="-mr-1 ml-1 h-5 w-5 text-white"
                    />
                  </span>
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
                <Menu.Items className="absolute right-0 w-full origin-top-right border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-dark-blue text-white'
                              : 'text-dark-blue',
                            'block px-4 py-2 text-lg hover:border-0'
                          )}
                        >
                          2022
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-dark-blue text-white'
                              : 'text-dark-blue',
                            'block px-4 py-2 text-lg hover:border-0'
                          )}
                        >
                          2021
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-dark-blue text-white'
                              : 'text-dark-blue',
                            'block px-4 py-2 text-lg hover:border-0'
                          )}
                        >
                          2020
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="basis-1/5">
            <Menu as="div" className="relative inline-block w-full text-left">
              <div>
                <Menu.Button className="border-dark-blue relative w-full justify-center border bg-white py-3 pr-20 text-xl font-medium italic text-gray-700 ">
                  Model
                  <span className="bg-dark-blue absolute right-0 top-0 h-full p-4 text-center">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="-mr-1 ml-1 h-5 w-5 text-white"
                    />
                  </span>
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
                <Menu.Items className="absolute right-0 w-full origin-top-right border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-dark-blue text-white'
                              : 'text-dark-blue',
                            'block px-4 py-2 text-lg hover:border-0'
                          )}
                        >
                          Model 1
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-dark-blue text-white'
                              : 'text-dark-blue',
                            'block px-4 py-2 text-lg hover:border-0'
                          )}
                        >
                          Model 2
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-dark-blue text-white'
                              : 'text-dark-blue',
                            'block px-4 py-2 text-lg hover:border-0'
                          )}
                        >
                          Model 3
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="basis-1/5">
            <Menu as="div" className="relative inline-block w-full text-left">
              <div>
                <Menu.Button className="border-dark-blue relative w-full justify-center border bg-white py-3 pr-20 text-xl font-medium italic text-gray-700 ">
                  Brand
                  <span className="bg-dark-blue absolute right-0 top-0 h-full p-4 text-center">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="-mr-1 ml-1 h-5 w-5 text-white"
                    />
                  </span>
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
                <Menu.Items className="absolute right-0 w-full origin-top-right border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-dark-blue text-white'
                              : 'text-dark-blue',
                            'block px-4 py-2 text-lg hover:border-0'
                          )}
                        >
                          Nissan
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-dark-blue text-white'
                              : 'text-dark-blue',
                            'block px-4 py-2 text-lg hover:border-0'
                          )}
                        >
                          Toyota
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-dark-blue text-white'
                              : 'text-dark-blue',
                            'block px-4 py-2 text-lg hover:border-0'
                          )}
                        >
                          BMW
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="basis-[30%]">
            <div className="flex">
              <input
                type="text"
                placeholder="Search..."
                className="border-dark-blue basis-11/12 border py-[.75rem] text-xl placeholder:text-gray-700"
              />
              <span className="bg-dark-blue right-0 top-0 h-full p-4 text-center">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="-mr-1 ml-1 h-5 w-5 text-white"
                />
              </span>
            </div>
          </div>
          <div className="flex basis-[10%] justify-end">
            <a
              href="#"
              className="bg-azure-blue block rounded-xl py-3 px-6 text-xl font-medium text-white hover:border-0 hover:bg-blue-400"
            >
              Search
            </a>
          </div>
        </div>

        <p className="text-medium-grey py-2 text-2xl italic">
          *Please Contact us to negotiate prices
        </p>

        <div className="my-4 flex flex-wrap justify-between gap-x-8 gap-y-4">
          {dummyCars.map((i) => {
            return (
              <Link href="/cars/profile" key={i}>
                <a className="hover:border-0">
                  <div>
                    <img
                      src="/assets/images/placeholder.jpg"
                      alt="Car"
                      className="h-[300px]"
                    />
                    <div className="border-dark-blue flex border py-2 px-4">
                      <div className="text-dark-blue basis-4/5 text-sm">
                        <p className="font-semibold">NISSAM ALTIMA 2022</p>
                        <p>AED120,0000</p>
                      </div>
                      <div className="basis-1/5 pt-1 text-right">
                        <Link href="/">
                          <a>
                            <i className="material-icons text-azure-blue align-middle text-2xl">
                              &#xe6b8;
                            </i>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>

        <p className="text-dark-blue my-24 text-center text-3xl">
          Our various services package includes car sales service on behalf of
          our valued customers, whether for incoming cars or locally registered
          cars, and that is a desire to achieve the principle of success
          partners with our customers, in addition to that we provide a wide
          variety of used cars at our outlets.
        </p>
      </div>

      <ApplyForAccount />

      <div className="text-dark-blue container mx-auto py-8">
        <h2 className="text-center text-5xl font-semibold">Contact Us</h2>
        <p className="py-4 text-center text-3xl">
          You’re Welcome to call, text or email us on the following details
        </p>
        <ContactDetails />
      </div>
    </Layout>
  );
};

export default Showroom;
