import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddTrip from "./components/AddTrip";
import AddComment from "./components/AddComment";
import ViewTrips from "./components/ViewTrips";
import EditTrip from "./components/EditTrip";
import EditComment from "./components/EditComment";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/add-trip">Agregar Viaje</Link>
            </li>
            <li>
              <Link to="/add-comment">Agregar Comentario</Link>
            </li>
            <li>
              <Link to="/view-trips">Consultar Viajes</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Bienvenido a la App de Gestión de Viajes</h1>} />
          <Route path="/add-trip" element={<AddTrip />} />
          <Route path="/add-comment" element={<AddComment />} />
          <Route path="/view-trips" element={<ViewTrips />} />
          <Route path="/edit-trip/:id" element={<EditTrip />} />
          <Route path="/edit-comment/:id" element={<EditComment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
