"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';

import { faClock, faTimes, faLock, faPlus, faWarehouse, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
import { UserContext } from '@/components/userContext';

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
import ImageUploader from '@/components/ImageUploader';

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
  const [damageParts, setDamageParts] = useState([]);
  const [warehouseImages, setWarehouseImages] = useState([]);
  const closeModalRef = useRef(null);
  const [damageModalOpen, setDamageModalOpen] = useState(false);
  const { data: session } = useSession();
  const [selectedImages, setSelectedImages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDamageParts, setSelectedDamageParts] = useState([]);
  const [selectedLot, setSelectedLot] = useState(null);
  const [carData, setcarData] = useState(null);
  const [comments, setComments] = useState('');
  const userContextData = useContext(UserContext);

  const { profile } = userContextData || {};
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
      setLoading(false);
      setWarehouseCars(response?.data.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchDamageParts = async () => {
    try {
      const response = await fetch('/api/customer/damageCar/getDamageParts');
      const result = await response.json();
      setDamageParts(result.data);
      // console.log(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchLotNumbersDamageData = async (customerId) => {
    try {
      const url = `/api/customer/damageCar/lotNumbersDamage?customer_id=${customerId}`;
      const response = await axios.get(url);
      setLotNumbers(response.data.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  useEffect(() => {
    if (profile && profile.customer_id) {
      const customerId = profile.customer_id;

      fetchDamageRequestData(customerId);
      fetchLotNumbersDamageData(customerId);
      fetchDamageParts();
    }
  }, [profile]);
  useEffect(() => {
    getCarInfo(selectedLot?.value);
    fetchImages(selectedLot?.value)
  }, [selectedLot]);



  const getCarInfo = async (valTo) => {
    try {
      const url = `/api/customer/damageCar/carInfo?car_id=${valTo}`;
      const response = await fetch(url);
      const json = await response.json();
      setcarData(json.data[0]);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchImages = async (valTo) => {
    var type = 'damagewarehouse';
    try {
      const response = await fetch(`/api/customer/damageCar/getImages?car_id=${valTo}&type=${type}`);
      const result = await response.json();
      if (result?.images?.length > 0) {
        setWarehouseImages(result.images);
        // console.log(result.images)
      } else {
        // Handle the case when there are no images
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleImageClick = (id) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((imgId) => imgId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  const handleImagesChange = (newImages) => {
    setAttachments(newImages);
  };
  const handleLotChange = (option) => {
    setSelectedLot(option);
  };

  const handleDamagePartsChange = (options) => {
    setSelectedDamageParts(options);
  };

  const tabChanged = ({
    prevIndex,
    nextIndex,
  }: {
    prevIndex: number;
    nextIndex: number;
  }) => {
  };

  const handleSubmit = () => {
    // Validate the form inputs
    if (!selectedLot) {
      alert('Please select a lot number.');
      return;
    }

    // Create form data object to send to API
    const formData = new FormData();
    formData.append('lotNumber', selectedLot.value);
    formData.append('comments', comments);

    selectedDamageParts.forEach((part, index) => {
      formData.append(`damageParts[${index}]`, part.value);
    });

    selectedImages.forEach((image, index) => {
      formData.append(`selectedImages[${index}]`, image.image);
    });

    // Array.from(uploadFiles).forEach((file, index) => {
    //     formData.append(`uploadFiles[${index}]`, file);
    // });

    // Simulate API call
    console.log('Submitting form with data:', {
      lotNumber: selectedLot.value,
      damageParts: selectedDamageParts.map(part => part.value),
      selectedImages: selectedImages.map(image => image),
      'cu_notes': comments,
      attachments,
    });
    formData.append('file_type', 'image');
    // Reset form after submission
    // setSelectedLot(null);
    // setSelectedDamageParts([]);
    // setSelectedImages([]);
    // setComments('');
    // setUploadFiles([]);
  };

  return (
    <Layout>

      <div className="m-8">
        <div className="flex justify-between  align-middle items-center" >
          <HeadTextWithIcon header={'page.customer.dashboard.navigation_damage_requests'} gicon={'&#xe531;'} />
          <button
            className="h-11 bg-dark-blue  mt-2 rounded-md border-2 text-sm border-blue-800 px-3 py-1 text-sm font-medium text-white ltr:right-[12rem] sm:text-xl"
            onClick={() => {
              setDamageModalOpen(true);
            }}
          ><FontAwesomeIcon icon={faPlus} /> &nbsp;&nbsp;
            <FormattedMessage id="page.customer.dashboard.add_new_request" />
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
                        <TableColumn scope="col" className="w-[30px] ">{car.request_number}</TableColumn>
                        <TableColumn scope="col" className="w-[30px] ">{car.customer_price ? car.customer_price : intl.formatMessage({ id: 'page.customer.dashboard.table.no' })}</TableColumn>
                        <TableColumn scope="col" className="w-[30px] mx-auto"><span className={`font-medium text-${car.customer_status == 0 ? 'blue' : car.customer_status == 1 ? 'green' : 'red'}-600`}                        >{car.customer_status == 0 ?  <FontAwesomeIcon icon={faClock} size="2x" />  : car.customer_status == 1 ? intl.formatMessage({ id: 'closed' }) : intl.formatMessage({ id: 'rejected' })}</span></TableColumn>
                        <TableColumn scope="col" className="min-w-[56px] ">{car.notes}</TableColumn>
                        <TableColumn scope="col" className="w-[30px] ">{car.currency == 1 ? 'AED' : '$'}</TableColumn>
                        <TableColumn scope="col" className="w-[30px] ">{car.customer_date ? car.customer_date : intl.formatMessage({ id: 'page.customer.dashboard.table.no' })}</TableColumn>
                        <TableColumn scope="col" className="min-w-[10px] ">{car.created_date}</TableColumn>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {loading && (
                  <div className=" mt-5 flex justify-center items-center mx-auto" >
                    <SpinnerIcon className="mr-3 h-7 w-7" color='text-blue-900' />
                    <span className="text-blue-700">Loading...</span>
                  </div>
                )}
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

            encType="multipart/form-data"
            method="post"
            className="max-h-[90vh] overflow-y-auto px-2"
          >
            <FormWizard shape="square"
              color="#0093ff"
              onComplete={handleSubmit} onTabChange={tabChanged}>
              <FormWizard.TabContent title="Car Detail" icon={<CarIcon className="h-8 w-8" />}>
                {/* Lot Number Dropdown */}
                <div className="mb-3 w-full">
                  <label htmlFor="lot-select" className="text-left block text-lg font-medium text-blue-600 mb-2">
                    Lot Number
                  </label>
                  <Select
                    id="lot-select"
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
                {carData && (<div className="mb-3 flex flex-col items-center rounded-lg border shadow-md md:flex-row">
                  <img
                    className="pl-2 h-36 w-full  object-cover md:h-auto md:w-36 shadow rounded "
                    src={`${carData.photo ? carData.photo : 'https://via.placeholder.com/150'}`}
                    alt="Car Image"
                  />
                  <div className="flex flex-col justify-between px-4 py-2 leading-normal w-full">
                    <h6 className="mb-2 text-xl font-semibold tracking-tight text-[#0093ff] text-left">{carData.year + " " + carData.carMakerName + " " + carData.carModelName}</h6>
                    <div className="flex justify-between w-full p-2 rounded-md">
                      <div>
                        <p className="mb-1 text-sm text-gray-700 text-left">
                          <span className="text-blue-600">Lot Number:</span> #{selectedLot?.value}
                        </p>
                        <p className="mb-1 text-sm text-gray-700 text-left"><span className="text-blue-600">Chassis No:</span> {carData.vin}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-gray-700 text-left"><span className="text-blue-600">Model:</span> {carData.carModelName}</p>
                        <p className="mb-1 text-sm text-gray-700 text-left"><span className="text-blue-600">Maker:</span> {carData.carMakerName}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-gray-700 text-left"><span className="text-blue-600">Year:</span>  {carData.year}</p>
                      </div>
                    </div>
                  </div>
                </div>)}
                <div className="mb-6 w-full">
                  <label htmlFor="lot-select" className="text-left block text-lg font-medium text-blue-600 mb-2">
                    Damage Parts
                  </label>
                  <Select
                    isMulti
                    value={selectedDamageParts}
                    onChange={handleDamagePartsChange}
                    options={damageParts?.map((part) => ({
                      value: part.key,
                      label: part.value,
                    }))}
                    styles={colourStyles}
                    placeholder="Select Damage Parts"
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-left shadow-md focus:outline-none mb-6"
                  />
                </div>
              </FormWizard.TabContent>
              <FormWizard.TabContent title="Warehouse Images" icon={<CarIcon className="h-8 w-8" />}>
                {/* Warehouse Images Grid */}
                <div className="mb-6 grid grid-cols-3 gap-3">
                  {warehouseImages.length > 0 ? (
                    warehouseImages.map((image, index) => (
                      <img
                        key={index}
                        className={`h-32 w-full rounded-lg shadow object-cover cursor-pointer ${selectedImages.includes(image.id) ? 'border-4 border-blue-500' : ''
                          }`}
                        src={image.image}
                        alt={`Warehouse ${index + 1}`}
                        onClick={() => handleImageClick(image.id)}
                      />
                    ))
                  ) : (
                    <p>No images available.</p>
                  )}
                </div>
              </FormWizard.TabContent>
              <FormWizard.TabContent title="Other Details" icon={<CarIcon className="h-8 w-8" />} className="hover:border-none">
                {/* Comment Textarea */}
                <div className="mb-6">
                  <label className="block mb-2 text-lg font-medium text-gray-700 text-left" htmlFor="comment">
                    Comments
                  </label>
                  <textarea
                    id="comment"
                    className="w-full rounded-lg border border-gray-300 p-2 text-gray-700"
                    rows="4"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Write your comments here..."
                  ></textarea>
                </div>
                {/* Multi-file Image Upload */}
                <div className="mb-6">
                  <label className="block mb-2 text-lg font-medium text-gray-700 text-left" htmlFor="upload">
                    Attach Images
                  </label>
                  {/* <input
                    id="upload"
                    type="file"
                    className="block w-full text-sm text-gray-500"
                    multiple
                  /> */}
                  <ImageUploader onImagesChange={handleImagesChange} />
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
