import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { FormattedMessage } from 'react-intl';

import NotesButtonModal from '@/components/NotesButtonModal';
import TableColumn from '@/components/TableColumn';
import { classNames } from '@/utils/Functions';

const Port = ({ carsRecords, setArrivedStoreModalOpen, addIndex }) => {
  const { data: session } = useSession();
  return carsRecords.map((car, index) => (
    <tr
      key={index}
      className={classNames(
        index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
        'text-sm'
      )}
    >
      <TableColumn scope="col" className="w-[2px]">
        {addIndex + index + 1}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[56px]">
        <img className="table_auction_img" src={car.image} alt="" />
      </TableColumn>
      <TableColumn scope="col" className="min-w-[180px]">
        {car.carMakerName} {car.carModelName} {car.year}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[150px]">
        Lot: {car.lotnumber} <br /> Vin: {car.vin}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[150px] ">
        {car.auctionLocationName} <br /> {car.auctionTitle}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[154px] ">
        <FormattedMessage id="general.buyer_number" />: {car.buyer_number}{' '}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[64px] ">
        {car.region}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[64px]">
        {car.portName}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[55px]">
        {car.purchasedDate}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[64px]">
        {car.pickedDate}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px] text-center">
        <NotesButtonModal
          note={car.picked_car_title_note}
          title={'Pick Up Note'}
        />
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px]">
        {car.arrivedDate}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[30px]">
        {car.deliveredTitle === '1' ? (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        )}
        {car.titleDate}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[30px]">
        {car.deliveredKey === '1' ? (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        )}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px]">
        {car.loaded_date}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px]">
        {car.booking_number}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px]">
        {car.container_number}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px]">
        {car.shipping_date}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px]">
        {car.arrival_date}
      </TableColumn>
      {session?.profile[0]?.naj_branch === '1' ? (
        <TableColumn scope="col" className="min-w-[47px]">
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
