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
];

const ArrivedPortCars = ({ cars }) => {
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
                <TableColumn scope="col" className="w-[2px]">
                  {index + 1}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[56px]">
                  <img className="max-h-[50px]" src={car.image} alt="" />
                </TableColumn>
                <TableColumn scope="col" className="min-w-[180px]">
                  {car.carMakerName} {car.carModelName} {car.year}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[130px]">
                  Lot: {car.lotnumber} <br /> Vin: {car.vin}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[160px]">
                  {car.auctionLocationName} <br /> {car.auctionTitle} <br />
                  <FormattedMessage id="general.buyer_number" />:{' '}
                  {car.buyer_number} <br />
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {car.portName}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[55px]">
                  {car.purchasedDate}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[30px]">
                  {car.pickedDate}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.arrivedDate}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[60px]">
                  {car.deliveredTitle === '1' ? (
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
                </TableColumn>
                <TableColumn scope="col" className="min-w-[63px]">
                  {car.deliveredKey === '1' ? (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { ArrivedPortCars };
