import React from 'react';
import { useParams,useLocation } from 'react-router-dom';

const PropertyDetails = () => {

    const { id_property } = useParams();
    const location = useLocation();
    const property = location.state;

    return (
        <div>
            <h1>PropertyDetails</h1>
            <p>Estas son los detalles de la propiedad con id {id_property}</p>
            <p>El nombre de la propiedad es {property.type}</p>
        </div>
    );
}

export default PropertyDetails;
