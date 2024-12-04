import React, { useState } from 'react';
import { Button, Container, ListGroup, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';

const GridComentariosViajes = () => {
    const [aerolinea, setAerolinea] = useState('');
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([
        { aerolinea: 'Aerolínea 1', comentario: 'Excelente servicio y puntualidad.', fecha: new Date() },
        { aerolinea: 'Aerolínea 2', comentario: 'Los asientos eran incómodos.', fecha: new Date() },
        { aerolinea: 'Aerolínea 3', comentario: 'Comida deliciosa y buen trato del personal.', fecha: new Date() },
    ]);
    const [editIndex, setEditIndex] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = (e) => {
        e.preventDefault();
        if (aerolinea && comentario) {
            const nuevoComentario = { aerolinea, comentario, fecha: new Date() };
            if (editIndex !== null) {
                // Editar comentario existente
                const updatedComentarios = comentarios.map((item, index) =>
                    index === editIndex ? nuevoComentario : item
                );
                setComentarios(updatedComentarios);
                setEditIndex(null);
            } else {
                // Agregar nuevo comentario
                setComentarios([...comentarios, nuevoComentario]);
                navigate('/comentario/agregar'); // Redirigir a la ruta deseada
            }
            // Limpiar los campos del formulario
            setAerolinea('');
            setComentario('');
        }
    };

    const handleEdit = (comentario) => {
        console.log('Editar comentario:', comentario);
        navigate('/comentario/editar',{state:{comentario}}); // Redirigir a la ruta deseada
    };

    const handleDelete = (index) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
            const updatedComentarios = comentarios.filter((_, i) => i !== index);
            setComentarios(updatedComentarios);
            setShowAlert(true);
        }
    };

    return (
        <Container>
            <h2>Comentarios sobre Aerolíneas</h2>
            {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>Comentario eliminado con éxito!</Alert>}


            <Link to="/comentario/agregar">
                <Button variant="success" className="mb-3">Agregar</Button>
            </Link>
            <ListGroup>
                {comentarios.map((item, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{item.aerolinea}</strong>: {item.comentario} <br />
                            <small className="text-muted">{item.fecha.toLocaleString()}</small>
                        </div>
                        <div>
                            <Button variant="warning" onClick={() => handleEdit(item)} className="me-2">
                                <FaEdit />
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(index)}>
                                <FaTrash />
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default GridComentariosViajes;