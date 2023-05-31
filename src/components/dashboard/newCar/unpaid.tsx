import { classNames } from '@/utils/Functions';
import TableColumn from '@/components/TableColumn';

const UnPaid = ({ carsRecords }) => {
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
        className="w-[2px] "
      >
        {index + 1}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[56px] "
      >
        <img className="max-h-[50px]" src={car.image} alt="" />
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[180px] "
      >
        {car.carMakerName} {car.carModelName} {car.year}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[130px] "
      >
        Lot: {car.lotnumber} <br /> Vin: {car.vin}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[160px] "
      >
        {car.auctionLocationName} <br /> {car.auctionTitle} <br />
        {car.region}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[64px] "
      >
        {car.destination}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[55px] "
      >
        {car.purchasedDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[50px] "
      >
        {car.lasTableColumnateToPay}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[30px] "
      >
        {car.daysOff}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px] "
      >
        {car.extraDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[60px] "
      >
        {car.remainingDays}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[63px] "
      >
        {car.startStorage}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[50px] "
      >
        {car.carCostUSD ? `${car.carCostUSD} $` : ''}
        <br />
        {car.carCostAED ? `${car.carCostAED} AED` : ''}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[60px] "
      >
        {car.late_payment_fineUSD ? `${car.late_payment_fineUSD} $` : ''}
        <br />
        {car.late_payment_fineAED ? `${car.late_payment_fineAED} AED` : ''}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[60px] "
      >
        {car.fineTotalCostUSD ? `${car.fineTotalCostUSD} $` : ''}
        <br />
        {car.fineTotalCost ? `${car.fineTotalCost} AED` : ''}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[60px] "
      >
        {car.totalUSD ? `${car.totalUSD} $` : ''}
        <br />
        {car.totalAED ? `${car.totalAED} AED` : ''}
      </TableColumn>
    </tr>
  ));
};

export { UnPaid };
