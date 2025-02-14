import { Module, forwardRef } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { JobsModule } from '../jobs/jobs.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [forwardRef(() => JobsModule), RedisModule],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
