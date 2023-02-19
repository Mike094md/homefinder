import React, { useContext, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// import NotesProvider from "../../context/NotesProvider";
import { useNavigate, useLocation } from "react-router-dom";  
import PropertiesContext from "../context/PropertiesProvider";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { BsHouseDoor } from "react-icons/bs";
import { MdPublish } from "react-icons/md";
import { GiHouseKeys } from "react-icons/gi";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../imgs/icon-login10.png"
import Image from 'react-bootstrap/Image'
import imgprofile from "../imgs/img-profile2.jpg"
import Stack from 'react-bootstrap/Stack'
import { Outlet } from "react-router-dom";
import userServices from "../services/users";
import profileDefaultImg from "../imgs/profile.png";
//import '../styles/css/footer.css'
//TODO: Evitar que al recargar la pagina se pierda el usuario loggeado


export default function Header() {
  const [key, setKey] = React.useState("home");
  const { user, setUser } = useContext(PropertiesContext);
  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname)
    setKey(location.pathname)
  }, []);

  useEffect(() => {
    // const userJson = window.localStorage.getItem("loggedPropertyappUser");
    const getUserEffect = async () => {
      if (!user) {
        const id = JSON.parse(window.localStorage.getItem("userId"));
        if (id){
          const userfromdb = await userServices.getUser(id); //! aqui solo estamos añadiendo el usuario pero no el token
          setUser(userfromdb); 
        }
       
      }
    }
    getUserEffect();
  }, []);

  //obtenemos el token del usuario loggeado
    


  const styleLink = "d-flex align-items-center justify-content-start"
  const styleBrand = {
    fontFamily: "Oswald, sans-serif",
    fontWeight: "600",
    fontSize: "1.2rem",
  }
  
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const handleSelect = (eventKey) => {
    setKey(eventKey);
  }


  return (
    <>
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand style={styleBrand} href="/">
        <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top me-1"
              alt="React Bootstrap logo"
            />
        HomeFinder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
        <Nav activeKey={key} onSelect={handleSelect}>
          <Nav.Link className={styleLink} eventKey="/" onClick={() => navigate("/")}><BsHouseDoor />Home</Nav.Link>
          <Nav.Link className={styleLink} eventKey="/comprar" onClick={() => navigate("/comprar")}><MdOutlineRealEstateAgent />Comprar</Nav.Link>
          <Nav.Link className={styleLink} eventKey="/alquilar" onClick={() => navigate("/alquilar")}><GiHouseKeys />Alquilar</Nav.Link>
          {user?.id && 
            <>
            <Nav.Link className={styleLink} eventKey="/publicar_anuncio" onClick={() => navigate("/publicar_anuncio")}><MdPublish />Publicar</Nav.Link>
            <Stack direction="horizontal" gap={1}>
            <NavDropdown className="justify-content-end" title={user.username} align="end"  size="sm" id="collasible-nav-dropdown">
              <NavDropdown.Item style={{fontSize: ".7rem"}} onClick={() => navigate("/perfil")}>Perfil</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize: ".7rem"}} onClick={() => navigate("/publicados")}>
                publicados
              </NavDropdown.Item>
              <NavDropdown.Item style={{fontSize: ".7rem"}} onClick={() => navigate("/favoritos")}>favoritos</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize: ".7rem"}} onClick={() => navigate("/mensajes")}>mensajes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item style={{fontSize: ".7rem"}}  onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Image src={user.image ?? profileDefaultImg } alt="imgprofile" roundedCircle width="25" height="25" className="me-1" />
            </Stack>
            </>
          
          }
          {
            !user?.id && 
            <>
            <Nav.Link className={styleLink} onClick={() => navigate("/login")}>
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link className={styleLink} onClick={() => navigate("/register")}>
              Registrarse
            </Nav.Link>
            </>
          }

        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    <footer>
      <Container fluid className="footer-app">
        <p className="text-center">HomeFinder 2021</p>
      </Container>
    </footer>
    </>
  );
}
