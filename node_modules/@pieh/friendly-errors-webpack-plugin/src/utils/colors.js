'use strict';

const chalk = require('chalk');

function formatTitle(severity, message) {
  return chalk[bgColor(severity)].black('', message, '');
}

function formatText(severity, message) {
  return chalk[textColor(severity)](message);
}

function bgColor(severity) {
  const color = textColor(severity);
  return 'bg'+ capitalizeFirstLetter(color)
}

function textColor(severity) {
  switch (severity.toLowerCase()) {
    case 'success': return 'green';
    case 'info': return 'blue';
    case 'note': return 'white';
    case 'warning': return 'yellow';
    case 'error': return 'red';
    default: return 'red';
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  bgColor: bgColor,
  textColor: textColor,
  formatTitle: formatTitle,
  formatText: formatText
};
