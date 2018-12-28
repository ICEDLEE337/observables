const { timer } = require('rxjs');
const { map, takeUntil } = require('rxjs/operators');
const bash = require('./rx-bash');

module.exports = function () {
  const proc = bash('ping www.google.com');

  proc['stdoutStream']
    .pipe(map(x => x.toString()), takeUntil(timer(5000)))
    .subscribe(x => console.log(x), undefined, () => proc.kill());
};
