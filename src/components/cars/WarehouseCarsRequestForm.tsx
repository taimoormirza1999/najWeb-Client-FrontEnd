import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CustomModal from '../customModal';

export default function WarehouseCarsRequestForm({
  carData,
  setCarData,
  newCarModalOpen,
  setNewCarModalOpen,
  getWarehouseCars,
  setFormSubmitModal,
}) {
  const intl = useIntl();
  const [carAlreadyExist, setCarAlreadyExist] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (carData.lotnumber === '' && carData.vin === '') {
      return;
    }

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

  const emptyCarData = () => {
    setCarData({
      id: '',
      lotnumber: '',
      vin: '',
      driver_name: '',
      driver_number: '',
      driver_tin: '',
      account_number: '',
      routing_number: '',
      reference_number: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(carData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (file) {
      formData.append('file', file);
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
          message: 'Save successfully.',
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
      initialFocus={null}
      onClose={() => {
        setNewCarModalOpen(false);
        setCarAlreadyExist(false);
        emptyCarData();
      }}
    >
      <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <div className="text-dark-blue mt-2 sm:mt-4">
          <Dialog.Title as="h3" className="text-3xl leading-6">
            {intl.formatMessage({ id: 'page.modal.title.new_car' })}{' '}
          </Dialog.Title>
          <div className="my-5 mt-10">
            <div className="my-4 gap-2 sm:flex">
              <div className="w-full">
                <label className="text-teal-blue block text-lg">
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
                <label className="text-teal-blue block text-lg">
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
                <label className="text-teal-blue block text-lg">
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
                <label className="text-teal-blue block text-lg">
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
              <div className="w-full">
                <label className="text-teal-blue block text-lg">
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
                <label className="text-teal-blue block text-lg">
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
                <label className="text-teal-blue block text-lg">
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
                <label className="text-teal-blue block text-lg">
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
            <div className="my-4">
              <label className="text-teal-blue block text-lg">
                <FormattedMessage id="form.invoice" />
                <span className="mx-1 text-lg text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-md border px-1 text-lg text-gray-700"
                type="file"
                name="file"
                // required
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
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
