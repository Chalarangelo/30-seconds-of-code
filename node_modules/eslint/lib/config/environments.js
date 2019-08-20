/**
 * @fileoverview Environments manager
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const envs = require("../../conf/environments");

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

class Environments {

    /**
     * create env context
     */
    constructor() {
        this._environments = new Map();

        this.load();
    }

    /**
     * Loads the default environments.
     * @returns {void}
     * @private
     */
    load() {
        Object.keys(envs).forEach(envName => {
            this._environments.set(envName, envs[envName]);
        });
    }

    /**
     * Gets the environment with the given name.
     * @param {string} name The name of the environment to retrieve.
     * @returns {Object?} The environment object or null if not found.
     */
    get(name) {
        return this._environments.get(name) || null;
    }

    /**
     * Gets all the environment present
     * @returns {Object} The environment object for each env name
     */
    getAll() {
        return Array.from(this._environments).reduce((coll, env) => {
            coll[env[0]] = env[1];
            return coll;
        }, {});
    }

    /**
     * Defines an environment.
     * @param {string} name The name of the environment.
     * @param {Object} env The environment settings.
     * @returns {void}
     */
    define(name, env) {
        this._environments.set(name, env);
    }

    /**
     * Imports all environments from a plugin.
     * @param {Object} plugin The plugin object.
     * @param {string} pluginName The name of the plugin.
     * @returns {void}
     */
    importPlugin(plugin, pluginName) {
        if (plugin.environments) {
            Object.keys(plugin.environments).forEach(envName => {
                this.define(`${pluginName}/${envName}`, plugin.environments[envName]);
            });
        }
    }
}

module.exports = Environments;
