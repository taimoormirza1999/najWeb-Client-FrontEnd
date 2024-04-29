import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import InputModal from '@/components/modals/InputModal';
import { classNames } from '@/utils/Functions';
import { postData } from '@/utils/network';

import ImagesViewer from '../cars/ImagesViewer';
import CustomModal from '../customModal';
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
  const { data: session } = useSession();
  const intl = useIntl();
  const allowArrivedToPort = session?.profile[0]?.allow_arrived_to_port === '1';
  const [carsArray, setCarsArray] = useState(carsRecords);
  const [arrivedPortModalOpen, setArrivedPortModalOpen] = useState(false);
  const [arrivedPortModalSuccess, setArrivedPortModalSuccess] = useState(false);
  const [arrivedPortModalError, setArrivedPortModalError] = useState(false);
  const arrivedPortCancelButtonRef = useRef(null);
  const selectedCar = useRef(0);
  const [inputValue, setInputValue] = useState({
    message: '',
  });

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
    {
      header: 'page.customer.dashboard.table.tracking',
    },
  ];

  if (allowArrivedToPort) {
    carTableHeader.push({
      header: 'page.customer.dashboard.table.arrived_to_port',
    });
  }

  const paginationUrl = `/customer/dashboard?tab=showAllCars&search=${search}&limit=${limit}&order=${order}`;
  const limitUrl = `/customer/dashboard?tab=showAllCars&order=${order}&page=`;

  useEffect(() => {
    setCarsArray(carsRecords);
  }, [carsRecords]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      car_id: selectedCar.current,
      message: event.target.message.value,
    };

    const apiURL = '/api/cars/arrivedToPort/';

    const response = await postData(apiURL, formData);

    if (response.success === true) {
      setArrivedPortModalSuccess(true);
      setArrivedPortModalError(false);

      setCarsArray(
        carsArray.filter((row) => {
          return row.car_id !== selectedCar.current;
        })
      );

      setInputValue(() => ({
        message: '',
      }));
      selectedCar.current = 0;
    } else if (arrivedPortModalOpen) {
      setArrivedPortModalError(true);
      setArrivedPortModalSuccess(false);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div className="" id="tabs-allcars" role="tabpanel">
      <CustomModal
        showOn={arrivedPortModalOpen}
        initialFocus={arrivedPortCancelButtonRef}
        onClose={() => {
          setArrivedPortModalOpen(false);
        }}
      >
        <div className="text-dark-blue">
          <Dialog.Title
            as="h6"
            className="mb-8 text-xl font-bold leading-6 md:text-xl lg:text-2xl"
          >
            <FormattedMessage id="page.customer.dashboard.table.arrived_to_port" />
          </Dialog.Title>
          <div className="mt-4">
            <form method="post" onSubmit={handleSubmit} className="mt-8 mb-4">
              {arrivedPortModalSuccess === true ? (
                <div className="text-center">
                  <i className="material-icons text-yellow-orange mb-4 text-6xl">
                    &#xe2e6;
                  </i>
                  <div className="mt-2">
                    <p className="mb-4 py-6 text-xl">
                      <FormattedMessage id="messages.updated_successfully" />
                    </p>
                  </div>
                </div>
              ) : null}

              {arrivedPortModalError === true ? (
                <div className="text-center">
                  <i className="material-icons mb-4 text-6xl text-red-800">
                    &#xe160;
                  </i>
                  <div className="mt-2">
                    <p className="mb-4 py-6 text-xl">
                      <FormattedMessage id="general.technicalErr" />
                    </p>
                  </div>
                </div>
              ) : null}

              {arrivedPortModalSuccess === false &&
              arrivedPortModalError === false ? (
                <div>
                  <div className="relative mt-1 ltr:pl-6 rtl:pr-6">
                    <textarea
                      rows={3}
                      required={true}
                      className="text-outer-space border-medium-grey w-full resize-none rounded border text-lg focus:border-blue-800 focus:ring-0 ltr:placeholder:italic"
                      name="message"
                      placeholder={intl.formatMessage({
                        id: 'messages.message',
                      })}
                      value={inputValue.message}
                      onChange={handleChange}
                    ></textarea>
                    <span className="text-yellow-orange absolute top-0 text-xl font-bold ltr:left-0 rtl:right-0">
                      *
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="border-azure-blue bg-azure-blue hover:bg-dark-blue mx-auto my-6 flex justify-center rounded border-2 py-2 px-8 text-xl font-semibold text-white shadow-sm"
                  >
                    {<FormattedMessage id="general.submit" />}
                  </button>
                </div>
              ) : null}
            </form>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-2 py-1  text-sm md:px-4 md:py-2 lg:text-lg"
            onClick={() => {
              setArrivedPortModalOpen(false);
            }}
            ref={arrivedPortCancelButtonRef}
          >
            <FormattedMessage id="general.close" />
          </button>
        </div>
      </CustomModal>
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
                    {carsArray.map((car, index) => {
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
                            Lot: {car.lotnumber} <br /> Vin: {car.vin} <br />
                            {car.port_receiver_customer_name > '' && (
                              <>
                                <FormattedMessage id="port.receiver_name" />
                                {': '}
                                {car.port_receiver_customer_name}
                              </>
                            )}
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
                                  await changeReceiverName(car.carId, value);
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
                          <TableColumn scope="col" className="">
                            {car.tracking_stage}
                          </TableColumn>
                          {allowArrivedToPort ? (
                            <TableColumn scope="col" className="min-w-[47px]">
                              {car.isUAEPort === '0' &&
                              car.tracking_stage === 'Shipping' ? (
                                <button
                                  type="button"
                                  className="border-azure-blue text-azure-blue inline-block max-w-max rounded-md border-2 px-2 py-1  text-sm"
                                  onClick={() => {
                                    setArrivedPortModalSuccess(false);
                                    setArrivedPortModalError(false);
                                    setArrivedPortModalOpen(true);
                                    selectedCar.current = car.car_id;
                                  }}
                                >
                                  <CheckCircleIcon className="h-4 w-4 text-green-400" />
                                  <FormattedMessage id="page.customer.dashboard.table.arrive" />
                                </button>
                              ) : null}
                            </TableColumn>
                          ) : null}
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
