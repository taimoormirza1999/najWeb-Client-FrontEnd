import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { classNames } from '@/utils/Functions';

const SubMenu = ({ type, subType, tabsCount }) => {
  let subMenus: any;

  if (type === 'delivered') {
    subMenus = [
      {
        name: 'page.customer.dashboard.paid',
        href: 'paid',
        count: tabsCount?.deliveredPaid,
      },
      {
        name: 'page.customer.dashboard.unpaid',
        href: 'unPaid',
        count: tabsCount?.deliveredUnPaid,
      },
    ];
  }

  return subMenus ? (
    <nav
      className="mt-[15px] flex max-w-max flex-wrap gap-2 rounded-md border border-blue-600 px-2 sm:gap-4"
      aria-label="Tabs"
    >
      {subMenus.map((status, index) => (
        <Link
          key={index}
          href={{
            pathname: '/customer/containers/',
            query: {
              tab: type,
              type: status.href,
            },
          }}
        >
          <a
            key={index}
            className={classNames(
              subType === status.href
                ? ' text-[#0093FF]'
                : 'text-gray-500 hover:text-gray-700',
              'px-1 py-0 font-medium text-sm sm:text-base sm:py-2'
            )}
          >
            <FormattedMessage id={status.name} /> ({status.count})
          </a>
        </Link>
      ))}
    </nav>
  ) : (
    <div></div>
  );
};
export { SubMenu };
