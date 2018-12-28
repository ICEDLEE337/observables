const { spawn } = require('child_process');
const { Observable } = require('rxjs');

module.exports = function () {
  const proc = spawn('sh', ['-c', ...arguments]);

  const procservable = new Observable(o => {
    proc.stdout.on('data', data => o.next(data));
    proc.stdout.on('close', () => o.complete());
  });

  proc['stdoutStream'] = procservable;

  return proc;
};
