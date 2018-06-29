import { updateConfig } from './config';

const testingClearExistingConfig = () => updateConfig({});

function testingDeleteDatabaseSheets() {
  const sheets = JSON.parse(PropertiesService.getDocumentProperties().getProperty('savedDBSheets'));
  if (!sheets) {
    throw new Error('No database sheets to delete!');
  }
  for (let i = 0; i < sheets.length; i += 1) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[i]);
    SpreadsheetApp.getActiveSpreadsheet().deleteSheet(sheet);
  }
  PropertiesService.getDocumentProperties().deleteProperty('savedDBSheets');
}

export { testingClearExistingConfig, testingDeleteDatabaseSheets };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.testingClearExistingConfig = testingClearExistingConfig;
global.testingDeleteDatabaseSheets = testingDeleteDatabaseSheets;
