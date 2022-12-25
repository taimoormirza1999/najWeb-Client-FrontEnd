import { faClipboardCheck, faCrosshairs, faGaugeHigh, faShield, faUsersLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import Breadcrumbs from '@/components/breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';

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
      <Breadcrumbs
        breadcrumbs={[
          { name: <FormattedMessage id="general.services" />, href: '#' },
          {
            name: <FormattedMessage id="page.services.shipping" />,
            href: '/services/shipping',
          },
        ]}
      />

      <div className="container mx-auto">
        <div className="border-dark-blue flex flex-col rounded-lg border p-4 lg:p-8 xl:flex-row">
          <div className="text-dark-blue basis-1/2 p-2 xl:p-8">
            <h2 className="text-3xl font-bold lg:text-[40px]">
              <FormattedMessage id="page.services.shipping" />
            </h2>
            <p className="py-4 text-lg leading-normal md:text-xl lg:py-8 lg:leading-[2.8rem] xl:pr-2">
              <span className="font-sen">
                <span className="font-bold">
                  <FormattedMessage id="page.company.name.nejoum" />
                </span>
                <FormattedMessage id="page.company.name.aljazeera" />
              </span>
              <FormattedMessage id="page.services.shipping.shippingDesc" />
            </p>
            <button
              className="text-azure-blue block cursor-pointer py-3 text-lg ltr:italic hover:border-0 md:text-xl lg:text-2xl"
              onClick={() => {
                scrollToReceiveService();
              }}
            >
              <FormattedMessage id="page.services.shipping.receive_serviceetc" />
            </button>
          </div>
          <div className="relative basis-1/2">
            <img
              src="/assets/images/usa-warehouse-2.png"
              alt="Shipping car"
              className="border-dark-blue h-full min-h-[450px] w-full rounded-xl border object-cover lg:min-h-[650px]"
            />
            <button
              className="bg-azure-blue absolute inset-x-0 bottom-[10%] m-auto max-w-max cursor-pointer rounded-lg py-3 px-6 text-lg font-medium text-white hover:border-0 md:text-2xl lg:text-3xl"
              onClick={() => {
                scrollToReceiveService();
              }}
            >
              <FormattedMessage id="page.services.shipping.receive_service" />
            </button>
          </div>
        </div>

        <div className="px-0 py-4 md:py-8 xl:px-16">
          <h3 className="text-dark-blue py-12 text-center text-2xl font-semibold md:text-3xl lg:text-[40px]">
            <FormattedMessage id="page.services.shipping.service_features" />
          </h3>
          <p className="text-dark-blue pb-6 text-xl md:text-xl lg:text-2xl">
            <FormattedMessage id="page.services.shipping.service_features_desc" />
          </p>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue bg-teal-blue hidden rounded-full border-[1px] p-7 lg:block">
              <FontAwesomeIcon
                icon={faCrosshairs}
                className="h-12 w-12 text-4xl text-white"
              />
            </div>
            <p className="bg-teal-blue flex items-center rounded-2xl p-4 text-lg text-white lg:text-[1.3rem] w-full">
              <FormattedMessage id="page.services.shipping.service_features1" />
            </p>
          </div>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue hidden rounded-full border-[1px] bg-white p-7 lg:block">
              <FontAwesomeIcon
                icon={faShield}
                className="text-teal-blue h-12 w-12 text-4xl"
              />
            </div>
            <p className="border-teal-blue text-teal-blue flex w-full items-center rounded-2xl border p-4 text-lg md:border-[3px] lg:text-[1.3rem] w-full">
              <FormattedMessage id="page.services.shipping.service_features2" />
            </p>
          </div>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue bg-teal-blue hidden rounded-full border-[1px] p-7 lg:block">
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="h-12 w-12 text-4xl text-white"
              />
            </div>
            <p className="bg-teal-blue flex w-full items-center rounded-2xl p-4 text-lg text-white lg:text-[1.3rem]">
              <FormattedMessage id="page.services.shipping.service_features3" />
            </p>
          </div>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue hidden rounded-full border-[1px] bg-white p-7 lg:block">
              <FontAwesomeIcon
                icon={faUsersLine}
                className="text-teal-blue h-12 w-12 text-4xl"
              />
            </div>
            <p className="border-teal-blue text-teal-blue flex items-center rounded-2xl border p-4 text-lg md:border-[3px] lg:text-[1.3rem] w-full">
              <FormattedMessage id="page.services.shipping.service_features4" />
            </p>
          </div>

          <div className="mb-4 flex gap-16 lg:mb-8">
            <div className="border-teal-blue bg-teal-blue hidden rounded-full border-[1px] p-7 lg:block">
              <FontAwesomeIcon
                icon={faGaugeHigh}
                className="h-12 w-12 text-4xl text-white"
              />
            </div>
            <p className="bg-teal-blue flex items-center rounded-2xl p-4 text-lg text-white lg:text-[1.3rem] w-full">
              <FormattedMessage id="page.services.shipping.service_features5" />
            </p>
          </div>
        </div>

        <div className="mb-16 py-8 xl:px-16" ref={receiveServiceRef}>
          <h3 className="text-dark-blue mb-4 text-center text-4xl font-semibold">
            <FormattedMessage id="page.services.shipping.receive_service" />
          </h3>
          <img
            className="relative -z-10 mx-auto w-[100%] rounded-t-[40px] object-cover md:h-[70vh] lg:h-[86vh]"
            src="/assets/images/receive-service.png"
            alt="Contact Us"
          />
          <div className="bg-light-grey mx-auto -mt-4 rounded-b-[30px] p-2 text-center md:-mt-16 md:p-12">
            <Link href="https://wa.me/+97165440202?text=Hi" passHref>
              <a
                target="_blank"
                className="bg-azure-blue my-2 inline-block rounded-lg px-5 py-2.5 text-lg font-medium text-white hover:border-0 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:text-2xl"
              >
                <FormattedMessage id="general.text_nejoum" />
              </a>
            </Link>
            <div className="visible md:hidden"></div>
            <Link href="/auth/newAccount/">
              <a className="text-azure-blue my-2 inline-block rounded-lg bg-white px-5 py-2.5 text-lg font-medium shadow-md hover:border-0 hover:bg-slate-100 focus:outline-none dark:focus:ring-blue-800 md:ltr:ml-8 md:rtl:mr-8 md:text-2xl">
                <FormattedMessage id="general.apply_for_account" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
