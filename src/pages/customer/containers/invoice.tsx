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
      className={`text-[10px] container mx-auto bg-white print:shadow-none shadow-md ${styles.container}`}
    >

      <div className="grid grid-cols-3 p-5">
          <div className='mt-[12px]'>
            <Image src={`/assets/images/logo-en.png`} width="450px" height="120px" alt="" />
          </div>
          <div className='mt-[11px]'>
            <Image src={`/assets/images/logo-ar.png`} width="450px" height="120px" alt="" />
          </div>
          <div className='mt-[15px] print:mt-[5px] ml-[20px] text-[13px]'>
            <p className='font-bold'>Nejoum Aljazeera Used Cars L.L.C.</p>
            <p>Industiral Area 4, Head Office</p>
            <p>Sharjah, UAE</p>
            <p>info@naj.ae | +971 65 440 202</p>
            <p>www.naj.ae </p>
          </div>
      </div>
      <Head>
        <title>Container Invoice</title>
      </Head>
      <div className="p-5 mr-3px">

        <div className="grid grid-cols-4 gap-4 font-bold pl-2 pr-2 -mt-[25px] print:-mt-[45px]">
          <div className='col-span-2'>
            <p className='font-bold text-[12px]'>Bank Details</p>
            <div className="border-dark-blue border-[1px] border-solid w-[100%] ">
              </div>
          </div>
          <div className='col-span-2'>
            <p className='font-bold text-[12px]'>Invoice</p>
                <div className="border-dark-blue border-[1px] border-solid w-[100%] ">
                  </div>
          </div>
       
            <div>
              <p>Bank Name : </p>
              <p>Bank Address : </p>
              <p>IBAN : </p>
              <p>Account Number : </p>
              <p>Swift code for international wires  : </p>
            </div>
            <div>
              <p>{accountName}</p>
                <p>Sharjah, UAE</p>
                <p>{iban}</p>
                <p>{accountNumber}</p>
                <p></p>
            </div>
            <div>
              <p>Number :</p>
              <p>Creation Date : </p>
              <p>Due Date : </p>
              <p>Post Due Days : </p>
              <p>Invoice printed : </p>
            </div>
            <div>
              <p>1111111</p>
              <p>{new Date().toLocaleDateString()}</p>
              <p>2023-11-11</p>
              <p>2023-11-11</p>
              <p>2023-11-11</p>
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
                        <td className='border-r border-dark-blue'>$0</td>
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
          <h4>{containerNumber}</h4>
          <h4>معلومات الحاوية </h4>
        </div>

        <table className="ml-2 w-full ">
          <tbody>
            <tr>
              <td>
                <h5>Shipper/الشاحن</h5>
              </td>
              <td>
                <h5>Nejoum Al Jazeera</h5>
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
                <h5>Carrier/الناقل</h5>

              </td>
              <td>
                <h5>{shipperName}</h5>
              </td>
              <td>
                <h5>Contatiner/حاوية</h5>
              </td>
              <td>
                <h5>{containerNumber}</h5>
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
                <h5></h5>
              </td>
              <td>
                <h5></h5>
              </td>
            </tr>
          </tbody>
        </table>

        {cars && cars.length > 1 ? (
          <table className="my-3 w-full font-bold mt-[40px]">
            <thead className="text-dark-blue border-dark-silver  mt-1 rounded-xl border-[1px] p-2">
              <tr>
                <th>وصف</th>
                <th className='border-l-[1px] border-dark-silver'> المزاد</th>
                <th className='border-l-[1px] border-dark-silver'>سعر</th>
                <th className='border-l-[1px] border-dark-silver'> النقل الداخلي</th>
                <th className='border-l-[1px] border-dark-silver'>شحن</th>
                <th className='border-l-[1px] border-dark-silver'>تخليص</th>
                <th className='border-l-[1px] border-dark-silver'>التأخر في السداد</th>
                <th className='border-l-[1px] border-dark-silver'>رافعة شوكية</th>
                <th className='border-l-[1px] border-dark-silver'>تخزين المزاد</th>
                <th className='border-l-[1px] border-dark-silver'>أخرى</th>
                <th className='border-l-[1px] border-dark-silver' >المجموع</th>
              </tr>
              <tr>
                <th>Description</th>
                <th className='border-l-[1px] border-dark-silver'>Auction</th>
                <th className='border-l-[1px] border-dark-silver'>Price</th>
                <th className='border-l-[1px] border-dark-silver'>Towing</th>
                <th className='border-l-[1px] border-dark-silver'>Shipping</th>
                <th className='border-l-[1px] border-dark-silver'>Clearance</th>
                <th className='border-l-[1px] border-dark-silver'>Late Payment</th>
                <th className='border-l-[1px] border-dark-silver'>Forklift</th>
                <th className='border-l-[1px] border-dark-silver'>Auction Storage</th>
                <th className='border-l-[1px] border-dark-silver'>Other</th>
                <th className='border-l-[1px] border-dark-silver'>Total</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {cars.map((car, i) => (
                <tr key={i}>
                  <td className="border-dark-silver border-b-[1px] border-l-[1px]  border-r-[1px] text-left">
                    <div className="mt-1.5 pl-[1px]">
                      {`${car.carMakerName} ${car.carModelName} ${car.year}`}{' '}
                      <br />
                      {/* Lot: {car.lotnumber} <br /> */}
                      VIN: {car.vin} <br />
                    </div>
                  </td>
                  <td className="border-dark-silver border-r-[1px] border-b-[1px] ">
                    {car.auction_title}
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px]">
                    ${car.car_cost}
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px]">
                      {car?.shippingAmount || 0}
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px]">
                     {car?.clearanceAmount || 0}
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px]">
                     {car?.towingAmount || 0}
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px]">
                      {car?.shippingAmount || 0}
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px]">
                     {car?.clearanceAmount || 0}
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px]">
                     {car?.towingAmount || 0}
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px]">
                     {car?.otherAmount || 0}
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px]"> {car?.totalAmount || 0}</td>
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
                  <td className="border-dark-silver border-l-[1px] border-b-[1px] border-r-[1px] text-left">
                    Total/إجمالي
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px] ">
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
                  <td className="border-dark-silver border-l-[1px] border-b-[1px] border-r-[1px] text-left">
                    Payment/دفع
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px] ">
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
                  <td className="border-dark-silver border-l-[1px] border-b-[1px] border-r-[1px] text-left">
                    Balance Due/الرصيد المستحق
                  </td>
                  <td className="border-dark-silver border-b-[1px] border-r-[1px] ">
                    {balance}
                  </td>
                 </tr>

       
             
            </tbody>
          </table>
        ) : null}


      <div className="grid justify-items-center  text-dark-blue mt-10 print:fixed print:bottom-[25px] print:left-[18%]">
          {/* <h3 className="text-lg font-bold">Terms & Condition</h3> */}

                <div >
                  <p className='text-[14px]'>
                  يرجى العلم بأنه تم تعديل هذا الفاتورة في {new Date().toLocaleDateString()} {' '}
                    
                  </p> 
                </div>
                <div>
                  <p className=" font-bold text-[15px]">
                  لن يتم قبول النقد أو الأوامر المالية أو مدفوعات الطرف 
الثالث
                  </p>
                </div>
                <div className='mt-5'>
                  <p className='tracking-wide text-[14px]'>
                    PLEASE BE ADVISED THAT THIS INVOICE HAS BEEN AMENDED ON {' '}
                    {new Date().toLocaleDateString()}
                  </p> 
                </div>
                <div>
                  <p className=" font-bold tracking-wide text-[15px]">
                    CASH, MONEY ORDERS, OR THIRD-PARTY PAYMENTS WILL NOT BE ACCEPTED.
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
