import { useEffect, useState } from "react";
import { Citas1_backend } from "declarations/Citas1_backend";
import { Container, Row, Table, Card, Col, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormPacient from "./FormPacient";

function App() {
  const [Citas, setCitas] = useState([]);
  const [Cita, setCita] = useState({});
  const [show, setShow] = useState([false]);
  const Navigate = useNavigate();


  useEffect(() => {
    getCitas();
  }, []);

  function getCitas() {
    Swal.fire("Cargando Citas Agendadas");
    Swal.showLoading();
    Citas1_backend.getAllCitas().then((citas) => {
      console.log(citas);
      setCitas(citas);
      Swal.close();
    });
  }

  function deleteCita(n) {
    Swal.fire("Eliminando cita, por favor espere...");
    Swal.showLoading();
    Citas1_backend.deleteCita(BigInt(n)).then(() => {
      getCitas();
    });
  }

  function getCita(n) {
    Swal.fire("Cargando Cita");
    Swal.showLoading();
    Citas1_backend.getCitaByN(BigInt(n)).then((Cita) => {
      setCita(Cita.shift());
      Swal.close();
      setShow(true);

    });

  }

  return (
    <Container fluid>
      <Row className="m-4">
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>Citas programadas</Card.Title>
                <Card.Subtitle>Citas para el dia de hoy</Card.Subtitle>
              </Col>
              <Col>
                <Button
                  variant="outline-info"
                  onClick={() => Navigate("./FormPacient")}
                  className="m-3"
                >
                  Añadir cita
                </Button>
              </Col>
            </Row>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hora de cita</th>
                  <th>Dia de cita</th>
                  <th>Nombre del paciente</th>
                  <th>Departamento</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {Citas.length > 0 ? (
                  Citas.map((cita) => (
                    <tr>
                      <td>{Number(cita.n)}</td>
                      <td>{Number(cita.hour)}</td>
                      <td>{cita.day}</td>
                      <td>{cita.pacient}</td>
                      <td>{cita.department}</td>
                      <td>
                        <Row>
                          <Col>
                            <Button variant="info" onClick={() => getCita(Number(cita.n))}>Editar</Button>
                          </Col>
                          <Col>
                            <Button variant="danger" onClick={() => deleteCita(Number(cita.n))}>Eliminar</Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>

    </Container>
  );
};

export default App;