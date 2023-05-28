import axios from 'axios';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import styles from '@/components/containers/invoicePrint.module.css';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

const { API_URL } = process.env;
const ContainerInvoice = ({ invoice }) => {
  const { accountName, iban, accountNumber } = invoice.bankDetail;
  const {
    container_number: containerNumber,
    booking_number: bookingNumber,
    etd,
    shipper_name: shipperName,
    pod_name: podName,
    pol_name: polName,
    totalAmount,
    paidAmount,
    balance,
  } = invoice.container;

  const { cars } = invoice;

  useEffect(() => {
    console.log(invoice);
  }, []);

  return (
    <section
      className={`container mx-auto bg-white print:shadow-none shadow-md ${styles.container}`}
    >
      {/* <div className="header print:fixed print:left-10 print:top-2 print:h-[90px]"> */}
      <div className="header">
        <img
          src={`/assets/images/InvoiceLogo.png`}
          alt="Nejoum Al Jazeera"
          className="w-full"
        />
      </div>
      <Head>
        <title>Container Invoice</title>
      </Head>
      <div className="p-5">
        <div className="text-light-grey bg-dark-blue mt-5 flex justify-between rounded-xl border-2 p-2 font-bold">
          <h4>EMIRATES NBD BANK</h4>
          <h4>بنك الإمارات دبي الوطني </h4>
        </div>

        <table className="w-full">
          <tbody>
            <tr>
              <td className="w-1/4 font-bold">Account Name:</td>
              <td>{accountName}</td>
            </tr>
            <tr>
              <td className="w-1/4 font-bold">IBAN:</td>
              <td>{iban}</td>
            </tr>
            <tr>
              <td className="w-1/5 font-bold">Account Number:</td>
              <td className="w-full">{accountNumber}</td>
            </tr>
          </tbody>
        </table>

        <div className="border-light-grey my-4 border-2 border-dashed"></div>

        <div className="text-light-grey bg-dark-blue mt-5 mt-5 flex flex justify-between justify-between rounded-xl border-2 p-2 font-bold">
          <h4>Bill Information</h4>
          <h4>  تفاصيل الفاتورة</h4>
        </div>
        <div className="my-2 flex justify-between font-bold">
          <div>
            <p>Full Name</p>
            <p>Location</p>
            <p>Country</p>
            <p>Phone Number</p>
          </div>
          <div className="text-center">
            <p>Nejoum Al Jazeera</p>
            <p>Industiral Area 4, Head Office</p>
            <p>UAE</p>
            <p>+971 65 440 202</p>
          </div>
          <div className="text-right">
            <p>الاسم بالكامل</p>
            <p>الموقع</p>
            <p>البلد</p>
            <p>رقم الهاتف</p>
          </div>
        </div>

        <div className="text-light-grey bg-dark-blue mt-5 mt-5 flex flex justify-between justify-between rounded-xl border-2 p-2 font-bold">
          <h4>Cargo Information</h4>
          <h4>{containerNumber}</h4>
          <h4>معلومات الحاوية </h4>
        </div>

        <table className="my-2 w-full">
          <tbody>
            <tr>
              <td>
                <h5>Shipper/الشاحن</h5>
              </td>
              <td>
                <h5>{shipperName}</h5>
              </td>
              <td>
                <h5>Booking Num/رقم الحجز</h5>
              </td>
              <td>
                <h5>{bookingNumber}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Origin/اصل</h5>
              </td>
              <td>
                <h5>{polName}</h5>
              </td>
              <td>
                <h5>Destination/الوجهة</h5>
              </td>
              <td>
                <h5>{podName}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Sailing Date/تاريخ الإبحار</h5>
              </td>
              <td>
                <h5>{etd}</h5>
              </td>
              <td>
                <h5>Contatiner/حاوية</h5>
              </td>
              <td>
                <h5>{containerNumber}</h5>
              </td>
            </tr>
          </tbody>
        </table>

        {cars && cars.length > 1 ? (
          <table className="my-10 w-full">
            <thead className="text-light-grey bg-dark-blue mt-5">
              <tr>
                <th className="rounded-tl-xl">وصف</th>
                <th> المزاد</th>
                <th>سعر</th>
                <th> النقل الداخلي</th>
                <th>شحن</th>
                <th>تخليص</th>
                <th>أخرى</th>
                <th className="rounded-tr-xl">المجموع</th>
              </tr>
              <tr>
                <th className="rounded-bl-xl">Description</th>
                <th>Auction</th>
                <th>Price</th>
                <th>Towing</th>
                <th>Shipping</th>
                <th>Clearance</th>
                <th>Other</th>
                <th className="rounded-br-xl">Total</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((car, i) => (
                <tr key={i}>
                  <td className="border-dark-blue border-r-2">
                    <div className="my-2">
                      {`${car.carMakerName} ${car.carModelName} ${car.year}`}{' '}
                      <br />
                      Lot: {car.lotnumber} <br />
                      VIN: {car.vin} <br />
                    </div>
                  </td>
                  <td className="border-dark-blue border-r-2 pl-8">
                    {car.auction_title}
                  </td>
                  <td className="border-dark-blue border-r-2 pl-8">
                    ${car.car_cost}
                  </td>
                  <td className="border-dark-blue border-r-2 pl-8">
                    AED  {parseFloat(car?.shippingAmount || 0).toFixed(2)}
                  </td>
                  <td className="border-dark-blue border-r-2 pl-8">
                    AED {parseFloat(car?.clearanceAmount || 0).toFixed(2)}
                  </td>
                  <td className="border-dark-blue border-r-2 pl-8">
                    AED {parseFloat(car?.towingAmount || 0).toFixed(2)}
                  </td>
                  <td className="border-dark-blue border-r-2 pl-8">
                    AED {parseFloat(car?.otherAmount || 0).toFixed(2)}
                  </td>
                  <td className="pl-8">AED {parseFloat(car?.totalAmount || 0).toFixed(2)}</td>
                </tr>
                
              ))}
             
            </tbody>
          </table>
        ) : null}

        <div className="flex justify-between">
          <div className="w-1/3 pt-16">
            <h3 className="text-lg font-bold">Terms & Condition</h3>
            <p className="text-xs">
              PLEASE BE ADVISED THAT THIS INVOICE HAS BEEN AMENDED ON{' '}
              {new Date().toLocaleDateString()}
            </p>
            <p className="text-xs">
              CASH, MONEY ORDERS, OR THIRD-PARTY PAYMENTS WILL NOT BE ACCEPTED.
            </p>
          </div>
          <div className="w-1/3 print:w-1/2">
            <div className="flex justify-between">
              <h4 className="text-xl font-bold">Total/إجمالي</h4>
              <h4 className="text-xl font-bold">
                AED {totalAmount.toFixed(2)}
              </h4>
            </div>
            <div className="mt-2 flex justify-between">
              <h4 className="text-xl font-bold">Payment/دفع</h4>
              <h4 className="text-xl font-bold">AED {paidAmount}</h4>
            </div>

            <div className="border-dark-blue my-4 border-2"></div>

            <div className="flex justify-between">
              <h4 className="text-xl font-bold">Balance Due/الرصيد المستحق</h4>
              <h4 className="text-xl font-bold">AED {balance}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 print:bottom-0 print:left-0 print:h-[3.7rem]">
        <img
          src={`/assets/images/footer-new.jpg`}
          alt="Nejoum Al Jazeera"
          className="w-full"
        />
      </div>
    </section>
  );
};
export default ContainerInvoice;

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;

  const session: any = await getSession(context);
  const containerId = context.query?.id || 0;

  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  const response = await axios.get(`${API_URL}customer/container/invoice`, {
    params: {
      container_id: containerId,
    },
  });

  const invoice = response?.data;

  return {
    props: {
      invoice,
    },
  };
}
