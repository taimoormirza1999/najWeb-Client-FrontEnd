import { ScissorsIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React, { useContext } from 'react';

import styles from '@/components/containers/invoicePrint.module.css';
import { UserContext } from '@/components/userContext';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

const { API_URL } = process.env;
const ContainerInvoice = ({ invoice }) => {
  const router = useRouter();
  const { profile } = useContext(UserContext);
  const isTareekAlInsaf =
    invoice.container.full_name_en === 'Tareq Al Insaf Used Cars'; // later change to id

  const { bankName, bankAddress, accountName, iban, accountNumber, swiftCode } =
    invoice.bankDetail;
  const {
    invoice_no,
    container_number,
    invoice_create_date,
    port_arrival_date,
    due_date,
    printed_date,
    past_due_days,
    customer_name_en,
    customer_country,
    customer_state,
    customer_city,
    customer_phone,
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

  const handleCurrencyChange = (e) => {
    const { pathname, query } = router;
    query.currency = e.target.value;

    router.push({
      pathname,
      query,
    });
  };

  return (
    <section
      className={`text-[10px] container mx-auto bg-white print:shadow-none shadow-md ${styles.container}`}
    >
      <div className="grid grid-cols-3 p-5">
        <div className="mt-[15px] ml-[5px]">
          <Image
            src={`/assets/images/InvoiceLogo.png`}
            width="750px"
            height="170px"
            alt=""
          />
        </div>
        <div className="mt-[11px]">
          {/* <Image src={`/assets/images/logo-ar.png`} width="450px" height="120px" alt="" /> */}
        </div>

        <div className="text-dark-blue mt-[15px] ml-[20px] text-[12px] print:mt-[5px]">
          <select
            name="currency"
            onChange={handleCurrencyChange}
            defaultValue={'usd'}
            className="border-dark-blue -mt-5 mb-4 border px-3 py-[2px] pr-8 print:hidden"
          >
            <option value="aed">UAE Dirham</option>
            <option value="usd">US Dollar</option>
          </select>
          <span className="float-left">+971 6 544 0202</span>
          <span className="float-right">/NejoumAljazeera</span> <br />
          <span className="float-left">info@naj.ae</span>
          <span className="float-right">www.naj.ae</span> <br />
          <div>
            <span className="font-bold">NEJOUM</span>
            <span> ALJAZEERA GROUP</span>
          </div>
          <p>P.OBOX. : 37027 - Industrial Area 4,</p>
          <p>Sharjah, United Arab Emirates</p>
        </div>
      </div>
      <Head>
        <title>Container Invoice</title>
      </Head>
      <div className="mr-3px p-5">
        <div className="-mt-[20px] grid grid-cols-4 gap-4 px-2 font-bold print:-mt-[32px]">
          <div>
            <p className="text-[12px] font-bold">Bank Details</p>
          </div>
          <div>
            <p className="float-right text-[12px] font-bold">تفاصيل البنك </p>
          </div>
          <div>
            <p className="text-[12px] font-bold">Invoice</p>
          </div>
          <div>
            <p className="float-right mr-[5px] text-[12px] font-bold">فاتورة</p>
          </div>

          <div className="col-span-2 -mt-[15px]">
            <div className="border-dark-blue w-[100%] border-[1px] border-solid "></div>
          </div>
          <div className="col-span-2 -mt-[15px]">
            <div className="border-dark-blue w-[100%] border-[1px] border-solid "></div>
          </div>
          <div className="-mt-[22px]">
            <p>Bank Name: </p>
            <p>Bank Address: </p>
            <p>Account Name: </p>
            <p>IBAN: </p>
            <p>Account Number: </p>
            <p>Swift code for international wires: </p>
          </div>
          <div className="-mt-[22px]">
            <p>{bankName}</p>
            <p>{bankAddress}</p>
            <p>{accountName}</p>
            <p>{iban}</p>
            <p>{accountNumber}</p>
            <p>{swiftCode}</p>
          </div>
          <div className="-mt-[22px]">
            <p>Number :</p>
            <p>Creation Date : </p>
            <p>Arrival Date : </p>
            <p>Due Date : </p>
            <p>Past Due Days : </p>
            <p>Invoice printed : </p>
          </div>
          <div className="-mt-[22px]">
            <p>{invoice_no}</p>
            <p>{invoice_create_date}</p>
            <p>{port_arrival_date}</p>
            <p>{due_date}</p>
            <p>{past_due_days}</p>
            <p>{printed_date}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 px-2 font-bold">
          <div></div>
          <div></div>
          <div></div>

          <div>
            <table className="mt-2 w-full text-center">
              <thead className="text-dark-blue border-dark-blue border">
                <tr>
                  <th className="border-dark-blue border-r">Balance Due</th>
                  <th>Enclosed</th>
                </tr>
              </thead>
              <tbody className="text-dark-blue border-dark-blue border">
                <tr>
                  <td className="border-dark-blue border-r">{balance}</td>
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
          <div className="border-light-grey mt-[20px] w-[97%] border-2 border-dashed"></div>
          <ScissorsIcon
            className="text-light-grey float-right mt-[-14px] h-6 w-6 rotate-180"
            aria-hidden="true"
          />
        </div>

        <div className="text-dark-blue border-dark-blue mt-[30px] flex  justify-between rounded-xl border-2 p-2 text-[12px] font-bold">
          <h4>Bill Information</h4>
          <h4> تفاصيل الفاتورة</h4>
        </div>
        <div className="my-2 flex justify-between px-2">
          <div className="w-1/3 font-bold">
            <p>Full Name</p>
            <p>Location</p>
            <p>Country</p>
            <p>Phone Number</p>
          </div>
          <div className="w-1/3 text-center">
            <p>{customer_name_en}</p>
            <p>
              {customer_city}, {customer_state}
            </p>
            <p>{customer_country}</p>
            <p>{customer_phone}</p>
          </div>
          <div className="mr-[5px] w-1/3 text-right font-bold">
            <p>الاسم بالكامل</p>
            <p>الموقع</p>
            <p>البلد</p>
            <p>رقم الهاتف</p>
          </div>
        </div>

        <div className="text-dark-blue border-dark-blue mt-5 flex justify-between rounded-xl border-2 p-2 text-[12px] font-bold">
          <h4 className="w-1/3">Cargo Information</h4>
          <h4 className="w-1/3 text-center">{container_number}</h4>
          <h4 className="w-1/3 text-right">معلومات الحاوية </h4>
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
                <h5>Origin/مصدر</h5>
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
          <table className="' my-1 mt-[20px] w-full font-bold">
            <thead className="text-dark-blue mt-1 rounded-xl border-[1px] border-[#c0c0c0] p-2 ">
              <tr>
                <th>وصف</th>
                <th className="border-l-[1px] border-[#c0c0c0]"> المزاد</th>
                {!isTareekAlInsaf && (
                  <th className="border-l-[1px] border-[#c0c0c0]">سعر</th>
                )}
                <th className="border-l-[1px] border-[#c0c0c0]">
                  {' '}
                  النقل الداخلي
                </th>
                <th className="border-l-[1px] border-[#c0c0c0]">شحن</th>
                {!isTareekAlInsaf && (
                  <th className="border-l-[1px] border-[#c0c0c0]">تخليص</th>
                )}
                <th className="border-l-[1px] border-[#c0c0c0]">كود خاص</th>
                <th className="border-l-[1px] border-[#c0c0c0]">
                  التأخر في السداد
                </th>
                {/*  */}
                {!isTareekAlInsaf && (
                  <th className="border-l-[1px] border-[#c0c0c0]">
                    رافعة شوكية
                  </th>
                )}
                <th className="border-l-[1px] border-[#c0c0c0]">
                  تخزين المزاد
                </th>
                {!isTareekAlInsaf && (
                  <>
                    <th className="border-l-[1px] border-[#c0c0c0]">أخرى</th>
                    <th className="border-l-[1px] border-[#c0c0c0]">الخصم</th>
                  </>
                )}
                <th className="border-l-[1px] border-[#c0c0c0]">المجموع</th>
              </tr>
              <tr>
                <th>Description</th>
                <th className="border-l-[1px] border-[#c0c0c0]">Auction</th>
                {!isTareekAlInsaf && (
                  <th className="border-l-[1px] border-[#c0c0c0]">Price</th>
                )}
                <th className="border-l-[1px] border-[#c0c0c0]">Towing</th>
                <th className="border-l-[1px] border-[#c0c0c0]">Shipping</th>
                {!isTareekAlInsaf && (
                  <th className="border-l-[1px] border-[#c0c0c0]">Clearance</th>
                )}
                <th className="border-l-[1px] border-[#c0c0c0]">
                  Special Code
                </th>
                <th className="border-l-[1px] border-[#c0c0c0]">
                  Late Payment
                </th>
                {!isTareekAlInsaf && (
                  <th className="border-l-[1px] border-[#c0c0c0]">Forklift</th>
                )}
                <th className="border-l-[1px] border-[#c0c0c0]">
                  Auction Storage
                </th>
                {!isTareekAlInsaf && (
                  <>
                    <th className="border-l-[1px] border-[#c0c0c0]">Other</th>
                    <th className="border-l-[1px] border-[#c0c0c0]">
                      Discount
                    </th>
                  </>
                )}
                <th className="border-l-[1px] border-[#c0c0c0]">Total</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {cars.map((car, i) => (
                <tr key={i}>
                  <td className="border-x-[1px] border-b-[1px] border-[#c0c0c0]  text-left">
                    <div className="mt-1.5 pl-[1px]">
                      {`${car.carMakerName} ${car.carModelName} ${car.year}`}{' '}
                      <br />
                      VIN: {car.vin}
                      {car.color_code !== '' ? (
                        <>
                          <br />
                          Color: {car.color_name}
                          <div
                            style={{ background: car.color_code }}
                            className={`inline-block border-dark-blue -mb-1 ml-[1px] rounded-md border px-2 py-[6px]`}
                          ></div>
                        </>
                      ) : null}
                    </div>
                  </td>
                  <td className="border-r-[1px] border-b-[1px] border-[#c0c0c0] ">
                    {car.auction_location_name}{' '}
                    {car.auction_location_state !== ''
                      ? `, ${car.auction_location_state}`
                      : ''}
                  </td>
                  {!isTareekAlInsaf && (
                    <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                      {car.car_cost}
                    </td>
                  )}
                  <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                    {car?.towingAmount || 0}
                  </td>
                  <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                    {isTareekAlInsaf
                      ? (car?.shippingAmount || 0) - (car?.discount || 0)
                      : car?.shippingAmount || 0}
                  </td>
                  {!isTareekAlInsaf && (
                    <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                      {car?.clearanceAmount || 0}
                    </td>
                  )}
                  <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                    {car?.specialCodeAmount || 0}
                  </td>
                  <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                    {car?.latePaymentAmount || 0}
                  </td>
                  {!isTareekAlInsaf && (
                    <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                      {car?.forkliftAmount || 0}
                    </td>
                  )}
                  <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                    {car?.auctionFineAmount || 0}
                  </td>
                  {!isTareekAlInsaf && (
                    <>
                      <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                        {car?.otherAmount || 0}
                      </td>
                      <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                        {car?.discount || 0}
                      </td>
                    </>
                  )}
                  <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0]">
                    {' '}
                    {car?.totalAmount || 0}
                  </td>
                </tr>
              ))}

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                {!isTareekAlInsaf && (
                  <>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </>
                )}

                <td className="border-x-[1px] border-b-[1px] border-[#c0c0c0] text-left">
                  Total/إجمالي
                </td>
                <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0] text-center">
                  {!isTareekAlInsaf
                    ? totalAmount.toFixed(2)
                    : balance.toFixed(2)}
                </td>
              </tr>
              {!isTareekAlInsaf && (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  {!isTareekAlInsaf && (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                  <td className="border-x-[1px] border-b-[1px] border-[#c0c0c0] text-left">
                    Payment/دفع
                  </td>
                  <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0] text-center">
                    {paidAmount.toFixed(2)}
                  </td>
                </tr>
              )}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                {!isTareekAlInsaf && (
                  <>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </>
                )}
                <td className="border-x-[1px] border-b-[1px] border-[#c0c0c0] text-left">
                  Balance Due/الرصيد المستحق
                </td>
                <td className="border-b-[1px] border-r-[1px] border-[#c0c0c0] text-center">
                  {balance.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        ) : null}

        <div className="text-dark-blue mr-[40px] grid grid-cols-5 print:fixed print:bottom-[50px]">
          <div className="col-span-2">
            <p className="text-[10px] tracking-wide">
              PLEASE BE ADVISED THAT THIS INVOICE HAS BEEN AMENDED ON{' '}
              {new Date().toLocaleDateString()}
            </p>
            <p className=" text-[9px] font-bold tracking-wide">
              CASH, MONEY ORDERS, OR THIRD-PARTY PAYMENTS WILL NOT BE ACCEPTED.
            </p>
          </div>
          <div className="ml-[45px]">
            <Image
              src={`/assets/images/iso_logo.png`}
              width="60px"
              height="60px"
              alt=""
            />
          </div>
          <div className="col-span-2 text-right">
            <p className="text-[14px]">
              يرجى العلم بأنه تم تعديل هذا الفاتورة في{' '}
              {new Date().toLocaleDateString()}{' '}
            </p>

            <p className="text-[14px] font-bold">
              لن يتم قبول النقد أو الأوامر المالية أو مدفوعات الطرف الثالث
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
  const currency = context.query?.currency || 'usd';

  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  const response = await axios.get(`${API_URL}customer/container/invoice`, {
    params: {
      container_id: containerId,
      currency,
    },
  });

  const invoice = response?.data;

  return {
    props: {
      invoice,
    },
  };
}
