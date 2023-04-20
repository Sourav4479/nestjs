import cluster from 'cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;

@Injectable()
export class AppClusterService {
  //   static clusterize(callback): void {
  //     if (cluster.isPrimary) {
  //       console.log(`Master server started on ${process.pid}`);
  //       for (let i = 0; i < numCPUs; i++) {
  //         cluster.fork();
  //       }
  //       cluster.on('exit', (worker, code, signal) => {
  //         console.log(`Worker ${worker.process.pid} died. Restarting`);
  //         cluster.fork();
  //       });
  //     } else {
  //       console.log(`Cluster server started on ${process.pid}`);
  //       callback();
  //     }
  //   }
  static register(workers: number, callback): void {
    if (cluster.isPrimary) {
      console.log(`Master server started on ${process.pid}`);

      //ensure workers exit cleanly
      process.on('SIGINT', function () {
        console.log('Cluster shutting down...');
        for (const id in cluster.workers) {
          cluster.workers[id].kill();
        }
        // exit the master process
        process.exit(0);
      });

      const cpus = os.cpus().length;
      if (workers > cpus) workers = cpus;

      for (let i = 0; i < workers; i++) {
        cluster.fork();
      }
      cluster.on('online', function (worker) {
        console.log('Worker %s is online', worker.process.pid);
      });
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      callback();
    }
  }
}
