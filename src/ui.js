import { getConfigWithDefaultFallBack, getConfig } from './config';
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
  // TODO add config validation once we address issue-
  const config = getConfig();
  const resp = fetchData(config.surveyUrl);
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
    .addItem('Initialize Survey', 'showSurveyConfiguration')
    .addItem('Test Clearing Existing Configuration', 'testingClearExistingConfig')
    .addToUi();
}

export default buildMenu;

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.showSurveyConfiguration = showSurveyConfiguration;
global.triggerDataUpdate = triggerDataUpdate;
global.buildMenu = buildMenu;
