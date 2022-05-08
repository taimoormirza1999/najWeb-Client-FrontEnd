import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

const Career = () => {
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Layout
      meta={
        <Meta
          title="Career"
          description="Join the journey of NEJOUM ALJAZEERA  in Logistics and Car Business"
        />
      }
    >
      <Transition.Root show={redirectModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setRedirectModalOpen}
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
                    <Dialog.Title
                      as="h3"
                      className="text-3xl font-bold leading-6"
                    >
                      Redirecting
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="mb-4 py-6 text-2xl">
                        You’ll be redirected to to LinkedIn.com. Please press
                        “Continue” to confirm
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center gap-4 sm:mt-6">
                  <button
                    type="button"
                    className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-10 py-2.5 text-xl font-medium"
                    onClick={() => {
                      setRedirectModalOpen(false);
                      contentRef?.current?.classList.remove('blur-sm');
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <Link
                    href="https://ae.linkedin.com/company/nejoumaljazeera"
                    passHref
                  >
                    <a
                      target={'_blank'}
                      className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-10 py-2.5 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
                      onClick={() => {
                        setRedirectModalOpen(false);
                        contentRef?.current?.classList.remove('blur-sm');
                      }}
                    >
                      Continue
                    </a>
                  </Link>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="container mx-auto">
        <Breadcrumbs breadcrumbs={[{ name: 'Career', href: '/career' }]} />
      </div>

      <div className="container mx-auto" ref={contentRef}>
        <div className="text-dark-blue py-2">
          <h3 className="text-center text-5xl font-semibold">Career</h3>
          <p className="py-2 text-2xl">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="mr-4 text-orange-400"
            />
            <span className="font-bold">NAJ Career</span> Form
          </p>
          <p className="py-4 mb-4 text-2xl">
            Join the journey of <span className="font-bold">NEJOUM</span>{' '}
            ALJAZEERA in Logistics and Car Business
          </p>

          <div className="flex gap-16 pb-32">
            <img
              src="/assets/images/career.jpg"
              alt="Career"
              className="w-1/2"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-semibold">Join Our Team</h3>
              <p className="py-4 text-2xl">
                We are always looking for new talents to join our team! Apply
                through Linked In
              </p>

              <button
                className="bg-azure-blue my-4 inline-block max-w-max cursor-pointer rounded-md px-10 py-2.5 text-xl font-medium text-white hover:border-0 hover:bg-blue-500 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  setRedirectModalOpen(true);
                  contentRef?.current?.classList.add('blur-sm');
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Career;
