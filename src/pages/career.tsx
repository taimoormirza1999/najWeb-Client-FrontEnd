import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { useRef, useState } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import CustomModal from '@/components/CustomModal';
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
      <CustomModal
        showOn={redirectModalOpen}
        initialFocus={cancelButtonRef}
        onClose={setRedirectModalOpen}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <Dialog.Title
            as="h3"
            className="text-xl font-bold leading-6 md:text-2xl lg:text-3xl"
          >
            Redirecting
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-4 text-lg md:text-xl lg:py-6 lg:text-2xl">
              You’ll be redirected to to LinkedIn.com. Please press “Continue”
              to confirm
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              setRedirectModalOpen(false);
              contentRef?.current?.classList.remove('blur-sm');
            }}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
          <Link href="https://ae.linkedin.com/company/nejoumaljazeera" passHref>
            <a
              target={'_blank'}
              className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-4 py-1 text-lg font-medium text-white hover:border-0 hover:bg-blue-500 md:px-10 md:py-2 lg:text-xl"
              onClick={() => {
                setRedirectModalOpen(false);
                contentRef?.current?.classList.remove('blur-sm');
              }}
            >
              Continue
            </a>
          </Link>
        </div>
      </CustomModal>

      <div className="container mx-auto">
        <Breadcrumbs breadcrumbs={[{ name: 'Career', href: '/career' }]} />
      </div>

      <div className="container mx-auto" ref={contentRef}>
        <div className="text-dark-blue py-2">
          <h3 className="mb-4 text-center text-2xl font-semibold xl:text-4xl">
            Career
          </h3>
          <p className="py-2 text-lg lg:text-2xl">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="mr-4 text-orange-400"
            />
            <span className="font-bold">
              <span className="font-sen">NAJ</span> Career
            </span>{' '}
            Form
          </p>
          <p className="mb-4 py-4 text-lg lg:text-2xl">
            Join the journey of{' '}
            <span className="font-sen font-bold">NEJOUM</span> ALJAZEERA in
            Logistics and Car Business
          </p>

          <div className="flex flex-col gap-8 pb-32 lg:flex-row lg:gap-16">
            <img
              src="/assets/images/career.jpg"
              alt="Career"
              className="w-full lg:w-1/2"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold lg:text-2xl xl:text-3xl">
                Join Our Team
              </h3>
              <p className="py-4 text-lg lg:text-xl xl:text-2xl">
                We are always looking for new talents to join our team! Apply
                through Linked In
              </p>

              <button
                className="bg-azure-blue my-4 inline-block max-w-max cursor-pointer rounded-md px-5 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:px-10"
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
