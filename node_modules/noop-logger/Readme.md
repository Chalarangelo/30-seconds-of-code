[![Build Status](https://circleci.com/gh/segmentio/noop-logger.png?circle-token=3281390270513cae0e50fd18b8d972eb48a56879)](https://circleci.com/gh/segmentio/noop-logger)

# noop-logger

  A logger that does exactly nothing, useful when you want to test modules that require a logger to be passed in.

## Installation

    $ npm install noop-logger

## API

  Exposes the following noops:

  - `logger.debug`
  - `logger.info`
  - `logger.warn`
  - `logger.error`
  - `logger.critical`
  - `logger.alert`
  - `logger.emergency`
  - `logger.notice`
  - `logger.fatal`

## License

  MIT
