import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { Pagination } from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';
import { FormattedMessage } from 'react-intl';

const carTableHeader = [
  { header: <FormattedMessage id="page.customer.dashboard.table.no" /> },
  {
    header: (
      <FormattedMessage id="page.customer.dashboard.table.auction_photo" />
    ),
  },
  {
    header: <FormattedMessage id="page.customer.dashboard.table.detail" />,
  },
  {
    header: <FormattedMessage id="page.customer.dashboard.table.lot_vin" />,
  },
  {
    header: <FormattedMessage id="page.customer.dashboard.table.auction" />,
  },
  {
    header: <FormattedMessage id="page.customer.dashboard.table.destination" />,
  },
  {
    header: (
      <FormattedMessage id="page.customer.dashboard.table.purchase_date" />
    ),
  },
  {
    header: (
      <FormattedMessage id="page.customer.dashboard.table.payment_date" />
    ),
  },
  {
    header: <FormattedMessage id="page.customer.dashboard.table.date_pick" />,
  },
  {
    header: <FormattedMessage id="page.customer.dashboard.table.arrived" />,
  },
  {
    header: <FormattedMessage id="page.customer.dashboard.table.title" />,
  },
  {
    header: <FormattedMessage id="page.customer.dashboard.table.key" />,
  },
  {
    header: <FormattedMessage id="page.customer.dashboard.table.images" />,
  },
];

const DeliveredCarTab = ({ carsRecords, totalRecords, baseUrl, page = 0 }) => {
  const paginationUrl = `${baseUrl}/customer/dashboard?tab=tabs-delivered&page=`;
  return (
    <div className="" id="tabs-delivered" role="tabpanel">
      <div className="pt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
<<<<<<< HEAD
            <h1 className="text-dark-blue text-xl font-semibold">
              <FormattedMessage id="page.customer.dashboard.delivered" />
=======
            <h1 className="text-dark-blue text-2xl font-semibold">
              Delivered Cars
>>>>>>> 6ef0d723c0c840bb33ae639180707ba126bc6481
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 border border-[#005fb7]">
                  <thead className="bg-white">
                    <tr>
                      {carTableHeader.map((th) => (
                        <th
                          key={th.name}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-blue-600 sm:text-xl"
                        >
                          {th.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {carsRecords.map((car, index) => (
                      <tr
                        key={car.carId}
                        className={classNames(
                          index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                          'text-xs sm:text-[17px]'
                        )}
                      >
                        <td
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {index + 1}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[56px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          <img src={car.image} alt="" />
                        </td>
                        <td
                          scope="col"
                          className="min-w-[180px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.carMakerName} {car.carModelName} {car.year}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[130px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          Lot: {car.lotnumber} <br /> Vin: {car.vin}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[160px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.auction_location_name} <br /> {car.aTitle}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.port_name}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.purchasedate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.paymentDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[30px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.picked_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                        >
                          {car.arrival_date}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[60px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.delivered_title === '1' ||
                          car.follow_title === '1' ? (
                            <CheckCircleIcon
                              className="h-6 w-6 text-green-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircleIcon
                              className="h-6 w-6 text-red-400"
                              aria-hidden="true"
                            />
                          )}
                          <br />
                          {car.titleDate}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[63px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          {car.delivered_car_key === '1' ? (
                            <CheckCircleIcon
                              className="h-6 w-6 text-green-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircleIcon
                              className="h-6 w-6 text-red-400"
                              aria-hidden="true"
                            />
                          )}
                        </td>
                        <td
                          scope="col"
                          className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                        >
                          <img src={car.image} alt="" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          totalRecords={totalRecords}
          page={page}
          url={paginationUrl}
        ></Pagination>
      </div>
    </div>
  );
};

export { DeliveredCarTab };
