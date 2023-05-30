import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage, useIntl } from 'react-intl';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const InAuctionCars = ({ tableData, lastTotalRow }) => {
  
  const intl = useIntl();
  const [inAuctionCarsState, setInAuctionCars] = useState(tableData);
  const [inAuctionTableSearch, setInAuctionTableSearch] = useState('');

  useEffect(() => {
    setInAuctionCars(
      tableData.filter((row) => {
        return row.description.indexOf(inAuctionTableSearch.trim()) !== -1;
      })
    );
  }, [inAuctionTableSearch]);


  useEffect(() => {
    const excelBtn = document.getElementById('auctionCars-xls-button');
    if(excelBtn){
      excelBtn.innerHTML = '<i class="material-icons text-xl">&#xef42;</i> Excel';
    }
  }, []);

  return (
    <>
      <div className="mt-20 flex flex-col justify-between md:flex-row">
        <h3 className="text-dark-blue my-1 self-start text-2xl font-semibold md:my-4 md:py-4">
          <FormattedMessage id="statement.shipped_cars.cars_amount_in_the_auction" />
        </h3>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'Search' })}
          className="border-medium-grey my-4 basis-1/6 rounded-md border py-1 text-lg ltr:italic text-gray-700 md:self-end"
          value={inAuctionTableSearch}
          onChange={(e) => {
            setInAuctionTableSearch(e.target.value);
          }}
        />
      </div>
      <ReactHTMLTableToExcel
        id="auctionCars-xls-button"
        className="mb-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 flex gap-1 items-center"
        table="auctionCars"
        filename="auctionCars"
        sheet="tablexls"
        buttonText="222"
      />
      <div className="border-azure-blue overflow-x-auto rounded-xl border">
        <table id="auctionCars" className="w-full table-auto">
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
            {inAuctionCarsState.map((row, index) => (
              <tr
                key={index}
                className={classNames(
                  index % 2 === 0 ? 'bg-light-grey' : '',
                  'text-xs sm:text-[17px]'
                )}
              >
                <td className="text-dark-blue w-[4%] p-3 text-xl font-semibold">
                  {index + 1}
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
                <td className="w-[64%] p-3 text-2xl  text-[#1C1C1C]">
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

export { InAuctionCars };
