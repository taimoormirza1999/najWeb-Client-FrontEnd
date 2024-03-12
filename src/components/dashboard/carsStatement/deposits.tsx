import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage, useIntl } from 'react-intl';

import CustomModal from '@/components/customModal';
import TableColumn from '@/components/TableColumn';
import TableHeader from '@/components/TableHeader';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Deposits = ({ tableData }) => {
  const intl = useIntl();
  const router = useRouter();
  const { locale } = router;
  const [depositsState, setDeposits] = useState(tableData);
  const [depositsTableSearch, setDepositsTableSearch] = useState('');
  const [depositDetailModalOpen, setDepositDetailModalOpen] = useState(false);
  const [depositDetail, setDepositDetail] = useState({});
  const depositCancelButtonRef = useRef(null);

  useEffect(() => {
    if (depositsTableSearch !== '') {
      setDeposits(
        tableData.filter((row) => {
          return row.serial_number.indexOf(depositsTableSearch.trim()) !== -1;
        })
      );
    }
  }, [depositsTableSearch]);

  useEffect(() => {
    const excelBtn = document.getElementById('depositsData-xls-button');
    if (excelBtn) {
      excelBtn.innerHTML =
        '<i class="material-icons text-xl">&#xef42;</i> Excel';
    }
  }, []);

  const tableHeader = [
    { name: 'page.customer.dashboard.table.no' },
    {
      name: 'statement.serial',
    },
    {
      name: 'statement.amount',
    },
    {
      name: 'page.customer.dashboard.paid',
    },
    {
      name: 'statement.shipped_cars.balance',
    },
    {
      name: 'statement.shipped_cars.date',
    },
  ];

  const showDepositDetail = (deposit_id) => {
    setDepositDetail({});
    setDepositDetailModalOpen(true);
    axios
      .get(`/api/customer/depositDetail/`, {
        params: { deposit_id },
      })
      .then((res) => {
        setDepositDetail(res.data);
      })
      .catch(() => {
        setDepositDetail({});
        setDepositDetailModalOpen(false);
      })
      .finally(() => {});
  };

  return (
    <div>
      <CustomModal
        showOn={depositDetailModalOpen}
        customSize={true}
        onClose={() => {
          setDepositDetailModalOpen(false);
        }}
        initialFocus={depositCancelButtonRef}
      >
        <div className="absolute top-1/2 left-1/2 inline-block w-4/5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-lg transition-all rtl:text-right sm:p-6 sm:align-middle lg:w-3/5 xl:w-3/5">
          <div className="text-dark-blue mt-2 text-left rtl:text-right">
            <Dialog.Title
              as="h6"
              className="mb-8 text-xl font-bold leading-6 md:text-xl lg:text-2xl"
            >
              <FormattedMessage id="statement.shipped_cars.deposit_detail" />
              <div
                className="float-right mr-[14px] mt-2 cursor-pointer text-[25px] font-bold text-red-400 rtl:float-left"
                onClick={() => {
                  setDepositDetailModalOpen(false);
                }}
                ref={depositCancelButtonRef}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </Dialog.Title>
          </div>

          {Object.keys(depositDetail).length === 0 && (
            <h6 className="rtl:text-right">
              <FormattedMessage id="general.loading" />
            </h6>
          )}

          {depositDetail?.deposit && (
            <table className="min-w-full divide-y divide-gray-300">
              <TableHeader
                tableHeader={[
                  { name: 'page.customer.deposit.no' },
                  { name: 'page.customer.deposit.amount' },
                  { name: 'page.customer.deposit.paid' },
                  { name: 'page.customer.deposit.balance' },
                  { name: 'page.customer.deposit.date' },
                ]}
              ></TableHeader>
              <tbody>
                <TableColumn className={undefined}>
                  {depositDetail.deposit?.serial_number}
                </TableColumn>
                <TableColumn className={undefined}>
                  AED {depositDetail.deposit.amount}
                </TableColumn>
                <TableColumn className={undefined}>
                  AED {depositDetail.deposit.paid}
                </TableColumn>
                <TableColumn className={undefined}>
                  AED {depositDetail.deposit.balance}
                </TableColumn>
                <TableColumn className={undefined}>
                  {depositDetail.deposit.create_date}
                </TableColumn>
              </tbody>
            </table>
          )}

          {depositDetail?.receipt?.length > 0 && (
            <div>
              <br />
              <table className="min-w-full divide-y divide-gray-300">
                <TableHeader
                  tableHeader={[
                    { name: '#' },
                    { name: 'page.customer.deposit.date' },
                    { name: 'statement.shipped_cars.debit' },
                    { name: 'statement.shipped_cars.credit' },
                    { name: 'statement.description' },
                  ]}
                ></TableHeader>
                <tbody>
                  {depositDetail.receipt?.map((row, index) => (
                    <tr key={index}>
                      <TableColumn className="">{index + 1}</TableColumn>
                      <TableColumn className="">{row.date}</TableColumn>
                      <TableColumn className="">
                        {row.rec_type === '1' ? row.debit : 0}
                      </TableColumn>
                      <TableColumn className="">
                        {row.rec_type !== '1' ? row.debit : 0}
                      </TableColumn>
                      <TableColumn className="">
                        {locale === 'ar' ? row.description_ar : row.description}
                      </TableColumn>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {depositDetail?.transfer?.length > 0 && (
            <div className="mt-4 mb-2">
              <h6 className="my-2">
                <FormattedMessage id="page.customer.deposit.transfer" />
              </h6>
              <div className="max-h-80 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <TableHeader
                    tableHeader={[
                      { name: '#' },
                      { name: 'page.customer.deposit.invoice' },
                      { name: 'page.customer.deposit.car' },
                      { name: 'page.customer.deposit.cost' },
                      { name: 'page.customer.deposit.paid' },
                      { name: 'page.customer.deposit.balance' },
                      { name: 'page.customer.deposit.date' },
                    ]}
                  ></TableHeader>
                  <tbody>
                    {depositDetail.transfer?.map((row, index) => (
                      <tr key={index}>
                        <TableColumn className="">{index + 1}</TableColumn>
                        <TableColumn className="">
                          {row.invoice_number}
                        </TableColumn>
                        <TableColumn className="w-[250px]">
                          {row.carMakerName} {row.carModelName} {row.year}{' '}
                          <br />
                          Lot: {row.lotnumber} <br /> Vin: {row.vin}
                        </TableColumn>
                        <TableColumn className="">{row.amount_due}</TableColumn>
                        <TableColumn className="">
                          {row.amount_paid}
                        </TableColumn>
                        <TableColumn className="">
                          {row.remaining_amount}
                        </TableColumn>
                        <TableColumn className="">{row.date}</TableColumn>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {depositDetail?.shipping?.length > 0 && (
            <div className="mt-4 mb-2">
              <h6 className="my-2">
                <FormattedMessage id="page.customer.deposit.shipping" />
              </h6>
              <div className="max-h-80 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <TableHeader
                    tableHeader={[
                      { name: '#' },
                      { name: 'page.customer.deposit.invoice' },
                      { name: 'page.customer.deposit.car' },
                      { name: 'page.customer.deposit.cost' },
                      { name: 'page.customer.deposit.paid' },
                      { name: 'page.customer.deposit.balance' },
                      { name: 'page.customer.deposit.date' },
                    ]}
                  ></TableHeader>
                  <tbody>
                    {depositDetail.shipping?.map((row, index) => (
                      <tr key={index}>
                        <TableColumn className="">{index + 1}</TableColumn>
                        <TableColumn className="">
                          {row.invoice_number}
                        </TableColumn>
                        <TableColumn className="w-[250px]">
                          {row.carMakerName} {row.carModelName} {row.year}{' '}
                          <br />
                          Lot: {row.lotnumber} <br /> Vin: {row.vin}
                        </TableColumn>
                        <TableColumn className="">{row.amount_due}</TableColumn>
                        <TableColumn className="">
                          {row.amount_paid}
                        </TableColumn>
                        <TableColumn className="">
                          {row.remaining_amount}
                        </TableColumn>
                        <TableColumn className="">{row.date}</TableColumn>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-5 flex justify-center gap-4 sm:mt-6">
            <button
              type="button"
              className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
              onClick={() => {
                setDepositDetailModalOpen(false);
              }}
            >
              <FormattedMessage id="general.cancel" />
            </button>
          </div>
        </div>
      </CustomModal>
      <div className="mt-20 flex flex-col justify-between md:flex-row">
        <h3 className="text-dark-blue my-1 self-start text-2xl font-semibold md:my-4 md:py-4">
          <FormattedMessage id="statement.shipped_cars.deposits" />
        </h3>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'Search' })}
          className="border-medium-grey my-4 basis-1/6 rounded-md border py-1 text-lg text-gray-700 ltr:italic md:self-end"
          value={depositsTableSearch}
          onChange={(e) => {
            setDepositsTableSearch(e.target.value);
          }}
        />
      </div>
      <ReactHTMLTableToExcel
        id="depositsData-xls-button"
        className="mb-4 flex items-center gap-1 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        table="depositsData"
        filename="deposits"
        sheet="tablexls"
        buttonText="Excel"
      />
      <div className="border-azure-blue overflow-x-auto">
        <table id="depositsData" className="w-full table-auto">
          <TableHeader tableHeader={tableHeader} />

          <tbody>
            {depositsState.map((row, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 ? 'bg-light-grey' : '',
                  'text-xs sm:text-[17px]'
                )}
              >
                <TableColumn className="text-dark-blue w-[4%] p-3 text-xl font-semibold">
                  {row.balance ? (
                    <span
                      className="bg-dark-blue cursor-pointer rounded-full px-3 py-1 text-white"
                      onClick={() => showDepositDetail(row.id)}
                    >
                      {index + 1}
                    </span>
                  ) : (
                    index + 1
                  )}
                </TableColumn>
                <TableColumn className="">{row.serial_number}</TableColumn>
                <TableColumn className="">{row.amount}</TableColumn>
                <TableColumn className="">{row.paid}</TableColumn>
                <TableColumn className="">{row.balance}</TableColumn>
                <TableColumn className="">{row.date}</TableColumn>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Deposits };
