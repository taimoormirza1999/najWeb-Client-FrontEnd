import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import React from 'react';

import { classNames } from '@/utils/Functions';

import SingleImagesViewer from '../common/SingleImagesViewer';
import TableColumn from '../TableColumn';
import TableHeader from '../TableHeader';

const carTableHeader = [
  { name: 'page.customer.dashboard.table.no' },
  {
    name: 'page.customer.dashboard.table.auction_photo',
  },
  {
    name: 'page.customer.dashboard.table.detail',
  },
  {
    name: 'page.customer.dashboard.table.lot_vin',
  },
  {
    name: 'page.customer.dashboard.table.auction',
  },
  {
    name: 'page.customer.dashboard.table.destination',
  },
  {
    name: 'page.customer.dashboard.table.purchase_date',
  },
  {
    name: 'page.customer.dashboard.table.payment_date',
  },
  {
    name: 'page.customer.dashboard.table.date_pick',
  },
  {
    name: 'page.customer.dashboard.table.arrived',
  },
  {
    name: 'page.customer.dashboard.table.title',
  },
  {
    name: 'page.customer.dashboard.table.title_date',
  },
  {
    name: 'page.customer.dashboard.table.key',
  },
  {
    name: 'page.customer.dashboard.table.etd',
  },
  {
    name: 'page.customer.dashboard.table.shipping_date',
  },
  {
    name: 'page.customer.dashboard.table.eta',
  },
];

const InShippingCars = ({ cars }) => {
  return (
    <div className="pt-3">
      <div className="table_top_div flex max-h-[50vh] flex-col">
        <table className="all_tables min-w-full divide-y divide-gray-300">
          {/* <thead className="bg-white">
            <tr>
              {carTableHeader.map((th, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-3 py-3.5 text-left text-base font-semibold text-blue-600"
                >
                  <FormattedMessage id={th.name} />
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
                    src={car.image}
                    alt=""
                  />  */}
                  <SingleImagesViewer src={car.image} title={'Container Car'} />
                </TableColumn>
                <TableColumn scope="col" className="min-w-[180px]">
                  {car.carMakerName} {car.carModelName} {car.year}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[130px]">
                  Lot: {car.lotnumber} <br /> Vin: {car.vin}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[160px]">
                  {car.auction_location_name} <br /> {car.auctionTitle}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[64px]">
                  {car.destination}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[55px]">
                  {car.purchasedate}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[50px]">
                  {car.paymentDate}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[30px]">
                  {car.picked_date}
                </TableColumn>
                <TableColumn
                  scope="col"
                  className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                >
                  {car.delivered_date}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[60px]">
                  {car.delivered_title === '1' || car.follow_title === '1' ? (
                    <CheckCircleIcon
                      className="ml-[25%] h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircleIcon
                      className="ml-[25%] h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  )}
                  {/* <br />
                  {car.titleDate} */}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[60px]">
                  {car.titleDate}
                </TableColumn>
                <TableColumn scope="col" className="center min-w-[63px]">
                  {car.delivered_car_key === '1' ? (
                    <CheckCircleIcon
                      className="ml-[25%] h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircleIcon
                      className="ml-[25%] h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  )}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[50px]">
                  {car.etd}
                </TableColumn>
                <TableColumn scope="col" className="min-w-[50px]">
                  {car.shipping_date} <br />
                </TableColumn>
                <TableColumn scope="col" className="min-w-[50px]">
                  {car.eta}
                </TableColumn>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { InShippingCars };
