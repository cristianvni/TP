import React, {useEffect, useState} from 'react';
import { Button, Container, ListGroup, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';

const GridComentariosViajes = () => {

    const [comentarios, setComentarios] = useState([]);

    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate(); // Hook para la navegación



    const handleEdit = (comentario) => {
        console.log('Editar comentario:', comentario);
        navigate('/comentario/editar',{state:{comentario}}); // Redirigir a la ruta deseada
    };

    const handleDelete = (comentario) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
            fetch(`http://localhost:8080/api/comentarios/${comentario.id}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Comentario eliminado:', comentario);
                        setShowAlert(true);
                        setComentarios(comentarios.filter((item) => item.id !== comentario.id));
                    } else {
                        console.error('Error al eliminar el comentario:', response.statusText);
                    }
                })
                .catch((error) => {
                    console.error('Error en la eliminación del comentario:', error);
                });
        }
    };


    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/comentarios');
                const data = await response.json();
                setComentarios(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchComentarios();
    }, [comentarios]);

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
                            <small className="text-muted">{item.fecha}</small>
                        </div>
                        <div>
                            <Button variant="warning" onClick={() => handleEdit(item)} className="me-2">
                                <FaEdit />
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(item)}>
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