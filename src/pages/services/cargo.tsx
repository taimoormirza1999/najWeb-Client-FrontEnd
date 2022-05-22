import { FormattedMessage } from 'react-intl';

import ApplyForAccount from '@/components/ApplyForAccount';
import Breadcrumbs from '@/components/breadcrumbs';
import ContactDetails from '@/components/contactDetails';
import DownloadApps from '@/components/lownloadApps';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';

const Shipping = () => (
  <Layout
    meta={<Meta title="Cargo Tracking" description="Cargo Tracking Services" />}
  >
    <div className="container mx-auto">
      <Breadcrumbs
        breadcrumbs={[
          { name: <FormattedMessage id="general.services" />, href: '#' },
          {
            name: <FormattedMessage id="Cargo_Tracking" />,
            href: '/services/cargo',
          },
        ]}
      />
    </div>

    <h3 className="text-dark-blue text-center text-3xl font-semibold lg:text-5xl">
      Cargo Tracking
    </h3>

    <div className="bg-teal-blue my-8 md:mt-[10rem]">
      <div className="container mx-auto">
        <div className="relative flex flex-col gap-4 lg:gap-16 xl:flex-row">
          <div className="basis-3/5 xl:pr-20 xl:leading-[3.5em] xl:tracking-wider 2xl:py-[35px]">
            <p className="py-6 text-xl text-white lg:text-3xl">
              If you are contracted with us, you can use{' '}
              <span className="font-sen font-bold">NEJOUM</span> ALJAZEERA
              Online System to track your vehicle wherever it is around the
              world. Once you purchased your car.
            </p>
            <p className="py-6 text-xl text-white lg:text-3xl">
              You can use our system from your mobile devices and PC. Get
              notified when a pickup is scheduled, the delivery date and
              receives an update about the status at any time.
            </p>
          </div>
          <div className="relative right-0 basis-2/5 rtl:left-[-175px] xl:absolute xl:top-[-158px] xl:ltr:right-[-120px] 2xl:top-[-200px] 2xl:ltr:right-[-175px]">
            <img
              src="/assets/images/cargo-tracking.png"
              alt="Cargo Tracking"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="py-8">
      <DownloadApps />
    </div>

    <ApplyForAccount />

    <div className="text-dark-blue container mx-auto py-16">
      <h2 className="text-center text-3xl font-semibold lg:text-5xl">
        <FormattedMessage id="general.contact" />
      </h2>
      <p className="py-4 text-center text-xl lg:text-3xl">
        <FormattedMessage id="Contact.Us.Desc" />
      </p>
      <ContactDetails />
    </div>
  </Layout>
);

export default Shipping;
