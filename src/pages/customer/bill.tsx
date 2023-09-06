import axios from 'axios';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { classNames } from '@/utils/Functions';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

const Bill = ({
  billDetails,
  totalDebit,
  totalCredit,
  amountRemaining,
  car_id,
}) => {
  const router = useRouter();
  const currency = router.query?.currency || 'aed';
  const [printButtonLabel, setPrintButtonLabel] = useState('Print');

  const printShippingBill = async (e) => {
    e.stopPropagation();
    setPrintButtonLabel('Printing...');

    const res = await axios.get(`/api/customer/shipping/billDetails`, {
      params: { car_id, currency },
    });
    const html = res.data ? res.data.html : '';

    const win = window.open(
      '',
      'Shipping Statement',
      `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${
        window.screen.width - 300
      },height=${window.screen.height - 300}`
    );
    setPrintButtonLabel('Print');
    if (win) {
      win.document.body.innerHTML = html;
      setTimeout(() => {
        win.document.close();
        win.focus();
        win.print();
        win.close();
      }, 500);
    }
  };

  return (
    <Layout meta={<Meta title="Bill" description="" />}>
      <div className="mx-auto px-8">
        <div className="m-4">
          <h4 className="text-dark-blue py-4 text-2xl font-semibold md:text-3xl xl:text-4xl">
            <FormattedMessage id="page.customer.bill.shipping.title" />
            <button
              className="ml-4 mb-4 rounded bg-blue-500 py-2 px-4 text-lg font-bold text-white hover:bg-blue-700"
              onClick={(e) => printShippingBill(e)}
            >
              {printButtonLabel}
            </button>
          </h4>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-600">
          <table className="w-full table-auto  overflow-x-scroll">
            <thead>
              <tr className="w-full">
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  <FormattedMessage id="page.customer.dashboard.table.no" />
                </td>
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  <FormattedMessage id="page.customer.dashboard.table.detail" />
                </td>
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  <FormattedMessage id="statement.shipped_cars.debit" />
                </td>
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  <FormattedMessage id="statement.shipped_cars.credit" />
                </td>
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  <FormattedMessage id="page.customer.dashboard.table.notes" />
                </td>
              </tr>
            </thead>
            <tbody>
              {billDetails.map((row, index) => (
                <tr
                  key={index}
                  className={classNames(
                    index % 2 === 0 ? 'bg-light-grey' : '',
                    'text-xs sm:text-[17px]'
                  )}
                >
                  <td className="text-dark-blue w-[8%] min-w-[60px] p-3 text-xl font-semibold">
                    {index + 1}
                  </td>
                  <td className="w-[35%] p-3 text-lg text-[#1C1C1C] sm:min-w-[320px]">
                    <span className="mr-2 font-semibold sm:float-left sm:w-[26%]">
                      {row.service_label_en}
                    </span>
                    {row.service_label_ar}
                  </td>
                  <td className="w-[8%] p-3 text-lg text-[green] ">
                    {row.debit}
                  </td>
                  <td className="w-[8%] p-3 text-lg text-[#b51414]">
                    {row.credit}
                  </td>
                  <td className="w-[68%] p-3 text-lg text-[#1C1C1C]">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-2 overflow-hidden rounded-xl border border-gray-600">
          <table className="w-full table-auto  overflow-x-scroll">
            <tfoot>
              <tr className="font-semibold">
                <td className="w-[8%] p-3"></td>
                <td className="w-[35%] p-3 text-lg font-semibold text-[#1C1C1C]  sm:min-w-[320px]">
                  <FormattedMessage id="page.customer.dashboard.table.Total" />
                </td>
                <td className="w-[8%] p-3 text-lg text-[green] ">
                  {totalDebit.toFixed(2)}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#b51414]">
                  {totalCredit.toFixed(2)}
                </td>
                <td className="w-[68%] p-3 text-lg text-[#1C1C1C]"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="my-2 overflow-hidden rounded-xl border border-gray-600">
          <table className="w-full table-auto  overflow-x-scroll">
            <tfoot>
              <tr className="font-semibold">
                <td className="w-[8%] p-3"></td>
                <td className="w-[35%] p-3 text-lg font-semibold text-[#1C1C1C]  sm:min-w-[320px]">
                  <FormattedMessage id="page.customer.dashboard.table.amount_remaining" />
                </td>
                <td className="w-[8%] p-3 text-lg text-[green] ">
                  {amountRemaining >= 0 ? amountRemaining : ''}
                </td>
                <td className="text-dark-blue w-[8%] p-3 text-lg">
                  {amountRemaining < 0 ? amountRemaining : ''}
                </td>
                <td className="w-[68%] p-3 text-lg text-[#1C1C1C]"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;
  const session: any = await getSession(context);

  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  axios.defaults.timeout = 300000;
  const apiUrl = process.env.API_URL;
  let carsData = {};
  const car = context.query.car ? context.query.car : '';
  const { currency } = context.query;
  try {
    if (car && session && session.token && session.token.access_token) {
      axios.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
      await axios
        .get(`${apiUrl}car/shippingBillDetail/${car}`, {
          params: { currency },
        })
        .then((response) => {
          // handle success
          carsData = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const billDetails = carsData.data ? carsData.data : [];
    const amountRemaining = carsData.total ? carsData.total : 0;
    let totalDebit = 0;
    let totalCredit = 0;
    billDetails.forEach((element) => {
      totalDebit += parseFloat(element.debit);
      totalCredit += parseFloat(element.credit);
    });
    return {
      props: {
        billDetails,
        totalDebit,
        totalCredit,
        amountRemaining,
        car_id: car,
      },
    };
  } catch (err) {
    return NetworkStatus.LOGIN_PAGE;
  }
}

export default Bill;
