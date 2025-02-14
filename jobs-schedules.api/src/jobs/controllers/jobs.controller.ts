import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { JobsService } from '../services/jobs.service';
import { JobEntity } from '../entities/job.entity';
import { CreateJobDto } from '../dtos/create-job.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { FilterJobs } from '../dtos/filter-jobs.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { isPublic } from '../../common/decorators/public.decorator';

@ApiTags('jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobsService) {}

  @Post()
  async createJob(
    @Body() createJobDto: CreateJobDto,
    @CurrentUser() user: { id: number },
  ): Promise<JobEntity> {
    return await this.jobService.createJob(createJobDto, user);
  }
  @Get()
  async filterJobs(
    @Query() filter: FilterJobs,
    @CurrentUser() user: { id: number },
  ): Promise<{
    items: JobEntity[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.jobService.filterJobs(filter, user);
  }

  @Get(':id')
  async getJobById(
    @Param('id') id: number,
    @CurrentUser() user: { id: number },
  ): Promise<JobEntity> {
    return this.jobService.getJobById(id, user);
  }
}
