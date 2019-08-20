# Changelog

## v1.6.0
 - Recommend absolute paths for rewrite targets. Contributed by @helfi92.

## v1.5.0
 - Expose the HTTP request object in rewrite rules. Contributed by @VladShcherbin.

## v1.4.0
 - The `.` (DOT) rule should only check the last path element. Contributed by @ntkme.

## v1.3.0
 - Allow disabling of the `.` (DOT) rule via the `disableDotRule` option.

## v1.2.0
 - Support definition of custom HTML `Accept` header values. Contributed by @cgmartin.

## v1.1.0
 - Rewrite rules are now applied before the request URL is checked for dots.
 - Rewrite rules can be defined as functions to have greater control over the `dot rule`.

## v1.0.0
This version introduces a fair amount of breaking changes. Specifically, instances of the historyApiFallback need to be created via the exported function. Previously, this was not necessary.

 - **Breaking:** Support multiple instances of the historyApiFallback middleware with different configurations.
 - **Breaking:** Loggers are configured per historyApiFallback middleware instance (see `README.md`).
 - The fallback index HTML file can be configured. Default is `/index.html`.
 - Additional rewrite rules can be defined via regular expressions.
