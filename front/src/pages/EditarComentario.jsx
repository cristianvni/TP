import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

const EditarComentario = () => {
    const location = useLocation();

    const comentario = location.state?.comentario; // Accede al objeto comentario de forma segura

    const [aerolinea, setAerolinea] = useState('');
    const [comentarioDescripcion, setComentarioDescripcion] = useState('');
    const navigate = useNavigate(); // Hook para la navegación


    // Cargar los datos del comentario actual cuando el componente se monta
    useEffect(() => {
        console.log('Comentario actual:', comentario);
        if (comentario) {
            setAerolinea(comentario.aerolinea || ''); // Asegúrate de que no sea undefined
            setComentarioDescripcion(comentario.comentario || ''); // Asegúrate de que no sea undefined
        }
    }, [comentario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const comentarioActualizado = {
            aerolinea,
            comentario: comentarioDescripcion
        };
        try {
            fetch(`http://localhost:8080/api/comentarios/${comentario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comentarioActualizado),
            })
                .then((response) => {
                    if (response.ok) {
                        const comentarioActualizado = response.json();
                        console.log('Comentario actualizado:', comentarioActualizado);
                        navigate('/'); // Redirigir después de actualizar
                    } else {
                        console.error('Error al actualizar el comentario:', response.statusText);
                    }
                });
        }
        catch (error) {
            console.error('Error en la actualización del comentario:', error);
        }
    };

    return (
        <Container>
            <h2>Editar Comentario</h2>
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
                        value={comentarioDescripcion}
                        onChange={(e) => setComentarioDescripcion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Actualizar Comentario
                </Button>
            </Form>
        </Container>
    );
};

export default EditarComentario;