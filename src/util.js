import { updateConfig } from './config';
import buildMenu from './ui';

const onOpen = () => buildMenu();

const insertDB = DB => SpreadsheetApp.getActiveSpreadsheet().insertSheet(DB);

const getDB = DB => SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB);

function protectDB(database) {
  database.hideSheet();
  const protection = database.protect();
  protection.removeEditors(protection.getEditors());
  protection.setWarningOnly(true);
  return { database, protection };
}

const getCsvNames = blobArray => blobArray.map(x => x.getName());

const bootstrapApp = (config) => {
  updateConfig(config);
};

export { getDB, getCsvNames, insertDB, protectDB };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.onOpen = onOpen;
global.bootstrapApp = bootstrapApp;
global.getDB = getDB;
global.getCsvNames = getCsvNames;
global.insertDB = insertDB;
global.protectDB = protectDB;
