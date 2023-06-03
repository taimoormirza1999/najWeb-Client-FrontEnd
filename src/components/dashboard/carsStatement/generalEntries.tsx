import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage, useIntl } from 'react-intl';

import TableColumn from '@/components/TableColumn';
import TableHeader from '@/components/TableHeader';

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
        return row.description.indexOf(generalEntriesTableSearch.trim()) !== -1;
      })
    );
  }, [generalEntriesTableSearch]);

  useEffect(() => {
    const excelBtn = document.getElementById('generalEntry-xls-button');
    if (excelBtn) {
      excelBtn.innerHTML =
        '<i class="material-icons text-xl">&#xef42;</i> Excel';
    }
  }, []);

  const tableHeader = [
    { name: 'page.customer.dashboard.table.no' },
    {
      name: 'statement.shipped_cars.date',
    },
    {
      name: 'statement.reference.no',
    },
    {
      name: 'statement.lot.no',
    },
    {
      name: 'statement.description',
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
    },
  ];

  return (
    <>
      <div className="mt-20 flex flex-col justify-between md:flex-row">
        <h3 className="text-dark-blue my-1 self-start text-2xl font-semibold md:my-4 md:py-4">
          <FormattedMessage id="statement.shipped_cars.general_entries" />
        </h3>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'Search' })}
          className="border-medium-grey my-4 basis-1/6 rounded-md border py-1 text-lg text-gray-700 ltr:italic md:self-end"
          value={generalEntriesTableSearch}
          onChange={(e) => {
            setGeneralEntriesTableSearch(e.target.value);
          }}
        />
      </div>
      <ReactHTMLTableToExcel
        id="generalEntry-xls-button"
        className="mb-4 flex items-center gap-1 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        table="generalEntry"
        filename="generalEntry"
        sheet="tablexls"
        buttonText="Excel"
      />
      <div className="border-azure-blue overflow-x-auto">
        <table id="generalEntry" className="w-full table-auto">
          {/* <thead>
            <tr className="w-full">
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.table.no" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.shipped_cars.date" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.reference.no" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.lot.no" />
              </TableColumn>
              <TableColumn className="text-dark-blue p-4 text-xl font-semibold">
                <FormattedMessage id="statement.description" />
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

          <TableHeader tableHeader={tableHeader} />

          <tbody>
            {generalEntriesState.map((row, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 ? 'bg-light-grey' : '',
                  'text-xs sm:text-[17px]'
                )}
              >
                <TableColumn className="w-[4%]">{row.index}</TableColumn>
                <TableColumn className="w-[8%]">{row.date}</TableColumn>
                <TableColumn className="w-[8%]">{row.reference_no}</TableColumn>
                <TableColumn className="w-[8%]"></TableColumn>
                <TableColumn className="w-[40%]">{row.description}</TableColumn>
                <TableColumn className="w-[8%] text-[#0B9A21]">
                  {row.debit}
                </TableColumn>
                <TableColumn className="w-[8%] text-[#A30000]">
                  {row.credit}
                </TableColumn>
                <TableColumn className="w-[8%]">{row.remaining}</TableColumn>
                <TableColumn className="w-[8%]">{row.balance}</TableColumn>
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
                <TableColumn className="w-[4%] px-6"></TableColumn>
                <TableColumn className="w-[64%] p-3  text-2xl text-[#1C1C1C]">
                  <FormattedMessage id="page.customer.dashboard.table.Total" />
                </TableColumn>
                <TableColumn className="w-[8%] p-3 text-lg text-[#0B9A21]">
                  {lastTotalRow.debit}
                </TableColumn>
                <TableColumn className="w-[8%] p-3 text-lg text-[#A30000]">
                  {lastTotalRow.credit}
                </TableColumn>
                <TableColumn className="w-[8%] p-3 text-lg">
                  {lastTotalRow.remaining}
                </TableColumn>
                <TableColumn className="w-[8%] p-3 text-lg text-[#1C1C1C]">
                  {lastTotalRow.balance}
                </TableColumn>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : null}
    </>
  );
};

export { GeneralEntries };
