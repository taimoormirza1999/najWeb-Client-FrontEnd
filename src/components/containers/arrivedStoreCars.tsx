import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { classNames } from '@/utils/Functions';

import TableColumn from '../TableColumn';

const carTableHeader = [
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
  'page.customer.dashboard.table.Total',
];

const ArrivedStoreCars = ({ cars }) => {
  return (
    <div className="pt-4">
      <div className="overflow-x-auto border border-[#005fb7] md:rounded-lg">
        <table className="divide-y divide-gray-300">
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
            {cars.map((car, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                  'text-sm'
                )}
              >
                <TableColumn
                  scope="col"
                  className="w-[2px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                >
                  {index + 1}
                </TableColumn>
                <TableColumn
                  scope="col"
                  className="min-w-[56px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                >
                  <img
                    className="max-h-[50px] cursor-pointer"
                    src={car.image_small}
                    alt="Car image"
                  />
                </TableColumn>
                <TableColumn
                  scope="col"
                  className="min-w-[180px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                >
                  {car.carMakerName} {car.carModelName} {car.year}
                </TableColumn>
                <TableColumn
                  scope="col"
                  className="min-w-[130px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                >
                  Lot: {car.lotnumber} <br /> Vin: {car.vin}
                </TableColumn>
                <TableColumn
                  scope="col"
                  className="min-w-[160px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                >
                  {car.auction_location_name} <br /> {car.aTitle} <br />
                  <FormattedMessage id="general.buyer_number" />:{' '}
                  {car.buyer_number} <br />
                </TableColumn>
                <TableColumn
                  scope="col"
                  className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                >
                  {car.port_name}
                </TableColumn>
                <TableColumn
                  scope="col"
                  className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                >
                  {car.purchasedate}
                </TableColumn>
                <TableColumn
                  scope="col"
                  className="min-w-[30px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                >
                  {car.picked_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.delivered_date}
                </TableColumn>
                <TableColumn
                  scope="col"
                  className="min-w-[60px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                >
                  {car.delivered_title === '1' || car.follow_title === '1' ? (
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
                  {car.titleDate}
                </TableColumn>
                <TableColumn
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
                  <br />
                  <br />
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.loaded_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.booking_number}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.container_number}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.shipping_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.arrival_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.receive_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.total_price}
                </TableColumn>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { ArrivedStoreCars };
