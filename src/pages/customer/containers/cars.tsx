import axios from 'axios';
import { getSession } from 'next-auth/react';

import { classNames } from '@/utils/Functions';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

const ContainerCars = ({ cars }) => {
  return cars.map((car, index) => (
    <tr
      key={index}
      className={classNames(
        index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
        'text-sm'
      )}
    >
      <td
        scope="col"
        className="w-[2px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {index + 1}
      </td>
      <td
        scope="col"
        className="min-w-[56px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        <img className="max-h-[50px]" src={car.image} alt="" />
      </td>
      <td
        scope="col"
        className="min-w-[180px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.carMakerName} {car.carModelName} {car.year}
      </td>
      <td
        scope="col"
        className="min-w-[130px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        Lot: {car.lotnumber} <br /> Vin: {car.vin}
      </td>
      <td
        scope="col"
        className="min-w-[160px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.auctionLocationName} <br /> {car.auctionTitle}
      </td>
      <td
        scope="col"
        className="min-w-[64px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.destination}
      </td>
      <td
        scope="col"
        className="min-w-[55px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.purchasedDate}
      </td>
      <td
        scope="col"
        className="min-w-[50px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
      >
        {car.carCostAED}
      </td>
    </tr>
  ));
};

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;

  const session: any = await getSession(context);
  let networkError = false;
  let cars = {};
  const apiUrl = process.env.API_URL;
  const apiTabUrl = `${apiUrl}customer/container/cars?container_id=${context.query.id}`;

  if (session && session.token && session.token.access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
    await axios
      .get(`${apiTabUrl}`)
      .then((response) => {
        cars = response.data;
      })
      .catch(() => {
        networkError = true;
      });
  }
  if (networkError) {
    return NetworkStatus.LOGIN_PAGE;
  }
  return {
    props: {
      cars,
    },
  };
}

export default ContainerCars;
