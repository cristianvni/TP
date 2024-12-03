import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditComment() {
  const { id } = useParams(); // Obtiene el ID del comentario desde la URL
  const navigate = useNavigate();
  const [comment, setComment] = useState({ pais: "", comentario: "" });

  useEffect(() => {
    // Recupera los datos del comentario desde el backend
    const fetchComment = async () => {
      const response = await fetch(`http://localhost:3001/comentarios/${id}`);
      if (response.ok) {
        const data = await response.json();
        setComment(data);
      }
    };
    fetchComment();
  }, [id]);

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/comentarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    if (response.ok) {
      alert("Comentario actualizado exitosamente");
      navigate("/view-trips");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Comentario</h2>
      <input name="pais" placeholder="País" value={comment.pais} onChange={handleChange} />
      <input name="comentario" placeholder="Comentario" value={comment.comentario} onChange={handleChange} />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default EditComment;
