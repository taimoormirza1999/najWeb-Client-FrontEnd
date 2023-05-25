import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { FormattedMessage } from 'react-intl';

import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';

const DeliveredCarTab = ({
  carsRecords,
  totalRecords,
  page = 0,
  type,
  limit,
  search = '',
}) => {
  if (!type) {
    type = 'Paid';
  }
  let carTableHeader;
  if (type === 'Paid') {
    carTableHeader = [
      'page.customer.dashboard.table.no',
      'page.customer.dashboard.table.auction_photo',
      'page.customer.dashboard.table.detail',
      'page.customer.dashboard.table.lot_vin',
      'page.customer.dashboard.table.auction',
      'page.customer.dashboard.table.destination',
      'page.customer.dashboard.table.purchase_date',
      'page.customer.dashboard.table.date_pick',
      'page.customer.dashboard.table.arrived',
      'page.customer.dashboard.table.title',
      'page.customer.dashboard.table.key',
      'page.customer.dashboard.table.loaded_date',
      'page.customer.dashboard.table.booking',
      'page.customer.dashboard.table.container',
      'page.customer.dashboard.table.shipping_date',
      'page.customer.dashboard.table.date_arrived_port',
      'page.customer.dashboard.table.date_arrived_store',
      'page.customer.dashboard.table.date_delivered',
      'page.customer.dashboard.table.Total',
      'page.customer.dashboard.table.payment_date',
      'page.customer.dashboard.table.amount_paid',
      'page.customer.dashboard.table.amount_remaining',
      'page.customer.dashboard.table.images',
    ];
  }
  if (type === 'unpaid') {
    carTableHeader = [
      'page.customer.dashboard.table.no',
      'page.customer.dashboard.table.auction_photo',
      'page.customer.dashboard.table.detail',
      'page.customer.dashboard.table.lot_vin',
      'page.customer.dashboard.table.auction',
      'page.customer.dashboard.table.destination',
      'page.customer.dashboard.table.purchase_date',
      'page.customer.dashboard.table.date_pick',
      'page.customer.dashboard.table.arrived',
      'page.customer.dashboard.table.title',
      'page.customer.dashboard.table.key',
      'page.customer.dashboard.table.loaded_date',
      'page.customer.dashboard.table.booking',
      'page.customer.dashboard.table.container',
      'page.customer.dashboard.table.shipping_date',
      'page.customer.dashboard.table.date_arrived_port',
      'page.customer.dashboard.table.date_arrived_store',
      'page.customer.dashboard.table.date_delivered',
      'page.customer.dashboard.table.Total',
      'page.customer.dashboard.table.payment_date',
      'page.customer.dashboard.table.images',
    ];
  }
  const paginationUrl = `/customer/dashboard?tab=tabs-delivered&search=${search}&type=${type}&limit=${limit}`;
  const limitUrl = `/customer/dashboard?tab=tabs-delivered&type=${type}&page=`;
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;
  return (
    <div className="" id="tabs-delivered" role="tabpanel">
      <div className="pt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-3xl font-semibold">
              <FormattedMessage id="page.customer.dashboard.delivered" />
            </h1>
          </div>
        </div>
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-[#005fb7] md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-white">
                    <tr>
                      {carTableHeader.map((th, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-3 py-3.5 text-left text-base font-semibold text-blue-600"
                        >
                          <FormattedMessage id={th} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {carsRecords.map((car, index) => (
                      <tr
                        key={index}
                        className={classNames(
                          index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                          'text-sm'
                        )}
                      >
                        <td
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {addIndex + index + 1}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[56px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          <img
                            className="max-h-[50px]"
                            src={car.image}
                            alt=""
                          />
                        </td>
                        <td
                          scope="col"
                          className="min-w-[180px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.carMakerName} {car.carModelName} {car.year}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[130px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          Lot: {car.lotnumber} <br /> Vin: {car.vin}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[160px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.auction_location_name} <br /> {car.auctionTitle}
                          <br /> {car.region}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.port_name}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.purchasedate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[30px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.picked_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.delivered_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[60px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.delivered_title === '1' ||
                          car.follow_title === '1' ? (
                            <CheckCircleIcon
                              className="h-6 w-6 text-green-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircleIcon
                              className="h-6 w-6 text-red-400"
                              aria-hidden="true"
                            />
                          )}
                          <br />
                          {car.titleDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[63px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.delivered_car_key === '1' ? (
                            <CheckCircleIcon
                              className="h-6 w-6 text-green-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircleIcon
                              className="h-6 w-6 text-red-400"
                              aria-hidden="true"
                            />
                          )}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.loaded_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.booking_number}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.container_number}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.shipping_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.arrival_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.receive_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.deliver_create_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.total_cost}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.paymentDate}
                        </td>
                        {type === 'Paid' && (
                          <td
                            scope="col"
                            className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                          >
                            {car.amount_paid}
                          </td>
                        )}
                        {type === 'Paid' && (
                          <td
                            scope="col"
                            className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                          >
                            {car.remaining_amount}
                          </td>
                        )}
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          <img
                            className="max-h-[50px]"
                            src={car.image}
                            alt=""
                          />
                        </td>
                      </tr>
                    ))}
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

export { DeliveredCarTab };
