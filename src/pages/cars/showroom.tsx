import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Link from 'next/link';
import { Fragment, React, useRef, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import ApplyForAccount from '@/components/ApplyForAccount';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactDetails from '@/components/ContactDetails';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';
import { classNames } from '@/utils/Functions';

const fetcher = (url) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 40;

export async function getServerSideProps() {
  let carsMakerData = {};
  let YearData = {};
  const apiTab = 'getMaker';
  const apiUrl = process.env.API_URL + apiTab;
  const res = await axios.get(`${apiUrl}`);
  carsMakerData = res.data ? res.data.data : res.data;
  const resY = await axios.get(`${`${process.env.API_URL}getYear`}`);
  YearData = resY.data ? resY.data.data : resY.data;
  return {
    props: { carsMakerData, YearData, API_URL: process.env.API_URL },
  };
}

export default function App({ carsMakerData, YearData, API_URL }) {
  const [repo, setRepo] = useState('reactjs/react-a11y');
  const [val, setVal] = useState(repo);
  const apiTab = 'CarsForSale';
  const apiUrl = `https://api.nejoumaljazeera.co/api/${apiTab}`;

  const [selectedMaker, setSelectedMaker] = useState('');
  const [selectedYear, setselectedYear] = useState('');
  const [selectedModel, setselectedModel] = useState('');

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `${apiUrl}?per_page=${PAGE_SIZE}&page=${
        index + 1
      }&year=${selectedYear}&maker=${
        selectedMaker ? selectedMaker.id_car_make : ''
      }&model=${selectedModel ? selectedModel.id_car_model : ''}`,
    fetcher
  );

  const issues = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1].data?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const [carsModelData, setcarsModelData] = useState([]);
  const callModel = async (selected) => {
    let carsMakerModel = [];
    setSelectedMaker(selected);
    setselectedModel('');
    const apiTab = 'getModel';
    const apiUrl = API_URL + apiTab;
    const res = await axios.get(`${apiUrl}`, {
      params: { maker_id: selected.id_car_make },
    });
    carsMakerModel = res.data ? res.data.data : res.data;
    setcarsModelData(carsMakerModel);
  };
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const totalMaker = carsMakerData;
  const YData = YearData;

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

      <h3 className="text-dark-blue py-2 text-center text-3xl lg:text-4xl xl:text-5xl font-semibold">
        Cars Showroom
      </h3>

      <div className="container mx-auto">
        <p className="py-3">
          <i className="material-icons text-yellow-orange align-middle text-5xl">
            &#xe164;
          </i>
          <span className="text-dark-blue ml-4 align-middle text-xl md:text-2xl lg:text-4xl">
            Find Your Car
          </span>
        </p>

        <div className="my-4 flex flex-col md:flex-row flex-wrap  gap-x-8 gap-y-4 ">
          <div className="basis-1/5">
            <Listbox value={selectedYear} onChange={setselectedYear}>
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className="border-teal-blue relative w-full cursor-default border border border-gray-300 bg-white
                        py-3 py-2 pr-20 pl-3 pr-10 text-center text-xl font-medium italic 
                        text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <span className="block truncate">
                        {selectedYear || 'Year'}
                      </span>
                      <span className="bg-teal-blue absolute right-0 top-0 h-full p-4 text-center">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {YData.map((object) => (
                          <Listbox.Option
                            key={object}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'bg-teal-blue text-white bg-indigo-600'
                                  : 'text-teal-blue',
                                'cursor-default select-none relative py-2 pl-3 pr-9'
                              )
                            }
                            value={object}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate'
                                  )}
                                >
                                  {object}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active
                                        ? 'bg-teal-blue text-white'
                                        : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div className="basis-1/5">
            <Listbox
              value={selectedMaker}
              onChange={(event) => callModel(event)}
            >
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className="border-teal-blue relative w-full cursor-default border border border-gray-300 bg-white
                        py-3 py-2 pr-20 pl-3 pr-10 text-center text-xl font-medium italic 
                        text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <span className="block truncate">
                        {selectedMaker ? selectedMaker.name : 'Maker'}
                      </span>
                      <span className="bg-teal-blue absolute right-0 top-0 h-full p-4 text-center">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {totalMaker.map((object) => (
                          <Listbox.Option
                            key={object.id_car_make}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'bg-teal-blue text-white bg-indigo-600'
                                  : 'text-teal-blue',
                                'cursor-default select-none relative py-2 pl-3 pr-9'
                              )
                            }
                            value={object}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate'
                                  )}
                                >
                                  {object.name} ({object.total})
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active
                                        ? 'bg-teal-blue text-white'
                                        : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div className="basis-1/5">
            <Listbox value={selectedModel} onChange={setselectedModel}>
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className="border-teal-blue relative w-full cursor-default border border border-gray-300 bg-white
                        py-3 py-2 pr-20 pl-3 pr-10 text-center text-xl font-medium italic 
                        text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <span className="block truncate">
                        {selectedModel ? selectedModel.name : 'Model'}
                      </span>
                      <span className="bg-teal-blue absolute right-0 top-0 h-full p-4 text-center">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {carsModelData ? (
                          carsModelData.map((object) => (
                            <Listbox.Option
                              key={object.id_car_model}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? 'bg-teal-blue text-white bg-indigo-600'
                                    : 'text-teal-blue',
                                  'cursor-default select-none relative py-2 pl-3 pr-9'
                                )
                              }
                              value={object}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'block truncate'
                                    )}
                                  >
                                    {object.name} ({object.total})
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? 'bg-teal-blue text-white'
                                          : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))
                        ) : (
                          <Listbox.Option></Listbox.Option>
                        )}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div className="hidden flex basis-2/6 content-end justify-end">
            <a
              href="#"
              onClick={() => setSize(1)}
              className="bg-azure-blue block rounded-xl py-3 px-6 text-xl font-medium text-white hover:border-0 hover:bg-blue-400"
            >
              Show all
            </a>
          </div>
        </div>

        <p className="text-medium-grey py-2 text-lg text-2xl italic md:text-xl">
          *Please Contact us to negotiate prices
        </p>

        <div className="my-4 flex grid grid-cols-6 flex-wrap gap-4 gap-x-8 gap-y-4">
          {issues.length > 0
            ? issues.map((object, index) => {
                return object.data.length > 0
                  ? object.data.map((obj, index2) => {
                      return (
                        <Link
                          href={{
                            pathname: './profile',
                            query: { id: obj.car_id }, // your data array of objects
                          }}
                          key={index2}
                        >
                          <a className="hover:border-0">
                            <div>
                              <img
                                src={obj.photos}
                                alt="Car"
                                className="h-[300px] w-full object-cover shadow-lg"
                              />
                              <div className="border-dark-blue flex border py-2 px-4">
                                <div className="text-dark-blue basis-2/8 text-sm">
                                  <p className="font-semibold">
                                    {' '}
                                    {obj.carMakerName} {obj.carModelName}{' '}
                                    {obj.car_year}
                                  </p>
                                  <p>AED {obj.price}</p>
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      );
                    })
                  : '';
              })
            : ''}
        </div>
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className={classNames(
            isReachingEnd ? 'hidden' : '',
            'bg-outer-space mx-auto my-5 block max-w-max rounded-md py-3 px-8 text-xl md:text-2xl text-white hover:border-0 hover:bg-gray-700'
          )}
        >
          {isLoadingMore
            ? 'loading...'
            : isReachingEnd
            ? 'no more'
            : 'load more'}
        </button>
        <p className="text-dark-blue my-12 text-center text-xl md:my-24 md:text-3xl">
          Our various services package includes car sales service on behalf of
          our valued customers, whether for incoming cars or locally registered
          cars, and that is a desire to achieve the principle of success
          partners with our customers, in addition to that we provide a wide
          variety of used cars at our outlets.
        </p>
      </div>

      <ApplyForAccount />

      <div className="text-dark-blue container mx-auto my-8 py-8">
        <h2 className="text-center text-2xl font-semibold md:text-3xl lg:text-5xl">
          Contact Us
        </h2>
        <p className="py-4 text-center text-xl md:text-2xl lg:text-3xl">
          You’re Welcome to call, text or email us on the following details
        </p>
        <ContactDetails />
      </div>
    </Layout>
  );
}
