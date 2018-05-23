import * as utils from './utils';
import * as ui from './ui';
import * as config from './config';
import * as data from './data';
// In order for functions to be exposed to the Google Apps Script
// Engine, we need to register them on the `global` context.
// See https://github.com/Automattic/google-docs-add-on
// for more details.
Object.assign(global, utils, ui, config, data);
// global.onOpen = utils.onOpen;
