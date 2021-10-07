import React from "react";

export default function Login() {
  return (
    <div
      style={{
        backgroundImage: `url('${process.env.PUBLIC_URL}/images/wallpaper.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "5px",
      }}
    >
      <div
        style={{ backgroundColor: "#fff" }}
        className="login-box text-center"
      >
        <form className="p-5">
          <h1 className="h3 mb-3 fw-normal">Iniciar Sesión</h1>
          <label className="text-left d-block " for="floatingInput">
            Email
          </label>
          <div className="form-floating my-2">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
          </div>
          <label className="text-left d-block" for="floatingPassword">
            Contraseña
          </label>
          <div className="form-floating mt-2 mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
          </div>

          <button className="w-100 btn btn-lg btn-primary mb-5" type="submit">
            Confirmar
          </button>

          <small className="d-block mb-3">O iniciar sesión con</small>

          <button
            style={{
              backgroundColor: "#3b5998",
              borderColor: "#3b5998",
              width: "50px",
            }}
            className=" btn btn-lg btn-primary  mr-3"
          >
            <i class="fab fa-facebook-f"></i>
          </button>

          <button
            style={{
              backgroundColor: "#ea4335",
              borderColor: "#ea4335",
              width: "50px",
            }}
            className=" btn btn-lg btn-primary ml-3"
          >
            <i className="fab fa-google"></i>
          </button>

          <small className="d-block mt-4 mb-3">O crear cuenta con</small>

            <a href="#">Registrarse</a>
  

          <p className="mt-5 mb-3 text-muted">&copy; 2020–2021</p>
        </form>
      </div>
    </div>
  );
}
