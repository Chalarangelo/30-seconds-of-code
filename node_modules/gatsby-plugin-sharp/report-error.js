"use strict";

const reportError = (message, err, reporter) => {
  if (reporter) {
    reporter.error(message, err);
  } else {
    console.error(message, err);
  }

  if (process.env.gatsby_executing_command === `build`) {
    process.exit(1);
  }
};

exports.reportError = reportError;