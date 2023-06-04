import axios from 'axios';
import { getSession } from 'next-auth/react';
import { utils, write } from 'xlsx';

const processData = (data) => {
  const processedDataa = [];

  for (const containerId in data) {
    if (Object.hasOwnProperty.call(data, containerId)) {
      const item = data[containerId];

      // Extract the required information from the container object
      const processedContainer = {
        'Container number': item.container_number,
        'Booking number': item.booking_number,
        'Departure Port': item.pol_name,
        'Destination Port': item.destination,
        'Status': item.status,
        'Total cars': item.total_cars,
        'Loaded date': item.loaded_date,
        ETD: item.etd,
        'Shipping date': item.container_number,
        ETA: item.eta,
        'Size': item.size,
        'Port Arrival date': item.arrived_port_date,
        'Store arrival date': item.arrived_store_date,
        'Total shipping': item.total_shipping,
      };

      processedDataa.push(processedContainer);
      let processedCar = {
        'Container number': '',
        'Booking number': '',
        'Departure Port': '',
        'Destination Port': '',
        'Status': '',
        'Total cars': '',
        'Loaded date': '',
        ETD: '',
        'Shipping date': '',
        ETA: '',
        'Port Arrival date': '',
        'Store arrival date': '',
        'Total shipping': '',
        '': '',
      };

      processedDataa.push(processedCar);

      processedCar = {
        'Container number': '',
        'Booking number': 'Details',
        'Departure Port': 'Lot & vin',
        'Destination Port': 'Auction',
        'Status': 'Destination',
        'Total cars': 'Purchase Date',
        'Loaded date': 'Date Pick',
        ETD: 'Arrived Date',
        'Shipping date': 'Title',
        ETA: 'Key',
        'Port Arrival date': '',
        'Store arrival date': '',
        'Total shipping': '',
        '': '',
      };

      processedDataa.push(processedCar);
      item.cars.map((carDetail, _i) => {
          // Extract the required information from the container object
          processedCar = {
            'Container number': '',
            'Booking number': `${carDetail.year} ${carDetail.carMakerName} ${carDetail.carModelName}`,
           'Departure Port': carDetail.lotnumber,
           'Destination Port': `${carDetail.auctionTitle} ${carDetail.auction_location_name}`,
           'Status': carDetail.destination,
           'Total cars': carDetail.purchasedate,
           'Loaded date': carDetail.destination,
           ETD: carDetail.purchasedate,
            'Shipping date': carDetail.picked_date,
            ETA: carDetail.delivered_date,
            'Port Arrival date': '',
            'Store arrival date': '',
            'Total shipping': '',
          };

          processedDataa.push(processedCar);
      });

      processedCar = {
        'Container number': '',
        'Booking number': '',
        'Departure Port': '',
        'Destination Port': '',
        'Status': '',
        'Total cars': '',
        'Loaded date': '',
        ETD: '',
        'Shipping date': '',
        ETA: '',
        'Port Arrival date': '',
        'Store arrival date': '',
        'Total shipping': '',
        '': '',
      };

      processedDataa.push(processedCar);
    }
  }

  return processedDataa;
};

export default async function handler(req, res) {
  const session: any = await getSession({ req });
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  const tab = req.query.tab ? req.query.tab : 'inShipping';
  const search = req.query.search ? req.query.search : '';
  const type = req.query.type ? req.query.type : '';
  const order = req.query.order ? req.query.order : '';
  const region = req.query.region ? req.query.region : '';
  const dateFrom = req.query.date_from ? req.query.date_from : '';
  const dateTo = req.query.date_to ? req.query.date_to : '';
  const dateType = req.query.date_type ? req.query.date_type : '';

  // Process the data and generate the Excel file
  let processedData = {};
  await axios
    .get(`${process.env.API_URL}customer/container/export`, {
      params: {
        status: tab,
        search,
        type,
        order,
        region,
        date_from: dateFrom,
        date_to: dateTo,
        date_type: dateType,
      },
    })
    .then((response) => {
      // console.log(response.data.data);
      processedData = processData(response.data.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    });
  let excelBuffer = null;
  // Create a worksheet from the processed data
  if (processedData) {
    const columns = Object.keys(processedData[0]);
    const worksheetData = [columns];

    processedData.forEach((item) => {
      const row = columns.map((column) => item[column]);
      worksheetData.push(row);
    });

    const worksheet = utils.aoa_to_sheet(worksheetData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    excelBuffer = write(workbook, { bookType: 'xlsx', type: 'buffer' });
  }

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=Containers Data.xlsx'
  );

  // Send the Excel file as the response
  res.send(excelBuffer);
}
