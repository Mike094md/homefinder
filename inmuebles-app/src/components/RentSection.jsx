import React, { useEffect, useState } from 'react';
import PropertyList from './PropertiesView/PropertyList';
import propertiesService from '../services/properties';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/esm/Spinner';

//const keyApi = 'AIzaSyAguLfXbMsam20lWZ6paWlviNOlnh-7xNA'

const RentSection = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        propertiesService.getAll().then((response) => {
        //filtramos las propiedades que esten en venta
        const propertiesForSale = response.filter(property => property.operation === 'alquiler')
        setProperties(propertiesForSale);
        setLoading(false);
        });
      }, []);

    return (
        <Container>
            <h1>Propiedades en Alquiler</h1>
            {
            loading ? <Spinner animation="border" /> : <PropertyList properties={properties}/>
            }
        </Container>
    );
}

export default RentSection;