import Link from 'next/link';
import React from 'react';

import { Cancelled } from '@/components/dashboard/newCar/cancelled';
import { Paid } from '@/components/dashboard/newCar/paid';
import { PaidByCustomer } from '@/components/dashboard/newCar/paid_by_customer';
import { Towing } from '@/components/dashboard/newCar/towing';
import { UnPaid } from '@/components/dashboard/newCar/unpaid';
import { Pagination } from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';

const NewCarTab = ({ carsRecords, totalRecords, baseUrl, page = 0, type }) => {
  let carTableData;
  if (!type) {
    type = 'unpaid';
  }
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
  const paginationUrl = `${baseUrl}/customer/dashboard?tab=tabs-newcar&type=${type}&page=`;
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
            <h1 className="text-dark-blue text-2xl font-semibold">New Cars</h1>
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
                    {type === 'paid' && <Paid carsRecords={carsRecords}></Paid>}
                    {type === 'unpaid' && (
                      <UnPaid carsRecords={carsRecords}></UnPaid>
                    )}
                    {type === 'paid_bycustomer' && (
                      <PaidByCustomer
                        carsRecords={carsRecords}
                      ></PaidByCustomer>
                    )}
                    {type === 'cancelled' && (
                      <Cancelled carsRecords={carsRecords}></Cancelled>
                    )}
                    {type === 'towing' && (
                      <Towing carsRecords={carsRecords}></Towing>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          totalRecords={totalRecords}
          page={page}
          url={paginationUrl}
        ></Pagination>
      </div>
    </div>
  );
};

export { NewCarTab };
