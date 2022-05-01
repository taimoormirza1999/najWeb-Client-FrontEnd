import axios from 'axios';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React from 'react';

import { NewCarTab } from '@/components/dashboard/newCarTab';
import { WarehouseCarTab } from '@/components/dashboard/warehouseCarTab';
import { Layout } from '@/templates/Layout2';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export async function getServerSideProps(context) {
  const tab = context.query.tab ? context.query.tab : 'tabs-newcar';
  const type = context.query.type ? context.query.type : '';
  const session = await getSession(context);

  let carsData = {};
  let apiTab = 'newCars';
  if (tab === 'tabs-warehouse') {
    apiTab = 'warehouseCars';
  }
  let apiUrl = process.env.API_URL + apiTab;
  if (apiTab === 'newCars' && type) {
    if (type === 'paid' || type === 'unpaid' || type === 'paid_bycustomer') {
      apiUrl += `?${type}=1`;
    }
    if (type === 'towing') {
      apiUrl = `${process.env.API_URL}towingCars`;
    }
  }
  if (session && session.token && session.token.access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
    console.log(apiUrl);
    const res = await axios.get(`${apiUrl}`);
    carsData = res.data;
  }
  return {
    props: { carsData },
  };
}
const Dashboard = ({ router, carsData }) => {
  const {
    query: { tab, type },
  } = router;
  const tabs = [
    {
      name: 'New  Cars',
      href: 'tabs-newcar',
      current: tab === 'tabs-newcar' || tab == null,
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
      current: tab === 'tabs-states',
    },
  ];
  let carsRecords;
  if (carsData.data) {
    carsRecords = carsData.data;
  } else {
    carsRecords = [];
  }
  const { totalRecords } = carsData;
  return (
    <Layout meta="">
      <div>
        <div className="m-4">
          <div>
            <h4 className="text-dark-blue pb-8 text-xl sm:text-2xl">
              <i className="material-icons  text-yellow-orange align-middle">
                &#xe14f;
              </i>
              Cars Summary
            </h4>
          </div>
          <div>
            <nav className="flex flex-wrap gap-2 sm:gap-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={{
                    pathname: '/customer/dashboard/',
                    query: { tab: tab.href },
                  }}
                >
                  <a
                    key={tab.name}
                    className={classNames(
                      tab.current
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-600 hover:text-gray-700',
                      'px-3 py-2 font-medium rounded-md hover:border-inherit border-2 border-blue-600 text-sm sm:text-xl'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                </Link>
              ))}
            </nav>
            <div>
              {(tab === 'tabs-newcar' || tab == null) && (
                <React.Fragment>
                  <NewCarTab carsRecords={carsRecords} type={type}></NewCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-warehouse' && (
                <React.Fragment>
                  <WarehouseCarTab carsRecords={carsRecords}></WarehouseCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-shipping' && (
                <React.Fragment>
                  <WarehouseCarTab carsRecords={carsRecords}></WarehouseCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-arrived' && (
                <React.Fragment>
                  <WarehouseCarTab carsRecords={carsRecords}></WarehouseCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-delivered' && (
                <React.Fragment>
                  <WarehouseCarTab carsRecords={carsRecords}></WarehouseCarTab>
                </React.Fragment>
              )}
              {tab === 'tabs-states' && (
                <React.Fragment>
                  <WarehouseCarTab carsRecords={carsRecords}></WarehouseCarTab>
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
