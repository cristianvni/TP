import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const ViajeTable = () => {
    const [viajes, setViajes] = useState([]);

    const navigate = useNavigate(); // Hook para la navegación

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este viaje?');
        if (confirmDelete) {
            setViajes(viajes.filter(viaje => viaje.idViaje !== id)); // Actualiza el estado eliminando el viaje
        }
    };

    const handleEdit = (viaje) => {
        navigate(`/viaje/editar`, { state: { viaje } }); // Navegar a la página de edición con el estado
    };


    useEffect(() => {
        const fetchViajes = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/viajes');
                const data = await response.json();
                setViajes(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchViajes();
    }, []);


    return (
        <Container>
            <Link to="/viaje/agregar">
                <Button variant="success" className="mb-3">Agregar</Button>
            </Link>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Aerolinea</th>
                        <th>País de Inicio</th>
                        <th>País de Destino</th>
                        <th>Duración</th>
                        <th>Costo</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {viajes.map((viaje) => (
                        <tr key={viaje.idViaje}>
                            <td>{viaje.idViaje}</td>
                            <td>{viaje.aerolinea}</td>
                            <td>{viaje.paisInicio}</td>
                            <td>{viaje.paisDestino}</td>
                            <td>{viaje.duracion}</td>
                            <td>{viaje.costo}</td>
                            <td>{viaje.date}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEdit(viaje)} className="me-2">
                                    <FaEdit /> Editar
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(viaje.idViaje)}>
                                    <FaTrash /> Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default ViajeTable;