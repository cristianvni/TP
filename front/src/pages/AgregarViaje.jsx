import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Cambiar useHistory por useNavigate

const AgregarViaje = () => {
    const [aerolinea, setAerolinea] = useState('');
    const [paisInicio, setPaisInicio] = useState('');
    const [paisDestino, setPaisDestino] = useState('');
    const [duracion, setDuracion] = useState('');
    const [costo, setCosto] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoViaje = {
            idViaje: Date.now(), // Generamos un ID único (puedes usar un sistema de ID más robusto)
            aerolinea,
            paisInicio,
            paisDestino,
            duracion,
            costo,
            date,
        };

        console.log('Nuevo viaje agregado:', nuevoViaje);

        // Aquí puedes agregar la lógica para guardar el nuevo viaje en tu estado global o base de datos

        // Redirigir a la tabla de viajes después de agregar
        navigate('/'); // Cambiar history.push por navigate
    };

    return (
        <Container>
            <h2>Agregar Nuevo Viaje</h2>
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
                <Form.Group controlId="formPaisInicio">
                    <Form.Label>País de Inicio</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el país de inicio"
                        value={paisInicio}
                        onChange={(e) => setPaisInicio(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPaisDestino">
                    <Form.Label>País de Destino</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el país de destino"
                        value={paisDestino}
                        onChange={(e) => setPaisDestino(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDuracion">
                    <Form.Label>Duración</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la duración del viaje"
                        value={duracion}
                        onChange={(e) => setDuracion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formCosto">
                    <Form.Label>Costo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el costo del viaje"
                        value={costo}
                        onChange={(e) => setCosto(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formFecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Agregar Viaje
                </Button>
            </Form>
        </Container>
    );
};

export default AgregarViaje;