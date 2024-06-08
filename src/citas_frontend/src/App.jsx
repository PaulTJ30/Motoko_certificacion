import { useEffect, useState } from "react";
import { citas_backend } from "declarations/citas_backend";
import { Container, Row, Table, Card, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function App() {
  const [Citas, setCitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCitas();
  }, []);

  function getCitas() {
    Swal.fire("Cargando Citas Agendadas");
    Swal.showLoading();
    citas_backend.getAllCitas().then((citas) => {
      console.log(citas);
      setCitas(citas);
      Swal.close();
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
                  onClick={() => navigate("/Añadir-cita")}
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
                </tr>
              </thead>
              <tbody>
                {Citas.length  > 0 ? (
                  Citas.map((cita) => (
                    <tr>
                      <td>{Number(cita.n)}</td>
                      <td>{Number(cita.hour)}</td>
                      <td>{cita.day}</td>
                      <td>{cita.pacient}</td>
                      <td>{cita.department}</td>
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
}

export default App;
