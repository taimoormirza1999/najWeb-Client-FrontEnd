import Breadcrumbs from '@/components/Breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';
import { FormattedMessage, useIntl } from "react-intl";

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
      <img
        src="/assets/images/story-cover.jpg"
        alt="Nejoum Aljazeera"
        className="max-h-screen w-full object-cover"
      />
      <h1 className="story-cover-text-shadow 4xl:text-[200px] absolute top-1/2 left-1/2 translate-x-[-80%] -translate-y-1/2 text-4xl font-extrabold uppercase leading-none tracking-wide text-white md:text-6xl lg:text-[100px] 2xl:text-[140px]">
        <FormattedMessage id= "page.story.heading"/>
      </h1>
    </div>

    <div className="container mx-auto">
      <div className="text-dark-blue py-10">
        <h3 className="text-center text-3xl font-semibold md:text-4xl lg:text-6xl xl:text-[80px]">
          <FormattedMessage id= "page.story.title"/>
        </h3>
        <p className="py-4 text-lg md:text-2xl lg:text-3xl">
          <span className="font-sen font-bold"><FormattedMessage id= "page.services.shipping.nejoum"/></span> 
          <FormattedMessage id= "page.story.story_desc"/>
        </p>
      </div>

      <div className="text-dark-blue py-10">
        <h3 className="pl-8 text-2xl font-semibold md:pl-16 md:text-4xl lg:text-6xl xl:text-[80px]">
          <FormattedMessage id= "page.story.timline"/>
        </h3>

        <ol className="relative mt-16 border-l-[3px] border-[#707070]">
          <li className="relative -top-10 ml-4 pl-6 pt-9 md:pl-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 -left-7 h-5 w-5 rounded-full md:-left-8 md:h-7 md:w-7"></div>
            <time className="mb-1 text-2xl font-semibold md:text-4xl lg:text-6xl xl:text-[80px]">
              2002
            </time>
            <h4 className="pt-4 text-lg font-normal md:text-2xl lg:text-3xl">
            <FormattedMessage id= "page.story.Story-2002"/>
            </h4>
          </li>
          <li className="relative ml-4 pl-6 pt-9 md:pl-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 -left-7 h-5 w-5 rounded-full md:-left-8 md:h-7 md:w-7"></div>
            <time className="mb-1 text-2xl font-semibold md:text-4xl lg:text-6xl xl:text-[80px]">
              2003
            </time>
            <h4 className="py-4 text-lg font-normal md:text-2xl lg:text-3xl">
            <FormattedMessage id= "page.story.Story-2003"/>
            </h4>
          </li>
          <li className="relative ml-4 pl-6 pt-9 md:pl-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 -left-7 h-5 w-5 rounded-full md:-left-8 md:h-7 md:w-7"></div>
            <time className="mb-1 text-2xl font-semibold md:text-4xl lg:text-6xl xl:text-[80px]">
              2009
            </time>
            <h4 className="py-4 text-lg font-normal md:text-2xl lg:text-3xl">
            <FormattedMessage id= "page.story.Story-2009"/>
            </h4>
            <p className="py-4 text-[16px] md:text-xl lg:text-2xl">
              From here onwards our company assembled and planned out a system
              that changes our company from its roots to enhance our performance
              as well as transform the policies through launching our own
              warehouses across the United States of America to render the
              supreme quality and efficient standards, including the uttermost
              levels of security and trust among the company employees and
              customers.
            </p>
          </li>
          <li className="relative ml-4 pl-6 pt-9 md:pl-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 -left-7 h-5 w-5 rounded-full md:-left-8 md:h-7 md:w-7"></div>
            <time className="mb-1 text-2xl font-semibold md:text-4xl lg:text-6xl xl:text-[80px]">
              2016
            </time>
            <h4 className="py-4 text-lg font-normal md:text-2xl lg:text-3xl">
            <FormattedMessage id= "page.story.Story-2016"/>
            </h4>
          </li>
          <li className="relative ml-4 pl-6 pt-9 md:pl-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 -left-7 h-5 w-5 rounded-full md:-left-8 md:h-7 md:w-7"></div>
            <time className="mb-1 text-2xl font-semibold md:text-4xl lg:text-6xl xl:text-[80px]">
              2017
            </time>
            <h4 className="py-4 text-lg font-normal md:text-2xl lg:text-3xl">
            <FormattedMessage id= "page.story.Story-2017"/>
            </h4>
          </li>
          <li className="relative ml-4 pl-6 pt-9 md:pl-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 -left-7 h-5 w-5 rounded-full md:-left-8 md:h-7 md:w-7"></div>
            <time className="mb-1 text-2xl font-semibold md:text-4xl lg:text-6xl xl:text-[80px]">
              2018
            </time>
            <h4 className="py-4 text-lg font-normal md:text-2xl lg:text-3xl">
            <FormattedMessage id= "page.story.Story-2018"/>
            </h4>
          </li>
          <li className="relative ml-4 pl-6 pt-9 md:pl-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 -left-7 h-5 w-5 rounded-full md:-left-8 md:h-7 md:w-7"></div>
            <time className="mb-1 text-2xl font-semibold md:text-4xl lg:text-6xl xl:text-[80px]">
              2019
            </time>
            <h4 className="pt-4 text-lg font-normal md:text-2xl lg:text-3xl">
            <FormattedMessage id= "page.story.Story-2019"/>
            </h4>
          </li>
          <li className="relative top-32 !-mt-32 mb-28 ml-4 pl-6 pt-9 md:pl-14 lg:top-40 lg:pt-0 2xl:top-32">
            <div className="bg-yellow-orange absolute top-10 -left-7 h-5 w-5 rounded-full md:-left-8 md:h-7 md:w-7"></div>
            <time className="mb-1 text-2xl font-semibold md:text-4xl lg:text-6xl xl:text-[80px]">
              2022
            </time>
            <h4 className="pt-4 text-lg font-normal md:text-2xl lg:text-3xl">
              <span className="font-sen font-bold"><FormattedMessage id= "page.services.shipping.nejoum"/></span>
              <FormattedMessage id= "page.story.Story-2022"/>
            </h4>
          </li>
        </ol>
      </div>
    </div>

    <p className="text-dark-blue mt-12 mb-24 px-4 text-center text-xl italic md:text-2xl lg:text-3xl">
    <FormattedMessage id= "page.story.end"/>
    </p>
  </Layout>
);

export default Story;
