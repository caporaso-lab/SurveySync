# Survey Sync

[![Build Status](https://travis-ci.org/caporaso-lab/SurveySync.svg?branch=master)](https://travis-ci.org/caporaso-lab/SurveySync)

This is a Google Sheets add-on that will facilitate the synchronization of data
from a survey database to a Google Sheets spreadsheet.

## Dependencies

- [yarn](https://yarnpkg.com/)
- A Google Account (for deploying the built add-on)

## Developer Quickstart

### Installation

```bash
yarn install
```

### Build Instructions

```bash
npm run build
```

### Deploy Instructions

```bash
# You can also install clasp globally and login that way, too - the token is
# shared at the user level.
./node_modules/.bin/clasp login
cd dist && ./../node_modules/.bin/clasp push && cd ..
```
