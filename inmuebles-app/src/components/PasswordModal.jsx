import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import usersServices from "../services/users";
import PropertiesContext from "../context/PropertiesProvider";

const PasswordModal = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({});

  const { user, setUser } = useContext(PropertiesContext);

  const stylesErrors = {
    color: "red",
    fontSize: "10px",
    margin: "10px 0"
  }

  const onSubmit = (data) => {
    //enviar la nueva contraseña al backend
    //comprobando que la contraseña actual es correcta
    //si es correcta, se actualiza la contraseña
    //si no es correcta, se muestra un mensaje de error
    //
    
    usersServices.updatePassword(data, user.token)
    .then((response) => {
      alert("Contraseña actualizada correctamente")
    })
    .catch((error) => {
      alert("La contraseña actual no es correcta")
    })
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cambiar contraseña
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              size="sm"
              placeholder="Contraseña actual"
              {...register("currentPass", {
                required: "Este campo es necesario!",
              })}
            />
            {errors.currentPass && (
              <p style={stylesErrors}>{errors.currentPass.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              size="sm"
              placeholder="Nueva contraseña"
              {...register("password1", {
                required: "Confirma la contraseña!",
              })}
            />
            {errors.password1 && (
              <p style={stylesErrors}>{errors.password1.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              size="sm"
              placeholder="Repetir contraseña"
              {...register("password2", {
                required: "Confirma la contraseña!",
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password1 } = getValues();
                    return (
                      password1 === value || "Las contraseñas no coinciden!"
                    );
                  },
                },
              })}
            />
            {errors.password2 && (
              <p style={stylesErrors}>{errors.password2.message}</p>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="me-3" size="sm">
            Guardar cambios
          </Button>
          <Button onClick={props.onHide} variant="danger" size="sm">
          Cancelar
        </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordModal;
