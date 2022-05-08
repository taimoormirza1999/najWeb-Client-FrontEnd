import axios from 'axios';
import { getSession } from 'next-auth/react';

// export async function getServerSideProps(context) {
//   const car_id = context.query.car_id ? context.query.car_id : '';
//   let type = context.query.type ? context.query.type : 'warehouse';
//   const session = await getSession(context);

//   let carsData = {};
//   if (session && session.token && session.token.access_token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
//     const res = await axios.get(
//       `${process.env.API_URL}getImages?type=${type}&car_id=${car_id}`
//     );
//     if (res.data.images) {
//       carsData = res.data.images;
//     }
//   }
//   return {
//     props: { carsData },
//   };
// }
export default async function handler(req, res) {
  const session = await getSession({ req });
  const carId = req.query.car_id ? req.query.car_id : '';
  const type = req.query.type ? req.query.type : 'warehouse';
  let data = [];
  console.log(session.token.access_token);
  axios.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
  await axios
    .get(`${process.env.API_URL}getImages?type=${type}&car_id=${carId}`)
    .then(function (response) {
      // handle success
      data = response.data.images;
    })
    .catch(function (error) {
      console.log(error);
    });
  // console.log(data);
  res.status(200).json({ data });
}
// const Images = ({ carsData }) => {
//   return (
//     <SRLWrapper>
//       <div className="flex basis-1/2 flex-col gap-4">
//         <img
//           src="/assets/images/car-profile-1.jpg"
//           alt="Car profile"
//           className="basis-2/3 cursor-pointer object-cover"
//         />
//         <div className="flex basis-1/3 justify-between">
//           <img
//             src="/assets/images/car-profile-1.jpg"
//             alt="Car profile"
//             className="h-[150px] cursor-pointer"
//           />
//           <img
//             src="/assets/images/car-profile-2.jpg"
//             alt="Car profile"
//             className="h-[150px] cursor-pointer"
//           />
//           <img
//             src="/assets/images/car-profile-3.jpg"
//             alt="Car profile"
//             className="h-[150px] cursor-pointer"
//           />
//           <img
//             src="/assets/images/car-profile-1.jpg"
//             alt="Car profile"
//             className="h-[150px] cursor-pointer"
//           />
//         </div>
//       </div>
//     </SRLWrapper>
//   );
// };

// export default Images;
