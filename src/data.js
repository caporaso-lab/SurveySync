import { getDB, insertDB, protectDB } from './util';

function writeDataToDB(csvName, table) {
  protectDB(insertDB(csvName));
  Logger.log('writeDataToDB successful');
  const DB = getDB(csvName);
  const [numofRows, numofCols] = [table.length, table[0].length];
  const range = DB.getRange(1, 1, numofRows, numofCols);
  range.setValues(table);
}

const parseData = response => response.split('\n').map(row => row.split(','));

const fetchData = url => UrlFetchApp.fetch(url);

const unzipResponse = resp => Utilities.unzip(resp.getBlob());

const csvBlobToString = blob => blob.getDataAsString();

export { writeDataToDB, parseData, fetchData, unzipResponse, csvBlobToString };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.writeDataToDB = writeDataToDB;
global.parseData = parseData;
global.fetchData = fetchData;
global.unzipResponse = unzipResponse;
global.csvBlobToString = csvBlobToString;
