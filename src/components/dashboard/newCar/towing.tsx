import { classNames } from '@/utils/Functions';

const Towing = ({ carsRecords }) => {
  return carsRecords.map((car, index) => (
    <tr
      key={car.carId}
      className={classNames(
        index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
        'text-xs sm:text-[17px]'
      )}
    >
      <td
        scope="col"
        className="w-[2px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {index + 1}
      </td>
      <td
        scope="col"
        className="min-w-[56px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        <img src={car.image} alt="" />
      </td>
      <td
        scope="col"
        className="min-w-[180px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.carMakerName} {car.carModelName} {car.year}
      </td>
      <td
        scope="col"
        className="min-w-[130px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        Lot: {car.lotnumber} <br /> Vin: {car.vin}
      </td>
      <td
        scope="col"
        className="min-w-[160px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.auctionLocationName} <br /> {car.auctionTitle}
      </td>
      <td
        scope="col"
        className="min-w-[64px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      ></td>
      <td
        scope="col"
        className="min-w-[55px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.purchasedDate}
      </td>
      <td
        scope="col"
        className="min-w-[50px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      ></td>
      <td
        scope="col"
        className="min-w-[30px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      ></td>
      <td
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      ></td>
    </tr>
  ));
};

export { Towing };
