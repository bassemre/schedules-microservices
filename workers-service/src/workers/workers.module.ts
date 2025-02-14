import { Module } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { DatabaseModule } from '../databases/database.module';
import { WorkerService } from './workers.services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.${process.env.NODE_ENV}.env`
        : '.env',
    }),
  ],
  providers: [WorkerService, RedisService],
})
export class WorkerModule {}
