import "./RegisterPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { IconX, IconCheck } from "@tabler/icons-react";
import { Notification } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registerSucceed, setRegisterSucceed] = useState();
  const navigate = useNavigate();

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3000/users/register", payload);
      setRegisterSucceed(true);
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setRegisterSucceed(false);
    }
  };

  useEffect(() => {
    if (registerSucceed !== undefined) {
      const timer = setTimeout(() => {
        setRegisterSucceed(undefined);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [registerSucceed]);

  return (
    <div className="divRegister">
      <div className="notificationContainer">
        {registerSucceed == false && (
          <Notification
            icon={xIcon}
            color="red"
            title="Ha habido un error"
            withCloseButton={false}
          />
        )}
        {registerSucceed == true && (
          <Notification
            icon={checkIcon}
            color="teal"
            title="Usuario creado con éxito"
            withCloseButton={false}
          />
        )}
      </div>
      <main className="mainRegister">
        <div className="contentWrapper">
          <div className="leftSide">
            <h2 className="registerTitle">REGISTRATE</h2>
            <form
              action="post"
              className="formRegister"
              onSubmit={handleSubmit}
            >
              <div className="divFormRegister">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoFocus
                  onChange={(event) =>
                    setPayload({ ...payload, name: event.target.value })
                  }
                />
              </div>
              <div className="divFormRegister">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(event) =>
                    setPayload({ ...payload, email: event.target.value })
                  }
                />
              </div>
              <div className="divFormRegister">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(event) =>
                    setPayload({ ...payload, password: event.target.value })
                  }
                />
              </div>
              <button type="submit">Registrarse</button>
            </form>
            <div className="separator">o</div>
            <div className="loginLink">
              ¿Ya tienes cuenta? <Link to="/">Iniciar sesión</Link>
            </div>
          </div>
          <div className="imageContainer">
            <img src="img/descarga.jpeg" alt="Imagen Login" />
          </div>
        </div>
      </main>
    </div>
  );
}
