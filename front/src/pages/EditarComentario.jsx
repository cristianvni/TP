import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

const EditarComentario = () => {
    const location = useLocation();

    const comentario = location.state?.comentario; // Accede al objeto comentario de forma segura

    const [aerolinea, setAerolinea] = useState('');
    const [comentarioAux, setComentarioAux] = useState('');
    const navigate = useNavigate(); // Hook para la navegación


    // Cargar los datos del comentario actual cuando el componente se monta
    useEffect(() => {
        console.log('Comentario actual:', comentario);
        if (comentario) {
            setAerolinea(comentario.aerolinea || ''); // Asegúrate de que no sea undefined
            setComentarioAux(comentario.comentario || ''); // Asegúrate de que no sea undefined
        }
    }, [comentario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (aerolinea && comentario) {
            // Aquí puedes agregar la lógica para actualizar el comentario en tu base de datos o API
            console.log('Comentario actualizado:', { aerolinea, comentario });
            // Limpiar los campos del formulario
            setAerolinea('');
            setComentarioAux('');
            // Redirigir a la ruta principal o a donde desees
            navigate('/'); // Cambia '/' a la ruta que desees
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
                        value={comentarioAux}
                        onChange={(e) => setComentarioAux(e.target.value)}
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