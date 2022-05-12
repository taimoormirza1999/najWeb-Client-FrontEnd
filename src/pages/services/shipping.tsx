import {
  faClipboardCheck,
  faCrosshairs,
  faGaugeHigh,
  faShield,
  faUsersLine,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRef } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

const Shipping = () => {
  const receiveServiceRef = useRef<HTMLDivElement>(null);

  const scrollToReceiveService = () => {
    window.scrollTo({
      top: receiveServiceRef!.current!.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <Layout
      meta={<Meta title="Shipping Services" description="Shipping Services" />}
    >
      <div className="container mx-auto">
        <Breadcrumbs
          breadcrumbs={[
            { name: 'Services', href: '#' },
            { name: 'Shipping', href: '/services/shipping' },
          ]}
        />
      </div>

      <div className="container mx-auto">
        <div className="border-dark-blue flex flex-col rounded-lg border p-4 lg:p-8 xl:flex-row">
          <div className="text-dark-blue basis-3/5 p-2 xl:p-8">
            <h2 className="text-3xl font-bold lg:text-[40px]">Shipping</h2>
            <p className="py-4 text-lg leading-normal md:text-xl lg:py-8 lg:text-2xl lg:leading-[2.8rem] xl:pr-10">
              <span className="font-sen font-bold">NEJOUM</span> ALJAZEERA has
              adopted the principle of competitiveness and leadership in the
              field of the car logistic of all kinds for most of the Gulf
              Cooperation Countries in addition to the import and customs
              clearance services for cars coming from abroad to the United Arab
              Emirates by ensuring the highest levels of quality and competitive
              prices providing all logistical support and complete solutions to
              our valued customers and the pursuit always achieve the highest
              standards of efficiency and effectiveness.
            </p>
            <button
              className="text-azure-blue block cursor-pointer py-3 text-lg italic hover:border-0 md:text-xl lg:text-2xl"
              onClick={() => {
                scrollToReceiveService();
              }}
            >
              Receive service...
            </button>
          </div>
          <div className="relative basis-2/5">
            <img
              src="/assets/images/usa-warehouse-2.jpg"
              alt="Shipping car"
              className="border-dark-blue h-full min-h-[450px] w-full rounded-xl border object-cover lg:min-h-[650px]"
            />
            <button
              className="bg-azure-blue absolute inset-x-0 bottom-[10%] m-auto max-w-max cursor-pointer rounded-lg py-3 px-6 text-lg font-medium text-white hover:border-0 md:text-2xl lg:text-3xl"
              onClick={() => {
                scrollToReceiveService();
              }}
            >
              Receive Service
            </button>
          </div>
        </div>

        <div className="px-0 py-4 md:py-8 xl:px-16">
          <h3 className="text-dark-blue py-12 text-center text-2xl font-semibold md:text-3xl lg:text-[40px]">
            Service Features
          </h3>
          <p className="text-dark-blue pb-6 text-xl md:text-xl lg:text-2xl">
            We maintain efficiency in all our services to meet all the
            requirements of our valued customers according to their
            expectations. Below are some of the key features of our services. We
            strive to delivering vehicles upon punctual timings.
          </p>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue bg-teal-blue hidden rounded-full border-[3px] py-7 lg:block">
              <FontAwesomeIcon
                icon={faCrosshairs}
                className="h-24 w-24 text-4xl text-white"
              />
            </div>
            <p className="bg-teal-blue flex items-center rounded-2xl p-4 text-lg text-white lg:text-[1.3rem]">
              Vehicle tracking service in order to follow the movement of cars
              step by step starting from the purchase till the handover to the
              owner through our website
            </p>
          </div>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue hidden rounded-full border-[3px] py-7 lg:block">
              <FontAwesomeIcon
                icon={faShield}
                className="text-teal-blue h-24 w-24 text-4xl"
              />
            </div>
            <p className="border-teal-blue text-teal-blue flex w-full items-center rounded-2xl border p-4 text-lg md:border-[3px] lg:text-[1.3rem]">
              Dependence on closed and covered cars to protect and secure cars
              during the charging process
            </p>
          </div>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue bg-teal-blue hidden rounded-full border-[3px] py-7 lg:block">
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="h-24 w-24 text-4xl text-white"
              />
            </div>
            <p className="bg-teal-blue flex w-full items-center rounded-2xl p-4 text-lg text-white lg:text-[1.3rem]">
              Experience in completing all document and procedures related to
              automotive abroad and in the United Arab Emirates
            </p>
          </div>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue hidden rounded-full border-[3px] py-7 lg:block">
              <FontAwesomeIcon
                icon={faUsersLine}
                className="text-teal-blue h-24 w-24 text-4xl"
              />
            </div>
            <p className="border-teal-blue text-teal-blue flex items-center rounded-2xl border p-4 text-lg md:border-[3px] lg:text-[1.3rem]">
              Having a distinguished and professional team with different
              nationalities and high levels of expertise to meet the
              requirements of our valued customers
            </p>
          </div>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue bg-teal-blue hidden rounded-full border-[3px] py-7 lg:block">
              <FontAwesomeIcon
                icon={faGaugeHigh}
                className="h-24 w-24 text-4xl text-white"
              />
            </div>
            <p className="bg-teal-blue flex items-center rounded-2xl p-4 text-lg text-white lg:text-[1.3rem]">
              Always strive to provide the best logistic service as quickly as
              possible and at the lowest costs and willing to meet the
              aspirations of our valued customers
            </p>
          </div>
        </div>

        <div className="mb-16 py-8" ref={receiveServiceRef}>
          <h3 className="text-dark-blue mb-4 text-center text-4xl font-semibold">
            Receive Service
          </h3>
          <img
            className="relative -z-10 mx-auto w-full rounded-t-[30px]"
            src="/assets/images/receive-service.jpg"
            alt="Contact Us"
          />
          <div className="bg-light-grey mx-auto -mt-4 rounded-b-[30px] p-2 text-center md:-mt-16 md:p-12">
            <Link href="https://wa.me/+97165440202?text=Hi" passHref>
              <a
                target="_blank"
                className="bg-azure-blue my-2 inline-block rounded-lg px-5 py-2.5 text-lg font-medium text-white hover:border-0 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:text-2xl"
              >
                Text Nejoum
              </a>
            </Link>
            <div className="visible md:hidden"></div>
            <Link href="/auth/newAccount/">
              <a className="text-azure-blue my-2 inline-block rounded-lg bg-white px-5 py-2.5 text-lg font-medium shadow-md hover:border-0 hover:bg-slate-100 focus:outline-none dark:focus:ring-blue-800 md:ml-8 md:text-2xl">
                Apply For Account
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Shipping;
