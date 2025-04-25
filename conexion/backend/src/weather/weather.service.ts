import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
    getRecommendation(activity: any, weather: any): { recommendation: string } {
        try {
          const [minTemp, maxTemp] = activity.temperatureRange;
          const { temperature, wind, precipitation } = weather;
      
          if (temperature < minTemp || temperature > maxTemp) {
            return { recommendation: 'No se recomienda por temperatura inadecuada.' };
          }
      
          if (wind > activity.maxWind) {
            return { recommendation: 'No se recomienda por viento fuerte.' };
          }
      
          if (!activity.allowRain && precipitation > 0) {
            return { recommendation: 'No se recomienda por lluvia.' };
          }
      
          return { recommendation: 'Condiciones ideales. Se recomienda realizar la actividad.' };
        } catch (err) {
          console.error('ERROR EN getRecommendation:', err);
          throw err;
        }
    }
}
