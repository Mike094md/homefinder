import "./styles/css/Root.css";
import React, { useContext } from "react";
import LoginForm from "./components/LoginForm";
import RegiserForm from "./components/RegisterForm";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import PropertyForm from "./components/PropertyFormView/PropertyForm";
import Header from "./components/Header";
import { Navigate } from "react-router-dom";
import PropertiesContext from "./context/PropertiesProvider";
import Home from "./components/HomeView/Home";
import UserProfile from "./components/UserProfile";
import BuySection from "./components/BuySection";
import userService from "./services/users";
import FavProperties from "./components/FavProperties";
import RentSection from "./components/RentSection";
import Messages from "./components/Messages";
import UserProperties from "./components/UserProperties";
import PropertyDetails from "./components/PropertiesView/PropertyDetails";


const ProtectedRoute = ({ children }) => {
    
  // localStorage 
    const {user, setUser} = useContext(PropertiesContext);

    //const userLogged = JSON.parse(localStorage.getItem("loggedPropertyappUser"));


    if (user) {
      return children
    }else {
      const userId = JSON.parse(localStorage.getItem("userId"));
      if (userId !== null){
        const userfromdb = userService.getUser(userId)
        if (userfromdb) {
          setUser(userfromdb);
          return children
        }
      }
     
      return <Navigate to="/login" />
    }

    
}

function App() {
  const { user, setUser } = useContext(PropertiesContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegiserForm />} />

          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="publicar_anuncio" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
            <Route path="perfil" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="favoritos" element={<ProtectedRoute><FavProperties /></ProtectedRoute>} />
            <Route path="mensajes" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="publicados" element={<ProtectedRoute><UserProperties /></ProtectedRoute>} />
            <Route path="comprar" element={<BuySection/>} />
            <Route path="alquilar" element={<RentSection />} />
            <Route path="property_details/:id_property" element={<PropertyDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default  App;


