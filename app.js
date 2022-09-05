const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// FILENAMES
const dataFilename = 'data1000';
const newJsonFilename = 'newJson';

// INPUT
const inputXslxFilepath = path.resolve(__dirname, `data/${dataFilename}.xlsx`);
const workbook = xlsx.readFile(inputXslxFilepath);
const outputJsonDirectory = path.resolve(__dirname);
const outputJsonFilepath = path.join(outputJsonDirectory, `${newJsonFilename}.json`);

// const outputFolderCreate = new Function();
// if (!fs.existsSync(outputFolder)) {
//   fs.mkdirSync(outputFolder);
// }

// SPREADSHEET DATA LOCATION
const rawDataSheet = workbook.Sheets['Sheet1'];
const data = xlsx.utils.sheet_to_json(rawDataSheet, {
  range: 'C2:M9',
  raw: false,
});

// MAP DATA OBJECT TRANSFORMATION
const extractedData = data.map((row) => {
  return {
    id: row.id,
    day: row.day,
    ['designated emp']: row['designated emp'],
    location: getLocations(row),
    date: row.Date,
  };
});

function getLocations(row) {
  let locations = [];
  let location1 = row.location1;
  let location2 = row.location2;
  let location3 = row.location3;
  let location4 = row.location4;

  location1 !== '0' && location1 !== undefined ? locations.push(location1) : null;
  location2 !== '0' && location2 !== undefined ? locations.push(location2) : null;
  location3 !== '0' && location3 !== undefined ? locations.push(location3) : null;
  location4 !== '0' && location4 !== undefined ? locations.push(location4) : null;

  return locations;
}

// console.log(extractedData);

// OUTPUT
fs.writeFileSync(outputJsonFilepath, JSON.stringify(extractedData), {
  encoding: 'utf8',
});
console.log('Complete');
