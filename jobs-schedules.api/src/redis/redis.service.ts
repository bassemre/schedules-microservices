import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
      maxRetriesPerRequest: null,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });

    this.redisClient.on('error', (err) =>
      console.error(' Redis Error:', err.message),
    );
    this.redisClient.on('connect', () => console.log('Connected to Redis'));
  }

  getClient(): Redis {
    return this.redisClient;
  }

  async close(): Promise<void> {
    await this.redisClient.quit();
  }

  onModuleInit() {
    console.log('RedisService initialized.');
  }

  onModuleDestroy() {
    this.close();
  }
}
