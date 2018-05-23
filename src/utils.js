import { updateConfig } from './config';
import { buildMenu } from './ui';

const DB = 'DB';

export function onOpen() {
  buildMenu();
}

export function insertDB() {
  return SpreadsheetApp.getActiveSpreadsheet().insertSheet(DB);
}

export function protectDB(database) {
  database.hideSheet();
  const protection = database.protect();
  protection.removeEditors(protection.getEditors());
  protection.setWarningOnly(true);
  return { database, protection };
}

export function getDB() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB');
}

export function verifyDB() {
  return getDB() !== null;
}

export function setupDatabase() {
  if (!verifyDB()) {
    protectDB(insertDB());
  }
}

export function bootstrapApp(config) {
  updateConfig(config);
  setupDatabase();
}

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
