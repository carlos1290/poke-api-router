import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Pokemon } from './assets/pokemon';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <nav style={{ width: '200px', padding: '10px', background: '#f0f0f0' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link to="/pokemonFavorito">Mi Pokémon Favorito</Link>
            </li>
            <li>
              <Link to="/pokemon/77">Ver Pokémon con ID 77</Link>
            </li>
            {/* Agrega más enlaces según lo necesites */}
          </ul>
        </nav>
        <div style={{ marginLeft: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/pokemon/77" />} /> {/* Redirige la raíz a Pokémon con ID 77 */}
            <Route path="/pokemonFavorito" element={<Pokemon name="Pikachu" />} />
            <Route path="/pokemon" element={<Navigate to="/pokemon/77" />} /> {/* Redirige a 77 si no hay ID */}
            <Route path="/pokemon/:id" element={<Pokemon />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
