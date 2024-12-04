import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgregarViaje from "./pages/AgregarViaje.jsx";
import EditarViaje from "./pages/EditarViaje.jsx";
import AgregarComentario from "./pages/AgregarComentario.jsx";
import EditarComentario from "./pages/EditarComentario.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path={"/viaje/agregar"} element={<AgregarViaje />} />
              <Route path={"/viaje/editar"} element={<EditarViaje />} />
              <Route path={"/comentario/agregar"} element={<AgregarComentario />} />
              <Route path={"/comentario/editar"} element={<EditarComentario />} />
          </Routes>
      </Router>
  </StrictMode>,
)
