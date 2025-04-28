import { Controller, Post, Body } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('clima')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  obtenerRecomendacion(@Body() body: any) {
    const { actividad, clima } = body;
    return this.weatherService.obtenerRecomendacion(actividad, clima);
  }
}
