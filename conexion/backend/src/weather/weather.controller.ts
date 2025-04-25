import { Controller, Post, Body } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  getRecommendation(@Body() body: any) {
    console.log('BODY RECIBIDO:', body); // 👈 Agregado
    const { activity, weather } = body;
    return this.weatherService.getRecommendation(activity, weather);
  }
}
