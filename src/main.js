import {
  onOpen,
  setupDatabase,
  postData,
  parseData,
  fetchData,
  updateConfig,
  initializeSurvey,
  bootstrapApp,
} from './utils';

// In order for functions to be exposed to the Google Apps Script
// Engine, we need to register them on the `global` context.
// See https://github.com/Automattic/google-docs-add-on
// for more details.
global.onOpen = onOpen;
global.setupDatabase = setupDatabase;
global.postData = postData;
global.parseData = parseData;
global.fetchData = fetchData;
global.updateConfig = updateConfig;
global.initializeSurvey = initializeSurvey;
global.bootstrapApp = bootstrapApp;
