import { Injectable } from '@nestjs/common';

export type Activity = {
  name: string;
  temperatureRange: [number, number];
  maxWind: number;
  allowRain: boolean;
};

@Injectable()
export class ActivitiesService {
  private activities: Activity[] = [
    {
      name: 'Correr',
      temperatureRange: [10, 20],
      maxWind: 15,
      allowRain: false,
    },
    {
      name: 'Senderismo',
      temperatureRange: [10, 18],
      maxWind: 10,
      allowRain: false,
    },
    {
      name: 'Jardinería',
      temperatureRange: [15, 25],
      maxWind: 20,
      allowRain: true,
    },
  ];

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
