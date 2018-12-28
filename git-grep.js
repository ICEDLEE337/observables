const { spawn } = require('child_process');
const { timer, Observable } = require('rxjs');
const { map, takeUntil } = require('rxjs/operators');

module.exports = function () {
  const proc = spawn('sh', ['-c', 'ping www.google.com']);

  const ping = new Observable(o => {
    proc.stdout.on('data', data => o.next(data));
    proc.stdout.on('close', () => o.complete());
  });
  ping.pipe(map(x => x.toString()), takeUntil(timer(5000)))
    .subscribe(x => console.log(x), undefined, () => proc.kill());
};
