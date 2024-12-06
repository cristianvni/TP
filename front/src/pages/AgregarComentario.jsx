import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AgregarComentario = () => {
    const [aerolinea, setAerolinea] = useState('');
    const [comentario, setComentario] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoComentario = {
            aerolinea,
            comentario
        };

        // Enviar POST request a localhost/api/viajes
        fetch('http://localhost:8080/api/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoComentario),
        })
            .then((response) => response.json())
            .then((data) => console.log('Respuesta del servidor:', data))
            .catch((error) => console.error('Error al enviar solicitud:', error));

        // Redirigir a la tabla de viajes después de agregar
        navigate('/'); // Cambiar history.push por navigate
    };

    return (
        <Container>
            <h2>Agregar Comentario</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAerolinea">
                    <Form.Label>Aerolínea</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la aerolínea"
                        value={aerolinea}
                        onChange={(e) => setAerolinea(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formComentario">
                    <Form.Label>Comentario</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Ingrese su comentario"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Agregar Comentario
                </Button>
            </Form>
        </Container>
    );
};

export default AgregarComentario;