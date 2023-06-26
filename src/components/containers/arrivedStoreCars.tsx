import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { classNames } from '@/utils/Functions';

import SingleImagesViewer from '../common/SingleImagesViewer';
import TableColumn from '../TableColumn';
import TableHeader from '../TableHeader';

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
  'page.customer.dashboard.table.title_date',
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
      <div className="overflow-x-auto">
        <table className="">
          {/* <thead className="bg-white">
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
          </thead> */}
          <TableHeader tableHeader={carTableHeader} />
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
                  {/* <img
                    className="max-h-[50px] cursor-pointer"
                    src={car.image_small}
                    alt="Car image"
                  /> */}
                  <SingleImagesViewer
                    src={car.image_small}
                    title={'Container Car'}
                  />
                </TableColumn>
                <TableColumn scope="col" className="min-w-[180px]">
                  {car.carMakerName} {car.carModelName} {car.year}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[180px]">
                  Lot: {car.lotnumber} <br /> Vin: {car.vin}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[160px]">
                  {car.auction_location_name} <br /> {car.aTitle} <br />
                  <FormattedMessage id="general.buyer_number" />:{' '}
                  {car.buyer_number} <br />
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {car.port_name}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {car.purchasedate}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {car.picked_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {car.delivered_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[45px]">
                  {car.delivered_title === '1' || car.follow_title === '1' ? (
                    <CheckCircleIcon
                      className="ml-[15%] h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircleIcon
                      className="ml-[15%] h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  )}
                  {/* {car.titleDate} */}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {/* {car.delivered_title === '1' || car.follow_title === '1' ? (
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircleIcon
                      className="h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  )} */}
                  {car.titleDate}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[45px]">
                  {car.delivered_car_key === '1' ? (
                    <CheckCircleIcon
                      className="ml-[15%] h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircleIcon
                      className="ml-[15%] h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  )}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {car.loaded_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.booking_number}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[47px]">
                  {car.container_number}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {car.shipping_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {car.arrival_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
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
