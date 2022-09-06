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
  shippedCarsTotal,
  inAuctionCars,
  inAuctionCarsTotal,
  generalEntries,
  generalEntriesTotal,
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
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg ltr:italic text-gray-700"
              value={inputValue.arrived_status}
              onChange={handleChange}
            >
              <option value="">
                {intl.formatMessage({ id: 'car.status' })}
              </option>
              <option value="2">All</option>
              <option value="1">Arrived Cars</option>
              <option value="0">Not Arrived</option>
            </select>
            <select
              name="remaining_status"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg ltr:italic text-gray-700"
              value={inputValue.remaining_status}
              onChange={handleChange}
            >
              <option value="">
                {intl.formatMessage({ id: 'payment.status' })}
              </option>
              <option value="0">All</option>
              <option value="1">Paid</option>
              <option value="2">UnPaid</option>
            </select>
            <select
              name="transfer_status"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg ltr:italic text-gray-700"
              value={inputValue.transfer_status}
              onChange={handleChange}
            >
              <option value="">{intl.formatMessage({ id: 'Transfer' })}</option>
              <option value="0">All</option>
              <option value="1">Paid</option>
              <option value="2">UnPaid</option>
            </select>
            <select
              name="currency"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg ltr:italic text-gray-700"
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
                className="border-medium-grey basis-1/2 rounded-md border py-1 ltr:italic text-gray-700"
                value={inputValue.date_from}
                onChange={handleChange}
              />
              <input
                name="date_to"
                type="date"
                className="border-medium-grey basis-1/2 rounded-md border py-1 ltr:italic text-gray-700"
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

        {shippedCars.length ? (
          <ShippedCars
            tableData={shippedCars}
            lastTotalRow={shippedCarsTotal}
          />
        ) : null}

        {inAuctionCars.length ? (
          <InAuctionCars
            tableData={inAuctionCars}
            lastTotalRow={inAuctionCarsTotal}
          />
        ) : null}

        {generalEntries.length ? (
          <GeneralEntries
            tableData={generalEntries}
            lastTotalRow={generalEntriesTotal}
          />
        ) : null}

        {deposits.length ? <Deposits tableData={deposits} /> : null}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;
  const session: any = await getSession(context);
  const d = new Date();
  const year = d.getFullYear();
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  axios.defaults.timeout = 300000;
  const apiUrl = process.env.API_URL;
  const formData = context.query;
  const selectedParams = {
    arrived_status: formData.arrived_status || '1',
    remaining_status: formData.remaining_status || '0',
    transfer_status: formData.transfer_status || '0',
    currency: formData.currency || 'aed',
    date_from: formData.date_from || `${year}-01-01`,
    date_to: '',
  };
  try {
    const [shippedCarsResponse, depositsResponse] = await Promise.all([
      axios.get(`${apiUrl}carStatement/shippedCars`, {
        params: selectedParams,
      }),
      /* axios.get(`${apiUrl}carStatement/carsInAuction`, {
      params: selectedParams,
    }),
    axios.get(`${apiUrl}carStatement/generalEntries`, {
      params: selectedParams,
    }), */
      axios.get(`${apiUrl}carStatement/deposits`, {
        params: selectedParams,
      }),
    ]);
    const [shippedCars, inAuctionCars, generalEntries, deposits] = [
      shippedCarsResponse.data.shippedCars,
      shippedCarsResponse.data.inAuctionTransactions,
      shippedCarsResponse.data.generalTransactions,
      depositsResponse.data.data,
    ];

    const generalEntriesTotal =
      generalEntries.length > 1 ? generalEntries.pop() : null;
    const shippedCarsTotal = shippedCars.length > 1 ? shippedCars.pop() : null;
    const inAuctionCarsTotal =
      inAuctionCars.length > 1 ? inAuctionCars.pop() : null;
    return {
      props: {
        selectedParams,
        shippedCars,
        shippedCarsTotal,
        inAuctionCars,
        inAuctionCarsTotal,
        generalEntries,
        generalEntriesTotal,
        deposits,
      },
    };
  } catch (err) {
    return NetworkStatus.LOGIN_PAGE;
  }
}

export default Statement;
