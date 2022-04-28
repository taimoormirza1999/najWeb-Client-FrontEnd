import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

import DownloadApps from '../components/DownloadApps';

const Index = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  /* useEffect(() => {
    if(!loading && !session) {
      router.push('/login')
    }
  }, [loading, session]) */

  return (
    <Layout meta={<Meta title="" description="Nejoum Al Jazeera" />}>
      <div className="relative">
        <img src="assets/images/slider-bg.jpg" className="" alt="banner" />
        <div
          style={{ backgroundColor: 'rgba(0,61,117, .6)' }}
          className="absolute top-[8rem] right-[8rem] flex h-[45rem] w-[35rem] flex-col justify-center rounded-[25px] p-4 opacity-100"
        >
          <div className="basis-1/3"></div>
          <div className="basis-1/3">
            <h2 className="text-center text-[86px] font-extrabold text-white">
              You want to...
            </h2>

            <div className="flex justify-center">
              <a
                href="#"
                className="rounded-sm bg-blue-500 py-3 px-4 text-[1.5em] font-medium text-white hover:border-0 hover:bg-blue-400"
              >
                Ship cars
              </a>
              <a
                href="#"
                className="ml-8 rounded-sm bg-white py-3 px-4 text-[1.5em] font-medium hover:border-none hover:text-blue-500"
              >
                Buy a car
              </a>
            </div>
          </div>
          <a className="flex basis-1/3  items-center justify-center text-center text-[22px] font-light italic text-blue-100 underline hover:border-0">
            Check more actions
          </a>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex gap-20 py-24">
          <div className="basis-1/2">
            <img
              className="mx-auto h-[470px]"
              src="assets/images/ship-cars.png"
              alt="Shipping Cars"
            />
          </div>
          <div className="basis-1/2 py-10">
            <h3 className="block-heading">Ships Cars From USA & Canada</h3>
            <p className="block-text">
              Nejoum Aljazeera has a team with years of experience and
              dedication to the used car sales market.
            </p>
            <Link href="/services/shipping">
              <a className="block-more-link">Learn more...</a>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-teal-blue">
        <div className="container mx-auto">
          <div className="flex gap-20">
            <div className="basis-1/2 py-32 pl-12">
              <h3 className="block-heading !text-white">Integrate Services</h3>
              <p className="block-text !text-white">
                Integrate Services for online purchase and payment of vehicles
                throught auctions and transferring it to our warehouses all
                around the Us, and by then to the designated location of our
                customers..
              </p>
              <a href="#" className="block-more-link !text-blue-200">
                Learn more...
              </a>
            </div>
            <div className="basis-1/2">
              <img
                className="mx-auto"
                src="assets/images/app-landing.png"
                alt="Mobile App"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex gap-20 py-24">
          <div className="basis-1/2">
            <img
              className="mx-auto h-[600px]"
              src="assets/images/car-tracking.png"
              alt="Tracking Cars"
            />
          </div>
          <div className="basis-1/2 py-24 pl-8">
            <h3 className="block-heading">Cars Tracking Services</h3>
            <p className="block-text">
              Track your vehicle whereever it is around the world. Once you
              purchased your car.
            </p>
            <Link href="/services/cargo">
              <a className="block-more-link">Learn more...</a>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex gap-16">
          <div className="group relative">
            <img
              src="assets/images/service-auction.png"
              alt="Buy from auction"
            />
            <div className="absolute inset-x-0 bottom-4 left-[1%] -mb-2 w-[98%] rounded-b-2xl bg-[#ebebeb]/[.6] py-8 px-5 opacity-0 duration-300 group-hover:opacity-100">
              <h3 className="text-dark-blue text-4xl font-semibold">
                Buy from auction
              </h3>
              <p className="text-teal-blue py-2 text-3xl font-semibold">
                Get to know the features of buying from US auctions
              </p>
              <Link href="/">
                <a className="text-azure-blue py-2 text-2xl italic hover:border-0">
                  Learn more...
                </a>
              </Link>
            </div>
          </div>
          <div className="group relative">
            <img src="assets/images/service-shipping.png" alt="Cars Shipping" />
            <div className="absolute inset-x-0 bottom-4 left-[1%] -mb-2 w-[98%] rounded-b-2xl bg-[#ebebeb]/[.6] py-8 px-5 opacity-0 duration-300 group-hover:opacity-100">
              <h3 className="text-dark-blue text-4xl font-semibold">
                Ship a car
              </h3>
              <p className="text-teal-blue py-2 text-3xl font-semibold">
                Get to know the features of shipping cars from USA
              </p>
              <Link href="/">
                <a className="text-azure-blue py-2 text-2xl italic hover:border-0">
                  Learn more...
                </a>
              </Link>
            </div>
          </div>
          <div className="group relative">
            <img src="assets/images/service-car-sell.png" alt="Car Sell" />
            <div className="absolute inset-x-0 bottom-4 left-[1%] -mb-2 w-[98%] rounded-b-2xl bg-[#ebebeb]/[.6] py-8 px-5 opacity-0 duration-300 group-hover:opacity-100">
              <h3 className="text-dark-blue text-4xl font-semibold">
                Sell your car
              </h3>
              <p className="text-teal-blue py-2 text-3xl font-semibold">
                Get to know the features of selling cars in our yard
              </p>
              <Link href="/">
                <a className="text-azure-blue py-2 text-2xl italic hover:border-0">
                  Learn more...
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <h3 className="block-heading text-center !text-6xl">Contact Us</h3>
        <img
          className="relative -z-10 mx-auto max-w-[80%] pt-8"
          src="assets/images/contact-us.jpg"
          alt="Contact Us"
        />
        <div className="bg-light-grey mx-auto -mt-16 max-w-[80%] rounded-b-[60px] p-8 text-center">
          <p className="block-text !max-w-none">
            You may always text us on WhatsApp
          </p>
          <a
            href="https://wa.me/+97165440202?text=Hi"
            target="_blank"
            rel="noreferrer"
            className="bg-azure-blue my-4 inline-block rounded-lg px-5 py-2.5 text-xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Text Nejoum
          </a>
        </div>
      </div>

      <DownloadApps />

      <div className="container mx-auto text-center">
        <h3 className="block-heading !text-6xl ">Trusted By</h3>
        <div className="partners-logo-box mx-auto max-w-max rounded-xl p-8">
          <div className="flex justify-center gap-[13rem] px-16 py-2">
            <img className="h-24" src="assets/images/copart.png" alt="Copart" />
            <img className="h-24" src="assets/images/iaai.png" alt="IAAI" />
            <img
              className="h-24"
              src="assets/images/manheim.png"
              alt="Manheim"
            />
            <img className="h-24" src="assets/images/adesa.png" alt="ADESA" />
          </div>
        </div>
      </div>

      <div className="py-20"></div>
    </Layout>
  );
};

export default Index;
