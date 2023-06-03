import 'react-gallery-carousel/dist/index.css';

import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import NProgress from 'nprogress';
import React, { Fragment, useRef, useState } from 'react';
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
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useState(false);
  const [images, setImages] = useState([]);
  const [carId, setCarId] = useState('');
  const cancelButtonRef = useRef(null);
  const paginationUrl = `/customer/dashboard?tab=tabs-warehouse&search=${search}&limit=${limit}`;
  const limitUrl = `/customer/dashboard?tab=tabs-warehouse&page=`;
  const [downloading, setDownloading] = useState(false);
  const GetImages = async (car_id) => {
    NProgress.start();
    setDownloading(false);
    const res = await axios.get(
      `/api/customer/images?type=warehouse&car_id=${car_id}`
    );
    const imdatas = res.data.data;
    const imdata = res.data.data
      ? imdatas.map((im) => ({
          src: im,
        }))
      : [];
    setImages(imdata);
    setCarId(car_id);
    NProgress.done();
    setRedirectModalOpen(true);
  };
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;

  return (
    <div className="" id="tabs-warehousecar" role="tabpanel">
      <CustomModal
        showOn={openNote}
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpenNote(false);
        }}
      >
        <div className="text-dark-blue text-center ">
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
                  canAutoPlay={true}
                  autoPlayInterval={2000}
                  isAutoPlaying={true}
                />

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
      <div className="">
        {/* <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-3xl font-semibold">
              <FormattedMessage id="page.customer.dashboard.at_warehouse" />
            </h1>
          </div>
        </div> */}
        <TableHeadText id={'page.customer.dashboard.allcars'} />
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {/* <div className="overflow-hidden"> */}
              <div className="table_top_div flex flex-col">
                <table className="all_tables min-w-full divide-y divide-gray-300">
                  {/* <thead className="bg-white">
                    <tr>
                      {carTableHeader.map((th, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-3 py-3.5 text-left text-base font-semibold text-blue-600 border-dark-blue border-[1px]"
                        >
                          <FormattedMessage id={th.name} />
                        </th>
                      ))}
                    </tr>
                  </thead> */}

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
                          <img
                            className="table_auction_img cursor-pointer"
                            src={car.image}
                            alt=""
                            onClick={() => {
                              GetImages(car.carId);
                            }}
                          />
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[180px] ">
                          {car.carMakerName} {car.carModelName} {car.year}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[130px] ">
                          Lot: {car.lotnumber} <br /> Vin: {car.vin}
                        </TableColumn>
                        {/* <TableColumn
                          scope="col"
                          className="min-w-[160px] "
                        >
                          <span className="text-[#810808]">{car.region}</span>{' '}
                          {car.auctionLocationName} <br /> {car.auctionTitle}{' '}
                          <br />
                          <FormattedMessage id="general.buyer_number" />:{' '}
                          {car.buyer_number} <br />
                          {car.region}
                        </TableColumn> */}

                        <TableColumn scope="col" className="min-w-[120px] ">
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
                        <TableColumn scope="col" className="min-w-[30px] ">
                          {car.pickedDate}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[47px]">
                          {car.arrivedDate}
                        </TableColumn>
                        {/* <TableColumn scope="col" className="min-w-[60px] ">
                          <button
                            type="button"
                            onClick={() => {
                              setNote(car.titleNote);
                              setOpenNote(true);
                            }}
                            className={classNames(
                              !car.follow_car_title_note ? 'hidden' : '',
                              'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            )}
                          >
                            Notes
                          </button>
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
                          <br />
                          {car.titleDate}
                        </TableColumn> */}

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
                          className="min-w-[60px] text-center"
                        >
                          {car.titleNote === '-' || !car.titleNote ? (
                            <span>N A</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setNote(car.titleNote);
                                setOpenNote(true);
                              }}
                              className={classNames(
                                !car.titleNote ? 'hidden' : '',
                                'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                              )}
                            >
                              Notes
                            </button>
                          )}
                          {/* {car.titleDate} */}
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
