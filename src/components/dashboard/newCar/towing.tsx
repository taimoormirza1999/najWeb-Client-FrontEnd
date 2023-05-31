import { classNames } from '@/utils/Functions';
import TableColumn from '@/components/TableColumn';

const Towing = ({ carsRecords }) => {
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
        className="w-[2px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        {index + 1}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[56px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        <img className="max-h-[50px]" src={car.image} alt="" />
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[180px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        {car.carMakerName} {car.carModelName} {car.year}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[130px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        Lot: {car.lotnumber} <br /> Vin: {car.vin}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[160px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        {car.auctionLocationName} <br /> {car.auctionTitle} <br />
        {car.region}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[64px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        {car.portName}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[55px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        {car.purchasedDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[50px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        {car.paymenTableColumnate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[30px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        {car.pickedDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
      >
        {car.ETableColumn}
      </TableColumn>
    </tr>
  ));
};

export { Towing };
