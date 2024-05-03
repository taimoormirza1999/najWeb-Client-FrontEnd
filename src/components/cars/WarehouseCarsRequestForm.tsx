import 'react-form-wizard-component/dist/style.css';

import { Dialog } from '@headlessui/react';
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import FormWizard from 'react-form-wizard-component';
import { FormattedMessage, useIntl } from 'react-intl';
import Select from 'react-select';
import * as Yup from 'yup';
import { ValidationError } from 'yup';

import { classNames, sentenceCase } from '@/utils/Functions';

import CustomModal from '../customModal';
import { AccountCircleIcon, CarIcon, SpinnerIcon } from '../themeIcons';
import { UserContext } from '../userContext';

const ReactSelectStyle = (baseStyles, state) => ({
  ...baseStyles,
  borderColor: state.isFocused ? '#3182ce' : '#a0aec0',
});

export default function WarehouseCarsRequestForm({
  carData,
  vehiclesType,
  carsMaker,
  carsColor,
  carsDriver,
  ports,
  regions,
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
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | undefined;
  }>({});
  const wizardStepIndex = useRef(0);

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

  const getRequiredvalidationSchema = () => {
    const requiredValidation: {
      [key: string]: Yup.MixedSchema<unknown> | Yup.StringSchema<any>;
    } = {};
    let requiredFields: string[] = [
      'vin',
      'lotnumber',
      'id_car_make',
      'id_car_model',
      'color',
      'year',
      'id_vehicle_type',
      'car_title',
      'car_key',
    ];

    if (wizardStepIndex.current === 2) {
      requiredFields = [
        'delivered_date',
        'sale_price',
        'destination',
        'gate_pass_pin',
      ];

      if (!allowWarehouseCarsRequests) {
        requiredFields.push('region_id');
      }

      // disabled temporariy, Yup validation is not working for these fields
      /* requiredValidation.car_photo = Yup.mixed().required(
        intl.formatMessage({ id: 'form.validation.message.required' })
      );
      requiredValidation.invoice = Yup.mixed().required(
        intl.formatMessage({ id: 'form.validation.message.required' })
      ); */
    } else if (allowWarehouseCarsRequests && wizardStepIndex.current === 3) {
      requiredFields = [
        'towing_price',
        'driver_name',
        'driver_number',
        'driver_email',
        'driver_tin',
        'driver_zip_code',
        'account_number',
        'routing_number',
        'reference_number',
        'driver_address',
      ];
    }

    requiredFields.forEach((fieldKey) => {
      requiredValidation[fieldKey] = Yup.string().required(
        intl.formatMessage({ id: 'form.validation.message.required' })
      );
    });

    return Yup.object().shape(requiredValidation);
  };

  const getValidationMessage = (fieldName) => {
    return (
      formErrors[fieldName] && (
        <p className="text-sm text-red-600">{formErrors[fieldName]}</p>
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevState) => ({ ...prevState, [name]: value.trim() }));
  };

  const handleReactSelectChange = (name, value) => {
    setCarData((prevState) => ({ ...prevState, [name]: value }));
  };

  const carsYear = Array(now - (now - 100))
    .fill('')
    .map((_v, idx) => now - idx);

  useEffect(() => {
    let source = axios.CancelToken.source();

    if (!carData.lotnumber && !carData.vin) {
      return;
    }
    setCarAlreadyExist(false);
    setFormErrors((prev) => ({ ...prev, vin: '' }));

    if (source) {
      source.cancel('Request cancelled due to new input');
    }

    source = axios.CancelToken.source();
    axios
      .get(`/api/customer/cars/warehouseCarExist/`, {
        params: {
          id: carData.id,
          lotnumber: carData.lotnumber,
          vin: carData.vin,
        },
        cancelToken: source.token,
      })
      .then((response) => {
        if (response.data?.carExist) {
          setCarAlreadyExist(true);
          setFormErrors((prev) => ({
            ...prev,
            vin: intl.formatMessage({ id: 'form.car.exist' }),
          }));
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
  }, [carData.id_car_make]);

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

          const apiFieldsToUpdate: { [key: string]: string } = {};
          if (carMaker) {
            apiFieldsToUpdate.id_car_make = carMaker;
          }
          if (year) {
            apiFieldsToUpdate.year = year;
          }
          if (vehicleType) {
            apiFieldsToUpdate.id_vehicle_type = vehicleType;
          }

          setCarData((prevState) => ({
            ...prevState,
            ...apiFieldsToUpdate,
          }));
        }
      });
  }, [carData.vin]);

  const emptyCarData = () => {
    setCarData({
      id: '',
      external_car: '2',
      id_vehicle_type: '1',
      destination: '6',
      customer_approved: !allowWarehouseCarsRequests ? 1 : 0, // auto approved for other customers
    });
    setFormErrors({});
    setSubmitStarted(false);
    wizardStepIndex.current = 0;
  };

  const validateFormFields = async () => {
    try {
      wizardStepIndex.current += 1;
      const validationSchema = getRequiredvalidationSchema();
      await validationSchema.validate(carData, { abortEarly: false });
      setFormErrors({});
      return true;
    } catch (validationErrors) {
      const errorObj: { [key: string]: string } = {};
      (validationErrors as ValidationError).inner.forEach((error) => {
        errorObj[error.path || ''] = error.message;
      });
      setFormErrors(errorObj);
      wizardStepIndex.current = Math.max(wizardStepIndex.current - 1, 0);
      return false;
    }
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/jpg'];
    if (!allowedTypes.includes(file?.type)) {
      e.target.value = null;

      setFormErrors((prev) => ({
        ...prev,
        car_photo: intl.formatMessage({ id: 'form.validaton.only_image' }),
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        car_photo: '',
      }));
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleInvoiceFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file?.type)) {
      e.target.value = null;
      setFormErrors((prev) => ({
        ...prev,
        invoice: intl.formatMessage({ id: 'form.validaton.only_pdf' }),
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        invoice: '',
      }));
      setInvoiceFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/auth/session');

    if (!profile || !profile.customer_id) {
      setFormSubmitModal({
        status: true,
        type: 'error',
        message: 'Session expired. Please refresh and try again .',
      });
      return;
    }

    if (await validateFormFields()) {
      console.log('form sent');
      setSubmitStarted(true);

      const formData = new FormData();
      formData.append('customer_id', profile?.customer_id);
      Object.entries(carData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (invoiceFile) {
        formData.append('invoiceFile', invoiceFile);
      }
      if (photoFile) {
        formData.append('photoFile', photoFile);
      }

      fetch('/api/customer/cars/warehouseCars/', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          getWarehouseCars();

          emptyCarData();
          setNewCarModalOpen(false);
          setFormSubmitModal({
            status: true,
            type: 'success',
            message: 'Saved successfully.',
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
    }
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
        className="cursor-pointer p-2 hover:bg-slate-300"
      >
        <span className="ml-2">{item.driver_name}</span>
      </li>
    ));
  } else if (!showPanel) {
    driverinput = null;
  } else {
    driverinput = <p className="p-2 text-red-500">No results found!</p>;
  }

  const handleFormNextStep = async (handleNext) => {
    if (await validateFormFields()) {
      handleNext();
    }
  };

  const handleFormPrevStep = (handlePrev) => {
    wizardStepIndex.current -= 1;
    handlePrev();
  };

  return (
    <CustomModal
      showOn={newCarModalOpen}
      initialFocus={closeModalRef}
      customSize={true}
      onClose={() => {
        document.documentElement.style.overflow = 'auto';
      }}
    >
      <div className="absolute top-1/2 left-1/2 inline-block max-h-[98vh] w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-lg transition-all sm:p-6 sm:align-middle lg:w-3/5">
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
            backButtonTemplate={(handlePrev: () => void) => {
              return (
                <button
                  className="border-azure-blue text-azure-blue float-left my-4 max-w-max rounded-md border-2 px-8 py-2 text-xl font-medium   rtl:float-right"
                  onClick={() => {
                    handleFormPrevStep(handlePrev);
                  }}
                >
                  {intl.formatMessage({ id: 'general.back' })}
                </button>
              );
            }}
            nextButtonTemplate={(handleNext) => (
              <button
                className="bg-azure-blue float-right my-4 max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500 rtl:float-left"
                type="button"
                disabled={carAlreadyExist}
                onClick={() => handleFormNextStep(handleNext)}
              >
                {intl.formatMessage({ id: 'general.next' })}
              </button>
            )}
            finishButtonTemplate={() => (
              <button
                className="bg-azure-blue float-right my-4 max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500 rtl:float-left"
                onClick={validateFormFields}
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
                      maxLength={30}
                    />
                    {getValidationMessage('vin')}
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
                      maxLength={20}
                    />
                    {getValidationMessage('lotnumber')}
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
                    {getValidationMessage('id_car_make')}
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
                    {getValidationMessage('id_car_model')}
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
                    {getValidationMessage('color')}
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
                    {getValidationMessage('year')}
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
                              label: sentenceCase(
                                vehiclesType.find(
                                  (item) =>
                                    item.id_vehicle_type ===
                                    carData.id_vehicle_type
                                )?.name
                              ),
                            }
                          : null
                      }
                      styles={{
                        control: ReactSelectStyle,
                      }}
                      options={vehiclesType.map((item) => ({
                        value: item.id_vehicle_type,
                        label: sentenceCase(item.name),
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
                    {getValidationMessage('car_title')}
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
                    {getValidationMessage('car_key')}
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
                  {!allowWarehouseCarsRequests && (
                    <div className="w-full">
                      <label className="text-teal-blue block text-lg rtl:text-right">
                        <FormattedMessage id="form.region" />
                        <span className="mx-1 text-lg text-red-500">*</span>
                      </label>
                      <Select
                        className="w-full rounded-md text-lg text-gray-700"
                        name="region_id"
                        required
                        onChange={(newOption) => {
                          handleReactSelectChange(
                            'region_id',
                            newOption?.value
                          );
                        }}
                        defaultValue={
                          carData?.region_id > 0
                            ? {
                                value: carData.region_id,
                                label: regions.find(
                                  (item) => item.region_id === carData.region_id
                                )?.region_name,
                              }
                            : null
                        }
                        styles={{
                          control: ReactSelectStyle,
                        }}
                        options={regions.map((item) => ({
                          value: item.region_id,
                          label: item.region_name,
                        }))}
                      />
                      {getValidationMessage('region_id')}
                    </div>
                  )}
                  <div className="w-1/2">
                    <label className="text-teal-blue block text-lg rtl:text-right">
                      <FormattedMessage id="form.gate_pass_pin" />
                      <span className="mx-1 text-lg text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-md border px-1 text-lg text-gray-700"
                      type="text"
                      name="gate_pass_pin"
                      required
                      onChange={handleChange}
                      defaultValue={carData.gate_pass_pin}
                      maxLength={20}
                    />
                    {getValidationMessage('gate_pass_pin')}
                  </div>
                  <div className="w-1/2">
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
                    {getValidationMessage('delivered_date')}
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
                    {getValidationMessage('sale_price')}
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
                    {getValidationMessage('destination')}
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
                      accept="image/png, image/gif, image/jpeg"
                      required={
                        !carData.id &&
                        carData.id !== '' &&
                        wizardStepIndex.current >= 1 // in which field is shown
                      }
                      onChange={handlePhotoFileChange}
                    />
                    {getValidationMessage('car_photo')}
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
                      accept="application/pdf"
                      required={
                        !carData.id &&
                        carData.id !== '' &&
                        wizardStepIndex.current >= 1 // in which field is shown
                      }
                      onChange={handleInvoiceFileChange}
                    />
                    {getValidationMessage('invoice')}
                  </div>
                </div>
              </div>
            </FormWizard.TabContent>
            {allowWarehouseCarsRequests && (
              <FormWizard.TabContent
                title={intl.formatMessage({ id: 'car.driver_detail' })}
                icon={<AccountCircleIcon className="h-8 w-8" />}
              >
                <div className="text-left">
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
                        placeholder={intl.formatMessage({
                          id: 'form.placeholder.filter_drivers',
                        })}
                      />
                      <div className="absolute w-full list-none rounded-md bg-slate-200">
                        {driverinput}
                      </div>
                      {getValidationMessage('driver_name')}
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
                      {getValidationMessage('driver_number')}
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
                      {getValidationMessage('driver_email')}
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
                      {getValidationMessage('driver_zip_code')}
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
                      {getValidationMessage('driver_tin')}
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
                      {getValidationMessage('account_number')}
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
                      {getValidationMessage('routing_number')}
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
                      {getValidationMessage('reference_number')}
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
                      {getValidationMessage('driver_address')}
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
                      {getValidationMessage('towing_price')}
                    </div>
                  </div>
                </div>
              </FormWizard.TabContent>
            )}
          </FormWizard>
        </form>
        <style>{`
        .react-form-wizard{padding-bottom:0;}
        .react-form-wizard .wizard-tab-content{padding:20px;}
        .react-form-wizard .wizard-nav-pills>li>a {border: none !important;}
        .form-wizard-steps > li .wizard-icon-circle, .form-wizard-steps > li .stepTitle,
        .form-wizard-steps > li .wizard-icon{
          color:#777;
        }
        `}</style>
      </div>
    </CustomModal>
  );
}
