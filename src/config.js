const defaultConfig = {
  tokenAPI: '',
  surveyID: '',
};

export function updateConfig(config) {
  const documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.deleteAllProperties();
  documentProperties.setProperties(config);
  return config;
}

export function getConfig() {
  const documentProperties = PropertiesService.getDocumentProperties();
  const config = documentProperties.getProperties();
  return config;
}

export function resetConfig() {
  return updateConfig(defaultConfig);
}

export function validateConfig(config) {
  return Object.keys(config) !== Object.keys(defaultConfig);
}

export function getConfigWithDefaultFallBack() {
  const config = getConfig();
  return validateConfig(config) ? config : resetConfig();
}
