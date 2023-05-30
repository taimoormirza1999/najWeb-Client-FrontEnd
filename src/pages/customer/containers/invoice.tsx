import axios from 'axios';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import styles from '@/components/containers/invoicePrint.module.css';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';
import { ScissorsIcon } from '@heroicons/react/solid';
import Image from 'next/image';

const { API_URL } = process.env;
const ContainerInvoice = ({ invoice }) => {
  const { accountName, iban, accountNumber } = invoice.bankDetail;
  const {
    invoice_no,
    container_number,
    invoice_create_date,
    due_date,
    printed_date,
    post_due_date,
    booking_number,
    etd,
    shipper_name,
    pod_name,
    pol_name,
    carrier_name,
    consignee_name,
    totalAmount,
    paidAmount,
    balance,
  } = invoice.container;

  const { cars } = invoice;

  // useEffect(() => {
  //   console.log(invoice);
  // }, []);

  return (
    <section
      className={`text-[10px] container mx-auto bg-white print:shadow-none shadow-md ${styles.container}`}
    >

      <div className="grid grid-cols-3 p-5">
          <div className='mt-[15px] ml-[5px]'>
            <Image src={`/assets/images/InvoiceLogo.png`} width="750px" height="170px" alt="" />
          </div>
          <div className='mt-[11px]'>
            {/* <Image src={`/assets/images/logo-ar.png`} width="450px" height="120px" alt="" /> */}
          </div>

          <div className='mt-[15px] print:mt-[5px] ml-[20px] text-[12px] text-dark-blue'>
            <span className='float-left'>+971 6 544 0202</span>
            <span className='float-right'>/NejoumAljazeera</span> <br/>
            <span className='float-left'>info@naj.ae</span>
            <span className='float-right'>www.naj.ae</span> <br/>
            <div>
              <span className='font-bold'>NEJOUM</span>
              <span> ALJAZEERA GROUP</span>
            </div>
            <p>P.OBOX. : 37027 - Industrial Area 4,</p>
            <p>Sharjah, United Arab Emirates</p>
          </div>
      </div>
      <Head>
        <title>Container Invoice</title>
      </Head>
      <div className="p-5 mr-3px">

        <div className="grid grid-cols-4 gap-4 font-bold pl-2 pr-2 -mt-[20px] print:-mt-[32px]">
          <div>
              <p className='font-bold text-[12px]'>Bank Details</p>
          </div>
          <div>
            <p className='font-bold text-[12px] float-right'>التفاصيل المصرفية</p>
          </div>
          <div>
            <p className='font-bold text-[12px]'>Invoice</p>
          </div>
          <div>
            <p className='font-bold text-[12px] float-right mr-[5px]'>فاتورة</p>
          </div>

          <div className='col-span-2 -mt-[15px]'>
            <div className="border-dark-blue border-[1px] border-solid w-[100%] ">
              </div>
          </div>
          <div className='col-span-2 -mt-[15px]'>
                <div className="border-dark-blue border-[1px] border-solid w-[100%] ">
                  </div>
          </div>
            <div className='-mt-[22px]'>
              <p>Bank Name : </p>
              <p>Bank Address : </p>
              <p>IBAN : </p>
              <p>Account Number : </p>
              <p>Swift code for international wires  : </p>
            </div>
            <div className='-mt-[22px]'>
              <p>{accountName}</p>
                <p>Sharjah, UAE</p>
                <p>{iban}</p>
                <p>{accountNumber}</p>
                <p></p>
            </div>
            <div className='-mt-[22px]'>
              <p>Number :</p>
              <p>Creation Date : </p>
              <p>Due Date : </p>
              <p>Past Due Days : </p>
              <p>Invoice printed : </p>
            </div>
            <div className='-mt-[22px]'>
              <p>{invoice_no}</p>
              <p>{invoice_create_date}</p>
              <p>{due_date}</p>
              <p>{post_due_date}</p>
              <p>{printed_date}</p>
            </div>
        </div>
        <div className="grid grid-cols-4 gap-2 font-bold pl-2 pr-2">
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
           
            <div>
            <table className='w-full text-center mt-2'>
                    <thead className="text-dark-blue border border-dark-blue">
                      <tr>
                        <th className='border-r border-dark-blue'>Balance Due</th>
                        <th>Enclosed</th>
                      </tr>
                    </thead>
                    <tbody className="text-dark-blue border border-dark-blue">
                      <tr>
                        <td className='border-r border-dark-blue'>{balance}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
            </div>
        </div>

        <div className="text-center">
          <p>Please detatch top portion and return with your payment.</p>
        </div>
        <div>
        <div className="border-light-grey border-2 border-dashed w-[97%] mt-[30px]">
        </div>
          <ScissorsIcon 
            className="h-6 w-6 text-light-grey float-right mt-[-14px] rotate-180"
            aria-hidden="true"
            />
        </div>

        <div className="text-dark-blue border-dark-blue mt-[30px] flex  justify-between rounded-xl border-2 p-2 font-bold text-[12px]">
          <h4>Bill Information</h4>
          <h4>  تفاصيل الفاتورة</h4>
        </div>
        <div className="pl-2 pr-2 my-2 flex justify-between">
          <div className='font-bold'>
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
          <div className="text-right font-bold mr-[5px]">
            <p>الاسم بالكامل</p>
            <p>الموقع</p>
            <p>البلد</p>
            <p>رقم الهاتف</p>
          </div>
        </div>

        <div className="text-dark-blue border-dark-blue flex justify-between rounded-xl border-2 p-2 font-bold mt-5 text-[12px]">
          <h4>Cargo Information</h4>
          <h4>{container_number}</h4>
          <h4>معلومات الحاوية </h4>
        </div>

        <table className="ml-2 w-full ">
          <tbody>
            <tr>
              <td>
                <h5>Shipper/الشاحن</h5>
              </td>
              <td>
                <h5>{shipper_name}</h5>
              </td>
              <td>
                <h5>Consignee/ المرسل إليه</h5>
              </td>
              <td>
                <h5>{consignee_name}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Origin/اصل</h5>
              </td>
              <td>
                <h5>{pol_name}</h5>
              </td>
              <td>
                <h5>Destination/الوجهة</h5>
              </td>
              <td>
                <h5>{pod_name}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h5>Carrier/الناقل</h5>

              </td>
              <td>
                <h5>{carrier_name}</h5>
              </td>
              <td>
                <h5>Contatiner/حاوية</h5>
              </td>
              <td>
                <h5>{container_number}</h5>
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
                <h5>Booking Num/رقم الحجز</h5>
              </td>
              <td>
                <h5>{booking_number}</h5>
              </td>
            </tr>
          </tbody>
        </table>

        {cars && cars.length > 1 ? (
          <table className="my-3 w-full font-bold mt-[40px] '">
            <thead className="text-dark-blue border-[#c0c0c0] mt-1 rounded-xl border-[1px] p-2 ">
              <tr>
                <th>وصف</th>
                <th className='border-l-[1px] border-[#c0c0c0]'> المزاد</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>سعر</th>
                <th className='border-l-[1px] border-[#c0c0c0]'> النقل الداخلي</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>شحن</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>تخليص</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>التأخر في السداد</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>رافعة شوكية</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>تخزين المزاد</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>أخرى</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>المجموع</th>
              </tr>
              <tr>
                <th>Description</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Auction</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Price</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Towing</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Shipping</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Clearance</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Late Payment</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Forklift</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Auction Storage</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Other</th>
                <th className='border-l-[1px] border-[#c0c0c0]'>Total</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {cars.map((car, i) => (
                <tr key={i}>
                  <td className="border-[#c0c0c0] border-b-[1px] border-l-[1px]  border-r-[1px] text-left">
                    <div className="mt-1.5 pl-[1px]">
                      {`${car.carMakerName} ${car.carModelName} ${car.year}`}{' '}
                      <br />
                      {/* Lot: {car.lotnumber} <br /> */}
                      VIN: {car.vin} <br />
                    </div>
                  </td>
                  <td className="border-[#c0c0c0] border-r-[1px] border-b-[1px] ">
                    {car.auction_title}
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px]">
                    {car.car_cost}
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px]">
                      {car?.towingAmount || 0}
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px]">
                     {car?.shippingAmount || 0}
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px]">
                     {car?.clearanceAmount || 0}
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px]">
                      {car?.latePaymentAmount	 || 0}
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px]">
                     {car?.forkliftAmount || 0}
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px]">
                     {car?.auctionFineAmount  || 0}
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px]">
                     {car?.otherAmount || 0}
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px]"> {car?.totalAmount || 0}</td>
                </tr>
              ))}


              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                  <td className="border-[#c0c0c0] border-l-[1px] border-b-[1px] border-r-[1px] text-left">
                    Total/إجمالي
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px] text-left">
                    {totalAmount.toFixed(2)}
                  </td>
                 </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                  <td className="border-[#c0c0c0] border-l-[1px] border-b-[1px] border-r-[1px] text-left">
                    Payment/دفع
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px] text-left">
                    {paidAmount.toFixed(2)}
                  </td>
                 </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                  <td className="border-[#c0c0c0] border-l-[1px] border-b-[1px] border-r-[1px] text-left">
                    Balance Due/الرصيد المستحق
                  </td>
                  <td className="border-[#c0c0c0] border-b-[1px] border-r-[1px] text-left">
                  {balance.toFixed(2)}
                  </td>
                 </tr>

       
             
            </tbody>
          </table>
        ) : null}

          <div className="grid grid-cols-2 text-dark-blue print:bottom-[50px] print:fixed mr-[40px]">
                <div>
                    <p className='tracking-wide text-[10px]'>
                        PLEASE BE ADVISED THAT THIS INVOICE HAS BEEN AMENDED ON {' '}
                        {new Date().toLocaleDateString()}
                      </p> 
                      <p className=" font-bold tracking-wide text-[10px]">
                        CASH, MONEY ORDERS, OR THIRD-PARTY PAYMENTS WILL NOT BE ACCEPTED.
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-[14px]'>
                    يرجى العلم بأنه تم تعديل هذا الفاتورة في {new Date().toLocaleDateString()} {' '}
                    </p> 
       
                    <p className="font-bold text-[14px]">
                  لن يتم قبول النقد أو الأوامر المالية أو مدفوعات الطرف 
الثالث
                  </p>
                </div>
          </div>
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
