import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [listaActividades, setListaActividades] = useState<any[]>([]);
  const [actividadSeleccionada, setActividadSeleccionada] = useState<any | null>(null);

  const [clima, setClima] = useState({
    temperatura: 0,
    viento: 0,
    precipitacion: 0,
  });

  const [recomendacion, setRecomendacion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerActividades = async () => {
      try {
        const response = await fetch('http://localhost:3000/actividades');
        const data = await response.json();
        setListaActividades(data);
      } catch (err) {
        console.error('Error al cargar actividades:', err);
      }
    };

    obtenerActividades();
  }, []);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!actividadSeleccionada) {
      setError('Debes seleccionar una actividad');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/clima', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ actividad: actividadSeleccionada, clima }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      setRecomendacion(data.recomendacion);
      setError(null);
    } catch (err: any) {
      console.error('Error al obtener recomendacion:', err);
      setError(err.message || 'Error desconocido');
      setRecomendacion(null);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Recomendaciones Climáticas</h1>

      <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '1rem' }}>
        
        <h2>Seleccionar Actividad</h2>
        <select onChange={(e) => {
          const seleccionada = listaActividades.find((a) => a.nombre === e.target.value);
          setActividadSeleccionada(seleccionada);
        }}>
          <option value="">-- Elige una actividad --</option>
          {listaActividades.map((actividad) => (
            <option key={actividad.nombre} value={actividad.nombre}>
              {actividad.nombre}
            </option>
          ))}
        </select>

        {actividadSeleccionada && (
          <>
            <div><strong>Actividad:</strong> {actividadSeleccionada.nombre}</div>
            <div><strong>Temperaturas:</strong> {actividadSeleccionada.rangoTemperatura[0]}°C - {actividadSeleccionada.rangoTemperatura[1]}°C</div>
            <div><strong>Viento máximo:</strong> {actividadSeleccionada.vientoMaximo} km/h</div>
            <div><strong>Permite lluvia:</strong> {actividadSeleccionada.permiteLluvia ? 'Sí' : 'No'}</div>
          </>
        )}

        <h2>Clima Simulado</h2>

        <label>
          Temperatura actual (°C):
          <input
            type="number"
            value={clima.temperatura}
            onChange={(e) => setClima({ ...clima, temperatura: Number(e.target.value) })}
          />
        </label>

        <label>
          Viento actual (km/h):
          <input
            type="number"
            value={clima.viento}
            onChange={(e) => setClima({ ...clima, viento: Number(e.target.value) })}
          />
        </label>

        <label>
          Precipitación actual (mm):
          <input
            type="number"
            value={clima.precipitacion}
            onChange={(e) => setClima({ ...clima, precipitacion: Number(e.target.value) })}
          />
        </label>

        <button type="submit">Obtener recomendación</button>
      </form>

      {recomendacion && (
        <div style={{ marginTop: '2rem', backgroundColor: '#f0f0f0', padding: '1rem' }}>
          <strong>Recomendación:</strong>
          <p>{recomendacion}</p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '2rem', backgroundColor: '#ffe0e0', padding: '1rem', color: 'darkred' }}>
          <strong>Error:</strong>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
