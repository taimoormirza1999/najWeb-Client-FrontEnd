import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { classNames } from '@/utils/Functions';

const SubMenu = ({ type, subType }) => {
  let subMenus: any;
  if (type === 'tabs-newcar') {
    subMenus = [
      {
        name: 'page.customer.dashboard.unpaid',
        href: 'unpaid',
      },
      {
        name: 'page.customer.dashboard.cancelled',
        href: 'cancelled',
      },
      {
        name: 'page.customer.dashboard.paid',
        href: 'paid',
      },
      {
        name: 'page.customer.dashboard.paid_by_customer',
        href: 'paid_bycustomer',
      },
      {
        name: 'page.customer.dashboard.in_towing',
        href: 'towing',
      },
    ];
  }
  if (type === 'tabs-delivered') {
    subMenus = [
      {
        name: 'page.customer.dashboard.paid',
        href: 'Paid',
      },
      {
        name: 'page.customer.dashboard.unpaid',
        href: 'unpaid',
      },
    ];
  }
  if (type === 'tabs-arrived') {
    subMenus = [
      {
        name: 'page.customer.dashboard.arrived_port',
        href: 'port',
      },
      {
        name: 'page.customer.dashboard.arrived_store',
        href: 'store',
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
            pathname: '/customer/dashboard/',
            query: { tab: type, type: status.href },
          }}
        >
          <a
            key={status.href}
            className={classNames(
              subType === status.href
                ? ' text-blue-600'
                : 'text-gray-500 hover:text-gray-700',
              'px-1 py-0 font-medium text-sm sm:text-base sm:py-2'
            )}
          >
            <FormattedMessage id={status.name} />
          </a>
        </Link>
      ))}
    </nav>
  ) : (
    <div></div>
  );
};
export { SubMenu };
