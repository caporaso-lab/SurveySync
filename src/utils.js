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

export function initializeSurvey() {
  const html = HtmlService.createHtmlOutputFromFile('config-form')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi()
    .showModalDialog(html, 'Survey Configuration');
}
export function submitData() {
  // const configTokenAPI = config.tokenAPI;
  // const configSurveyID = surveyID;
  // Logger.log(configSurveyID);
}
