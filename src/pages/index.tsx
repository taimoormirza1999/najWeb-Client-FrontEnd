import axios from 'axios';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';

import DownloadApps from '../components/lownloadApps';

const apiUrl = process.env.API_URL;

const Index = ({ announcements }) => {
  return (
    <Layout
      meta={<Meta title="" description="Nejoum Al Jazeera" />}
      announcements={announcements}
    >
      <div className="relative">
        <img
          src="/assets/images/slider-bg.png"
          className="md:[h-68vh] w-full lg:h-[83vh]"
          alt="banner"
        />
        <div className="absolute top-1/3 left-[7%] max-w-[500px] text-white">
          <h4 className="text-3xl font-semibold">
            Shipping your Cars from <br/>
            all American Auctions
          </h4>

          <p className="text-xl mt-[10px]">
            Working day and night to facilitate your car transportation starting
            from providing buyer accounts, towing, shipping, and tracking it at
            all times
          </p>
        </div>
        <div
          style={{ backgroundColor: 'rgba(0,95,183, .6)' }}
          className="absolute top-1/2 left-1/2 flex w-[16rem] -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded-[25px] p-4 md:h-[30vh] md:w-[20rem] lg:h-[35vh] lg:w-[30rem] xl:left-auto xl:right-[5rem] xl:top-[18%] xl:h-[45vh] xl:w-[35rem] xl:translate-x-0 xl:translate-y-0 2xl:right-[8%] 2xl:h-[65%] 2xl:w-[30%]"
        >
          <div className="basis-1/3">
            <h2 className="py-6 text-center text-2xl font-semibold text-white md:text-4xl lg:text-6xl rtl:lg:text-5xl xl:text-[70px]">
              <FormattedMessage id="you.want.to" />
            </h2>

            <div className="flex justify-center gap-4">
              <Link href="/services/shipping">
                <a className="rounded-sm bg-[#0093FF] p-1 text-lg font-medium text-white hover:border-0 hover:bg-blue-400 md:px-4 md:text-xl lg:py-3 xl:text-2xl">
                  <FormattedMessage id="Ship cars" />
                </a>
              </Link>
              <Link href="/cars/showroom">
                <a className="ml-0 rounded-sm bg-white p-1 text-lg font-medium hover:border-none hover:text-blue-500 md:ml-8 md:px-4 md:text-xl lg:py-3 xl:text-2xl">
                  <FormattedMessage id="Buy cars" />
                </a>
              </Link>
            </div>
          </div>
          {/* <a className="flex basis-1/3  items-center justify-center text-center text-lg font-light ltr:italic text-blue-100 underline hover:border-0 md:text-[22px]"></a> */}
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col gap-10 py-12 lg:flex-row lg:gap-20 lg:py-24">
          <div className="basis-1/2">
            <img
              className="h-auto rounded-xl lg:h-[470px]"
              src="/assets/images/ship-cars.png"
              alt="Shipping Cars"
            />
          </div>
          <div className="basis-1/2 self-center">
            <h3 className="text-dark-blue py-3 text-2xl font-semibold md:text-3xl lg:text-[2.5rem]">
              <FormattedMessage id="ships.cars.from.usa.canada" />
            </h3>
            <p className="text-dark-blue max-w-full py-3 text-xl md:text-2xl lg:max-w-[75%] lg:text-3xl">
              <span className="font-sen">
                <span className="font-bold">
                  <FormattedMessage id="page.company.name.nejoum" />
                </span>
                <FormattedMessage id="page.company.name.aljazeera" />
              </span>
              <FormattedMessage id="ships.cars.from.usa.canada.desc" />
            </p>
            <Link href="/services/shipping">
              <a className="text-azure-blue block py-3 text-xl hover:border-0 lg:text-2xl">
                <FormattedMessage id="learn.more" />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-teal-blue">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse gap-10 lg:flex-row lg:gap-20">
            <div className="basis-1/2 self-center py-4">
              <h3 className="py-3 text-2xl font-semibold text-white md:text-3xl lg:text-[2.5rem]">
                <FormattedMessage id="integrate.services" />
              </h3>
              <p className="py-3 pr-4 text-xl !text-white md:text-2xl lg:text-3xl">
                <FormattedMessage id="integrate.services.desc" />
              </p>
              <a
                href="#"
                className="block py-3 text-xl text-blue-200 hover:border-0 lg:text-2xl"
              >
                <FormattedMessage id="learn.more" />
              </a>
            </div>
            <div className="basis-1/2">
              <img
                className="w-full lg:mx-0 2xl:w-4/5"
                src="/assets/images/integerate-services.png"
                alt="Mobile App"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col gap-8 py-12 lg:flex-row lg:gap-20 lg:py-24">
          <div className="basis-1/2">
            <img
              className="max-h-[500px] rounded-xl md:h-[600px]"
              src="/assets/images/car-tracking-2.png"
              alt="Tracking Cars"
            />
          </div>
          <div className="basis-1/2 py-4 lg:py-24 lg:pl-8">
            <h3 className="text-dark-blue py-3 text-2xl font-semibold md:text-3xl lg:text-[2.5rem]">
              <FormattedMessage id="cars.tracking.services" />
            </h3>
            <p className="text-dark-blue max-w-full py-3 text-xl md:text-2xl lg:max-w-[75%] lg:text-3xl">
              <FormattedMessage id="cars.tracking.services.desc" />
            </p>
            <Link href="/services/cargo">
              <a className="text-azure-blue block py-3 text-xl hover:border-0 lg:text-2xl">
                <FormattedMessage id="learn.more" />
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="container mx-auto">
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="group relative basis-1/3">
            <img
              src="/assets/images/service-auction.jpg"
              alt="Buy from auction"
              className="mx-auto h-[500px] w-full rounded-2xl object-cover md:h-[700px]"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-[#ebebeb]/[.7] py-8 px-5 opacity-0 duration-300 group-hover:opacity-100 md:mb-0 ">
              <h3 className="text-dark-blue text-2xl font-semibold md:text-3xl">
                <FormattedMessage id="Buy.from.auction" />
              </h3>
              <p className="text-teal-blue py-2 text-xl font-semibold md:text-2xl">
                <FormattedMessage id="Get.to.know.the.features.of.buying.from.US.auctions" />
              </p>
              <Link href="/">
                <a className="text-azure-blue py-2 text-lg ltr:italic hover:border-0 md:text-2xl">
                  <FormattedMessage id="learn.more" />
                </a>
              </Link>
            </div>
          </div>
          <div className="group relative basis-1/3">
            <img
              src="/assets/images/service-shipping.jpg"
              alt="Cars Shipping"
              className="mx-auto h-[500px] w-full rounded-2xl object-cover md:h-[700px]"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-[#ebebeb]/[.7] py-8 px-5 opacity-0 duration-300 group-hover:opacity-100 md:mb-0">
              <h3 className="text-dark-blue text-2xl font-semibold md:text-3xl">
                <FormattedMessage id="Ship.car" />
              </h3>
              <p className="text-teal-blue py-2 text-xl font-semibold md:text-2xl">
                <FormattedMessage id="Get.to.know.the.features.of.shipping.cars.from.USA" />
              </p>
              <Link href="/services/shipping">
                <a className="text-azure-blue py-2 text-lg ltr:italic hover:border-0 md:text-2xl">
                  <FormattedMessage id="learn.more" />
                </a>
              </Link>
            </div>
          </div>
          <div className="group relative basis-1/3">
            <img
              src="/assets/images/service-car-sell.jpg"
              alt="Car Sell"
              className="mx-auto h-[500px] w-full rounded-2xl object-cover md:h-[700px]"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-[#ebebeb]/[.7] py-8 px-5 opacity-0 duration-300 group-hover:opacity-100 md:mb-0">
              <h3 className="text-dark-blue text-2xl font-semibold md:text-3xl">
                <FormattedMessage id="Sell.your.car" />
              </h3>
              <p className="text-teal-blue py-2 text-xl font-semibold md:text-2xl">
                <FormattedMessage id="Get.to.know.the.features.of.selling.cars.in.our.yard" />
              </p>
              <Link href="/">
                <a className="text-azure-blue py-2 text-lg ltr:italic hover:border-0 md:text-2xl">
                  <FormattedMessage id="learn.more" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <div className="pt-12 md:pt-24">
        <DownloadApps />
      </div>

      <div className="container mx-auto text-center">
        <h3 className="text-dark-blue py-3 pb-5 text-3xl font-semibold md:text-5xl">
          <FormattedMessage id="Trusted.By" />
        </h3>
        <div className="partners-logo-box mx-auto rounded-xl p-8">
          <div className="mx-auto grid max-w-[600px] grid-cols-1 flex-row gap-4 px-16 py-2 md:grid-cols-2 md:gap-1 lg:grid-cols-4">
            <img
              className="mx-auto h-8 w-max md:h-12"
              src="/assets/images/copart.png"
              alt="Copart"
            />
            <img
              className="mx-auto h-8 w-max md:h-12"
              src="/assets/images/iaai.png"
              alt="IAAI"
            />
            <img
              className="mx-auto h-8 w-max md:h-12"
              src="/assets/images/manheim.png"
              alt="Manheim"
            />
            <img
              className="mx-auto h-8 w-max md:h-12"
              src="/assets/images/adesa.png"
              alt="ADESA"
            />
          </div>
          <div className="mx-auto grid max-w-[750px] grid-cols-1 flex-row gap-4 px-16 pt-12 pb-2 md:grid-cols-3 md:gap-1 lg:grid-cols-5">
            <img
              className="mx-auto mt-[13px] w-max"
              src="/assets/images/Marsek.png"
              alt="Marsek"
            />
            <img
              className="mx-auto ml-[12px] w-max"
              src="/assets/images/twilllogo.jpeg"
              alt="TWILL"
            />
            <img
              className="mx-auto h-10 mt-[8px] w-max"
              src="/assets/images/msc.jpeg"
              alt="MSC"
            />
            <img
              className="mx-auto mt-[17px] w-max"
              src="/assets/images/hapag lloyd .png"
              alt="Hapag-lloyd"
            />
            <img
              className="mx-auto h-10 mt-[6px] w-max"
              src="/assets/images/cma.png"
              alt="cmacgm"
            />
          </div>
        </div>
      </div>

      <div className="py-20"></div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(`${apiUrl}adsAnnouncement`);
  const announcements = res.data;

  return {
    props: {
      announcements,
    },
  };
}

export default Index;
