/* eslint-disable func-names */
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useContext, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CustomModal from '@/components/CustomModal';
import {
  ArrivedIcon,
  BoatIcon,
  CheckCircleIcon,
  LocalShippingIcon,
  NewCarIcon,
  PortIcon,
  WarehouseIcon,
} from '@/components/dashboard/trackingIcons';
import UserContext from '@/components/UserContext';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutDashboard';
import { classNames } from '@/utils/Functions';

export async function getServerSideProps(context) {
  const search = context.query.search ? context.query.search : '';
  return {
    props: { apiUrl: process.env.API_URL, search },
  };
}
const Tracking = ({ search }) => {
  const { setLoading } = useContext(UserContext);
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState(search);
  const [storeDate, setStoreDate] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [pickedDate, setPickedDate] = useState('');
  const [deliveredDate, setDeliveredDate] = useState('');
  const [warehouseDate, setWarehouseDate] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [portDate, setPortDate] = useState('');
  const [vin, setVin] = useState('');
  const [lotnumber, setLotnumber] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const okButtonErrorRef = useRef(null);
  const intl = useIntl();

  let carDetails: {
    car_data: any;
    arrive_store: any;
    towingstatus: any;
    arrivedstatus: any;
    shipping_status: any;
    arrived_port: any;
    deliver_customer: any;
  };
  const getTracking = async () => {
    if (searchValue) {
      // setLoading(true);
      axios.defaults.headers.common.Authorization = `Bearer ${session?.token?.access_token}`;
      await axios
        .get(`/api/customer/tracking?lot_vin=${searchValue}`)
        .then(function (response) {
          if (response?.data?.data?.data.car_data) {
            carDetails = response.data.data?.data;
            setVin(carDetails?.car_data?.vin);
            setLotnumber(carDetails?.car_data?.lotnumber);
            setStoreDate(carDetails?.arrive_store?.create_date);
            setPurchaseDate(carDetails?.car_data?.purchasedate);
            setPickedDate(carDetails?.towingstatus?.Picked_date);
            setWarehouseDate(carDetails?.arrivedstatus?.delivered_date);
            setShippingDate(carDetails?.shipping_status?.shipping_date);
            setPortDate(carDetails?.arrived_port?.arrival_date);
            setDeliveredDate(carDetails?.deliver_customer?.deliver_create_date);
            // set the completed modules
            // setLoading(false);
          } else {
            setErrorModalOpen(true);
          }
        })
        .catch(function (apiError) {
          setErrorModalOpen(true);
          console.log(apiError);
          setLoading(false);
        });
    }
  };
  if (search) {
    search = '';
    getTracking();
  }

  const startTracking = async (e) => {
    e?.preventDefault();
    getTracking();
  };

  return (
    <Layout meta={<Meta title="Tracking" description="" />}>
      <CustomModal
        showOn={errorModalOpen}
        initialFocus={okButtonErrorRef}
        onClose={() => {
          setErrorModalOpen(false);
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons mb-4 text-6xl text-red-800">&#xe160;</i>
          <Dialog.Title as="h3" className="text-4xl font-bold leading-6">
            {intl.formatMessage({ id: 'general.sorry' })}
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-2xl">
              {intl.formatMessage({ id: 'general.technicalErr' })}
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setErrorModalOpen(false);
            }}
            ref={okButtonErrorRef}
          >
            {intl.formatMessage({ id: 'messages.ok' })}
          </button>
        </div>
      </CustomModal>
      <div className="m-4">
        <div>
          <h3 className="text-dark-blue pb-8 text-xl font-bold sm:text-3xl">
            <i className="material-icons text-yellow-orange align-middle text-3xl ltr:mr-2 rtl:ml-2">
              &#xe55e;
            </i>
            <FormattedMessage id="page.customer.dashboard.navigation_tracking" />
          </h3>
          <div className="m-auto text-center  lg:w-[60%]">
            <img
              className="m-auto w-auto max-w-[250px]"
              src="/assets/images/logo-en.png"
              alt="Nejoum Al Jazeera"
            />
            <div className="relative m-auto">
              <form method="post" onSubmit={startTracking}>
                <input
                  type="text"
                  className="
                        m-auto
                        mt-4
                        block
                        w-full
                        rounded
                        border
                        border-solid
                        border-[#8F9294]
                        bg-white
                        bg-clip-padding px-3
                        py-1.5 text-center text-base
                        font-normal
                        italic
                        text-[#818181]
                        transition
                        ease-in-out
                        focus:text-gray-700 focus:outline-none
                      "
                  name="lotSearch"
                  required
                  id="lotSearch"
                  value={searchValue}
                  onInput={(e) =>
                    setSearchValue((e.target as HTMLInputElement).value)
                  }
                  placeholder={intl.formatMessage({
                    id: 'Track.Car.by.Vin.Number',
                  })}
                />
                <button type="submit" className="block">
                  <svg
                    type="submit"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-1 h-8 w-7 cursor-pointer text-[#818181] ltr:right-1 rtl:left-1 rtl:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {' '}
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />{' '}
                  </svg>
                </button>
              </form>
              <p className="mt-3 flex rounded-md bg-[#045FB7] py-2 text-white">
                <span className="flex-1 ltr:mr-3 ltr:text-right rtl:ml-3 rtl:text-left">
                  Vin:{vin}
                </span>
                <span className="flex-1 ltr:ml-3 ltr:text-left rtl:mr-3 rtl:text-right">
                  Lot:{lotnumber}
                </span>
              </p>
            </div>
            <div className="dd mt-4 flex overflow-x-scroll xl:overflow-x-visible">
              <div className="flex-1">
                <NewCarIcon
                  color={purchaseDate ? '#0193FF' : '#045FB7'}
                ></NewCarIcon>
                <div className="relative mt-5 min-w-[75px] border-t-2 border-[#707070] ltr:ml-3 rtl:mr-3">
                  <div
                    className={classNames(
                      purchaseDate ? 'bg-[#FFB100]' : 'bg-dark-blue',
                      ' absolute bottom-[-3px] ltr:left-0 rtl:right-0 rounded-full p-1'
                    )}
                  ></div>
                </div>
                <div className="text-xs text-[#2576C1] ltr:text-left rtl:text-right sm:text-xs md:text-sm">
                  <FormattedMessage id="tracking.new_car" />
                  <br />
                  <span>{purchaseDate}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="ltr:ml-[5%] rtl:mr-[5%]">
                  <LocalShippingIcon
                    color={purchaseDate ? '#0193FF' : '#045FB7'}
                  ></LocalShippingIcon>
                </div>
                <div className="relative mt-5 min-w-[75px] border-t-2 border-[#707070]">
                  <div
                    className={classNames(
                      pickedDate ? 'bg-[#FFB100]' : 'bg-dark-blue',
                      ' absolute bottom-[-3px] ltr:left-[15%] rtl:right-[15%] rounded-full p-1'
                    )}
                  ></div>
                </div>
                <div className="text-xs text-[#2576C1] ltr:text-left rtl:text-right sm:text-xs md:text-sm">
                  <FormattedMessage id="tracking.towing" />
                  <br />
                  <span>{pickedDate}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="ltr:ml-[5%] rtl:mr-[5%]">
                  <WarehouseIcon
                    color={warehouseDate ? '#0193FF' : '#045FB7'}
                  ></WarehouseIcon>
                </div>
                <div className="relative mt-5 min-w-[75px] border-t-2 border-[#707070]">
                  <div
                    className={classNames(
                      warehouseDate ? 'bg-[#FFB100]' : 'bg-dark-blue',
                      ' absolute bottom-[-3px] ltr:left-[15%] rtl:right-[15%] rounded-full p-1'
                    )}
                  ></div>
                </div>
                <div className="text-xs text-[#2576C1] ltr:text-left rtl:text-right sm:text-xs md:text-sm">
                  <FormattedMessage id="tracking.warehouse" />
                  <br />
                  <span>{warehouseDate}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="ltr:ml-[5%] rtl:mr-[5%]">
                  <BoatIcon
                    color={shippingDate ? '#0193FF' : '#045FB7'}
                  ></BoatIcon>
                </div>
                <div className="relative mt-5 min-w-[75px] border-t-2 border-[#707070]">
                  <div
                    className={classNames(
                      shippingDate ? 'bg-[#FFB100]' : 'bg-dark-blue',
                      ' absolute bottom-[-3px] ltr:left-[15%] rtl:right-[15%] rounded-full p-1'
                    )}
                  ></div>
                </div>
                <div className="text-xs text-[#2576C1] ltr:text-left rtl:text-right sm:text-xs md:text-sm">
                  <FormattedMessage id="Shipping" /> <br />
                  <span>{shippingDate}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="ltr:ml-[5%] rtl:mr-[5%]">
                  <PortIcon color={portDate ? '#0193FF' : '#045FB7'}></PortIcon>
                </div>
                <div className="relative mt-5 min-w-[75px] border-t-2 border-[#707070]">
                  <div
                    className={classNames(
                      portDate ? 'bg-[#FFB100]' : 'bg-dark-blue',
                      ' absolute bottom-[-3px] ltr:left-[15%] rtl:right-[15%] rounded-full p-1'
                    )}
                  ></div>
                </div>
                <div className="text-xs text-[#2576C1] ltr:text-left rtl:text-right sm:text-xs md:text-sm">
                  <FormattedMessage id="tracking.port" />
                  <br />
                  <span>{portDate}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="ltr:ml-[35%] rtl:mr-[35%]">
                  <ArrivedIcon
                    color={storeDate ? '#0193FF' : '#045FB7'}
                  ></ArrivedIcon>
                </div>
                <div className="relative mt-5 min-w-[75px] border-t-2 border-[#707070]">
                  <div
                    className={classNames(
                      storeDate ? 'bg-[#FFB100]' : 'bg-dark-blue',
                      ' absolute bottom-[-3px] ltr:left-[50%] rtl:right-[50%] rounded-full p-1'
                    )}
                  ></div>
                </div>
                <div className="text-xs text-[#2576C1] ltr:text-left rtl:text-right sm:text-xs md:text-sm">
                  <FormattedMessage id="tracking.store" />
                  <br />
                  <span>{storeDate}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="ltr:ml-[50%] rtl:mr-[50%]">
                  <CheckCircleIcon
                    color={deliveredDate ? '#0193FF' : '#045FB7'}
                  ></CheckCircleIcon>
                </div>
                <div className="relative mt-5 min-w-[75px] border-t-2 border-[#707070] ltr:mr-6 rtl:ml-6">
                  <div
                    className={classNames(
                      deliveredDate ? 'bg-[#FFB100]' : 'bg-dark-blue',
                      ' absolute bottom-[-3px] ltr:right-0 rtl:left-0 rounded-full p-1'
                    )}
                  ></div>
                </div>
                <div className="text-xs text-[#2576C1] ltr:text-right rtl:text-left sm:text-xs md:text-sm">
                  <FormattedMessage id="tracking.delivered" />
                  <br />
                  <span>{deliveredDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tracking;
