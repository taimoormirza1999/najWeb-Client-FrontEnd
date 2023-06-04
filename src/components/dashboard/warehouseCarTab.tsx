import 'react-gallery-carousel/dist/index.css';

import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';

import ImagesViewer from '../cars/ImagesViewer';
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
];
const WarehouseCarTab = ({
  carsRecords,
  totalRecords,
  page = 0,
  limit,
  search = '',
}) => {
  const paginationUrl = `/customer/dashboard?tab=tabs-warehouse&search=${search}&limit=${limit}`;
  const limitUrl = `/customer/dashboard?tab=tabs-warehouse&page=`;
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;

  return (
    <div className="" id="tabs-warehousecar" role="tabpanel">
      <div className="">
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
                        <TableColumn scope="col" className="w-[2px] ">
                          {addIndex + index + 1}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[56px] ">
                          <ImagesViewer
                            loading={false}
                            warehouse={true}
                            store={false}
                            car_id={car.carId}
                            single_image={car.image}
                            // container_no={row.container_number}
                          />
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[180px] ">
                          {car.carMakerName} {car.carModelName} {car.year}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[130px] ">
                          Lot: {car.lotnumber} <br /> Vin: {car.vin}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[180px] ">
                          {car.auctionLocationName} <br /> {car.auctionTitle}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[154px] ">
                          <FormattedMessage id="general.buyer_number" />:{' '}
                          {car.buyer_number}{' '}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[64px] ">
                          {car.region}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[64px] ">
                          {car.portName}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[55px] ">
                          {car.purchasedDate}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[50px] ">
                          {car.paymentDate}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[64px] ">
                          {car.pickedDate}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="min-w-[30px] text-center"
                        >
                          <NotesButtonModal
                            note={car.picked_car_title_note}
                            title={'Pick Up Note'}
                          />
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[47px]">
                          {car.arrivedDate}
                        </TableColumn>
                        <TableColumn className="min-w-[30px]">
                          {car.deliveredTitle === '1' ||
                          car.followTitle === '1' ? (
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
                          className="min-w-[30px] text-center"
                        >
                          <NotesButtonModal
                            note={car.titleNote}
                            title={'Title Note'}
                          />
                        </TableColumn>
                        <TableColumn
                          // scope="col"
                          className="min-w-[62px] text-center"
                        >
                          {car.titleDate ? (
                            <span>{car.titleDate}</span>
                          ) : (
                            <span>N A</span>
                          )}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[30px] ">
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

export { WarehouseCarTab };
