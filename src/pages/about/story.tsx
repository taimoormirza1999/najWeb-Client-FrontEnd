import { FormattedMessage } from 'react-intl';

import Breadcrumbs from '@/components/breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';

const Story = () => (
  <Layout meta={<Meta title="Our Story" description="Our Story" />}>
    <div className="container mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          { name: <FormattedMessage id="general.about" />, href: '#' },
          {
            name: <FormattedMessage id="page.story.title" />,
            href: '/about/story',
          },
        ]}
      />
    </div>

    <div className="relative">
      <img
        src="/assets/images/story-cover.png"
        alt="Nejoum Aljazeera"
        className="w-full md:h-[60vh] lg:h-[73vh]"
      />
      <h1 className="story-cover-text-shadow 4xl:text-[200px] absolute top-[28%] w-[60%] -translate-y-1/2  text-4xl font-extrabold uppercase leading-none tracking-wide text-white ltr:left-[71%] ltr:translate-x-[-80%] rtl:right-[71%] rtl:translate-x-[80%] md:text-4xl lg:text-[60px] 2xl:text-[85px]">
        <FormattedMessage id="page.story.heading" />
      </h1>
    </div>

    <div className="container mx-auto">
      <div className="text-dark-blue pt-10">
        <h3 className="text-center text-3xl font-semibold md:text-4xl lg:text-6xl ">
          <FormattedMessage id="page.story.title" />
        </h3>
        <p className="py-4 text-lg md:text-2xl lg:text-3xl">
          <span className="font-sen">
            <span className="font-bold">
              <FormattedMessage id="page.company.name.nejoum" />
            </span>
            <FormattedMessage id="page.company.name.aljazeera" />
          </span>
          <FormattedMessage id="page.story.story_desc" />
        </p>
      </div>

      <div className="text-dark-blue pb-10">
        <h3 className="pl-8 text-2xl font-semibold md:pl-16 md:text-4xl lg:text-6xl ">
          <FormattedMessage id="page.story.timline" />
        </h3>

        <ol className="relative mt-8 border-[#707070] ltr:border-l-[3px] rtl:border-r-[3px]">
          <li className="relative -top-10 pt-8 ltr:ml-4 ltr:pl-6 rtl:mr-4 rtl:pr-6 md:pt-7 md:ltr:pl-14 md:rtl:pr-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 h-5 w-5 rounded-full ltr:-left-7 rtl:-right-7 md:h-7 md:w-7 md:ltr:-left-8 md:rtl:-right-8"></div>
            <time className="m-0 text-2xl font-semibold md:text-4xl lg:text-6xl ">
              2002
            </time>
            <h4 className="text-lg font-normal md:text-2xl lg:text-3xl">
              <FormattedMessage id="page.story.Story-2002" />
            </h4>
          </li>
          <li className="relative pt-4 ltr:ml-4 ltr:pl-6 rtl:mr-4 rtl:pr-6 md:pt-7 md:ltr:pl-14 md:rtl:pr-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 h-5 w-5 rounded-full ltr:-left-7 rtl:-right-7 md:h-7 md:w-7 md:ltr:-left-8 md:rtl:-right-8"></div>
            <time className="m-0 text-2xl font-semibold md:text-4xl lg:text-6xl ">
              2003
            </time>
            <h4 className="pb-4 text-lg font-normal md:text-2xl lg:text-3xl">
              <FormattedMessage id="page.story.Story-2003" />
            </h4>
          </li>
          <li className="relative pt-4 ltr:ml-4 ltr:pl-6 rtl:mr-4 rtl:pr-6 md:pt-7 md:ltr:pl-14 md:rtl:pr-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 h-5 w-5 rounded-full ltr:-left-7 rtl:-right-7 md:h-7 md:w-7 md:ltr:-left-8 md:rtl:-right-8"></div>
            <time className="m-0 text-2xl font-semibold md:text-4xl lg:text-6xl ">
              2009
            </time>
            <h4 className="pb-4 text-lg font-normal md:text-2xl lg:text-3xl">
              <FormattedMessage id="page.story.Story-2009" />
              <br />
              <br />
              <span className="text-base md:text-xl lg:text-2xl">
                <FormattedMessage id="page.story.Story-2009-2" />
              </span>
            </h4>
          </li>
          <li className="relative pt-4 ltr:ml-4 ltr:pl-6 rtl:mr-4 rtl:pr-6 md:pt-7 md:ltr:pl-14 md:rtl:pr-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 h-5 w-5 rounded-full ltr:-left-7 rtl:-right-7 md:h-7 md:w-7 md:ltr:-left-8 md:rtl:-right-8"></div>
            <time className="m-0 text-2xl font-semibold md:text-4xl lg:text-6xl ">
              2016
            </time>
            <h4 className="pb-4 text-lg font-normal md:text-2xl lg:text-3xl">
              <FormattedMessage id="page.story.Story-2016" />
            </h4>
          </li>
          <li className="relative pt-4 ltr:ml-4 ltr:pl-6 rtl:mr-4 rtl:pr-6 md:pt-7 md:ltr:pl-14 md:rtl:pr-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 h-5 w-5 rounded-full ltr:-left-7 rtl:-right-7 md:h-7 md:w-7 md:ltr:-left-8 md:rtl:-right-8"></div>
            <time className="m-0 text-2xl font-semibold md:text-4xl lg:text-6xl ">
              2017
            </time>
            <h4 className="pb-4 text-lg font-normal md:text-2xl lg:text-3xl">
              <FormattedMessage id="page.story.Story-2017" />
            </h4>
          </li>
          <li className="relative pt-4 ltr:ml-4 ltr:pl-6 rtl:mr-4 rtl:pr-6 md:pt-7 md:ltr:pl-14 md:rtl:pr-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 h-5 w-5 rounded-full ltr:-left-7 rtl:-right-7 md:h-7 md:w-7 md:ltr:-left-8 md:rtl:-right-8"></div>
            <time className="m-0 text-2xl font-semibold md:text-4xl lg:text-6xl ">
              2018
            </time>
            <h4 className="pb-4 text-lg font-normal md:text-2xl lg:text-3xl">
              <FormattedMessage id="page.story.Story-2018" />
            </h4>
          </li>
          <li className="relative pt-4 ltr:ml-4 ltr:pl-6 rtl:mr-4 rtl:pr-6 md:pt-7 md:ltr:pl-14 md:rtl:pr-14 lg:pt-0">
            <div className="bg-yellow-orange absolute top-10 h-5 w-5 rounded-full ltr:-left-7 rtl:-right-7 md:h-7 md:w-7 md:ltr:-left-8 md:rtl:-right-8"></div>
            <time className="m-0 text-2xl font-semibold md:text-4xl lg:text-6xl ">
              2019
            </time>
            <h4 className="pt-4 text-lg font-normal md:text-2xl lg:text-3xl">
              <FormattedMessage id="page.story.Story-2019" />
            </h4>
          </li>
          <li className="relative top-32 !-mt-32 mb-28 pt-4 ltr:ml-4 ltr:pl-6 rtl:mr-4 rtl:pr-6 md:pt-7 md:ltr:pl-14 md:rtl:pr-14 lg:top-40 lg:pt-0 2xl:top-32">
            <div className="bg-yellow-orange absolute top-10 h-5 w-5 rounded-full ltr:-left-7 rtl:-right-7 md:h-7 md:w-7 md:ltr:-left-8 md:rtl:-right-8"></div>
            <time className="m-0 text-2xl font-semibold md:text-4xl lg:text-6xl ">
              2022
            </time>
            <h4 className="pt-4 text-lg font-normal md:text-2xl lg:text-3xl">
              <span className="font-sen">
                <span className="font-bold">
                  <FormattedMessage id="page.company.name.nejoum" />
                </span>
                <FormattedMessage id="page.company.name.aljazeera" />
              </span>
              <FormattedMessage id="page.story.Story-2022" />
            </h4>
          </li>
        </ol>
      </div>
    </div>

    <p className="text-dark-blue mt-12 mb-24 px-4 text-center text-xl ltr:italic md:text-2xl lg:text-3xl">
      <FormattedMessage id="page.story.end" />
    </p>
  </Layout>
);

export default Story;
