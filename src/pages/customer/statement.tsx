import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { GeneralEntries } from '@/components/dashboard/carsStatement/generalEntries';
import { InAuctionCars } from '@/components/dashboard/carsStatement/inAuctionCars';
import { ShippedCars } from '@/components/dashboard/carsStatement/shippedCars';
import { Layout } from '@/templates/LayoutDashboard';

const getStatementData = async (session, apiUrl) => {
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;

  const [shippedCarsResponse, inAuctionCarsResponse, generalEntriesResponse] =
    await Promise.all([
      axios.get(`${apiUrl}carStatement/shippedCars`, {
        params: {
          arrived_status: '1',
          remaining_status: '0',
          transfer_status: '0',
          currency: '0',
          date_from: '2021-01-01',
          date_to: '',
        },
      }),
      axios.get(`${apiUrl}carStatement/carsInAuction`, {
        params: {
          arrived_status: '1',
          remaining_status: '0',
          transfer_status: '0',
          currency: '0',
          date_from: '2021-01-01',
          date_to: '',
        },
      }),
      axios.get(`${apiUrl}carStatement/generalEntries`, {
        params: {
          arrived_status: '1',
          remaining_status: '0',
          transfer_status: '0',
          currency: '0',
          date_from: '2021-01-01',
          date_to: '',
        },
      }),
    ]);
  const [shippedCars, inAuctionCars, generalEntries] = await Promise.all([
    shippedCarsResponse.data.data,
    inAuctionCarsResponse.data.data,
    generalEntriesResponse.data.data,
  ]);

  return { shippedCars, inAuctionCars, generalEntries };
};

const Statement = ({ shippedCars, inAuctionCars, generalEntries }) => {
  // const { data: session } = useSession();

  // const [shippedCars, setShippedCars] = useState([]);
  // const [inAuctionCars, setInAuctionCars] = useState([]);
  // const [generalEntries, setGeneralEntries] = useState([]);
  // const [carStatus, setCarStatus] = useState(1);

  // const handelSubmit = async (e) => {
  //   e.preventDefault();

  //   const { shippedCars, inAuctionCars, generalEntries } =
  //     await getStatementData(session, apiUrl);
  //     console.log('inAuctionCars');
  //     console.log(inAuctionCars);
  // };

  return (
    <Layout meta="">
      <div className="mx-auto px-8">
        <div className="m-4">
          <h4 className="text-dark-blue py-4 text-center text-xl font-semibold sm:text-3xl">
            General Statment
          </h4>
        </div>
        <p className="py-3">
          <i className="material-icons text-yellow-orange align-middle text-5xl">
            &#xe164;
          </i>
          <span className="text-dark-blue ml-4 align-middle text-4xl">
            Filter
          </span>
        </p>

        <form className="mt-4 mb-12" method="get">
          <div className="my-8 flex gap-10">
            <select
              name="car_status"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg italic text-gray-700"
            >
              <option>Car Status</option>
              <option value="3">All</option>
              <option value="1">Arrived Cars</option>
              <option value="2">Not Arrived</option>
            </select>
            <select
              name="payment_status"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg italic text-gray-700"
            >
              <option>Payment Status</option>
              <option value="3">All</option>
              <option value="1">Paid</option>
              <option value="2">UnPaid</option>
            </select>
            <select
              name="transfer"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg italic text-gray-700"
            >
              <option>Transfer</option>
              <option value="3">All</option>
              <option value="1">Paid</option>
              <option value="2">UnPaid</option>
            </select>
            <select
              name="currency"
              className="border-medium-grey basis-[15%] rounded-md border py-1 text-lg italic text-gray-700"
            >
              <option value="aed">AED</option>
              <option value="usd">USD</option>
            </select>
            <div className="flex basis-[40%] gap-8">
              <input
                name="date_from"
                type="date"
                className="border-medium-grey basis-1/2 rounded-md border py-1 italic text-gray-700"
              />
              <input
                name="date_from"
                type="date"
                className="border-medium-grey basis-1/2 rounded-md border py-1 italic text-gray-700"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-blue block rounded-md py-1 px-4 text-xl font-medium text-white hover:border-0 hover:bg-blue-400"
              // onClick={() => {
              //   setCarStatus(2);
              // }}
            >
              Submit
            </button>
          </div>
        </form>

        {shippedCars !== undefined ? (
          <ShippedCars tableData={shippedCars} />
        ) : null}

        {inAuctionCars !== undefined ? (
          <InAuctionCars tableData={inAuctionCars} />
        ) : null}

        {generalEntries !== undefined ? (
          <GeneralEntries tableData={generalEntries} />
        ) : null}

        <div className="mt-20 flex justify-between">
          <h3 className="text-dark-blue my-4 self-start py-4 text-2xl font-semibold">
            Deposit
          </h3>
          <input
            type="text"
            placeholder="Search"
            className="border-medium-grey my-4 basis-1/6 self-end rounded-md border py-1 text-lg italic text-gray-700"
          />
        </div>
        <div className="border-azure-blue overflow-hidden rounded-xl border">
          <table className="w-full table-auto">
            <thead>
              <tr className="w-full">
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  No.
                </td>
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  Serial No.
                </td>
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  Amount
                </td>
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  Paid
                </td>
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  Balance
                </td>
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  Date
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-light-grey">
                <td className="text-dark-blue px-3 py-1 text-xl font-semibold">
                  1
                </td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">1937402384</td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">123123</td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">123123</td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">123123</td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">13-4-22</td>
              </tr>
              <tr className="">
                <td className="text-dark-blue p-1 text-xl font-semibold">1</td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">1937402384</td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">123123</td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">123123</td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">123123</td>
                <td className="px-3 py-1 text-lg text-[#1C1C1C]">13-4-22</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(context.query);
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  const apiUrl = process.env.API_URL;
  const [shippedCarsResponse, inAuctionCarsResponse, generalEntriesResponse] =
    await Promise.all([
      axios.get(`${apiUrl}carStatement/shippedCars`, {
        params: {
          arrived_status: '1',
          remaining_status: '0',
          transfer_status: '0',
          currency: '0',
          date_from: '2021-01-01',
          date_to: '',
        },
      }),
      axios.get(`${apiUrl}carStatement/carsInAuction`, {
        params: {
          arrived_status: '1',
          remaining_status: '0',
          transfer_status: '0',
          currency: '0',
          date_from: '2021-01-01',
          date_to: '',
        },
      }),
      axios.get(`${apiUrl}carStatement/generalEntries`, {
        params: {
          arrived_status: '1',
          remaining_status: '0',
          transfer_status: '0',
          currency: '0',
          date_from: '2021-01-01',
          date_to: '',
        },
      }),
    ]);
  const [shippedCars, inAuctionCars, generalEntries] = await Promise.all([
    shippedCarsResponse.data.data,
    inAuctionCarsResponse.data.data,
    generalEntriesResponse.data.data,
  ]);
  return {
    props: {
      session,
      apiUrl: process.env.API_URL,
      shippedCars,
      inAuctionCars,
      generalEntries,
    },
  };
}

export default Statement;
