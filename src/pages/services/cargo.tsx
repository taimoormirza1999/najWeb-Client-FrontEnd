import ApplyForAccount from '@/components/ApplyForAccount';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactDetails from '@/components/ContactDetails';
import DownloadApps from '@/components/DownloadApps';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';
import { FormattedMessage } from 'react-intl';

const Shipping = () => (
  <Layout
    meta={<Meta title="Shipping Services" description="Shipping Services" />}
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

    <h3 className="text-dark-blue text-center text-6xl font-semibold">
      Cargo Tracking
    </h3>

    <div className="bg-teal-blue my-8 mt-[10rem] p-8">
      <div className="container mx-auto">
        <div className="relative flex gap-16">
          <div className="basis-4/6 pr-20 leading-[3.5em] tracking-wider">
            <p className="py-6 text-3xl text-white">
              If you are contracted us, you can use{' '}
              <span className="font-sen font-bold">NEJOUM</span> ALJAZEERA
              Online System to track your vehicle wherever it is around the
              world. Once you purchased your car.
            </p>
            <p className="py-6 text-3xl text-white">
              You can use our system from your mobile devices and PC. Get
              notified when a pickup is scheduled, the delivery date and
              receives an update about the status at any time.
            </p>
          </div>
          <div className="absolute top-[-240px] basis-2/6 ltr:right-[-175px] rtl:left-[-175px]">
            <img
              src="/assets/images/cargo-tracking.png"
              alt="Cargo Tracking"
              className=""
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
      <h2 className="text-center text-5xl font-semibold">
        <FormattedMessage id="general.contact" />
      </h2>
      <p className="py-4 text-center text-3xl">
      <FormattedMessage id="Contact.Us.Desc" />
      </p>
      <ContactDetails />
    </div>
  </Layout>
);

export default Shipping;
