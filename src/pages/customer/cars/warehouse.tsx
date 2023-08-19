import { Dialog } from '@headlessui/react';
import {
  CheckCircleIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import WarehouseCarsRequestForm from '@/components/cars/WarehouseCarsRequestForm';
import HeadTextWithIcon from '@/components/common/HeadTextWithIcon';
import SingleImagesViewer from '@/components/common/SingleImagesViewer';
import CustomModal from '@/components/customModal';
import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import TableColumn from '@/components/TableColumn';
import TableHeader from '@/components/TableHeader';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { classNames } from '@/utils/Functions';
import { checkIfLoggedIn, NetworkStatus } from '@/utils/network';

const carTableHeader = [
  { name: 'page.customer.dashboard.table.no' },
  {
    name: 'form.car_photo',
  },
  {
    name: 'page.customer.dashboard.table.detail',
  },
  {
    name: 'page.customer.dashboard.table.lot_vin',
  },
  {
    name: 'page.customer.dashboard.table.title',
  },
  {
    name: 'page.customer.dashboard.table.key',
  },
  {
    name: 'page.customer.dashboard.table.price',
  },
  {
    name: 'page.customer.dashboard.table.eta',
  },
  {
    name: 'page.customer.dashboard.table.driver_name',
  },
  {
    name: 'form.driver_email',
  },
  {
    name: 'form.driver_address',
  },
  {
    name: 'form.account_number',
  },
  {
    name: 'form.destination',
  },
  {
    name: 'page.customer.dashboard.table.approve_payment',
  },
  {
    name: 'page.customer.dashboard.table.action',
  },
];

export default function WarehouseTowingCars({
  page = 0,
  limit,
  search = '',
  vehiclesType,
  carsMaker,
  carsColor,
  ports,
}) {
  const paginationUrl = `/customer/warehouse/cars?search=${search}&limit=${limit}`;
  const limitUrl = `/customer/warehouse/cars?page=0`;
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;

  const [tableRecords, setTableRecords] = useState(0);
  const [warehouseCars, setWarehouseCars] = useState<any[]>([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [deleteCarModalOpen, setDeleteCarModalOpen] = useState(false);
  const [idToApprove, setIdApprove] = useState(null);
  const closeModalRef = useRef(null);
  const [approveCarModalOpen, setApproveCarModalOpen] = useState(false);
  const [newCarModalOpen, setNewCarModalOpen] = useState(false);
  const [formSubmitModal, setFormSubmitModal] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [carsDriver, setCarsDriver] = useState<any[]>([]);

  const [carData, setCarData] = useState({
    id_vehicle_type: '1',
    destination: '6',
  });
  const [tableHeight, setTableHeight] = useState(500);

  const getWarehouseCars = async () => {
    try {
      const res = await axios.get(`/api/customer/cars/warehouse_cars/`, {
        params: {
          limit,
          page,
          search,
        },
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });
      setTableRecords(res.data?.totalRecords || 0);
      setWarehouseCars(res.data ? res.data.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWarehouseCars = async () => {
    try {
      const res = await axios.get(`/api/customer/cars/warehouse_cars/`, {
        params: {
          limit: 'all',
        },
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });

      const listOfTags = res.data ? res.data.data : [];
      const keys = ['driver_name'];
      const filtered = listOfTags.filter(
        (
          (s) => (o) =>
            ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join('|'))
        )(new Set())
      );
      // setCarsDriver(res.data ? res.data.data : []);
      setCarsDriver(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWarehouseCars();
  }, [limit, page, search]);

  useEffect(() => {
    getAllWarehouseCars();

    const calculateTableHeight = () => {
      const newHeight = window?.innerHeight || 0;
      setTableHeight(newHeight * 0.67);
    };
    calculateTableHeight();
    window?.addEventListener('resize', calculateTableHeight);
    return () => window?.removeEventListener('resize', calculateTableHeight);
  }, []);

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
      .delete(`/api/customer/cars/warehouse_cars/`, {
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
        initialFocus={closeModalRef}
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
            ref={closeModalRef}
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

      <CustomModal
        showOn={deleteCarModalOpen}
        initialFocus={closeModalRef}
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
            ref={closeModalRef}
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
        initialFocus={closeModalRef}
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
            ref={closeModalRef}
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
        vehiclesType={vehiclesType}
        carsMaker={carsMaker}
        carsColor={carsColor}
        carsDriver={carsDriver}
        ports={ports}
        setCarData={setCarData}
        newCarModalOpen={newCarModalOpen}
        setNewCarModalOpen={setNewCarModalOpen}
        getWarehouseCars={getWarehouseCars}
        setFormSubmitModal={setFormSubmitModal}
      />

      <div className="m-8">
        <div className="">
          <div className="relative sm:items-center">
            <button
              className="bg-dark-blue absolute mt-2 rounded-md border-2 border-blue-600 px-3 py-1 text-sm font-medium text-white ltr:right-2 ltr:float-right rtl:left-2 rtl:float-left sm:text-xl"
              onClick={() => {
                setNewCarModalOpen(true);
              }}
            >
              <FormattedMessage id="page.customer.dashboard.add_new_cars" />
            </button>
          </div>
          <HeadTextWithIcon
            header={'page.customer.dashboard.warehouse_cars'}
            gicon={'&#xe531;'}
          />

          <div
            className="w-[calc(100vw - 285px)] flex flex-col "
            style={{ maxHeight: tableHeight }}
          >
            <SelectPageRecords url={limitUrl} />
            <div className="mb-1 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-300">
                    <TableHeader tableHeader={carTableHeader} />
                    <tbody>
                      {tableRecords > 0 ? (
                        warehouseCars.map((car, index) => (
                          <tr
                            key={index}
                            className={classNames(
                              index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                              'text-sm'
                            )}
                          >
                            <TableColumn className="w-[2px]">
                              {addIndex + index + 1}
                            </TableColumn>
                            <TableColumn className="">
                              {car.car_photo_file !== '' ? (
                                <>
                                  <SingleImagesViewer
                                    src={car.car_photo_file}
                                    title={'Warehouse Car'}
                                  />
                                  {/* <Link passHref href={car.car_photo_file}>
                                  <a
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:border-b-0"
                                  >
                                    <Image
                                      src={car.car_photo_file}
                                      width={45}
                                      height={45}
                                      alt={car.lotnumber}
                                    />
                                  </a>
                                
                                </Link> */}
                                </>
                              ) : null}
                            </TableColumn>
                            <TableColumn className="min-w-[100px]">
                              {car.carMakerName} {car.carModelName} {car.year}
                            </TableColumn>
                            <TableColumn className="min-w-[155px]">
                              <FormattedMessage id="page.customer.dashboard.table.lot" />
                              : {car.lotnumber} <br />
                              <FormattedMessage id="page.customer.dashboard.table.vin" />
                              : {car.vin} <br />
                              {car.invoice_file !== '' ? (
                                <>
                                  <i className="material-icons -mt-1 align-middle text-sm lg:ltr:mr-1 lg:rtl:ml-1">
                                    &#xe89e;
                                  </i>
                                  <Link href={car.invoice_file} passHref>
                                    <a target="_blank" className="font-bold">
                                      Invoice
                                    </a>
                                  </Link>
                                </>
                              ) : null}
                            </TableColumn>
                            <TableColumn scope="col" className="w-[30px]">
                              {car.car_title === '1' ? (
                                <CheckCircleIcon
                                  className="h-6 w-6 text-green-400"
                                  aria-hidden="true"
                                />
                              ) : (
                                <XCircleIcon
                                  className="h-6 w-6 text-red-400"
                                  aria-hidden="true"
                                />
                              )}
                            </TableColumn>
                            <TableColumn scope="col" className="w-[30px]">
                              {car.car_key === '1' ? (
                                <CheckCircleIcon
                                  className="h-6 w-6 text-green-400"
                                  aria-hidden="true"
                                />
                              ) : (
                                <XCircleIcon
                                  className="h-6 w-6 text-red-400"
                                  aria-hidden="true"
                                />
                              )}
                            </TableColumn>
                            <TableColumn className="min-w-[65px]">
                              <FormattedMessage id="form.sale_price" />: $
                              {car.sale_price} <br />
                              <FormattedMessage id="form.towing_price" />: $
                              {car.towing_price} <br />
                            </TableColumn>
                            <TableColumn className="min-w-[80px]">
                              {car.delivered_date}
                            </TableColumn>
                            <TableColumn className="min-w-[47px]">
                              <FormattedMessage id="form.driver_name" />:{' '}
                              {car.driver_name} <br />
                              <FormattedMessage id="form.driver_number" />:{' '}
                              {car.driver_number} <br />
                              <FormattedMessage id="form.driver_tin" />:{' '}
                              {car.driver_tin}
                            </TableColumn>
                            <TableColumn className="min-w-[50px]">
                              {car.driver_email}
                            </TableColumn>
                            <TableColumn className="min-w-[75px]">
                              <FormattedMessage id="form.zip_code" />:{' '}
                              {car.driver_zip_code} <br />
                              {car.driver_address}
                            </TableColumn>
                            <TableColumn className="min-w-[200px]">
                              <FormattedMessage id="form.account_number" />:{' '}
                              {car.account_number} <br />
                              <FormattedMessage id="form.routing_number" />:{' '}
                              {car.routing_number} <br />
                              <FormattedMessage id="form.reference_number" />:{' '}
                              {car.reference_number}
                            </TableColumn>
                            <TableColumn className="w-[20px]">
                              {car.destination_name}
                            </TableColumn>
                            <TableColumn className="min-w-[50px]">
                              {car.customer_approved === '1' ? (
                                <div>
                                  {' '}
                                  Approved on <br />{' '}
                                  {car.customer_approved_date}
                                </div>
                              ) : null}

                              {car.customer_approved === '0' &&
                              car.car_id > '0' ? (
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
                              ) : null}

                              {car.customer_approved === '0' &&
                              car.car_id === '0' ? (
                                <div className="text-dark-blue font-bold">
                                  Pending <br />
                                  From NAJ
                                </div>
                              ) : null}
                            </TableColumn>
                            <TableColumn className="min-w-[47px]">
                              <div className="flex flex-col gap-2">
                                {car.customer_approved === '0' &&
                                car.car_id === '0' ? (
                                  <>
                                    <button
                                      type="button"
                                      className="border-azure-blue text-azure-blue inline-block min-w-[55px] max-w-max rounded-md border-2 px-2 py-1  text-sm"
                                      onClick={() => {
                                        editCar(car.id);
                                      }}
                                    >
                                      <PencilIcon className="text-azure-blue h-3 w-3" />
                                      <FormattedMessage id="page.customer.dashboard.action.edit" />
                                    </button>{' '}
                                  </>
                                ) : null}

                                {car.customer_approved === '0' &&
                                car.car_id === '0' ? (
                                  <button
                                    type="button"
                                    className="inline-block max-w-max rounded-md border-2 border-red-500 px-2 py-1 text-sm  text-red-700"
                                    onClick={() => {
                                      setDeleteCarModalOpen(true);
                                      setIdToDelete(car.id);
                                    }}
                                  >
                                    <TrashIcon className="h-3 w-3 text-red-500" />
                                    <FormattedMessage id="page.customer.dashboard.action.delete" />
                                  </button>
                                ) : null}
                              </div>
                            </TableColumn>
                          </tr>
                        ))
                      ) : (
                        <tr key={0} className="bg-white text-sm">
                          <TableColumn
                            colSpan={carTableHeader.length}
                            className="w-[2px] text-center"
                          >
                            No records
                          </TableColumn>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            totalRecords={tableRecords || 0}
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
  const apiUrl = process.env.API_URL;
  const search = context.query.search ? context.query.search : '';
  const page = context.query.page ? context.query.page : 0;
  const limit = context.query.limit ? context.query.limit : '10';

  const resType = await axios.get(`${apiUrl}getVehicleTypes`);
  const vehiclesType = resType.data ? resType.data.data : [];

  const resMaker = await axios.get(`${apiUrl}getMakerAll`);
  const carsMaker = resMaker.data ? resMaker.data.data : [];

  const resColor = await axios.get(`${apiUrl}getColors`);
  const carsColor = resColor.data ? resColor.data.data : [];

  const resPort = await axios.get(
    `${apiUrl}general/getCountryPorts/?limit=100`
  );
  const ports = resPort.data ? resPort.data.data : [];

  return {
    props: {
      page,
      limit,
      search,
      vehiclesType,
      carsMaker,
      carsColor,
      ports,
    },
  };
}
