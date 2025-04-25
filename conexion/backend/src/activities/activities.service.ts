import { Injectable } from '@nestjs/common';

export type Activity = {
  name: string;
  temperatureRange: [number, number];
  maxWind: number;
  allowRain: boolean;
};

@Injectable()
export class ActivitiesService {
  private activities: Activity[] = [];

  create(activity: Activity) {
    this.activities.push(activity);
    return {
      message: 'Actividad registrada correctamente',
      activity,
    };
  }

  findAll() {
    return this.activities;
  }
}
