import 'react-gallery-carousel/dist/index.css';

import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Tab, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Link from "next/link";
import NProgress from 'nprogress';
import React, { Fragment, useRef, useState } from 'react';
import Carousel from 'react-gallery-carousel';
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
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useState('');
  const [images, setImages] = useState([]);
  const paginationUrl = `/customer/dashboard?tab=tabs-shipping&search=${search}&limit=${limit}`;
  const limitUrl = `/customer/dashboard?tab=tabs-shipping&page=`;
  const cancelButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [carId, setCarId] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [imageType, setImageType] = useState('shipping');
  const GetImages = async (car_id, type) => {
    setImageType(type);
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

    // setImages(res.data.data ? res.data.data : []);
    setCarId(car_id);
    NProgress.done();
    setRedirectModalOpen(true);
  };
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;
  return (
    <div className="" id="tabs-shipping" role="tabpanel">
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
                <div>
                  <div className="text-dark-blue mt-6 text-center sm:mt-16">
                    <Dialog.Title
                      as="h3"
                      className="text-5xl font-bold leading-6"
                    ></Dialog.Title>
                    <div className="mt-2">
                      <Carousel
                        images={images}
                        style={{
                          height: '30vw',
                          width: '100%',
                          objectFit: 'cover',
                        }}
                        canAutoPlay={true}
                        autoPlayInterval={2000}
                        isAutoPlaying={true}
                      />

                      {/* <SRLWrapper>
                        {images && (
                          <div className="flex basis-1/2 flex-col gap-4">
                            <img
                              src={images[0]}
                              alt=""
                              className="basis-2/3 cursor-pointer object-cover"
                            />
                            <div className="flex basis-1/3 flex-wrap justify-between">
                              {images.map((image, index) => {
                                return (
                                  <img
                                    key={index}
                                    src={image}
                                    className="h-[150px] cursor-pointer"
                                    alt=""
                                  />
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </SRLWrapper> */}
                      <Tab.Group as="div" className="flex flex-col-reverse">
                        {/* Image selector */}
                        {/* <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                          <Tab.List className="grid grid-cols-4 gap-6">
                            {images.map((image, index) => (
                              <Tab
                                key={index}
                                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                              >
                                {({ selected }) => (
                                  <>
                                    <span className="sr-only"></span>
                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                                      <img
                                        src={image}
                                        alt=""
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </span>
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'ring-indigo-500'
                                          : 'ring-transparent',
                                        'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                      )}
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </Tab>
                            ))}
                          </Tab.List>
                        </div> */}

                        {/* <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                          {images.map((image, index) => (
                            <Tab.Panel key={index}>
                              <img
                                src={image}
                                alt=""
                                className="h-full w-full object-cover object-center sm:rounded-lg"
                              />
                            </Tab.Panel>
                          ))}
                        </Tab.Panels> */}
                      </Tab.Group>
                      <button
                        disabled={downloading}
                        // href={`/api/customer/downloadimages/?type=warehouse&car_id=${carId}`}
                        onClick={() => {
                          const url = `${process.env.NEXT_PUBLIC_API_URL}getDownloadableImages?type=${imageType}&car_id=${carId}`;
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
      <div>
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
                        <TableColumn scope="col" className="w-[2px]">
                          {addIndex + index + 1}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[56px]">
                          <img
                            className="table_auction_img"
                            src={car.image}
                            alt=""
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
                        <TableColumn scope="col" className="min-w-[70px]">
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
                          {car.follow_car_title_note === '-' ||
                          !car.follow_car_title_note ? (
                            <span>N A</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setNote(car.follow_car_title_note);
                                setOpenNote(true);
                                contentRef?.current?.classList.add('blur-sm');
                              }}
                              className={classNames(
                                'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                              )}
                            >
                              Notes
                            </button>
                          )}
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
                          <i
                            className="material-icons cursor-pointer text-3xl"
                            onClick={() => {
                              GetImages(car.carId, 'loading');
                            }}
                          >
                            &#xe3f4;
                          </i>
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
                          <i
                            className="material-icons cursor-pointer text-3xl ltr:mr-2 rtl:ml-2"
                            onClick={() => {
                              GetImages(car.carId, 'shipping');
                            }}
                          >
                            &#xe3f4;
                          </i>
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[80px]">
                          {car.eta}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className=""
                        >
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
