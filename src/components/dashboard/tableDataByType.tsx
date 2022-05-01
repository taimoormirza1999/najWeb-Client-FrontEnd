export function getTableData(carsRecords, type) {
  const carData = [];
  let obj = {};
  if (type === 'paid') {
    carsRecords.map(function (car, index) {
      obj = [
        {
          value: index + 1,
          minwidth: '17px',
        },
      ];
      carData.push(obj);
    });
  }
  return carData;
}
