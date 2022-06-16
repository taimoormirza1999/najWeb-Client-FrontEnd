import { FormattedMessage } from 'react-intl';

import Breadcrumbs from '@/components/breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';

const Branches = () => (
  <Layout meta={<Meta title="Nejoum Branches" description="Nejoum Branches" />}>
    <div className="container mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          {
            name: <FormattedMessage id="nejoum.branches" />,
            href: '/branches',
          },
        ]}
      />
    </div>

    <div className="container mx-auto">
      <div className="text-dark-blue py-10 text-center">
        <h3 className="text-5xl font-semibold ">
          <FormattedMessage id="page.branches.title" />
        </h3>
        <p className="py-4 text-2xl">
          <span className="font-sen">
            <span className="font-bold">
              <FormattedMessage id="page.company.name.nejoum" />
            </span>
            <FormattedMessage id="page.company.name.aljazeera" />
          </span>
          <FormattedMessage id="page.branches.title_2" />
        </p>
        <p className="py-8 text-2xl">
          <FormattedMessage id="branches.desc" />
        </p>
      </div>

      <div className="mb-20 flex gap-1 ">
        <div className="basis-1/2">
          <img
            src="/assets/images/branch-image-1.jpg"
            alt="Our Branches"
            className="mb-1 h-[300px] w-full object-cover"
          />
          <div className="flex gap-1">
            <img
              src="/assets/images/branch-image-2.jpg"
              alt="Our Branches"
              className="h-[300px] w-full basis-1/2 object-cover"
            />
            <img
              src="/assets/images/branch-image-3.jpg"
              alt="Our Branches"
              className="h-[300px] w-full basis-1/2 overflow-hidden object-cover"
            />
          </div>
        </div>
        <div className="basis-1/2">
          <img
            src="/assets/images/branch-image-4.jpg"
            alt="Our Branches"
            className="h-[604px] w-full object-cover"
          />
        </div>
      </div>

      <div className="text-dark-blue">
        <div className="mx-auto w-full justify-between gap-6 sm:flex">
          <div className="basis-1/4">
            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              UAE Offices
              <div className="border-yellow-orange w-10 border"></div>
            </h4>

            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Dubai</h4>
              <p className="text-outer-space w-full text-2xl">
                Nejoum Aljazeera Group <br />
                Sharjah, Industrial Area 4
              </p>
              <a
                href="tel:+971 4 354 2421"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 4 354 2421
              </a>
              <a
                href="mailto:clearance@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                clearance@naj.ae
              </a>
            </div>
            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Sharjah</h4>
              <p className="text-outer-space w-full text-2xl">
                Nejoum Aljazeera Group <br />
                Sharjah, Industrial Area 4
              </p>
              <a
                href="tel:+971 6 544 0202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 6 544 0202
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                cservice@naj.ae
              </a>
            </div>
            <div className="mb-10">
              <p className="text-outer-space w-full text-2xl">
                Nejoum Aljazeera Group <br />
                Sharjah, Sajaa
              </p>
              <a
                href="tel:+971 58 931 1463"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 58 931 1463
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                sajaa@naj.ae
              </a>
            </div>
          </div>
          <div className="basis-1/4">
            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              USA Offices
              <div className="border-yellow-orange w-10 border"></div>
            </h4>

            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Texas</h4>
              <p className="text-outer-space w-full text-2xl">
                Nejoum Express <br />
                6012 Murphy ST. Houston, <br />
                TX 77033-1008
              </p>
              {/* <a
                href="tel:+971 65 440 202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 65 440 202
              </a> */}
              <a
                href="mailto:management@nejoumexpress.com"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                management@nejoumexpress.com
              </a>
            </div>
            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">New Jersey</h4>
              <p className="text-outer-space w-full text-2xl">
                Nejoum Express <br />
                1 Linden Avenue E, Jersey City , <br />
                NJ 07305
              </p>
              <a
                href="tel:+201-724-0386"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +201-724-0386
              </a>
              <a
                href="mailto:nj@nejoumexpress.com"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                nj@nejoumexpress.com
              </a>
            </div>

            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Georgia</h4>
              <p className="text-outer-space w-full text-2xl">
                46 ARTLY ROAD, <br />
                Savannah, GA 31408
              </p>
              <a
                href="tel:+248-495-8526"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +248-495-8526
              </a>
              <a
                href="mailto:ga@nejoumexpress.com"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                ga@nejoumexpress.com
              </a>
            </div>
          </div>
          <div className="basis-1/4">
            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              Iraq Office
              <div className="border-yellow-orange w-10 border"></div>
            </h4>

            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Basra</h4>
              <p className="text-outer-space w-full text-2xl">
                Nejoum Aljazeera Group <br />
                Basra Bridge, Basra
              </p>
              <a
                href="tel:+964 7 7171 8897 7"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +964 7 7171 8897 7
              </a>
              <a
                href="mailto:basra@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                basra@naj.ae
              </a>
            </div>

            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              Oman Office
              <div className="border-yellow-orange w-10 border"></div>
            </h4>
            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Muscat</h4>
              <p className="text-outer-space w-full text-2xl">
                Amabilah Al Sanaya Road <br />
                No.10 , C.R.NO: 1339785
              </p>
              <a
                href="tel:+968-94744020"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +968-94744020
              </a>
              <a
                href="mailto:oman@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                oman@naj.ae
              </a>
            </div>
          </div>
          <div className="basis-1/4">
            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              Cambodia Office
              <div className="border-yellow-orange w-10 border"></div>
            </h4>

            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Coming soon</h4>
              <p className="text-outer-space w-full text-2xl">
                528 ST 1019, Sangkat, <br />
                Phnom Penh tmey, <br />
                Khan Sen Sok
              </p>
              <a
                href="tel:+855-15969538"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +855-15969538
              </a>
              <a
                href="mailto:alsadi@najshipping.com"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                alsadi@najshipping.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <img
        src="/assets/images/branches.jpg"
        alt="Nejoum Branches"
        className="w-full"
      />

      <p className="text-dark-blue pb-12 text-center text-2xl ltr:italic">
        You’re always welcome to pay a visit!
      </p>
    </div>
  </Layout>
);

export default Branches;
