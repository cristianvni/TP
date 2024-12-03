import React, { useState } from "react";

function AddTrip() {
  const [trip, setTrip] = useState({
    pais: "",
    duracion_dias: "",
    costos: "",
    km_recorridos: "",
    mes: "",
    año: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { pais, duracion_dias, costos, km_recorridos, mes, año } = trip;

    // Validación simple de campos
    if (!pais || !duracion_dias || !costos || !km_recorridos || !mes || !año) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/viajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip),
      });

      if (response.ok) {
        alert("Viaje agregado exitosamente");
        setTrip({ pais: "", duracion_dias: "", costos: "", km_recorridos: "", mes: "", año: "" });
      } else {
        const errorData = await response.json();
        alert(`Error al agregar viaje: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Viaje</h2>
      <input name="pais" placeholder="País" value={trip.pais} onChange={handleChange} />
      <input name="duracion_dias" type="number" placeholder="Duración (días)" value={trip.duracion_dias} onChange={handleChange} />
      <input name="costos" type="number" step="0.01" placeholder="Costos" value={trip.costos} onChange={handleChange} />
      <input name="km_recorridos" type="number" placeholder="Km Recorridos" value={trip.km_recorridos} onChange={handleChange} />
      <input name="mes" type="number" placeholder="Mes" value={trip.mes} onChange={handleChange} />
      <input name="año" type="number" placeholder="Año" value={trip.año} onChange={handleChange} />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddTrip;
