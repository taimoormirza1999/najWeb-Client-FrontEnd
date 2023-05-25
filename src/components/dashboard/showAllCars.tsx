import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { Fragment, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import NProgress from 'nprogress';
import axios from 'axios';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';

const ShowAllCars = ({
  carsRecords,
  totalRecords,
  page = 0,
  limit,
  search = '',
}) => {
  const carTableHeader = [
    'page.customer.dashboard.table.no',
    'page.customer.dashboard.table.auction_photo',
    'page.customer.dashboard.table.images',
    'page.customer.dashboard.table.detail',
    'page.customer.dashboard.table.lot_vin',
    'page.customer.dashboard.table.auction',
    'page.customer.dashboard.table.destination',
    'page.customer.dashboard.table.purchase_date',
    'page.customer.dashboard.table.payment_date',
    'page.customer.dashboard.table.date_pick',
    'page.customer.dashboard.table.arrived',
    'page.customer.dashboard.table.title',
    'page.customer.dashboard.table.key',
    'page.customer.dashboard.table.loaded_date',
    'page.customer.dashboard.table.booking',
    'page.customer.dashboard.table.container',
    'page.customer.dashboard.table.etd',
    'page.customer.dashboard.table.shipping_date',
    'page.customer.dashboard.table.eta',
  ];
  console.log(carsRecords)
  const router = useRouter();
  const region = router.query.region ? router.query.region : '';
  const paginationUrl = `/customer/dashboard?tab=showAllCars&search=${search}&region=${region}&limit=${limit}&page=`;

  const limitUrl = `/customer/dashboard?tab=showAllCars&page=`;
  const [images, setImages] = useState([]);
  const [carId, setCarId] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  
  const [isShownWarehouse, setIsShownWarehouse] = useState(false);
  const [isShownLoading, setIsShownLoading] = useState(false);
  const [isShownStoring, setIsShownStoring] = useState(false);
  const GetWarehouseImages = async (car_id) => {

    NProgress.start();
    setDownloading(false);
    const res = await axios.get(
      `/api/customer/images?type=warehouse&car_id=${car_id}`
    );

    const imdatas = res.data.data;
    const imdata = imdatas.map((im) => ({
      src: im
    }));
    setImages(imdata)
    setCarId(car_id);
    NProgress.done();
    setRedirectModalOpen(true);
  };
  const GetLoadingImages = async (car_id) => {
    NProgress.start();
    setDownloading(false);
    const res = await axios.get(
      `/api/customer/images?type=loading&car_id=${car_id}`
    );

    const imdatas = res.data.data;
    const imdata = imdatas.map((im) => ({
      src: im
    }));
    setImages(imdata)
    setCarId(car_id);
    NProgress.done();
    setRedirectModalOpen(true);
  };
  const GetStoringImages = async (car_id) => {
    NProgress.start();
    setDownloading(false);
    const res = await axios.get(
      `/api/customer/images?type=store&car_id=${car_id}`
    );

    const imdatas = res.data.data;
    const imdata = res.data.data ? imdatas.map((im) => ({
      src: im
    })) : [];
    // const imdata = imdatas.map((im) => ({
    //   src: im
    // }));
    setImages(imdata)
    setCarId(car_id);
    NProgress.done();
    setRedirectModalOpen(true);
  };
  return (
    <div className="" id="tabs-allcars" role="tabpanel">
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
                
              <Carousel images={images} style={{ height: '30vw', width: '100%' }} canAutoPlay="true" autoPlayInterval="2000" isAutoPlaying="true"/>
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
                
              <Carousel images={images} style={{ height: '30vw', width: '100%' }} canAutoPlay="true" autoPlayInterval="2000" isAutoPlaying="true"/>
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
      <div className="pt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-3xl font-semibold">
              <FormattedMessage id="page.customer.dashboard.allcars" />
            </h1>
          </div>
        </div>
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} search={search} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                          <FormattedMessage id={th} />
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
                                  GetWarehouseImages(car.car_id);
                                }}
                                onMouseEnter={() => setIsShownWarehouse(true)}
                                onMouseLeave={() => setIsShownWarehouse(false)}
                              />
                              {isShownWarehouse && (
                                <div className="hover-icon-show-all">
                                  Warehouse
                                </div>
                              )}
                            </div>
                            <div className="three-icons">
                            <img
                                src="/assets/images/loading.png"
                                alt="banner"
                                onClick={() => {
                                  GetLoadingImages(car.car_id);
                                }}
                                onMouseEnter={() => setIsShownLoading(true)}
                                onMouseLeave={() => setIsShownLoading(false)}
                              />
                              {isShownLoading && (
                                <div className="hover-icon-show-all">
                                  Loading
                                </div>
                              )}
                            </div>
                            <div className="three-icons">
                            <img
                                src="/assets/images/Arrival_pics.png"
                                alt="banner"
                                onClick={() => {
                                  GetStoringImages(car.car_id);
                                }}
                                onMouseEnter={() => setIsShownStoring(true)}
                                onMouseLeave={() => setIsShownStoring(false)}
                              />
                              {isShownStoring && (
                                <div className="hover-icon-show-all">
                                  Storing
                                </div>
                              )}
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
                          {car.loaded_date}
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
