import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage, useIntl } from 'react-intl';

import { UserContext } from '@/components/userContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const carProfileDetail = (row) => {
  return (
    <div>
      {row.car.carMakerName} {row.car.carModelName} {row.car.year} <br />
      Lot: {row.car.lotnumber} <br />
      Vin: {row.car.vin} <br />
    </div>
  );
};

const ShippedCars = ({ tableData, lastTotalRow }) => {
  const intl = useIntl();
  const router = useRouter();
  const currency = router.query?.currency || 'aed';

  const [shippedCarsState, setShippedCars] = useState(tableData);
  const [shippedTableSearch, setShippedTableSearch] = useState('');
  const { profile } = useContext(UserContext);
  const showContainerNumber = profile?.isBulkShippingCustomer === true;

  useEffect(() => {
    setShippedCars(
      tableData.filter((row) => {
        return (
          row.description.indexOf(shippedTableSearch.trim()) !== -1 ||
          row.car?.vin.indexOf(shippedTableSearch.trim()) !== -1
        );
      })
    );
  }, [shippedTableSearch]);

  return (
    <>
      <div className="flex flex-col justify-between md:flex-row">
        <h3 className="text-dark-blue my-1 self-start text-2xl font-semibold md:my-4 md:py-2">
          <FormattedMessage id="statement.shipped_cars" />
        </h3>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'Search' })}
          className="border-medium-grey my-4 basis-1/6 rounded-md border py-1 text-lg text-gray-700 ltr:italic md:self-end"
          value={shippedTableSearch}
          onChange={(e) => {
            setShippedTableSearch(e.target.value);
          }}
        />
      </div>
      <ReactHTMLTableToExcel
        id="shippedCars-xls-button"
        className="mb-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        table="shippedCars"
        filename="shippedCars"
        sheet="tablexls"
        buttonText="Excel"
      />
      <div className="border-azure-blue overflow-x-auto rounded-xl border">
        <table id="shippedCars" className="w-full table-auto">
          <thead>
            <tr className="w-full">
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.table.no" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.date" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.table.detail" />
              </td>
              {showContainerNumber ? (
                <td className="text-dark-blue p-4 text-xl font-semibold">
                  <FormattedMessage id="page.customer.container.container_number" />
                </td>
              ) : null}
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.table.storage" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.table.price" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.shipping_amount" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.debit" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.credit" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.remainig" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.balance" />
              </td>
            </tr>
          </thead>
          <tbody>
            {shippedCarsState.map((row, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 ? 'bg-light-grey' : '',
                  'text-xs sm:text-[17px]'
                )}
              >
                <td className="text-dark-blue w-[4%] min-w-[60px] p-3 text-xl font-semibold">
                  {row.index}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.date}
                </td>
                <td className="w-[24%] p-3 text-lg text-[#1C1C1C]">
                  {row.car === undefined
                    ? row.description
                    : carProfileDetail(row)}
                </td>
                {showContainerNumber ? (
                  <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                    {row?.car?.container_number || ''}
                  </td>
                ) : null}
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.storage_fine}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.car_price}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.car_id ? (
                    <Link
                      href={{
                        pathname: '/customer/bill/',
                        query: { car: row.car_id, currency },
                      }}
                    >
                      <a target="_blank" className="text-[#1C1C1C]">
                        {row.shipping_amount}
                      </a>
                    </Link>
                  ) : (
                    row.shipping_amount
                  )}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#0B9A21]">
                  {row.debit}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#A30000]">
                  {row.credit}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#1C1C1C]">
                  {row.remaining}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#1C1C1C]">
                  {row.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lastTotalRow ? (
        <div className="border-azure-blue my-2 overflow-hidden rounded-xl border">
          <table className="w-full table-auto">
            <tfoot>
              <tr className="font-semibold">
                <td className="w-[4%] p-3"></td>
                <td className="w-[32%] p-3 text-2xl  text-[#1C1C1C]">
                  <FormattedMessage id="page.customer.dashboard.table.Total" />
                </td>
                {showContainerNumber ? (
                  <td className="w-[8%] p-3 text-lg text-[#1C1C1C]"></td>
                ) : null}
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {lastTotalRow.storage_fine}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {lastTotalRow.car_price}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {lastTotalRow.shipping_amount}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#0B9A21]">
                  {lastTotalRow.debit ? lastTotalRow.debit : ''}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#A30000]">
                  {lastTotalRow.credit ? lastTotalRow.credit : ''}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#1C1C1C]">
                  {lastTotalRow.remaining}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#1C1C1C]">
                  {lastTotalRow.balance}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : null}
    </>
  );
};

export { ShippedCars };
