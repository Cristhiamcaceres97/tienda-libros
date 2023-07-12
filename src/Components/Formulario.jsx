import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "./Formulario.css";

const Formulario = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    numeroTarjeta: "",
    fechaVencimiento: "",
    codigoSeguridad: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    codigoPostal: "",
    medioPago: "",
    totalPagar: "",
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que todos los campos estén llenos
    const isFormValid = Object.values(formData).every((value) => value !== "");

    if (isFormValid) {
      // Enviar formulario y mostrar modal de éxito
      setModalMessage("✔️ Pago realizado con éxito");
      setShowModal(true);
      emptyCart();
    } else {
      // Mostrar modal de error
      setModalMessage("❌ Por favor, completa todos los campos");
      setShowModal(true);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAccept = () => {
    handleCloseModal();
    window.location.href = "/"; // Redirigir al inicio de la página
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-6">
            <h1>Medios de Pago</h1>
            <ul className="medio-pago">
              <li className="list-inline-item">
                <img
                  src="https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/visa.png"
                  alt="Medio de Pago 1"
                />
              </li>
              <li className="list-inline-item">
                <img
                  src="https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/pse2.png"
                  alt="Medio de Pago 2"
                />
              </li>
              <li className="list-inline-item">
                <img
                  src="https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/payu.png"
                  alt="Medio de Pago 3"
                />
              </li>
              <li className="list-inline-item">
                <img
                  src="https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/mastercard2.png"
                  alt="Medio de Pago 4"
                />
              </li>
              <li className="list-inline-item">
                <img
                  src="https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/efecty.png"
                  alt="Medio de Pago 5"
                />
              </li>
              <li className="list-inline-item">
                <img
                  src="https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/davivienda.png"
                  alt="Medio de Pago 6"
                />
              </li>
              <li className="list-inline-item">
                <img
                  src="https://statics.cdn1.buscalibre.com/images/formas_pago/20200427-2331formasDePago/bancolombia.png"
                  alt="Medio de Pago 7"
                />
              </li>
            </ul>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" required onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="numeroTarjeta">
                <Form.Label>Número de Tarjeta</Form.Label>
                <Form.Control type="text" required onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fechaVencimiento">
                <Form.Label>Fecha de Vencimiento</Form.Label>
                <Form.Control type="text" required onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="codigoSeguridad">
                <Form.Label>Código de Seguridad</Form.Label>
                <Form.Control type="text" required onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="direccion">
                <Form.Label>Dirección de Envío</Form.Label>
                <Form.Control type="text" required onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="ciudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control type="text" required onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="estado">
                <Form.Label>Departamento</Form.Label>
                <Form.Control type="text" required onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="codigoPostal">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control type="text" required onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="medioPago">
                <Form.Label>Medio de Pago</Form.Label>
                <Form.Control as="select" required onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="pse">PSE</option>
                  <option value="nequi">Nequi</option>
                  <option value="Bancolombia">Bancolombia</option>
                  <option value="davivienda">Davivienda</option>
                  <option value="payU">PayU</option>
                  <option value="efecty">Efecty</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="totalPagar">
                <Form.Label>Total a Pagar</Form.Label>
                <Form.Control type="text" required onChange={handleChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Pagar
              </Button>
            </Form>
          </div>
        </div>
      </div>

      {/* Modal de error o éxito */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Proceso de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-dark" onClick={handleAccept}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Formulario;