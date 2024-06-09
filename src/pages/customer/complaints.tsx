import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import HeadTextWithIcon from '@/components/common/HeadTextWithIcon';
import CustomModal from '@/components/customModal';
import ComplaintMessages from '@/components/dashboard/complaints/complaintMessages';
import { SearchLot } from '@/components/dashboard/searchLot';
import { UserContext } from '@/components/userContext';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { classNames } from '@/utils/Functions';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

export interface Complaint {
  complaint_message_id: string;
  complaint_no: string;
  title: string;
  lot_vin: string;
  message: string;
  complaint_type: string;
  readable_create_date: string;
}

const Complaints = ({ complaintTypes }) => {
  const intl = useIntl();
  const router = useRouter();
  const { locale } = router;
  const userContextData = useContext(UserContext) as
    | { profile?: Record<string, any> }
    | undefined;
  const { profile } = userContextData || {};

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [messages, setMessages] = useState([]);
  const [complaintTrackingNo, setComplaintTrackingNo] = useState(0);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const okButtonRef = useRef(null);
  const [errorModalOpen, setErrorModalOpen] = useState({
    status: false,
    message: '',
  });
  const okButtonErrorRef = useRef(null);
  const [newComplaint, setNewComplaint] = useState(0);
  const [complaintFile, setComplaintFile] = useState(null);
  const fileInputRef = useRef(null);
  const [inputValue, setInputValue] = useState({
    lot_vin: '',
    subject: '',
    message: '',
    complaint_type: '',
  });

  const handleComplaintFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/bmp',
      'image/jpg',
      'application/pdf',
    ];
    if (!allowedTypes.includes(file?.type)) {
      e.target.value = null;

      setErrorModalOpen({
        status: true,
        message: intl.formatMessage({ id: 'form.validaton.only_image' }),
      });
    } else {
      setComplaintFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('customer_id', profile?.customer_id);
    Object.entries(inputValue).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (complaintFile) {
      formData.append('complaintFile', complaintFile);
    }

    fetch('/api/customer/complaint/submitComplaint/', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setNewComplaint(newComplaint + 1);
        setComplaintTrackingNo(res.complaint_no);
        setSubmitModalOpen(true);
        setInputValue(() => ({
          lot_vin: '',
          subject: '',
          message: '',
          complaint_type: '',
        }));

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      })
      .catch(() => {
        setErrorModalOpen({
          status: true,
          message: intl.formatMessage({ id: 'general.technicalErr' }),
        });
      });
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
        setErrorModalOpen({
          status: true,
          message: intl.formatMessage({ id: 'general.technicalErr' }),
        });
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
              <b>
                {intl.formatMessage({ id: 'messages.tracking_no' })}
                {': '}
              </b>
              {complaintTrackingNo} <br />{' '}
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
        showOn={errorModalOpen.status}
        initialFocus={okButtonErrorRef}
        onClose={() => {
          setErrorModalOpen({ status: false, message: '' });
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <i className="material-icons mb-4 text-6xl text-red-800">&#xe160;</i>
          <Dialog.Title as="h3" className="text-4xl font-bold leading-6">
            {intl.formatMessage({ id: 'general.sorry' })}
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-6 text-2xl">{errorModalOpen.message}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
            onClick={() => {
              setErrorModalOpen({ status: false, message: '' });
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
      </div>
      <div className="mx-auto px-8">
        <div className="flex justify-center">
          <form
            method="post"
            onSubmit={handleSubmit}
            className="form-head"
            encType="multipart/form-data"
          >
            <div className="mt-1">
              <div>
                <span className="">
                  <FormattedMessage id="messages.lot" />
                </span>
              </div>
              <input
                id="lot_vin"
                name="lot_vin"
                type="text"
                required
                className="placeholder:text-outer-space border-medium-grey text-outer-space block w-full appearance-none rounded border px-3 py-2 text-lg shadow-sm focus:border-blue-800 focus:ring-0 ltr:placeholder:italic"
                value={inputValue.lot_vin}
                onChange={handleChange}
                maxLength={12}
                minLength={6}
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
                className="border-medium-grey text-outer-space block w-full appearance-none rounded border px-3 py-2 text-lg shadow-sm focus:border-blue-800 focus:ring-0 ltr:placeholder:italic"
                value={inputValue.subject}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <div className="mt-3">
                <span>
                  <FormattedMessage id="form.complaint_type" />
                </span>
                <span className="right-text font-bold">*</span>
              </div>
              <select
                required
                className="w-full rounded-md border px-1 text-lg text-gray-700"
                name="complaint_type"
                onChange={handleChange}
                value={inputValue.complaint_type}
              >
                <option value="">
                  {intl.formatMessage({ id: 'form.select' })}
                </option>
                {complaintTypes ? (
                  complaintTypes.map((type, i) => (
                    <option key={i} value={type.id}>
                      {type[`title_${locale}`]}
                    </option>
                  ))
                ) : (
                  <option value={0}></option>
                )}
              </select>
            </div>
            <div className="relative mt-1 ">
              <div className="mt-3">
                <span>
                  <FormattedMessage id="form.attachment" />
                </span>
                <span className="right-text font-bold">*</span>
              </div>
              <input
                id="complaint_file"
                name="complaint_file"
                type="file"
                className="border-medium-grey text-outer-space block w-full appearance-none rounded border p-1 text-lg shadow-sm focus:border-blue-800 focus:ring-0 ltr:placeholder:italic"
                accept="image/png, image/gif, image/jpeg, application/pdf"
                ref={fileInputRef}
                onChange={handleComplaintFileChange}
              />
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
                value={inputValue.message}
                onChange={handleChange}
              ></textarea>
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
                      <div className="flex w-2/3">
                        <small>Complaint # {row.complaint_no}</small>
                        {row.complaint_type > '' ? (
                          <small>, {row[`complaint_type_${locale}`]}</small>
                        ) : null}
                      </div>
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
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;
  const session: any = await getSession(context);

  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  axios.defaults.timeout = 300000;
  const apiUrl = process.env.API_URL;
  let complaintTypes = {};
  try {
    if (session && session.token && session.token.access_token) {
      axios.defaults.headers.common.Authorization = `Bearer ${session.token.access_token}`;
      await axios
        .get(`${apiUrl}complaintTypes`, {})
        .then((response) => {
          complaintTypes = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return {
      props: {
        complaintTypes,
      },
    };
  } catch (err) {
    return NetworkStatus.LOGIN_PAGE;
  }
}

export default Complaints;
