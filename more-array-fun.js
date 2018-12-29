const {range, concat, merge, timer, interval} = require('rxjs');
const {map, takeUntil} = require('rxjs/operators');
const log = require('./log');

module.exports = () => {
  const done = timer(6000);

  const o1 = interval(1000).pipe(takeUntil(done));
  const o2 = interval(1000).pipe(takeUntil(done));
  const o3 = interval(1000).pipe(takeUntil(done));

  // manager representation here...
  // POC here too: tagging streams for merging/multiplexing over one ipc channel
  const obs = [o1, o2, o3]
    .map((o, i) => o.pipe(map(data => `${whoAmI(i)}:${data}`)));

  merge(...obs)
    .subscribe(log);
};

function whoAmI (i) {
  return ['A', 'B', 'C'][i];
}
