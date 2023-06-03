import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { FormattedMessage } from 'react-intl';

import { classNames } from '@/utils/Functions';
import TableColumn from '@/components/TableColumn';

const Port = ({
  carsRecords,
  setArrivedStoreModalOpen,
  addIndex,
  setOpenNote,
  setNote,
}) => {
  const { data: session } = useSession();
  return carsRecords.map((car, index) => (
    <tr
      key={index}
      className={classNames(
        index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
        'text-sm'
      )}
    >
      <TableColumn
        scope="col"
        className="w-[2px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {addIndex + index + 1}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[56px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        <img className="max-h-[50px]" src={car.image} alt="" />
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[180px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.carMakerName} {car.carModelName} {car.year}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[130px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        Lot: {car.lotnumber} <br /> Vin: {car.vin}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[160px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.auctionLocationName} <br /> {car.auctionTitle} <br />
        <FormattedMessage id="general.buyer_number" />: {car.buyer_number}{' '}
        <br />
        {car.region}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.portName}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.purchasedDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[30px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.pickedDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[60px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        <button
          type="button"
          onClick={() => {
            setNote(car.picked_car_title_note);
            setOpenNote(true);
          }}
          className={classNames(
            !car.picked_car_title_note ? 'hidden' : '',
            'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          )}
        >
          Notes
        </button>
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px]"
      >
        {car.arrivedDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[60px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.deliveredTitle === '1' ? (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        )}
        <br />
        {car.titleDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[63px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.deliveredKey === '1' ? (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        )}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px]"
      >
        {car.loaded_date}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px]"
      >
        {car.booking_number}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px]"
      >
        {car.container_number}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px]"
      >
        {car.shipping_date}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px]"
      >
        {car.arrival_date}
      </TableColumn>
      {session?.profile[0]?.naj_branch === '1' ? (
        <TableColumn
          scope="col"
          className="min-w-[47px]"
        >
          {car.isUAEPort === '0' ? (
            <button
              type="button"
              className="border-azure-blue text-azure-blue inline-block max-w-max rounded-md border-2 px-2 py-1  text-sm"
              onClick={() => {
                setArrivedStoreModalOpen(car.carId);
              }}
            >
              <CheckCircleIcon className="h-4 w-4 text-green-400" />
              <FormattedMessage id="page.customer.dashboard.table.arrive" />
            </button>
          ) : null}
        </TableColumn>
      ) : null}
    </tr>
  ));
};

export { Port };
