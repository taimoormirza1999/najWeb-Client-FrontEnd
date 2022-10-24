import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';

import DownloadApps from '../components/lownloadApps';

const apiUrl = process.env.API_URL;

const Index = ({ announcements }) => {
  const { locale } = useRouter();
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
        <div className="absolute left-[7%] top-1/3 max-w-[500px] text-white">
          <h4 className="text-base font-semibold md:text-xl lg:text-3xl">
            <FormattedMessage id="ship.your.cars.from" /> <br />
            <FormattedMessage id="all.american.auctions" />
          </h4>

          <p className="text-sm md:mt-[10px] md:text-base lg:text-xl">
            <FormattedMessage id="working.day.night" />
          </p>
        </div>
        <div className="absolute top-[20%] hidden w-[16rem] -translate-x-1/3 flex-col justify-center rounded-[25px] bg-transparent md:right-[5%] md:left-3/4 md:h-[33vh] md:w-[18rem] md:bg-[rgb(0,95,183)]/[0.6] md:p-4 lg:right-[1%] lg:left-auto lg:flex xl:h-[45vh] xl:w-[30rem] xl:translate-x-0 xl:translate-y-0 2xl:right-[8%] 2xl:h-[65%] 2xl:w-[30%]">
          <div className="basis-1/3">
            <h2 className="py-6 text-center text-2xl font-semibold text-white md:text-3xl lg:text-5xl rtl:lg:text-5xl xl:text-[70px]">
              <FormattedMessage id="you.want.to" />
            </h2>

            <div className="flex justify-center gap-1 xl:gap-4">
              <Link href="/services/shipping">
                <a className="rounded-sm bg-[#0093FF] p-1 text-lg font-medium text-white hover:border-0 hover:bg-blue-400 md:px-4 lg:py-3 xl:text-2xl">
                  <FormattedMessage id="Ship cars" />
                </a>
              </Link>
              <Link href="/cars/showroom">
                <a className="ml-0 rounded-sm bg-white p-1 text-lg font-medium hover:border-none hover:text-blue-500 md:ml-8 md:px-4 lg:py-3 xl:text-2xl">
                  <FormattedMessage id="Buy cars" />
                </a>
              </Link>
            </div>
          </div>
          {/* <a className="flex basis-1/3  items-center justify-center text-center text-lg font-light ltr:italic text-blue-100 underline hover:border-0 md:text-[22px]"></a> */}
        </div>
      </div>
      <div className="justify-center">
        <div className="flex justify-center bg-[rgb(0,95,183)]/[0.6] lg:hidden">
          <div className="">
            <div className="my-4 flex justify-center gap-4">
              <h2 className="text-xl font-semibold text-white">
                <FormattedMessage id="you.want.to" />
              </h2>
              <Link href="/services/shipping">
                <a className="rounded-sm bg-[#0093FF] p-1 text-base font-medium text-white hover:border-0 hover:bg-blue-400">
                  <FormattedMessage id="Ship cars" />
                </a>
              </Link>
              <Link href="/cars/showroom">
                <a className="ml-0 rounded-sm bg-white p-1 text-base font-medium hover:border-none hover:text-blue-500">
                  <FormattedMessage id="Buy cars" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col gap-10 py-12 lg:flex-row lg:gap-20 lg:py-24">
          <div className="basis-1/2">
            <img
              className="h-auto rounded-xl 2xl:h-[470px]"
              src="/assets/images/ship-cars.png"
              alt="Shipping Cars"
            />
          </div>
          <div className="basis-1/2 self-center">
            <h3 className="text-dark-blue py-3 text-2xl font-semibold md:text-3xl 2xl:text-[2.5rem]">
              <FormattedMessage id="ships.cars.from.usa.canada" />
            </h3>
            <p className="text-dark-blue max-w-full py-3 text-xl md:text-2xl lg:max-w-[75%] lg:text-2xl 2xl:text-3xl">
              {locale !== 'ar' && (
                <span className="font-sen">
                  <span className="font-bold">
                    <FormattedMessage id="page.company.name.nejoum" />
                  </span>
                  <FormattedMessage id="page.company.name.aljazeera" />
                </span>
              )}
              <FormattedMessage id="ships.cars.from.usa.canada.desc" />
            </p>
            <Link href="/services/shipping">
              <a className="text-azure-blue block py-3 text-xl hover:border-0 hover:text-gray-700 lg:text-2xl">
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
              <p className="py-3 text-xl !text-white ltr:pr-4 rtl:pl-4 md:text-2xl">
                <FormattedMessage id="integrate.services.desc" />
              </p>
              <a
                href="#"
                className="block py-3 text-xl text-blue-200 hover:border-0 hover:text-gray-300 lg:text-2xl"
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
        <div className="flex flex-col gap-8 py-12 lg:flex-row lg:gap-20 xl:py-24">
          <div className="basis-1/2">
            <img
              className="max-h-[500px] rounded-xl"
              src="/assets/images/car-tracking-2.png"
              alt="Tracking Cars"
            />
          </div>
          <div className="basis-1/2 py-4 lg:pl-8 xl:py-16 2xl:py-24">
            <h3 className="text-dark-blue py-3 text-2xl font-semibold md:text-3xl lg:text-[2.5rem]">
              <FormattedMessage id="cars.tracking.services" />
            </h3>
            <p className="text-dark-blue max-w-full py-3 text-xl md:text-2xl lg:max-w-[75%]">
              <FormattedMessage id="cars.tracking.services.desc" />
            </p>
            <Link href="/services/cargo">
              <a className="text-azure-blue block py-3 text-xl hover:border-0 hover:text-gray-700 lg:text-2xl">
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
