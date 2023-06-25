import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { classNames } from '@/utils/Functions';

import MapChart from '../chart/MapChart';

const carTableHeader = [
  { name: 'status.new_jersey' },
  { name: 'status.texas' },
  { name: 'status.georgia' },
  { name: 'status.washington' },
  { name: 'status.california' },
];

const StatesTab = ({ carsRecords }) => {
  const carTableData = [
    {
      name: 'page.customer.dashboard.new_cars',
      query: {
        tab: 'tabs-newcar',
        page: '',
        limit: '10',
        search: '',
      },
      ng: carsRecords?.newCarsNG,
      tx: carsRecords?.newCarsTX,
      ga: carsRecords?.newCarsGA,
      wa: carsRecords?.newCarsWA,
      ca: carsRecords?.newCarsCA,
    },
    {
      name: 'status.left',
      query: {
        tab: 'tabs-newcar',
        type: 'towing',
        page: '',
        limit: '10',
        search: '',
      },
      ng: carsRecords?.newLeftCarsNG,
      tx: carsRecords?.newLeftCarsTX,
      ga: carsRecords?.newLeftCarsGA,
      wa: carsRecords?.newLeftCarsWA,
      ca: carsRecords?.newLeftCarsCA,
    },
    {
      name: 'page.customer.dashboard.at_warehouse',
      query: {
        tab: 'tabs-warehouse',
        page: '',
        limit: '10',
        search: '',
      },
      ng: carsRecords?.newWearhouseCarsNG,
      tx: carsRecords?.newWearhouseCarsTX,
      ga: carsRecords?.newWearhouseCarsGA,
      wa: carsRecords?.newWearhouseCarsWA,
      ca: carsRecords?.newWearhouseCarsCA,
    },
    {
      name: 'page.customer.dashboard.in_shipping',
      query: {
        tab: 'tabs-shipping',
        page: '',
        limit: '10',
        search: '',
      },
      ng: carsRecords?.newLoadingCarsNG,
      tx: carsRecords?.newLoadingCarsTX,
      ga: carsRecords?.newLoadingCarsGA,
      wa: carsRecords?.newLoadingCarsWA,
      ca: carsRecords?.newLoadingCarsCA,
    },

    {
      name: 'page.customer.dashboard.arrived_port',
      query: {
        tab: 'tabs-arrived',
        type: 'port',
        page: '',
        limit: '10',
        search: '',
      },
      ng: carsRecords?.newArrivePortCarsNG,
      tx: carsRecords?.newArrivePortCarsTX,
      ga: carsRecords?.newArrivePortCarsGA,
      wa: carsRecords?.newArrivePortCarsWA,
      ca: carsRecords?.newArrivePortCarsCA,
    },
    {
      name: 'page.customer.dashboard.arrived_store',
      query: {
        tab: 'tabs-arrived',
        type: 'store',
        page: '',
        limit: '10',
        search: '',
      },
      ng: carsRecords?.newArriveStoreCarsNG,
      tx: carsRecords?.newArriveStoreCarsTX,
      ga: carsRecords?.newArriveStoreCarsGA,
      wa: carsRecords?.newArriveStoreCarsWA,
      ca: carsRecords?.newArriveStoreCarsCA,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="" id="tabs-warehousecar" role="tabpanel">
        <div className="pt-14">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-dark-blue text-3xl font-semibold">
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
                        {carTableHeader.map((th, index) => (
                          <th
                            key={index}
                            scope="col"
                            className="text-dark-blue px-3 py-3.5 text-left text-sm font-semibold sm:text-xl"
                          >
                            <FormattedMessage id={th.name} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {carTableData.map((tr, index) => (
                        <tr
                          key={index}
                          className={classNames(
                            index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                            'text-xs sm:text-[17px]'
                          )}
                        >
                          <td className="text-dark-blue px-3 py-3.5 text-left text-sm font-semibold sm:text-xl">
                            <FormattedMessage id={tr.name} />
                          </td>
                          <td
                            className={classNames(
                              tr.ng !== '0'
                                ? 'text-gray-800'
                                : 'text-[#1C1C1C]',
                              'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                            )}
                          >
                            {tr.ng !== '0' ? (
                              <Link
                                href={{
                                  pathname: '/customer/dashboard/',
                                  query: { ...tr.query, region: 4 },
                                }}
                              >
                                <a target={'blank'}>{tr.ng}</a>
                              </Link>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td
                            className={classNames(
                              tr.tx !== '0'
                                ? 'text-gray-800'
                                : 'text-[#1C1C1C]',
                              'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                            )}
                          >
                            {tr.tx !== '0' ? (
                              <Link
                                href={{
                                  pathname: '/customer/dashboard/',
                                  query: { ...tr.query, region: 2 },
                                }}
                              >
                                <a target={'blank'}>{tr.tx}</a>
                              </Link>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td
                            className={classNames(
                              tr.ga !== '0'
                                ? 'text-gray-800'
                                : 'text-[#1C1C1C]',
                              'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                            )}
                          >
                            {tr.ga !== '0' ? (
                              <Link
                                href={{
                                  pathname: '/customer/dashboard/',
                                  query: { ...tr.query, region: 1 },
                                }}
                              >
                                <a target={'blank'}>{tr.ga}</a>
                              </Link>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td
                            className={classNames(
                              tr.wa !== '0'
                                ? 'text-gray-800'
                                : 'text-[#1C1C1C]',
                              'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                            )}
                          >
                            {tr.wa !== '0' ? (
                              <Link
                                href={{
                                  pathname: '/customer/dashboard/',
                                  query: { ...tr.query, region: 5 },
                                }}
                              >
                                <a target={'blank'}>{tr.wa}</a>
                              </Link>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td
                            className={classNames(
                              tr.ca !== '0'
                                ? 'text-gray-800'
                                : 'text-[#1C1C1C]',
                              'px-3 py-3.5 text-left text-sm font-semibold  sm:text-xl'
                            )}
                          >
                            {tr.ca !== '0' ? (
                              <Link
                                href={{
                                  pathname: '/customer/dashboard/',
                                  query: { ...tr.query, region: 3 },
                                }}
                              >
                                <a target={'blank'}>{tr.ca}</a>
                              </Link>
                            ) : (
                              '-'
                            )}
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
      <div className="mt-[35px]">
        <MapChart carsRecords={carsRecords} />
      </div>
    </div>
  );
};

export { StatesTab };
