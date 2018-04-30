export function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Populate Sheet', 'populateSheet')
    .addItem('Help', 'help')
    .addToUi();
}

export function populateSheet() {
  const rangeList = SpreadsheetApp.getActiveSpreadsheet()
    .getActiveRangeList();
  const response = UrlFetchApp.fetch('http://ghost.mggen.nau.edu:8081/basic/get');
  const text = response.getContentText();
  rangeList.setValue(text);
  const obj = JSON.parse(text);
  if (obj.msg === 'hello world') {
    rangeList.setValue(obj.msg);
  }
}
