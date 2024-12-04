import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const ViajeTable = () => {
    const [viajes, setViajes] = useState([
        {
            idViaje: 1,
            aerolinea: 'Aerolínea 1',
            paisInicio: 'España',
            paisDestino: 'Francia',
            duracion: '2 horas',
            costo: '$150',
            date: '2023-10-01',
        },
        {
            idViaje: 2,
            aerolinea: 'Aerolínea 2',
            paisInicio: 'México',
            paisDestino: 'Estados Unidos',
            duracion: '4 horas',
            costo: '$300',
            date: '2023-10-05',
        },
        {
            idViaje: 3,
            aerolinea: 'Aerolínea 3',
            paisInicio: 'Argentina',
            paisDestino: 'Brasil',
            duracion: '3 horas',
            costo: '$200',
            date: '2023-10-10',
        },
        {
            idViaje: 4,
            aerolinea: 'Aerolínea 4',
            paisInicio: 'Colombia',
            paisDestino: 'Perú',
            duracion: '2 horas',
            costo: '$180',
            date: '2023-10-15',
        },
    ]);

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