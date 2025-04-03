import "./LoginPage.css";

export default function Login() {
  return (
    <div className="divLogin">
      <main className="mainLogin">
        <div className="contentWrapper">
          <div className="leftSide">
            <h2 className="loginTitle">Iniciar Sesión</h2>
            <form action="post" className="formLogin">
              <div className="divFormLogin">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"/>
              </div>
              <div className="divFormLogin">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              <button type="submit">Registarse</button>
            </form>
            <div className="separator">o</div>
            <div className="registerLink">
                ¿No tienes una cuenta? <a href="#">Registrarse</a>
            </div>
          </div>
          <div className="imageContainer">
            <img src="/descarga.jpeg" alt="Imagen Login" />
          </div>
        </div>
      </main>
    </div>
  );
}