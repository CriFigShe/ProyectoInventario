import "./LoginPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { IconX, IconCheck } from "@tabler/icons-react";
import { Notification } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { setAuthToken } = useAuth();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [registerSucceed, setRegisterSucceed] = useState();

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users/login", payload);
      setAuthToken(response.data.data.token)
      setRegisterSucceed(true);
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
    <div className="divLogin">
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
            title="Sesión iniciada con exito"
            withCloseButton={false}
          />
        )}
      </div>
      <main className="mainLogin">
        <div className="contentWrapper">
          <div className="leftSide">
            <h2 className="loginTitle">Iniciar Sesión</h2>
            <form action="post" className="formLogin" onSubmit={handleSubmit}>
              <div className="divFormLogin">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoFocus
                  onChange={(event) =>
                    setPayload({ ...payload, email: event.target.value })
                  }
                />
              </div>
              <div className="divFormLogin">
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
              <button type="submit">Iniciar Sesión</button>
            </form>
            <div className="separator">o</div>
            <div className="registerLink">
              ¿No tienes una cuenta? <Link to="/register">Registrarse</Link>
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
