import Reac, { useContext } from "react";
import iconlogin from "../imgs/icon-login4.png";
// import useField from '../Hooks/useField';
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";
import iconRegister from "../imgs/img-register3.jpg";
import PropertiesContext from "../context/PropertiesProvider";
import "../styles/css/registerform.css";

//TODO:crear el registro del usuario validando los campos y enviando los datos al backend

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm();
  const { user, setUser } = useContext(PropertiesContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.password2) {
      alert("Las contraseñas no coinciden");
    } else {
      // Llamada al backend
      try {
        const res = await userService.createUser(data);
        setUser(res);
        navigate("/login");
      } catch (exception) {
        alert("Error al crear el usuario");
      }
    }
  };

  return (
    <div className="container-form-register">
      <div className="div-register">
        <div className="title-register">
          <img src={iconlogin} alt="icon-login" width={30} />
          <h1>HomeFinder</h1>
        </div>
        <div className="div-form-register">
          <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <h1 className="welcome">¡Registrate ahora!</h1>
              {errors.password2 && (
                <p style={{ color: "red", marginBottom: "0" }}>
                  {errors.password2.message}
                </p>
              )}
              <div className="col">
                <div className="form-group">
                  <label>Nombre de usuario</label>
                  <input
                    type="text"
                    {...register("username", { required: true, maxLength: 80 })}
                  />
                </div>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" {...register("name", { maxLength: 80 })}/>
                </div>
                <div className="form-group">
                  <label>Apellidos</label>
                  <input
                    type="text"
                    {...register("lastname", { maxLength: 80 })}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>
                <div className="form-group">
                  <label>Confirma la contraseña</label>
                  <input
                    type="password"
                    {...register("password2", {
                      required: true,
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return (
                            password === value ||
                            "Las contraseñas no coinciden!"
                          );
                        },
                      },
                    })}
                  />
                </div>
              </div>
              <div className="form-group">
                <button className="button-new" type="submit">
                  Registrar nueva cuenta
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <img className="img-register" src={iconRegister} alt="registerImage" />
    </div>
  );
};

export default RegisterForm;
