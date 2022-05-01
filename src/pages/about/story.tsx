import Breadcrumbs from '@/components/Breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

const Story = () => (
  <Layout meta={<Meta title="Our Story" description="Our Story" />}>
    <div className="container mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          { name: 'About', href: '#' },
          { name: 'The Story', href: '/about/story' },
        ]}
      />
    </div>

    <div className="relative">
      <img src="/assets/images/story-cover.jpg" alt="Nejoum Aljazeera" />
      <h1 className="story-cover-text-shadow absolute top-1/2 left-1/2 translate-x-[-80%] -translate-y-1/2 text-[100px] 2xl:text-[140px] 4xl:text-[200px] font-extrabold uppercase leading-none tracking-wide text-white">
        We ease heavy duty
      </h1>
    </div>

    <div className="container mx-auto">
      <div className="text-dark-blue py-10">
        <h3 className="text-center text-[80px] font-semibold">The Story</h3>
        <p className="py-4 text-3xl">
          <span className="font-bold">NEJOUM</span> ALJAZEERA initiated its
          movement during the late last century, where its activities revolved
          around trading in and trading out vehicles, as well as logistics and
          meet the expectations of all customers present locally and in the gulf
          region, synchronizing along with the economic prosperity witnessed by
          United Arab Emirates which greets diverse nationalities that provides
          work, residency, and investments. One of our first branches was opened
          in Sharjah in the year of 2002 to officially start our journey in
          servicing -American exported- used cars.
        </p>
      </div>

      <div className="text-dark-blue py-10">
        <h3 className="pl-16 text-[80px] font-semibold">Timeline</h3>

        <ol className="relative border-l-[3px] border-[#707070]">
          <li className="relative -top-10 mt-20 ml-4 pl-14">
            <div className="bg-yellow-orange absolute top-10 -left-8 h-7 w-7 rounded-full"></div>
            <time className="mb-1 text-[80px] font-semibold leading-none">
              2002
            </time>
            <h4 className="pt-4 text-3xl font-normal">
              We officially opened our first branch in Sharjah, UAE.
            </h4>
          </li>
          <li className="relative mb-10 ml-4 pl-12">
            <div className="bg-yellow-orange absolute top-10 -left-8 h-7 w-7 rounded-full"></div>
            <time className="mb-1 text-[80px] font-semibold leading-none">
              2003
            </time>
            <h4 className="text-3xl font-normal">
              Our first initiation of transaction for customers under Copart &
              IAAI
            </h4>
          </li>
          <li className="relative ml-4 pl-12">
            <div className="bg-yellow-orange absolute top-10 -left-8 h-7 w-7 rounded-full"></div>
            <time className="mb-1 text-[80px] font-semibold leading-none">
              2009
            </time>
            <h4 className="py-4 text-3xl font-normal">
              Our first opening of the dispatch service office
            </h4>
            <p className="py-4 text-2xl">
              From here onwards our company assembled and planned out a system
              that changes our company from its roots to enhance our performance
              as well as transform the policies through launching our own
              warehouses across the United States of America to render the
              supreme quality and efficient standards, including the uttermost
              levels of security and trust among the company employees and
              customers.
            </p>
          </li>
          <li className="relative my-10 ml-4 pl-14">
            <div className="bg-yellow-orange absolute top-10 -left-8 h-7 w-7 rounded-full"></div>
            <time className="mb-1 text-[80px] font-semibold leading-none">
              2016
            </time>
            <h4 className="py-4 text-3xl font-normal">
              We opened our first warehouse in Cambodia
            </h4>
          </li>
          <li className="relative my-10 ml-4 pl-14">
            <div className="bg-yellow-orange absolute top-10 -left-8 h-7 w-7 rounded-full"></div>
            <time className="mb-1 text-[80px] font-semibold leading-none">
              2017
            </time>
            <h4 className="py-4 text-3xl font-normal">
              We opened our first warehouse in Yemen
            </h4>
          </li>
          <li className="relative my-10 ml-4 pl-14">
            <div className="bg-yellow-orange absolute top-10 -left-8 h-7 w-7 rounded-full"></div>
            <time className="mb-1 text-[80px] font-semibold leading-none">
              2018
            </time>
            <h4 className="py-4 text-3xl font-normal">
              We opened our first warehouse in Newark, New Jersey USA, and the
              Sultanate of Oman
            </h4>
          </li>
          <li className="relative mt-10 ml-4 pl-14">
            <div className="bg-yellow-orange absolute top-10 -left-8 h-7 w-7 rounded-full"></div>
            <time className="mb-1 text-[80px] font-semibold leading-none">
              2019
            </time>
            <h4 className="pt-4 text-3xl font-normal">
              We Opened our second warehouse in Houston, Texas, United States
            </h4>
          </li>
          <li className="relative top-[8rem] -mt-16 mb-28 ml-4 pl-14">
            <div className="bg-yellow-orange absolute top-10 -left-8 h-7 w-7 rounded-full"></div>
            <time className="mb-1 text-[80px] font-semibold leading-none">
              2022
            </time>
            <h4 className="pt-4 text-3xl font-normal">
              <span className="font-bold">NEJOUM</span> ALJAZEERA, a brand new
              beginning were we launched our new logo, Brand Identity, and
              website
            </h4>
          </li>
        </ol>
      </div>
    </div>

    <p className="text-dark-blue mt-12 mb-24 text-center text-3xl italic">
      All just the beginning, the story is to carry on with you!
    </p>
  </Layout>
);

export default Story;
