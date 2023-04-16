import cluster from 'cluster';
import os from 'os';

const subprocess_cnt = os.cpus().length / 2;
// const subprocess_cnt = 1;

if (cluster.isPrimary) {
  cluster.on('message', (worker, message) => {
    console.log('primary recvd from: ', worker.process.pid, ' : ', message);
    worker.send('primary in your area');
  });

  for (let i = 0; i < subprocess_cnt; i++) {
    cluster.fork();
  }
} else if (cluster.isWorker) {
  process.on('message', (message) => {
    console.log('worker recvd message: ', message);
  });

  process.send('worker in your area ' + process.pid);
}
