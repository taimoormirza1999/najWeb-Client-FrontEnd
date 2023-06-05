import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { classNames } from '@/utils/Functions';

const SubMenu = ({ type, subType, dashboardCount }) => {
  let subMenus: any;
  if (type === 'tabs-newcar') {
    subMenus = [
      {
        name: 'page.customer.dashboard.unpaid',
        href: 'unpaid',
        count: dashboardCount?.newCarsUnpaidCount,
      },
      {
        name: 'page.customer.dashboard.cancelled',
        href: 'cancelled',
        count: dashboardCount?.newCarsCancelledCount,
      },
      {
        name: 'page.customer.dashboard.paid',
        href: 'paid',
        count: dashboardCount?.newCarsPaidCount,
      },
      {
        name: 'page.customer.dashboard.paid_by_customer',
        href: 'paid_bycustomer',
        count: dashboardCount?.newCarsPaidByCustomerCount,
      },
      {
        name: 'page.customer.dashboard.in_towing',
        href: 'towing',
        count: dashboardCount?.newCarsPickedCount,
      },
    ];
  }
  if (type === 'tabs-delivered') {
    subMenus = [
      {
        name: 'page.customer.dashboard.paid',
        href: 'Paid',
        count: dashboardCount?.carsDeliverdPaidCount,
      },
      {
        name: 'page.customer.dashboard.unpaid',
        href: 'unpaid',
          count: dashboardCount?.carsDeliverdUnPaidCount,
      },
    ];
  }
  if (type === 'tabs-arrived') {
    subMenus = [
      {
        name: 'page.customer.dashboard.arrived_port',
        href: 'port',
        count: dashboardCount?.carsArrivedPortCount,
      },
      {
        name: 'page.customer.dashboard.arrived_store',
        href: 'store',
        count: dashboardCount?.carsArrivedStoreCount,
      },
    ];
  }
  return subMenus ? (
    <nav
      className="mt-[15px] max-w-max flex-wrap gap-2 rounded-md border border-blue-600 px-2 sm:gap-4 py-[7px]"
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
                ? ' text-[#0093FF]'
                : 'text-gray-500 hover:text-gray-700',
              'px-1 py-0 font-medium text-sm sm:text-base sm:py-2 mx-2'
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
