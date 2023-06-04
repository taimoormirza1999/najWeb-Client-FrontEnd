import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage, useIntl } from 'react-intl';
import TableHeader from '@/components/TableHeader';
import TableColumn from '@/components/TableColumn';

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

  useEffect(() => {
    const excelBtn = document.getElementById('depositsData-xls-button');
    if(excelBtn){
      excelBtn.innerHTML = '<i class="material-icons text-xl">&#xef42;</i> Excel';
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
    }
  ];

  return (
    <>
      <div className="mt-20 flex flex-col justify-between md:flex-row">
        <h3 className="text-dark-blue my-1 self-start text-2xl font-semibold md:my-4 md:py-4">
          <FormattedMessage id="statement.shipped_cars.deposits" />
        </h3>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'Search' })}
          className="border-medium-grey my-4 basis-1/6 rounded-md border py-1 text-lg ltr:italic text-gray-700 md:self-end"
          value={depositsTableSearch}
          onChange={(e) => {
            setDepositsTableSearch(e.target.value);
          }}
        />
      </div>
      <ReactHTMLTableToExcel
        id="depositsData-xls-button"
        className="mb-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 flex gap-1 items-center"
        table="depositsData"
        filename="deposits"
        sheet="tablexls"
        buttonText="Excel"
      />
      <div className="border-azure-blue overflow-x-auto">
        <table id="depositsData" className="w-full table-auto">
          {/* <thead>
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
          </thead> */}

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
                    <span className="bg-dark-blue rounded-full px-3 py-1 text-white">
                      {index + 1}
                    </span>
                  ) : (
                    index + 1
                  )}
                  
                </TableColumn>
                <TableColumn className="">
                  {row.serial_number}
                </TableColumn>
                <TableColumn className="">{row.amount}</TableColumn>
                <TableColumn className="">{row.paid}</TableColumn>
                <TableColumn className="">{row.balance}</TableColumn>
                <TableColumn className="">{row.date}</TableColumn>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { Deposits };
