import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
<<<<<<< HEAD
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
=======
    return (
        <nav style={{ backgroundColor: "#A5C894", height: "100vh", padding: "20px 0" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src="" alt="Taskyist Logo" style={{ width: "100px" }} />
            </div>
            <ul className="nav flex-column" style={{ listStyle: "none", padding: "0" }}>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        INICIO
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/tasks">
                        TAREAS
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/workers">
                        TRABAJADORES
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/companies">
                        EMPRESAS
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                        CERRAR SESIÓN
                    </Link>
                </li>
            </ul>
        </nav>
    );
>>>>>>> develop
};
