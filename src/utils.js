export function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu().addItem('Populate Sheet','populateSheet').addItem('Help','help').addToUi(); // eslint-disable-line
}

export function populateSheet() {
  const rangeList = SpreadsheetApp.getActiveSpreadsheet()
    .getActiveRangeList();
	let response = UrlFetchApp.fetch('http://ghost.mggen.nau.edu:8081/basic-get'); // eslint-disable-line
	const text = response.getContentText();
  const obj = JSON.parse(text);
  if (obj.msg === 'hello world') {
		 rangeList.setValue(obj.msg); // eslint-disable-line
  }
}

export function help() {


}
