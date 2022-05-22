import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Cancelled } from '@/components/dashboard/newCar/cancelled';
import { Paid } from '@/components/dashboard/newCar/paid';
import { PaidByCustomer } from '@/components/dashboard/newCar/paid_by_customer';
import { Towing } from '@/components/dashboard/newCar/towing';
import { UnPaid } from '@/components/dashboard/newCar/unpaid';
import { Pagination } from '@/components/dashboard/pagination';

const NewCarTab = ({ carsRecords, totalRecords, baseUrl, page = 0, type }) => {
  let carTableData;
  if (!type) {
    type = 'unpaid';
  }
  if (type === 'paid' || type === 'paid_bycustomer') {
    carTableData = [
      {
        header: <FormattedMessage id="page.customer.dashboard.table.no" />,
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.auction_photo" />
        ),
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.detail" />,
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.lot_vin" />,
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.auction" />,
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.destination" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.purchase_date" />
        ),
      },
      { header: <FormattedMessage id="page.customer.dashboard.table.price" /> },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.payment_date" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.amount_paid" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.amount_remaining" />
        ),
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.status" />,
      },
    ];
  }
  if (type === 'towing') {
    carTableData = [
      { header: <FormattedMessage id="page.customer.dashboard.table.no" /> },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.auction_photo" />
        ),
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.detail" />,
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.lot_vin" />,
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.auction" />,
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.destination" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.purchase_date" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.payment_date" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.date_pick" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.eta_to_warehouse" />
        ),
      },
    ];
  }
  if (type === 'cancelled') {
    carTableData = [
      { header: <FormattedMessage id="page.customer.dashboard.table.no" /> },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.auction_photo" />
        ),
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.detail" />,
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.lot_vin" />,
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.auction" />,
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.destination" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.purchase_date" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.date_of_cancellation" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.cost_car" />
        ),
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.rule" />,
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.storage" />,
      },
    ];
  }
  if (!type || type === 'unpaid') {
    carTableData = [
      { header: <FormattedMessage id="page.customer.dashboard.table.no" /> },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.auction_photo" />
        ),
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.detail" />,
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.lot_vin" />,
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.auction" />,
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.destination" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.purchase_date" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.last_day_to_pay" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.days_off" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.date_extra" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.days_remaining" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.start_storage" />
        ),
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.car" />,
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.storage_late" />
        ),
      },
      {
        header: (
          <FormattedMessage id="page.customer.dashboard.table.total_cost_storage" />
        ),
      },
      {
        header: <FormattedMessage id="page.customer.dashboard.table.Total" />,
      },
    ];
  }
  const paginationUrl = `${baseUrl}/customer/dashboard?tab=tabs-newcar&type=${type}&page=`;
  return (
    <div className="" id="tabs-newcar" role="tabpanel">
      <div className="pt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-xl font-semibold">
              <FormattedMessage id="page.customer.dashboard.new_cars" />
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden  border border-[#005fb7] md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-white">
                    <tr>
                      {carTableData.map((th, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-3 py-3.5 text-left text-base font-semibold text-blue-600"
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
