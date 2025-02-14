import { Injectable, OnModuleInit } from '@nestjs/common';
import { Worker } from 'bullmq';
import { RedisService } from '../redis/redis.service';
import { DataSource } from 'typeorm';
import { JobStatus } from './enums/jobs-status.enum';

@Injectable()
export class WorkerService implements OnModuleInit {
  private worker: Worker;

  constructor(
    private readonly redisService: RedisService,
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    console.log('Worker Service Initialized');
    this.initializeWorker();
  }

  async initializeWorker() {
    const redisClient = this.redisService.getClient();

    this.worker = new Worker(
      'job-queue',
      async (job) => {
        const jobId = job.data.id || job.opts.repeatJobKey || 'UNKNOWN_ID';
        console.log(`Processing job: ${jobId} | Name: ${job.data.name}`);

        //Set job status to RUNNING
        await this.updateJobStatus(+jobId, JobStatus.RUNNING);

        try {
          await new Promise((resolve) => setTimeout(resolve, 6000)); // Simulate job execution

          const sqlInterval = this.convertToSQLInterval(job.data.interval);

          // Update job execution time & status in database
          await this.dataSource.query(
            `UPDATE jobs SET status = $1, last_run = NOW(), next_run = NOW() + INTERVAL '${sqlInterval}' WHERE id = $2`,
            [JobStatus.COMPLETED, jobId],
          );

          console.log(
            `Job "${job.data.name}" (ID: ${jobId}) completed. Next run in ${job.data.interval}`,
          );
        } catch (error) {
          console.error(`Job ${jobId} failed: ${error.message}`);

          // Set job status to FAILED
          await this.updateJobStatus(+jobId, JobStatus.FAILED);
        }
      },
      { connection: redisClient, concurrency: 2 }, //We can adjust concurrency as we need this just for test
    );

    this.worker.on('ready', () => console.log('Worker is ready.'));
    this.worker.on('failed', async (job, err) => {
      const jobId = job.data.id || job.opts.repeatJobKey || 'UNKNOWN_ID';
      console.error(`Job ${jobId} failed:`, err);
      await this.updateJobStatus(+jobId, JobStatus.FAILED);
    });
  }

  /**
   *  Convert job interval (e.g., '5m', '1h', '2d') into SQL INTERVAL format
   */
  private convertToSQLInterval(interval: string): string {
    const match = interval.match(/^(\d+)(s|m|h|d)$/);
    if (!match) {
      console.warn(
        `Invalid interval format: ${interval}. Defaulting to 1 hour.`,
      );
      return '1 hour'; // Default if format is incorrect
    }

    const value = match[1]; // Numeric part
    const unit = match[2]; // Time unit

    switch (unit) {
      case 's':
        return `${value} second`;
      case 'm':
        return `${value} minute`;
      case 'h':
        return `${value} hour`;
      case 'd':
        return `${value} day`;
      default:
        return '1 hour';
    }
  }

  private async updateJobStatus(jobId: number, status: JobStatus) {
    await this.dataSource.query(
      `UPDATE jobs SET status = $1, updated_at = NOW() WHERE id = $2`,
      [status, jobId],
    );
    console.log(`🔄 Job ${jobId} status updated to: ${status}`);
  }
}
