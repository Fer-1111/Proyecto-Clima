import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activitiesList, setActivitiesList] = useState<any[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);

  const [weather, setWeather] = useState({
    temperature: 0,
    wind: 0,
    precipitation: 0,
  });

  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🚀 Cargar actividades cuando inicia
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:3000/activities');
        const data = await response.json();
        setActivitiesList(data);
      } catch (err) {
        console.error('Error al cargar actividades:', err);
      }
    };

    fetchActivities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedActivity) {
      setError('Debes seleccionar una actividad');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity: selectedActivity, weather }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
      setError(null);
    } catch (err: any) {
      console.error('Error al obtener recomendación:', err);
      setError(err.message || 'Error desconocido');
      setRecommendation(null);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Recomendaciones Climáticas</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '1rem' }}>
        
        <h2>Seleccionar Actividad</h2>
        <select onChange={(e) => {
          const selected = activitiesList.find((a) => a.name === e.target.value);
          setSelectedActivity(selected);
        }}>
          <option value="">-- Elige una actividad --</option>
          {activitiesList.map((activity) => (
            <option key={activity.name} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>

        {selectedActivity && (
          <>
            <div>
              <strong>Actividad:</strong> {selectedActivity.name}
            </div>
            <div>
              <strong>Temperaturas:</strong> {selectedActivity.temperatureRange[0]}°C - {selectedActivity.temperatureRange[1]}°C
            </div>
            <div>
              <strong>Viento máximo:</strong> {selectedActivity.maxWind} km/h
            </div>
            <div>
              <strong>Permite lluvia:</strong> {selectedActivity.allowRain ? 'Sí' : 'No'}
            </div>
          </>
        )}

        <h2>Clima Simulado</h2>

        <label>
          Temperatura actual (°C):
          <input
            type="number"
            value={weather.temperature}
            onChange={(e) => setWeather({ ...weather, temperature: Number(e.target.value) })}
          />
        </label>

        <label>
          Viento actual (km/h):
          <input
            type="number"
            value={weather.wind}
            onChange={(e) => setWeather({ ...weather, wind: Number(e.target.value) })}
          />
        </label>

        <label>
          Precipitación actual (mm):
          <input
            type="number"
            value={weather.precipitation}
            onChange={(e) => setWeather({ ...weather, precipitation: Number(e.target.value) })}
          />
        </label>


        <button type="submit">Obtener recomendación</button>
      </form>

      {recommendation && (
        <div style={{ marginTop: '2rem', backgroundColor: '#f0f0f0', padding: '1rem' }}>
          <strong>Recomendación:</strong>
          <p>{recommendation}</p>
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
