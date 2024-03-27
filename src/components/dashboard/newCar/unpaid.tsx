import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import SingleImagesViewer from '@/components/common/SingleImagesViewer';
import CustomModal from '@/components/customModal';
import TableColumn from '@/components/TableColumn';
import { SpinnerIcon } from '@/components/themeIcons';
import { UserContext } from '@/components/userContext';
import { classNames } from '@/utils/Functions';

const UnPaid = ({ carsRecords }) => {
  const intl = useIntl();
  const [changePortModalOpen, setChangePortModalOpen] = useState(false);
  const [inputsData, setInputsData] = useState({});
  const [portCarId, setPortCarId] = useState('0');
  const [ports, setPorts] = useState([]);
  const [submitStarted, setSubmitStarted] = useState(false);
  const [formSubmitModal, setFormSubmitModal] = useState({
    status: false,
    type: '',
    message: '',
  });
  const cancelButtonRef = useRef(null);
  const userContextData = useContext(UserContext);
  const { profile } = userContextData || {};
  const UmQasrPort = '38';

  const getCountryPorts = async () => {
    const res = await axios.get(
      `/api/customer/shipping/countryPorts?limit=all`
    );
    setPorts(res.data.data || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputsData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangePortSubmit = async (e) => {
    e.preventDefault();

    setSubmitStarted(true);

    const formData = new FormData();
    Object.entries(inputsData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('customer_id', profile?.customer_id);
    formData.append('car_id', portCarId);

    try {
      fetch('/api/customer/cars/changePortRequest/', {
        method: 'POST',
        body: JSON.stringify({
          car_id: portCarId,
          customer_id: profile?.customer_id,
          destination: inputsData.destination,
          receiver_name: inputsData.receiver_name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setChangePortModalOpen(false);
          }
          setFormSubmitModal({
            status: true,
            type: res.success ? 'success' : 'error',
            message: res.message,
          });
        })
        .catch(() => {
          setFormSubmitModal({
            status: true,
            type: 'error',
            message: `Unable to save. Something went wrong.`,
          });
        })
        .finally(() => {
          setSubmitStarted(false);
          document.documentElement.style.overflow = 'auto';
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountryPorts();
  }, []);

  return carsRecords.map((car, index) => {
    return (
      <>
        <CustomModal
          showOn={changePortModalOpen}
          initialFocus={cancelButtonRef}
          onClose={() => {
            setChangePortModalOpen(false);
          }}
        >
          <div className="text-dark-blue">
            <Dialog.Title as="h5" className="text-xl font-bold leading-6">
              <FormattedMessage id="change_destination" />
              <div
                className="float-right mr-[14px] mt-2 cursor-pointer text-[25px] font-bold text-red-400 rtl:float-left"
                onClick={() => {
                  setChangePortModalOpen(false);
                }}
                ref={cancelButtonRef}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </Dialog.Title>
            <form onSubmit={handleChangePortSubmit} method="post">
              <div className="my-4 gap-2 sm:flex">
                <div className="w-2/3">
                  <label className="text-teal-blue block text-lg rtl:text-right">
                    <FormattedMessage id="form.port" />
                    <span className="mx-1 text-lg text-red-500">*</span>
                  </label>
                  <select
                    required
                    name="destination"
                    className="border-medium-grey  mb-3 w-full rounded-md border py-1 text-lg text-gray-700"
                    onChange={handleChange}
                  >
                    <option value="">
                      {intl.formatMessage({ id: 'tracking.port' })}
                    </option>
                    {ports.map((row: any, index) => (
                      <option key={index} value={row.port_id}>
                        {row.port_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {inputsData.destination === UmQasrPort ? (
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-2/3">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="port.receiver_name" />
                      {inputsData.destination === '6' ? (
                        <span className="mx-1 text-lg text-red-500">*</span>
                      ) : null}
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="receiver_name"
                      required={true}
                      onChange={handleChange}
                      maxLength={20}
                    />
                  </div>
                </div>
              ) : null}
              <button
                className="bg-azure-blue my-4 max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
                disabled={submitStarted}
              >
                {submitStarted === true ? (
                  <>
                    <SpinnerIcon className="mr-3 h-5 w-5" />
                    {intl.formatMessage({ id: 'general.saving' })}
                  </>
                ) : (
                  intl.formatMessage({ id: 'general.submit' })
                )}
              </button>
            </form>
          </div>
        </CustomModal>
        <CustomModal
          showOn={formSubmitModal.status}
          initialFocus={cancelButtonRef}
          onClose={() => {
            document.documentElement.style.overflow = 'auto';
            setFormSubmitModal({
              status: false,
              type: '',
              message: '',
            });
          }}
        >
          <div
            className={classNames(
              formSubmitModal.type === 'error'
                ? 'text-red-700'
                : 'text-dark-blue',
              'mt-6 text-center sm:mt-16'
            )}
          >
            <div className="mt-2">
              <p className="mb-4 py-4 text-lg md:text-xl lg:py-6 lg:text-2xl">
                {formSubmitModal.message}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-4 sm:mt-6">
            <button
              type="button"
              className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
              ref={cancelButtonRef}
              onClick={() => {
                document.documentElement.style.overflow = 'auto';
                setFormSubmitModal({
                  status: false,
                  type: '',
                  message: '',
                });
              }}
            >
              <FormattedMessage id="general.cancel" />
            </button>
          </div>
        </CustomModal>
        <tr
          key={index}
          className={classNames(
            index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
            'text-sm'
          )}
        >
          <TableColumn scope="col" className="w-[2px] ">
            {index + 1}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[56px] ">
            <SingleImagesViewer src={car.image} title={'New Car'} />
            {/* <img className="table_auction_img" src={car.image} alt="" /> */}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[180px] ">
            {car.carMakerName} {car.carModelName} {car.year}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[140px] ">
            Lot: {car.lotnumber} <br /> Vin: {car.vin}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[120px] ">
            {car.auctionLocationName} <br /> {car.auctionTitle}
            {/* <FormattedMessage id="general.buyer_number" />: {car.buyer_number}{' '} */}
            {/* <br /> */}
            {/* {car.region} */}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[154px] ">
            <FormattedMessage id="general.buyer_number" />: {car.buyer_number}{' '}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[64px] ">
            {car.region}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[64px] ">
            {car.destination}
            {
              <FontAwesomeIcon
                icon={faEdit}
                className="text-teal-blue mx-1"
                title={intl.formatMessage({ id: 'change_destination' })}
                onClick={() => {
                  if (car.change_port_request_id) {
                    setFormSubmitModal({
                      status: true,
                      type: 'success',
                      message: `Already requested for port: ${car.changed_port_name} on ${car.change_port_request_create_date}`,
                    });
                  } else {
                    setPortCarId(car.carId);
                    setChangePortModalOpen(true);
                  }
                }}
              />
            }
          </TableColumn>
          <TableColumn scope="col" className="min-w-[55px] ">
            {car.purchasedDate}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[60px] ">
            {car.lasTableColumnateToPay}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[30px] ">
            {car.daysOff}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[67px] ">
            {car.extraDate}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[60px] ">
            {car.remainingDays}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[63px] ">
            {car.startStorage}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[90px] ">
            {car.carCostUSD ? `${car.carCostUSD} $` : ''}
            <br />
            {car.carCostAED ? `${car.carCostAED} AED` : ''}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[90px] ">
            {car.late_payment_fineUSD ? `${car.late_payment_fineUSD} $` : ''}
            <br />
            {car.late_payment_fineAED ? `${car.late_payment_fineAED} AED` : ''}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[70px] ">
            {car.fineTotalCostUSD ? `${car.fineTotalCostUSD} $` : ''}
            <br />
            {car.fineTotalCost ? `${car.fineTotalCost} AED` : ''}
          </TableColumn>
          <TableColumn scope="col" className="min-w-[90px] ">
            {car.totalUSD ? `${car.totalUSD} $` : ''}
            <br />
            {car.totalAED ? `${car.totalAED} AED` : ''}
          </TableColumn>
        </tr>
      </>
    );
  });
};

export { UnPaid };
