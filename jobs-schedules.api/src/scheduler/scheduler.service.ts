import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { JobsService } from '../jobs/services/jobs.service';
import { JobEntity } from '../jobs/entities/job.entity';
import { Queue, RepeatOptions } from 'bullmq';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class SchedulerService implements OnModuleInit, OnApplicationShutdown {
  private jobQueue: Queue;

  constructor(
    @Inject(forwardRef(() => JobsService))
    private readonly jobsService: JobsService,
    private readonly redisService: RedisService,
  ) {
    this.jobQueue = new Queue('job-queue', {
      connection: redisService.getClient(),
    });
  }

  async onModuleInit() {
    await this.initializeJobs();
  }

  async initializeJobs() {
    let offset = 0;
    const limit = 40;
    while (true) {
      const jobs = await this.jobsService.getAllJobs(limit, offset);

      if (!jobs.length) break;

      for (const job of jobs) {
        await this.scheduleJob(job);
      }
      offset += limit;
    }
    console.log('Jobs scheduled in Redis queue.');
  }

  async scheduleJob(job: JobEntity) {
    const intervalMs = this.parseInterval(job.interval);

    try {
      const jobExists = await this.checkIfJobExists(job.id);

      if (jobExists) {
        console.log(` Job "${job.name}" is already scheduled, skipping.`);
        return;
      }

      const repeatConfig: RepeatOptions = { every: intervalMs };
      await this.jobQueue.add(`job-${job.id}`, job, { repeat: repeatConfig });

      console.log(`Scheduled job: ${job.name} (Runs every ${job.interval})`);
    } catch (error) {
      console.error(`Failed to schedule job "${job.name}": ${error.message}`);
    }
  }

  async checkIfJobExists(jobId: number): Promise<boolean> {
    try {
      const existingJobs = await this.jobQueue.getRepeatableJobs();
      return existingJobs.some((job) => job.id === `job-${jobId}`);
    } catch (error) {
      console.error(`Error checking job existence: ${error.message}`);
      return false;
    }
  }

  parseInterval(interval: string): number {
    const match = interval.match(/(\d+)(s|m|h|d)/);
    if (!match) return 60000;

    const value = parseInt(match[1]);
    return { s: 1000, m: 60000, h: 3600000, d: 86400000 }[match[2]] * value;
  }

  async onApplicationShutdown() {
    await this.jobQueue.close();
    await this.redisService.close();
  }
}
