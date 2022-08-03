import { FormattedMessage } from 'react-intl';

import ApplyForAccount from '@/components/ApplyForAccount';
import Breadcrumbs from '@/components/breadcrumbs';
import ContactDetails from '@/components/contactDetails';
import DownloadApps from '@/components/lownloadApps';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';

const Shipping = ({ locale }) => (
  <Layout
    meta={<Meta title="Cargo Tracking" description="Cargo Tracking Services" />}
  >
    <Breadcrumbs
      breadcrumbs={[
        { name: <FormattedMessage id="general.services" />, href: '#' },
        {
          name: <FormattedMessage id="Cargo_Tracking" />,
          href: '/services/cargo',
        },
      ]}
    />

    <h3 className="text-dark-blue text-center text-3xl font-semibold lg:text-5xl">
      <FormattedMessage id="Cargo_Tracking" />
    </h3>

    <div className="bg-teal-blue my-8 md:mt-[10rem]">
      <div className="container mx-auto">
        <div className="relative flex flex-col gap-4 lg:gap-16 xl:flex-row">
          <div className="basis-3/5 xl:pr-20 xl:leading-[3.5em] xl:tracking-wider 2xl:py-[35px]">
            <p className="py-6 text-xl text-white lg:text-3xl">
              <FormattedMessage id="cargo.tracking3" />
              {locale === 'en' ? (
                <>
                  <span className="font-sen font-bold"> NEJOUM</span> ALJAZEERA{' '}
                </>
              ) : (
                <>
                  <br />
                  <br />
                </>
              )}
              <FormattedMessage id="cargo.tracking1" />
            </p>
            <p className="py-6 text-xl text-white lg:text-3xl">
              <FormattedMessage id="cargo.tracking2" />
            </p>
          </div>
          <div className="relative basis-2/5 ltr:right-0 rtl:left-[-175px] xl:absolute xl:top-[-88px] xl:ltr:right-[-120px] 2xl:ltr:right-[-175px]">
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
