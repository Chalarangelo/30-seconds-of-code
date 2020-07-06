import childProcess from 'child_process';
import { initAction } from '../core';

const makeIcons = () => {
  const [boundLog] = initAction('makeIcons');
  boundLog('Icon font generation started...', 'info');

  return new Promise((resolve, reject) => {
    // TODO: This is a hack, probably write some code of our own for the generation
    // and get rid of the package as it has a lot of trouble running as a proper CLI!
    const iconGenerate = childProcess.spawn('npm', ['run', 'make-icons', '--silent']);
    boundLog(`${iconGenerate.spawnargs.join(' ')} (pid: ${iconGenerate.pid})`, 'info');

    iconGenerate.stdout.on('data', data => {
      `${data}`.split('\n').filter(s => s.trim().length).forEach(s => boundLog(s, 'info'));
    });
    iconGenerate.on('error', err => {
      boundLog(`${err}`, 'error');
      reject();
    });
    iconGenerate.on('exit', code => {
      boundLog(`Icon font generation completed with exit code ${code}`, 'success');
      resolve();
    });
  });
};

export default makeIcons;
