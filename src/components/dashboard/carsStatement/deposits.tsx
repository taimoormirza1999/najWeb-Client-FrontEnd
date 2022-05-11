import React, { useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Deposits = ({ tableData }) => {
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
      <div className="mt-20 flex justify-between">
        <h3 className="text-dark-blue my-4 self-start py-4 text-2xl font-semibold">
          Deposits
        </h3>
        <input
          type="text"
          placeholder="Search"
          className="border-medium-grey my-4 basis-1/6 self-end rounded-md border py-1 text-lg italic text-gray-700"
          value={depositsTableSearch}
          onChange={(e) => {
            setDepositsTableSearch(e.target.value);
          }}
        />
      </div>
      <div className="border-azure-blue overflow-hidden rounded-xl border">
        <table className="w-full table-auto">
          <thead>
            <tr className="w-full">
              <td className="text-dark-blue p-4 text-xl font-semibold">No.</td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Serial No
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Amount
              </td>
              <td className="text-dark-blue p-4 text-xl font-semibold">Paid</td>
              <td className="text-dark-blue p-4 text-xl font-semibold">
                Balance
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
