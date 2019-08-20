# gatsby-telemetry

Check out: [gatsby.dev/telemetry](https://gatsby.dev/telemetry)

## API

### trackCli(type, tags)

Capture an event of type `type` and decorate the generated event with these tags (note: allowed tags are filtered on server side)

### trackError(type, tags)

Capture an error of type `type`. The exception maybe passed in tags and it will be sanitize to anonymize the contents.

### trackBuildError(type, tags)

Capture an build error of type `type`. The exception maybe passed in tags and it will be sanitize to anonymize the contents.

### setDefaultTags(tags)

Set additional tags to be included in all future events.

### decorateEvent(type, tags)

Attach additional tags to the next event generated of type `type`.

### setTelemetryEnabled(enabled)

Enable or disable the telemetry collection.

### expressMiddleware(type)

Returns a debounced events tracker for collecting general activity information for incoming requests.

## ENV Variables

- Set `GATSBY_TELEMETRY_DEBUG` to `1` to print the telemetry data instead of sending it over
- Set `GATSBY_TELEMETRY_DISABLED` to `1` to opt out of all telemetry
- Set `GATSBY_TELEMETRY_VERBOSE` to `1` to log all telemetry
