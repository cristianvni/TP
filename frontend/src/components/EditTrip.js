import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditTrip() {
  const { id } = useParams(); // Obtiene el ID del viaje desde la URL
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    pais: "",
    duracion_dias: "",
    costos: "",
    km_recorridos: "",
    mes: "",
    año: "",
  });

  useEffect(() => {
    // Recupera los datos del viaje desde el backend
    const fetchTrip = async () => {
      const response = await fetch(`http://localhost:3001/viajes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTrip(data);
      }
    };
    fetchTrip();
  }, [id]);

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/viajes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    });
    if (response.ok) {
      alert("Viaje actualizado exitosamente");
      navigate("/view-trips");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Viaje</h2>
      <input name="pais" placeholder="País" value={trip.pais} onChange={handleChange} />
      <input name="duracion_dias" placeholder="Duración (días)" value={trip.duracion_dias} onChange={handleChange} />
      <input name="costos" placeholder="Costos" value={trip.costos} onChange={handleChange} />
      <input name="km_recorridos" placeholder="Km Recorridos" value={trip.km_recorridos} onChange={handleChange} />
      <input name="mes" placeholder="Mes" value={trip.mes} onChange={handleChange} />
      <input name="año" placeholder="Año" value={trip.año} onChange={handleChange} />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default EditTrip;
