import { useState } from 'react';

import { Cancelled } from '@/components/dashboard/newCar/cancelled';
import { Paid } from '@/components/dashboard/newCar/paid';
import { PaidByCustomer } from '@/components/dashboard/newCar/paid_by_customer';
import { Towing } from '@/components/dashboard/newCar/towing';
import { UnPaid } from '@/components/dashboard/newCar/unpaid';
import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import NoteModal from '@/components/noteModal';

import TableHeader from '../TableHeader';
import TableHeadText from '../TableHeadText';

const NewCarTab = ({
  carsRecords,
  totalRecords,
  page = 0,
  type,
  limit,
  search = '',
  order = '',
}) => {
  let carTableData;
  if (!type) {
    type = 'unpaid';
  }
  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useState('');
  if (type === 'paid' || type === 'paid_bycustomer') {
    carTableData = [
      {
        header: 'page.customer.dashboard.table.no',
      },
      {
        header: 'page.customer.dashboard.table.auction_photo',
      },
      {
        header: 'page.customer.dashboard.table.detail',
        order: 'carMakerName',
      },
      {
        header: 'page.customer.dashboard.table.lot_vin',
        order: 'lotnumber',
      },
      {
        header: 'page.customer.dashboard.table.auction',
        order: 'auction_location_name',
      },
      {
        header: 'page.customer.dashboard.table.buyer_number',
      },
      {
        header: 'page.customer.dashboard.table.region',
      },
      {
        header: 'page.customer.dashboard.table.destination',
        order: 'port_name',
      },
      {
        header: 'page.customer.dashboard.table.purchase_date',
        order: 'purchasedate',
      },
      { header: 'page.customer.dashboard.table.price' },
      {
        header: 'page.customer.dashboard.table.payment_date',
        order: 'paymentDate',
      },
      {
        header: 'page.customer.dashboard.table.amount_paid',
      },
      {
        header: 'page.customer.dashboard.table.amount_remaining',
      },
      {
        header: 'page.customer.dashboard.table.status',
      },
    ];
  }
  if (type === 'towing') {
    carTableData = [
      { header: 'page.customer.dashboard.table.no' },
      {
        header: 'page.customer.dashboard.table.auction_photo',
      },
      {
        header: 'page.customer.dashboard.table.detail',
        order: 'carMakerName',
      },
      {
        header: 'page.customer.dashboard.table.lot_vin',
        order: 'lotnumber',
      },
      {
        header: 'page.customer.dashboard.table.auction',
        order: 'auction_location_name',
      },
      {
        header: 'page.customer.dashboard.table.buyer_number',
      },
      {
        header: 'page.customer.dashboard.table.region',
      },
      {
        header: 'page.customer.dashboard.table.destination',
        order: 'port_name',
      },
      {
        header: 'page.customer.dashboard.table.purchase_date',
        order: 'purchasedate',
      },
      {
        header: 'page.customer.dashboard.table.payment_date',
        order: 'paymentDate',
      },
      {
        header: 'page.customer.dashboard.table.date_pick',
      },
      {
        header: 'picked_car_title_note',
      },
      {
        header: 'page.customer.dashboard.table.eta_to_warehouse',
      },
    ];
  }
  if (type === 'cancelled') {
    carTableData = [
      { header: 'page.customer.dashboard.table.no' },
      {
        header: 'page.customer.dashboard.table.auction_photo',
      },
      {
        header: 'page.customer.dashboard.table.detail',
        order: 'carMakerName',
      },
      {
        header: 'page.customer.dashboard.table.lot_vin',
        order: 'lotnumber',
      },
      {
        header: 'page.customer.dashboard.table.auction',
        order: 'auction_location_name',
      },
      {
        header: 'page.customer.dashboard.table.buyer_number',
      },
      {
        header: 'page.customer.dashboard.table.region',
      },
      {
        header: 'page.customer.dashboard.table.destination',
        order: 'port_name',
      },
      {
        header: 'page.customer.dashboard.table.purchase_date',
        order: 'purchasedate',
      },
      {
        header: 'page.customer.dashboard.table.date_of_cancellation',
      },
      {
        header: 'page.customer.dashboard.table.cost_car',
      },
    ];
  }
  if (!type || type === 'unpaid') {
    carTableData = [
      { header: 'page.customer.dashboard.table.no' },
      {
        header: 'page.customer.dashboard.table.auction_photo',
      },
      {
        header: 'page.customer.dashboard.table.detail',
        order: 'carMakerName',
      },
      {
        header: 'page.customer.dashboard.table.lot_vin',
        order: 'lotnumber',
      },
      {
        header: 'page.customer.dashboard.table.auction',
        order: 'auction_location_name',
      },
      {
        header: 'page.customer.dashboard.table.buyer_number',
      },
      {
        header: 'page.customer.dashboard.table.region',
      },
      {
        header: 'page.customer.dashboard.table.destination',
        order: 'port_name',
      },
      {
        header: 'page.customer.dashboard.table.purchase_date',
        order: 'purchasedate',
      },
      {
        header: 'page.customer.dashboard.table.last_day_to_pay',
      },
      {
        header: 'page.customer.dashboard.table.days_off',
      },
      {
        header: 'page.customer.dashboard.table.date_extra',
      },
      {
        header: 'page.customer.dashboard.table.days_remaining',
      },
      {
        header: 'page.customer.dashboard.table.start_storage',
      },
      {
        header: 'page.customer.dashboard.table.car',
      },
      {
        header: 'page.customer.dashboard.table.storage_late',
      },
      {
        header: 'page.customer.dashboard.table.total_cost_storage',
      },
      {
        header: 'page.customer.dashboard.table.Total',
      },
    ];
  }
  const paginationUrl = `/customer/dashboard?tab=tabs-newcar&search=${search}&type=${type}&limit=${limit}&order=${order}`;
  const limitUrl = `/customer/dashboard?tab=tabs-newcar&type=${type}&order=${order}&page=`;
  return (
    <div className="" id="tabs-newcar" role="tabpanel">
      <NoteModal
        openNote={openNote}
        note={note}
        setOpenNote={setOpenNote}
      ></NoteModal>
      <div>
        <TableHeadText id={'page.customer.dashboard.new_cars'} />
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {/* <div className="overflow-hidden"> */}
              <div className="table_top_div flex max-h-[50vh] flex-col">
                <table className="all_tables min-w-full divide-y divide-gray-300">
                  {/* <thead className="bg-white">
                    <tr>
                      {carTableData.map((th, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-3 py-3.5 text-left text-base font-semibold text-blue-600 border-dark-blue border-[1px]"
                        >
                          <div className="flex items-center justify-between">
                            <FormattedMessage id={th.header} />
                            <Sort
                              order={order}
                              elemOrder={th.order}
                              index={index}
                            />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead> */}

                  <TableHeader tableHeader={carTableData} order={order} />

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
          limit={limit}
        ></Pagination>
      </div>
    </div>
  );
};

export { NewCarTab };
