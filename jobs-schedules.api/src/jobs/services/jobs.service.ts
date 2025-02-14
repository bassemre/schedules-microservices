import { SchedulerService } from './../../scheduler/scheduler.service';
import { PaginatorInput } from '../../common/paginator/types/paginate.input';
import { PaginatorService } from '../../common/paginator/paginator.service';
import { CreateJobDto } from '../dtos/create-job.dto';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JobEntity } from '../entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobsRepo: Repository<JobEntity>,
    @Inject(forwardRef(() => SchedulerService))
    private readonly schedulerService: SchedulerService,
    private readonly paginatorService: PaginatorService,
    private readonly redisService: RedisService,
  ) {}

  async filterJobs(
    filter: PaginatorInput,
    user: { id: number },
  ): Promise<{
    items: JobEntity[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { id } = user;
    const { limit, page } = filter;
    const take = limit ?? 10;
    const skip = ((page ?? 1) - 1) * take;

    const [result, total] = await this.jobsRepo.findAndCount({
      where: { user: { id } },
      take,
      skip,
      order: { createdAt: 'DESC' },
    });

    return this.paginatorService.paginate(result, total, take, page);
  }

  async getJobById(id: number, user: { id: number }): Promise<JobEntity> {
    const { id: userId } = user;
    const job = await this.jobsRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!job) throw new BadRequestException('job not found');

    return job;
  }

  async createJob(
    createJobDto: CreateJobDto,
    user: { id: number },
  ): Promise<JobEntity> {
    const job = this.jobsRepo.create({
      ...createJobDto,
      user: { id: user.id },
    });

    const savedJob = await this.jobsRepo.save(job);

    await this.schedulerService.scheduleJob(savedJob);
    return savedJob;
  }

  async getAllJobs(limit: number, offset: number) {
    return await this.jobsRepo.find({
      where: { isActive: true },
      take: limit,
      skip: offset,
    });
  }
}
