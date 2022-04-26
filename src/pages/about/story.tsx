import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

import Breadcrumbs from '../components/Breadcrumbs';

const Story = () => (
  <Layout meta={<Meta title="Our Story" description="Our Story" />}>
    <div className="container mx-auto">
      <Breadcrumbs />
    </div>

    <div className="relative">
      <img src="/assets/images/story-cover.jpg" alt="Nejoum Aljazeera" />
      <h1 className="max-[50%] story-cover-text-shadow absolute top-1/2 left-1/2 -translate-x-[80%] -translate-y-1/2 text-[200px] font-extrabold uppercase leading-none tracking-wide text-white">
        We ease heavy duty
      </h1>
    </div>

    <div className="container mx-auto">
      <div className="text-dark-blue py-10">
        <h3 className="text-center text-[100px] font-semibold">The Story</h3>
        <p className="py-4 text-3xl">
          <span className="font-bold">NEJOUM</span> ALJAZEERA initiated its
          movement during the late last century, where its activities revolved
          around trading in and trading out vehicles, as well as logistics and
          meet the expectations of all customers present locally and in the gulf
          region, synchronizing along with the economic prosperity witnessed by
          United Arab Emirates which greets diverse nationalities that provides
          work, residency, and investments. One of our first branches was opened
          in Sharjah in the year of 2002 to officially start our journey in
          servicing -American exported- used cars.
        </p>
      </div>
    </div>

    <p className="text-dark-blue py-12 text-center text-3xl italic">
      All just the beginning, the story is to carry on with you!
    </p>
  </Layout>
);

export default Story;
