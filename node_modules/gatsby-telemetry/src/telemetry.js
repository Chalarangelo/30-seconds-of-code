const uuidv4 = require(`uuid/v4`)
const EventStorage = require(`./event-storage`)
const { cleanPaths } = require(`./error-helpers`)
const ci = require(`ci-info`)
const os = require(`os`)
const { join, sep } = require(`path`)
const isDocker = require(`is-docker`)
const showAnalyticsNotification = require(`./showAnalyticsNotification`)
const lodash = require(`lodash`)
const { getRepositoryId } = require(`./repository-id`)

module.exports = class AnalyticsTracker {
  store = new EventStorage()
  debouncer = {}
  metadataCache = {}
  defaultTags = {}
  osInfo // lazy
  trackingEnabled // lazy
  componentVersion
  sessionId = this.getSessionId()

  constructor() {
    try {
      if (this.store.isTrackingDisabled()) {
        this.trackingEnabled = false
      }

      this.defaultTags = this.getTagsFromEnv()

      // These may throw and should be last
      this.componentVersion = require(`../package.json`).version
      this.gatsbyCliVersion = this.getGatsbyCliVersion()
      this.installedGatsbyVersion = this.getGatsbyVersion()
    } catch (e) {
      // ignore
    }
  }

  // We might have two instances of this lib loaded, one from globally installed gatsby-cli and one from local gatsby.
  // Hence we need to use process level globals that are not scoped to this module
  getSessionId() {
    return (
      process.gatsbyTelemetrySessionId ||
      (process.gatsbyTelemetrySessionId = uuidv4())
    )
  }

  getTagsFromEnv() {
    if (process.env.GATSBY_TELEMETRY_TAGS) {
      try {
        return JSON.parse(process.env.GATSBY_TELEMETRY_TAGS)
      } catch (_) {
        // ignore
      }
    }
    return {}
  }

  getGatsbyVersion() {
    const packageInfo = require(join(
      process.cwd(),
      `node_modules`,
      `gatsby`,
      `package.json`
    ))
    try {
      return packageInfo.version
    } catch (e) {
      // ignore
    }
    return undefined
  }

  getGatsbyCliVersion() {
    try {
      const jsonfile = join(
        require
          .resolve(`gatsby-cli`) // Resolve where current gatsby-cli would be loaded from.
          .split(sep)
          .slice(0, -2) // drop lib/index.js
          .join(sep),
        `package.json`
      )
      const { version } = require(jsonfile).version
      return version
    } catch (e) {
      // ignore
    }
    return undefined
  }
  captureEvent(type = ``, tags = {}, opts = { debounce: false }) {
    if (!this.isTrackingEnabled()) {
      return
    }
    let baseEventType = `CLI_COMMAND`
    if (Array.isArray(type)) {
      type = type.length > 2 ? type[2].toUpperCase() : ``
      baseEventType = `CLI_RAW_COMMAND`
    }

    const decoration = this.metadataCache[type]
    const eventType = `${baseEventType}_${type}`

    if (opts.debounce) {
      const debounceTime = 5 * 1000
      const now = Date.now()
      const debounceKey = JSON.stringify({ type, decoration, tags })
      const last = this.debouncer[debounceKey] || 0
      if (now - last < debounceTime) {
        return
      }
      this.debouncer[debounceKey] = now
    }

    delete this.metadataCache[type]
    this.buildAndStoreEvent(eventType, lodash.merge({}, tags, decoration))
  }

  captureError(type, tags = {}) {
    if (!this.isTrackingEnabled()) {
      return
    }

    const decoration = this.metadataCache[type]
    delete this.metadataCache[type]
    const eventType = `CLI_ERROR_${type}`

    this.formatErrorAndStoreEvent(eventType, lodash.merge({}, tags, decoration))
  }

  captureBuildError(type, tags = {}) {
    if (!this.isTrackingEnabled()) {
      return
    }
    const decoration = this.metadataCache[type]
    delete this.metadataCache[type]
    const eventType = `BUILD_ERROR_${type}`

    this.formatErrorAndStoreEvent(eventType, lodash.merge({}, tags, decoration))
  }

  formatErrorAndStoreEvent(eventType, tags) {
    if (tags.error) {
      // `error` ought to have been `errors` but is `error` in the database
      if (Array.isArray(tags.error)) {
        const { error, ...restOfTags } = tags
        error.forEach(err => {
          this.formatErrorAndStoreEvent(eventType, {
            error: err,
            ...restOfTags,
          })
        })
        return
      }

      tags.errorV2 = {
        id: tags.error.id,
        text: cleanPaths(tags.error.text),
        level: tags.error.level,
        type: tags.error?.type,
        // see if we need empty string or can just use NULL
        stack: cleanPaths(tags.error?.error?.stack || ``),
        context: cleanPaths(JSON.stringify(tags.error?.context)),
      }

      delete tags.error
    }

    this.buildAndStoreEvent(eventType, tags)
  }

  buildAndStoreEvent(eventType, tags) {
    const event = {
      installedGatsbyVersion: this.installedGatsbyVersion,
      gatsbyCliVersion: this.gatsbyCliVersion,
      ...lodash.merge({}, this.defaultTags, tags), // The schema must include these
      eventType,
      sessionId: this.sessionId,
      time: new Date(),
      machineId: this.getMachineId(),
      componentId: `gatsby-cli`,
      osInformation: this.getOsInfo(),
      componentVersion: this.componentVersion,
      ...getRepositoryId(),
    }
    this.store.addEvent(event)
  }

  getMachineId() {
    // Cache the result
    if (this.machineId) {
      return this.machineId
    }
    let machineId = this.store.getConfig(`telemetry.machineId`)
    if (!machineId) {
      machineId = uuidv4()
      this.store.updateConfig(`telemetry.machineId`, machineId)
    }
    this.machineId = machineId
    return machineId
  }

  isTrackingEnabled() {
    // Cache the result
    if (this.trackingEnabled !== undefined) {
      return this.trackingEnabled
    }
    let enabled = this.store.getConfig(`telemetry.enabled`)
    if (enabled === undefined || enabled === null) {
      if (!ci.isCI) {
        showAnalyticsNotification()
      }
      enabled = true
      this.store.updateConfig(`telemetry.enabled`, enabled)
    }
    this.trackingEnabled = enabled
    return enabled
  }

  getOsInfo() {
    if (this.osInfo) {
      return this.osInfo
    }
    const cpus = os.cpus()
    const osInfo = {
      nodeVersion: process.version,
      platform: os.platform(),
      release: os.release(),
      cpus: (cpus && cpus.length > 0 && cpus[0].model) || undefined,
      arch: os.arch(),
      ci: ci.isCI,
      ciName: (ci.isCI && ci.name) || process.env.CI_NAME || undefined,
      docker: isDocker(),
    }
    this.osInfo = osInfo
    return osInfo
  }

  trackActivity(source) {
    if (!this.isTrackingEnabled()) {
      return
    }
    // debounce by sending only the first event whithin a rolling window
    const now = Date.now()
    const last = this.debouncer[source] || 0
    const debounceTime = 5 * 1000 // 5 sec

    if (now - last > debounceTime) {
      this.captureEvent(source)
    }
    this.debouncer[source] = now
  }

  decorateNextEvent(event, obj) {
    const cached = this.metadataCache[event] || {}
    this.metadataCache[event] = Object.assign(cached, obj)
  }

  decorateAll(tags) {
    this.defaultTags = Object.assign(this.defaultTags, tags)
  }

  setTelemetryEnabled(enabled) {
    this.trackingEnabled = enabled
    this.store.updateConfig(`telemetry.enabled`, enabled)
  }

  async sendEvents() {
    if (!this.isTrackingEnabled()) {
      return Promise.resolve()
    }
    return this.store.sendEvents()
  }
}
