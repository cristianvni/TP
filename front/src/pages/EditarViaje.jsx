import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

const EditarViaje = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const viaje = location.state?.viaje; // Accede al objeto viaje de forma segura

    // Inicializa los estados con cadenas vacías
    const [aerolinea, setAerolinea] = useState('');
    const [origen, setInicio] = useState('');
    const [destino, setDestino] = useState('');
    const [duracion, setDuracion] = useState('');
    const [costo, setCosto] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        if (viaje) {
            setAerolinea(viaje.aerolinea || ''); // Asegúrate de que no sea undefined
            setInicio(viaje.origen || '');
            setDestino(viaje.destino || '');
            setDuracion(viaje.duracion || '');
            setCosto(viaje.costo || '');
            setFecha(viaje.fecha || '');
        } else {
            // Manejo de error: el viaje no está definido
            console.error('No se encontró el viaje en el estado.');
        }
    }, [viaje]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const viajeActualizado = {
            idViaje: viaje.idViaje,
            aerolinea,
            origen,
            destino,
            duracion,
            costo,
            fecha,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/viajes/${viaje.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(viajeActualizado),
            });

            if (response.ok) {


                navigate('/'); // Redirigir después de actualizar
            } else {
                console.error('Error al actualizar el viaje:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    // Si no hay viaje, muestra un mensaje de error
    if (!viaje) {
        return <div>No se encontró el viaje. Por favor, regrese a la lista de viajes.</div>;
    }

    return (
        <Container>
            <h2>Editar Viaje</h2>
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
                        value={origen}
                        onChange={(e) => setInicio(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPaisDestino">
                    <Form.Label>País de Destino</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el país de destino"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
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
                        type ="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar Cambios
                </Button>
            </Form>
        </Container>
    );
};

export default EditarViaje;