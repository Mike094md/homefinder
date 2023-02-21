import React, { useContext, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MdEuroSymbol, MdOutlineFormatLineSpacing } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import userServices from "../services/users";
import PropertiesContext from "../context/PropertiesProvider";
import { useNavigate } from "react-router-dom";
import "../styles/css/cardProperty.css";
import Messages from "./Messages";
// import ModalMessage from "./ModalMessage";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import messagesServices from "../services/messages";

const CardProperty = ({ ...props }) => {
  const [showArrows, setShowArrows] = React.useState(false);
  const [indexImg, setIndexImg] = React.useState(0);
  const [gustado, setGustado] = React.useState(false);
  const [showModalMessage, setShowModalMessage] = React.useState(false);

  const { user, setUser } = useContext(PropertiesContext);

  const navigate = useNavigate();
  const refText = useRef(null);

  //TODO: HAY QUE TENER EN CUENTA QUE ESTA PAGINA LA PUEDE VER UN USUARIO NO LOGGEADO
  useEffect(() => {
    async function getUser(id) {
      const user = await userServices.getUser(id);
      setUser(user);
    }

    // SI NO SE HA LOGGEADO EL USUARIO, TAMPOCO HABRA userId EN EL LOCALSTORAGE
    if (!user) {
      const userId = JSON.parse(window.localStorage.getItem("userId"));
      if (!userId) return;
      getUser(userId);
      return;
    }
    // SI EL USUARIO YA ESTA LOGGEADO, COMPROBAMOS SI YA LE HA DADO A GUSTADO A ESTA PROPIEDAD
    if (user?.liked?.length > 0 && user?.liked?.includes(props?.id)) {
      setGustado(true);
    }
  }, [user?.liked]);

  function forwarImg() {
    if (indexImg < props.images.length - 1) {
      setIndexImg(indexImg + 1);
    } else {
      setIndexImg(0);
    }
  }

  function backwardImg() {
    if (indexImg > 0) {
      setIndexImg(indexImg - 1);
    } else {
      setIndexImg(props.images.length - 1);
    }
  }

  const imgsStyle = {
    backgroundImage: `url(${props.images[indexImg]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "5px 5px 0 0",
    height: "12rem",
  };

  const addLiked = async () => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    await userServices
      .addLiked({ propertyId: props.id }, token)
      .then((res) => {
        console.log("RES ADD LIKED", res);
        setUser(res);
        // window.localStorage.setItem("loggedPropertyappUser", JSON.stringify(newUser))
        setGustado(true);
      })
      .catch((err) => console.log(err));
  };

  const deleteLiked = () => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    userServices
      .deleteLiked({ propertyId: props.id }, token)
      .then((res) => {
        console.log("DELETE LIKED", res);
        setUser(res);
        // window.localStorage.setItem("loggedPropertyappUser", JSON.stringify(newUser))
        setGustado(false);
      })
      .catch((err) => console.log(err));
  };

  const handleClickContact = () => {
    setShowModalMessage(true)
  }

  const handleSubmitMessage = (e) => {
    //usar el servicio de escribir mensaje
    //pasar el id del usuario que envia y el id del usuario que recibe
    //pasar el mensaje
    e.preventDefault()

    messagesServices.sendMessage({ body: refText.current.value, sender: user.id, recipient: props.user.id })
    .then(res => alert("Mensaje enviado correctamente"))
    .catch(err => alert("Ha habido un error al enviar el mensaje"))

    setShowModalMessage(false)
  }
  
  const seeDetail = () =>{
    navigate(`/property_details/${props.id}`, { state: props } )
  }



  return (
    <>
    <Modal show={showModalMessage} onHide={() => setShowModalMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Escribe un mensaje a {props.user.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Destinatario</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                defaultValue={props.user.email}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={3} autoFocus ref={refText}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalMessage(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitMessage}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <Card
      style={{ height: "23rem", boxShadow: "0px 0px 10px #e5e5e5", cursor: "pointer" }}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div style={imgsStyle} />
      {showArrows && (
        <>
          <MdOutlineArrowForwardIos
            onClick={forwarImg}
            className="arrow-img-forward"
          />
          <MdOutlineArrowBackIosNew
            onClick={backwardImg}
            className="arrow-img-backward"
          />
        </>
      )}
      <Card.Body style={{ userSelect: "none" }} onClick={seeDetail}>
        <Card.Title className="d-flex align-items-center">
          {props.price} <MdEuroSymbol />
        </Card.Title>
        <Card.Text>
          {props.type} en {props.address.nombreVia}, {props.address.localidad}
        </Card.Text>
        <Card.Text>
          {props.description}
        </Card.Text>
        {

          user?.id !== props.user.id && 
          
          (<Button variant="primary" size="sm" onClick={handleClickContact}>
            <MdOutlineMail className="mb-1" /> Contactar
          </Button>)

        }

        { 
          user?.id !== props.user.id
          ?
          gustado ? (<HiHeart className="heart-icon2" onClick={deleteLiked} />) : (<HiOutlineHeart className="heart-icon" onClick={addLiked} />) 
          :
          null
        }
      </Card.Body>
    </Card>
    </>
  );
};

export default CardProperty;
