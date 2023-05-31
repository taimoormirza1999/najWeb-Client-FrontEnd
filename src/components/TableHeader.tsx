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
            className="px-3 py-3.5 text-left text-base font-semibold text-blue-600 border-dark-blue border-[1px]"
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
