/**
 * @fileoverview Handle logging for ESLint
 * @author Gyandeep Singh
 */

"use strict";

/* eslint no-console: "off" */

/* istanbul ignore next */
module.exports = {

    /**
     * Cover for console.log
     * @returns {void}
     */
    info(...args) {
        console.log(...args);
    },

    /**
     * Cover for console.error
     * @returns {void}
     */
    error(...args) {
        console.error(...args);
    }
};
