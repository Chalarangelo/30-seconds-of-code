/**
 * @flow
 */

type ESLintTestRunnerTestCase = {
  code: string,
  errors: ?Array<{ message: string, type: string }>,
  options: ?Array<mixed>,
  parserOptions: ?Array<mixed>
};

export default function ruleOptionsMapperFactory(ruleOptions: Array<mixed> = []) {
  // eslint-disable-next-line
  return ({ code, errors, options, parserOptions }: ESLintTestRunnerTestCase): ESLintTestRunnerTestCase => {
    return {
      code,
      errors,
      // Flatten the array of objects in an array of one object.
      options: (options || []).concat(ruleOptions).reduce((acc, item) => [{
        ...acc[0],
        ...item,
      }], [{}]),
      parserOptions,
    };
  };
}
