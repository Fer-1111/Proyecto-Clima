import { Controller, Post, Get, Body } from '@nestjs/common';
import { ActivitiesService, Activity } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() activity: Activity) {
    return this.activitiesService.create(activity);
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }
}
