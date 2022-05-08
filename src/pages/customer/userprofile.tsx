import Link from 'next/link';

import { Layout } from '@/templates/LayoutDashboard';
import { classNames } from '@/utils/Functions';

const Profile = () => {
  return (
    <Layout meta="">
      <div>
        <div className="m-4">
          <div>
            <h4 className="text-dark-blue pb-8 text-3xl font-bold sm:text-2xl">
              <i
                className={classNames(
                  'material-icons  text-yellow-orange align-middle'
                )}
              >
                &#xe853;
              </i>
              Ali Turkey
            </h4>
          </div>
          <div>
            <div className="text-center">
              <p className="text-dark-blue text-left text-xl italic">
                Below are your account details. Please contact Customer Service
                Center to request for amendments
              </p>
              <div className="bg-light-grey mt-4 rounded-md border border-black px-4 py-5 text-left sm:px-6">
                <table className="min-w-full divide-y divide-gray-300 border-0 text-xl">
                  <tbody>
                    <tr>
                      <td className="w-[137px]">Membership ID </td>
                      <td>:</td>
                    </tr>
                    <tr>
                      <td>Phone No</td>
                      <td>:</td>
                    </tr>
                    <tr>
                      <td>Email </td>
                      <td>:</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link href="/customer/updatepassword">
                <button className="mt-4 rounded-md border-blue-600 bg-[#0193FF] px-4 py-2 text-white">
                  Update Password
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
