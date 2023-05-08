import { FormattedMessage } from 'react-intl';

export default function TableHeader({ tableHeader }) {
  return (
    <thead className="bg-white">
      <tr>
        {tableHeader.map((th, index) => (
          <th
            key={index}
            scope="col"
            className="px-3 py-3.5 text-left text-base font-semibold text-blue-600"
          >
            <FormattedMessage id={th.name} />
          </th>
        ))}
      </tr>
    </thead>
  );
}
