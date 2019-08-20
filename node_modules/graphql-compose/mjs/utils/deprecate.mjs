export default function deprecate(msg) {
  let stack;
  let stackStr = '';
  const error = new Error();

  if (error.stack) {
    stack = error.stack.replace(/^\s+at\s+/gm, '').split('\n');
    stack.slice(2, 7).forEach((s, i) => {
      stackStr += i === 1 ? '\n--> ' : '\n    ';
      stackStr += s;
    });
  } // eslint-disable-next-line


  console.log(`GRAPHQL-COMPOSE DEPRECATION: ${msg} ${stackStr}\n\n`);
}