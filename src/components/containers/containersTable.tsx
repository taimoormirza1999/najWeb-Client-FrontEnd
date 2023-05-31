import { Dialog } from '@headlessui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormattedMessage } from 'react-intl';

import CustomModal from '@/components/customModal';
import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import { Sort } from '@/components/dashboard/sort';
import { classNames } from '@/utils/Functions';

import { ArrivedPortCars } from './arrivedPortCars';
import { ArrivedStoreCars } from './arrivedStoreCars';
import { InShippingCars } from './inShippingCars';
import TableHeader from '../TableHeader';
import TableColumn from '../TableColumn';

export interface ContainerDetail {
  lock_number: string;
  size: string;
  weight: string;
  bl_file: string;
}

const carTableHeader = [
  { name: 'page.customer.dashboard.table.no' },
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
          <Dialog.Title
            as="h6"
            className="mb-8 text-xl font-bold leading-6 md:text-xl lg:text-2xl"
          >
            <FormattedMessage id="page.container.detail" />
          </Dialog.Title>
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-white">
                <tr>
                  <th>Seal No</th>
                  <th>Size</th>
                  <th>Weight</th>
                  <th>BL File</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{containerDetail.lock_number}</td>
                  <td>{containerDetail.size}</td>
                  <td>{containerDetail.weight}</td>
                  <td>
                    {containerDetail.bl_file !== '' ? (
                      <Link href={containerDetail.bl_file} passHref>
                        <a target="_blank">Download</a>
                      </Link>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4 sm:mt-6">
          <button
            type="button"
            className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-2 py-1  text-sm md:px-5 md:py-2 lg:text-lg"
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
              className="border-azure-blue text-azure-blue my-4 inline-block max-w-max rounded-md border-2 px-2 py-1  text-sm md:px-5 md:py-2 lg:text-lg"
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
              <ReactHTMLTableToExcel
                id="containers-xls-button"
                className="mb-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                table="customrContainers"
                filename="customrContainers"
                sheet="tablexls"
                buttonText="Excel"
              />
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
                        <TableColumn
                          scope="col"
                          className="w-[2px]"
                        >
                          {index + 1 + page * (limit === 'all' ? 0 : limit)}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px] cursor-pointer px-3 py-3.5 text-left font-semibold text-[#1C1C1C] underline border-dark-blue border-[1px]"
                        >
                          <span
                            onClick={async () => {
                              getContainerDetail(row.container_id);
                            }}
                          >
                            {row.container_number}
                          </span>
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
                        >
                          {row.all_cars_completed === '1' ? (
                            <Link
                              href={{
                                pathname: '/customer/containers/invoice/',
                                query: { id: row.container_id },
                              }}
                            >
                              <a target="_blank">{row.container_id}</a>
                            </Link>
                          ) : (
                            '-'
                          )}
                        </TableColumn>

                        <TableColumn
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
                        >
                          {row.booking_number}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
                        >
                          {row.pol_name}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
                        >
                          {row.destination}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px] px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]"
                        >
                          {row.status}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px]"
                        >
                          <span
                            className="bg-dark-blue cursor-pointer rounded-md px-4 py-1 text-white border-dark-blue border-[1px]"
                            onClick={async () => {
                              getContainerCars(row);
                            }}
                          >
                            {row.total_cars}
                          </span>
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px]"
                        >
                          {row.loaded_date}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px]"
                        >
                          {row.etd}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px]"
                        >
                          {row.shipping_date}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px]"
                        >
                          {row.eta}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px]"
                        >
                          {row.arrived_port_date}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px]"
                        >
                          {row.arrived_store_date}
                        </TableColumn>
                        <TableColumn
                          scope="col"
                          className="w-[2px]"
                        >
                          {row.total_shipping}
                        </TableColumn>
                      </tr>
                    ))}
                    {records?.length < 1 ? (
                      <tr>
                        <TableColumn
                          scope="col"
                          colSpan={carTableHeader.length}
                          className="w-[2px] px-3 py-3.5 text-center font-semibold text-[#1C1C1C]"
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
