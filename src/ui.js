import { validateConfig, getConfigWithDefaultFallBack, getConfig } from './config';
import { getCsvNames } from './util';
import { fetchData, parseData, writeDataToDB, unzipResponse, csvBlobToString } from './data';

function showSurveyConfiguration() {
  const html = HtmlService.createTemplateFromFile('config-form');
  const config = getConfigWithDefaultFallBack();
  // html mutated in place
  Object.assign(html, config);
  const renderedHtml = html.evaluate().setWidth(400).setHeight(300);
  SpreadsheetApp.getUi()
    .showModalDialog(renderedHtml, 'Survey Configuration');
}

function triggerDataUpdate() {
  const config = getConfig();
  if (!validateConfig(config)) {
    throw new Error('The Survey Configuration was left empty! Please reinitialize.');
  }
  const resp = fetchData(config);
  const blobs = unzipResponse(resp);
  const csvNames = getCsvNames(blobs);
  const csvStrings = blobs.map(csvBlobToString);
  const tables = csvStrings.map(parseData);
  for (let i = 0; i < tables.length; i += 1) {
    writeDataToDB(csvNames[i], tables[i]);
  }
}

function buildMenu() {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Get Data', 'triggerDataUpdate')
    .addItem('Survey Configuration', 'showSurveyConfiguration')
    .addSeparator()
    .addItem('Test Clearing Existing Configuration', 'testingClearExistingConfig')
    .addItem('Test Deleting All Database Sheets', 'testingDeleteDatabaseSheets')
    .addToUi();
}

export default buildMenu;

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.showSurveyConfiguration = showSurveyConfiguration;
global.triggerDataUpdate = triggerDataUpdate;
global.buildMenu = buildMenu;
