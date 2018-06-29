import { upsertDB, blobIsCSVFile } from './util';

const savedDBSheets = [];

const saveDBSheetsToProperties = () => PropertiesService.getDocumentProperties()
  .setProperty('savedDBSheets', JSON.stringify(savedDBSheets));

function writeDataToDB(csvName, table) {
  const DB = upsertDB(csvName);
  savedDBSheets.push(csvName);
  saveDBSheetsToProperties();
  for (let row = 0; row < table.length; row += 1) {
    for (let col = 0; col < table[row].length; col += 1) {
      const range = DB.getRange(row + 1, col + 1);
      range.setValue(table[row][col]);
    }
  }
}

const parseData = response => response.split('\n').map(row => row.split(','));

const fetchData = url => UrlFetchApp.fetch(url);

const unzipResponse = resp => Utilities.unzip(resp.getBlob()).filter(blobIsCSVFile);

const csvBlobToString = blob => blob.getDataAsString();

export { writeDataToDB, parseData, fetchData, unzipResponse, csvBlobToString };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.writeDataToDB = writeDataToDB;
global.saveDBSheetsToProperties = saveDBSheetsToProperties;
global.parseData = parseData;
global.fetchData = fetchData;
global.unzipResponse = unzipResponse;
global.csvBlobToString = csvBlobToString;
