"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import HeadTextWithIcon from '@/components/common/HeadTextWithIcon';
import { Listbox } from '@headlessui/react';
import { Meta } from '@/layout/Meta';
import { Layout } from '@/templates/layoutDashboard';
import { grantIfLogin } from '@/utils/network';
import TableHeader from '@/components/TableHeader';
import TableColumn from '@/components/TableColumn';
import axios from 'axios';
import { classNames } from '@/utils/Functions';
import FormWizard from "react-form-wizard-component";
import 'react-form-wizard-component/dist/style.css';
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import {
  Pagination,
  SelectPageRecords,
} from '@/components/dashboard/pagination';
import SingleImagesViewer from '@/components/common/SingleImagesViewer';
import CustomModal from '@/components/customModal';
import Select from 'react-select';
import { CarIcon, SpinnerIcon } from '@/components/themeIcons';
const ReactSelectStyle = (baseStyles, state) => ({
  ...baseStyles,
  // Custom styles for single value (when only one option is selected)
  singleValue: (provided, state) => ({
    ...provided,
    backgroundColor: '#e2e8f0', // Background color for the single selected value
    color: '#2d3748', // Text color for the single selected value
    padding: '0 6px', // Optional padding
  }),
  // Custom styles for multi-values (when multiple options are selected)
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: '#e2e8f0', // Background color for each selected value
    color: '#2d3748', // Text color for each selected value
    borderRadius: '4px', // Optional border radius
  }),
  // Custom styles for multi-value label (remove border radius if needed)
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: '#2d3748', // Text color for multi-value labels
  }),
  // Custom styles for multi-value remove (remove button styling if needed)
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: '#e53e3e', // Color of the remove button
    ':hover': {
      backgroundColor: '#e53e3e', // Background color of the remove button on hover
      color: 'white',
    },
  }),
});
import { StylesConfig } from 'react-select';

const colourStyles: StylesConfig<ColourOption, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white', // Background color of the control
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
        ? '#3182ce' // Background color of the selected option
        : isFocused
          ? '#ebf8ff' // Background color of the focused option
          : undefined,
    color: isDisabled
      ? '#ccc' // Color for disabled options
      : isSelected
        ? 'white' // Text color for selected options
        : 'black', // Text color for other options
    cursor: isDisabled ? 'not-allowed' : 'default',

    ':active': {
      ...styles[':active'],
      backgroundColor: !isDisabled
        ? isSelected
          ? '#3182ce' // Background color when an option is selected and active
          : '#b9e2ff' // Background color when an option is active but not selected
        : undefined,
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#e2e8f0', // Background color for selected values
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#2d3748', // Text color for selected values
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#e53e3e', // Color of the remove button
    ':hover': {
      backgroundColor: '#e53e3e', // Background color of the remove button on hover
      color: 'white', // Text color of the remove button on hover
    },
  }),
};



