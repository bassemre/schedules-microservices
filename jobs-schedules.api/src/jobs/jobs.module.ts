import { JobsService } from './services/jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from './entities/job.entity';
import { PaginatorModule } from '../common/paginator/paginator.module';
import { JobController } from './controllers/jobs.controller';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { Module, forwardRef } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity]),
    PaginatorModule,
    forwardRef(() => SchedulerModule),
    RedisModule,
  ],
  controllers: [JobController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
