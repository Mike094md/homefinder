import React, { useContext, useRef, useState, useEffect } from "react";
import PropertiesContext from "../context/PropertiesProvider";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import profileImg from "../imgs/profile.png";
import Button from "react-bootstrap/Button";
import PasswordModal from "./PasswordModal";
import usersServices from "../services/users";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
// import { HStack } from "@chakra-ui/react"

const UserProfile = () => {
  const { user, setUser } = useContext(PropertiesContext);
  const [img, setImg] = useState(profileImg);
  const [modalShow, setModalShow] = useState(false);
  const fileInput = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({});

  const navigate = useNavigate();
  // const styleAvatar = {
  //   borderRadius: "50%",
  //   objectFit: "contain",
  //   objectPosition: "center",
  //   width: "100px",
  //   border: "1px solid #000",
  //   backgroundImage: `url(${img})`,

  // }

  //TODO: Obtener la imagen de perfil la primera vez que se carga el componente si es que tiene, sino, por defecto

  useEffect(() => {
      if(!user){
        const id = JSON.parse(window.localStorage.getItem("userId"));
        usersServices.getUser(id)
        .then((response) => {
          setUser(response)
          const imageUser = response.image ?? profileImg // si no tiene imagen, se le asigna la imagen por defecto
          setImg(imageUser)
        })
        .catch((error) => console.log(error))
      }else{
        setImg(user.image ?? profileImg)
      }
  }, [user?.image]);

  const handleClickImg = () => {
    fileInput.current.click();
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    setImg(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);
    const token = JSON.parse(window.localStorage.getItem("token"));
    usersServices
      .updateImage(formData, token)
      .then((response) => {
        alert("Imagen actualizada correctamente");
        
        setUser(response)
      })
      .catch((error) => {
        alert("Error al actualizar la imagen");
      });
  };

  const onSubmit = (data) => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    usersServices.updateUser(data, token).then((response) => {
      setUser(response);
      alert("Usuario actualizado correctamente");
      //el token no esta actualizado
      //! Actualizar el token si el usuario se ha actualizado
      // window.localStorage.clear()
      // setUser(null)
      // navigate("/login")
    })
    .catch((error) => {
      alert(`Error al actualizar el usuario: ${error}`);
    });
  };

  return (
    <Container className="mt-3" fluid="sm">
      <PasswordModal show={modalShow} onHide={() => setModalShow(false)} />

      <h1>Perfil de {user?.name ?? user?.username}</h1>

      <Image src={img} alt="profile" rounded width="110" className="my-3" />

      <Button
        variant="warning"
        className="ms-3"
        size="sm"
        id="imgProfile"
        onClick={handleClickImg}
      >
        Cambiar foto de perfil
      </Button>

      <input
        type="file"
        name="img"
        ref={fileInput}
        onChange={handleChangeImg}
        style={{ display: "none" }}
      />
      <Button
        variant="warning"
        className="ms-3"
        size="sm"
        onClick={() => setModalShow(true)}
      >
        Cambiar contraseña
      </Button>

      <Form className="mb-5 w-50" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="NombreUser"
            defaultValue={user?.username}
            {...register("username", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            defaultValue={user?.name}
            {...register("name")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellidos"
            defaultValue={user?.lastName}
            {...register("lastName")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Apellidos"
            defaultValue={user?.email}
            {...register("email")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar cambios
        </Button>
      </Form>
    </Container>
  );
};

export default UserProfile;
