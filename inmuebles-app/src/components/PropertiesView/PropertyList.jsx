import React,{useContext, useEffect} from 'react'
import PropertiesContext from '../../context/PropertiesProvider'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardProperty from '../CardProperty'

export default function PropertyList({ properties }) {
  
  return (
    <Row xs={2} md={3} lg={4} className="g-3 mb-4">
      {
        properties.map(({...props}) => {
          //console.log("USER" , user);
            return (
              <Col key={props.id}>
                <CardProperty key={props.id} {...props}/>
              </Col>
            );
          
        })
      }
    </Row>
  )
}
