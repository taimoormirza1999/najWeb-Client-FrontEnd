import { FormattedMessage } from 'react-intl';

import TableColumn from '@/components/TableColumn';
import { classNames } from '@/utils/Functions';

const Towing = ({ carsRecords }) => {
  return carsRecords.map((car, index) => (
    <tr
      key={index}
      className={classNames(
        index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
        'text-sm'
      )}
    >
      <TableColumn scope="col" className="w-[2px]">
        {index + 1}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[56px]">
        <img className="table_auction_img" src={car.image} alt="" />
      </TableColumn>
      <TableColumn scope="col" className="min-w-[180px]">
        {car.carMakerName} {car.carModelName} {car.year}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[140px]">
        Lot: {car.lotnumber} <br /> Vin: {car.vin}
      </TableColumn>
      {/* <TableColumn
        scope="col"
        className="min-w-[160px] "
      >
        {car.auctionLocationName} <br /> {car.auctionTitle} <br />
        <FormattedMessage id="general.buyer_number" />: {car.buyer_number}{' '}
        <br />
        {car.region}
      </TableColumn> */}
      <TableColumn scope="col" className="min-w-[120px] ">
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
      <TableColumn scope="col" className="min-w-[55px] ">
        {car.purchasedDate}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[60px] ">
        {car.paymenTableColumnate}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[80px] ">
        {car.pickedDate}
      </TableColumn>
      <TableColumn scope="col" className="min-w-[47px] ">
        {car.ETableColumn}
      </TableColumn>
    </tr>
  ));
};

export { Towing };
