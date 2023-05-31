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
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage } from 'react-intl';

import CustomModal from '@/components/customModal';
import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { Sort } from '@/components/dashboard/sort';
import { classNames } from '@/utils/Functions'; 

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
      src: im
    }));
    setImages(imdata)
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
      src: im
    }));
    setImages(imdata)
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
    const imdata = res.data.data ? imdatas.map((im) => ({
      src: im
    })) : [];
    setImages(imdata)
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
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
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


                <Carousel images={images} style={{ height: '30vw', width: '100%', objectFit: 'cover' }} canAutoPlay="true" autoPlayInterval="2000" isAutoPlaying="true" />
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
      </Transition.Root>
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
      </Transition.Root>
      <div className="pt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-3xl font-semibold">
              <FormattedMessage id="page.customer.dashboard.allcars" />
            </h1>
          </div>
        </div>
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <ReactHTMLTableToExcel
                id="containers-xls-button"
                className="mb-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 flex gap-1 items-center"
                table="customrContainers"
                filename="customrContainers"
                sheet="tablexls"
                buttonText={
                  <>
                    <i className="material-icons text-xl">&#xef42;</i> Excel
                  </>
                }
              />
              <div className="overflow-hidden border border-[#005fb7] md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-white">
                    <tr>
                      {carTableHeader.map((th, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-3 py-3.5 text-left text-base font-semibold text-blue-600"
                        >
                          <div className="flex items-center justify-between">
                            <FormattedMessage id={th.header} />
                            <Sort
                              order={order}
                              elemOrder={th.order}
                              index={index}
                            />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {carsRecords.map((car, index) => (
                      <tr
                        key={index}
                        className={classNames(
                          index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                          'text-sm'
                        )}
                      >
                        <td
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {isNaN(page * limit)
                            ? index + 1
                            : page * limit + index + 1}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[56px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          <img
                            className="max-h-[50px]"
                            src={car.image}
                            alt=""
                          />
                        </td>

                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          <div className='row'>
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
                          <span className="text-[#810808]">
                            {car.region_name}
                          </span>{' '}
                          {car.auction_location_name} <br /> {car.aTitle}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.port_name}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.purchasedate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.carcost > 0 && `${car.carcost}$`}{' '}
                          {car.invoice_file_auction && (
                            <a
                              className="text-medium-grey hover:border-0"
                              href={car.invoice_file_auction}
                            >
                              <FontAwesomeIcon
                                icon={faFilePdf}
                                className="text-teal-blue text-2xl"
                              />
                            </a>
                          )}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
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
                          <button
                            type="button"
                            onClick={() => {
                              setNote(car.follow_car_title_note);
                              setOpenNote(true);
                              contentRef?.current?.classList.add('blur-sm');
                            }}
                            className={classNames(
                              !car.follow_car_title_note ? 'hidden' : '',
                              'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            )}
                          >
                            Notes
                          </button>
                          {car.delivered_title === '1' ? (
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
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.departurePort}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.loaded_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
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
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.booking_number}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.container_number}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.etd}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.shipping_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.eta}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.receive_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.final_payment_status}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.sold}
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
          limit={limit}
        ></Pagination>
      </div>
    </div>
  );
};

export { ShowAllCars };
