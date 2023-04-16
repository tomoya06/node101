import cluster from 'node:cluster';
import os from 'node:os';

if (cluster.isPrimary) {
  console.log('i;m primary');
  console.log('Main process: ' + process.pid);

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function (worker, code, signal) {
    console.log(
      'Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal,
    );
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  console.log('i;m secondary');

  setTimeout(() => {
    process.exit(1);
  }, 5000);
}
