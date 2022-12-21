import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Breadcrumbs from '@/components/breadcrumbs';
import CustomModal from '@/components/customModal';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';

const Career = () => {
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);

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
        onClose={() => {
          setRedirectModalOpen(false);
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <Dialog.Title
            as="h3"
            className="text-xl font-bold leading-6 md:text-2xl lg:text-3xl"
          >
            <FormattedMessage id="page.career.redirecting" />
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-4 text-lg md:text-xl lg:py-6 lg:text-2xl">
              <FormattedMessage id="page.career.redirectingDesc" />
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              setRedirectModalOpen(false);
            }}
            ref={cancelButtonRef}
          >
            <FormattedMessage id="general.cancel" />
          </button>
          <Link href="https://ae.linkedin.com/company/nejoumaljazeera" passHref>
            <a
              target={'_blank'}
              className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-4 py-1 text-lg font-medium text-white hover:border-0 hover:bg-blue-500 md:px-10 md:py-2 lg:text-xl"
              onClick={() => {
                setRedirectModalOpen(false);
              }}
            >
              <FormattedMessage id="general.continue" />
            </a>
          </Link>
        </div>
      </CustomModal>

      <Breadcrumbs
        breadcrumbs={[
          { name: <FormattedMessage id="general.career" />, href: '/career' },
        ]}
      />

      <div className="container mx-auto">
        <div className="text-dark-blue py-2">
          <h3 className="mb-4 text-center text-3xl font-semibold xl:text-5xl">
            <FormattedMessage id="page.career.title" />
          </h3>
          <p className="py-2 text-2xl lg:text-3xl">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="text-yellow-orange ltr:mr-4 rtl:ml-4"
            />
            <span className="font-bold">
              <span className="font-sen">
                <FormattedMessage id="general.naj" />
              </span>{' '}
              <FormattedMessage id="page.career.title" />{' '}
              <span className="font-normal">Form</span>
            </span>{' '}
          </p>
          <p className="mb-4 py-4 text-lg lg:text-2xl">
            <FormattedMessage id="page.career.desc1" />{' '}
            <span className="font-sen">
              <span className="font-bold">
                <FormattedMessage id="page.company.name.nejoum" />
              </span>
              <FormattedMessage id="page.company.name.aljazeera" />
            </span>
            <FormattedMessage id="page.career.desc2" />
          </p>
          <div className="flex flex-col gap-8 pb-32 lg:flex-row lg:gap-16">
            <img
              src="/assets/images/career.png"
              alt="Career"
              className="w-full rounded-2xl lg:w-1/2"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold lg:text-4xl xl:text-5xl">
                <FormattedMessage id="page.career.joinTeam" />
              </h3>
              <p className="py-4 text-lg lg:text-2xl xl:text-3xl">
                <FormattedMessage id="page.career.joinTeamDesc" />
              </p>

              <button
                className="bg-azure-blue my-4 inline-block max-w-max cursor-pointer rounded-md px-5 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:px-10"
                onClick={() => {
                  setRedirectModalOpen(true);
                }}
              >
                <FormattedMessage id="page.career.apply" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Career;
