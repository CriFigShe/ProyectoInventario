import "./RegisterPage.css";

export default function Register() {
  return (
    <div className="divRegister">
      <main className="mainRegister">
        <div className="contentWrapper">
          <div className="leftSide">
            <h2 className="registerTitle">Registrarse</h2>
            <form action="post" className="formRegister">
              <div className="divFormRegister">
                <label htmlFor="name">Nombre</label>
                <input type="text" name="name" id="name" autoFocus/>
              </div>
              <div className="divFormRegister">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"/>
              </div>
              <div className="divFormRegister">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              <button type="submit">Registarse</button>
            </form>
          </div>
          <div className="imageContainer">
            <img src="/descarga.jpeg" alt="Imagen Login" />
          </div>
        </div>
      </main>
    </div>
  );
}