import { Dialog } from '@headlessui/react';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import HeadTextWithIcon from '@/components/common/HeadTextWithIcon';
import CustomModal from '@/components/customModal';
import ComplaintMessages from '@/components/dashboard/complaints/complaintMessages';
import { SearchLot } from '@/components/dashboard/searchLot';
import { UserContext } from '@/components/userContext';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { classNames } from '@/utils/Functions';
import { grantIfLogin, postData } from '@/utils/network';

export interface Complaint {
  complaint_message_id: string;
  complaint_no: string;
  title: string;
  lot_vin: string;
  message: string;
  readable_create_date: string;
}

const Complaints = () => {
  const intl = useIntl();
  const userContextData = useContext(UserContext) as
    | { profile?: Record<string, any> }
    | undefined;
  const { profile } = userContextData || {};

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
      customer_id: profile?.customer_id,
      lot_vin: event.target.lot_vin.value,
      subject: event.target.subject.value,
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
            {intl.formatMessage({ id: 'messages.complaintRecorded' })}{' '}
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-xl">
              {intl.formatMessage({ id: 'messages.receivedmsg' })} <br />{' '}
              {intl.formatMessage({ id: 'messages.getbacksoon' })}
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
            {intl.formatMessage({ id: 'messages.ok' })}
          </button>
        </div>
      </CustomModal>
      <CustomModal
        showOn={errorModalOpen}
        initialFocus={okButtonErrorRef}
        onClose={() => {
          setErrorModalOpen(false);
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons mb-4 text-6xl text-red-800">&#xe160;</i>
          <Dialog.Title as="h3" className="text-4xl font-bold leading-6">
            {intl.formatMessage({ id: 'general.sorry' })}
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-2xl">
              {intl.formatMessage({ id: 'general.technicalErr' })}
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setErrorModalOpen(false);
            }}
            ref={okButtonErrorRef}
          >
            {intl.formatMessage({ id: 'messages.ok' })}
          </button>
        </div>
      </CustomModal>
      <div className="m-4">
        <div className="mt-5">
          {/* <div className="ltr:mr-2 rtl:ml-2">
            <FontAwesomeIcon
              icon={faBuilding}
              className="secondary-header-icon"
            />
            <h4 className="secondary-header">
              <FormattedMessage id="page.complaints.title" />
            </h4>
          </div> */}
          <SearchLot></SearchLot>

          <HeadTextWithIcon
            header={'page.complaints.title'}
            gicon={'&#xe560;'}
            tagline={'page.complaints.header'}
          />
        </div>
        {/* <p className="text-dark-blue ml-5 text-xl lg:text-2xl">
          <FormattedMessage id="page.complaints.header" />
        </p> */}
      </div>
      <div className="mx-auto px-8">
        <div className="flex justify-center">
          <form method="post" onSubmit={handleSubmit} className="form-head">
            <div className="mt-1">
              <div>
                <span className="">
                  <FormattedMessage id="messages.vin_lot" />
                </span>
              </div>
              <input
                id="lot_vin"
                name="lot_vin"
                type="text"
                required
                // placeholder={intl.formatMessage({ id: 'messages.vin_lot' })}
                className="placeholder:text-outer-space border-medium-grey text-outer-space block w-full appearance-none rounded border px-3 py-2 text-lg shadow-sm focus:border-blue-800 focus:ring-0 ltr:placeholder:italic"
                value={inputValue.lot_vin}
                onChange={handleChange}
              />
            </div>
            <div className="relative mt-1 ">
              <div className="mt-3">
                <span>
                  <FormattedMessage id="messages.subject" />
                </span>
                <span className="right-text font-bold">*</span>
              </div>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                // placeholder={intl.formatMessage({ id: 'messages.subject' })}
                className="border-medium-grey text-outer-space block w-full appearance-none rounded border px-3 py-2 text-lg shadow-sm focus:border-blue-800 focus:ring-0 ltr:placeholder:italic"
                value={inputValue.subject}
                onChange={handleChange}
              />
              {/* <span className="text-yellow-orange absolute top-0 text-xl font-bold ltr:left-0 rtl:right-0">
                *
              </span> */}
            </div>
            <div className="relative mt-1 ">
              <div className="mt-3">
                <span>
                  <FormattedMessage id="messages.message" />
                </span>
                <span className="right-text font-bold">*</span>
              </div>
              <textarea
                rows={6}
                required
                className="text-outer-space border-medium-grey w-full resize-none rounded border text-lg focus:border-blue-800 focus:ring-0 ltr:placeholder:italic"
                name="message"
                // placeholder={intl.formatMessage({ id: 'messages.message' })}
                value={inputValue.message}
                onChange={handleChange}
              ></textarea>
              {/* <span className="text-yellow-orange absolute top-0 text-xl font-bold ltr:left-0 rtl:right-0">
                *
              </span> */}
            </div>

            <button type="submit" className="submit-button">
              {intl.formatMessage({ id: 'general.submit' })}
            </button>
          </form>
        </div>
        <div className="my-24 flex flex-col gap-6 lg:flex-row">
          <div className="basis-2/5">
            <div className="border-outer-space overflow-hidden rounded-md border">
              <h3 className="bg-light-grey text-dark-blue py-[10px] text-center text-2xl font-semibold">
                <FormattedMessage id="page.complaints.record" />
              </h3>
              <div className="h-[700px] overflow-y-auto p-3">
                {complaints.map((row, index) => (
                  <div
                    key={index}
                    className={classNames(
                      index % 2 === 0 ? 'bg-teal-blue text-white' : '',
                      'complaint-box rounded-md mb-3 cursor-pointer'
                    )}
                    onClick={() => {
                      getComplaintMessageDetails(row.complaint_message_id);
                    }}
                  >
                    <div className="p-3">
                      <h4 className="mb-2 text-lg font-semibold">
                        {row.title}
                      </h4>
                      <p className="mb-1 text-[16px]">Lot: {row.lot_vin}</p>
                      <p className="text-sm">{row.message.substring(0, 175)}</p>
                    </div>
                    <hr className="mt-2" />
                    <div className="flex justify-between px-3 py-2">
                      <small>Complaint # {row.complaint_no}</small>
                      <small>{row.readable_create_date}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative basis-3/5">
            <div className="border-outer-space overflow-hidden rounded-md border">
              <h3 className="bg-light-grey text-dark-blue py-[10px] text-center text-2xl font-semibold">
                <FormattedMessage id="page.complaints.najCS" />
              </h3>
              <ComplaintMessages
                complaintMessages={messages}
                notes={<FormattedMessage id="page.complaints.notes" />}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  return grantIfLogin(context);
}

export default Complaints;
