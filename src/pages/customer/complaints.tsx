import axios from 'axios';
import { getSession } from 'next-auth/react';
import React from 'react';

import { Layout } from '@/templates/LayoutDashboard';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Complaints = ({ complaints }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      message: event.target.message.value,
    };

    console.log(formData);
  };

  console.log(complaints);

  return (
    <Layout meta="">
      <div className="mx-auto px-8">
        <h4 className="text-dark-blue mt-4 py-4 text-xl font-semibold sm:text-3xl">
          <i className="material-icons text-yellow-orange align-middle text-3xl">
            &#xe14f;
          </i>
          <span className="pl-1 align-middle">Complaints</span>
        </h4>
        <p className="text-dark-blue text-2xl">
          We’re dedicated to providing you the best service at all times. Please
          Please tell us about problem.
        </p>

        <form method="post" onSubmit={handleSubmit} className="mt-8 mb-4">
          <div className="relative mt-1 pl-6">
            <select
              name="arrived_status"
              className="placeholder::text-outer-space border-medium-grey text-outer-space block w-full appearance-none rounded border px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
              placeholder="Type of complaint"
            >
              <option value="" disabled>
                Type of complaint
              </option>
              <option value="3">A</option>
              <option value="1">B</option>
            </select>
            <span className="text-yellow-orange absolute top-0 left-0 text-xl font-bold">
              *
            </span>
          </div>
          <div className="mt-1 pl-6">
            <input
              id="vin"
              name="vin"
              type="text"
              required
              placeholder="Vin or Lot No"
              className="placeholder:text-outer-space border-medium-grey text-outer-space block w-full appearance-none rounded border px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
            />
          </div>
          <div className="relative mt-1 pl-6">
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="Subject"
              className="border-medium-grey text-outer-space block w-full appearance-none rounded border px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
            />
            <span className="text-yellow-orange absolute top-0 left-0 text-xl font-bold">
              *
            </span>
          </div>
          <div className="relative mt-1 pl-6">
            <textarea
              rows={6}
              className="text-outer-space border-medium-grey w-full resize-none rounded border text-lg placeholder:italic focus:border-blue-800 focus:ring-0"
              name="message"
              placeholder="Message"
            ></textarea>
            <span className="text-yellow-orange absolute top-0 left-0 text-xl font-bold">
              *
            </span>
          </div>

          <button
            type="submit"
            className="border-azure-blue bg-azure-blue hover:bg-dark-blue mx-auto my-6 flex justify-center rounded border-2 py-2 px-8 text-xl font-semibold text-white shadow-sm"
          >
            Submit
          </button>
        </form>

        <div className="mb-10 flex gap-6">
          <div className="basis-2/5">
            <div className="border-outer-space overflow-hidden rounded-md border">
              <h3 className="bg-light-grey text-dark-blue py-[10px] text-center text-2xl font-semibold">
                Your Record
              </h3>
              <div className="h-[700px] overflow-y-auto p-3">
                {complaints.map((row, index) => (
                  <div
                    key={index}
                    className={classNames(
                      index % 2 === 0 ? 'bg-teal-blue text-white' : '',
                      'complaint-box rounded-md p-3 mb-3'
                    )}
                  >
                    <h4 className="mb-2 text-lg font-semibold">{row.title}</h4>
                    <p className="mb-1 text-[16px">Lot: {row.lot_vin}</p>
                    <p className="text-sm">{row.message.substring(0, 175)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative basis-3/5">
            <div className="border-outer-space overflow-hidden rounded-md border">
              <h3 className="bg-light-grey text-dark-blue py-[10px] text-center text-2xl font-semibold">
                NAJ Customer Service
              </h3>
              <div className="flex h-[700px] flex-col overflow-y-auto p-3">
                <p className="bg-teal-blue border-medium-grey mb-4 w-1/2 self-end rounded-md border p-3 text-[16px] text-white shadow-xl">
                  This is an arbitrary complain.This is an arbitrary
                  complain.This is an arbitrary complain.This is an arbitrary
                  complain.This is an arbitrary complain. Read more…
                </p>
                <p className="text-dark-blue border-medium-grey mb-4 w-1/2 self-start rounded-md border bg-white p-3 text-[16px] shadow-xl">
                  This is an arbitrary complain.This is an arbitrary
                  complain.This is an arbitrary complain.This is an arbitrary
                  complain.This is an arbitrary complain. Read more…
                </p>

                <p className="text-medium-grey absolute bottom-10 text-lg italic">
                  * You may also contact our customer service directly at the
                  designated numbers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const apiUrl = process.env.API_URL;

  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  const res = await axios.get(`${apiUrl}complaintMessage`, {
    params: {
      customer_id: 79,
    },
  });
  const complaints = res.data.data;
  console.log(complaints);

  return {
    props: { complaints },
  };
}

export default Complaints;
