import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage, useIntl } from 'react-intl';

import { UserContext } from '@/components/userContext';
import TableHeader from '@/components/TableHeader';
import TableColumn from '@/components/TableColumn';

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


  const tableHeader = [
    { name: 'page.customer.dashboard.table.no' },
    {
      name: 'statement.shipped_cars.date',
    },
    {
      name: 'page.customer.dashboard.table.detail',
    },
    {
      name: 'page.customer.container.container_number',
    },
    {
      name: 'page.customer.dashboard.table.storage',
    },
    {
      name: 'page.customer.dashboard.table.price',
    },
    {
      name: 'statement.shipped_cars.shipping_amount',
    },
    {
      name: 'statement.shipped_cars.debit',
    },
    {
      name: 'statement.shipped_cars.credit',
    },
    {
      name: 'statement.shipped_cars.remainig',
    },
    {
      name: 'statement.shipped_cars.balance',
    }
  ];

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
      <div className="border-azure-blue overflow-x-auto">
        <table id="shippedCars" className="w-full table-auto">
          {/* <thead>
            <TableColumn className="w-full">
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold ">
                <FormattedMessage id="page.customer.dashboard.table.no" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.date" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.table.detail" />
              </TableColumn>
              {showContainerNumber ? (
                <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                  <FormattedMessage id="page.customer.container.container_number" />
                </TableColumn>
              ) : null}
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.table.storage" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.table.price" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.shipping_amount" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.debit" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.credit" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.remainig" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.balance" />
              </TableColumn>
            </tr>
          </thead> */}
          <TableHeader tableHeader={tableHeader.filter((item, _) => (
              item.name !== 'page.customer.container.container_number' || showContainerNumber
          ))} /> 

          <tbody>
            {shippedCarsState.map((row, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 ? 'bg-light-grey' : '',
                  'text-xs sm:text-[17px]'
                )}
              >
                <TableColumn className="text-dark-blue w-[4%] min-w-[60px]">
                  {row.index}
                </TableColumn>
                <TableColumn className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.date}
                </TableColumn>
                <TableColumn className="w-[24%] p-3 text-lg text-[#1C1C1C]">
                  {row.car === undefined
                    ? row.description
                    : carProfileDetail(row)}
                </TableColumn>
                {showContainerNumber ? (
                  <TableColumn className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                    {row?.car?.container_number || ''}
                  </TableColumn>
                ) : null}
                <TableColumn className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.storage_fine}
                </TableColumn>
                <TableColumn className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.car_price}
                </TableColumn>
                <TableColumn className="w-[8%] p-3 text-lg text-[#1C1C1C]">
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
                </TableColumn>
                <TableColumn className="w-[10%] p-3 text-lg text-[#0B9A21]">
                  {row.debit}
                </TableColumn>
                <TableColumn className="w-[10%] p-3 text-lg text-[#A30000]">
                  {row.credit}
                </TableColumn>
                <TableColumn className="w-[10%] p-3 text-lg text-[#1C1C1C]">
                  {row.remaining}
                </TableColumn>
                <TableColumn className="w-[10%] p-3 text-lg text-[#1C1C1C]">
                  {row.balance}
                </TableColumn>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lastTotalRow ? (
        <div className="border-azure-blue my-2 overflow-hidden">
          <table className="w-full table-auto">
            <tfoot>
              <tr className="font-semibold">
                <td className="w-[4%] p-3 border-dark-blue border-[1px]">

                </td>
                <td className="w-[32%] p-3 text-2xl  text-[#1C1C1C] border-dark-blue border-[1px]">
                  <FormattedMessage id="page.customer.dashboard.table.Total" />
                </td>
                {showContainerNumber ? (
                  <td className="w-[8%] p-3 text-lg text-[#1C1C1C] border-dark-blue border-[1px]">

                  </td>
                ) : null}
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C] border-dark-blue border-[1px]">
                  {lastTotalRow.storage_fine}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C] border-dark-blue border-[1px]">
                  {lastTotalRow.car_price}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C] border-dark-blue border-[1px]">
                  {lastTotalRow.shipping_amount}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#0B9A21] border-dark-blue border-[1px]">
                  {lastTotalRow.debit ? lastTotalRow.debit : ''}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#A30000] border-dark-blue border-[1px]">
                  {lastTotalRow.credit ? lastTotalRow.credit : ''}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#1C1C1C] border-dark-blue border-[1px]">
                  {lastTotalRow.remaining}
                </td>
                <td className="w-[10%] p-3 text-lg text-[#1C1C1C] border-dark-blue border-[1px]">
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
