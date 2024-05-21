import 'react-gallery-carousel/dist/index.css';

import { Dialog } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { postData } from '@/utils/network';

import CustomModal from '../customModal';
import TableHeader from '../TableHeader';
import TableHeadText from '../TableHeadText';
import { Port } from './arrived/port';
import { Store } from './arrived/store';

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
      'page.customer.dashboard.table.buyer_number',
      'page.customer.dashboard.table.region',
      'page.customer.dashboard.table.destination',
      'page.customer.dashboard.table.purchase_date',
      'page.customer.dashboard.table.date_pick',
      'picked_car_title_note',
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
      'page.customer.dashboard.table.buyer_number',
      'page.customer.dashboard.table.region',
      'page.customer.dashboard.table.destination',
      'page.customer.dashboard.table.purchase_date',
      'page.customer.dashboard.table.date_pick',
      'picked_car_title_note',
      'page.customer.dashboard.table.arrived',
      'page.customer.dashboard.table.title',
      'page.customer.dashboard.table.title_date',
      'page.customer.dashboard.table.key',
      'page.customer.dashboard.table.loaded_date',
      'page.customer.dashboard.table.booking',
      'page.customer.dashboard.table.container',
      'page.customer.dashboard.table.shipping_date',
      'page.customer.dashboard.table.date_arrived_port',
      'page.customer.dashboard.table.date_arrived_store',
      'page.customer.dashboard.table.Total',
    ];
    if (session?.profile?[0]?.naj_branch === '1') {
      carTableHeader.push(
        'page.customer.dashboard.table.delivered_to_customer'
      );
    }
  }
  const intl = useIntl();
  const [carsArray, setCarsArray] = useState(carsRecords);
  const selectedCar = useRef(0);
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
  const [inputValue, setInputValue] = useState({
    message: '',
  });
  useEffect(() => {
    setCarsArray(carsRecords);
  }, [carsRecords]);

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
      <div>
        <TableHeadText id={'page.customer.dashboard.arrived'} />
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="table_top_div flex flex-col">
                <table className="all_tables min-w-full divide-y divide-gray-300">
                  <TableHeader tableHeader={carTableHeader} />
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
