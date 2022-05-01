import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';

import { getTableData } from '@/components/dashboard/tableDataByType';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const NewCarTab = ({ carsRecords, type }) => {
  let carTableData;
  const carsRecordNew = getTableData(carsRecords, type);
  console.log(carsRecordNew);
  if (type === 'paid' || type === 'paid_bycustomer') {
    carTableData = [
      { header: 'No' },
      { header: 'Auction Photo' },
      { header: 'Detail' },
      { header: 'Lot & Vin' },
      { header: 'Auction' },
      { header: 'Destination' },
      { header: 'Purchase Date' },
      { header: 'Price' },
      { header: 'Payment Date' },
      { header: 'Amount paid' },
      { header: 'Amount Remaining' },
      { header: 'Status' },
    ];
  }
  if (type === 'towing') {
    carTableData = [
      { header: 'No' },
      { header: 'Auction Photo' },
      { header: 'Detail' },
      { header: 'Lot & Vin' },
      { header: 'Auction' },
      { header: 'Destination' },
      { header: 'Purchase Date' },
      { header: 'Payment Date' },
      { header: 'Date Pick' },
      { header: 'ETA To Warehouse' },
    ];
  }
  if (type === 'cancelled') {
    carTableData = [
      { header: 'No' },
      { header: 'Auction Photo' },
      { header: 'Detail' },
      { header: 'Lot & Vin' },
      { header: 'Auction' },
      { header: 'Destination' },
      { header: 'Purchase Date' },
      { header: 'Date of Cancellation' },
      { header: 'Cost Car' },
      { header: 'Rule' },
      { header: 'Storage' },
    ];
  }
  if (!type || type === 'unpaid') {
    carTableData = [
      { header: 'No' },
      { header: 'Auction Photo' },
      { header: 'Detail' },
      { header: 'Lot & Vin' },
      { header: 'Auction' },
      { header: 'Destination' },
      { header: 'Purchase Date' },
      { header: 'Last Day To Pay' },
      { header: 'Days Off' },
      { header: 'Date Extra' },
      { header: 'Days Remaining' },
      { header: 'Start Storage' },
      { header: 'Car' },
      { header: 'Storage Late' },
      { header: 'Total Cost Storage' },
      { header: 'Total' },
    ];
  }

  const statusTypes = [
    {
      name: 'Unpaid',
      href: 'unpaid',
      current: type === 'unpaid',
    },
    {
      name: 'Cancelled',
      href: 'cancelled',
      current: type === 'cancelled',
    },
    {
      name: 'Paid',
      href: 'paid',
      current: type === 'paid',
    },
    {
      name: 'Paid by Customer',
      href: 'paid_bycustomer',
      current: type === 'paid_bycustomer',
    },
    {
      name: 'In towing',
      href: 'towing',
      current: type === 'towing',
    },
  ];
  return (
    <div className="" id="tabs-newcar" role="tabpanel">
      <nav
        className="mt-[15px] flex max-w-max flex-wrap gap-2 rounded-md border border-blue-600 px-2 sm:gap-4"
        aria-label="Tabs"
      >
        {statusTypes.map((status) => (
          <Link
            key={status.name}
            href={{
              pathname: '/customer/dashboard/',
              query: { tab: 'tabs-newcar', type: status.href },
            }}
          >
            <a
              key={status.href}
              className={classNames(
                status.current
                  ? ' text-blue-600'
                  : 'text-gray-500 hover:text-gray-700',
                'px-1 py-0 font-medium text-sm sm:text-base sm:py-2'
              )}
            >
              {status.name}
            </a>
          </Link>
        ))}
      </nav>
      <div className="pt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-xl font-semibold">New Cars</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 border border-[#005fb7]">
                  <thead className="bg-white">
                    <tr>
                      {carTableData.map((th) => (
                        <th
                          key={th.header}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-blue-600 sm:text-xl"
                        >
                          {th.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {carsRecords.map((car, index) => (
                      <tr
                        key={car.carId}
                        className={classNames(
                          index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                          'text-xs sm:text-[17px]'
                        )}
                      >
                        <td
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {index + 1}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[56px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          <img src={car.image} alt="" />
                        </td>
                        <td
                          scope="col"
                          className="min-w-[180px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.carMakerName} {car.carModelName} {car.year}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[130px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          Lot: {car.lotnumber} <br /> Vin: {car.vin}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[160px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.auctionLocationName} <br /> {car.auctionTitle}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[64px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        ></td>
                        <td
                          scope="col"
                          className="min-w-[55px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.purchasedDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        ></td>
                        <td
                          scope="col"
                          className="min-w-[30px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        ></td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.extraDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[60px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.remainingDays}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[63px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.startStorage}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        ></td>
                        <td
                          scope="col"
                          className="min-w-[60px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.fineTotalCost}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[60px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        ></td>
                        <td
                          scope="col"
                          className="min-w-[60px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.totalUSD} $ <br /> {car.totalAED}
                        </td>
                      </tr>
                    ))}
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
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
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
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export { NewCarTab };
