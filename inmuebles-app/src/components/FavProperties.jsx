import React, { useEffect } from "react";
import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import PropertyList from "./PropertiesView/PropertyList";
import PropertiesContext from "../context/PropertiesProvider";
import userService from "../services/users";
import Spinner from 'react-bootstrap/Spinner';


const FavProperties = () => {
  const { user, setUser } = useContext(PropertiesContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserEffect = async () => {
      const userId = JSON.parse(window.localStorage.getItem("userId"));
      console.log(userId);
      if (userId !== null) {
        userService
          .getLiked(userId)
          .then((response) => {
            console.log(response);
            setProperties(response);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    getUserEffect();
  }, [user?.liked]);


  return (
    <Container>
      <h1>Favorites</h1>
      
      {
        loading ? <Spinner animation="border" /> 
        : properties.length === 0 ? <h4 className="d-flex justify-content-center text-muted">No tienes favoritos aún</h4> : <PropertyList properties={properties} />

      }
    </Container>
  );
};

export default FavProperties;
