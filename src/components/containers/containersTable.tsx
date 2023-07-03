import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CustomModal from '@/components/customModal';
import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { classNames } from '@/utils/Functions';

import ImagesViewer from '../cars/ImagesViewer';
import TableColumn from '../TableColumn';
import TableHeader from '../TableHeader';
import { ArrivedPortCars } from './arrivedPortCars';
import { ArrivedStoreCars } from './arrivedStoreCars';
import { InShippingCars } from './inShippingCars';

export interface ContainerDetail {
  lock_number: string;
  size: string;
  weight: string;
  bl_file: string;
}

const carTableHeader = [
  { name: 'page.customer.dashboard.table.no' },
  { name: 'page.customer.dashboard.table.images' },
  {
    name: 'page.customer.container.container_number',
    order: 'container_number',
  },
  {
    name: 'page.customer.container.invoice',
  },
  {
    name: 'page.customer.container.booking',
    order: 'booking_number',
  },
  {
    name: 'page.customer.container.departure',
    order: 'departure',
  },
  {
    name: 'page.customer.container.destination',
    order: 'destination',
  },
  {
    name: 'page.customer.container.status',
  },
  {
    name: 'page.customer.container.total_cars',
    order: 'total_cars',
  },
  {
    name: 'page.customer.container.loaded_date',
    order: 'loaded_date',
  },
  {
    name: 'page.customer.container.etd',
    order: 'etd',
  },
  {
    name: 'page.customer.container.shipping_date',
    order: 'shipping_date',
  },
  {
    name: 'page.customer.container.eta',
    order: 'eta',
  },
  {
    name: 'page.customer.container.arrived_port_date',
    order: 'arrived_port_date',
  },
  {
    name: 'page.customer.container.arrived_store_date',
    order: 'arrived_store_date',
  },
  {
    name: 'page.customer.container.cars_shipping_amount',
    order: 'total_shipping',
  },
];

