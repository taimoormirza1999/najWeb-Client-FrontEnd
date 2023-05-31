import React from 'react';
import { FormattedMessage } from 'react-intl';
import { classNames } from '@/utils/Functions';
import TableColumn from '@/components/TableColumn';

const Cancelled = ({ carsRecords }) => {
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
        <FormattedMessage id="general.buyer_number" />: {car.buyer_number}{' '}
        <br />
        {car.region}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[64px] "
      >
        {car.port_name}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[55px] "
      >
        {car.purchaseDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[50px] "
      >
        {car.cancellationDate}
      </TableColumn>
      <TableColumn
        scope="col"
        className="min-w-[30px] "
      >
        {car.totalAED}
      </TableColumn>
    </tr>
  ));
};

export { Cancelled };
