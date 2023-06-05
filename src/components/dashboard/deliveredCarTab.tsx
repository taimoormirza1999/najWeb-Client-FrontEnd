import 'react-gallery-carousel/dist/index.css';

import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
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

const DeliveredCarTab = ({
  carsRecords,
  totalRecords,
  page = 0,
  type,
  limit,
  search = '',
}) => {
  // console.log(carsRecords);
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
      'page.customer.dashboard.table.buyer_number',
      'page.customer.dashboard.table.region',
      'page.customer.dashboard.table.destination',
      'page.customer.dashboard.table.purchase_date',
      'page.customer.dashboard.table.date_pick',
      'picked_car_title_note',
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
      'page.customer.dashboard.table.buyer_number',
      'page.customer.dashboard.table.region',
      'page.customer.dashboard.table.destination',
      'page.customer.dashboard.table.purchase_date',
      'page.customer.dashboard.table.date_pick',
      'picked_car_title_note',
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
      <div>
        <TableHeadText id={'page.customer.dashboard.delivered'} />
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="table_top_div flex max-h-[50vh] flex-col">
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
                          <Link
                            key={index}
                            href={{
                              pathname: '/customer/dashboard/',
                              query: { tab: 'tabs-arrived', type: 'store' },
                            }}
                          >
                            <img
                              className="table_auction_img"
                              src={car.image}
                              alt=""
                            />
                          </Link>
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[180px] ">
                          {car.carMakerName} {car.carModelName} {car.year}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[150px] ">
                          Lot: {car.lotnumber} <br /> Vin: {car.vin}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[150px] ">
                          {car.auction_location_name} | {car.auctionTitle}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[154px] ">
                          <FormattedMessage id="general.buyer_number" />:{' '}
                          {car.buyer_number}{' '}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[64px] ">
                          {car.region}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[90px] ">
                          {car.port_name}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[65px] ">
                          {car.purchasedate}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[65px] ">
                          {car.picked_date}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="min-w-[65px] text-center"
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

                        <TableColumn scope="col" className="min-w-[65px] ">
                          {car.titleDate}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[30px] ">
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
                        <TableColumn scope="col" className="min-w-[65px] ">
                          {car.loaded_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[50px] ">
                          {car.booking_number}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[50px] ">
                          {car.container_number}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[65px] ">
                          {car.shipping_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[85px] ">
                          {car.arrival_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[65px] ">
                          {car.receive_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[65px] ">
                          {car.deliver_create_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[50px] ">
                          {car.total_cost}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[65px] ">
                          {car.paymentDate}
                        </TableColumn>
                        {type === 'Paid' && (
                          <TableColumn scope="col" className="min-w-[50px] ">
                            {car.amount_paid}
                          </TableColumn>
                        )}
                        {type === 'Paid' && (
                          <TableColumn scope="col" className="min-w-[50px] ">
                            {car.remaining_amount}
                          </TableColumn>
                        )}
                        <TableColumn scope="col" className="min-w-[100px] ">
                          <ImagesViewer
                            loading={true}
                            warehouse={true}
                            store={true}
                            car_id={car.carId}
                            // single_image={car.image}
                            // container_no={row.container_number}
                          />
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

export { DeliveredCarTab };
