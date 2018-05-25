const defaultConfig = {
  tokenAPI: '',
  surveyID: '',
};

const getConfig = () => PropertiesService.getDocumentProperties().getProperties();

const validateConfig = config => Object.keys(config) !== Object.keys(defaultConfig);

function updateConfig(config) {
  const documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.deleteAllProperties();
  documentProperties.setProperties(config);
  return config;
}

const resetConfig = () => updateConfig(defaultConfig);

function getConfigWithDefaultFallBack() {
  const config = getConfig();
  return validateConfig(config) ? config : resetConfig();
}

export { updateConfig, getConfigWithDefaultFallBack };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.updateConfig = updateConfig;
global.getConfig = getConfig;
global.resetConfig = resetConfig;
global.validateConfig = validateConfig;
global.getConfigWithDefaultFallBack = getConfigWithDefaultFallBack;
