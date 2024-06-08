import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { citas_backend } from "declarations/citas_backend";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [n, SetN] = useState("0");
  const [hour, SetHour] = useState("");
  const [day, SetDay] = useState("");
  const [pacient, SetPacient] = useState("");
  const [department, SetDepartment] = useState("");

  const navigate = useNavigate();

  const onChangeN = (e) => {
    e.preventDefault();
    const preN = e.target.value;
    SetN(preN);
  };
  const onChangeHour = (e) => {
    e.preventDefault();
    const preHour = e.target.value;
    SetHour(preHour);
  };
  const onChangeDay = (e) => {
    e.preventDefault();
    const preDay = e.target.value;
    SetDay(preDay);
  };
  const onChangePacient = (e) => {
    e.preventDefault();
    const prePacient = e.target.value;
    SetPacient(prePacient);
  };
  const onChangeDepartment = (e) => {
    e.preventDefault();
    const preDepartment = e.target.value;
    SetDepartment(preDepartment);
  };
  
  function añadirCita() {
    Swal.fire("Su cita se esta agendando");
    Swal.showLoading();
    citas_backend
      .addCita(BigInt(hour), day, pacient, department)
      .then((cita) => {
        Swal.fire({
          icon: "success",
          title: "Su cita ah sido agendada, muchas gracias!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/"));
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Ocurrio un problema",
        });
        console.log("Erro al cargar cita", err);
      });
  }

  return (
    <Container className="m-5">
      <Row>
        <Col>
          <Card>
            <Card.Title>Añadir Cita</Card.Title>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Ingresa la hora de la cita</Form.Label>
                  <Form.Control
                    name="hour"
                    onChange={onChangeHour}
                    type="number"
                    placeholder="Ingresa la hora"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ingresa el dia de la cita</Form.Label>
                  <Form.Control
                    name="day"
                    onChange={onChangeDay}
                    type="text"
                    placeholder="Ingresa el dia de la cita"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ingresa el nombre del paciente</Form.Label>
                  <Form.Control
                    name="pacient"
                    onChange={onChangePacient}
                    type="text"
                    placeholder="Ingresa el nombre"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Ingresa el departamento correspondiente
                  </Form.Label>
                  <Form.Control
                    name="department"
                    onChange={onChangeDepartment}
                    type="text"
                    placeholder="Ingresa el departamento"
                  />
                </Form.Group>

                <Button variant="primary" onClick={añadirCita}>
                  Agendar cita
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Add;
