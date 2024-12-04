import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AgregarComentario = () => {
    const [aerolinea, setAerolinea] = useState('');
    const [comentario, setComentario] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = (e) => {
        e.preventDefault();
        if (aerolinea && comentario) {
            // Aquí puedes agregar la lógica para guardar el comentario en tu base de datos o API
            console.log('Comentario agregado:', { aerolinea, comentario });
            // Limpiar los campos del formulario
            setAerolinea('');
            setComentario('');
            // Redirigir a la ruta principal
            navigate('/'); // Cambia '/' a la ruta que desees
        }
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