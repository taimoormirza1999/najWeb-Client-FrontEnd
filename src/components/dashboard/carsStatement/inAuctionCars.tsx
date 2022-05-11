import React, { useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const InAuctionCars = ({ tableData }) => {
  const [inAuctionCarsState, setInAuctionCars] = useState(tableData);
  const [inAuctionTableSearch, setInAuctionTableSearch] = useState('');
  const lastTotalRow = tableData.length > 1 ? tableData.pop() : null;

  useEffect(() => {
    setInAuctionCars(
      tableData.filter((row) => {
        return row.description.indexOf(inAuctionTableSearch.trim()) !== -1;
      })
    );
  }, [inAuctionTableSearch]);

  return (
    <>
      <div className="mt-20 flex justify-between">
        <h3 className="text-dark-blue my-4 self-start py-4 text-2xl font-semibold">
          Cars Amount in the Auction
        </h3>
        <input
          type="text"
          placeholder="Search"
          className="border-medium-grey my-4 basis-1/6 self-end rounded-md border py-1 text-lg italic text-gray-700"
          value={inAuctionTableSearch}
          onChange={(e) => {
            setInAuctionTableSearch(e.target.value);
          }}
        />
      </div>
      <div className="border-azure-blue overflow-hidden rounded-xl border">
        <table className="w-full table-auto">
          <thead>
            <tr className="w-full">
              <td className="text-dark-blue p-4 text-xl font-semibold">No.</td>
              <td className="text-dark-blue p-4 text-xl font-semibold">Date</td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Reference No.
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Lot No.
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Description
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Debit
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Credit
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Remainig
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Balance
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
      {lastTotalRow !== undefined ? (
        <div className="border-azure-blue my-2 overflow-hidden rounded-xl border">
          <table className="w-full table-auto">
            <tfoot>
              <tr className="font-semibold">
                <td className="w-[4%] px-6"></td>
                <td className="w-[64%] p-3 text-2xl  text-[#1C1C1C]">Total</td>
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
