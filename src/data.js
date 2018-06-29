import { upsertDB, blobIsCSVFile } from './util';

const savedDBSheets = [];

const saveDBSheetsToProperties = () => PropertiesService.getDocumentProperties()
  .setProperty('savedDBSheets', JSON.stringify(savedDBSheets));

function writeDataToDB(csvName, table) {
  const DB = upsertDB(csvName);
  savedDBSheets.push(csvName);
  saveDBSheetsToProperties();
  // TODO: this is crazy slow
  for (let row = 0; row < table.length; row += 1) {
    for (let col = 0; col < table[row].length; col += 1) {
      const range = DB.getRange(row + 1, col + 1);
      range.setValue(table[row][col]);
    }
  }
}

const parseData = response => response.split('\n').map(row => row.split(','));

function fetchData(config) {
  const tokenOptions = {
    method: 'post',
    payload: {
      client_id: config.clientID,
      client_secret: config.clientSecret,
      grant_type: 'client_credentials',
    },
  };
  // TODO: add URLbuilder util
  const tokenURL = `${config.baseURL}/sharing/rest/oauth2/token`;
  const tokenResponse = UrlFetchApp.fetch(tokenURL, tokenOptions);
  const tokenContent = JSON.parse(tokenResponse.getContentText());

  const layerOptions = {
    method: 'post',
    payload: {
      token: tokenContent.access_token,
    },
  };
  const layerURL = `${config.baseURL}/sharing/rest/content/items/${config.layerID}/data`;
  return UrlFetchApp.fetch(layerURL, layerOptions);
}

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
