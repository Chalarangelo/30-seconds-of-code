# Node.js releases data

All data is located in `data` directory.

`data/raw` contains raw data `nodejs.json` and `iojs.json`.

`data/processed` contains `envs.js` with both node.js and io.js data preprocessed to be used by [browserlist](https://github.com/ai/browserslist) and other projects. Each version in this file contains only necessary info: version, release date and optionally LTS flag.

## Installation
```bash
npm install --save node-releases
```

## Updating data
```bash
npm run build
```
This is a build script which fetches data from web, processes it and saves processed data to `data/processed/envs.json`. If you want to run this steps separately you can use commands described below.


### Fetching data
```bash
npm run fetch
```
This npm script will download new data to `data/raw` directory. Also it'll download Node.js release schedule into `release-schedule` folder.

### Processing data
```bash
npm run process
```
This script generates `envs.json` file from raw data files and saves it to `data/processed` directory.
