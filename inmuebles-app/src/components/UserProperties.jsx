import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import propertiesService from "../services/properties";
import { useContext } from "react";
import PropertiesContext from "../context/PropertiesProvider";
import PropertyList from "./PropertiesView/PropertyList";
import Spinner from "react-bootstrap/Spinner";

const UserProperties = () => {
  const [userProperties, setUserProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(PropertiesContext);

  useEffect(() => {
    propertiesService.getAll().then((properties) => {
      const propertiesUser = properties.filter(
        (property) => property.user.id === user.id
      );
      setUserProperties(propertiesUser);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <h1>Tus anuncios publicados</h1>
      {loading ? (
        <Spinner animation="border"/>
      ) : userProperties.length === 0 ? (
        <h4 className="d-flex justify-content-center text-muted">
          No tienes ningún anuncio publicado
        </h4>
      ) : (
        <PropertyList properties={userProperties} />
      )}
    </Container>
  );
};

export default UserProperties;
