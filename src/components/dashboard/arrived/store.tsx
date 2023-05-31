import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { FormattedMessage } from 'react-intl';

import { classNames } from '@/utils/Functions';
import TableColumn from '@/components/TableColumn';

const Store = ({ carsRecords, GetImages, setDeliveredModalOpen, addIndex }) => {
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
        <img
          className="max-h-[50px] cursor-pointer"
          src={car.image_small}
          alt=""
          onClick={() => {
            GetImages(car.id);
          }}
        />
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
        {car.auction_location_name} <br /> {car.aTitle} <br />
        {car.region}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.port_name}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.purchasedate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[30px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.picked_date}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px]"
      >
        {car.delivered_date}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[60px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.delivered_title === '1' || car.follow_title === '1' ? (
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
        {car.delivered_car_key === '1' ? (
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
      <TableColumn
        scope="col"
        className="min-w-[47px]"
      >
        {car.receive_date}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px]"
      >
        {car.total_price}
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
