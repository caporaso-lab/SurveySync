export function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Get Data', 'getData')
    .addItem('Initialize Survey', 'initializeSurvey')
    .addToUi();
}

export function getData() {
  const rangeList = SpreadsheetApp.getActiveSpreadsheet()
    .getActiveRangeList();
  const response = UrlFetchApp.fetch('http://ghost.mggen.nau.edu:8081/basic/get');
  const text = response.getContentText();
  const obj = JSON.parse(text);
  if (obj.msg === 'hello world') {
    rangeList.setValue(obj.msg);
  }
}

export function updateConfig(config) {
  const documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.deleteAllProperties();
  documentProperties.setProperties(config);
}

export function initializeSurvey() {
  const defaultConfig = {
    tokenAPI: '',
    surveyID: '',
  };

  const html = HtmlService.createTemplateFromFile('config-form');
  const documentProperties = PropertiesService.getDocumentProperties();
  const config = documentProperties.getProperties();
  if (Object.keys(config) !== Object.keys(defaultConfig)) {
    updateConfig(defaultConfig);
  }
  Object.assign(html, config);
  const renderedHtml = html.evaluate().setWidth(400).setHeight(300);
  SpreadsheetApp.getUi()
    .showModalDialog(renderedHtml, 'Survey Configuration');
}

export function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const DB = 'DB';

  let dbSheet = ss.getSheetByName(DB);
  if (dbSheet === null) {
    dbSheet = ss.insertSheet(DB);
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
