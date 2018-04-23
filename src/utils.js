// eslint-disable-next-line no-unused-vars
export default function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu().addItem('First Item','firstItem').addItem('Second Item','secondItem').addToUi(); // eslint-disable-line
}
