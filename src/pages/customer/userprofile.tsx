import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Fragment, useRef, useState } from 'react';

import { Layout } from '@/templates/LayoutDashboard';
import { classNames } from '@/utils/Functions';
import { Meta } from '@/layout/Meta';

export async function getServerSideProps() {
  return {
    props: { apiUrl: process.env.API_URL },
  };
}
const Profile = ({ apiUrl }) => {
  const [showProfile, setShowProfile] = useState(true);
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passswordSuccess, setPassswordSuccess] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const fullName = session?.profile[0]?.full_name;
  const phoneNo = session?.profile[0]?.phone;
  const primaryEmail = session?.profile[0]?.primary_email;
  const membershipId = session?.profile[0]?.membership_id;
  const updatePassword = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
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
        .post(`${apiUrl}changePassword`, {
          password: data.newPassword,
          old_password: data.oldPassword,
        })
        .then(function (response) {
          if (response.data.success === true) {
            setPassswordSuccess(true);
            contentRef?.current?.classList.add('blur-sm');
            setShowProfile(true);
          } else {
            setOldPasswordError(response.data.message);
          }
        })
        .catch(function (apiError) {
          console.log(apiError);
        });
    }
  };

  return (
    <Layout meta={<Meta title="Terms and Conditions" description="" />}>
      <div className="m-4" ref={contentRef}>
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
        <Transition.Root show={passswordSuccess} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={setPassswordSuccess}
          >
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block w-2/5 overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:p-6 sm:align-middle">
                  <div>
                    <div className="text-dark-blue mt-6 text-center sm:mt-16">
                      <i className="material-icons text-yellow-orange text-4xl">
                        &#xe86c;
                      </i>
                      <Dialog.Title
                        as="h3"
                        className="text-5xl font-bold leading-6"
                      >
                        Password Updated!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="mb-4 py-6 text-3xl">
                          Your password has been successfully updated
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center gap-4 sm:mt-6">
                    <button
                      type="button"
                      className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-10 py-2.5 text-2xl font-medium"
                      onClick={() => {
                        setPassswordSuccess(false);
                        contentRef?.current?.classList.remove('blur-sm');
                      }}
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={showProfile} as={Fragment}>
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
            <p className="text-dark-blue text-xl italic">
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
                      italic
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
                      italic
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
                      italic
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
            </form>
          </div>
        </Transition.Root>
      </div>
    </Layout>
  );
};

export default Profile;
