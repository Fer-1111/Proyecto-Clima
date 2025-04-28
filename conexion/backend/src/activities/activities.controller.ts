import { Controller, Post, Get, Body } from '@nestjs/common';
import { ActivitiesService, Actividad } from './activities.service';

@Controller('actividades')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  crear(@Body() actividad: Actividad) {
    return this.activitiesService.crear(actividad);
  }

  @Get()
  obtenerTodas() {
    return this.activitiesService.obtenerTodas();
  }
}
