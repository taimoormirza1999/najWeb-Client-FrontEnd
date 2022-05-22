import { CheckCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';

import { classNames } from '@/utils/Functions';

const Store = ({ carsRecords }) => {
  return carsRecords.map((car, index) => (
    <tr
      key={index}
      className={classNames(
        index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
        'text-sm'
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
        <img className="max-h-[50px]" src={car.image_small} alt="" />
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
        className="min-w-[30px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        {car.picked_date}
      </td>
      <td
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.delivered_date}
      </td>
      <td
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
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        )}
      </td>
      <td
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.loaded_date}
      </td>
      <td
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.booking_number}
      </td>
      <td
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.container_number}
      </td>
      <td
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.shipping_date}
      </td>
      <td
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.arrival_date}
      </td>
      <td
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.receive_date}
      </td>
      <td
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.total_price}
      </td>
      <td
        scope="col"
        className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
      >
        <img className="max-h-[50px]" src={car.image} alt="" />
      </td>
    </tr>
  ));
};

export { Store };
