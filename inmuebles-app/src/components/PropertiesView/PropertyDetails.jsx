import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Stack from "react-bootstrap/Stack";
import { MdEuroSymbol } from "react-icons/md";
import { MdOutlineKingBed } from "react-icons/md";

const PropertyDetails = () => {
  const { id_property } = useParams();
  const location = useLocation();
  const property = location.state;




  return (
    <Container className="py-5">
      <Carousel slide={false} className="w-50 mb-4">
      {
       property.images.map((image, index) => {
        return (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image}
            alt="Slide with image from property"
          />
        </Carousel.Item>
       )})
      }
      </Carousel>
      <h4>{property.type} en {property.address.nombreVia}, {property.address.localidad}</h4>
      <h4>{property.price} <MdEuroSymbol style={{ position: "relative", bottom: "4px"}}/>{ property.operation == "alquiler" && "/mes"}</h4>
      <Stack direction="horizontal" gap={3}>
        <div className="d-flex flex-column justify-content-center"><MdOutlineKingBed/></div>
        <div className="bg-light border">Second item</div>
        <div className="bg-light border">Third item</div>
      </Stack>
      <h5>Descripción</h5>
      <p></p>
    </Container>
  );
};

export default PropertyDetails;
