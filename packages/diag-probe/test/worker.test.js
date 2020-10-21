let Worker;
let describe;
if (Number(process.versions.node.match(/^(\d+)\./)[1]) < 12) {
  describe = global.describe.skip;
} else {
  describe = global.describe;
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  ({ Worker } = require('worker_threads'));
}
const binding = require('../lib');
const path = require('path');
const assert = require('assert');

describe('worker.test.js', () => {
  it('should not throws', done => {
    binding.setup();
    const worker = new Worker(
      path.resolve(__dirname, 'fixture/worker_main.js'),
      { execArgv: [] }
    );
    let workerStat;
    worker.on('message', msg => {
      workerStat = msg;
    });
    worker.on('exit', () => {
      const stat = binding.getStatistics();
      assert(stat['total_gc_times'] < workerStat['total_gc_times']);
      binding.teardown();
      done();
    });
  });
});
