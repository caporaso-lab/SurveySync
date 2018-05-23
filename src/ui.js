import { getConfigWithDefaultFallBack } from './config';
import { verifyDB } from './utils';
import { fetchData, parseData, writeDataToDB } from './data';

export function showSurveyConfiguration() {
  const html = HtmlService.createTemplateFromFile('config-form');
  const config = getConfigWithDefaultFallBack();
  // html mutated in place
  Object.assign(html, config);
  const renderedHtml = html.evaluate().setWidth(400).setHeight(300);
  SpreadsheetApp.getUi()
    .showModalDialog(renderedHtml, 'Survey Configuration');
}

export function triggerDataUpdate() {
  // TODO error handling
  Logger.log(verifyDB());
  if (!verifyDB()) {
    return;
  }
  writeDataToDB(parseData(fetchData()));
}

export function buildMenu() {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Get Data', 'triggerDataUpdate')
    .addItem('Initialize Survey', 'showSurveyConfiguration')
    .addToUi();
}

// In order for functions to be exposed to the Google Apps Script
// Engine, we need to register them on the `global` context.
// See https://github.com/fossamagna/gas-webpack-plugin
// for more details.

global.showSurveyConfiguration = showSurveyConfiguration;
global.triggerDataUpdate = triggerDataUpdate;
global.buildMenu = buildMenu;
