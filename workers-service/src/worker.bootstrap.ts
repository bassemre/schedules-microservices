import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './workers/workers.module';
import { WorkerService } from './workers/workers.services';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerModule);
  const workerService = app.get(WorkerService);
  await workerService.initializeWorker();
}

bootstrap();
