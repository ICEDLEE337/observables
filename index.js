const {spawn} = require('child_process');
const {timer, Observable, Subject, ReplaySubject, from, of, range} = require('rxjs');
const {map, filter, switchMap, takeUntil} = require('rxjs/operators');

const proc = spawn('sh', ['-c', 'ping www.google.com']);

const ping = new Observable(o => {
    proc.stdout.on('data', data => o.next(data));
    proc.stdout.on('close', () => o.complete());
})
    ping.pipe(map(x => x.toString()), takeUntil(timer(5000)))
    .subscribe(x => console.log(x), undefined, () => proc.kill());
