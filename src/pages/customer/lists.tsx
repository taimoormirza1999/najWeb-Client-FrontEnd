import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/react';

import { Layout } from '@/templates/LayoutDashboard';

const Lists = ({ lists }) => {
  const todayDateArray = Date().toLocaleLowerCase().split(' ');

  return (
    <Layout meta="">
      <div className="mx-auto px-8">
        <h4 className="text-dark-blue mt-4 py-4 text-xl font-semibold sm:text-4xl">
          <i className="material-icons text-yellow-orange align-middle text-4xl">
            &#xe24a;
          </i>
          <span className="pl-1 align-middle">Price Lists</span>
        </h4>
        <p className="text-dark-blue text-xl">
          Download latest price lists of
          <span className="uppercase"> {todayDateArray[1]} </span>
          {todayDateArray[3]}
        </p>

        <div className="mt-16 flex gap-24">
          <div>
            {lists.map((row, index) => (
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
                          <div className="text-3xl font-medium">Jebel Ali</div>
                        ) : (
                          <div className="text-xl font-medium">{row.name}</div>
                        )}
                        <i className="material-icons absolute right-3 bottom-3 text-3xl">
                          &#xe2c4;
                        </i>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
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
