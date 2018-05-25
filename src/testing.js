import { updateConfig } from './config';

const testingClearExistingConfig = () => updateConfig({});

export default testingClearExistingConfig;

global.testingClearExistingConfig = testingClearExistingConfig;
