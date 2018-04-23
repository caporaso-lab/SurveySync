export default function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu().addItem('Populate Sheet','populateSheet').addItem('Second Item','secondItem').addToUi(); // eslint-disable-line
}

export function populateSheet() {
  var rangeList = SpreadsheetApp.getActiveSpreadsheet().getActiveRangeList(); // eslint-disable-line
  rangeList.setValue('Survey Sync'); // eslint-disable-line
}
