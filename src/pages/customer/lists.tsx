import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { FormattedMessage } from 'react-intl';

import { SearchLot } from '@/components/dashboard/searchLot';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

const Lists = ({ lists }) => {
  const todayDateArray = Date().toLocaleLowerCase().split(' ');

  return (
    <Layout meta={<Meta title="Price List" description="" />}>
      <div className="m-4">
        <div className="flex">
          <h4 className="text-dark-blue flex-1 text-xl font-semibold sm:text-4xl">
            <i className="material-icons text-yellow-orange align-middle text-4xl">
              &#xe24a;
            </i>
            <span className="pl-1 align-middle">
              <FormattedMessage id="page.customer.dashboard.navigation_price_lists" />
            </span>
          </h4>
          <SearchLot></SearchLot>
        </div>
        <p className="text-dark-blue ml-5 text-xl">
          <FormattedMessage id="Download_latest_price_lists_of" />
          <span className="uppercase"> {todayDateArray[1]} </span>
          {todayDateArray[3]}
        </p>
      </div>
      <div className="mx-auto px-8">
        <div className="mt-10 flex gap-24">
          <div>
            {lists.length > 0 ? (
              lists.map((row, index) => (
                <div key={index}>
                  <h3 className="text-dark-blue text-3xl font-semibold">
                    {row.country_name}
                  </h3>
                  <p className="text-dark-blue text-2xl">{row.list_type}</p>
                  <div className="my-8 flex gap-8">
                    <Link href={row.file_url} passHref>
                      <a className="text-white hover:border-0" target="_blank">
                        <div className="bg-teal-blue relative rounded-lg px-10 py-16 ">
                          {row.port_name ? (
                            <div className="max-w-[200px] break-all text-xl font-medium">
                              {row.port_name}
                            </div>
                          ) : (
                            <div className="max-w-[200px] break-all text-xl font-medium">
                              {row.name}
                            </div>
                          )}
                          <i className="material-icons absolute right-3 bottom-3 text-3xl">
                            &#xe2c4;
                          </i>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-azure-blue text-lg font-bold">
                <FormattedMessage id="No_price_list_is_available" />
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;
  const session: any = await getSession(context);
  const apiUrl = process.env.API_URL;
  let lists = [];

  try {
    axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
    const res = await axios.get(`${apiUrl}getPricesLists`);
    if (res.data) {
      lists = res.data.data;
    }
  } catch (error: any) {
    console.error('Something went wrong...');
  }

  return {
    props: { apiUrl, lists },
  };
}

export default Lists;