const ContainerHeader = [
  {
    header: 'page.customer.container.seal_no',
  },
  {
    header: 'page.customer.container.size',
  },
  {
    header: 'page.customer.container.weight',
  },
  {
    header: 'page.customer.container.bl_file',
  },
];
const ContainersTable = ({
  records,
  totalRecords,
  tab,
  page = 0,
  limit,
  search = '',
  order = '',
  type = '',
}) => {
  const paginationUrl = `/customer/containers?tab=${tab}&search=${search}&type=${type}&order=${order}&limit=${limit}`;
  const router = useRouter();
  const exportUrl = `?tab=${tab}&search=${search}&type=${type}&order=${order}&date_from=${
    router.query?.date_from ? router.query.date_from : ''
  }&date_to=${router.query?.date_to ? router.query.date_to : ''}&date_type=${
    router.query?.date_type ? router.query.date_type : ''
  }&region=${router.query?.region ? router.query.region : ''}`;
  const limitUrl = `/customer/containers?tab=${tab}&type=${type}&order=${order}&page=`;
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const cancelDetailButtonRef = useRef(null);
  const [containerDetail, setContainerDetail] = useState<ContainerDetail>({
    lock_number: '',
    size: '',
    weight: '',
    bl_file: '',
  });

  const [carsModalOpen, setCarsModalOpen] = useState(false);
  const cancelCarsButtonRef = useRef(null);
  const [containerCars, setContainerCars] = useState([]);
  const containerCarsTable = useRef('inShippingCars');
  const containerData = useRef({
    container_number: '',
    status: '',
    total_cars: 0,
  });

  const getContainerCars = async (containerRow) => {
    const { status } = containerRow;
    let carsUrl = 'inShippingCars';
    if (status === 'Arrived Port') {
      carsUrl = 'arrivedPortCars';
    } else if (status === 'Arrived Store') {
      carsUrl = 'arrivedStoreCars';
    }
    containerCarsTable.current = carsUrl;
    containerData.current = {
      container_number: containerRow.container_number,
      status,
      total_cars: containerRow.total_cars,
    };

    await axios
      .get(`/api/customer/container/${carsUrl}`, {
        params: {
          container_id: containerRow.container_id,
        },
      })
      .then((res) => {
        setContainerCars(res.data.data);
        setCarsModalOpen(true);
      })
      .catch(() => {});
  };

  const getContainerDetail = async (container_id) => {
    await axios
      .get(`/api/customer/container/detail`, {
        params: {
          container_id,
        },
      })
      .then((res) => {
        setContainerDetail(res.data.data);
        setDetailModalOpen(true);
      })
      .catch(() => {});
  };

  const openTracking = async (container) => {
    // TO-DO:
    // Put the tracking links in constants file after Ibrahem's merge.
    const company = parseInt(container.shipping_company_id, 10);

    switch (company) {
      case 5:
        window.open(
          `https://www.maersk.com/tracking/${container.container_number}`,
          '_blank'
        );
        break;
      case 55:
        window.open(
          `https://www.hmm21.com/e-service/general/trackNTrace/TrackNTrace.do?cntrNo=${container.container_number}`,
          '_blank'
        );
        break;
      case 10:
        window.open(
          `https://www.hmm21.com/e-service/general/trackNTrace/TrackNTrace.do?cntrNo=${container.container_number}`,
          '_blank'
        );
        break;
      case 23:
        window.open(
          `https://www.hapag-lloyd.com/en/online-business/track/track-by-container-solution.html?container=${container.container_number}`,
          '_blank'
        );
        break;
      case 9:
        window.open(
          `https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking?redir=Y&ctrack-field=${container.container_number}&sessLocale=en&trakNoParam=${container.container_number}`,
          '_blank'
        );
        break;
      default:
        getContainerDetail(container.container_id);
        break;
    }
  };

  const exportExcel = async () => {
    window.open(`/api/customer/container/export${exportUrl}`, '_blank');
  };

  const isTrackingPossible = (container) => {
    const trackablelines = [5, 55, 10, 23, 9];
    if (
      trackablelines.indexOf(parseInt(container.shipping_company_id, 10)) !== -1
    ) {
      return true;
    }
    return false;
  };

  return (
    <div role="tabpanel">
      <CustomModal
        showOn={detailModalOpen}
        initialFocus={cancelDetailButtonRef}
        onClose={() => {
          setDetailModalOpen(false);
        }}
      >
        <div className="text-dark-blue">
        <div
            className="float-right mr-[14px] mt-[-5px] cursor-pointer text-[25px] font-bold text-red-400"
            onClick={() => {
              setDetailModalOpen(false);
            }}
            ref={cancelDetailButtonRef}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <Dialog.Title
            as="h6"
            className="mb-8 text-xl font-bold leading-6 md:text-xl lg:text-2xl"
          >
            <FormattedMessage id="page.container.detail" />
          </Dialog.Title>
        
          <div className="mt-4">
            <table className="all_tables min-w-full divide-y divide-gray-300">
              {/* <thead className="bg-white">
                <tr>
                  <th>Seal No</th>
                  <th>Size</th>
                  <th>Weight</th>
                  <th>BL File</th>
                </tr>
              </thead> */}
              <TableHeader tableHeader={ContainerHeader} />

              <tbody>
                <tr>
                  <TableColumn className="py-2">
                    {containerDetail.lock_number}
                  </TableColumn>
                  <TableColumn className="py-2">
                    {containerDetail.size}
                  </TableColumn>
                  <TableColumn className="py-2">
                    {containerDetail.weight}
                  </TableColumn>
                  <TableColumn className="py-2">
                    {containerDetail.bl_file !== '' ? (
                      <Link href={containerDetail.bl_file} passHref>
                        <a target="_blank">Download</a>
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableColumn>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="close-button"
            onClick={() => {
              setDetailModalOpen(false);
            }}
            ref={cancelDetailButtonRef}
          >
            <FormattedMessage id="general.close" />
          </button>
        </div>
      </CustomModal>

      <CustomModal
        showOn={carsModalOpen}
        initialFocus={cancelCarsButtonRef}
        customSize={true}
        onClose={() => {
          setCarsModalOpen(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 inline-block w-4/5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-lg transition-all sm:p-6 sm:align-middle lg:w-4/5 xl:w-4/5">
          <div className="text-dark-blue">
            <Dialog.Title
              as="h6"
              className="mb-8 text-xl font-bold leading-6 md:text-xl lg:text-2xl"
            >
              <FormattedMessage id="page.container.cars" />
              <div
                className="float-right mr-[14px] mt-2 cursor-pointer text-[25px] font-bold text-red-400"
                onClick={() => {
                  setCarsModalOpen(false);
                }}
                ref={cancelCarsButtonRef}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </Dialog.Title>
            <div className="mt-4">
              <div className="my-4">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="font-bold">
                      <FormattedMessage id="page.customer.container.container_number" />
                      :
                    </div>
                    <div className="pl-1">
                      {containerData.current.container_number}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="font-bold">
                      <FormattedMessage id="page.customer.container.invoice" />:
                    </div>
                    <div className="pl-1">
                      {containerData.current.container_number}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="font-bold">
                      <FormattedMessage id="page.customer.container.status" />:
                    </div>
                    <div className="pl-1">{containerData.current.status}</div>
                  </div>
                  <div className="flex">
                    <div className="font-bold">
                      <FormattedMessage id="page.customer.container.total_cars" />
                      :{' '}
                    </div>
                    <div className="pl-1">
                      {containerData.current.total_cars}
                    </div>
                  </div>
                </div>
              </div>

              {(() => {
                if (containerCarsTable.current === 'arrivedStoreCars') {
                  return <ArrivedStoreCars cars={containerCars} />;
                }
                if (containerCarsTable.current === 'arrivedPortCars') {
                  return <ArrivedPortCars cars={containerCars} />;
                }
                return <InShippingCars cars={containerCars} />;
              })()}
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4 sm:mt-6">
            <button
              type="button"
              className="close-button"
              onClick={() => {
                setCarsModalOpen(false);
              }}
              ref={cancelCarsButtonRef}
            >
              <FormattedMessage id="general.close" />
            </button>
          </div>
        </div>
      </CustomModal>
      <div className="pt-14">
        <div className="flex flex-col">
          <SelectPageRecords url={limitUrl} />
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <button
                onClick={exportExcel}
                className="mb-4 flex items-center gap-1 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                type="button"
              >
                <i className="material-icons text-xl">&#xef42;</i> Excel
              </button>

              <div className="overflow-hidden">
                <table
                  id="customrContainers"
                  className="min-w-full divide-y divide-gray-300"
                >
                  {/* <thead className="bg-white">
                    <tr>
                      {carTableHeader.map((th, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-3 py-3.5 text-left text-base font-semibold text-blue-600 border-[#005FB7] border-[1px] "
                        >
                          <div className="flex items-center justify-between">
                            <FormattedMessage id={th.name} />
                            <Sort
                              order={order}
                              elemOrder={th.order}
                              index={index}
                            />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead> */}
                  <TableHeader tableHeader={carTableHeader} order={order} />

                  <tbody>
                    {records.map((row, index) => (
                      <tr
                        key={index}
                        className={classNames(
                          index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                          'text-sm'
                        )}
                      >
                        <TableColumn scope="col" className="min-w-[70px]">
                          {index + 1 + page * (limit === 'all' ? 0 : limit)}
                        </TableColumn>
                        <TableColumn className="w-[5px]">
                          <ImagesViewer
                            loading={true}
                            warehouse={false}
                            store={false}
                            car_id={row.car_id}
                            container_no={row.container_number}
                          />
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="border-dark-blue min-w-[120px] cursor-pointer text-left font-semibold text-[#1C1C1C] underline"
                        >
                          <span
                            onClick={async () => {
                              getContainerDetail(row.container_id);
                            }}
                          >
                            {row.container_number}
                          </span>
                          {isTrackingPossible(row) ? (
                            <button
                              onClick={async () => {
                                openTracking(row);
                              }}
                              className="text-dark-blue float-right mr-2 inline-block hover:text-blue-500"
                              type="button"
                            >
                              <i className="material-icons text-xl">&#xe558;</i>{' '}
                            </button>
                          ) : (
                            ''
                          )}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px] ">
                          {row.all_cars_completed === '1' ? (
                            <Link
                              href={{
                                pathname: '/customer/containers/invoice/',
                                query: { id: row.container_id },
                              }}
                            >
                              <a target="_blank">{row.invoice_no}</a>
                            </Link>
                          ) : (
                            '-'
                          )}
                        </TableColumn>

                        <TableColumn scope="col" className="min-w-[70px] ">
                          {row.booking_number}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[150px] ">
                          {row.pol_name}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px] ">
                          {row.destination}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[150px] ">
                          {row.status}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="min-w-[70px] text-center"
                        >
                          <span
                            className="border-dark-blue bg-dark-blue my-[0.5px] cursor-pointer rounded-md border-[1px] px-2 py-1 text-white"
                            onClick={async () => {
                              getContainerCars(row);
                            }}
                          >
                            {row.total_cars}
                          </span>
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {row.loaded_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {row.etd}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {row.shipping_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {row.eta}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {row.arrived_port_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {row.arrived_store_date}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[70px]">
                          {row.total_shipping}
                        </TableColumn>
                      </tr>
                    ))}
                    {records?.length < 1 ? (
                      <tr>
                        <TableColumn
                          scope="col"
                          colSpan={carTableHeader.length}
                          className="min-w-[70px] px-3 py-3.5 text-center font-semibold text-[#1C1C1C]"
                        >
                          No records
                        </TableColumn>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          totalRecords={totalRecords}
          page={page}
          url={paginationUrl}
          limit={limit}
        ></Pagination>
      </div>
    </div>
  );
};

export { ContainersTable };
