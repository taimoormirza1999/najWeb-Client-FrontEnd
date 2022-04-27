import {
  faClipboardCheck,
  faCrosshairs,
  faGaugeHigh,
  faShield,
  faUsersLine,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

const Shipping = () => (
  <Layout
    meta={<Meta title="Shipping Services" description="Shipping Services" />}
  >
    <div className="container mx-auto">
      <Breadcrumbs />
    </div>

    <div className="container mx-auto">
      <div className="border-dark-blue flex rounded-lg border p-8">
        <div className="text-dark-blue basis-3/5 p-8">
          <h2 className="text-[90px] font-bold">Shipping</h2>
          <p className="py-8 text-4xl">
            <span className="font-bold">NEJOUM</span> ALJAZEERA has adopted the
            principle of competitiveness and leadership in the field of the car
            logistic of all kinds for most of the Gulf Cooperation Countries in
            addition to the import and customs clearance services for cars
            coming from abroad to the United Arab Emirates by ensuring the
            highest levels of quality and competitive prices providing all
            logistical support and complete solutions to our valued customers
            and the pursuit always achieve the highest standards of efficiency
            and effectiveness.
          </p>
          <Link href="#receiveService">
            <a className="block-more-link italic">Receive service...</a>
          </Link>
        </div>
        <div className="relative basis-2/5">
          <img
            src="/assets/images/shipping-car.png"
            alt="Shipping car"
            className="w-full"
          />
          <Link href="#receiveService">
            <a className="bg-azure-blue absolute inset-x-0 bottom-40 m-auto max-w-max rounded-lg py-3 px-6 text-3xl font-medium text-white hover:border-0">
              Receive Service
            </a>
          </Link>
        </div>
      </div>

      <div className="px-16">
        <h3 className="text-dark-blue py-12 text-center text-[70px] font-semibold">
          Service Features
        </h3>
        <p className="text-dark-blue pb-6 text-4xl">
          We maintain efficiency in all our services to meet all the
          requirements of our valued customers according to their expectations.
          Below are some of the key features of our services. We strive to
          delivering vehicles upon punctual timings.
        </p>

        <div className="flex gap-16 py-6">
          <div className="bg-teal-blue rounded-full px-11 py-[2.5rem]">
            <FontAwesomeIcon
              icon={faCrosshairs}
              className="h-14 w-14 text-6xl text-white"
            />
          </div>
          <p className="bg-teal-blue rounded-2xl p-4 text-3xl text-white">
            Vehicle tracking service in order to follow the movement of cars
            step by step starting from the purchase till the handover to the
            owner through our website
          </p>
        </div>

        <div className="flex gap-16 py-6">
          <div className="border-teal-blue rounded-full border-[3px] px-11 py-[2.5rem]">
            <FontAwesomeIcon
              icon={faShield}
              className="text-teal-blue h-14 w-14 text-6xl"
            />
          </div>
          <p className="border-teal-blue text-teal-blue rounded-2xl border-[3px] p-4 text-4xl">
            Dependence on closed and covered cars to protect and secure cars
            during the charging process
          </p>
        </div>

        <div className="flex gap-16 py-6">
          <div className="bg-teal-blue rounded-full px-11 py-[2.5rem]">
            <FontAwesomeIcon
              icon={faClipboardCheck}
              className="h-14 w-14 text-6xl text-white"
            />
          </div>
          <p className="bg-teal-blue rounded-2xl p-4 text-4xl text-white">
            Experience in completing all Document and procedures related to
            automotive abroad and in the United Arab Emirates
          </p>
        </div>

        <div className="flex gap-16 py-6">
          <div className="border-teal-blue rounded-full border-[3px] px-11 py-[2.5rem]">
            <FontAwesomeIcon
              icon={faUsersLine}
              className="text-teal-blue h-14 w-14 text-6xl"
            />
          </div>
          <p className="border-teal-blue text-teal-blue rounded-2xl border-[3px] p-4 text-4xl">
            Having a distinguished and professional team with different
            nationalities and high levels of expertise to meet the requirements
            of our valued customers
          </p>
        </div>

        <div className="flex gap-16 py-6">
          <div className="bg-teal-blue rounded-full px-11 py-[2.5rem]">
            <FontAwesomeIcon
              icon={faGaugeHigh}
              className="h-14 w-14 text-6xl text-white"
            />
          </div>
          <p className="bg-teal-blue rounded-2xl p-4 text-4xl text-white">
            Always strive to provide the best logistic service as quickly as
            possible and at the lowest costs and willing to meet the aspirations
            of our valued customers
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16" id="receiveService">
        <h3 className="block-heading text-center !text-6xl">Receive Service</h3>
        <img
          className="relative -z-10 mx-auto w-full pt-8"
          src="/assets/images/receive-service.jpg"
          alt="Contact Us"
        />
        <div className="bg-light-grey mx-auto -mt-16 rounded-b-[60px] p-12 text-center">
          <Link href={'#'}>
            <a className="bg-azure-blue my-4 inline-block rounded-lg px-5 py-2.5 text-3xl font-medium text-white hover:border-0 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Text Nejoum
            </a>
          </Link>
          <Link href={'#'}>
            <a className="text-azure-blue my-4 ml-8 inline-block rounded-lg bg-white px-5 py-2.5 text-3xl font-medium shadow-md hover:border-0 hover:bg-slate-100 focus:outline-none dark:focus:ring-blue-800">
              Apply For Account
            </a>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default Shipping;
