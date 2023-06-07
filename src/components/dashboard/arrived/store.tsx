import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { FormattedMessage } from 'react-intl';

import ImagesViewer from '@/components/cars/ImagesViewer';
import NotesButtonModal from '@/components/NotesButtonModal';
import TableColumn from '@/components/TableColumn';
import { classNames } from '@/utils/Functions';

const Store = ({ carsRecords, setDeliveredModalOpen, addIndex }) => {
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
        <ImagesViewer
          loading={false}
          warehouse={false}
          store={true}
          car_id={car.car_id}
          single_image={car.image_small}
          // container_no={row.container_number}
        />
      </TableColumn>
      <TableColumn scope="col" className="min-w-[180px]">
        {car.carMakerName} {car.carModelName} {car.year}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[150px]">
        Lot: {car.lotnumber} <br /> Vin: {car.vin}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[130px]">
        {car.auction_location_name} | {car.aTitle}{' '}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[180px]">
        <FormattedMessage id="general.buyer_number" />: {car.buyer_number}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[80px]">
        {car.region}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[100px]">
        {car.port_name}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[65px]">
        {car.purchasedate}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[65px]">
        {car.picked_date}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[65px] text-center">
        <NotesButtonModal
          note={car.picked_car_title_note}
          title={'Pickup Note'}
        />
      </TableColumn>
      <TableColumn scope="col" className="min-w-[65px]">
        {car.delivered_date}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[30px]">
        {car.delivered_title === '1' || car.follow_title === '1' ? (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        )}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[63px]">
        {car.titleDate}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[30px]">
        {car.delivered_car_key === '1' ? (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        )}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[65px]">
        {car.loaded_date}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px]">
        {car.booking_number}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px]">
        {car.container_number}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[65px]">
        {car.shipping_date}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[65px]">
        {car.arrival_date}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[65px]">
        {car.receive_date}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px]">
        {car.total_price}
      </TableColumn>
      {session?.profile[0]?.naj_branch === '1' ? (
        <TableColumn scope="col" className="min-w-[47px]">
          {car.isUAEPort === '0' ? (
            <button
              type="button"
              className="border-azure-blue text-azure-blue inline-block max-w-max rounded-md border-2 px-2 py-1  text-sm"
              onClick={() => {
                setDeliveredModalOpen(car.car_id);
              }}
            >
              <CheckCircleIcon className="h-4 w-4 text-green-400" />
              <FormattedMessage id="page.customer.dashboard.table.deliver" />
            </button>
          ) : null}
        </TableColumn>
      ) : null}
    </tr>
  ));
};

export { Store };
