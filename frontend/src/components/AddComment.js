import React, { useState } from "react";

function AddComment() {
  const [comment, setComment] = useState({ pais: "", comentario: "" });

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/comentarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    if (response.ok) {
      alert("Comentario agregado exitosamente");
      setComment({ pais: "", comentario: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Comentario</h2>
      <input name="pais" placeholder="País" value={comment.pais} onChange={handleChange} />
      <input name="comentario" placeholder="Comentario" value={comment.comentario} onChange={handleChange} />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddComment;
