import axios from 'axios';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React from 'react';

import { ArrivedCarTab } from '@/components/dashboard/arrivedCarTab';
import { DeliveredCarTab } from '@/components/dashboard/deliveredCarTab';
import { NewCarTab } from '@/components/dashboard/newCarTab';
import { SearchLot } from '@/components/dashboard/searchLot';
import { ShippingCarTab } from '@/components/dashboard/shippingCarTab';
import { StatesTab } from '@/components/dashboard/statesTab';
import { WarehouseCarTab } from '@/components/dashboard/warehouseCarTab';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutDashboard';
import { classNames } from '@/utils/Functions';

export async function getServerSideProps(context) {
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
    apiTab = 'arrivedCars';
  }
  if (tab === 'tabs-delivered') {
    apiTab = 'deliveredCars';
  }
  if (tab === 'tabs-states') {
    apiTab = 'statesCount';
  }
  let apiUrl = process.env.API_URL + apiTab;
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
  if (apiTab !== 'newCars' || type === 'towing' || type === 'cancelled') {
    apiUrl = `${apiUrl}?page=${page}`;
  } else {
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
  const {
    query: { tab, type, page },
  } = router;
  let currentPage = page;
  if (!currentPage) {
    currentPage = 0;
  }
  const tabs = [
    {
      name: 'New  Cars',
      href: 'tabs-newcar',
      current: tab === 'tabs-newcar',
    },
    {
      name: 'At Warehouse',
      href: 'tabs-warehouse',
      current: tab === 'tabs-warehouse',
    },
    {
      name: 'In shipping',
      href: 'tabs-shipping',
      current: tab === 'tabs-shipping',
    },
    {
      name: 'Arrived',
      href: 'tabs-arrived',
      current: tab === 'tabs-arrived',
    },
    {
      name: 'Delivered',
      href: 'tabs-delivered',
      current: tab === 'tabs-delivered',
    },
    {
      name: 'States',
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
              <i className="material-icons  text-yellow-orange align-middle">
                &#xe14f;
              </i>
              Cars Summary
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
