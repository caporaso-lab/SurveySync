import helloWorld from './utils';

// In order for functions to be exposed to the Google Apps Script
// Engine, we need to register them on the `global` context.
//
// See https://github.com/Automattic/google-docs-add-on
// for more details.
global.helloWorld = helloWorld;
