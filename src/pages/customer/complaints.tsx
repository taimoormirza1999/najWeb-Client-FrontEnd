import { Dialog } from '@headlessui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl  } from 'react-intl';
import CustomModal from '@/components/CustomModal';
import ComplaintMessages from '@/components/dashboard/complaints/complaintMessages';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/LayoutDashboard';
import { postData } from '@/utils/network';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export interface Complaint {
  complaint_message_id: string;
  title: string;
  lot_vin: string;
  message: string;
}

const Complaints = () => {
  const intl = useIntl();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [messages, setMessages] = useState([]);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const okButtonRef = useRef(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const okButtonErrorRef = useRef(null);
  const [newComplaint, setNewComplaint] = useState(0);
  const [inputValue, setInputValue] = useState({
    lot_vin: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      lot_vin: event.target.lot_vin.value,
      title: event.target.subject.value,
      message: event.target.message.value,
    };

    const response = await postData(
      '/api/customer/complaint/submitComplaint',
      formData
    );

    if (response.success === true) {
      setNewComplaint(newComplaint + 1);
      setSubmitModalOpen(true);
      setInputValue(() => ({
        lot_vin: '',
        subject: '',
        message: '',
      }));
    } else {
      setErrorModalOpen(true);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }

  const getComplaints = async () => {
    await axios
      .get(`/api/customer/complaint/complaints`)
      .then((res) => {
        setComplaints(res.data.data);
      })
      .catch(() => {
        setComplaints([]);
      });
  };

  useEffect(() => {
    getComplaints();
  }, [newComplaint]);

  const getComplaintMessageDetails = async (complaint_id) => {
    const loadingMessage: any = [
      {
        parent_id: 0,
        message: 'Loading...',
      },
    ];
    setMessages(loadingMessage);
    await axios
      .get(`/api/customer/complaint/complaintDetails`, {
        params: {
          complaint_id,
        },
      })
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch(() => {
        setMessages([]);
        setErrorModalOpen(true);
      });
  };

  return (
    <Layout meta={<Meta title="Complaints" description="" />}>
      <CustomModal
        showOn={submitModalOpen}
        initialFocus={okButtonRef}
        onClose={() => {
          setSubmitModalOpen(false);
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons text-yellow-orange mb-4 text-6xl">
            &#xe2e6;
          </i>
          <Dialog.Title as="h3" className="text-3xl font-bold leading-6">
          {intl.formatMessage({ id: "messages.complaintRecorded" })}{' '}
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-xl">
              {intl.formatMessage({ id: "messages.receivedmsg" })}{' '}
              <br /> {intl.formatMessage({ id: "messages.getbacksoon" })} 
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setSubmitModalOpen(false);
            }}
            ref={okButtonRef}
          >
            {intl.formatMessage({ id: "messages.ok" })} 
          </button>
        </div>
      </CustomModal>
      <CustomModal
        showOn={errorModalOpen}
        initialFocus={okButtonErrorRef}
        onClose={() => {
          setErrorModalOpen(false);
          contentRef?.current?.classList.remove('blur-sm');
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons mb-4 text-6xl text-red-800">&#xe160;</i>
          <Dialog.Title as="h3" className="text-4xl font-bold leading-6">
          {intl.formatMessage({ id: "general.sorry" })}
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-2xl">
            {intl.formatMessage({ id: "general.technicalErr" })}
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
            {intl.formatMessage({ id: "messages.ok" })}
          </button>
        </div>
      </CustomModal>
      <div className="mx-auto px-8">
        <h4 className="text-dark-blue mt-4 py-4 text-xl font-semibold sm:text-3xl">
          <i className="material-icons text-yellow-orange align-middle text-3xl ltr:mr-2 rtl:ml-2">
            &#xe14f;
          </i>
          <span className="pl-1 align-middle"><FormattedMessage id= "page.complaints.title"/></span>
        </h4>
        <p className="text-dark-blue text-2xl">
          <FormattedMessage id= "page.complaints.header"/>
        </p>

        <form method="post" onSubmit={handleSubmit} className="mt-8 mb-4">
          <div className="mt-1 ltr:pl-6 rtl:pr-6">
            <input
              id="lot_vin"
              name="lot_vin"
              type="text"
              placeholder={intl.formatMessage({ id: "messages.vin_lot" })}
              className="placeholder:text-outer-space border-medium-grey text-outer-space block w-full appearance-none rounded border px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
              value={inputValue.lot_vin}
              onChange={handleChange}
            />
          </div>
          <div className="relative mt-1 ltr:pl-6 rtl:pr-6">
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder={intl.formatMessage({ id: "messages.subject" })}
              className="border-medium-grey text-outer-space block w-full appearance-none rounded border px-3 py-2 text-lg shadow-sm placeholder:italic focus:border-blue-800 focus:ring-0"
              value={inputValue.subject}
              onChange={handleChange}
            />
            <span className="text-yellow-orange absolute top-0 ltr:left-0 rtl:right-0 text-xl font-bold">
              *
            </span>
          </div>
          <div className="relative mt-1 ltr:pl-6 rtl:pr-6">
            <textarea
              rows={6}
              className="text-outer-space border-medium-grey w-full resize-none rounded border text-lg placeholder:italic focus:border-blue-800 focus:ring-0"
              name="message"
              placeholder={intl.formatMessage({ id: "messages.message" })}
              value={inputValue.message}
              onChange={handleChange}
            ></textarea>
            <span className="text-yellow-orange absolute top-0 ltr:left-0 rtl:right-0 text-xl font-bold">
              *
            </span>
          </div>

          <button
            type="submit"
            className="border-azure-blue bg-azure-blue hover:bg-dark-blue mx-auto my-6 flex justify-center rounded border-2 py-2 px-8 text-xl font-semibold text-white shadow-sm"
          >
            {intl.formatMessage({ id: "general.submit" })}
          </button>
        </form>

        <div className="my-24 flex gap-6">
          <div className="basis-2/5">
            <div className="border-outer-space overflow-hidden rounded-md border">
              <h3 className="bg-light-grey text-dark-blue py-[10px] text-center text-2xl font-semibold">
              <FormattedMessage id= "page.complaints.record"/>
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
              <FormattedMessage id= "page.complaints.najCS"/>
              </h3>
              <ComplaintMessages complaintMessages={messages} notes={<FormattedMessage id= "page.complaints.notes"/>}/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Complaints;
