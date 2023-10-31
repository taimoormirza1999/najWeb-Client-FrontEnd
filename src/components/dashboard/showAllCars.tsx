import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import InputModal from '@/components/modals/InputModal';
import { classNames } from '@/utils/Functions';

import ImagesViewer from '../cars/ImagesViewer';
import NotesButtonModal from '../NotesButtonModal';
import TableColumn from '../TableColumn';
import TableHeader from '../TableHeader';
import TableHeadText from '../TableHeadText';

export const changeReceiverName = async (car_id, value) => {
  try {
    const response = await fetch('/api/cars/changeReceiverName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ car_id, receiverName: value }),
    });

    await response.json();
    if (!response.ok) {
      toast.error('Failed to change the receiver name 500.');
    }
    toast.success('The receiver name has been changed successfully.');
  } catch (error) {
    toast.error('Failed to change the receiver name 404.');
  }
};

const ShowAllCars = ({
  carsRecords,
  totalRecords,
  page = 0,
  limit,
  search = '',
  order = '',
}) => {
  const carTableHeader = [
    {
      header: 'page.customer.dashboard.table.no',
    },
    {
      header: 'page.customer.dashboard.table.auction_photo',
    },
    {
      header: 'page.customer.dashboard.table.images',
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
      header: 'page.customer.dashboard.table.region',
      order: 'region_name',
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
      header: 'auction_price',
    },
    {
      header: 'auction_invoice',
    },
    {
      header: 'page.customer.dashboard.table.payment_date',
      order: 'paymentDate',
    },
    {
      header: 'page.customer.dashboard.table.date_pick',
      order: 'picked_date',
    },
    {
      header: 'picked_car_title_note',
    },
    {
      header: 'page.customer.dashboard.table.arrived',
      order: 'delivered_date',
    },
    {
      header: 'page.customer.dashboard.table.title',
      order: 'delivered_title',
    },
    {
      header: 'page.customer.dashboard.table.title_note',
    },
    {
      header: 'page.customer.dashboard.table.title_date',
      order: 'title_date',
    },
    {
      header: 'page.customer.dashboard.table.key',
      order: 'delivered_car_key',
    },
    {
      header: 'point_of_loading',
    },
    {
      header: 'page.customer.dashboard.table.loaded_date',
      order: 'loaded_date',
    },
    {
      header: 'dock_receipt',
    },
    {
      header: 'page.customer.dashboard.table.booking',
      order: 'booking_number',
    },
    {
      header: 'page.customer.dashboard.table.container',
      order: 'container_number',
    },
    {
      header: 'page.customer.dashboard.table.etd',
      order: 'etd',
    },
    {
      header: 'page.customer.dashboard.table.shipping_date',
      order: 'shipping_date',
    },
    {
      header: 'page.customer.dashboard.table.eta',
      order: 'eta',
    },
    {
      header: 'page.customer.dashboard.table.date_arrived_store',
    },
    {
      header: 'page.customer.dashboard.paid',
    },
    {
      header: 'sold',
    },
  ];

  const paginationUrl = `/customer/dashboard?tab=showAllCars&search=${search}&limit=${limit}&order=${order}`;
  const limitUrl = `/customer/dashboard?tab=showAllCars&order=${order}&page=`;

  return (
    <div className="" id="tabs-allcars" role="tabpanel">
      <div>
        <TableHeadText id={'page.customer.dashboard.allcars'} />
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="table_top_div flex flex-col">
                <table className="all_tables min-w-full divide-y divide-gray-300">
                  <TableHeader tableHeader={carTableHeader} order={order} />
                  <tbody>
                    {carsRecords.map((car, index) => {
                      return (
                        <tr
                          key={index}
                          className={classNames(
                            index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                            'text-sm'
                          )}
                        >
                          <TableColumn scope="col" className="w-[2px]">
                            {isNaN(page * limit)
                              ? index + 1
                              : page * limit + index + 1}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[56px]">
                            <ImagesViewer
                              loading={false}
                              warehouse={true}
                              store={false}
                              car_id={car.car_id}
                              single_image={car.image}
                              // container_no={row.container_number}
                            />
                          </TableColumn>

                          <TableColumn scope="col" className="min-w-[50px]">
                            <ImagesViewer
                              loading={true}
                              warehouse={true}
                              store={true}
                              car_id={car.car_id}
                              // show_image={true}
                              // container_no={row.container_number}
                            />
                          </TableColumn>

                          <TableColumn scope="col" className="min-w-[180px]">
                            {car.carMakerName} {car.carModelName} {car.year}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[135px]">
                            Lot: {car.lotnumber} <br /> Vin: {car.vin}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[200px]">
                            {car.auction_location_name}
                            &nbsp;|&nbsp;
                            {car.aTitle} <br />
                            <FormattedMessage id="general.buyer_number" />:{' '}
                            {car.buyer_number}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[64px]">
                            {car.region_name}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[64px]">
                            {car.port_name}
                            {car.showReceiverChange && (
                              <InputModal
                                title={'changeReceiveMsg'}
                                buttonTitle={'changeReceiver'}
                                extraInfo={car.vin}
                                onSubmit={async (value) => {
                                  await changeReceiverName(car.car_id, value);
                                }}
                              />
                            )}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[55px]">
                            {car.purchasedate}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[64px]">
                            {car.carcost > 0 && `${car.carcost}$`}{' '}
                          </TableColumn>
                          <TableColumn
                            scope="col"
                            className="min-w-[45px] text-center"
                          >
                            {car.invoice_file_auction ? (
                              <a
                                className="text-medium-grey hover:border-0"
                                href={car.invoice_file_auction}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <FontAwesomeIcon
                                  icon={faFilePdf}
                                  className="text-teal-blue text-2xl"
                                />
                              </a>
                            ) : (
                              <span> N A</span>
                            )}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[55px]">
                            {car.paymentDate}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[70px]">
                            {car.picked_date}
                          </TableColumn>

                          <TableColumn
                            // scope="col"
                            className="min-w-[65px] text-center"
                          >
                            <NotesButtonModal
                              note={car.picked_car_title_note}
                              title={'Pick Up Note'}
                            />
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[47px]">
                            {car.delivered_date}
                          </TableColumn>
                          <TableColumn
                            // scope="col"
                            className="min-w-[30px]"
                          >
                            {car.delivered_title === '1' ? (
                              <CheckCircleIcon
                                className="ml-[30%] h-6 w-6 text-green-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <XCircleIcon
                                className="ml-[30%] h-6 w-6 text-red-400"
                                aria-hidden="true"
                              />
                            )}
                          </TableColumn>
                          <TableColumn
                            // scope="col"
                            className="min-w-[65px] text-center"
                          >
                            <NotesButtonModal
                              note={car.follow_car_title_note}
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
                          <TableColumn scope="col" className="min-w-[30px]">
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
                          <TableColumn scope="col" className="min-w-[80px]">
                            {car.departurePort}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[47px]">
                            {car.loaded_date}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[47px]">
                            {car.file_name && (
                              <a
                                className="text-medium-grey hover:border-0"
                                href={car.file_name}
                              >
                                <FontAwesomeIcon
                                  icon={faFilePdf}
                                  className="text-teal-blue text-2xl"
                                />
                              </a>
                            )}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[47px]">
                            {car.booking_number}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[47px]">
                            {car.container_number}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[65px]">
                            {car.etd}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[65px]">
                            {car.shipping_date}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[65px]">
                            {car.eta}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[65px]">
                            {car.receive_date}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[45px]">
                            {car.final_payment_status === 'Paid' ? (
                              <CheckCircleIcon
                                className="ml-[20%] h-6 w-6 text-green-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <XCircleIcon
                                className="ml-[20%] h-6 w-6 text-red-400"
                                aria-hidden="true"
                              />
                            )}
                          </TableColumn>
                          <TableColumn scope="col" className="min-w-[45px]">
                            {car.sold === 'Sold' ? (
                              <CheckCircleIcon
                                className="ml-[20%] h-6 w-6 text-green-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <XCircleIcon
                                className="ml-[20%] h-6 w-6 text-red-400"
                                aria-hidden="true"
                              />
                            )}
                          </TableColumn>
                        </tr>
                      );
                    })}
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

export { ShowAllCars };
