// Need to import `babel-polyfill` here, instead of in the webpack entry config, not sure why, but
// GAS complains about function registrations otherwise, so this seems like an easy compromise.

import 'babel-polyfill';

// This file is the entry point for webpack. Import all modules here to ensure all side effects are
// run. Individual modules perform their own global context registration.

import './util';
import './ui';
import './config';
import './data';
import './testing';
