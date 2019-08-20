# Rule Generator

```bash
$ node scripts/create-rule.js rule-name --author="Your name" --description="Description of the rule"
# OR with npm script alias
$ npm run create -- rule-name --author="Your name" --description="Description of rule"
```

This script will generate three files with basic boilerplate for the given rule:
1. src/rules/${rule-name}.js
2. \__tests__/src/rules/${rule-name}-test.js
3. docs/rules/${rule-name}.md

If the rule already exists or is not specified in the correct format, an error will be thrown.

If we wanted to scaffold a rule for `no-marquee`, we could run:
```bash
$ node scripts/create-rule.js no-marquee --author="Ethan Cohen <@evcohen>" --description="Enforce <marquee> elements are not used."
# OR
$ npm run create -- no-marquee --author="Ethan Cohen <@evcohen>" --description="Enforce <marquee> elements are not used."
```
