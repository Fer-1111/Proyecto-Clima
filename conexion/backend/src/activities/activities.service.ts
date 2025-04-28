import { Injectable } from '@nestjs/common';

export type Actividad = {
  nombre: string;
  rangoTemperatura: [number, number];
  vientoMaximo: number;
  permiteLluvia: boolean;
};

@Injectable()
export class ActivitiesService {
  private actividades: Actividad[] = [
    {
      nombre: 'Correr',
      rangoTemperatura: [10, 20],
      vientoMaximo: 15,
      permiteLluvia: false,
    },
    {
      nombre: 'Senderismo',
      rangoTemperatura: [10, 18],
      vientoMaximo: 10,
      permiteLluvia: false,
    },
    {
      nombre: 'Jardinería',
      rangoTemperatura: [15, 25],
      vientoMaximo: 20,
      permiteLluvia: true,
    },
  ];

  crear(actividad: Actividad) {
    this.actividades.push(actividad);
    return {
      mensaje: 'Actividad registrada correctamente',
      actividad,
    };
  }

  obtenerTodas() {
    return this.actividades;
  }
}
