import { updateConfig } from './config';
import buildMenu from './ui';

const DB = 'DB';

const onOpen = () => buildMenu();

const insertDB = () => SpreadsheetApp.getActiveSpreadsheet().insertSheet(DB);

const getDB = () => SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB);

const verifyDB = () => getDB() !== null;

function protectDB(database) {
  database.hideSheet();
  const protection = database.protect();
  protection.removeEditors(protection.getEditors());
  protection.setWarningOnly(true);
  return { database, protection };
}

const setupDatabase = () => { if (!verifyDB()) { protectDB(insertDB()); } };

const bootstrapApp = (config) => {
  updateConfig(config);
  setupDatabase();
};

export { getDB, verifyDB };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.onOpen = onOpen;
global.setupDatabase = setupDatabase;
global.bootstrapApp = bootstrapApp;
global.getDB = getDB;
global.verifyDB = verifyDB;
global.insertDB = insertDB;
global.protectDB = protectDB;
