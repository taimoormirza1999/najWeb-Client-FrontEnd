import axios from 'axios';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ArrivedCarTab } from '@/components/dashboard/arrivedCarTab';
import { DeliveredCarTab } from '@/components/dashboard/deliveredCarTab';
import { NewCarTab } from '@/components/dashboard/newCarTab';
import { SearchLot } from '@/components/dashboard/searchLot';
import { ShippingCarTab } from '@/components/dashboard/shippingCarTab';
import { ShowAllCars } from '@/components/dashboard/showAllCars';
import { StatesTab } from '@/components/dashboard/statesTab';
import { SubMenu } from '@/components/dashboard/subMenu';
import { WarehouseCarTab } from '@/components/dashboard/warehouseCarTab';
import UserContext from '@/components/userContext';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { classNames } from '@/utils/Functions';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;

  const tab = context.query.tab ? context.query.tab : 'tabs-states';
  let type = context.query.type ? context.query.type : '';
  const page = context.query.page ? context.query.page : 0;
  const limit = context.query.limit ? context.query.limit : '10';
  const session: any = await getSession(context);

  let carsData = {};
  let dashboardCount = {};
  let apiTab = 'statesCount';
  if (tab === 'showAllCars') {
    apiTab = 'showAllCars';
  }
  if (tab === 'tabs-newcar') {
    apiTab = 'newCars';
  }
  if (tab === 'tabs-warehouse') {
    apiTab = 'warehouseCars';
  }
  if (tab === 'tabs-shipping') {
    apiTab = 'onWayCars';
  }
  if (tab === 'tabs-arrived') {
    if (!type || type === 'port') {
      type = 'port';
      apiTab = 'portCars';
    } else {
      type = 'store';
      apiTab = 'carsArrivedStore';
    }
  }
  if (tab === 'tabs-states') {
    apiTab = 'statesCount';
  }
  if (tab === 'tabs-delivered') {
    apiTab = 'deliveredCars';
  }
  let apiUrl = process.env.API_URL + apiTab;
  if (tab === 'tabs-delivered') {
    if (!type) {
      type = 'Paid';
    }
    apiUrl += `?type=${type}`;
  }
  if (apiTab === 'newCars') {
    if (!type) {
      type = 'unpaid';
    }
    if (type === 'paid' || type === 'unpaid' || type === 'paid_bycustomer') {
      apiUrl += `?${type}=1`;
    }
    if (type === 'towing') {
      apiUrl = `${process.env.API_URL}towingCars`;
    }
    if (type === 'cancelled') {
      apiUrl = `${process.env.API_URL}customer/allCancelledCars`;
    }
  }
  if (
    tab === 'tabs-arrived' ||
    apiTab === 'warehouseCars' ||
    apiTab === 'onWayCars' ||
    apiTab === 'showAllCars' ||
    type === 'towing' ||
    type === 'cancelled'
  ) {
    apiUrl = `${apiUrl}?page=${page}&limit=${limit}`;
  } else if (apiTab !== 'statesCount') {
    apiUrl = `${apiUrl}&page=${page}&limit=${limit}`;
  }
  if (session && session.token && session.token.access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
    await axios
      .get(`${apiUrl}`)
      .then((response) => {
        // handle success
        carsData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    // get dashboard count
    await axios
      .get(`${process.env.API_URL}dashboard/cars/count`)
      .then((response) => {
        dashboardCount = response.data?.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return {
    props: {
      carsData,
      dashboardCount,
    },
  };
}
const Dashboard = ({ router, carsData, dashboardCount }) => {
  const { setLoading } = useContext(UserContext);
  const {
    query: { tab, type, page },
  } = router;
  let {
    query: { limit },
  } = router;
  const [subMenu, setSubMenu] = useState(tab);
  let currentPage = page;
  if (!currentPage) {
    currentPage = 0;
  }
  if (!limit) {
    limit = 10;
  }
  const newCarCount =
    parseInt(dashboardCount?.newCarsUnpaidCount, 10) +
    parseInt(dashboardCount?.newCarsPaidCount, 10) +
    parseInt(dashboardCount?.newCarsPaidByCustomerCount, 10) +
    parseInt(dashboardCount?.newCarsCancelledCount, 10) +
    parseInt(dashboardCount?.newCarsPickedCount, 10);
  const tabs = [
    {
      name: 'page.customer.dashboard.new_cars',
      href: 'tabs-newcar',
      count: newCarCount,
      subMenu: true,
    },
    {
      name: 'page.customer.dashboard.at_warehouse',
      href: 'tabs-warehouse',
      count: parseInt(dashboardCount?.carsOnWarehouseCount, 10),
      subMenu: false,
    },
    {
      name: 'page.customer.dashboard.in_shipping',
      href: 'tabs-shipping',
      count: parseInt(dashboardCount?.carsShippingStatusCount, 10),
      subMenu: false,
    },
    {
      name: 'page.customer.dashboard.arrived',
      href: 'tabs-arrived',
      count:
        parseInt(dashboardCount?.carsArrivedPortCount, 10) +
        parseInt(dashboardCount?.carsArrivedStoreCount, 10),
      subMenu: true,
    },
    {
      name: 'page.customer.dashboard.delivered',
      href: 'tabs-delivered',
      count:
        parseInt(dashboardCount?.carsDeliverdPaidCount, 10) +
        parseInt(dashboardCount?.carsDeliverdUnPaidCount, 10),
      subMenu: true,
    },
    {
      name: 'page.customer.dashboard.states',
      href: 'tabs-states',
      subMenu: false,
    },
  ];
  let carsRecords;
  let totalRecords = 0;
  if (carsData.data) {
    carsRecords = carsData.data;
    totalRecords = carsData.totalRecords;
  } else {
    carsRecords = [];
  }
  return (
    <Layout meta={<Meta title="Dashboard" description="" />}>
      <div>
        <div className="m-8">
          <div className="flex">
            <h4 className="text-dark-blue flex-1 pb-8 text-2xl font-semibold sm:text-4xl">
              <i className="material-icons text-yellow-orange align-middle ltr:mr-2 rtl:ml-2">
                &#xe14f;
              </i>
              <FormattedMessage id="page.customer.dashboard.cars_summary" />
            </h4>
            <SearchLot></SearchLot>
          </div>
          <div>
            <nav className="flex flex-wrap gap-2 lg:inline" aria-label="Tabs">
              {tabs.map((tabData, index) =>
                tabData.subMenu ? (
                  <a
                    key={index}
                    className={classNames(
                      (!tab && tabData.href === 'tabs-states') ||
                        tab === tabData.href
                        ? 'bg-[#005FB7] text-white'
                        : 'text-blue-600 hover:text-gray-700',
                      'mr-3 px-3 py-2 cursor-pointer font-medium rounded-md hover:border-inherit border-2 border-blue-600 text-sm sm:text-xl'
                    )}
                    onClick={() => setSubMenu(tabData.href)}
                  >
                    <FormattedMessage id={tabData.name} />{' '}
                    {tabData.count ? `(${tabData.count})` : ''}
                  </a>
                ) : (
                  <Link
                    key={index}
                    href={{
                      pathname: '/customer/dashboard/',
                      query: { tab: tabData.href },
                    }}
                  >
                    <a
                      className={classNames(
                        (!tab && tabData.href === 'tabs-states') ||
                          tab === tabData.href
                          ? 'bg-[#005FB7] text-white'
                          : 'text-blue-600 hover:text-gray-700',
                        'mr-3 px-3 py-2 font-medium rounded-md hover:border-inherit border-2 border-blue-600 text-sm sm:text-xl'
                      )}
                      onClick={() => setSubMenu('')}
                    >
                      <FormattedMessage id={tabData.name} />{' '}
                      {tabData.count ? `(${tabData.count})` : ''}
                    </a>
                  </Link>
                )
              )}
              <Link
                href={{
                  pathname: '/customer/dashboard/',
                  query: { tab: 'showAllCars' },
                }}
              >
                <a className="float-right text-sm font-medium text-gray-900 underline sm:text-xl">
                  Show All
                </a>
              </Link>
            </nav>
            <SubMenu
              type={subMenu}
              subType={type}
              dashboardCount={dashboardCount}
            ></SubMenu>
            <div>
              {tab === 'tabs-newcar' && (
                <React.Fragment>
                  <NewCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    page={currentPage}
                    type={type}
                    limit={limit}
                  ></NewCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-warehouse' && (
                <React.Fragment>
                  <WarehouseCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    page={currentPage}
                    setLoading={setLoading}
                    limit={limit}
                  ></WarehouseCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-shipping' && (
                <React.Fragment>
                  <ShippingCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    page={currentPage}
                    setLoading={setLoading}
                    limit={limit}
                  ></ShippingCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-arrived' && (
                <React.Fragment>
                  <ArrivedCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    page={currentPage}
                    type={type}
                    setLoading={setLoading}
                    limit={limit}
                  ></ArrivedCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-delivered' && (
                <React.Fragment>
                  <DeliveredCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    page={currentPage}
                    type={type}
                    limit={limit}
                  ></DeliveredCarTab>
                </React.Fragment>
              )}
              {(tab === 'tabs-states' || tab == null) && (
                <React.Fragment>
                  <StatesTab carsRecords={carsRecords}></StatesTab>
                </React.Fragment>
              )}
              {tab === 'showAllCars' && (
                <React.Fragment>
                  <ShowAllCars
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    page={currentPage}
                    setLoading={setLoading}
                    limit={limit}
                  ></ShowAllCars>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Dashboard);
