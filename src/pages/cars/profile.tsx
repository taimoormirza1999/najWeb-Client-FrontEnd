import axios from 'axios';
import Link from 'next/link';
import { SRLWrapper } from 'simple-react-lightbox';

import Breadcrumbs from '@/components/breadcrumbs';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutHome';
import { FormattedMessage } from 'react-intl';

export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.API_URL}CarsForSaleDetails`, {
    params: { car_id: context.query.id },
  });
  const carData = res.data ? res.data.data : {};
  return {
    props: { carProfileData: carData },
  };
}

const CarProfile = ({ carProfileData }) => {
  const [carData, photos] = carProfileData;
  return (
    <Layout meta={<Meta title="Car Profile" description="Car Profile" />}>
      <div className="container mx-auto">
        <Breadcrumbs
          breadcrumbs={[
            {
              name: <FormattedMessage id="page.cars.showroom.cars_showroom" />,
              href: '/cars/showroom',
            },
            { name: <FormattedMessage id="Car_Profile" />, href: '#' },
          ]}
        />
      </div>

      <div className="container mx-auto">
        <p className="py-3">
          <i className="material-icons text-yellow-orange align-middle text-5xl">
            &#xe66b;
          </i>
          <span className="text-dark-blue ltr:ml-4 rtl:mr-4 align-middle text-5xl font-bold">
            <FormattedMessage id="Car_Profile" />
          </span>
        </p>

        <div className="my-8 flex gap-12">
          <div className="basis-1/2">
            <SRLWrapper>
              <div className="flex basis-1/2 flex-col gap-4">
                <img
                  src={photos.length > 0 ? photos[0] : ''}
                  alt="Car profile"
                  className="h-[500px] w-full cursor-pointer object-cover"
                />
                <div className="flex basis-1/3 justify-between">
                  <div className="my-4 grid grid-cols-6 flex-wrap gap-4 gap-x-1 gap-y-4">
                    {photos.length > 0
                      ? photos.map((object, index) => {
                          return index > 5 ? (
                            <img
                              key={index}
                              src={object}
                              alt="Car profile"
                              className="hidden h-[150px] cursor-pointer"
                            />
                          ) : (
                            <img
                              key={index}
                              src={object}
                              alt="Car profile"
                              className="h-[150px] cursor-pointer object-cover"
                            />
                          );
                        })
                      : ''}
                  </div>
                </div>
              </div>
            </SRLWrapper>
          </div>

          <div className="basis-1/2">
            <div className="text-dark-blue mb-4 bg-white px-12 py-2 shadow-md">
              <h3 className="py-2 text-3xl font-bold">
                {carData.carMakerName} {carData.carModelName}
              </h3>
              <p className="text-2xl font-semibold">{carData.car_year}</p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange ltr:mr-2 rtl:ml-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">VIN</h3>
              </div>
              <p className="text-azure-blue pl-10 text-2xl font-semibold">
                {carData.vin}
              </p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange ltr:mr-2 rtl:ml-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">
                  <FormattedMessage id="statement.lot.no" />
                </h3>
              </div>
              <p className="text-azure-blue pl-10 text-2xl font-semibold">
                {carData.lotnumber}
              </p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange ltr:mr-2 rtl:ml-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">
                  <FormattedMessage id="color" />
                </h3>
              </div>
              <p className="text-azure-blue pl-10 text-2xl font-semibold">
                {carData.color_name}
              </p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange ltr:mr-2 rtl:ml-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">
                  <FormattedMessage id="statement.description" />
                </h3>
              </div>
              <p className="text-azure-blue pl-10 text-2xl font-semibold">
                {carData.notes}
              </p>
            </div>
            <div className="mb-4 bg-white px-12 py-2 shadow-md">
              <div className="flex">
                <i className="material-icons text-yellow-orange ltr:mr-2 rtl:ml-2 self-center text-3xl">
                  &#xe9ef;
                </i>
                <h3 className="text-dark-blue py-2 text-3xl font-bold">
                  <FormattedMessage id="page.customer.dashboard.table.price" />
                </h3>
              </div>
              <p className="pl-10 text-2xl font-bold text-green-600">
                AED {carData.price}
              </p>
            </div>
          </div>
        </div>

        <div className="my-16 text-center">
          <Link
            href="https://wa.me/971543662194?text=welcome to Nejoum aljazeera"
            passHref
          >
            <a
              href="#"
              className="bg-outer-space mx-auto my-5 block max-w-max rounded-md py-3 px-8 text-2xl text-white hover:border-0 hover:bg-gray-700"
            >
              <FormattedMessage id="whatsapp.deal" />
            </a>
          </Link>

          <Link href="" passHref>
            <a
              href="#"
              className="mx-auto my-5 hidden max-w-max rounded-md bg-[#59CE72] py-3 px-4 text-2xl text-white hover:border-0 hover:bg-green-600"
            >
              <FormattedMessage id="general.text_nejoum" />
            </a>
          </Link>
        </div>

        <div className="border-outer-space text-outer-space mt-4 hidden rounded-lg border py-2 px-4">
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
