/* eslint-disable func-names */
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  ArrivedIcon,
  BoatIcon,
  CheckCircleIcon,
  LocalShippingIcon,
  NewCarIcon,
  PortIcon,
  WarehouseIcon,
} from '@/components/dashboard/trackingIcons';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutDashboard';
import { classNames } from '@/utils/Functions';

export async function getServerSideProps(context) {
  const search = context.query.search ? context.query.search : '';
  return {
    props: { apiUrl: process.env.API_URL, search },
  };
}
const Tracking = ({ apiUrl, search }) => {
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
      axios.defaults.headers.common.Authorization = `Bearer ${session?.token?.access_token}`;
      await axios
        .get(`/api/customer/tracking?lot_vin=${searchValue}`)
        .then(function (response) {
          console.log(response?.data?.data?.data);
          if (response?.data?.data?.data) {
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
          }
        })
        .catch(function (apiError) {
          console.log(apiError);
        });
    }
  };
  if (search) {
    search = '';
    getTracking();
  }
  return (
    <Layout meta={<Meta title="Tracking" description="" />}>
      <div className="m-4">
        <div>
          <h3 className="text-dark-blue pb-8 text-4xl font-bold sm:text-2xl">
            <i
              className={classNames(
                'material-icons  text-yellow-orange align-middle'
              )}
            >
              &#xe55e;
            </i>
            Tracking
          </h3>
          <p className="text-dark-blue pb-8 text-4xl sm:text-2xl">
            Track your car
          </p>
          <div className="m-auto text-center  lg:w-[60%]">
            <img
              className="m-auto w-auto max-w-[250px]"
              src="/assets/images/logo-en.png"
              alt="Nejoum Al Jazeera"
            />
            <div className="relative m-auto">
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
                id="lotSearch"
                value={searchValue}
                onInput={(e) =>
                  setSearchValue((e.target as HTMLInputElement).value)
                }
                placeholder="Track Car by Vin Number"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[8px] right-[8px] h-5 w-5 text-[#818181]"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => {
                  getTracking();
                }}
              >
                {' '}
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />{' '}
              </svg>
              <p className="mt-3 flex rounded-md bg-[#045FB7] py-2 text-white">
                <span className="flex-1 ltr:mr-3 ltr:text-right rtl:ml-3 rtl:text-left">
                  Vin:{vin}
                </span>
                <span className="flex-1 ltr:ml-3 ltr:text-left rtl:mr-3 rtl:text-right">
                  Lot:{lotnumber}
                </span>
              </p>
            </div>
            <div className="mt-4 flex overflow-x-scroll xl:overflow-x-visible dd">
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
                  New Car <br />
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
                  Towing <br />
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
                  Warehouse <br />
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
                  Port <br />
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
                  Store <br />
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
                  Delivered <br />
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
