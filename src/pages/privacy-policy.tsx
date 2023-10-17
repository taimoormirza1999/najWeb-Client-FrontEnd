import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';

import Breadcrumbs from '@/components/breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';

const PrivacyPolicy = () => {
  const { locale } = useRouter();
  const intl = useIntl();

  return (
    <Layout
      meta={
        <Meta
          title={intl.formatMessage({ id: 'privacy_policy.title' })}
          description={intl.formatMessage({ id: 'privacy_policy.title' })}
        />
      }
    >
      <Breadcrumbs
        breadcrumbs={[
          {
            name: <FormattedMessage id="privacy_policy.title" />,
            href: '/privacy-policy',
          },
        ]}
      />

      <div className="container mx-auto">
        <div className="text-dark-blue py-10 text-center">
          <h3 className="text-6xl font-semibold ">
            <FormattedMessage id="privacy_policy.title" />
          </h3>
          <p className="py-4 text-3xl">
            <FormattedMessage id="privacy_policy.desc_1" />
          </p>
        </div>

        <div className="text-dark-blue py-10 text-center">
          <h3 className="text-6xl font-semibold ">
            <FormattedMessage id="cookies.title" />
          </h3>
          <p className="py-4 text-3xl">
            <FormattedMessage id="cookies.desc_1" />
          </p>
          <p className="py-4 text-3xl">
            <FormattedMessage id="cookies.desc_2" />
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
