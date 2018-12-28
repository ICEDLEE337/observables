const { map } = require('rxjs/operators');
const bash = require('./rx-bash');

module.exports = function (termParam) {
  const term = termParam || 'emit';
  const proc = bash(`git grep ${term}`);

  proc['stdoutStream']
    .pipe(map(x => x.toString()))
    .pipe(map(highlightTerm.bind(null, term)))
    .subscribe(x => console.log(x));
};

function highlightTerm (term, match) {
  return match.replace(new RegExp(term + '?', 'g'), `__________${term}__________`);
}
