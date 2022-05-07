import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

import DownloadApps from '../components/DownloadApps';

const Index = () => {

  return (
    <Layout meta={<Meta title="" description="Nejoum Al Jazeera" />}>
      <div className="relative">
        <img src="/assets/images/slider-bg.jpg" className="" alt="banner" />
        <div
          style={{ backgroundColor: 'rgba(0,61,117, .6)' }}
          className="absolute top-1/2 left-1/2 md:left-auto flex h-[12rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded-[25px] p-4 md:top-[8rem] md:right-[8rem] md:h-[45rem] md:w-[35rem] md:translate-x-0 md:translate-y-0"
        >
          <div className="basis-1/3"></div>
          <div className="basis-1/3">
            <h2 className="py-2 text-center text-2xl font-extrabold text-white md:text-[86px]">
              You want to...
            </h2>

            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="rounded-sm bg-blue-500 p-2 text-lg font-medium text-white hover:border-0 hover:bg-blue-400 md:py-3 md:px-4 md:text-[1.5em]"
              >
                Ship cars
              </a>
              <a
                href="#"
                className="ml-0 rounded-sm bg-white p-2 text-lg font-medium hover:border-none hover:text-blue-500 md:ml-8 md:py-3 md:px-4 md:text-[1.5em]"
              >
                Buy a car
              </a>
            </div>
          </div>
          <a className="flex basis-1/3  items-center justify-center text-center text-lg font-light italic text-blue-100 underline hover:border-0 md:text-[22px]">
            Check more actions
          </a>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col gap-10 py-12 md:flex-row md:gap-20 md:py-24">
          <div className="basis-1/2">
            <img
              className="mx-auto h-auto md:h-[470px]"
              src="/assets/images/ship-cars.png"
              alt="Shipping Cars"
            />
          </div>
          <div className="basis-1/2 pt-0  md:py-10">
            <h3 className="text-dark-blue py-3 text-2xl font-semibold md:text-[2.5rem]">
              Ships Cars From USA & Canada
            </h3>
            <p className="text-dark-blue max-w-full py-3 text-xl md:max-w-[75%] md:text-3xl">
              Nejoum Aljazeera has a team with years of experience and
              dedication to the used car sales market.
            </p>
            <Link href="/services/shipping">
              <a className="text-azure-blue block py-3 text-xl hover:border-0 md:text-2xl">
                Learn more...
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-teal-blue">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse gap-10 md:flex-row md:gap-20">
            <div className="basis-1/2 self-center py-4 pl-0 md:pl-12">
              <h3 className="py-3 text-2xl font-semibold text-white md:text-[2.5rem]">
                Integrate Services
              </h3>
              <p className="py-3 pr-4 text-xl !text-white md:text-3xl">
                Integrate Services for online purchase and payment of vehicles
                throught auctions and transferring it to our warehouses all
                around the Us, and by then to the designated location of our
                customers..
              </p>
              <a
                href="#"
                className="block py-3 text-xl text-blue-200 hover:border-0 md:text-2xl"
              >
                Learn more...
              </a>
            </div>
            <div className="basis-1/2">
              <img
                className="mx-auto max-h-[500px] md:mx-0 md:max-h-[800px]"
                src="/assets/images/app-landing.png"
                alt="Mobile App"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col gap-8 py-12 md:flex-row md:gap-20 md:py-24">
          <div className="basis-1/2">
            <img
              className="mx-auto max-h-[500px] md:h-[600px]"
              src="/assets/images/car-tracking.png"
              alt="Tracking Cars"
            />
          </div>
          <div className="basis-1/2 py-4 md:py-24 md:pl-8">
            <h3 className="text-dark-blue py-3 text-2xl font-semibold md:text-[2.5rem]">
              Cars Tracking Services
            </h3>
            <p className="text-dark-blue max-w-full py-3 text-xl md:max-w-[75%] md:text-3xl">
              Track your vehicle whereever it is around the world. Once you
              purchased your car.
            </p>
            <Link href="/services/cargo">
              <a className="text-azure-blue block py-3 text-xl hover:border-0 md:text-2xl">
                Learn more...
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col gap-16 md:flex-row">
          <div className="group relative">
            <img
              src="/assets/images/service-auction.png"
              alt="Buy from auction"
              className="mx-auto h-[500px] w-full rounded-2xl object-cover md:h-auto"
            />
            <div className="absolute inset-x-0 bottom-0 left-[1%] w-[98%] rounded-b-2xl bg-[#ebebeb]/[.6] py-8 px-5 opacity-0 duration-300 group-hover:opacity-100 md:mb-2">
              <h3 className="text-dark-blue text-2xl font-semibold md:text-4xl">
                Buy from auction
              </h3>
              <p className="text-teal-blue py-2 text-xl font-semibold md:text-3xl">
                Get to know the features of buying from US auctions
              </p>
              <Link href="/">
                <a className="text-azure-blue py-2 text-lg italic hover:border-0 md:text-2xl">
                  Learn more...
                </a>
              </Link>
            </div>
          </div>
          <div className="group relative">
            <img
              src="/assets/images/service-shipping.png"
              alt="Cars Shipping"
              className="mx-auto h-[500px] w-full rounded-2xl object-cover md:h-auto"
            />
            <div className="absolute inset-x-0 bottom-0 left-[1%] w-[98%] rounded-b-2xl bg-[#ebebeb]/[.6] py-8 px-5 opacity-0 duration-300 group-hover:opacity-100 md:mb-2">
              <h3 className="text-dark-blue text-2xl font-semibold md:text-4xl">
                Ship a car
              </h3>
              <p className="text-teal-blue py-2 text-xl font-semibold md:text-3xl">
                Get to know the features of shipping cars from USA
              </p>
              <Link href="/">
                <a className="text-azure-blue py-2 text-lg italic hover:border-0 md:text-2xl">
                  Learn more...
                </a>
              </Link>
            </div>
          </div>
          <div className="group relative">
            <img
              src="/assets/images/service-car-sell.png"
              alt="Car Sell"
              className="mx-auto h-[500px] w-full rounded-2xl object-cover md:h-auto"
            />
            <div className="absolute inset-x-0 bottom-0 left-[1%] w-[98%] rounded-b-2xl bg-[#ebebeb]/[.6] py-8 px-5 opacity-0 duration-300 group-hover:opacity-100 md:mb-2">
              <h3 className="text-dark-blue text-2xl font-semibold md:text-4xl">
                Sell your car
              </h3>
              <p className="text-teal-blue textxl py-2 font-semibold md:text-3xl">
                Get to know the features of selling cars in our yard
              </p>
              <Link href="/">
                <a className="text-azure-blue py-2 text-lg italic hover:border-0 md:text-2xl">
                  Learn more...
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-24">
        <DownloadApps />
      </div>

      <div className="container mx-auto text-center">
        <h3 className="text-dark-blue py-3 text-3xl font-semibold md:text-5xl">
          Trusted By
        </h3>
        <div className="partners-logo-box mx-auto max-w-max rounded-xl p-8">
          <div className="flex flex-col justify-center gap-16 px-16 py-2 md:flex-row md:gap-[13rem]">
            <img
              className="mx-auto h-12 w-max md:h-24"
              src="/assets/images/copart.png"
              alt="Copart"
            />
            <img
              className="mx-auto h-12 w-max md:h-24"
              src="/assets/images/iaai.png"
              alt="IAAI"
            />
            <img
              className="mx-auto h-12 w-max md:h-24"
              src="/assets/images/manheim.png"
              alt="Manheim"
            />
            <img
              className="mx-auto h-12 w-max md:h-24"
              src="/assets/images/adesa.png"
              alt="ADESA"
            />
          </div>
        </div>
      </div>

      <div className="py-20"></div>
    </Layout>
  );
};

export default Index;
