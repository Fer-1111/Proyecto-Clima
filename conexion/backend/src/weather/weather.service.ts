import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  obtenerRecomendacion(actividad: any, clima: any): { recomendacion: string } {
    const [temperaturaMinima, temperaturaMaxima] = actividad.rangoTemperatura;
    const { temperatura, viento, precipitacion } = clima;

    if (temperatura < temperaturaMinima || temperatura > temperaturaMaxima) {
      return { recomendacion: 'No se recomienda por temperatura inadecuada.' };
    }

    if (viento > actividad.vientoMaximo) {
      return { recomendacion: 'No se recomienda por viento fuerte.' };
    }

    if (!actividad.permiteLluvia && precipitacion > 0) {
      return { recomendacion: 'No se recomienda por lluvia.' };
    }

    return { recomendacion: 'Condiciones ideales. Se recomienda realizar la actividad.' };
  }
}
