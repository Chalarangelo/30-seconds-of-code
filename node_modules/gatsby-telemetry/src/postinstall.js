try {
  const showAnalyticsNotification = require(`./showAnalyticsNotification`)
  const EventStorage = require(`./event-storage`)

  const ci = require(`ci-info`)
  const eventStorage = new EventStorage()
  const disabled = eventStorage.disabled
  const enabledInConfig = eventStorage.getConfig(`telemetry.enabled`)
  if (enabledInConfig === undefined && !disabled && !ci.isCI) {
    showAnalyticsNotification()
  }
} catch (e) {
  // ignore
}
