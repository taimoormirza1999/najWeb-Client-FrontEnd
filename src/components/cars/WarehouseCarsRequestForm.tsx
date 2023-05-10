import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Select from 'react-select';

import { classNames } from '@/utils/Functions';

import CustomModal from '../customModal';

const ReactSelectStyle = (baseStyles, state) => ({
  ...baseStyles,
  borderColor: state.isFocused ? '#3182ce' : '#a0aec0',
});

export default function WarehouseCarsRequestForm({
  carData,
  vehiclesType,
  carsMaker,
  carsColor,
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
  const now = new Date().getUTCFullYear() + 1;
  const [carsModel, setCarsModel] = useState([
    {
      id_car_model: '',
      name: '',
    },
  ]);
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
  }, [carData.id_car_make]);

  const emptyCarData = () => {
    setCarData({
      id: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReactSelectChange = (name, value) => {
    setCarData((prevState) => ({ ...prevState, [name]: value }));
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
    document.body.style.overflow = 'auto';

    const formData = new FormData();
    Object.entries(carData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (invoiceFile) {
      formData.append('invoiceFile', invoiceFile);
    }
    if (photoFile) {
      formData.append('photoFile', photoFile);
    }

    fetch('/api/customer/cars/warehouse_cars/', {
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
      });
  };

  return (
    <CustomModal
      showOn={newCarModalOpen}
      initialFocus={closeModalRef}
      onClose={() => {}}
    >
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        className="max-h-screen overflow-y-scroll px-2"
      >
        <div className="text-dark-blue mt-2 sm:mt-4">
          <Dialog.Title as="h3" className="text-3xl leading-6">
            {intl.formatMessage({ id: 'page.modal.title.new_car' })}{' '}
          </Dialog.Title>
          <div className="my-5 mt-10">
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
                    handleReactSelectChange('id_vehicle_type', newOption.value);
                  }}
                  defaultValue={{
                    value: carData.id_vehicle_type,
                    label: vehiclesType.find(
                      (item) => item.id_vehicle_type === carData.id_vehicle_type
                    )?.name,
                  }}
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
                  <FormattedMessage id="form.year" />
                  <span className="mx-1 text-lg text-red-500">*</span>
                </label>
                <Select
                  className="w-full rounded-md text-lg text-gray-700"
                  name="year"
                  required
                  onChange={(newOption) => {
                    handleReactSelectChange('year', newOption.value);
                  }}
                  defaultValue={{
                    value: carData.year,
                    label: carData.year,
                  }}
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
                  <FormattedMessage id="form.maker" />
                  <span className="mx-1 text-lg text-red-500">*</span>
                </label>
                <Select
                  className="w-full rounded-md text-lg text-gray-700"
                  name="id_car_make"
                  required
                  onChange={(newOption) => {
                    handleReactSelectChange('id_car_make', newOption.value);
                  }}
                  defaultValue={{
                    value: carData.id_car_make,
                    label: carsMaker.find(
                      (item) => item.id_car_make === carData.id_car_make
                    )?.name,
                  }}
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
                    handleReactSelectChange('id_car_model', newOption.value);
                  }}
                  defaultValue={{
                    value: carData.id_car_model,
                    label: carsModel.find(
                      (item) => item.id_car_model === carData.id_car_model
                    )?.name,
                  }}
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
                    handleReactSelectChange('color', newOption.value);
                  }}
                  defaultValue={{
                    value: carData.color,
                    label: carsColor.find(
                      (item) => item.color_id === carData.color
                    )?.color_name,
                  }}
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
                  <FormattedMessage id="form.destination" />
                  <span className="mx-1 text-lg text-red-500">*</span>
                </label>
                <Select
                  className="w-full rounded-md text-lg text-gray-700"
                  name="destination"
                  required
                  onChange={(newOption) => {
                    handleReactSelectChange('destination', newOption.value);
                  }}
                  defaultValue={{
                    value: carData.destination,
                    label: ports.find(
                      (item) => item.port_id === carData.destination
                    )?.port_name,
                  }}
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
            </div>

            <div className="my-4 gap-2 sm:flex">
              <div className="w-full">
                <label className="text-teal-blue block text-lg rtl:text-right">
                  <FormattedMessage id="form.driver_name" />
                  <span className="mx-1 text-lg text-red-500">*</span>
                </label>
                <input
                  className="w-full rounded-md border px-1 text-lg text-gray-700"
                  type="text"
                  name="driver_name"
                  required
                  onChange={handleChange}
                  defaultValue={carData.driver_name}
                />
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
                  defaultValue={carData.driver_number}
                />
              </div>
            </div>
            <div className="my-4 gap-2 sm:flex">
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
                  defaultValue={carData.driver_zip_code}
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
                  defaultValue={carData.driver_tin}
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
                  defaultValue={carData.account_number}
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
                  defaultValue={carData.routing_number}
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
                  defaultValue={carData.reference_number}
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
                  defaultValue={carData.driver_address}
                />
              </div>
            </div>
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
                    {intl.formatMessage({ id: 'form.condition.big_damage' })}
                  </option>
                  <option value="2">
                    {intl.formatMessage({ id: 'form.condition.more_space' })}
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
        </div>
        <div className="mt-5 flex justify-center gap-4 gap-x-14 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
            ref={closeModalRef}
            onClick={() => {
              setNewCarModalOpen(false);
              setCarAlreadyExist(false);
            }}
          >
            <FormattedMessage id="general.cancel" />
          </button>

          {!carAlreadyExist ? (
            <button className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500">
              {intl.formatMessage({ id: 'messages.submit' })}
            </button>
          ) : null}
        </div>
      </form>
    </CustomModal>
  );
}
