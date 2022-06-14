import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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
  const [shippedCarsState, setShippedCars] = useState(tableData);
  const [shippedTableSearch, setShippedTableSearch] = useState('');

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
          className="border-medium-grey my-4 basis-1/6 rounded-md border py-1 text-lg ltr:italic text-gray-700 md:self-end"
          value={shippedTableSearch}
          onChange={(e) => {
            setShippedTableSearch(e.target.value);
          }}
        />
      </div>
      <div className="border-azure-blue overflow-x-auto rounded-xl border">
        <table className="w-full table-auto">
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
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.storage_fine}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.car_price}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.shipping_amount}
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
