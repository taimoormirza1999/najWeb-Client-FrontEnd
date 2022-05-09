import {
  AddRoadIcon,
  BoatIcon,
  CheckCircleIcon,
  LocalShippingIcon,
  MonetizationIcon,
  MovingCarIcon,
  NewCarIcon,
  PaymentIcon,
  PortIcon,
  WarehouseIcon,
} from '@/components/dashboard/trackingIcons';
import { Layout } from '@/templates/LayoutDashboard';
import { classNames } from '@/utils/Functions';

export async function getServerSideProps(context) {
  return {
    props: { apiUrl: process.env.API_URL },
  };
}
const Tracking = ({ apiUrl }) => {
  return (
    <Layout meta="">
      <div className="m-4">
        <div>
          <h3 className="text-dark-blue pb-8 text-4xl font-bold sm:text-2xl">
            <i
              className={classNames(
                'material-icons  text-yellow-orange align-middle'
              )}
            >
              &#xe55e;
            </i>
            Tracking
          </h3>
          <p className="text-dark-blue pb-8 text-4xl sm:text-2xl">
            Track your car
          </p>
          <div className="m-auto w-[60%]  text-center">
            <img
              className="m-auto w-auto max-w-[250px]"
              src="/assets/images/logo-en.png"
              alt="Nejoum Al Jazeera"
            />
            <div className="relative m-auto">
              <input
                type="text"
                className="
                      m-auto
                      mt-4
                      block
                      w-full
                      rounded
                      border
                      border-solid
                      border-[#8F9294]
                      bg-white
                      bg-clip-padding px-3
                      py-1.5 text-center text-base
                      font-normal
                      italic
                      text-[#818181]
                      transition
                      ease-in-out
                      focus:text-gray-700 focus:outline-none
                    "
                name="lotSearch"
                id="lotSearch"
                placeholder="Track Car by Vin Number"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[8px] right-[8px] h-5 w-5 text-[#818181]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {' '}
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />{' '}
              </svg>
              <p className="mt-3 flex rounded-md bg-[#045FB7] py-2 text-white">
                <span className="mr-3 flex-1 text-right">Vin:xxxxxxxxxx</span>
                <span className="ml-3 flex-1 text-left">
                  Lot:xxxxxxxxxxxxxxx
                </span>
              </p>
            </div>
            <div className="mt-4 flex overflow-x-scroll xl:overflow-x-visible">
              <div className="flex-1">
                <NewCarIcon></NewCarIcon>
                <div className="border-dark-blue relative mt-5 ml-3 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-0 rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <PaymentIcon></PaymentIcon>
                <div className="border-dark-blue relative my-5 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-[3px] rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <MonetizationIcon></MonetizationIcon>
                <div className="border-dark-blue relative mt-5 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-[6px] rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <AddRoadIcon></AddRoadIcon>
                <div className="border-dark-blue relative mt-5 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-[9px] rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <LocalShippingIcon></LocalShippingIcon>
                <div className="border-dark-blue relative mt-5 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-[12px] rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <WarehouseIcon></WarehouseIcon>
                <div className="border-dark-blue relative mt-5 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-[15px] rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <LocalShippingIcon></LocalShippingIcon>
                <div className="border-dark-blue relative mt-5 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-[18px] rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <BoatIcon></BoatIcon>
                <div className="border-dark-blue relative mt-5 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-[18px] rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <PortIcon></PortIcon>
                <div className="border-dark-blue relative mt-5 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-5 rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <MovingCarIcon></MovingCarIcon>
                <div className="border-dark-blue relative mt-5 border-t-2">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-5 rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1">
                <MonetizationIcon></MonetizationIcon>
                <div className="border-dark-blue relative mt-5 border-t-2 -mr-6">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-6 rounded-full p-1"></div>
                </div>
              </div>
              <div className="flex-1 text-right">
                <CheckCircleIcon></CheckCircleIcon>
                <div className="relative mt-5">
                  <div className="bg-dark-blue absolute bottom-[-3px] left-6 rounded-full p-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tracking;
