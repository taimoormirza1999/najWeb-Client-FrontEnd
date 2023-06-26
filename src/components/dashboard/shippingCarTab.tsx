import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';

import ImagesViewer from '../cars/ImagesViewer';
import SingleImagesViewer from '../common/SingleImagesViewer';
import NotesButtonModal from '../NotesButtonModal';
import TableColumn from '../TableColumn';
import TableHeader from '../TableHeader';
import TableHeadText from '../TableHeadText';

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
    header: 'page.customer.dashboard.table.buyer_number',
  },
  {
    header: 'page.customer.dashboard.table.region',
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
    name: 'picked_car_title_note',
  },
  {
    name: 'page.customer.dashboard.table.arrived',
  },
  {
    name: 'page.customer.dashboard.table.title',
  },
  {
    header: 'page.customer.dashboard.table.title_note',
  },
  {
    header: 'page.customer.dashboard.table.title_date',
    order: 'title_date',
  },
  {
    name: 'page.customer.dashboard.table.key',
  },
  {
    name: 'page.customer.dashboard.table.loaded_date',
  },
  {
    name: 'page.customer.dashboard.table.loaded_image',
  },
  {
    name: 'page.customer.dashboard.table.booking',
  },
  {
    name: 'page.customer.dashboard.table.container',
  },
  {
    name: 'page.customer.dashboard.table.etd',
  },
  {
    name: 'page.customer.dashboard.table.shipping_date',
  },
  {
    name: 'page.customer.dashboard.table.shipping_image',
  },
  {
    name: 'page.customer.dashboard.table.eta',
  },
  {
    name: 'dock_receipt',
  },
];

const ShippingCarTab = ({
  carsRecords,
  totalRecords,
  page = 0,
  limit,
  search = '',
}) => {
  const paginationUrl = `/customer/dashboard?tab=tabs-shipping&search=${search}&limit=${limit}`;
  const limitUrl = `/customer/dashboard?tab=tabs-shipping&page=`;
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;
  return (
    <div className="" id="tabs-shipping" role="tabpanel">
      <div>
        <TableHeadText id={'page.customer.dashboard.allcars'} />
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {/* <div className="overflow-hidden"> */}
              <div className="table_top_div flex flex-col">
                <table className="all_tables min-w-full divide-y divide-gray-300">
                  <TableHeader tableHeader={carTableHeader} />
                  <tbody>
                    {carsRecords.map((car, index) => (
                      <tr
                        key={index}
                        className={classNames(
                          index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                          'text-sm'
                        )}
                      >
                        <TableColumn scope="col" className="w-[2px]">
                          {addIndex + index + 1}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[56px]">
                          {/* <img
                            className="table_auction_img"
                            src={car.image}
                            alt=""
                          /> */}
                          <SingleImagesViewer
                            src={car.image}
                            title={'Shipping Car'}
                          />
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[180px]">
                          {car.carMakerName} {car.carModelName} {car.year}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[140px]">
                          Lot: {car.lotnumber} <br /> Vin: {car.vin}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[160px]">
                          {car.auction_location_name} | {car.auctionTitle}{' '}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[200px]">
                          <FormattedMessage id="general.buyer_number" />:{' '}
                          {car.buyer_number}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[80px]">
                          {car.region_name}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[120px]">
                          {car.destination}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[85px]">
                          {car.purchasedate}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {car.paymentDate}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {car.picked_date}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="min-w-[60px] text-center"
                        >
                          <NotesButtonModal
                            note={car.picked_car_title_note}
                            title={'Pick Up Note'}
                          />
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[65px]">
                          {car.delivered_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[30px]">
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
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="min-w-[60px] text-center"
                        >
                          <NotesButtonModal
                            note={car.follow_car_title_note}
                            title={'Title Note'}
                          />
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[63px]">
                          {car.titleDate}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[30px]">
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
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[75px]">
                          {car.loaded_date}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="min-w-[50px] text-center"
                        >
                          {/* <i
                            className="material-icons cursor-pointer text-3xl"
                            onClick={() => {
                              GetImages(car.carId, 'loading');
                            }}
                          >
                            &#xe3f4;
                          </i> */}

                          <ImagesViewer
                            loading={true}
                            warehouse={false}
                            store={false}
                            car_id={car.car_id}
                            // single_image={car.image}
                            // container_no={row.container_number}
                          />
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[50px]">
                          {car.booking_number}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[50px]">
                          {car.container_number}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {car.etd}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {car.shipping_date} <br />
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="min-w-[50px] text-center"
                        >
                          <ImagesViewer
                            loading={false}
                            warehouse={false}
                            store={false}
                            shipping={true}
                            car_id={car.car_id}
                            // single_image={car.image}
                            // container_no={row.container_number}
                          />
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[80px]">
                          {car.eta}
                        </TableColumn>
                        <TableColumn scope="col" className="">
                          {car.bl_file !== '' && car.bl_file !== null ? (
                            <Link passHref href={car.bl_file}>
                              <a target="_blank">
                                <FontAwesomeIcon
                                  icon={faFilePdf}
                                  className="text-teal-blue text-2xl"
                                />
                                View
                              </a>
                            </Link>
                          ) : (
                            <span>NA</span>
                          )}
                        </TableColumn>
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

export { ShippingCarTab };
