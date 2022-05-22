import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Deposits = ({ tableData }) => {
  const intl = useIntl();
  const [depositsState, setDeposits] = useState(tableData);
  const [depositsTableSearch, setDepositsTableSearch] = useState('');

  useEffect(() => {
    if (depositsTableSearch !== '') {
      setDeposits(
        tableData.filter((row) => {
          return row.serial_number.indexOf(depositsTableSearch.trim()) !== -1;
        })
      );
    }
  }, [depositsTableSearch]);
  return (
    <>
      <div className="mt-20 flex flex-col justify-between md:flex-row">
        <h3 className="text-dark-blue my-1 self-start text-2xl font-semibold md:my-4 md:py-4">
          <FormattedMessage id="statement.shipped_cars.deposits" />
        </h3>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'Search' })}
          className="border-medium-grey my-4 basis-1/6 rounded-md border py-1 text-lg italic text-gray-700 md:self-end"
          value={depositsTableSearch}
          onChange={(e) => {
            setDepositsTableSearch(e.target.value);
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
                <FormattedMessage id="statement.serial" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.amount" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.paid" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.balance" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.date" />
              </td>
            </tr>
          </thead>
          <tbody>
            {depositsState.map((row, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 ? 'bg-light-grey' : '',
                  'text-xs sm:text-[17px]'
                )}
              >
                <td className="text-dark-blue w-[4%] p-3 text-xl font-semibold">
                  {row.balance ? (
                    <span className="bg-dark-blue rounded-full px-3 py-1 text-white">
                      {index + 1}
                    </span>
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="p-3 text-lg text-[#1C1C1C]">
                  {row.serial_number}
                </td>
                <td className="p-3 text-lg text-[#1C1C1C]">{row.amount}</td>
                <td className="p-3 text-lg text-[#1C1C1C]">{row.paid}</td>
                <td className="p-3 text-lg text-[#1C1C1C]">{row.balance}</td>
                <td className="p-3 text-lg text-[#1C1C1C]">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { Deposits };
