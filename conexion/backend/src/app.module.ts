import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [ActivitiesModule, WeatherModule],
})
export class AppModule {}
