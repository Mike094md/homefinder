import React, { useEffect, useState } from "react";
import propertiesService from "../../services/properties";
import CardProperty from "../CardProperty";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertiesContext from "../../context/PropertiesProvider";
import userServices from "../../services/users";
import PropertyList from "../PropertiesView/PropertyList";
import CarouselImgs from "../CarouselImgs";
import "./Home.css";
import { GoSearch } from "react-icons/go";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import imgCard1 from "../../imgs/img-login5.jpg";
import imgCard2 from "../../imgs/alquiler_img.jpg";
import imgCard3 from "../../imgs/anuncio_img2.jpg";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import imgSale from "../../imgs/for-sale.jpg";
import imgContact from "../../imgs/contact-img.jpg";
import imgBuyHome from "../../imgs/buy_house.png";

export default function Home() {
  const [properties, setProperties] = React.useState([]);
  const [selectedOperation, setSelectedOperation] = useState("comprar");

  const { user, setUser } = React.useContext(PropertiesContext);

  const navigate = useNavigate();

  useEffect(() => {
    propertiesService.getAll().then((response) => {
      setProperties(response);
    });
  }, []);

  return (
    <Container fluid className="main-home p-0">
      <section className="background-img-home">
        <div className="searcher w-75 py-3 px-4">
          <p className="fs-5 fw-bold mb-1 ">Encuentra tu hogar</p>
          <div className="container mt-4">
            <Row>
              <Col>
                <div className="operation-radio-group">
                  <input
                    type="radio"
                    id="comprar-operation"
                    name="operation"
                    value="comprar"
                    checked={selectedOperation === "comprar"}
                    onChange={(e) => setSelectedOperation(e.target.value)}
                  />
                  <label
                    htmlFor="comprar-operation"
                    className="radio-button radio-button-comprar"
                  >
                    Comprar
                  </label>
                  <input
                    type="radio"
                    id="alquilar-operation"
                    name="operation"
                    value="alquilar"
                    checked={selectedOperation === "alquilar"}
                    onChange={(e) => setSelectedOperation(e.target.value)}
                  />
                  <label
                    htmlFor="alquilar-operation"
                    className="radio-button radio-button-alquilar"
                  >
                    Alquilar
                  </label>
                </div>
              </Col>

              <Col xs={2} md={3}>
                <select className="type-property-select">
                  <option value="1">Piso</option>
                  <option value="2">Casa</option>
                  <option value="3">Chalet</option>
                </select>
              </Col>
              <Col md={4}>
                <input
                  type="text"
                  placeholder="Ciudad, Provincia, barrio..."
                  className="locality-input"
                />
              </Col>
              <Col xs={2}>
                <button className="button-search">
                  <GoSearch className="me-2" />
                  Buscar
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="section-cards">
        {/* className="w-75 mx-auto py-4 d-flex justify-content-around" */}
        <Container fluid="md" className="py-5">
          <Row xs={3} lg={4} className="g-4 justify-content-center">
            <Col>
              <Card style={{ height: "100%" }}>
                <Card.Img variant="top" src={imgCard1} />
                <Card.Body>
                  <Card.Title>Compra la casa de tus sueños</Card.Title>
                  <Card.Text>
                    Busca entre las mejores propiedades de la zona y ponte en
                    contacto con el vendedor.
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate("comprar")}>
                    Comprar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "100%" }}>
                <Card.Img variant="top" src={imgCard2} />
                <Card.Body style={{ verticalAlign: "bottom" }}>
                  <Card.Title>Alquila en la mejor zona</Card.Title>
                  <Card.Text>
                    Compara entre los mejores precios de alquiler y encuentra tu
                    apartamento ideal.
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("alquilar")}
                  >
                    Alquilar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "100%" }}>
                <Card.Img variant="top" src={imgCard3} />
                <Card.Body>
                  <Card.Title>Publica tu anuncio gratis</Card.Title>
                  <Card.Text>
                    Crea tu anuncio añadiendo todos los detalles que necesites y
                    publicalo en nuestra web de forma gratuita.
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("publicar_anuncio")}
                  >
                    Publicar anuncio
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-card-buy">
        <div className="section-card-buy-div">
          <img
            src={imgBuyHome}
            alt="buy house"
            width={350}
            style={{ borderRadius: "10px 0 0 10px" }}
          />
          <div className="section-card-buy-text">
            <h2>Escoge tu casa ideal</h2>
            <p>
              Registrate en nuestra plataforma y filtra por las características
              más importantes para ti.
            </p>
            <p>
              Guarda las propiedades que más te gusten para compararlas después
              y quedarte con tu casa ideal.
            </p>
            <p>
              Ponte en contacto con el vendedor y concreta una cita para visitar
              el inmueble.
            </p>
            <Button variant="success" onClick={() => navigate("register")}>
              Registrate ahora
            </Button>
          </div>
        </div>
      </section>
      <section className="container-md-fluid d-flex flex-column align-items-center p-3">
        <h3>Te acompañamos para que vendas o alquiles tu propiedad</h3>
        <p style={{ fontSize: "14px", marginBottom: "0" }}>
          Publica tu anuncio en HomeFinder y llega a miles de personas
          interesadas.
        </p>
        <div className="d-flex justify-content-center">
          <div className="mx-5 p-3" style={{ width: "20rem" }}>
            <Image
              src={imgSale}
              alt="profile"
              rounded
              fluid
              width={300}
              className="my-3"
            />
            <h5 className="mt-2">Publica tu anuncio gratis</h5>
            <p style={{ fontSize: "14px" }}>
              Publica tu vivienda en HomeFinder y te ayudamos a darle más
              visibilidad para llegar a todas las personas interesadas en
              encontrar vivienda.
            </p>
          </div>
          <div className="p-3 mx-5" style={{ width: "20rem" }}>
            <Image
              src={imgContact}
              alt="profile"
              rounded
              fluid
              width={300}
              className="my-3"
            />
            <h5 className="mt-2">Contacta con el propietario</h5>
            <p style={{ fontSize: "14px" }}>
              En HomeFinder te ayudamos a poder contactar con tantos
              propietarios como desees, y así poder encontrar tu casa ideal.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
