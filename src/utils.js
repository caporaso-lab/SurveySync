export function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu().addItem('Populate Sheet','populateSheet').addItem('Second Item','secondItem').addToUi(); // eslint-disable-line
}

export function populateSheet() {
  var rangeList = SpreadsheetApp.getActiveSpreadsheet().getActiveRangeList(); // eslint-disable-line
	var response = UrlFetchApp.fetch('http://ghost.mggen.nau.edu:8081/basic-get'); // eslint-disable-line
	var text = response.getContentText(); // eslint-disable-line
  var obj = JSON.parse(text); // eslint-disable-line
  rangeList.setValue(obj.msg); // eslint-disable-line
}
