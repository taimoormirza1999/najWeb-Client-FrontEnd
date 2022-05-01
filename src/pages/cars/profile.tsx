import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutHome';

const CarProfile = () => {
  return (
    <Layout meta={<Meta title="Car Profile" description="Car Profile" />}>
      <div className="container mx-auto">
        <Breadcrumbs
          breadcrumbs={[
            { name: 'Cars Showroom', href: '#' },
            { name: 'Car Profile', href: '/cars/profile' },
          ]}
        />
      </div>

      <div className="container mx-auto">
        <p className="py-3">
          <i className="material-icons text-yellow-orange align-middle text-5xl">
            &#xe66b;
          </i>
          <span className="text-dark-blue ml-4 align-middle text-5xl font-bold">
            Car Profile
          </span>
        </p>

        <div className="my-8 flex gap-12">
          <div className="flex basis-1/2 flex-col gap-4">
            <img
              src="/assets/images/car-profile-1.jpg"
              alt="Car profile"
              className="basis-2/3 object-cover"
            />
            <div className="flex basis-1/3 justify-between">
              <img
                src="/assets/images/car-profile-1.jpg"
                alt="Car profile"
                className="h-[150px]"
              />
              <img
                src="/assets/images/car-profile-2.jpg"
                alt="Car profile"
                className="h-[150px]"
              />
              <img
                src="/assets/images/car-profile-3.jpg"
                alt="Car profile"
                className="h-[150px]"
              />
              <img
                src="/assets/images/car-profile-1.jpg"
                alt="Car profile"
                className="h-[150px]"
              />
            </div>
          </div>
          <div className="basis-1/2">
            <div className="text-dark-blue mb-4 bg-white px-12 py-2 shadow-md">
              <h3 className="py-2 text-3xl font-bold">Nissan Altima</h3>
              <p className="text-2xl font-semibold">2022</p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange mr-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">
                  VIN
                </h3>
              </div>
              <p className="text-azure-blue pl-10 text-2xl font-semibold">
                5NPE34AF8HH540668
              </p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange mr-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">
                  Lot No
                </h3>
              </div>
              <p className="text-azure-blue pl-10 text-2xl font-semibold">
                31369772
              </p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange mr-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">
                  Status
                </h3>
              </div>
              <p className="text-azure-blue pl-10 text-2xl font-semibold">
                On the Way
              </p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange mr-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">
                  Description
                </h3>
              </div>
              <p className="text-azure-blue pl-10 text-2xl font-semibold">
                Clean Title
              </p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange mr-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">
                  Price
                </h3>
              </div>
              <p className="pl-10 text-2xl font-bold text-green-600">
                AED 120K
              </p>
            </div>
          </div>
        </div>

        <div className="my-16 text-center">
          <Link href="" passHref>
            <a
              href="#"
              className="bg-outer-space mx-auto my-5 block max-w-max rounded-md py-3 px-8 text-2xl text-white hover:border-0 hover:bg-gray-700"
            >
              Text Us on WhatsApp to get your best deal
            </a>
          </Link>

          <Link href="" passHref>
            <a
              href="#"
              className="mx-auto my-5 block max-w-max rounded-md bg-[#59CE72] py-3 px-4 text-2xl text-white hover:border-0 hover:bg-green-600"
            >
              Text Nejoum
            </a>
          </Link>
        </div>

        <div className="border-outer-space text-outer-space mt-4 rounded-lg border py-2 px-4">
          <h4 className="text-3xl">Company Notes</h4>
          <hr className="border-outer-space my-4" />
          <p className="text-2xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      <div className="p-[50px]"></div>
    </Layout>
  );
};

export default CarProfile;
