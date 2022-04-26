/* This example requires Tailwind CSS v2.0+ */

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React from 'react';

import { Layout } from '@/templates/Layout2';

const tabs = [
  { name: 'New  Cars', href: 'tabs-newcar', current: true },
  { name: 'At Warehouse', href: 'tabs-warehouse', current: false },
  { name: 'In shipping', href: '', current: false },
  { name: 'Arrived', href: '', current: false },
  { name: 'Delivered', href: '', current: false },
];
const newCarTableHeader = [
  { name: 'No' },
  { name: 'Auction Photo' },
  { name: 'Detail' },
  { name: 'Lot & Vin' },
  { name: 'Auction' },
  { name: 'Destination' },
  { name: 'Purchase Date' },
  { name: 'Last Day To Pay' },
  { name: 'Days Off' },
  { name: 'Date Extra' },
  { name: 'Days Remaining' },
  { name: 'Start Storage' },
  { name: 'Car' },
  { name: 'Storage Late' },
  { name: 'Total Cost Storage' },
  { name: 'Total' },
];

const cars = [
  { name: 'No' },
  { name: 'Auction Photo' },
  { name: 'Detail' },
  { name: 'Lot & Vin' },
  { name: 'Auction' },
  { name: 'Destination' },
  { name: 'Purchase Date' },
  { name: 'Last Day To Pay' },
  { name: 'Days Off' },
  { name: 'Date Extra' },
  { name: 'Days Remaining' },
  { name: 'Start Storage' },
  { name: 'Car' },
  { name: 'Storage Late' },
  { name: 'Total Cost Storage' },
  { name: 'Total' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export async function getServerSideProps(context) {
  context.params = {};
  const session = await getSession(context);
  let carsData = {};
  if (session && session.token && session.token.access_token) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token.access_token}`,
      },
    };
    await fetch(`${process.env.API_URL}newCars`, requestOptions)
      .then((result) => {
        console.log(carsData);
        carsData = result.json();
      })
      .then((resJson) => {
        console.log(resJson);
      });
  }
  return {
    props: {
      carsD: carsData,
    },
  };
}
const Dashboard = ({ router }) => {
  const {
    query: { tab },
  } = router;

  const isTabOne = tab === 'tabs-newcar' || tab == null;
  const isTabTwo = tab === 'tabs-warehouse';
  return (
    <Layout meta="">
      <div>
        <div className="m-4">
          <div className="hidden sm:block">
            <nav className="flex flex-wrap gap-4 " aria-label="Tabs">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={{
                    pathname: '/customer/dashboard/',
                    query: { tab: tab.href },
                  }}
                >
                  <a
                    key={tab.name}
                    className={classNames(
                      tab.current
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-600 hover:text-gray-700',
                      'px-3 py-2 font-medium text-2xl rounded-md hover:border-inherit border-2 border-blue-600'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                </Link>
              ))}
            </nav>
            <div>
              {isTabOne && (
                <React.Fragment>
                  <div
                    className=""
                    id="tabs-newcar"
                    role="tabpanel"
                    aria-labelledby="tabs-home-tab"
                  >
                    <div className="pt-14">
                      <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                          <h1 className="text-dark-blue text-xl font-semibold">
                            New Cars
                          </h1>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300 border border-[#005fb7]">
                                <thead className="bg-white">
                                  <tr>
                                    {newCarTableHeader.map((th) => (
                                      <th
                                        key={th.name}
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-2xl font-semibold text-blue-600"
                                      >
                                        {th.name}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-light-grey">
                                    {cars.map((car) => (
                                      <td
                                        key={car.name}
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-[17px] font-semibold text-[#1C1C1C]"
                                      >
                                        {car.name}
                                      </td>
                                    ))}
                                  </tr>
                                  <tr className="bg-white">
                                    {cars.map((car) => (
                                      <td
                                        key={car.name}
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-[#1C1C1C]"
                                      >
                                        {car.name}
                                      </td>
                                    ))}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="float-right mt-3">
                        <nav
                          className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                          aria-label="Pagination"
                        >
                          <a
                            href="#"
                            className="bg-dark-blue relative inline-flex items-center rounded-l-md border border-gray-300 p-2 text-sm font-medium text-white hover:bg-gray-50"
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </a>
                          {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                          <a
                            href="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
                          >
                            1
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            2
                          </a>
                          <a
                            href="#"
                            className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
                          >
                            3
                          </a>
                          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                            ...
                          </span>
                          <a
                            href="#"
                            className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
                          >
                            8
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            9
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            10
                          </a>
                          <a
                            href="#"
                            className="bg-dark-blue relative inline-flex items-center rounded-r-md border border-gray-300 p-2 text-sm font-medium text-white hover:bg-gray-50"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
              {isTabTwo && (
                <React.Fragment>This is tab two content</React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Dashboard);
