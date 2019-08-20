/**
 * Module dependencies.
 */

var program = require('../');
var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')

var envValue = '';
var cmdValue = '';
var nameValue = '';
var customHelp = false;

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option('-s, --setup_mode [mode]', 'Which setup mode to use')
  .option('-o, --host [host]', 'Host to use')
  .action(function(env, options){
    var mode = options.setup_mode || 'normal';
    env = env || 'all';
    
    envValue = env;
  });

program
  .command('exec <cmd>')
  .aliases('run')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use')
  .option('-t, --target [target]', 'Target to use')
  .action(function(cmd, options){
    cmdValue = cmd;
  }).on('--help', function(){
    customHelp = true;
  });

program
  .command('initialize <name>')
  .aliases(['init', 'i'])
  .description('Initialises the config')
  .action(function (name) {
    nameValue = name;
  });

program
  .command('*')
  .action(function(env){
    console.log('deploying \'%s\'', env);
  });
  

test('test 1', function (t) {
  program.parse(['node', 'test', '--config', 'conf']);
  t.equals(program.config, 'conf');
  t.notOk(program.command[0] && 'setup_mode' in program.command[0]);
  t.notOk(program.command[1] && 'exec_mode' in program.command[1]);
  t.notOk(envValue);
  t.notOk(cmdValue);
  t.end();
});


test('test 2', function (t) {
  program.parse(['node', 'test', '--config', 'conf1', 'setup', '--setup_mode', 'mode3', 'env1']);
  t.equals(program.config, 'conf1');
  t.equals(program.commands[0].setup_mode, 'mode3');
  t.equals(program.commands[0].host, undefined);
  t.equals(envValue, 'env1');
  t.end();
});


test('test 3', function (t) {
  program.parse(['node', 'test', '--config', 'conf2', 'setup', '--setup_mode', 'mode3', '-o', 'host1', 'env2']);
  t.equals(program.config, 'conf2');
  t.equals(program.commands[0].setup_mode, 'mode3');
  t.equals(program.commands[0].host, 'host1');
  t.equals(envValue, 'env2');
  t.end();
});


test('test 4', function (t) {
  program.parse(['node', 'test', '--config', 'conf3', 'setup', '-s', 'mode4', 'env3']);
  t.equals(program.config, 'conf3');
  t.equals(program.commands[0].setup_mode, 'mode4');
  t.equals(envValue, 'env3');
  t.end();
});


test('test 5', function (t) {
  program.parse(['node', 'test', '--config', 'conf4', 'exec', '--exec_mode', 'mode1', 'exec1']);
  t.equals(program.config, 'conf4');
  t.equals(program.commands[1].exec_mode, 'mode1');
  t.notOk('target' in program.commands[1]);
  t.equals(cmdValue, 'exec1');
  t.end();
});


test('test 6', function (t) {
  program.parse(['node', 'test', '--config', 'conf5', 'exec', '-e', 'mode2', 'exec2']);
  t.equals(program.config, 'conf5');
  t.equals(program.commands[1].exec_mode, 'mode2');
  t.equals(cmdValue, 'exec2');
  t.end();
});


test('test 7', function (t) {
  program.parse(['node', 'test', '--config', 'conf6', 'exec', '--target', 'target1', '-e', 'mode2', 'exec3']);
  t.equals(program.config, 'conf6');
  t.equals(program.commands[1].exec_mode, 'mode2');
  t.equals(program.commands[1].target, 'target1');
  t.equals(cmdValue, 'exec3');
  t.end();
});

test('has aliases', function (t) {
  program.parse(['node', 'test', '--config', 'conf7', 'exec', '--target', 'target7', '-e', 'mode7', 'exec7']);
  t.equals(program.config, 'conf7');
  t.equals(program.commands[1]._aliases[0], 'run');
  t.equals(program.commands[1].exec_mode, 'mode7');
  t.equals(program.commands[1].target, 'target7');
  t.equals(cmdValue, 'exec7');
  t.end();
});

test('multiple aliases', function (t) {
  program.parse(['node', 'test', 'initialize', 'config8']);

  var command = program.commands[2],
    expectedAliases = ['init', 'i'];

  t.equals(command._name, 'initialize');
  t.same(command._aliases, expectedAliases);
  t.equals(nameValue, 'config8');
  t.end();
});

test('running an alias', function (t) {
  program.parse(['node', 'test', 'init', 'config9']);

  var command = program.commands[2];

  t.equals(command._aliases.length, 2);
  t.equals(command._name, 'initialize'); 
  t.equals(nameValue, 'config9');
  t.end();
});

// Make sure we still catch errors with required values for options
test('errors', function (t) {

  var exceptionOccurred = false;
  var oldProcessExit = process.exit;
  var oldConsoleError = console.error;
  process.exit = function() { exceptionOccurred = true; throw new Error(); };
  console.error = function() {};
  t.test('should work even if it throws', function (t) {
    try {
      program.parse(['node', 'test', '--config', 'conf6', 'exec', '--help']);
    } catch(ex) {
      t.equals(program.config, 'conf6');
      t.end();
    }
  });
  t.test('should exid right', function (t) {
    try {
        program.parse(['node', 'test', '--config', 'conf', 'exec', '-t', 'target1', 'exec1', '-e']);
    }
    catch(ex) {
    }

    process.exit = oldProcessExit;
    t.ok(exceptionOccurred);
    t.ok(customHelp);
    t.end();
  });
});
