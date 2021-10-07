import React from "react";
import axios from "axios";

function Home() {
  return (
    <div className="jumbotron">
      <h1>Home Page</h1>
      <a href="http://localhost:3001/api/users/auth/facebook">
        <h3>
          <i class="bx bxl-facebook-square h1"></i> Iniciar sesión con Facebook
        </h3>
      </a>
    </div>
  );
}

export default Home;
