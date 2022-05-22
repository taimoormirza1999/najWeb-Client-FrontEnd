import Breadcrumbs from '@/components/breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';
import { FormattedMessage } from 'react-intl';

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
        <h3 className="text-5xl font-semibold ">Our Branches</h3>
        <p className="py-4 text-2xl">
          <b>NEJOUM</b> ALJAZEERA is all around you!
        </p>
        <p className="py-8 text-left text-2xl">
          You may reach to us on the following areas. Content required Content
          required Content required Content requiredContent requiredContent
          requiredContent requiredContent requiredContent required Content
          required Content requiredContent required Content required Content
          required Content required Content required
        </p>
      </div>

      <div className="my-20 flex gap-2 ">
        <div className="basis-1/2">
          <img
            src="/assets/images/branch-image-1.jpg"
            alt="Our Branches"
            className="mb-2 h-[400px] w-full border border-black object-cover"
          />
          <div className="flex gap-2">
            <img
              src="/assets/images/branch-image-2.jpg"
              alt="Our Branches"
              className="h-[200px] w-full basis-1/2 border border-black object-cover"
            />
            <img
              src="/assets/images/branch-image-3.jpg"
              alt="Our Branches"
              className="h-[200px] w-full basis-1/2 border border-black object-cover"
            />
          </div>
        </div>
        <div className="basis-1/2">
          <img
            src="/assets/images/branch-image-4.jpg"
            alt="Our Branches"
            className="h-[608px] w-full border border-black object-cover"
          />
        </div>
      </div>

      <div className="text-dark-blue mb-[10rem]">
        <div className="mx-auto w-full justify-between gap-6 sm:flex">
          <div className="basis-1/4">
            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              UAE Offices
              <div className="border-yellow-orange w-10 border"></div>
            </h4>

            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Dubai</h4>
              <p className="text-outer-space w-full text-2xl">
                Nejoum Aljazeera Group Sharjah, Industrial Area 4
              </p>
              <a
                href="tel:+971 65 440 202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 65 440 202
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                info@naj.ae
              </a>
            </div>
            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Sharjah</h4>
              <p className="text-outer-space w-full text-2xl">
                Nejoum Aljazeera Group Sharjah, Industrial Area 4
              </p>
              <a
                href="tel:+971 65 440 202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 65 440 202
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                info@naj.ae
              </a>
            </div>
            <div className="mb-10">
              <p className="text-outer-space w-full text-2xl">
                Nejoum Aljazeera Group Sharjah, Muweilah
              </p>
              <a
                href="tel:+971 65 440 202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 65 440 202
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                info@naj.ae
              </a>
            </div>
            <div className="mb-10">
              <p className="text-outer-space w-full text-2xl">
                Nejoum Aljazeera Group Sharjah, Sajaa
              </p>
              <a
                href="tel:+971 65 440 202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 65 440 202
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                info@naj.ae
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
                Nejoum Express 6012 Murphy ST. Houston, TX 77033-1008
              </p>
              <a
                href="tel:+971 65 440 202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 65 440 202
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                info@naj.ae
              </a>
            </div>
            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">New Jersey</h4>
              <p className="text-outer-space w-full text-2xl">
                Nejoum Express 1 Linden Avenue E, Jersey City , NJ 07305
              </p>
              <a
                href="tel:+971 65 440 202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: +971 65 440 202
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                info@naj.ae
              </a>
            </div>

            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              Cambodia Office
              <div className="border-yellow-orange w-10 border"></div>
            </h4>
            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Coming soon</h4>
              <p className="text-outer-space w-full text-2xl">Coming soon</p>
              <a className="text-azure-blue my-2 block text-2xl hover:border-0">
                Tel: Coming soon
              </a>
              <a className="text-azure-blue block text-2xl hover:border-0">
                Coming soon
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
                Nejoum Aljazeera Group Basra Bridge, Basra
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
              <h4 className="mb-4 text-3xl text-gray-900">Coming soon</h4>
              <p className="text-outer-space w-full text-2xl">Coming soon</p>
              <a className="text-azure-blue my-2 block text-2xl hover:border-0">
                Tel: Coming soon
              </a>
              <a className="text-azure-blue block text-2xl hover:border-0">
                Coming soon
              </a>
            </div>

            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              Jordan Office
              <div className="border-yellow-orange w-10 border"></div>
            </h4>
            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Coming soon</h4>
              <p className="text-outer-space w-full text-2xl">Coming soon</p>
              <a className="text-azure-blue my-2 block text-2xl hover:border-0">
                Tel: Coming soon
              </a>
              <a className="text-azure-blue block text-2xl hover:border-0">
                Coming soon
              </a>
            </div>
          </div>
          <div className="basis-1/4">
            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              Canada Office
              <div className="border-yellow-orange w-10 border"></div>
            </h4>

            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Coming soon</h4>
              <p className="text-outer-space w-full text-2xl">
                Coming soon <br />
                <br />
              </p>
              <a
                href="tel:+971 65 440 202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: Coming soon
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                Coming soon
              </a>
            </div>

            <h4 className="text-dark-blue mb-4 text-3xl font-semibold">
              Yemen Office
              <div className="border-yellow-orange w-10 border"></div>
            </h4>
            <div className="mb-10">
              <h4 className="mb-4 text-3xl text-gray-900">Coming soon</h4>
              <p className="text-outer-space w-full text-2xl">
                Coming soon <br />
              </p>
              <a
                href="tel:+971 65 440 202"
                className="text-azure-blue my-2 block text-2xl hover:border-0"
              >
                Tel: Coming soon
              </a>
              <a
                href="mailto:info@naj.ae"
                className="text-azure-blue block text-2xl hover:border-0"
              >
                Coming soon
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

      <p className="text-dark-blue py-12 text-center text-2xl italic">
        You’re always welcome to pay a visit!
      </p>
    </div>
  </Layout>
);

export default Branches;