const DamageRequests = () => {

  const intl = useIntl();
  const [warehouseCars, setWarehouseCars] = useState([]);
  const [lotNumbers, setLotNumbers] = useState([]);
  const closeModalRef = useRef(null);
  const [damageModalOpen, setDamageModalOpen] = useState(false);
  const { data: session } = useSession();
  const damageParts = [
    { id: 1, name: 'Front Bumper' },
    { id: 2, name: 'Rear Windshield' },
    { id: 3, name: 'Left Front Door' },
    { id: 4, name: 'Right Rear Tire' },
    { id: 5, name: 'Hood' },
    { id: 6, name: 'Trunk Lid' },
  ];
  const [selectedDamageParts, setSelectedDamageParts] = useState([]);
  const [selectedLot, setSelectedLot] = useState(null);
  const [carData, setcarData] = useState(null);
  const carTableHeader = [
    { name: 'page.customer.dashboard.table.no' },
    { name: 'form.car_photo' },
    { name: 'page.customer.dashboard.table.lot_vin' },
    { name: 'page.customer.dashboard.table.detail' },
    { name: 'page.customer.dashboard.table.purchase_date' },
    { name: 'requestNumber' },
    { name: 'customer.price' },
    { name: 'customer.status' },
    { name: 'page.customer.dashboard.table.notes' },
    { name: 'statement.filter.currency' },
    { name: 'customer.date' },
    { name: 'page.customer.dashboard.table.created_date' },
  ];
  const fetchDamageRequestData = async (customerId) => {
    try {
      const url = '/api/customer/damageCar/damageRequests';
      const response = await axios.get(url, {
        params: { customer_id: customerId } // Ensure the parameter name matches
      });
      setWarehouseCars(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchLotNumbersDamageData = async (customerId) => {
    try {
      const url = `/api/customer/damageCar/lotNumbersDamage?customer_id=${customerId}`;
      const response = await axios.get(url);
      setLotNumbers(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  useEffect(() => {
    // if (session?.profile && session.profile.length > 0) {
    const customerId = 2449;
    fetchDamageRequestData(customerId);
    fetchLotNumbersDamageData(customerId);
    // }
  }, []);
  useEffect(() => {
    getCarInfo(selectedLot?.value);
  }, [selectedLot]);



  const getCarInfo = async (valTo) => {
    try {
      const url = `/api/customer/damageCar/carInfo?car_id=${valTo}`;
      const response = await fetch(url);
      const json = await response.json();
      setcarData(json.data[0]);
      // console.log(carData)
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  const handleLotChange = (option) => {
    setSelectedLot(option);

    console.log("Selected Lot")
    console.log(selectedLot.value)
  };

  const handleDamagePartsChange = (options) => {
    setSelectedDamageParts(options);
  };
  const handleComplete = () => {
    console.log("Form completed!");
    // Handle form completion logic here
  };
  const tabChanged = ({
    prevIndex,
    nextIndex,
  }: {
    prevIndex: number;
    nextIndex: number;
  }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };
  return (
    <Layout>

      <div className="m-8">
        {/* <HeadTextWithIcon header={intl.formatMessage({ id: 'page.customer.dashboard.navigation_damage_requests' })} gicon={'&#xe531;'} /> */}
        <div className="flex justify-between  align-middle items-center" >
          <HeadTextWithIcon header={intl.formatMessage({ id: 'page.customer.dashboard.navigation_damage_requests' })} gicon={'&#xe531;'} />
          <button
            className="h-12 bg-dark-blue  mt-2 rounded-md border-2 border-blue-600 px-3 py-1 text-sm font-medium text-white ltr:right-[12rem] sm:text-xl"
            onClick={() => {
              setDamageModalOpen(true);
            }}
          >
            <FormattedMessage id="page.customer.dashboard.add_new_cars" />
          </button>
        </div>
        <div className="w-[calc(100vw - 285px)] flex flex-col">

          <div className="-mx-4 mb-1 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-300">
                  <TableHeader tableHeader={carTableHeader} />
                  <tbody>
                    {warehouseCars.map((car, index) => (
                      <tr
                        key={index}
                        className={classNames(
                          index % 2 === 0 ? 'bg-light-grey' : 'bg-white',
                          'text-sm'
                        )}>
                        <TableColumn scope="col" className="w-[2px] ">{index + 1}</TableColumn>
                        <TableColumn scope="col" className="min-w-[56px] ">
                          {/* <ImagesViewer
                            loading={false}
                            warehouse={true}
                            store={false}
                            car_id={car.id}
                            single_image={car.photo}
                            // container_no={row.container_number}
                          /> */}
                          <SingleImagesViewer
                            src={car.photo}
                            title={'Damage Car'}
                          />
                        </TableColumn>
                        {/* <TableColumn scope="col" className="min-w-[56px] "><img src={car.photo} alt={car.id} className="w-16 h-16 object-cover" /></TableColumn> */}
                        <TableColumn scope="col" className="min-w-[10px] ">
                          Lot: {car.lotnumber} <br /> Vin: {car.vin}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[180px] ">
                          {car.carMakerName} {car.carModelName} {car.year}
                        </TableColumn>
                        <TableColumn scope="col" className="min-w-[10px] ">{car.purchasedate}</TableColumn>
                        <TableColumn scope="col" className="w-[2px] ">{car.request_number}</TableColumn>
                        <TableColumn scope="col" className="w-[2px] ">{car.customer_price ? car.customer_price : intl.formatMessage({ id: 'page.customer.dashboard.table.no' })}</TableColumn>
                        <TableColumn scope="col" className="w-[2px] ">{car.customer_status == 0 ? intl.formatMessage({ id: 'in.progress' }) : car.customer_status == 1 ? intl.formatMessage({ id: 'closed' }) : intl.formatMessage({ id: 'rejected' })}</TableColumn>
                        <TableColumn scope="col" className="min-w-[56px] ">{car.notes}</TableColumn>
                        <TableColumn scope="col" className="w-[2px] ">{car.currency == 1 ? 'AED' : '$'}</TableColumn>
                        <TableColumn scope="col" className="w-[2px] ">{car.customer_date ? car.customer_date : intl.formatMessage({ id: 'page.customer.dashboard.table.no' })}</TableColumn>
                        <TableColumn scope="col" className="min-w-[10px] ">{car.created_date}</TableColumn>
                        {/* <td> */}
                        {/* Add action buttons or links here */}
                        {/* </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <Pagination
          totalRecords={totalRecords}
          page={page}
          url={paginationUrl}
          limit={limit}
        ></Pagination> */}
        </div>
      </div>
      <CustomModal
        showOn={damageModalOpen}
        initialFocus={closeModalRef}
        onClose={() => {
          document.documentElement.style.overflow = 'auto';
        }}
      >
        <div className="mt-3 flex w-full flex-col gap-4">
          <div className="flex justify-between">
            <Dialog.Title as="h3" className="text-3xl leading-6">
              {intl.formatMessage({ id: 'page.customer.dashboard.navigation_add_damage_request_details' })}{' '}
            </Dialog.Title>
            <XCircleIcon
              className="h-8 w-8 cursor-pointer text-red-500"
              ref={closeModalRef}
              onClick={() => {
                setDamageModalOpen(false);
              }}
            />
          </div>

          <form
            // onSubmit={handleSubmit}
            encType="multipart/form-data"
            method="post"
            className="max-h-[90vh] overflow-y-auto px-2"
          >
            {/* <div className="my-4 gap-2 sm:flex"> */}



            <FormWizard shape="square"
              color="#0093ff"
              onComplete={handleComplete} onTabChange={tabChanged}>
              <FormWizard.TabContent title="Car Detail" icon={<CarIcon className="h-8 w-8" />}>
                {/* <div className="p-8"> */}
                {/* Lot Number Dropdown */}
                <div className="mb-6 w-full ">
                  <Select
                    value={selectedLot}
                    onChange={handleLotChange}
                    options={lotNumbers.map((lot) => ({
                      value: lot.id,
                      label: lot.lotnumber,
                    }))}
                    styles={{
                      control: ReactSelectStyle,
                    }}
                    placeholder="Select Lot number"
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-left shadow-md focus:outline-none"
                  />

                </div>

                {/* Car Details Card */}
                <div className="mb-6 flex flex-col items-center rounded-lg border shadow-md md:flex-row">
                  <img
                    className="h-32 w-full rounded-t-lg object-cover md:h-auto md:w-32 md:rounded-none md:rounded-l-lg"
                    src="https://via.placeholder.com/150"
                    alt="Car Image"
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <h6 className="mb-2 text-xl font-bold tracking-tight text-[#0093ff] text-left">Car Name</h6>
                    <div className="flex justify-between w-full p-2 rounded-md">
                      <div>
                        <p className="mb-1 text-sm text-gray-700 text-left">
                          <span className="text-blue-600">Lot Number:</span> {selectedLot?.name}
                        </p>
                        <p className="mb-1 text-sm text-gray-700 text-left"><span className="text-blue-600">Chassis No:</span> ABC123XYZ</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-gray-700 text-left"><span className="text-blue-600">Model:</span> Model XYZ</p>
                        <p className="mb-1 text-sm text-gray-700 text-left"><span className="text-blue-600">Maker:</span> CarMaker</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-gray-700 text-left"><span className="text-blue-600">Year:</span> 2021</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Select
                  isMulti
                  value={selectedDamageParts}
                  onChange={handleDamagePartsChange}
                  options={damageParts.map((part) => ({
                    value: part,
                    label: part.name,
                  }))}
                  styles={colourStyles}
                  placeholder="Select Damage Parts"
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-left shadow-md focus:outline-none mb-6"
                />
              </FormWizard.TabContent>
              <FormWizard.TabContent title="Warehouse Images" icon="ti-check">
                {/* Warehouse Images Grid */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <img
                      key={index}
                      className="h-32 w-full rounded-lg object-cover"
                      src={`https://via.placeholder.com/200?text=Warehouse+Image+${index + 1}`}
                      alt={`Warehouse ${index + 1}`}
                    />
                  ))}
                </div>
              </FormWizard.TabContent>
              <FormWizard.TabContent title="Other Details" icon="ti-check" className="hover:border-none">
                {/* Comment Textarea */}
                <div className="mb-6">
                  <label className="block mb-2 text-lg font-medium text-gray-700 text-left" htmlFor="comment">
                    Comments
                  </label>
                  <textarea
                    id="comment"
                    className="w-full rounded-lg border border-gray-300 p-2 text-gray-700"
                    rows="4"
                    placeholder="Write your comments here..."
                  ></textarea>
                </div>
                {/* Multi-file Image Upload */}
                <div className="mb-6">
                  <label className="block mb-2 text-lg font-medium text-gray-700 text-left" htmlFor="upload">
                    Attach Images
                  </label>
                  <input
                    id="upload"
                    type="file"
                    className="block w-full text-sm text-gray-500"
                    multiple
                  />
                </div>

                {/* Submit Button */}
                {/* <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-6 py-2 text-xl font-medium text-white hover:bg-blue-700"
                >
                  Submit
                </button> */}
                {/* </div> */}
                {/* <button
                  className="bg-azure-blue my-4 max-w-max rounded-md px-8 py-2 text-xl font-medium text-white hover:border-0 hover:bg-blue-500"
                // disabled={submitStarted}
                > */}

                {/* </button> */}
              </FormWizard.TabContent>
            </FormWizard>
          </form>
        </div>
      </CustomModal>
    </Layout>
  );
};

export default DamageRequests;

export async function getServerSideProps(context) {
  return grantIfLogin(context);
}
