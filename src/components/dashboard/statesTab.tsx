import { classNames } from '@/utils/Functions';
import { FormattedMessage } from 'react-intl';

const carTableHeader = [
  { name: <FormattedMessage id="status.new_jersey" /> },
  { name: <FormattedMessage id="status.texas" /> },
  { name: <FormattedMessage id="status.georgia" /> },
  { name: <FormattedMessage id="status.washington" /> },
  { name: <FormattedMessage id="status.california" /> },
];

const StatesTab = ({ carsRecords }) => {
  const carTableData = [
    {
      name: <FormattedMessage id="page.customer.dashboard.new_cars" />,
      ng: carsRecords?.newCarsNG,
      tx: carsRecords?.newCarsTX,
      ga: carsRecords?.newCarsGA,
      wa: carsRecords?.newCarsWA,
      ca: carsRecords?.newCarsCA,
    },
    {
      name: <FormattedMessage id="status.left" />,
      ng: carsRecords?.newLeftCarsNG,
      tx: carsRecords?.newLeftCarsTX,
      ga: carsRecords?.newLeftCarsGA,
      wa: carsRecords?.newLeftCarsWA,
      ca: carsRecords?.newLeftCarsCA,
    },
    {
      name: <FormattedMessage id="page.customer.dashboard.at_warehouse" />,
      ng: carsRecords?.newWearhouseCarsNG,
      tx: carsRecords?.newWearhouseCarsTX,
      ga: carsRecords?.newWearhouseCarsGA,
      wa: carsRecords?.newWearhouseCarsWA,
      ca: carsRecords?.newWearhouseCarsCA,
    },
    {
      name: <FormattedMessage id="page.customer.dashboard.in_shipping" />,
      ng: carsRecords?.newLoadingCarsNG,
      tx: carsRecords?.newLoadingCarsTX,
      ga: carsRecords?.newLoadingCarsGA,
      wa: carsRecords?.newLoadingCarsWA,
      ca: carsRecords?.newLoadingCarsCA,
    },

    {
      name: <FormattedMessage id="page.customer.dashboard.arrived" />,
      ng: carsRecords?.newArriveCarsNG,
      tx: carsRecords?.newArriveCarsTX,
      ga: carsRecords?.newArriveCarsGA,
      wa: carsRecords?.newArriveCarsWA,
      ca: carsRecords?.newArriveCarsCA,
    },
  ];
  return (
    <div className="" id="tabs-warehousecar" role="tabpanel">
      <div className="pt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-dark-blue text-xl font-semibold">
              <FormattedMessage id="page.customer.dashboard.states" />
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-[#005fb7] md:rounded-lg lg:max-w-[900px]">
                <table className="w-full divide-y divide-gray-300 ">
                  <thead className="bg-white">
                    <tr>
                      <th></th>
                      {carTableHeader.map((th) => (
                        <th
                          key={th.name}
                          scope="col"
                          className="text-dark-blue px-3 py-3.5 text-left text-sm font-semibold sm:text-xl"
                        >
                          {th.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {carTableData.map((tr, index) => (
                      <tr
                        key={tr.name}
                        className={classNames(
                          index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                          'text-xs sm:text-[17px]'
                        )}
                      >
                        <td className="text-dark-blue px-3 py-3.5 text-left text-sm font-semibold sm:text-xl">
                          {tr.name}
                        </td>
                        <td
                          className={classNames(
                            tr.ng !== '0' ? 'text-[#0193FF]' : 'text-[#1C1C1C]',
                            'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                          )}
                        >
                          {tr.ng}
                        </td>
                        <td
                          className={classNames(
                            tr.tx !== '0' ? 'text-[#0193FF]' : 'text-[#1C1C1C]',
                            'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                          )}
                        >
                          {tr.tx}
                        </td>
                        <td
                          className={classNames(
                            tr.ga !== '0' ? 'text-[#0193FF]' : 'text-[#1C1C1C]',
                            'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                          )}
                        >
                          {tr.ga}
                        </td>
                        <td
                          className={classNames(
                            tr.wa !== '0' ? 'text-[#0193FF]' : 'text-[#1C1C1C]',
                            'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                          )}
                        >
                          {tr.wa}
                        </td>
                        <td
                          className={classNames(
                            tr.ca !== '0' ? 'text-[#0193FF]' : 'text-[#1C1C1C]',
                            'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                          )}
                        >
                          {tr.ca}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StatesTab };
