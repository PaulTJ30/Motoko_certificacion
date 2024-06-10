import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { Citas1_backend } from "declarations/Citas1_backend";
import { useNavigate } from "react-router-dom";

const FormPacient = (
  {
    pn = null,
    pHour = null,
    pDay = null,
    pPacient = null,
    pDepartment = null,
    isEditable = null,
    getCitas = null,
    setShow = null
  }


) => {

  const [hour, SetHour] = useState(pHour ? pHour : "");
  const [day, SetDay] = useState(pDay ? pDay : "");
  const [pacient, SetPacient] = useState(pPacient ? pPacient : "");
  const [department, SetDepartment] = useState(pDepartment ? pDepartment : "");


  const navigate = useNavigate();


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

  function addCita() {
    Swal.fire("Su cita se esta agendando");
    Swal.showLoading();
    Citas1_backend.addCita(BigInt(hour), day, pacient, department).then((cita) => {
      Swal.fire({
        icon: "success",
        title: "Su cita ah sido agendada, muchas gracias!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/"));
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un problema",
      });
      console.log("Erro al cargar cita", err);
    });
  };

  function updateCita() {
    Swal.fire("Su cita se esta actualizando, por favor espere...");
    Swal.showLoading();
    Citas1_backend.updateCita(pn, BigInt(hour), day, pacient, department).then((cita) => {
      Swal.fire({
        icon: "success",
        title: "Su cita ah sido agendada, muchas gracias!",
        showConfirmButton: false,
        timer: 1500,

      }).then(() => {
        setShow(false);
        getCitas();
      });
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un problema",
      });
      console.log("Error al cargar cita", err);
    });

  };




  return (
    <Container className="m-5">
      <Row className="m-5">

        <Card>
          <Card.Body>
            <Card.Title>{isEditable ? "Editar" : "Agregar"}</Card.Title>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Ingresa la hora de la cita</Form.Label>
                    <Form.Control
                      defaultValue={hour}
                      name="hour"
                      onChange={onChangeHour}
                      type="number"
                      placeholder="Ingresa la hora"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>

                  <Form.Group className="mb-3">
                    <Form.Label>Ingresa el dia de la cita</Form.Label>
                    <Form.Control
                      defaultValue={day}
                      name="day"
                      onChange={onChangeDay}
                      type="text"
                      placeholder="Ingresa el dia de la cita"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Ingresa el nombre del paciente</Form.Label>
                    <Form.Control
                      defaultValue={pacient}
                      name="pacient"
                      onChange={onChangePacient}
                      type="text"
                      placeholder="Ingresa el nombre"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Ingresa el departamento correspondiente
                    </Form.Label>
                    <Form.Control
                      defaultValue={department}
                      name="department"
                      onChange={onChangeDepartment}
                      type="text"
                      placeholder="Ingresa el departamento"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="primary" onClick={isEditable ? updateCita : addCita}>
                    {isEditable ? "Editar" : "Guardar"}
                  </Button>
                </Col>
            
              </Row>


            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}


export default FormPacient;