import { updateConfig } from './config';
import { buildMenu } from './ui';

export function onOpen() {
  buildMenu();
}

export function setupDatabase() {
  const activeSS = SpreadsheetApp.getActiveSpreadsheet();
  const DB = 'DB';
  let dbSheet = activeSS.getSheetByName(DB);
  if (dbSheet === null) {
    dbSheet = activeSS.insertSheet(DB);
  }

  dbSheet.hideSheet();

  const protection = dbSheet.protect();
  protection.removeEditors(protection.getEditors());
  protection.setWarningOnly(true);
}

export function bootstrapApp(config) {
  updateConfig(config);
  setupDatabase();
}

export function getDB() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB');
}

export function verifyDB() {
  return getDB() !== null;
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
