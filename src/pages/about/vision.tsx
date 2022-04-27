import Breadcrumbs from '@components/Breadcrumbs';

import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

const Vision = () => (
  <Layout
    meta={<Meta title="Vision & Mission" description="Vision & Mission" />}
  >
    <div className="container mx-auto">
      <Breadcrumbs />
    </div>

    <div className="container mx-auto">
      <div className="text-dark-blue py-10 text-center">
        <h3 className="text-6xl font-semibold ">Vision</h3>
        <p className="py-4 text-3xl">
          To become the first and most successful company worldwide that
          provides to the customers outstanding services in offering full
          logistic and trading vehicles.
        </p>
      </div>

      <div className="text-dark-blue py-10 text-center">
        <h3 className="text-6xl font-semibold ">Mission</h3>
        <p className="py-4 text-3xl">
          Upgrading the trading field of exported used cars through keeping up
          with the newest technology and applying it on all of our services. In
          addition, the expansion to other countries through initiating other
          branches and enhancing our level of service while still achieving
          competitiveness and gratifying our customers.
        </p>
      </div>

      <div className="text-dark-blue py-10 text-center">
        <h3 className="text-6xl font-semibold ">Our Values</h3>
        <p className="py-4 text-4xl">
          Our values are derived from the passion of providing you the best
          possible service
        </p>

        <div className="flex">
          <div className="basis-1/6"></div>
          <ul className="our-values text-left text-4xl leading-[5.5rem]">
            <li>Integrity and Transparency</li>
            <li>Openness</li>
            <li>Excellence in performance and customer service</li>
            <li>Entrepreneurship and Innovation</li>
          </ul>
        </div>
      </div>

      <p className="text-dark-blue py-12 text-center text-4xl italic">
        We look forward giving you the best logistics’ service experience
      </p>
    </div>
  </Layout>
);

export default Vision;
