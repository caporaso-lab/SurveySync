const defaultConfig = {
  clientID: '',
  clientSecret: '',
  layerID: '',
  baseURL: 'https://grail.maps.arcgis.com',
};

const getConfig = () => PropertiesService.getDocumentProperties().getProperties();

const validateConfigSchema = (config) => {
  const defaultConfigKeys = Object.keys(defaultConfig);
  const configKeys = Object.keys(config);
  return defaultConfigKeys.map(x => configKeys.includes(x)).every(x => x);
};

// validate config function
function validateConfig(config) {
  const configValues = Object.values(config);
  for (let i = 0; i < configValues.length; i += 1) {
    if (configValues[i] === null || configValues[i] === '') {
      return false;
    }
  }
  return true;
}

function updateConfig(config) {
  const documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.deleteAllProperties();
  documentProperties.setProperties(config);
  return config;
}

const resetConfigWithDefault = () => updateConfig(defaultConfig);

function getConfigWithDefaultFallBack() {
  const config = getConfig();
  return validateConfigSchema(config) ? config : resetConfigWithDefault();
}

export { validateConfig, updateConfig, getConfigWithDefaultFallBack, getConfig };

// In order for functions to be exposed to the Google Apps Script Engine, we need to register them
// on the `global` context.  See https://github.com/fossamagna/gas-webpack-plugin for more details.

global.updateConfig = updateConfig;
global.getConfig = getConfig;
global.validateConfig = validateConfig;
global.resetConfigWithDefault = resetConfigWithDefault;
global.validateConfigSchema = validateConfigSchema;
global.getConfigWithDefaultFallBack = getConfigWithDefaultFallBack;
