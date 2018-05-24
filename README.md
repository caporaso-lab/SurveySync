# Survey Sync

[![Build Status](https://travis-ci.org/caporaso-lab/SurveySync.svg?branch=master)](https://travis-ci.org/caporaso-lab/SurveySync)

This is a Google Sheets add-on that will facilitate the synchronization of data
from a survey database to a Google Sheets spreadsheet.

## Dependencies

- Node 8
- [yarn](https://yarnpkg.com/)
- A Google Account (for deploying the built add-on)

## Developer Quickstart

### Installation

```bash
make dev
```

### Build Instructions

```bash
make build
```

### Deploy Instructions

```bash
# Log in to your Google Account using Clasp.
make login
```

```bash
# Log out of your Google Account.
make logout
```

```bash
# Push your code to Google App Script Project.
make deploy
```
