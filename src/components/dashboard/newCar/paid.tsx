import { FormattedMessage } from 'react-intl';

import { classNames } from '@/utils/Functions';
import TableColumn from '@/components/TableColumn';

const Paid = ({ carsRecords }) => {
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
        className="w-[2px]"
      >
        {index + 1}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[56px]"
      >
        <img className="max-h-[50px]" src={car.image} alt="" />
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[180px]"
      >
        {car.carMakerName} {car.carModelName} {car.year}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[130px]"
      >
        Lot: {car.lotnumber} <br /> Vin: {car.vin}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[160px] "
      >
        {car.auctionLocationName} <br /> {car.auctionTitle} <br />
        <FormattedMessage id="general.buyer_number" />: {car.buyer_number}{' '}
        <br />
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
        {car.carCostAED}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[30px] "
      >
        {car.paymenTableColumnate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[47px] "
      >
        {car.total_paida}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[63px] "
      >
        {car.remainingAmount}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[50px] "
      >
        <span
          className={classNames(
            car.status === 'Cancelled'
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800',
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
          )}
        >
          {car.status}
        </span>
      </TableColumn>
    </tr>
  ));
};

export { Paid };
