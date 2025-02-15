import { useState, useEffect } from 'react'
import './App.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function App() {
  const [minTemp, setMinTemp] = useState(22)
  const [maxTemp, setMaxTemp] = useState(28)
  const [temperatureData, setTemperatureData] = useState([])

  useEffect(() => {
    // Buscar configurações iniciais
    fetch('http://localhost:3000/temperatura/settings')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar configurações')
        }
        return response.json()
      })
      .then((data) => {
        setMinTemp(data.minTemperatura)
        setMaxTemp(data.maxTemperatura)
      })
      .catch((error) => {
        console.error('Erro ao buscar configurações:', error)
      })
  }, [])

  useEffect(() => {
    let intervalId

    const fetchTemperature = () => {
      fetch('http://localhost:3000/temperatura/current')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao buscar temperatura atual')
          }
          return response.json()
        })
        .then((data) => {
          const newEntry = {
            time: new Date(data.horario).toLocaleTimeString(),
            temperature: data.temperatura,
            statusAquecedor: data.statusAquecedor,
          }
          setTemperatureData((prevData) => [...prevData, newEntry].slice(-20)) // Mantém os últimos 20 registros
        })
        .catch((error) => {
          console.error('Erro ao buscar temperatura atual:', error)
        })
    }

    // Realiza a chamada inicial sem intervalo
    fetchTemperature()

    // Configura o intervalo de 30 segundos
    intervalId = setInterval(fetchTemperature, 7000)

    // Limpeza do intervalo quando o componente desmontar
    return () => clearInterval(intervalId)
  }, [])

  const handleSaveSettings = () => {
    // Envia os valores de configuração para o backend
    fetch('http://localhost:3000/temperatura/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        minTemperatura: minTemp,
        maxTemperatura: maxTemp,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao salvar configurações')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Configurações salvas:', data)
      })
      .catch((error) => {
        console.error('Erro ao salvar configurações:', error)
      })
  }

  return (
    <div className="App">
      <div className="card">
        <h1 className="text-4xl font-bold text-center mb-8">
          Aquecimento aquário
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h2>Configurar Temperatura</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="min-temp">Temperatura Mínima (°C)</label>
                <input
                  id="min-temp"
                  type="number"
                  value={minTemp}
                  onChange={(e) => setMinTemp(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="max-temp">Temperatura Máxima (°C)</label>
                <input
                  id="max-temp"
                  type="number"
                  value={maxTemp}
                  onChange={(e) => setMaxTemp(Number(e.target.value))}
                />
              </div>
              <button className="w-full" onClick={handleSaveSettings}>
                Salvar Configurações
              </button>
            </div>
          </div>

          <div className="card">
            <h2>Temperatura ao longo do tempo</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[15, 35]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela com os dados de temperatura */}
        <div className="card mt-8">
          <h2>Dados de Temperatura</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Horário</th>
                <th className="border border-gray-300 px-4 py-2">Temperatura (°C)</th>
                <th className="border border-gray-300 px-4 py-2">Aquecedor</th>
              </tr>
            </thead>
            <tbody>
              {temperatureData.map((entry, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{entry.time}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.temperature}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-bold ${
                      entry.statusAquecedor ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {entry.statusAquecedor ? 'Ligado' : 'Desligado'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App