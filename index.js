const rx = require('rx-node');
const { spawn } = require('child_process');

const proc = spawn('sh', ['-c', 'ping www.google.com']);

rx.fromStream(proc.stdout)
    .map(buf => buf.toString())
    .subscribe(console.log.bind(console));
