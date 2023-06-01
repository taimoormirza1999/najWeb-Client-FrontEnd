import 'react-gallery-carousel/dist/index.css';

import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import NProgress from 'nprogress';
import { Fragment, useRef, useState } from 'react';
import Carousel from 'react-gallery-carousel';
import { FormattedMessage } from 'react-intl';

import CustomModal from '@/components/customModal';
import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';

import TableColumn from '../TableColumn';
import TableHeader from '../TableHeader';

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
      header: 'docker_receipt',
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

  const cancelButtonRef = useRef(null);
  const paginationUrl = `/customer/dashboard?tab=showAllCars&search=${search}&limit=${limit}&order=${order}`;
  const limitUrl = `/customer/dashboard?tab=showAllCars&order=${order}&page=`;

  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState([]);
  const [carId, setCarId] = useState('');
  const [downloadtype, setDownloadType] = useState('');

  const [downloading, setDownloading] = useState(false);
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);

  const GetWarehouseImages = async (car_id, type) => {
    NProgress.start();
    setDownloading(false);
    const res = await axios.get(
      `/api/customer/images?type=${type}&car_id=${car_id}`
    );

    const imdatas = res.data.data;
    const imdata = imdatas.map((im) => ({
      src: im,
    }));
    setImages(imdata);
    setCarId(car_id);
    setDownloadType(type);
    NProgress.done();
    setRedirectModalOpen(true);
  };
  const GetLoadingImages = async (car_id, type) => {
    NProgress.start();
    setDownloading(false);
    const res = await axios.get(
      `/api/customer/images?type=${type}&car_id=${car_id}`
    );

    const imdatas = res.data.data;
    const imdata = imdatas.map((im) => ({
      src: im,
    }));
    setImages(imdata);
    setCarId(car_id);
    setDownloadType(type);
    NProgress.done();
    setRedirectModalOpen(true);
  };
  const GetStoringImages = async (car_id, type) => {
    NProgress.start();
    setDownloading(false);
    const res = await axios.get(
      `/api/customer/images?type=${type}&car_id=${car_id}`
    );

    const imdatas = res.data.data;
    const imdata = res.data.data
      ? imdatas.map((im) => ({
          src: im,
        }))
      : [];
    setImages(imdata);
    setCarId(car_id);
    setDownloadType(type);
    NProgress.done();
    setRedirectModalOpen(true);
  };
  return (
    <div className="" id="tabs-allcars" role="tabpanel">
      <CustomModal
        showOn={openNote}
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpenNote(false);
        }}
      >
        <div className="text-dark-blue text-center sm:mt-16">
          <div className="mt-2">
            <p className="mb-4 py-4 text-sm lg:py-6">{note}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              setOpenNote(false);
              contentRef?.current?.classList.remove('blur-sm');
            }}
            ref={cancelButtonRef}
          >
            <FormattedMessage id="general.cancel" />
          </button>
        </div>
      </CustomModal>
      <Transition.Root show={redirectModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setRedirectModalOpen}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block w-2/5 overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:p-6 sm:align-middle">
                <Carousel
                  images={images}
                  style={{ height: '30vw', width: '100%', objectFit: 'cover' }}
                  canAutoPlay="true"
                  autoPlayInterval="4000"
                  isAutoPlaying="true"
                />
                <div>
                  <div className="text-dark-blue mt-6 text-center sm:mt-16">
                    <div>
                      <button
                        disabled={downloading}
                        // href={`/api/customer/downloadimages/?type=warehouse&car_id=${carId}`}
                        onClick={() => {
                          const url = `${process.env.NEXT_PUBLIC_API_URL}getDownloadableImages?type=${downloadtype}&car_id=${carId}`;
                          // use fetch to download the zip file
                          if (window.open(url, '_parent')) {
                            setDownloading(true);
                          }
                        }}
                        className={`mt-4 ${
                          downloading ? 'bg-indigo-200' : 'bg-indigo-600'
                        } ${
                          images.length ? '' : 'hidden'
                        } inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                      >
                        {downloading
                          ? 'File will be downloaded shortly'
                          : 'Zip and Download'}
                      </button>
                      <br />
                      <small className={`${images.length ? '' : 'hidden'}`}>
                        please note that it may take a while to zip all images
                      </small>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center gap-4 sm:mt-6">
                  <button
                    type="button"
                    className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-10 py-2.5 text-2xl font-medium"
                    onClick={() => {
                      setRedirectModalOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* <Transition.Root show={redirectModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setRedirectModalOpen}>
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >

              <div className="relative inline-block w-2/5 overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:p-6 sm:align-middle">

                <Carousel images={images} style={{ height: '30vw', width: '100%', objectFit: 'cover' }} canAutoPlay="true" autoPlayInterval="2000" isAutoPlaying="true" />

                <div>
                  <div className="text-dark-blue mt-6 text-center sm:mt-16">
                    <div>
                      <button
                        disabled={downloading}
                        // href={`/api/customer/downloadimages/?type=warehouse&car_id=${carId}`}
                        onClick={() => {
                          const url = `${process.env.NEXT_PUBLIC_API_URL}getDownloadableImages?type=warehouse&car_id=${carId}`;
                          // use fetch to download the zip file
                          if (window.open(url, '_parent')) {
                            setDownloading(true);
                          }
                        }}
                        className={`mt-4 ${downloading ? 'bg-indigo-200' : 'bg-indigo-600'
                          } ${images.length ? '' : 'hidden'
                          } inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                      >
                        {downloading
                          ? 'File will be downloaded shortly'
                          : 'Zip and Download'}
                      </button>
                      <br />
                      <small className={`${images.length ? '' : 'hidden'}`}>
                        please note that it may take a while to zip all images
                      </small>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center gap-4 sm:mt-6">
                  <button
                    type="button"
                    className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-10 py-2.5 text-2xl font-medium"
                    onClick={() => {
                      setRedirectModalOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root> */}
      <div className="pt-5">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-xl font-semibold">
              <FormattedMessage id="page.customer.dashboard.allcars" />
            </h1>
          </div>
        </div>
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden ">
                <table className="mb-[5px] min-w-full divide-y divide-gray-300">
                  <TableHeader tableHeader={carTableHeader} order={order} />
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
                          {isNaN(page * limit)
                            ? index + 1
                            : page * limit + index + 1}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[56px]">
                          <img
                            className="max-h-[50px]"
                            src={car.image}
                            alt=""
                          />
                        </TableColumn>

                        <TableColumn scope="col" className="min-w-[50px]">
                          <div className="row w-[90px]">
                            <div className="three-icons">
                              <img
                                src="/assets/images/warehouseimg.png"
                                alt="banner"
                                onClick={() => {
                                  GetWarehouseImages(car.car_id, 'warehouse');
                                }}
                              />
                            </div>
                            <div className="three-icons">
                              <img
                                src="/assets/images/loading.png"
                                alt="banner"
                                onClick={() => {
                                  GetLoadingImages(car.car_id, 'loading');
                                }}
                              />
                            </div>

                            <div className="three-icons">
                              <img
                                src="/assets/images/Arrival_pics.png"
                                alt="banner"
                                onClick={() => {
                                  GetStoringImages(car.car_id, 'store');
                                }}
                              />
                            </div>
                          </div>
                        </TableColumn>

                        <TableColumn scope="col" className="min-w-[180px]">
                          {car.carMakerName} {car.carModelName} {car.year}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[135px]">
                          Lot: {car.lotnumber} <br /> Vin: {car.vin}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[180px]">
                          {/* <span className="text-[#810808]">
                            {car.region_name}
                          </span> */}
                          {/* {' '}   */}
                          {/* <br /> */}
                          {/* &nbsp;|&nbsp;  */}
                          {car.auction_location_name}
                          {/* <br />  */}
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
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[55px]">
                          {car.purchasedate}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[64px]">
                          {car.carcost > 0 && `${car.carcost}$`}{' '}
                          {/* {car.invoice_file_auction && (
                            <a
                              className="text-medium-grey hover:border-0"
                              href={car.invoice_file_auction}
                            >
                              <FontAwesomeIcon
                                icon={faFilePdf}
                                className="text-teal-blue text-2xl"
                              />
                            </a>
                          )} */}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="min-w-[45px] text-center"
                        >
                          {car.invoice_file_auction ? (
                            <a
                              className="text-medium-grey hover:border-0"
                              href={car.invoice_file_auction}
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
                        <TableColumn scope="col" className="min-w-[47px]">
                          {car.delivered_date}
                        </TableColumn>
                        <TableColumn
                          // scope="col"
                          className="min-w-[30px]"
                        >
                          {/* <button
                            type="button"
                            onClick={() => {
                              setNote(car.follow_car_title_note);
                              setOpenNote(true);
                              contentRef?.current?.classList.add('blur-sm');
                            }}
                            className={classNames(
                              !car.follow_car_title_note ? 'hidden' : '',
                              'ml-[15%] inline-flex px-1 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
                            )}
                          >
                            Notes
                          </button> */}

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
                          {/* <br /> */}
                          {/* <span>{car.titleDate}</span> */}
                        </TableColumn>
                        <TableColumn
                          // scope="col"
                          className="min-w-[45px] text-center"
                        >
                          {car.follow_car_title_note ? (
                            <button
                              type="button"
                              onClick={() => {
                                setNote(car.follow_car_title_note);
                                setOpenNote(true);
                                contentRef?.current?.classList.add('blur-sm');
                              }}
                              className={classNames(
                                !car.follow_car_title_note ? 'hidden' : '',
                                'inline-flex px-1 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
                              )}
                            >
                              Notes
                            </button>
                          ) : (
                            <span>N A</span>
                          )}
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
                          {car.follow_car_title_note ? (
                            <div className="mt-[14px]"></div>
                          ) : (
                            <></>
                          )}

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

export { ShowAllCars };
