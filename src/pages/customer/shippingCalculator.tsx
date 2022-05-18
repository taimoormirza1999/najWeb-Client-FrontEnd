import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useRef, useState } from 'react';

import CustomModal from '@/components/CustomModal';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutDashboard';
import { FormattedMessage, useIntl } from 'react-intl';

export type CalculatorInputs = {
  vehicle_type: string;
  auction: string;
  auction_location: string;
  country: string;
  port: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ShippingCalculator = ({ vehicleData, auctionData, countryData }) => {
  const intl = useIntl();
  const [calculatorResult, setCalculatorResult] = useState('');
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const okButtonErrorRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<CalculatorInputs>({
    vehicle_type: '',
    auction: '',
    auction_location: '',
    country: '',
    port: '',
  });

  const [auctionLocationData, setAuctionLocationData] = useState([]);
  const [portData, setPortData] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }

  const getAuctionLocations = async (event) => {
    handleChange(event);
    const res = await axios.get(`/api/customer/shipping/auctionLocations`, {
      params: { auction_id: event.target.value },
    });
    const auctionLocations = res.data ? res.data.data : [];
    setAuctionLocationData(auctionLocations);
  };

  const getCountryPorts = async (event) => {
    handleChange(event);
    const res = await axios.get(`/api/customer/shipping/countryPorts`, {
      params: { country_id: event.target.value },
    });
    const ports = res.data ? res.data.data : [];
    setPortData(ports);
  };

  const calculateShippingCost = async (event) => {
    event.preventDefault();

    await axios
      .get(`/api/customer/shipping/shippingCalculator`, {
        params: {
          vehicle_type: inputValue.vehicle_type,
          auction_location: inputValue.auction_location,
          port: inputValue.port,
        },
      })
      .then((res) => {
        setCalculatorResult(res.data.data);
        contentRef?.current?.classList.add('blur-sm');
        setCalculatorModalOpen(true);
      })
      .catch(() => {
        contentRef?.current?.classList.add('blur-sm');
        setErrorModalOpen(true);
      });
  };

  return (
    <Layout meta={<Meta title="Shipping Calculator" description="" />}>
      <CustomModal
        showOn={calculatorModalOpen}
        initialFocus={cancelButtonRef}
        onClose={() => {
          setCalculatorModalOpen(false);
          contentRef?.current?.classList.remove('blur-sm');
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <Dialog.Title
            as="h3"
            className="text-xl font-bold leading-6 md:text-2xl lg:text-3xl"
          >
            <FormattedMessage id="Estimated_Cost" />
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-4 text-lg md:text-xl lg:py-6 lg:text-2xl">
              <FormattedMessage id="Your.Estimated.Shipping.Cost.is" />:
              <span className="font-bold">$ {calculatorResult}</span>
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              setCalculatorModalOpen(false);
              contentRef?.current?.classList.remove('blur-sm');
            }}
            ref={cancelButtonRef}
          >
            <FormattedMessage id="general.cancel" />
          </button>
        </div>
      </CustomModal>
      <CustomModal
        showOn={errorModalOpen}
        initialFocus={okButtonErrorRef}
        onClose={() => {
          setErrorModalOpen(false);
          contentRef?.current?.classList.remove('blur-sm');
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons mb-4 text-6xl text-red-800">&#xe160;</i>
          <Dialog.Title as="h3" className="text-4xl font-bold leading-6">
            Sorry!
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-2xl">
              A technical Error has occurred. Please Try again
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setErrorModalOpen(false);
              contentRef?.current?.classList.remove('blur-sm');
            }}
            ref={okButtonErrorRef}
          >
            Okay
          </button>
        </div>
      </CustomModal>

      <div className="text-dark-blue px-4 py-12" ref={contentRef}>
        <h2 className="text-center text-5xl font-semibold">
          <span className="font-bold">
            <FormattedMessage id="page.customer.dashboard.navigation_estimate_calculator" />
          </span>
        </h2>
        <p className="mb-8 py-6 text-center text-2xl">
          <FormattedMessage id="estimate_calculator_desc" />
        </p>

        <div className="flex justify-center ">
          <div className="bg-light-grey border-medium-grey rounded-lg border p-4 sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
            <form method="post" onSubmit={calculateShippingCost}>
              <select
                required
                name="vehicle_type"
                className="border-medium-grey  mb-3 w-full rounded-md border py-1 text-lg text-gray-700"
                value={inputValue.vehicle_type}
                onChange={handleChange}
              >
                <option value="">
                  {intl.formatMessage({ id: 'vehicle.type' })}
                </option>
                {vehicleData.map((row, index) => (
                  <option key={index} value={row.id_vehicle_type}>
                    {row.name}
                  </option>
                ))}
              </select>
              <select
                required
                name="auction"
                className="border-medium-grey  mb-3 w-full rounded-md border py-1 text-lg text-gray-700"
                value={inputValue.auction}
                onChange={(event) => getAuctionLocations(event)}
              >
                <option value="">
                  {intl.formatMessage({
                    id: 'page.customer.dashboard.table.auction',
                  })}
                </option>
                {auctionData.map((row, index) => (
                  <option key={index} value={row.id}>
                    {row.title}
                  </option>
                ))}
              </select>
              <select
                required
                name="auction_location"
                className="border-medium-grey  mb-3 w-full rounded-md border py-1 text-lg text-gray-700"
                value={inputValue.auction_location}
                onChange={handleChange}
              >
                <option value="">
                  {intl.formatMessage({ id: 'auction.location' })}
                </option>
                {auctionLocationData.map((row: any, index) => (
                  <option key={index} value={row.auction_location_id}>
                    {row.auction_location_name}
                  </option>
                ))}
              </select>
              <select
                required
                name="country"
                className="border-medium-grey  mb-3 w-full rounded-md border py-1 text-lg text-gray-700"
                value={inputValue.country}
                onChange={(event) => getCountryPorts(event)}
              >
                <option value="">
                  {intl.formatMessage({ id: 'Country' })}
                </option>
                {countryData.map((row, index) => (
                  <option key={index} value={row.id}>
                    {row.name}
                  </option>
                ))}
              </select>
              <select
                required
                name="port"
                className="border-medium-grey  mb-3 w-full rounded-md border py-1 text-lg text-gray-700"
                value={inputValue.port}
                onChange={handleChange}
              >
                <option value="">
                  {intl.formatMessage({ id: 'tracking.port' })}
                </option>
                {portData.map((row: any, index) => (
                  <option key={index} value={row.port_id}>
                    {row.port_name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-azure-blue mx-auto my-4 block px-4 py-1 text-lg font-semibold text-white"
              >
                <FormattedMessage id="Calculate" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session: Session | null = await getSession(context);
  let vehicleData = [];
  let auctionData = [];
  let countryData = [];

  const resVehicle = await axios.get(`${apiUrl}getVehicleType`);
  const resAuction = await axios.get(`${apiUrl}getAuction`);
  const resCountry = await axios.get(`${apiUrl}getCountries`);

  vehicleData = resVehicle.data ? resVehicle.data.data : resVehicle.data;
  auctionData = resAuction.data ? resAuction.data.data : resAuction.data;
  countryData = resCountry.data ? resCountry.data.data : resCountry.data;

  return {
    props: {
      vehicleData,
      auctionData,
      countryData,
      session,
    },
  };
}

export default ShippingCalculator;
