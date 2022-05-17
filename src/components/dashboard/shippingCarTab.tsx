import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import React from 'react';

import { Pagination } from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';

const carTableHeader = [
  { name: 'No' },
  { name: 'Auction Photo' },
  { name: 'Detail' },
  { name: 'Lot & Vin' },
  { name: 'Auction' },
  { name: 'Destination' },
  { name: 'Purchase Date' },
  { name: 'Payment Date' },
  { name: 'Picked Date' },
  { name: 'Arrived Date' },
  { name: 'Title' },
  { name: 'Key' },
  { name: 'Loaded Date' },
  { name: 'Booking' },
  { name: 'Container' },
  { name: 'ETD' },
  { name: 'Shipping Date' },
  { name: 'ETA' },
];

const ShippingCarTab = ({ carsRecords, totalRecords, baseUrl, page = 0 }) => {
  const paginationUrl = `${baseUrl}/customer/dashboard?tab=tabs-shipping&page=`;
  return (
    <div className="" id="tabs-shipping" role="tabpanel">
      <div className="pt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-2xl font-semibold">
              In Shipping
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
                      {carTableHeader.map((th) => (
                        <th
                          key={th.name}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-blue-600 sm:text-xl"
                        >
                          {th.name}
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
                          className="w-[2px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {index + 1}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[56px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          <img src={car.image} alt="" />
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
                        </td>
                        <td
                          scope="col"
                          className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.destination}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.purchasedate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.paymentDate}
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
                          {car.etd}
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
                          {car.eta}
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
        ></Pagination>
      </div>
    </div>
  );
};

export { ShippingCarTab };
