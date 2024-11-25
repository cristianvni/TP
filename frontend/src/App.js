import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AgregarViaje from './AgregarViaje';
import ConsultarViajes from './ConsultarViajes';
import ModificarViaje from './ModificarViaje';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/agregar-viaje">Agregar Viaje</Link></li>
            <li><Link to="/consultar-viajes">Consultar Viajes</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Bienvenido al sistema de gestión de viajes</h1>} />
          <Route path="/agregar-viaje" element={<AgregarViaje />} />
          <Route path="/consultar-viajes" element={<ConsultarViajes />} />
          <Route path="/modificar-viaje/:id" element={<ModificarViaje />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
