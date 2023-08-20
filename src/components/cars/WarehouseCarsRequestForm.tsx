import 'react-form-wizard-component/dist/style.css';

import { Dialog } from '@headlessui/react';
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import FormWizard from 'react-form-wizard-component';
import { FormattedMessage, useIntl } from 'react-intl';
import Select from 'react-select';
import * as Yup from 'yup';

import { classNames } from '@/utils/Functions';

import CustomModal from '../customModal';
import {
  AccountCircleIcon,
  CarIcon,
  PaymentIcon,
  SpinnerIcon,
} from '../themeIcons';
import { UserContext } from '../userContext';

const ReactSelectStyle = (baseStyles, state) => ({
  ...baseStyles,
  borderColor: state.isFocused ? '#3182ce' : '#a0aec0',
});

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('The First Name field is required'),
  lastName: Yup.string().required('The Last Name field is required'),
  email: Yup.string()
    .email('The email must be a valid email address.')
    .required('The Email field is required'),
  password: Yup.string()
    .required('The Password field is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*)[A-Za-z\d]{8,}$/,
      `Must Contain 8 Characters, One Uppercase, One Lowercase,
      One Number and one special case Character [@$!%*#?&-_]`
    ),
  privacy: Yup.boolean()
    .isTrue()
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

export default function WarehouseCarsRequestForm({
  carData,
  vehiclesType,
  carsMaker,
  carsColor,
  carsDriver,
  ports,
  setCarData,
  newCarModalOpen,
  setNewCarModalOpen,
  getWarehouseCars,
  setFormSubmitModal,
}) {
  const intl = useIntl();
  const [carAlreadyExist, setCarAlreadyExist] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const closeModalRef = useRef(null);
  const { profile } = useContext(UserContext);
  const [submitStarted, setSubmitStarted] = useState(false);
  const now = new Date().getUTCFullYear() + 1;
  const allowWarehouseCarsRequests =
    profile?.allowWarehouseCarsRequests || false;
  const [carsModel, setCarsModel] = useState([
    {
      id_car_model: '',
      name: '',
      driver_name: '',
    },
  ]);
  const [showPanel, setShowPanel] = useState(false);
  const [foundDrivers, setFoundDrivers] = useState(carsDriver);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReactSelectChange = (name, value) => {
    setCarData((prevState) => ({ ...prevState, [name]: value }));
  };

  const carsYear = Array(now - (now - 100))
    .fill('')
    .map((_v, idx) => now - idx);

  useEffect(() => {
    if (carData.lotnumber === '' && carData.vin === '') {
      return;
    }
    setCarAlreadyExist(false);

    axios
      .get(`/api/customer/cars/warehouse_cars_exist/`, {
        params: {
          id: carData.id,
          lotnumber: carData.lotnumber,
          vin: carData.vin,
        },
      })
      .then((response) => {
        if (response.data?.carExist) {
          setCarAlreadyExist(true);
          setFormSubmitModal({
            status: true,
            type: 'error',
            message: 'Car information already exist!',
          });
        }
      });
  }, [carData.lotnumber, carData.vin]);

  useEffect(() => {
    if (carData?.id_car_make === undefined) {
      return;
    }

    axios
      .get('/api/cars/carsModelAll', {
        params: {
          maker_id: carData.id_car_make,
        },
      })
      .then((response) => {
        setCarsModel(response.data?.data || []);
      });
  }, [carData.id_car_make, carData.model_name]);

  useEffect(() => {
    axios
      .get(`/api/cars/vehicleDetailApi/`, {
        params: {
          vin: carData.vin,
        },
      })
      .then((response) => {
        if (response.data) {
          const maker = String(response.data?.make);
          const type = String(response.data?.type);
          const year = response.data?.year;
          const vehicleType = vehiclesType.find(
            (item) => item.name.toLowerCase() === type.toLowerCase()
          )?.id_vehicle_type;

          const carMaker = carsMaker.find(
            (item) => item.name.toLowerCase() === maker.toLowerCase()
          )?.id_car_make;

          const model = String(response.data?.model);

          setCarData((prevState) => ({
            ...prevState,
            year,
            id_car_make: carMaker,
            model_name: model,
          }));
          if (vehicleType) {
            setCarData((prevState) => ({
              ...prevState,
              id_vehicle_type: vehicleType,
            }));
          }
        }
      });
  }, [carData.vin]);

  const emptyCarData = () => {
    setCarData({
      id: '',
      id_vehicle_type: '1',
      destination: '6',
    });
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/jpg'];
    if (!allowedTypes.includes(file?.type)) {
      e.target.value = null;
      setFormSubmitModal({
        status: true,
        type: 'error',
        message: `Only image files are allowed.`,
      });
    } else {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleInvoiceFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file?.type)) {
      e.target.value = null;
      setFormSubmitModal({
        status: true,
        type: 'error',
        message: `Only pdf files are allowed.`,
      });
    } else {
      setInvoiceFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form sent');
  };

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '' && keyword.length > 0) {
      setShowPanel(true);
      const results = carsDriver.filter((user) => {
        return user.driver_name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundDrivers(results);
    } else {
      setFoundDrivers(carsDriver);
      setShowPanel(false);
    }

    setCarData((prevState) => ({ ...prevState, driver_name: keyword }));
  };

  const searchClick = (id) => {
    const driver = carsDriver.find((item) => item.id === id);

    if (driver) {
      setCarData((prevState) => ({
        ...prevState,
        driver_name: driver.driver_name,
        driver_number: driver.driver_number,
        driver_email: driver.driver_email,
        driver_zip_code: driver.driver_zip_code,
        driver_tin: driver.driver_tin,
        account_number: driver.account_number,
        routing_number: driver.routing_number,
        reference_number: driver.reference_number,
        driver_address: driver.driver_address,
      }));
    }
    setShowPanel(false);
  };

  let driverinput;

  if (showPanel && foundDrivers && foundDrivers.length > 0) {
    driverinput = foundDrivers.map((item, i) => (
      <li
        key={i}
        onClick={() => {
          searchClick(item.id);
        }}
        className="p-2 hover:bg-slate-300"
      >
        <span className="ml-2">{item.driver_name}</span>
      </li>
    ));
  } else if (!showPanel) {
    driverinput = null;
  } else {
    driverinput = <p className="p-2 text-red-500">No results found!</p>;
  }
  return (
    <CustomModal
      showOn={newCarModalOpen}
      initialFocus={closeModalRef}
      customSize={true}
      onClose={() => {
        document.documentElement.style.overflow = 'auto';
      }}
    >
      <div className="absolute top-1/2 left-1/2 inline-block max-h-[100vh] w-4/5 -translate-x-1/2 -translate-y-1/2 -overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-lg transition-all sm:p-6 sm:align-middle lg:w-3/5">
        <div className="flex justify-between">
          <Dialog.Title as="h3" className="text-3xl leading-6">
            {intl.formatMessage({ id: 'page.modal.title.new_car' })}{' '}
          </Dialog.Title>
          <XCircleIcon
            className="h-8 w-8 cursor-pointer text-red-500"
            ref={closeModalRef}
            onClick={() => {
              emptyCarData();
              setNewCarModalOpen(false);
              setCarAlreadyExist(false);
            }}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
          className="max-h-[95vh] overflow-y-auto px-2"
        >
          <FormWizard
            shape="square"
            color="#0093ff"
            onComplete={handleSubmit}
            onTabChange={() => {
              console.log('Tab changed');
            }}
            backButtonTemplate={(handlePrevious: () => void) => {
              return (
                <button
                  className="border-azure-blue text-azure-blue float-left my-4 max-w-max rounded-md border-2 px-8 py-2 text-xl font-medium   rtl:float-right"
                  onClick={handlePrevious}
                >
                  {intl.formatMessage({ id: 'general.back' })}
                </button>
              );
            }}
            nextButtonTemplate={(handleNext) => (
              <button
                className="bg-azure-blue float-right my-4 max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500 rtl:float-left"
                onClick={handleNext}
              >
                {intl.formatMessage({ id: 'general.next' })}
              </button>
            )}
            finishButtonTemplate={() => (
              <button
                className="bg-azure-blue float-right my-4 max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500 rtl:float-left"
                disabled={submitStarted}
              >
                {submitStarted === true ? (
                  <>
                    <SpinnerIcon className="mr-3 h-5 w-5" />
                    {intl.formatMessage({ id: 'general.submitting' })}...
                  </>
                ) : (
                  intl.formatMessage({ id: 'general.submit' })
                )}
              </button>
            )}
          >
            <FormWizard.TabContent
              title={intl.formatMessage({ id: 'Car_Profile' })}
              icon={<CarIcon className="h-8 w-8" />}
            >
              <div className="text-left">
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.vin" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="vin"
                      required
                      onChange={handleChange}
                      defaultValue={carData.vin}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.lotnumber" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="lotnumber"
                      required
                      onChange={handleChange}
                      defaultValue={carData.lotnumber}
                    />
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.maker" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <Select
                      className="w-full rounded-md text-lg text-gray-700"
                      name="id_car_make"
                      required
                      onChange={(newOption) => {
                        handleReactSelectChange(
                          'id_car_make',
                          newOption?.value
                        );
                      }}
                      value={
                        carData?.id_car_make
                          ? {
                            value: carData.id_car_make,
                            label: carsMaker.find(
                              (item) =>
                                item.id_car_make === carData.id_car_make
                            )?.name,
                          }
                          : null
                      }
                      styles={{
                        control: ReactSelectStyle,
                      }}
                      options={carsMaker.map((item) => ({
                        value: item.id_car_make,
                        label: item.name,
                      }))}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.model" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <Select
                      className="w-full rounded-md text-lg text-gray-700"
                      name="id_car_model"
                      required
                      onChange={(newOption) => {
                        handleReactSelectChange(
                          'id_car_model',
                          newOption?.value
                        );
                      }}
                      value={
                        carData?.id_car_model
                          ? {
                            value: carData.id_car_model,
                            label: carsModel.find(
                              (item) =>
                                item.id_car_model === carData.id_car_model
                            )?.name,
                          }
                          : null
                      }
                      styles={{
                        control: ReactSelectStyle,
                      }}
                      options={carsModel.map((item) => ({
                        value: item?.id_car_model,
                        label: item.name,
                      }))}
                    />
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.color" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <Select
                      className="w-full rounded-md text-lg text-gray-700"
                      name="color"
                      required
                      onChange={(newOption) => {
                        handleReactSelectChange('color', newOption?.value);
                      }}
                      defaultValue={
                        carData?.color
                          ? {
                            value: carData.color,
                            label: carsColor.find(
                              (item) => item.color_id === carData.color
                            )?.color_name,
                          }
                          : null
                      }
                      styles={{
                        control: ReactSelectStyle,
                      }}
                      options={carsColor.map((item) => ({
                        value: item.color_id,
                        label: item.color_name,
                      }))}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.year" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <Select
                      className="w-full rounded-md text-lg text-gray-700"
                      name="year"
                      required
                      onChange={(newOption) => {
                        handleReactSelectChange('year', newOption?.value);
                      }}
                      value={
                        carData?.year
                          ? {
                            value: carData.year,
                            label: carData.year,
                          }
                          : null
                      }
                      styles={{
                        control: ReactSelectStyle,
                      }}
                      options={carsYear.map((label) => ({
                        value: label,
                        label,
                      }))}
                    />
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.vehicle_type" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <Select
                      className="w-full rounded-md text-lg text-gray-700"
                      name="id_vehicle_type"
                      required
                      onChange={(newOption) => {
                        handleReactSelectChange(
                          'id_vehicle_type',
                          newOption?.value
                        );
                      }}
                      value={
                        carData?.id_vehicle_type
                          ? {
                            value: carData.id_vehicle_type,
                            label: vehiclesType.find(
                              (item) =>
                                item.id_vehicle_type ===
                                carData.id_vehicle_type
                            )?.name,
                          }
                          : null
                      }
                      styles={{
                        control: ReactSelectStyle,
                      }}
                      options={vehiclesType.map((item) => ({
                        value: item.id_vehicle_type,
                        label: item.name,
                      }))}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.car_condition" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      name="car_condition"
                      onChange={handleChange}
                      defaultValue={carData.car_condition}
                    >
                      <option value="0">
                        {intl.formatMessage({ id: 'form.condition.normal' })}
                      </option>
                      <option value="1">
                        {intl.formatMessage({
                          id: 'form.condition.big_damage',
                        })}
                      </option>
                      <option value="2">
                        {intl.formatMessage({
                          id: 'form.condition.more_space',
                        })}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.car_title" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      name="car_title"
                      onChange={handleChange}
                      defaultValue={carData.car_title}
                    >
                      <option value={''}>
                        {intl.formatMessage({ id: 'form.select' })}
                      </option>
                      <option value={'0'}>
                        {intl.formatMessage({ id: 'form.no' })}
                      </option>
                      <option value={'1'}>
                        {intl.formatMessage({ id: 'form.yes' })}
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.car_key" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      name="car_key"
                      onChange={handleChange}
                      defaultValue={carData.car_key}
                    >
                      <option value={''}>
                        {intl.formatMessage({ id: 'form.select' })}
                      </option>
                      <option value={'0'}>
                        {intl.formatMessage({ id: 'form.no' })}
                      </option>
                      <option value={'1'}>
                        {intl.formatMessage({ id: 'form.yes' })}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </FormWizard.TabContent>
            <FormWizard.TabContent
              title={intl.formatMessage({ id: 'car.other_detail' })}
              icon={<InformationCircleIcon className="h-8 w-8" />}
            >
              <div className="text-left">
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.delivered_date" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="date"
                      name="delivered_date"
                      required
                      onChange={handleChange}
                      defaultValue={carData.delivered_date}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.towing_price" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="number"
                      step={0.01}
                      name="towing_price"
                      required
                      onChange={handleChange}
                      defaultValue={carData.towing_price}
                    />
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.sale_price" /> $
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="number"
                      step={0.01}
                      name="sale_price"
                      required
                      onChange={handleChange}
                      defaultValue={carData.sale_price}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.destination" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <Select
                      className="w-full rounded-md text-lg text-gray-700"
                      name="destination"
                      required
                      onChange={(newOption) => {
                        handleReactSelectChange(
                          'destination',
                          newOption?.value
                        );
                      }}
                      defaultValue={
                        carData?.destination
                          ? {
                            value: carData.destination,
                            label: ports.find(
                              (item) => item.port_id === carData.destination
                            )?.port_name,
                          }
                          : null
                      }
                      styles={{
                        control: ReactSelectStyle,
                      }}
                      options={ports.map((item) => ({
                        value: item.port_id,
                        label: item.port_name,
                      }))}
                    />
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.car_photo" />
                      <span
                        className={classNames(
                          carData.id ? 'hidden' : '',
                          'mx-1 text-lg text-red-500'
                        )}
                      >
                        *
                      </span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="file"
                      name="car_photo"
                      required={!carData.id && carData.id !== ''}
                      onChange={handlePhotoFileChange}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.invoice" />
                      <span
                        className={classNames(
                          carData.id ? 'hidden' : '',
                          'mx-1 text-lg text-red-500'
                        )}
                      >
                        *
                      </span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="file"
                      name="invoice"
                      required={!carData.id && carData.id !== ''}
                      onChange={handleInvoiceFileChange}
                    />
                  </div>
                </div>
              </div>
            </FormWizard.TabContent>
            {allowWarehouseCarsRequests && (
              <FormWizard.TabContent
                title={intl.formatMessage({ id: 'car.driver_detail' })}
                icon={<AccountCircleIcon className="h-8 w-8" />}
              >
                <div className="my-4 gap-2 sm:flex">
                  <div className="relative w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.driver_name" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      value={carData.driver_name}
                      onChange={filter}
                      placeholder="Filter"
                    />
                    <div className="absolute w-[280px] list-none rounded-lg bg-slate-200">
                      {driverinput}
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.driver_number" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="driver_number"
                      required
                      onChange={handleChange}
                      value={carData?.driver_number}
                    />
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-1/2">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.driver_email" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="email"
                      name="driver_email"
                      required
                      onChange={handleChange}
                      value={carData?.driver_email}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.zip_code" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="driver_zip_code"
                      required
                      onChange={handleChange}
                      value={carData?.driver_zip_code}
                    />
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.driver_tin" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="driver_tin"
                      required
                      onChange={handleChange}
                      value={carData?.driver_tin}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.account_number" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="account_number"
                      required
                      onChange={handleChange}
                      value={carData?.account_number}
                    />
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.routing_number" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="routing_number"
                      required
                      onChange={handleChange}
                      value={carData?.routing_number}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.reference_number" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="reference_number"
                      required
                      onChange={handleChange}
                      value={carData?.reference_number}
                    />
                  </div>
                </div>
                <div className="my-4 gap-2 sm:flex">
                  <div className="w-full">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.driver_address" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="driver_address"
                      required
                      onChange={handleChange}
                      value={carData?.driver_address}
                    />
                  </div>
                </div>
              </FormWizard.TabContent>
            )}
          </FormWizard>
        </form>
      </div>
    </CustomModal>
  );
}
