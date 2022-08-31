import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import NProgress from 'nprogress';
import { Fragment, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import CustomModal from '@/components/customModal';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { classNames } from '@/utils/Functions';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;

  return {
    props: { apiUrl: process.env.API_URL },
  };
}
const Profile = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsgPop, setErrorMsgPop] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passswordSuccess, setPassswordSuccess] = useState(false);
  const { data: session } = useSession();
  const fullName = session?.profile[0]?.full_name;
  const phoneNo = session?.profile[0]?.phone;
  const primaryEmail = session?.profile[0]?.primary_email;
  const membershipId = session?.profile[0]?.membership_id;
  const intl = useIntl();
  const okButtonErrorRef = useRef(null);
  const okErrorButtonErrorRef = useRef(null);
  const updatePassword = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    NProgress.start();
    let error = false;
    // Get data from the form.
    const data = {
      oldPassword: event.target.oldPassword.value,
      newPassword: event.target.newPassword.value,
      confirmPassword: event.target.confirmPassword.value,
    };
    setConfirmPasswordError('');
    setNewPasswordError('');
    setOldPasswordError('');
    if (!data.confirmPassword) {
      setConfirmPasswordError('Password confirmation required');
      error = true;
    }
    if (!data.newPassword) {
      setNewPasswordError('New Password required');
      error = true;
    }
    if (!data.oldPassword) {
      setOldPasswordError('Old Password required');
      error = true;
    }
    if (data.newPassword !== data.confirmPassword) {
      setConfirmPasswordError('Password should match');
      error = true;
    }
    if (!error) {
      await axios
        .post(`/api/customer/password/`, {
          password: data.newPassword,
          old_password: data.oldPassword,
        })
        .then((response) => {
          if (response.data.data === 'success') {
            setPassswordSuccess(true);
            setShowProfile(true);
          } else if (response.data.data === 'old_password') {
            setErrorMsg(intl.formatMessage({ id: 'general.passwordErr' }));
            setErrorMsgPop(true);
          } else if (response.data.data === 'tehnical_error') {
            setErrorMsg(intl.formatMessage({ id: 'general.technicalErr' }));
            setErrorMsgPop(true);
          }
        })
        .catch(() => {
          setErrorMsg(intl.formatMessage({ id: 'general.technicalErr' }));
          setErrorMsgPop(true);
        });
    }
    NProgress.done();
  };

  return (
    <Layout meta={<Meta title="User profile" description="" />}>
      <CustomModal
        showOn={errorMsgPop}
        initialFocus={okErrorButtonErrorRef}
        onClose={() => {
          setErrorMsgPop(false);
          setErrorMsg('');
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons mb-4 text-6xl text-red-800">&#xe160;</i>
          <Dialog.Title as="h3" className="text-4xl font-bold leading-6">
            {intl.formatMessage({ id: 'general.sorry' })}
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-2xl">{errorMsg}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setErrorMsgPop(false);
              setErrorMsg('');
            }}
            ref={okErrorButtonErrorRef}
          >
            {intl.formatMessage({ id: 'messages.ok' })}
          </button>
        </div>
      </CustomModal>
      <CustomModal
        showOn={passswordSuccess}
        initialFocus={okButtonErrorRef}
        onClose={() => {
          setPassswordSuccess(false);
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons text-yellow-orange text-4xl">&#xe86c;</i>
          <Dialog.Title as="h3" className="text-4xl font-bold leading-6">
            Password Updated!
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-2xl">
              Your password has been successfully updated
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setPassswordSuccess(false);
            }}
            ref={okButtonErrorRef}
          >
            {intl.formatMessage({ id: 'messages.ok' })}
          </button>
        </div>
      </CustomModal>
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
            {fullName}
          </h4>
        </div>
        <Transition.Root show={showProfile} as={Fragment}>
          <div className="text-center">
            <p className="text-dark-blue text-left text-xl ltr:italic">
              Below are your account details. Please contact Customer Service
              Center to request for amendments
            </p>
            <div className="bg-light-grey mt-4 rounded-md border border-black px-4 py-5 text-left sm:px-6">
              <table className="min-w-full divide-y divide-gray-300 border-0 text-xl">
                <tbody>
                  <tr>
                    <td className="w-[137px]">Membership ID </td>
                    <td>: {membershipId}</td>
                  </tr>
                  <tr>
                    <td>Phone No</td>
                    <td>: {phoneNo}</td>
                  </tr>
                  <tr>
                    <td>Email </td>
                    <td>: {primaryEmail}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="mt-4 rounded-md border-blue-600 bg-[#0193FF] px-4 py-2 text-white"
              onClick={() => {
                setShowProfile(false);
              }}
            >
              Update Password
            </button>
          </div>
        </Transition.Root>
        <Transition.Root show={!showProfile} as={Fragment}>
          <div className="text-center">
            <p className="text-dark-blue text-xl ltr:italic">
              Please fill up the following form to complete your request
            </p>
            <form method="post" onSubmit={updatePassword}>
              <div className="mt-4 rounded-md px-4 py-5 text-center sm:px-6">
                <div className="mx-auto mb-4 xl:w-96">
                  <input
                    type="password"
                    className="
                      block
                      w-full
                      rounded
                      border
                      border-solid
                      border-[#1C3E8A]
                      bg-white bg-clip-padding
                      px-3 py-1.5 text-base
                      font-normal
                      ltr:italic
                      text-[#999999]
                      transition
                      ease-in-out
                      focus:text-gray-700 focus:outline-none
                    "
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Old Password"
                  />
                  <p
                    className={classNames(
                      oldPasswordError ? '' : 'hidden',
                      'text-sm font-medium text-red-800'
                    )}
                  >
                    {oldPasswordError}
                  </p>
                </div>
                <div className="mx-auto mb-4 xl:w-96">
                  <input
                    type="password"
                    className="
                      block
                      w-full
                      rounded
                      border
                      border-solid
                      border-[#1C3E8A]
                      bg-white bg-clip-padding
                      px-3 py-1.5 text-base
                      font-normal
                      ltr:italic
                      text-[#999999]
                      transition
                      ease-in-out
                      focus:text-gray-700 focus:outline-none
                    "
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                  />
                  <p
                    className={classNames(
                      newPasswordError ? '' : 'hidden',
                      'text-sm font-medium text-red-800'
                    )}
                  >
                    {newPasswordError}
                  </p>
                </div>
                <div className="mx-auto xl:w-96">
                  <input
                    type="password"
                    className="
                      block
                      w-full
                      rounded
                      border
                      border-solid
                      border-[#1C3E8A]
                      bg-white bg-clip-padding
                      px-3 py-1.5 text-base
                      font-normal
                      ltr:italic
                      text-[#999999]
                      transition
                      ease-in-out
                      focus:text-gray-700 focus:outline-none
                    "
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Re-write Password"
                  />
                  <p
                    className={classNames(
                      confirmPasswordError ? '' : 'hidden',
                      'text-sm font-medium text-red-800'
                    )}
                  >
                    {confirmPasswordError}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md border-blue-600 bg-[#0193FF] px-4 py-2 text-white"
              >
                Confirm
              </button>
              <button
                type="button"
                className="ml-1 rounded-md border-gray-600 bg-gray-600 px-4 py-2 text-white"
                onClick={() => {
                  setShowProfile(true);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </Transition.Root>
      </div>
    </Layout>
  );
};

export default Profile;
