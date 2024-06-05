import React from "react";
import {Container, Row, Col, Card} from 'react-bootstrap'
export const List = ( ) => {
    return (
        <Container>
            <Row>
                <h1> Citas </h1>
               <Col>Agregar </Col> 
                <Col>Eliminar</Col>
                <Col>Actualizar</Col>
                <Col>Leer</Col> 
                <Card>
                    <Card.Body>
                        <Card.Title>Citas programadas</Card.Title>
                        <Card.Subtitle>Citas para el dia de hoy</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}
export default List