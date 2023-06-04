import { FormattedMessage } from 'react-intl';

import { Sort } from '@/components/dashboard/sort';

export default function TableHeader(props) {
  const { tableHeader } = props;
  const order = props?.order || '';

  return (
    <thead className="bg-white">
      <tr>
        {tableHeader.map((th, index) => (
          <th
            key={index}
            scope="col"
            className="border-[1px] border-[#01318842] p-1 text-left text-[13px] font-semibold text-blue-600"
          >
            <div className="flex items-center justify-between">
              <FormattedMessage id={th.header || th.name || th} />
              <Sort order={order} elemOrder={th?.order} index={index} />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
