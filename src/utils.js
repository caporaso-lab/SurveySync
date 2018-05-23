import { updateConfig } from './config';
import buildMenu from './ui';

const DB = 'DB';

function onOpen() {
  buildMenu();
}

function insertDB() {
  return SpreadsheetApp.getActiveSpreadsheet().insertSheet(DB);
}

function protectDB(database) {
  database.hideSheet();
  const protection = database.protect();
  protection.removeEditors(protection.getEditors());
  protection.setWarningOnly(true);
  return { database, protection };
}

function getDB() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB');
}

function verifyDB() {
  return getDB() !== null;
}

function setupDatabase() {
  if (!verifyDB()) {
    protectDB(insertDB());
  }
}

function bootstrapApp(config) {
  updateConfig(config);
  setupDatabase();
}

export { getDB, verifyDB };

// In order for functions to be exposed to the Google Apps Script
// Engine, we need to register them on the `global` context.
// See https://github.com/fossamagna/gas-webpack-plugin
// for more details.

global.onOpen = onOpen;
global.setupDatabase = setupDatabase;
global.bootstrapApp = bootstrapApp;
global.getDB = getDB;
global.verifyDB = verifyDB;
global.insertDB = insertDB;
global.protectDB = protectDB;
