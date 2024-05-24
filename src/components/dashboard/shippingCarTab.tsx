import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';
import { postData } from '@/utils/network';

import ImagesViewer from '../cars/ImagesViewer';
import SingleImagesViewer from '../common/SingleImagesViewer';
import CustomModal from '../customModal';
import NotesButtonModal from '../NotesButtonModal';
import TableColumn from '../TableColumn';
import TableHeader from '../TableHeader';
import TableHeadText from '../TableHeadText';

const ShippingCarTab = ({
  carsRecords,
  totalRecords,
  page = 0,
  limit,
  search = '',
}) => {
  const { data: session } = useSession();
  const intl = useIntl();
  const [carsArray, setCarsArray] = useState(carsRecords);
  const paginationUrl = `/customer/dashboard?tab=tabs-shipping&search=${search}&limit=${limit}`;
  const limitUrl = `/customer/dashboard?tab=tabs-shipping&page=`;
  const [inputValue, setInputValue] = useState({
    message: '',
  });
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;
  const [arrivedPortModalOpen, setArrivedPortModalOpen] = useState(false);
  const [arrivedPortModalSuccess, setArrivedPortModalSuccess] = useState(false);
  const [arrivedPortModalError, setArrivedPortModalError] = useState(false);
  const arrivedPortCancelButtonRef = useRef(null);
  const selectedCar = useRef(0);
  useEffect(() => {
    setCarsArray(carsRecords);
  }, [carsRecords]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      car_id: selectedCar.current,
      message: event.target.message.value,
    };

    const apiURL = '/api/cars/arrivedToPort';

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
  if (session?.profile && session.profile.length > 0 && session.profile[0]?.allow_arrived_to_port  === '1') {
    carTableHeader. push({
      name: 'page.customer.dashboard.table.arrived_to_port' ,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div className="" id="tabs-shipping" role="tabpanel">
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
              {/* <div className="overflow-hidden"> */}
              <div className="table_top_div flex flex-col">
                <table className="all_tables min-w-full divide-y divide-gray-300">
                  <TableHeader tableHeader={carTableHeader} />
                  <tbody>
                    {carsArray.map((car, index) => (
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
                          Lot: {car.lotnumber} <br /> Vin: {car.vin} <br />
                          {car.port_receiver_customer_name > '' && (
                            <>
                              <FormattedMessage id="port.receiver_name" />
                              {': '}
                              {car.port_receiver_customer_name}
                            </>
                          )}
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
                        {session?.profile[0]?.allow_arrived_to_port === '1' ? (
                          <TableColumn scope="col" className="min-w-[47px]">
                            {car.isUAEPort === '0' ? (
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
