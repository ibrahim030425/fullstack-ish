import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetch('/api/players')
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Fotbollsspelare och mål</h1>
      <ul>
        {players.map((p, i) => (
          <li key={i}>
            {p.name}: {p.goals} mål
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
