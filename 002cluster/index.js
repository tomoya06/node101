import cluster from 'node:cluster';
import os from 'node:os';

const subprocess_cnt = 1;
// const subprocess_cnt = os.cpus().length / 2;

if (cluster.isPrimary) {
  console.log('i;m primary');
  console.log('Main process: ' + process.pid);

  for (let i = 0; i < subprocess_cnt; i++) {
    cluster.fork();
  }

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' die code: ' + code + ', signal: ' + signal);
    console.log('main process start a new worker ', process.pid);
    cluster.fork();
  });
} else {
  console.log('i;m secondary');

  process.on('uncaughtException', (err, org) => {
    console.log('uncaughtException: ', err?.name.split('\n')?.[0], ' ; origin: ', org);
    console.log('i kill myself: ', process.pid);
    process.kill(process.pid, 'SIGINT');

    // ↓↓↓ this code cant be reached actually ↓↓↓
    console.log('i start a new worker', process.pid);
    cluster.fork();
  });

  setTimeout(() => {
    // ↓↓↓ this code is bug on purpose ↓↓↓
    doSomethingStupid();
    process.exit(1);
  }, 1000);
}
