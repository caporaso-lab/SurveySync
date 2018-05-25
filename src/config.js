const defaultConfig = {
  tokenAPI: '',
  surveyID: '',
  surveyUrl: 'http://ghost.mggen.nau.edu:8081/basic/csv/lite',
};

const getConfig = () => PropertiesService.getDocumentProperties().getProperties();

const validateConfigSchema = (config) => {
  const defaultConfigKeys = Object.keys(defaultConfig);
  const configKeys = Object.keys(config);
  return defaultConfigKeys.map(x => configKeys.includes(x)).every(x => x);
};

function updateConfig(config) {
  const documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.deleteAllProperties();
  documentProperties.setProperties(config);
  return config;
}

const resetConfigWithDefault = () => updateConfig(defaultConfig);

function getConfigWithDefaultFallBack() {
  const config = getConfig();
  const test = validateConfigSchema(config) ? config : resetConfigWithDefault();
  return test;
}

export { updateConfig, getConfigWithDefaultFallBack, getConfig };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.updateConfig = updateConfig;
global.getConfig = getConfig;
global.resetConfigWithDefault = resetConfigWithDefault;
global.validateConfigSchema = validateConfigSchema;
global.getConfigWithDefaultFallBack = getConfigWithDefaultFallBack;
