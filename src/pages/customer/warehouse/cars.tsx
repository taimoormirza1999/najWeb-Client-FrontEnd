import { Dialog } from '@headlessui/react';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CustomModal from '@/components/customModal';
import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { classNames } from '@/utils/Functions';
import { checkIfLoggedIn, NetworkStatus, postData } from '@/utils/network';

const carTableHeader = [
  { name: 'page.customer.dashboard.table.no' },
  {
    name: 'page.customer.dashboard.table.lot',
  },
  {
    name: 'page.customer.dashboard.table.vin',
  },
  {
    name: 'page.customer.dashboard.table.invoice',
  },
  {
    name: 'page.customer.dashboard.table.driver_name',
  },
  {
    name: 'page.customer.dashboard.table.driver_number',
  },
  {
    name: 'page.customer.dashboard.table.driver_tin',
  },
  {
    name: 'form.account_number',
  },
  {
    name: 'form.routing_number',
  },
  {
    name: 'form.reference_number',
  },
  {
    name: 'page.customer.dashboard.table.approve_payment',
  },
  {
    name: 'page.customer.dashboard.table.created_date',
  },
  {
    name: 'page.customer.dashboard.table.action',
  },
];

export default function WarehouseTowingCars({ page = 0, limit, search = '' }) {
  const intl = useIntl();

  const paginationUrl = `/customer/warehouse/cars?search=${search}&limit=${limit}&page=`;
  const limitUrl = `/customer/warehouse/cars?page=`;
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;

  const [warehouseCars, setWarehouseCars] = useState<any[]>([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [deleteCarModalOpen, setDeleteCarModalOpen] = useState(false);
  const [idToApprove, setIdApprove] = useState(null);
  const [approveCarModalOpen, setApproveCarModalOpen] = useState(false);
  const [carAlreadyExist, setCarAlreadyExist] = useState(false);
  const [newCarModalOpen, setNewCarModalOpen] = useState(false);
  const [formSubmitModal, setFormSubmitModal] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [carData, setCarData] = useState({
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
  const [file, setFile] = useState(null);

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

  const getWarehouseCars = async () => {
    const res = await axios.get(`/api/customer/cars/warehouse_cars/`, {
      params: {
        limit,
        page,
        search,
      },
    });

    setWarehouseCars(res.data ? res.data : []);
  };

  useEffect(() => {
    getWarehouseCars();
  }, [limit, page, search]);

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
    // formData.append('file', file || '');
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

    return;

    const response = await postData(
      '/api/customer/cars/warehouse_cars/',
      formData
    );

    if (response?.success === true) {
      setCarData({
        ...carData,
        id: '',
        lotnumber: '',
        vin: '',
        driver_name: '',
        driver_number: '',
        driver_tin: '',
      });
      setNewCarModalOpen(false);
      setFormSubmitModal({
        status: true,
        type: 'success',
        message: 'Save successfully.',
      });
    } else {
      setFormSubmitModal({
        status: true,
        type: 'error',
        message: 'Unable to save. Something went wrong.',
      });
    }
  };

  const editCar = (id) => {
    axios
      .get(`/api/customer/cars/warehouse_cars/`, {
        params: {
          id,
        },
      })
      .then((response) => {
        setCarData(response.data);
        setNewCarModalOpen(true);
      })
      .catch(() => {
        setFormSubmitModal({
          status: true,
          type: 'error',
          message: 'Unable to edit. Something went wrong.',
        });
      });
  };

  const deleteCar = (id) => {
    axios
      .delete(`/api/customer/warehouse_cars`, {
        params: {
          id,
        },
      })
      .then(() => {
        setFormSubmitModal({
          status: true,
          type: 'success',
          message: 'Deleted successfully.',
        });
        setWarehouseCars(warehouseCars.filter((row) => row?.id !== idToDelete));
      })
      .catch(() => {
        setFormSubmitModal({
          status: true,
          type: 'error',
          message: 'Unable to delete. Something went wrong.',
        });
      });
  };

  const approveToMakePayment = (id) => {
    axios
      .get(`/api/customer/cars/warehouse_cars/`, {
        params: {
          id,
          approve_payment: true,
        },
      })
      .then(() => {
        setFormSubmitModal({
          status: true,
          type: 'success',
          message: 'Approved successfully.',
        });
        getWarehouseCars();
      })
      .catch(() => {
        setFormSubmitModal({
          status: true,
          type: 'error',
          message: 'Unable to update status. Something went wrong.',
        });
      });
  };

  return (
    <Layout
      meta={
        <Meta
          title="Warehouse Towing Cars"
          description="Warehouse Towing Cars"
        />
      }
    >
      <CustomModal
        showOn={formSubmitModal.status}
        initialFocus={null}
        onClose={() => {
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
            onClick={() => {
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

      <CustomModal
        showOn={deleteCarModalOpen}
        initialFocus={null}
        onClose={() => {
          setDeleteCarModalOpen(false);
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <Dialog.Title
            as="h3"
            className="text-xl font-bold leading-6 md:text-2xl lg:text-3xl"
          >
            <FormattedMessage id="page.customer.delete_car" />
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-4 text-lg text-red-700 md:text-xl lg:py-6 lg:text-2xl">
              <FormattedMessage id="page.customer.confirm_proceed" />
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-4 py-1 text-lg font-medium text-white hover:border-0 hover:bg-blue-500 md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              deleteCar(idToDelete);
              setDeleteCarModalOpen(false);
            }}
          >
            <FormattedMessage id="general.continue" />
          </button>
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              setDeleteCarModalOpen(false);
            }}
          >
            <FormattedMessage id="general.cancel" />
          </button>
        </div>
      </CustomModal>

      <CustomModal
        showOn={approveCarModalOpen}
        initialFocus={null}
        onClose={() => {
          setApproveCarModalOpen(false);
        }}
      >
        <div className="text-dark-blue mt-6 text-center sm:mt-16">
          <Dialog.Title
            as="h3"
            className="text-xl font-bold leading-6 md:text-2xl lg:text-3xl"
          >
            <FormattedMessage id="page.customer.approve_payment" />
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-4 py-4 text-lg text-red-600 md:text-xl lg:py-6 lg:text-2xl">
              <FormattedMessage id="page.customer.confirm_proceed" />
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="bg-azure-blue my-4 inline-block max-w-max rounded-md px-4 py-1 text-lg font-medium text-white hover:border-0 hover:bg-blue-500 md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              approveToMakePayment(idToApprove);
              setApproveCarModalOpen(false);
            }}
          >
            <FormattedMessage id="general.continue" />
          </button>
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-4 py-1  text-lg font-medium md:px-10 md:py-2 lg:text-xl"
            onClick={() => {
              setApproveCarModalOpen(false);
            }}
          >
            <FormattedMessage id="general.cancel" />
          </button>
        </div>
      </CustomModal>

      <CustomModal
        showOn={newCarModalOpen}
        initialFocus={null}
        onClose={() => {
          setNewCarModalOpen(false);
          setCarAlreadyExist(false);
          emptyCarData();
        }}
      >
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
        >
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

      <div className="mx-auto px-8">
        <div className="pt-14">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-dark-blue text-3xl font-semibold">
                <FormattedMessage id="page.customer.dashboard.warehouse_cars" />
              </h1>
            </div>
            <button
              className="bg-dark-blue mr-3 rounded-md border-2 border-blue-600 px-3 py-1 text-sm font-medium text-white sm:text-xl"
              onClick={() => {
                setNewCarModalOpen(true);
              }}
            >
              <FormattedMessage id="page.customer.dashboard.add_new_cars" />
            </button>
          </div>
          <div className="flex flex-col">
            <SelectPageRecords url={limitUrl} search={search} />
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-[#005fb7] md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-white">
                      <tr>
                        {carTableHeader.map((th, index) => (
                          <th
                            key={index}
                            scope="col"
                            className="px-3 py-3.5 text-left text-base font-semibold text-blue-600"
                          >
                            <FormattedMessage id={th.name} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {warehouseCars?.length ? (
                        warehouseCars.map((car, index) => (
                          <tr
                            key={index}
                            className={classNames(
                              index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                              'text-sm'
                            )}
                          >
                            <td
                              scope="col"
                              className="w-[2px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {addIndex + index + 1}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[64px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.lotnumber}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[55px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.vin}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.invoice}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                            >
                              {car.driver_name}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[50px] px-3 py-3.5  text-left font-semibold text-[#1C1C1C]"
                            >
                              {car.driver_number} <br />
                            </td>
                            <td
                              scope="col"
                              className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.driver_tin}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.account_number}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.routing_number}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.reference_number}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.visible_create_date}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.customer_approved == '1' ? (
                                <div>
                                  {' '}
                                  Approved on <br />{' '}
                                  {car.customer_approved_date}
                                </div>
                              ) : (
                                <button
                                  className="border-azure-blue text-azure-blue inline-block max-w-max rounded-md border-2 px-2 py-1  text-sm"
                                  onClick={() => {
                                    setIdApprove(car.id);
                                    setApproveCarModalOpen(true);
                                  }}
                                >
                                  <CheckIcon className="text-azure-blue h-3 w-3" />
                                  <FormattedMessage id="page.customer.dashboard.action.approve" />
                                </button>
                              )}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                            >
                              {car.customer_approved === '0' ? (
                                <button
                                  type="button"
                                  className="border-azure-blue text-azure-blue inline-block max-w-max rounded-md border-2 px-2 py-1  text-sm"
                                  onClick={() => {
                                    editCar(car.id);
                                  }}
                                >
                                  <PencilIcon className="text-azure-blue h-3 w-3" />
                                  <FormattedMessage id="page.customer.dashboard.action.edit" />
                                </button>
                              ) : null}

                              {car.customer_approved === '0' ? (
                                <button
                                  type="button"
                                  className="mx-2 inline-block max-w-max rounded-md border-2 border-red-500 px-2 py-1 text-sm  text-red-700"
                                  onClick={() => {
                                    setDeleteCarModalOpen(true);
                                    setIdToDelete(car.id);
                                  }}
                                >
                                  <TrashIcon className="h-3 w-3 text-red-500" />
                                  <FormattedMessage id="page.customer.dashboard.action.delete" />
                                </button>
                              ) : null}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr key={0} className="bg-white text-sm">
                          <td
                            colSpan={13}
                            scope="col"
                            className="w-[2px] px-3 py-3.5 text-center font-semibold text-[#1C1C1C]"
                          >
                            No records
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            totalRecords={warehouseCars?.length || 0}
            page={page}
            url={paginationUrl}
            limit={limit}
          ></Pagination>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  if (!(await checkIfLoggedIn(context))) return NetworkStatus.LOGIN_PAGE;
  const session: any = await getSession(context);

  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  axios.defaults.timeout = 300000;
  const apiUrl = process.env.API_URL;

  const search = context.query.search ? context.query.search : '';
  const page = context.query.page ? context.query.page : 0;
  const limit = context.query.limit ? context.query.limit : '10';

  return {
    props: {
      search,
      limit,
      page,
    },
  };

  try {
    const res = await axios.get(`${apiUrl}warehouseCarRequests`, {
      params: {
        limit,
        page,
        search,
      },
    });

    const warehouseCars = res.data ? res.data : {};

    return {
      props: {
        warehouseCars: warehouseCars?.data || [],
        totalRecords: warehouseCars?.totalRecords || 0,
      },
    };
  } catch (err) {
    return NetworkStatus.LOGIN_PAGE;
  }
}
