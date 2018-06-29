import { updateConfig } from './config';
import buildMenu from './ui';

const onOpen = () => buildMenu();

const getDB = DB => SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB);

function protectDB(database) {
  database.hideSheet();
  const protection = database.protect();
  protection.removeEditors(protection.getEditors());
  protection.setWarningOnly(true);
  return { database, protection };
}

function upsertDB(DB) {
  if (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB) === null) {
    protectDB(SpreadsheetApp.getActiveSpreadsheet().insertSheet(DB));
  }
  return getDB(DB);
}

const getCsvNames = blobArray => blobArray.map(x => x.getName());

const bootstrapApp = (config) => {
  updateConfig(config);
};

const blobIsCSVFile = b => b.getName().endsWith('.csv');

export { getDB, getCsvNames, upsertDB, protectDB, blobIsCSVFile };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.onOpen = onOpen;
global.bootstrapApp = bootstrapApp;
global.getDB = getDB;
global.getCsvNames = getCsvNames;
global.upsertDB = upsertDB;
global.protectDB = protectDB;
global.blobIsCSVFile = blobIsCSVFile;
