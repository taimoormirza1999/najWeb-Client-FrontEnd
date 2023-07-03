import axios from 'axios';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import HeadTextWithIcon from '@/components/common/HeadTextWithIcon';
import { Deposits } from '@/components/dashboard/carsStatement/deposits';
import { GeneralEntries } from '@/components/dashboard/carsStatement/generalEntries';
import { InAuctionCars } from '@/components/dashboard/carsStatement/inAuctionCars';
import { ShippedCars } from '@/components/dashboard/carsStatement/shippedCars';
import CustomSelect from '@/components/forms/CustomSelect';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { CarStatusOptions } from '@/utils/constants/CarStatusOptions';
import { CurrencyOptions } from '@/utils/constants/CurrencyOptions';
import { PaymentStatusOptions } from '@/utils/constants/PaymentStatusOptions';
import { TransferOptions } from '@/utils/constants/TransferOptions';
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
    let target;

    if (event.detail) {
      target = event.detail.event.target;
    } else {
      target = event.target;
    }

    const { name, value } = target;

    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }

  const customSelectClassName =
    'border-medium-grey rounded-md border py-1 text-lg text-gray-700 w-full';

  const CarStatusInputs = {
    label: 'car.status',
    name: 'arrived_status',
    value: inputValue.arrived_status,
    options: CarStatusOptions,
    className: customSelectClassName,
  };

  const PaymentStatusInputs = {
    label: 'payment.status',
    name: 'remaining_status',
    value: inputValue.remaining_status,
    options: PaymentStatusOptions,
    className: customSelectClassName,
  };

  const TransferInputs = {
    label: 'Transfer',
    name: 'transfer_status',
    value: inputValue.transfer_status,
    options: TransferOptions,
    className: customSelectClassName,
  };

  const CurrencyInputs = {
    label: 'statement.filter.currency',
    name: 'currency',
    value: inputValue.currency,
    options: CurrencyOptions,
    className: customSelectClassName,
  };

  useEffect(() => {
    window.addEventListener('customSelectChanged', handleChange);
    // Cleanup the event listener when the parent component unmounts
    return () => {
      window.removeEventListener('customSelectChanged', handleChange);
    };
  }, []);

  return (
    <Layout meta={<Meta title="General Statement" description="" />}>
      <div className="mx-auto px-4">
        <div className="m-4">
          {/* <h4 className="text-dark-blue py-4 text-center text-2xl font-semibold md:text-3xl xl:text-4xl">
            <FormattedMessage id="page.customer.dashboard.navigation_statement" />
          </h4> */}
          <HeadTextWithIcon
            header={'page.customer.dashboard.navigation_statement'}
            gicon={'&#xe873;'}
            // tagline={'page.complaints.header'}
          />
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
          <div className="items-en my-2 flex flex-col gap-4 lg:my-8 2xl:flex-row">
            <div className="flex basis-[58%] flex-col gap-4 lg:flex-row">
              <div className="flex basis-[50%] flex-col gap-4 sm:flex-row">
                <div className="basis-[50%]">
                  <CustomSelect inputs={CarStatusInputs}></CustomSelect>
                </div>
                <div className="basis-[50%]">
                  <CustomSelect inputs={PaymentStatusInputs}></CustomSelect>
                </div>
              </div>
              <div className="flex basis-[50%] flex-col gap-4 sm:flex-row">
                <div className="basis-[50%]">
                  <CustomSelect inputs={TransferInputs}></CustomSelect>
                </div>
                <div className="basis-[50%]">
                  <CustomSelect inputs={CurrencyInputs}></CustomSelect>
                </div>
              </div>
            </div>
            <div className="flex basis-[42%] flex-col gap-4 lg:flex-row">
              <div className="flex basis-[50%] flex-col gap-4 sm:flex-row">
                <div className="basis-[50%]">
                  <div className="w-full">
                    <label>
                      <FormattedMessage id="statement.filter.start_date" />
                    </label>
                    <input
                      name="date_from"
                      type="date"
                      className="border-medium-grey w-full basis-1/2 rounded-md border py-1 text-gray-700"
                      value={inputValue.date_from}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="basis-[50%]">
                  <div className="w-full">
                    <label>
                      <FormattedMessage id="statement.filter.end_date" />
                    </label>
                    <input
                      name="date_to"
                      type="date"
                      className="border-medium-grey w-full basis-1/2 rounded-md border py-1 text-gray-700"
                      value={inputValue.date_to}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex basis-[50%] items-end">
                <div className="w-full">
                  <button
                    type="submit"
                    className="bg-teal-blue block w-full rounded-md py-1 px-4 text-xl font-medium text-white hover:border-0 hover:bg-blue-400"
                  >
                    <FormattedMessage id="general.submit" />
                  </button>
                </div>
              </div>
            </div>
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
    date_from: formData.date_from || `2021-01-01`,
    date_to: formData.date_to || ``,
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
