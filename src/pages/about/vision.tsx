import Breadcrumbs from '@/components/breadcrumbs';
import { Meta } from '@/layout/Meta';
import { useRouter } from 'next/router';
import { Layout } from '@/templates/layoutHome';
import { FormattedMessage } from 'react-intl';

const Vision = () => {
  const { locale } = useRouter();
  return (
    <Layout
      meta={<Meta title="Vision & Mission" description="Vision & Mission" />}
    >
      <Breadcrumbs
        breadcrumbs={[
          { name: <FormattedMessage id="general.about" />, href: '#' },
          {
            name: <FormattedMessage id="general.vision" />,
            href: '/about/vision',
          },
        ]}
      />

      <div className="container mx-auto">
        <div className="text-dark-blue py-10 text-center">
          <h3 className="text-6xl font-semibold ">
            <FormattedMessage id="general.vision" />
          </h3>
          {locale !== 'ar' && (
            <p className="py-4 text-3xl">
              Since day one, our dedication at{' '}
              <span className="font-sen">
                <span className="font-bold">
                  <FormattedMessage id="page.company.name.nejoum" />
                </span>
                <FormattedMessage id="page.company.name.aljazeera" />
              </span>
              is towards becoming the top choice for those willing to ship cars
              from all auctions in America to the world.
            </p>
          )}
          {locale === 'ar' && (
            <p className="py-4 text-3xl">
              أن نصبح الخيار الأول لشحن السيارات من جميع المزادات في أمريكا إلى
              العالم.
            </p>
          )}
        </div>

        <div className="text-dark-blue py-10 text-center">
          <h3 className="text-6xl font-semibold ">
            <FormattedMessage id="general.mission" />
          </h3>
          <p className="py-4 text-3xl">
          <FormattedMessage id="general.mission.desc" />
          </p>
        </div>

        <div className="text-dark-blue py-10 text-center">
          <h3 className="text-6xl font-semibold ">Our Values</h3>
          <p className="py-4 text-3xl">
            Our values are derived from the passion of providing you the best
            car logistics service
          </p>

          <div className="flex">
            <div className="basis-1/6"></div>
            <ul className="our-values text-left text-3xl leading-[5.5rem] list-disc">
              <li className="leading-[3rem] ml-[38px]">
                Speed: Providing our services at he highest possible pace.
              </li>
              <li className="leading-[3rem] ml-[38px]">
                Price: Offering most competitive prices in vehicle and logistics
                market.
              </li>
              <li className="leading-[3rem] ml-[38px]">
                Excellence: Providing excellent and professional services
                minding every minor detail
              </li>
            </ul>
          </div>
        </div>

        <p className="text-dark-blue py-12 text-center text-2xl ltr:italic">
          We look forward giving you the best logistics’ service experience
        </p>
      </div>
    </Layout>
  );
};

export default Vision;
