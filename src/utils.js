export function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Get Data', 'fetchData')
    .addItem('Initialize Survey', 'initializeSurvey')
    .addToUi();
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

export function postData(array) {
  const numofRows = array.length;
  const numofCols = array[0].length;
  const DB = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB');
  const range = DB.getRange(1, 1, numofRows, numofCols);
  range.setValues(array);
}

export function parseData(text) {
  const valuesArr = text.split('\n').map(e => e.split(','));
  postData(valuesArr);
}

export function fetchData() {
  const activeSS = SpreadsheetApp.getActiveSpreadsheet();
  const DB = 'DB';
  const dbSheet = activeSS.getSheetByName(DB);
  if (dbSheet === null) {
    setupDatabase();
  }
  const fetchResponse = UrlFetchApp.fetch('http://ghost.mggen.nau.edu:8081/basic/csv/lite');
  const text = fetchResponse.getContentText();
  parseData(text);
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

export function bootstrapApp(config) {
  updateConfig(config);
  setupDatabase();
}
