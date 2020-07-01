import childProcess from 'child_process';
import logger from '../logOutput';

const updateContent = () => {
  const boundLog = logger.bindProcessLogger('updateContent');
  if(typeof global._coeus_instance === 'undefined' || typeof global._coeus_instance.config === 'undefined')
    return logger.log('Fatal error: coeus instance or config not found. Exiting...', 'error');

  boundLog('Updating content sources started...', 'info');

  return new Promise((resolve, reject) => {
    const gitUpdate = childProcess.spawn('git', ['submodule', 'update', '--recursive', '--remote', '--depth=10000']);
    boundLog(`${gitUpdate.spawnargs.join(' ')} (pid: ${gitUpdate.pid})`, 'info');

    gitUpdate.stdout.on('data', data => {
      boundLog(`${data}`.replace('\n', ''), 'info');
    });
    gitUpdate.on('error', err => {
      boundLog(`${err}`, 'error');
      reject();
    });
    gitUpdate.on('exit', code => {
      boundLog(`Updating content sources completed with exit code ${code}`, 'success');
      resolve();
    });
  });
};

export default updateContent;
