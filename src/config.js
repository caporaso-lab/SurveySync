const defaultConfig = {
  tokenAPI: '',
  surveyID: '',
  surveyUrl: 'http://ghost.mggen.nau.edu:8081/basic/csv/lite',
};

const getConfig = () => PropertiesService.getDocumentProperties().getProperties();

const validateConfigSchema = (config) => {
  const defaultConfigKeys = Object.keys(defaultConfig);
  const configKeys = Object.keys(config);
  for (let i = 0; i < defaultConfigKeys.length; i += 1) {
    if (!configKeys.includes(defaultConfigKeys[i])) {
      return false;
    }
  }
  return true;
};

function updateConfig(config) {
  const documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.deleteAllProperties();
  documentProperties.setProperties(config);
  return config;
}

const resetConfig = () => updateConfig(defaultConfig);

function getConfigWithDefaultFallBack() {
  const config = getConfig();
  const test = validateConfigSchema(config) ? config : resetConfig();
  return test;
}

export { updateConfig, getConfigWithDefaultFallBack, getConfig };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.updateConfig = updateConfig;
global.getConfig = getConfig;
global.resetConfig = resetConfig;
global.validateConfigSchema = validateConfigSchema;
global.getConfigWithDefaultFallBack = getConfigWithDefaultFallBack;
