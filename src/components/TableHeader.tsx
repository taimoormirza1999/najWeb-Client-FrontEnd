import { FormattedMessage } from 'react-intl';
import { Sort } from '@/components/dashboard/sort';

export default function TableHeader(props) {
  const {tableHeader} = props;
  const order = props?.order || '';

  return (
    <thead className="bg-white">
      <tr>
        {tableHeader.map((th, index) => (
          <th
            key={index}
            scope="col"
            className="px-1 py-1 text-left font-semibold text-blue-600 border-[#01318842] border-[1px] text-[13px]"
          >
            <div className="flex items-center justify-between">
                <FormattedMessage id={th.header || th.name || th } />
                <Sort
                  order={order}
                  elemOrder={th?.order}
                  index={index}
                />
              </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
