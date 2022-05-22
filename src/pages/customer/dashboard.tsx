import axios from 'axios';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { ArrivedCarTab } from '@/components/dashboard/arrivedCarTab';
import { DeliveredCarTab } from '@/components/dashboard/deliveredCarTab';
import { NewCarTab } from '@/components/dashboard/newCarTab';
import { SearchLot } from '@/components/dashboard/searchLot';
import { ShippingCarTab } from '@/components/dashboard/shippingCarTab';
import { StatesTab } from '@/components/dashboard/statesTab';
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
  const session: any = await getSession(context);

  let carsData = {};
  let apiTab = 'statesCount';
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
    apiUrl += `?${type}=1`;
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
    type === 'towing' ||
    type === 'cancelled'
  ) {
    apiUrl = `${apiUrl}?page=${page}`;
  } else if (apiTab !== 'statesCount') {
    apiUrl = `${apiUrl}&page=${page}`;
  }
  if (session && session.token && session.token.access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
    await axios
      .get(`${apiUrl}`)
      .then(function (response) {
        // handle success
        carsData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return {
    props: {
      carsData,
      baseUrl: process.env.NEXTAUTH_URL,
    },
  };
}
const Dashboard = ({ router, carsData, baseUrl }) => {


  const { setLoading } = useContext(UserContext);
  const {
    query: { tab, type, page },
  } = router;
  let currentPage = page;
  if (!currentPage) {
    currentPage = 0;
  }
  const tabs = [
    {
      name: <FormattedMessage id="page.customer.dashboard.new_cars" />,
      href: 'tabs-newcar',
      current: tab === 'tabs-newcar',
    },
    {
      name: <FormattedMessage id="page.customer.dashboard.at_warehouse" />,
      href: 'tabs-warehouse',
      current: tab === 'tabs-warehouse',
    },
    {
      name: <FormattedMessage id="page.customer.dashboard.in_shipping" />,
      href: 'tabs-shipping',
      current: tab === 'tabs-shipping',
    },
    {
      name: <FormattedMessage id="page.customer.dashboard.arrived" />,
      href: 'tabs-arrived',
      current: tab === 'tabs-arrived',
    },
    {
      name: <FormattedMessage id="page.customer.dashboard.delivered" />,
      href: 'tabs-delivered',
      current: tab === 'tabs-delivered',
    },
    {
      name: <FormattedMessage id="page.customer.dashboard.states" />,
      href: 'tabs-states',
      current: tab === 'tabs-states' || tab == null,
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
        <div className="m-4">
          <div className="flex">
            <h4 className="text-dark-blue flex-1 pb-8 text-xl sm:text-2xl">
              <i className="material-icons text-yellow-orange align-middle ltr:mr-2 rtl:ml-2">
                &#xe14f;
              </i>
              <FormattedMessage id="page.customer.dashboard.cars_summary" />
            </h4>
            <SearchLot></SearchLot>
          </div>
          <div>
            <nav className="flex flex-wrap gap-2 sm:gap-4" aria-label="Tabs">
              {tabs.map((tabData) => (
                <Link
                  key={tabData.name}
                  href={{
                    pathname: '/customer/dashboard/',
                    query: { tab: tabData.href },
                  }}
                >
                  <a
                    className={classNames(
                      tabData.current
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-600 hover:text-gray-700',
                      'px-3 py-2 font-medium rounded-md hover:border-inherit border-2 border-blue-600 text-sm sm:text-xl'
                    )}
                    aria-current={tabData.current ? 'page' : undefined}
                  >
                    {tabData.name}
                  </a>
                </Link>
              ))}
            </nav>
            <div>
              {tab === 'tabs-newcar' && (
                <React.Fragment>
                  <NewCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    baseUrl={baseUrl}
                    page={currentPage}
                    type={type}
                  ></NewCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-warehouse' && (
                <React.Fragment>
                  <WarehouseCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    baseUrl={baseUrl}
                    page={currentPage}
                    setLoading={setLoading}
                  ></WarehouseCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-shipping' && (
                <React.Fragment>
                  <ShippingCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    baseUrl={baseUrl}
                    page={currentPage}
                  ></ShippingCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-arrived' && (
                <React.Fragment>
                  <ArrivedCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    baseUrl={baseUrl}
                    page={currentPage}
                    type={type}
                  ></ArrivedCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-delivered' && (
                <React.Fragment>
                  <DeliveredCarTab
                    carsRecords={carsRecords}
                    totalRecords={totalRecords}
                    baseUrl={baseUrl}
                    page={currentPage}
                    type={type}
                  ></DeliveredCarTab>
                </React.Fragment>
              )}
              {(tab === 'tabs-states' || tab == null) && (
                <React.Fragment>
                  <StatesTab carsRecords={carsRecords}></StatesTab>
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
