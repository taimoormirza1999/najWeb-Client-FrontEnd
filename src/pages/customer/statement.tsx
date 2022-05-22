import axios from 'axios';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';

import { Deposits } from '@/components/dashboard/carsStatement/deposits';
import { GeneralEntries } from '@/components/dashboard/carsStatement/generalEntries';
import { InAuctionCars } from '@/components/dashboard/carsStatement/inAuctionCars';
import { ShippedCars } from '@/components/dashboard/carsStatement/shippedCars';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { FormattedMessage, useIntl } from 'react-intl';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

const Statement = ({
  selectedParams,
  shippedCars,
  inAuctionCars,
  generalEntries,
  deposits,
}) => {
  /*   const [shippedCarsState, setShippedCars] = useState(shippedCars);
  const [inAuctionCarsState, setInAuctionCars] = useState(inAuctionCars);
  const [generalEntries, setGeneralEntries] = useState(generalEntries); */
  const [inputValue, setInputValue] = useState(selectedParams);
  const intl = useIntl();

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <Layout meta={<Meta title="General Statement" description="" />}>
      <div className="mx-auto px-8">
        <div className="m-4">
          <h4 className="text-dark-blue py-4 text-center text-2xl font-semibold md:text-3xl xl:text-4xl">
            <FormattedMessage id="page.customer.dashboard.navigation_statement" />
          </h4>
        </div>
        <p className="py-3">
          <i className="material-icons text-yellow-orange align-middle text-2xl lg:text-5xl">
            &#xe164;
          </i>
          <span className="text-dark-blue ml-4 align-middle text-2xl lg:text-4xl">
            <FormattedMessage id="statement.filter" />
          </span>
        </p>

        <form className="mt-2 mb-12" method="get">
          <div className="my-2 flex flex-col gap-4 lg:my-8 lg:flex-row lg:gap-10">
            <select
              name="arrived_status"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg italic text-gray-700"
              value={inputValue.arrived_status}
              onChange={handleChange}
            >
              <option value="">
                {intl.formatMessage({ id: 'car.status' })}
              </option>
              <option value="3">All</option>
              <option value="1">Arrived Cars</option>
              <option value="2">Not Arrived</option>
            </select>
            <select
              name="remaining_status"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg italic text-gray-700"
              value={inputValue.remaining_status}
              onChange={handleChange}
            >
              <option value="">
                {intl.formatMessage({ id: 'payment.status' })}
              </option>
              <option value="3">All</option>
              <option value="1">Paid</option>
              <option value="2">UnPaid</option>
            </select>
            <select
              name="transfer_status"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg italic text-gray-700"
              value={inputValue.transfer_status}
              onChange={handleChange}
            >
              <option value="">{intl.formatMessage({ id: 'Transfer' })}</option>
              <option value="3">All</option>
              <option value="1">Paid</option>
              <option value="2">UnPaid</option>
            </select>
            <select
              name="currency"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg italic text-gray-700"
              value={inputValue.currency}
              onChange={handleChange}
            >
              <option value="aed">AED</option>
              <option value="usd">USD</option>
            </select>
            <div className="flex basis-[40%] gap-8">
              <input
                name="date_from"
                type="date"
                className="border-medium-grey basis-1/2 rounded-md border py-1 italic text-gray-700"
                value={inputValue.date_from}
                onChange={handleChange}
              />
              <input
                name="date_to"
                type="date"
                className="border-medium-grey basis-1/2 rounded-md border py-1 italic text-gray-700"
                value={inputValue.date_to}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-teal-blue block rounded-md py-1 px-4 text-xl font-medium text-white hover:border-0 hover:bg-blue-400"
            >
              <FormattedMessage id="general.submit" />
            </button>
          </div>
        </form>

        {shippedCars.length ? <ShippedCars tableData={shippedCars} /> : null}

        {inAuctionCars.length ? (
          <InAuctionCars tableData={inAuctionCars} />
        ) : null}

        {generalEntries.length ? (
          <GeneralEntries tableData={generalEntries} />
        ) : null}

        {deposits.length ? <Deposits tableData={deposits} /> : null}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;
  const session: any = await getSession(context);

  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  const apiUrl = process.env.API_URL;
  const formData = context.query;

  const selectedParams = {
    arrived_status: formData.arrived_status || '1',
    remaining_status: formData.remaining_status || '0',
    transfer_status: formData.transfer_status || '0',
    currency: formData.currency || 'aed',
    date_from: formData.date_from || '2021-01-01',
    date_to: '',
  };
  const [
    shippedCarsResponse,
    inAuctionCarsResponse,
    generalEntriesResponse,
    depositsResponse,
  ] = await Promise.all([
    axios.get(`${apiUrl}carStatement/shippedCars`, {
      params: selectedParams,
    }),
    axios.get(`${apiUrl}carStatement/carsInAuction`, {
      params: selectedParams,
    }),
    axios.get(`${apiUrl}carStatement/generalEntries`, {
      params: selectedParams,
    }),
    axios.get(`${apiUrl}carStatement/deposits`, {
      params: selectedParams,
    }),
  ]);
  const [shippedCars, inAuctionCars, generalEntries, deposits] =
    await Promise.all([
      shippedCarsResponse.data.data,
      inAuctionCarsResponse.data.data,
      generalEntriesResponse.data.data,
      depositsResponse.data.data,
    ]);

  return {
    props: {
      selectedParams,
      shippedCars,
      inAuctionCars,
      generalEntries,
      deposits,
    },
  };
}

export default Statement;
