import { Dialog, Tab, Transition } from '@headlessui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import NProgress from 'nprogress';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
// import { classNames } from '@/utils/Functions';
import { postData } from '@/utils/network';

import CustomModal from '../customModal';
import { Port } from './arrived/port';
import { Store } from './arrived/store';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const ArrivedCarTab = ({
  carsRecords,
  totalRecords,
  page = 0,
  type,
  limit,
  search = '',
}) => {
  const { data: session } = useSession();

  if (!type) {
    type = 'port';
  }
  let carTableHeader;
  if (type === 'port') {
    carTableHeader = [
      'page.customer.dashboard.table.no',
      'page.customer.dashboard.table.auction_photo',
      'page.customer.dashboard.table.detail',
      'page.customer.dashboard.table.lot_vin',
      'page.customer.dashboard.table.auction',
      'page.customer.dashboard.table.destination',
      'page.customer.dashboard.table.purchase_date',
      'page.customer.dashboard.table.date_pick',
      'page.customer.dashboard.table.arrived',
      'page.customer.dashboard.table.title',
      'page.customer.dashboard.table.key',
      'page.customer.dashboard.table.loaded_date',
      'page.customer.dashboard.table.booking',
      'page.customer.dashboard.table.container',
      'page.customer.dashboard.table.shipping_date',
      'page.customer.dashboard.table.date_arrived_port',
    ];
    if (session?.profile[0]?.naj_branch === '1') {
      carTableHeader.push('page.customer.dashboard.table.arrived_to_store');
    }
  }
  if (type === 'store') {
    carTableHeader = [
      'page.customer.dashboard.table.no',
      'page.customer.dashboard.table.auction_photo',
      'page.customer.dashboard.table.detail',
      'page.customer.dashboard.table.lot_vin',
      'page.customer.dashboard.table.auction',
      'page.customer.dashboard.table.destination',
      'page.customer.dashboard.table.purchase_date',
      'page.customer.dashboard.table.date_pick',
      'page.customer.dashboard.table.arrived',
      'page.customer.dashboard.table.title',
      'page.customer.dashboard.table.key',
      'page.customer.dashboard.table.loaded_date',
      'page.customer.dashboard.table.booking',
      'page.customer.dashboard.table.container',
      'page.customer.dashboard.table.shipping_date',
      'page.customer.dashboard.table.date_arrived_port',
      'page.customer.dashboard.table.date_arrived_store',
      'page.customer.dashboard.table.Total',
    ];
    if (session?.profile[0]?.naj_branch === '1') {
      carTableHeader.push(
        'page.customer.dashboard.table.delivered_to_customer'
      );
    }
  }
  const intl = useIntl();
  const [carsArray, setCarsArray] = useState(carsRecords);
  const selectedCar = useRef(0);
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [carId, setCarId] = useState('');
  const cancelButtonRef = useRef(null);

  const [deliveredModalOpen, setDeliveredModalOpen] = useState(false);
  const [deliveredModalSuccess, setDeliveredModalSuccess] = useState(false);
  const [deliveredModalError, setDeliveredModalError] = useState(false);
  const deliveredCancelButtonRef = useRef(null);

  const [arrivedStoreModalOpen, setArrivedStoreModalOpen] = useState(false);
  const [arrivedStoreModalSuccess, setArrivedStoreModalSuccess] =
    useState(false);
  const [arrivedStoreModalError, setArrivedStoreModalError] = useState(false);
  const arrivedStoreCancelButtonRef = useRef(null);

  const paginationUrl = `/customer/dashboard?tab=tabs-arrived&search=${search}&type=${type}&limit=${limit}`;
  const limitUrl = `/customer/dashboard?tab=tabs-arrived&type=${type}&page=`;
  const [downloading, setDownloading] = useState(false);
  const [inputValue, setInputValue] = useState({
    message: '',
  });
  useEffect(() => {
    setCarsArray(carsRecords);
  }, carsRecords);

  const GetImages = async (car_id) => {
    NProgress.start();
    setDownloading(false);
    const res = await axios.get(
      `/api/customer/images?type=store&car_id=${car_id}`
    );
    const imdatas = res.data.data;
    const imdata = imdatas.map((im) => ({
      src: im
    }));
    setImages(imdata)

    // setImages(res.data.data ? res.data.data : []);
    setCarId(car_id);
    NProgress.done();
    setRedirectModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      car_id: selectedCar.current,
      message: event.target.message.value,
    };

    const apiURL = arrivedStoreModalOpen
      ? '/api/cars/arrivedToStore'
      : '/api/cars/deliveredToCustomer';

    const response = await postData(apiURL, formData);

    if (response.success === true) {
      if (deliveredModalOpen) {
        setDeliveredModalSuccess(true);
        setDeliveredModalError(false);
      } else if (arrivedStoreModalOpen) {
        setArrivedStoreModalSuccess(true);
        setArrivedStoreModalError(false);
      }

      setCarsArray(
        carsArray.filter((row) => {
          if (type === 'store') {
            return row.car_id !== selectedCar.current;
          }
          return row.carId !== selectedCar.current;
        })
      );

      setInputValue(() => ({
        message: '',
      }));
      selectedCar.current = 0;
    } else if (deliveredModalOpen) {
      setDeliveredModalError(true);
      setDeliveredModalSuccess(false);
    } else if (arrivedStoreModalOpen) {
      setArrivedStoreModalError(true);
      setArrivedStoreModalSuccess(false);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;
  return (
    <div className="" id="tabs-arrived" role="tabpanel">
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
                      {/* <Tab.Group as="div" className="flex flex-col-reverse">
                
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
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
                        </div>

                        <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                          {images.map((image, index) => (
                            <Tab.Panel key={index}>
                              <img
                                src={image}
                                alt=""
                                className="h-full w-full object-cover object-center sm:rounded-lg"
                              />
                            </Tab.Panel>
                          ))}
                        </Tab.Panels>
                      </Tab.Group> */}

                      <Carousel images={images} style={{ height: '30vw', width: '100%',objectFit: 'cover' }} canAutoPlay="true" autoPlayInterval="2000" isAutoPlaying="true"/>

                      <button
                        disabled={downloading}
                        // href={`/api/customer/downloadimages/?type=warehouse&car_id=${carId}`}
                        onClick={() => {
                          const url = `${process.env.NEXT_PUBLIC_API_URL}getDownloadableImages?type=store&car_id=${carId}`;
                          // use fetch to download the zip file
                          if (window.open(url, '_parent')) {
                            setDownloading(true);
                          }
                        }}
                        className={`mt-4 ${
                          downloading ? 'bg-indigo-200' : 'bg-indigo-600'
                        } ${
                          images.length ? '' : 'hidden'
                        }  inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
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
      <CustomModal
        showOn={deliveredModalOpen}
        initialFocus={deliveredCancelButtonRef}
        onClose={() => {
          setDeliveredModalOpen(false);
        }}
      >
        <div className="text-dark-blue">
          <Dialog.Title
            as="h6"
            className="mb-8 text-xl font-bold leading-6 md:text-xl lg:text-2xl"
          >
            <FormattedMessage id="page.customer.dashboard.table.delivered_to_customer" />
          </Dialog.Title>
          <div className="mt-4">
            <form method="post" onSubmit={handleSubmit} className="mt-8 mb-4">
              {deliveredModalSuccess === true ? (
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

              {deliveredModalError === true ? (
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

              {deliveredModalSuccess === false &&
              deliveredModalError === false ? (
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
              setDeliveredModalOpen(false);
            }}
            ref={deliveredCancelButtonRef}
          >
            <FormattedMessage id="general.close" />
          </button>
        </div>
      </CustomModal>

      <CustomModal
        showOn={arrivedStoreModalOpen}
        initialFocus={arrivedStoreCancelButtonRef}
        onClose={() => {
          setArrivedStoreModalOpen(false);
        }}
      >
        <div className="text-dark-blue">
          <Dialog.Title
            as="h6"
            className="mb-8 text-xl font-bold leading-6 md:text-xl lg:text-2xl"
          >
            <FormattedMessage id="page.customer.dashboard.table.arrived_to_store" />
          </Dialog.Title>
          <div className="mt-4">
            <form method="post" onSubmit={handleSubmit} className="mt-8 mb-4">
              {arrivedStoreModalSuccess === true ? (
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

              {arrivedStoreModalError === true ? (
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

              {arrivedStoreModalSuccess === false &&
              arrivedStoreModalError === false ? (
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
              setArrivedStoreModalOpen(false);
            }}
            ref={arrivedStoreCancelButtonRef}
          >
            <FormattedMessage id="general.close" />
          </button>
        </div>
      </CustomModal>
      <div className="pt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-3xl font-semibold">
              <FormattedMessage id="page.customer.dashboard.arrived" />
            </h1>
          </div>
        </div>
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
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
                    {type === 'port' && (
                      <Port
                        carsRecords={carsArray}
                        setArrivedStoreModalOpen={(car_id) => {
                          setArrivedStoreModalSuccess(false);
                          setArrivedStoreModalError(false);
                          setArrivedStoreModalOpen(true);
                          selectedCar.current = car_id;
                        }}
                        addIndex={addIndex}
                      ></Port>
                    )}
                    {type === 'store' && (
                      <Store
                        carsRecords={carsArray}
                        GetImages={GetImages}
                        setDeliveredModalOpen={(car_id) => {
                          setDeliveredModalSuccess(false);
                          setDeliveredModalError(false);
                          setDeliveredModalOpen(true);
                          selectedCar.current = car_id;
                        }}
                        addIndex={addIndex}
                      ></Store>
                    )}
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

export { ArrivedCarTab };
