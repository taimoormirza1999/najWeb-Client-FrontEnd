import { FormattedMessage } from 'react-intl';

import NotesButtonModal from '@/components/NotesButtonModal';
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
      <TableColumn scope="col" className="min-w-[60px] text-center">
        <NotesButtonModal
          note={car.picked_car_title_note}
          title={'Title Note'}
        />
      </TableColumn>
      <TableColumn
        scope="col"
        className="border-dark-blue min-w-[47px] border-[1px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.ETableColumn}
      </TableColumn>
    </tr>
  ));
};

export { Towing };
