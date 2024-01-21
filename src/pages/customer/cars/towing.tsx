import { Dialog } from '@headlessui/react';
import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import AgencyDocument from '@/components/cars/AgencyDocument';
import TowingCarsRequestForm from '@/components/cars/TowingCarsRequestForm';
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
    name: 'form.purchase_date',
  },
  {
    name: 'page.customer.dashboard.table.title',
  },
  {
    name: 'page.customer.dashboard.table.key',
  },
  {
    name: 'form.sale_price',
  },
  {
    name: 'form.region',
  },
  {
    name: 'form.state',
  },
  {
    name: 'form.city',
  },
  {
    name: 'form.address',
  },
  {
    name: 'form.focal_person',
  },
  {
    name: 'form.destination',
  },
  {
    name: 'page.customer.dashboard.table.action',
  },
];

export default function TowingCars({
  page = 0,
  limit,
  search = '',
  vehiclesType,
  carsMaker,
  carsColor,
  ports,
  regions,
}) {
  const paginationUrl = `/customer/cars/towing?search=${search}&limit=${limit}`;
  const limitUrl = `/customer/cars/towing?page=0`;
  const addIndex = parseInt(limit, 10) && page ? page * limit : 0;
  const intl = useIntl();

  const [tableRecords, setTableRecords] = useState(0);
  const [warehouseCars, setWarehouseCars] = useState<any[]>([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [deleteCarModalOpen, setDeleteCarModalOpen] = useState(false);
  const [idToApprove, setIdApprove] = useState(null);
  const closeModalRef = useRef(null);
  const [approveCarModalOpen, setApproveCarModalOpen] = useState(false);
  const [newCarModalOpen, setNewCarModalOpen] = useState(false);
  const [agencyModalOpen, setAgencyModalOpen] = useState(false);
  const [formSubmitModal, setFormSubmitModal] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [carData, setCarData] = useState({
    external_car: '1',
    id_vehicle_type: '1',
    destination: '6',
    customer_approved: '1', // auto approved for these cars
  });
  const [tableHeight, setTableHeight] = useState(500);

  const getWarehouseCars = async () => {
    try {
      const res = await axios.get(`/api/customer/cars/warehouseCars/`, {
        params: {
          limit,
          page,
          search,
          externalCar: '1',
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

  useEffect(() => {
    getWarehouseCars();
  }, [limit, page, search]);

  useEffect(() => {
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
      .get(`/api/customer/cars/warehouseCars/`, {
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
      .delete(`/api/customer/cars/warehouseCars/`, {
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
      .get(`/api/customer/cars/warehouseCars/`, {
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
          title={intl.formatMessage({ id: 'page.title.towing_cars' })}
          description={intl.formatMessage({ id: 'page.desc.towing_cars' })}
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

      <TowingCarsRequestForm
        carData={carData}
        vehiclesType={vehiclesType}
        carsMaker={carsMaker}
        carsColor={carsColor}
        ports={ports}
        regions={regions}
        setCarData={setCarData}
        newCarModalOpen={newCarModalOpen}
        setNewCarModalOpen={setNewCarModalOpen}
        getWarehouseCars={getWarehouseCars}
        setFormSubmitModal={setFormSubmitModal}
      />

      <AgencyDocument
        agencyModalOpen={agencyModalOpen}
        setAgencyModalOpen={setAgencyModalOpen}
        setFormSubmitModal={setFormSubmitModal}
      />

      <div className="m-8">
        <div className="">
          <div className="relative sm:items-center">
            <button
              className="bg-dark-blue absolute mt-2 rounded-md border-2 border-blue-600 px-3 py-1 text-sm font-medium text-white ltr:right-[12rem] ltr:float-right rtl:left-[12rem] rtl:float-left sm:text-xl"
              onClick={() => {
                setNewCarModalOpen(true);
              }}
            >
              <FormattedMessage id="page.customer.dashboard.add_new_cars" />
            </button>
            <button
              className="bg-outer-space absolute mt-2 rounded-md border-2 border-gray-600 px-3 py-1 text-sm font-medium text-white ltr:right-2 ltr:float-left rtl:left-2 rtl:float-right sm:text-xl"
              onClick={() => {
                setAgencyModalOpen(true);
              }}
            >
              <FormattedMessage id="page.modal.title.agency_details" />
            </button>
          </div>
          <HeadTextWithIcon
            header={'page.customer.dashboard.towing_cars'}
            gicon={'&#xe531;'}
          />

          <div
            className="w-[calc(100vw - 285px)] flex flex-col "
            style={{ maxHeight: tableHeight }}
          >
            <SelectPageRecords url={limitUrl} />
            <div className="-mx-4 mb-1 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                            <TableColumn className="w-[50px]">
                              {car.car_photo_file !== '' ? (
                                <>
                                  <SingleImagesViewer
                                    src={car.car_photo_file}
                                    title={'Towing Car'}
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
                              <br />
                              <FormattedMessage id="page.table.pin" />:{' '}
                              {car.gate_pass_pin}
                            </TableColumn>
                            <TableColumn className="min-w-[50px]">
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
                            <TableColumn className="min-w-[80px]">
                              {car.purchase_date}
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
                            <TableColumn className="min-w-[35px]">
                              ${car.sale_price}
                            </TableColumn>
                            <TableColumn className="min-w-[30px]">
                              {car.region_name}
                            </TableColumn>
                            <TableColumn className="min-w-[30px]">
                              {car.state_name}
                            </TableColumn>
                            <TableColumn className="min-w-[30px]">
                              {car.city_name}
                            </TableColumn>
                            <TableColumn className="w-[120px]">
                              {car.region_address}
                            </TableColumn>
                            <TableColumn className="w-[20px]">
                              {car.focal_person_phone}
                            </TableColumn>
                            <TableColumn className="w-[20px]">
                              {car.destination_name}
                            </TableColumn>
                            <TableColumn className="min-w-[47px]">
                              <div className="flex flex-col gap-2">
                                {car.car_id === '0' ? (
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

                                {car.car_id === '0' ? (
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

  const resRegions = await axios.get(`${apiUrl}general/getAuctionsRegions/`);
  const regions = resRegions.data ? resRegions.data.data : [];

  return {
    props: {
      page,
      limit,
      search,
      vehiclesType,
      carsMaker,
      carsColor,
      ports,
      regions,
    },
  };
}
