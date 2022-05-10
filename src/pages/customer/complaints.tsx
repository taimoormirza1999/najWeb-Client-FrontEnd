import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import React, { useRef, useState } from 'react';

import CustomModal from '@/components/CustomModal';
import ComplaintMessages from '@/components/dashboard/complaints/complaintMessages';
import { Layout } from '@/templates/LayoutDashboard';
import { icon } from "@fortawesome/fontawesome-svg-core";
import { Dialog } from "@headlessui/react";
import { title } from "process";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Complaints = ({ apiUrl, complaints }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const okButtonRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const okButtonErrorRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      lot_vin: event.target.lot_vin.value,
      title: event.target.subject.value,
      message: event.target.message.value,
    };

    await axios
      .post(`${apiUrl}submitComplaint`, formData)
      .then(function (response) {
        if (response.data.success === true) {
          setSubmitModalOpen(true);
          contentRef?.current?.classList.add('blur-sm');
        } else {
          setErrorModalOpen(true);
          contentRef?.current?.classList.add('blur-sm');
        }
      })
      .catch(function (apiError) {
        console.log(apiError);
      });

    console.log(formData);
  };

  const getComplaintMessageDetails = async (complaint_id) => {
    axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
    const res = await axios.get(`${apiUrl}complaintMessageDetails`, {
      params: {
        complaint_message_id: complaint_id,
      },
    });
    setMessages(res.data.data);
  };

  return (
    <Layout meta="">
      <CustomModal
        showOn={submitModalOpen}
        initialFocus={okButtonRef}
        onClose={setSubmitModalOpen}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons text-yellow-orange mb-4 text-6xl">
            &#xe2e6;
          </i>
          <Dialog.Title as="h3" className="text-3xl font-bold leading-6">
            Complaint Recorded!
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-xl">
              We’ve received your request in our customers services offices.{' '}
              <br /> We’ll get back to you as soon as possible.
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setSubmitModalOpen(false);
              contentRef?.current?.classList.remove('blur-sm');
            }}
            ref={okButtonRef}
          >
            Okay
          </button>
        </div>
      </CustomModal>
      <CustomModal
        showOn={errorModalOpen}
        initialFocus={okButtonErrorRef}
        onClose={setErrorModalOpen}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons text-red-800 mb-4 text-6xl">&#xe160;</i>
          <Dialog.Title as="h3" className="text-4xl font-bold leading-6">
            Sorry!
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-2xl">
              A technical Error has occurred. Please Try again
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setErrorModalOpen(false);
              contentRef?.current?.classList.remove('blur-sm');
            }}
            ref={okButtonErrorRef}
          >
            Okay
          </button>
        </div>
      </CustomModal>
      <div className="mx-auto px-8" ref={contentRef}>
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
          <div className="mt-1 pl-6">
            <input
              id="lot_vin"
              name="lot_vin"
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

        <div className="my-24 flex gap-6">
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
                      'complaint-box rounded-md p-3 mb-3 cursor-pointer'
                    )}
                    onClick={() => {
                      getComplaintMessageDetails(row.complaint_message_id);
                    }}
                  >
                    <h4 className="mb-2 text-lg font-semibold">{row.title}</h4>
                    <p className="mb-1 text-[16px]">Lot: {row.lot_vin}</p>
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
              <ComplaintMessages complaintMessages={messages} />
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
  const res = await axios.get(`${apiUrl}complaintMessage`);
  const complaints = res.data.data;

  return {
    props: { apiUrl, session, complaints },
  };
}

export default Complaints;
