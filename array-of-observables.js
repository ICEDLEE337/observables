const {map} = require('rxjs/operators');
const bash = require('./rx-bash');

module.exports = function () {
  searchMany().forEach(o => o.subscribe(console.log.bind(console)));
};

function searchMany (termParams = ['emit', 'log', 'map']) {
  const observables = termParams
    .map(termParam =>
      search(termParam)
    );
  return observables;
}

function search (termParam) {
  const term = termParam || 'emit';
  const proc = bash(`git grep ${term}`);

  return proc['stdoutStream']
    .pipe(map(x => x.toString()))
    .pipe(map(highlightTerm.bind(null, termParam)));
}

function highlightTerm (term, match) {
  return match.replace(new RegExp(term + '?', 'g'), `__________${term}__________`);
}
