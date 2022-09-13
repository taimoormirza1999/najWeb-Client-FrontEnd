import axios from 'axios';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ContainersTable } from '@/components/containers/containersTable';
import { SearchLot } from '@/components/dashboard/searchLot';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { classNames } from '@/utils/Functions';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

const Containers = ({ router, containersData, containersCount }) => {
  const {
    query: { tab, page, search },
  } = router;
  let {
    query: { limit },
  } = router;
  let currentPage = page;
  if (!currentPage) {
    currentPage = 0;
  }
  if (!limit) {
    limit = 10;
  }

  const tabs = [
    {
      name: 'page.customer.dashboard.all',
      href: 'all',
      count: parseInt(containersCount?.all, 10),
    },
    {
      name: 'page.customer.dashboard.in_shipping',
      href: 'inShipping',
      count: parseInt(containersCount?.inShipping, 10),
    },
    {
      name: 'page.customer.dashboard.arrived_port',
      href: 'arrivedPort',
      count: parseInt(containersCount?.arrivedPort, 10),
    },
    {
      name: 'page.customer.dashboard.arrived_store',
      href: 'arrivedStore',
      count: parseInt(containersCount?.arrivedStore, 10),
    },
  ];
  let containersRecords;
  let totalRecords = 0;
  if (containersData.data) {
    containersRecords = containersData.data;
    totalRecords = containersData.totalRecords;
  } else {
    containersRecords = [];
  }

  return (
    <Layout meta={<Meta title="Containers" description="" />}>
      <div>
        <div className="m-8">
          <div className="flex">
            <h4 className="text-dark-blue flex-1 pb-8 text-2xl font-semibold sm:text-4xl">
              <i className="material-icons text-yellow-orange align-middle ltr:mr-2 rtl:ml-2">
                &#xe14f;
              </i>
              <FormattedMessage id="page.customer.dashboard.containers" />
            </h4>
            <SearchLot></SearchLot>
          </div>
          <div>
            <nav className="flex flex-wrap gap-2 lg:inline" aria-label="Tabs">
              {tabs.map((tabData, index) => (
                <Link
                  key={index}
                  href={{
                    pathname: '/customer/containers/',
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
                  >
                    <FormattedMessage id={tabData.name} />{' '}
                    {tabData.count ? `(${tabData.count})` : ''}
                  </a>
                </Link>
              ))}
            </nav>
            <div>
              {
                <React.Fragment>
                  <ContainersTable
                    records={containersRecords}
                    tab={tab}
                    totalRecords={totalRecords}
                    page={currentPage}
                    limit={limit}
                    search={search}
                  ></ContainersTable>
                </React.Fragment>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;

  const tab = context.query.tab ? context.query.tab : 'inShipping';
  const apiTab = tab;
  const search = context.query.search ? context.query.search : '';
  const page = context.query.page ? context.query.page : 0;
  const limit = context.query.limit ? context.query.limit : '10';
  const session: any = await getSession(context);
  let networkError = false;
  let containersData = {};
  let containersCount = {};
  const apiUrl = process.env.API_URL;
  let apiTabUrl = `${apiUrl}customer/containers?status=${apiTab}&page=${page}&limit=${limit}`;

  if (search) {
    apiTabUrl = `${apiTabUrl}&search=${search}`;
  }

  if (session && session.token && session.token.access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
    await axios
      .get(`${apiTabUrl}`)
      .then((response) => {
        containersData = response.data;
      })
      .catch(() => {
        networkError = true;
      });
    await axios
      .get(`${apiUrl}customer/containersCount`)
      .then((response) => {
        containersCount = response.data;
      })
      .catch(() => {
        networkError = true;
      });
  }
  if (networkError) {
    return NetworkStatus.LOGIN_PAGE;
  }
  return {
    props: {
      containersData,
      containersCount,
    },
  };
}

export default withRouter(Containers);
