import { useState } from 'react';
import './App.css';

function App() {
  const [activity, setActivity] = useState({
    name: '',
    temperatureRange: [10, 20],
    maxWind: 15,
    allowRain: false,
  });

  const [weather, setWeather] = useState({
    temperature: 0,
    wind: 0,
    precipitation: 0,
  });

  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Enviando datos:', activity, weather); // ✅ Confirmar que se ejecuta

    try {
      const response = await fetch('http://localhost:3000/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity, weather }),
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
        <h2>Actividad</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={activity.name}
          onChange={(e) => setActivity({ ...activity, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Temperatura mínima"
          value={activity.temperatureRange[0]}
          onChange={(e) =>
            setActivity({ ...activity, temperatureRange: [Number(e.target.value), activity.temperatureRange[1]] })
          }
        />

        <input
          type="number"
          placeholder="Temperatura máxima"
          value={activity.temperatureRange[1]}
          onChange={(e) =>
            setActivity({ ...activity, temperatureRange: [activity.temperatureRange[0], Number(e.target.value)] })
          }
        />

        <input
          type="number"
          placeholder="Viento máximo"
          value={activity.maxWind}
          onChange={(e) => setActivity({ ...activity, maxWind: Number(e.target.value) })}
        />

        <label>
          <input
            type="checkbox"
            checked={activity.allowRain}
            onChange={(e) => setActivity({ ...activity, allowRain: e.target.checked })}
          />
          ¿Permite lluvia?
        </label>

        <h2>Clima Simulado</h2>

        <input
          type="number"
          placeholder="Temperatura actual"
          value={weather.temperature}
          onChange={(e) => setWeather({ ...weather, temperature: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Viento actual"
          value={weather.wind}
          onChange={(e) => setWeather({ ...weather, wind: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Precipitación actual"
          value={weather.precipitation}
          onChange={(e) => setWeather({ ...weather, precipitation: Number(e.target.value) })}
        />

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
