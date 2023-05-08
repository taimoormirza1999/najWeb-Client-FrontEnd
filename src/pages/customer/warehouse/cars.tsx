import { Dialog } from '@headlessui/react';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import WarehouseCarsRequestForm from '@/components/cars/WarehouseCarsRequestForm';
import CustomModal from '@/components/customModal';
import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import TableHeader from '@/components/TableHeader';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { classNames } from '@/utils/Functions';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

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
      .catch((error) => {
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

      <WarehouseCarsRequestForm
        carData={carData}
        setCarData={setCarData}
        newCarModalOpen={newCarModalOpen}
        setNewCarModalOpen={setNewCarModalOpen}
        getWarehouseCars={getWarehouseCars}
        setFormSubmitModal={setFormSubmitModal}
      />

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
                    <TableHeader tableHeader={carTableHeader} />
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
                              {car.invoice_file !== '' ? (
                                <>
                                  <i className="material-icons -mt-1 align-middle text-sm lg:ltr:mr-1 lg:rtl:ml-1">
                                    &#xe89e;
                                  </i>
                                  <Link href={car.invoice_file} passHref>
                                    <a target="_blank">File</a>
                                  </Link>
                                </>
                              ) : null}
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
                              {car.customer_approved === '1' ? (
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
                              className="min-w-[50px] px-3 py-3.5 text-left  font-semibold text-[#1C1C1C]"
                            >
                              {car.visible_create_date}
                            </td>
                            <td
                              scope="col"
                              className="min-w-[47px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C]"
                            >
                              {car.customer_approved === '0' &&
                              car.car_id === '0' ? (
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

                              {car.customer_approved === '0' &&
                              car.car_id === '0' ? (
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
}
