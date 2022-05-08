import { Dialog, Tab, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { Fragment, useRef, useState } from 'react';

import { classNames } from '@/utils/Functions';

const carTableHeader = [
  { name: 'No' },
  { name: 'Auction Photo' },
  { name: 'Detail' },
  { name: 'Lot & Vin' },
  { name: 'Auction' },
  { name: 'Destination' },
  { name: 'Purchase Date' },
  { name: 'Payment Date' },
  { name: 'Picked Date' },
  { name: 'Arrived Date' },
  { name: 'Title' },
  { name: 'Key' },
  { name: 'Images' },
];
const WarehouseCarTab = ({ carsRecords, baseUrl }) => {
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const cancelButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  async function GetImages(car_id) {
    const res = await axios.get(
      `${baseUrl}/api/images?type=warehouse&car_id=${car_id}`
    );
    setImages(res.data.data);
    console.log('1');
    setRedirectModalOpen(true);
    console.log('2');
  }

  return (
    <div className="" id="tabs-warehousecar" role="tabpanel">
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
                      <Tab.Group as="div" className="flex flex-col-reverse">
                        {/* Image selector */}
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
                      </Tab.Group>
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center gap-4 sm:mt-6">
                  <button
                    type="button"
                    className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-10 py-2.5 text-2xl font-medium"
                    onClick={() => {
                      setRedirectModalOpen(false);
                      contentRef?.current?.classList.remove('blur-sm');
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
            <h1 className="text-dark-blue text-xl font-semibold">
              Warehouse Cars
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 border border-[#005fb7]">
                  <thead className="bg-white">
                    <tr>
                      {carTableHeader.map((th) => (
                        <th
                          key={th.name}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-blue-600 sm:text-xl"
                        >
                          {th.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {carsRecords.map((car, index) => (
                      <tr
                        key={car.carId}
                        className={classNames(
                          index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                          'text-xs sm:text-[17px]'
                        )}
                      >
                        <td
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {index + 1}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[56px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          <img src={car.image} alt="" />
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
                          {car.auctionLocationName} <br /> {car.auctionTitle}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.portName}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.purchasedDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.paymentDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[30px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.pickedDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.arrivedDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[60px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.deliveredTitle || car.followTitle} <br />{' '}
                          {car.titleDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[63px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.deliveredKey}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          <img
                            src={car.image}
                            alt=""
                            onClick={() => {
                              GetImages(car.carId);
                              contentRef?.current?.classList.add('blur-sm');
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="float-right mt-3">
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="bg-dark-blue relative inline-flex items-center rounded-l-md border border-gray-300 p-2 text-sm font-medium text-white hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              10
            </a>
            <a
              href="#"
              className="bg-dark-blue relative inline-flex items-center rounded-r-md border border-gray-300 p-2 text-sm font-medium text-white hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export { WarehouseCarTab };
