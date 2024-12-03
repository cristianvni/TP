import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewTrips() {
  const [trips, setTrips] = useState([]);
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
    fetchComments();
  }, []);

  const fetchTrips = async () => {
    const response = await fetch("http://localhost:3001/viajes");
    const data = await response.json();
    setTrips(data);
  };

  const fetchComments = async () => {
    const response = await fetch("http://localhost:3001/comentarios");
    const data = await response.json();
    setComments(data);
  };

  const handleDeleteTrip = async (id) => {
    await fetch(`http://localhost:3001/viajes/${id}`, { method: "DELETE" });
    fetchTrips();
  };

  const handleDeleteComment = async (id) => {
    await fetch(`http://localhost:3001/comentarios/${id}`, { method: "DELETE" });
    fetchComments();
  };

  return (
    <div>
      <div>
        <h2>Consultar Viajes</h2>
        <input placeholder="Buscar por país" value={search} onChange={(e) => setSearch(e.target.value)} />
        <table>
          <thead>
            <tr>
              <th>País</th>
              <th>Duración</th>
              <th>Costos</th>
              <th>Kms</th>
              <th>Mes</th>
              <th>Año</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {trips
              .filter((trip) => trip.pais.toLowerCase().includes(search.toLowerCase()))
              .map((trip) => (
                <tr key={trip.id}>
                  <td>{trip.pais}</td>
                  <td>{trip.duracion_dias}</td>
                  <td>{trip.costos}</td>
                  <td>{trip.km_recorridos}</td>
                  <td>{trip.mes}</td>
                  <td>{trip.año}</td>
                  <td>
                    <button onClick={() => navigate(`/edit-trip/${trip.id}`)}>Editar</button>
                    <button onClick={() => handleDeleteTrip(trip.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Comentarios</h2>
        <div>
          {comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.pais}: {comment.comentario}</p>
              <button onClick={() => navigate(`/edit-comment/${comment._id}`)}>Editar</button>
              <button onClick={() => handleDeleteComment(comment._id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTrips;
