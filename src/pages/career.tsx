import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

import Breadcrumbs from './components/Breadcrumbs';

const Career = () => (
  <Layout
    meta={
      <Meta
        title="Career"
        description="Join the journey of NEJOUM ALJAZEERA  in Logistics and Car Business"
      />
    }
  >
    <div className="container mx-auto">
      <Breadcrumbs />
    </div>

    <div className="container mx-auto">
      <div className="text-dark-blue py-2">
        <h3 className="text-center text-6xl font-semibold">Career</h3>
        <p className="py-3 text-3xl">
          <FontAwesomeIcon
            icon={faBriefcase}
            className="mr-4 text-orange-400"
          />
          <span className="font-bold">NAJ Career</span> Form
        </p>
        <p className="py-8 text-3xl">
          Join the journey of <span className="font-bold">NEJOUM</span>{' '}
          ALJAZEERA in Logistics and Car Business
        </p>

        <div className="flex gap-16 pb-32">
          <img
            src="/assets/images/career.jpg"
            alt="Career"
            className="basis-2/6"
          />
          <div className="flex basis-4/6 flex-col justify-center">
            <h3 className="text-6xl font-semibold">Join Our Team</h3>
            <p className="py-4 text-3xl">
              We are always looking for new talents to join our team! Apply
              through Linked In
            </p>
            <Link
              href="https://ae.linkedin.com/company/nejoumaljazeera"
              passHref
            >
              <a
                target={'_blank'}
                className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-10 py-2.5 text-2xl font-medium text-white hover:border-0 hover:bg-blue-500 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Career;
