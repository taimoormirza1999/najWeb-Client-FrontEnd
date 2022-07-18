import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage, useIntl } from 'react-intl';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const GeneralEntries = ({ tableData, lastTotalRow }) => {
  const intl = useIntl();
  const [generalEntriesState, setGeneralEntries] = useState(tableData);
  const [generalEntriesTableSearch, setGeneralEntriesTableSearch] =
    useState('');

  useEffect(() => {
    setGeneralEntries(
      tableData.filter((row) => {
        return (
          row.description.indexOf(generalEntriesTableSearch.trim()) !== -1 ||
          row.reference_no.indexOf(generalEntriesTableSearch.trim()) !== -1
        );
      })
    );
  }, [generalEntriesTableSearch]);

  return (
    <>
      <div className="mt-20 flex flex-col justify-between md:flex-row">
        <h3 className="text-dark-blue my-1 self-start text-2xl font-semibold md:my-4 md:py-4">
          <FormattedMessage id="statement.shipped_cars.general_entries" />
        </h3>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'Search' })}
          className="border-medium-grey my-4 basis-1/6 rounded-md border py-1 text-lg ltr:italic text-gray-700 md:self-end"
          value={generalEntriesTableSearch}
          onChange={(e) => {
            setGeneralEntriesTableSearch(e.target.value);
          }}
        />
      </div>
      <ReactHTMLTableToExcel
        id="generalEntry-xls-button"
        className="mb-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        table="generalEntry"
        filename="generalEntry"
        sheet="tablexls"
        buttonText="Excel"
      />
      <div className="border-azure-blue overflow-x-auto rounded-xl border">
        <table id="generalEntry" className="w-full table-auto">
          <thead>
            <tr className="w-full">
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.table.no" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.date" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.reference.no" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.lot.no" />
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.description" />
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
            {generalEntriesState.map((row, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 ? 'bg-light-grey' : '',
                  'text-xs sm:text-[17px]'
                )}
              >
                <td className="text-dark-blue w-[4%] p-3 text-xl font-semibold">
                  {row.index_no}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.date}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.reference_no}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]"></td>
                <td className="w-[40%] p-3 text-lg text-[#1C1C1C]">
                  {row.description}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#0B9A21]">
                  {row.debit}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#A30000]">
                  {row.credit}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {row.remaining}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
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
                <td className="w-[4%] px-6"></td>
                <td className="w-[64%] p-3  text-2xl text-[#1C1C1C]">
                  <FormattedMessage id="page.customer.dashboard.table.Total" />
                </td>
                <td className="w-[8%] p-3 text-lg text-[#0B9A21]">
                  {lastTotalRow.debit}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#A30000]">
                  {lastTotalRow.credit}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {lastTotalRow.remaining}
                </td>
                <td className="w-[8%] p-3 text-lg text-[#1C1C1C]">
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

export { GeneralEntries };
