import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import ImagesGrid from "./ImagesGrid";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useForm, Controller } from "react-hook-form";
import PropertiesContext from "../../context/PropertiesProvider";
import notesServices from "../../services/notes";
import propertiesServices from "../../services/properties";

export default function PropertyForm() {
  const [images, setImages] = useState([]);
  const { register, control, handleSubmit, watch, errors, getValues } = useForm({
    defaultValues: {
      type: "Piso",
      operation: "alquiler",
    },
  });

  const { user, setUser } = useContext(PropertiesContext);




  const handleChangeImage = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
        setImages(prevImages => [...prevImages, file])
    }
    
  };

  const handleDelete = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  }



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedPropertyappUser"));
    if (user) {
      notesServices.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleCreateProperty = async (data, e) => {
    // Obtener las imagenes del state y pasarlas al objeto data
    //data.images = images;
    //console.log(data)
    const token = JSON.parse(localStorage.getItem("token"));
    const formData = new FormData();
    /*
    for(let elem in data){
      formData.append(elem, data[elem]);
    }
    images.forEach(image => {
      formData.append("images", image);
    })*/
    formData.append("body", JSON.stringify(data));
    images.forEach(image => {
      formData.append("file", image);
    });
    propertiesServices
      .createProperty(formData, token)
      .then((res) => {
        alert("Propiedad creada correctamente");
      })
      .catch((err) => {
        alert("Algo salió mal al crear propiedad");
      });
    // Obtener el token del context
    // lamar al servicio de crear propiedad con el token mifuncion(token)
    
    e.target.reset(); // reset after form submit
  };

  return (
    <Container>
      <Form
        className="my-4  col-lg-4 col-md-5 col-sm-6"
        onSubmit={handleSubmit(handleCreateProperty)}
      >
      <h1>Publica tu anuncio</h1> 
        <Form.Group className="mb-3">
          <h5 className="mb-3">Tipo de inmueble</h5>
          <Form.Select
            aria-label="Selecciona un tipo de inmueble"
            {...register("type", { required: true })}
          >
            <option>Piso</option>
            <option>Chalet</option>
            <option>Garaje</option>
            <option>Terreno</option>
            <option>Oficina</option>
            <option>Trastero</option>
            <option>Local</option>
            <option>Plaza de garaje</option>
          </Form.Select>
        </Form.Group>

        {watch("type") === "Piso" && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de piso (opcional)</Form.Label>
              <Form.Check
                type="checkbox"
                name="piso"
                id="piso"
                label="Piso"
                {...register("piso")}
              />
              <Form.Check
                type="checkbox"
                name="atico"
                id="atico"
                label="Ático"
                {...register("atico")}
              />
              <Form.Check
                type="checkbox"
                name="duplex"
                id="duplex"
                label="Dúplex"
                {...register("duplex")}
              />
              <Form.Check
                type="checkbox"
                name="estudio"
                id="estudio"
                label="Estudio"
                {...register("estudio")}
              />
            </Form.Group>
          </>
        )}

        <Form.Group className="mb-3">
          <h5 className="mb-3">Operación</h5>
          <Form.Check
            type="radio"
            label="Alquiler"
            name="operation"
            value="alquiler"
            {...register("operation", { required: true })}
          />
          <Form.Check
            type="radio"
            label="Venta"
            name="operation"
            value="venta"
            {...register("operation", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <h5 className="mb-3">Precio de {watch("operation")}</h5>
          <Form.Label>
            Precio (Euros{watch("operation") === "alquiler" ? "/Mes" : ""})
          </Form.Label>
          <Form.Control
            className="mb-2"
            type="number"
            {...register("precio", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <h5 className="mb-3">Ubicación del inmueble</h5>
          <Form.Label>Localidad</Form.Label>
          <Form.Control
            className="mb-2"
            type="text"
            {...register("localidad", { required: true })}
          />
          <Form.Label>Nombre de la vía</Form.Label>
          <Form.Control
            className="mb-2"
            type="text"
            {...register("nombreVia", { required: true })}
          />
          <Form.Label>Número de via</Form.Label>
          <Form.Control
            className="mb-2"
            type="number"
            {...register("nVia", { required: true })}
          />
          {watch("type") === "Piso" && (
            <>
              <Form.Label>Planta</Form.Label>
              <Form.Control
                className="mb-2"
                type="planta"
                {...register("planta", { required: true })}
              />
              <Form.Label>Puerta</Form.Label>
              <Form.Control
                className="mb-2"
                type="puerta"
                {...register("puerta", { required: true })}
              />
            </>
          )}
        </Form.Group>
        <h5>Características del inmueble</h5>

        <Form.Group className="mb-3">
          <Form.Label>Estado del inmueble</Form.Label>
          <Form.Check
            type="radio"
            name="estadoRadio"
            id="bueno"
            value="bueno"
            label="Buena estado"
            {...register("estadoRadio", { required: true })}
          />
          <Form.Check
            type="radio"
            name="estadoRadio"
            id="remformar"
            label="A refomar"
            value="a reformar"
            {...register("estadoRadio", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            m<sup>2</sup> del inmueble
          </Form.Label>
          <Form.Control
            type="number"
            name="metrosCuadrados"
            id="metrosCuadrados"
            {...register("metrosCuadrados", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Número de habitaciones</Form.Label>
          <Form.Control
            type="number"
            name="habitaciones"
            id="habitaciones"
            {...register("habitaciones")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Número de baños</Form.Label>
          <Form.Control
            type="number"
            name="banios"
            id="banios"
            {...register("banios")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ascensor</Form.Label>
          <Form.Check
            type="radio"
            name="ascensor"
            id="ascensor"
            value="true"
            label="Si"
            {...register("ascensor", { required: true })}
          />
          <Form.Check
            type="radio"
            name="ascensor"
            id="ascensor"
            value="false"
            label="No"
            {...register("ascensor", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Otras características</Form.Label>
          <Form.Check
            type="checkbox"
            name="aireAcondicionado"
            id="aireAcondicionado"
            label="Aire acondicionado"
            {...register("aireAcondicionado")}
          />
          <Form.Check
            type="checkbox"
            name="calefaccion"
            id="calefaccion"
            label="Calefacción"
            {...register("calefaccion")}
          />
          <Form.Check
            type="checkbox"
            name="piscina"
            id="piscina"
            label="Piscina"
            {...register("piscina")}
          />
          <Form.Check
            type="checkbox"
            name="jardin"
            id="jardin"
            label="Jardín"
            {...register("jardin")}
          />
          <Form.Check
            type="checkbox"
            name="trastero"
            id="trastero"
            label="Trastero"
            {...register("trastero")}
          />
          <Form.Check
            type="checkbox"
            name="garaje"
            id="garaje"
            label="Garaje"
            {...register("garaje")}
          />
          <Form.Check
            type="checkbox"
            name="terraza"
            id="terraza"
            label="Terraza"
            {...register("terraza")}
          />
          <Form.Check
            type="checkbox"
            name="balcon"
            id="balcon"
            label="Balcón"
            {...register("balcon")}
          />
          <Form.Check
            type="checkbox"
            name="armariosEmpotrados"
            id="armariosEmpotrados"
            label="Armarios empotrados"
            {...register("armariosEmpotrados")}
          />
          <Form.Check
            type="checkbox"
            name="amueblado"
            id="amueblado"
            label="Amueblado"
            {...register("amueblado")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción (opcional)</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("descripcion")} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Selecciona las fotos</Form.Label>
          <Form.Control type="file" onChange={handleChangeImage} multiple />
        </Form.Group>

        {images.length > 0 && <ImagesGrid images={images} handleDelete={handleDelete} />}

        <Button variant="primary" type="submit">
          Crear anuncio
        </Button>
      </Form>
    </Container>
  );
}
