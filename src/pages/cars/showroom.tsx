import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
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
  const apiUrl = process.env.API_URL;
  const res = await axios.get(`${apiUrl}getMaker`);
  carsMakerData = res.data ? res.data.data : res.data;
  const resY = await axios.get(`${`${apiUrl}getYear`}`);
  YearData = resY.data ? resY.data.data : resY.data;
  return {
    props: { carsMakerData, YearData },
  };
}

export default function App({ carsMakerData, YearData }) {
  const [selectedMaker, setSelectedMaker] = useState('');
  const [selectedYear, setselectedYear] = useState('');
  const [selectedModel, setselectedModel] = useState('');

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `/api/cars/carsForSale?per_page=${PAGE_SIZE}&page=${
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

  const [carsModelData, setcarsModelData] = useState([]);
  const callModel = async (selected) => {
    let carsMakerModel = [];
    setSelectedMaker(selected);
    setselectedModel('');
    const res = await axios.get(`/api/cars/carsModel`, {
      params: {
        maker_id: selected.id_car_make,
      },
    });
    carsMakerModel = res.data ? res.data.data : res.data;
    setcarsModelData(carsMakerModel);
  };

  const totalMaker = carsMakerData;
  const YData = YearData;

  return (
    <Layout meta={<Meta title="Cars Showroom" description="Cars Showroom" />}>
      <div className="container mx-auto">
        <Breadcrumbs breadcrumbs={[{ name: 'Cars Showroom', href: '#' }]} />
      </div>

      <h3 className="text-dark-blue py-2 text-center text-3xl lg:text-4xl xl:text-5xl font-semibold">
        <FormattedMessage id="page.cars.showroom.cars_showroom" />
      </h3>

      <div className="container mx-auto">
        <p className="py-3">
          <i className="material-icons text-yellow-orange align-middle text-5xl">
            &#xe164;
          </i>
          <span className="text-dark-blue ml-4 align-middle text-xl md:text-2xl lg:text-4xl">
            <FormattedMessage id="page.cars.showroom.find_your_car" />
          </span>
        </p>

        <div className="my-4 flex flex-col flex-wrap gap-x-8  gap-y-4 md:flex-row ">
          <div className="basis-1/5">
            <Listbox value={selectedYear} onChange={setselectedYear}>
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className="border-teal-blue relative w-full cursor-default border border-gray-300 bg-white
                        py-3 pr-10 text-center text-xl font-medium italic 
                        text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <span className="block truncate">
                        {selectedYear || (
                          <FormattedMessage id="page.cars.showroom.year" />
                        )}
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-[16px]">
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
                      className="border-teal-blue relative w-full cursor-default border border-gray-300 bg-white
                        py-3 pr-10 text-center text-xl font-medium italic 
                        text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <span className="block truncate">
                        {selectedMaker ? (
                          selectedMaker.name
                        ) : (
                          <FormattedMessage id="page.cars.showroom.maker" />
                        )}
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-[16px]">
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
                      className="border-teal-blue relative w-full cursor-default border border-gray-300 bg-white
                        py-3 pr-10 text-center text-xl font-medium italic 
                        text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <span className="block truncate">
                        {selectedModel ? (
                          selectedModel.name
                        ) : (
                          <FormattedMessage id="page.cars.showroom.model" />
                        )}
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-[16px]">
                        {carsModelData
                          ? carsModelData.map((object) => (
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
                          : null}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          {selectedYear !== '' || selectedMaker !== '' ? (
            <div className="basis-1/5">
              <button
                className="bg-azure-blue my-1 block rounded-md py-3 px-6 text-xl font-medium text-white hover:border-0 hover:bg-blue-600"
                onClick={() => {
                  setselectedYear('');
                  setSelectedMaker('');
                  setselectedModel('');
                }}
              >
                Show all
              </button>
            </div>
          ) : null}
        </div>

        <p className="text-medium-grey py-2 text-lg text-2xl italic md:text-xl">
          *
          <FormattedMessage id="page.cars.showroom.please_contact_us_to_negotiate_prices" />
        </p>

        <div className="my-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 gap-x-8 gap-y-4">
          {issues.length > 0
            ? issues.map((object) => {
                return object.data.length > 0
                  ? object.data.map((obj, index2) => {
                      return (
                        <Link
                          href={{
                            pathname: '/cars/profile',
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
                                <div className="text-dark-blue text-sm">
                                  <p className="h-10 overflow-hidden text-ellipsis font-semibold ">
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
           : (
            <FormattedMessage id="page.cars.showroom.load_more" />
          )}
        </button>
        <p className="text-dark-blue my-12 text-center text-xl md:my-24 md:text-3xl">
          <FormattedMessage id="page.cars.showroom.showroom-desc" />
        </p>
      </div>

      <ApplyForAccount />

      <div className="text-dark-blue container mx-auto my-16 py-8">
        <h2 className="text-center text-2xl font-semibold md:text-3xl lg:text-4xl">
          <FormattedMessage id="Contact Us" />
        </h2>
        <p className="py-4 text-center text-xl md:text-2xl lg:text-3xl">
          You’re Welcome to call, text or email us on the following details
        </p>
        <ContactDetails />
      </div>
    </Layout>
  );
}
