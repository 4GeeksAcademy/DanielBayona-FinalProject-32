import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";

export const CreateUser = () => {
    return (
        <nav style={{ backgroundColor: "#A5C894", height: "100vh", padding: "20px 0", width: '250px' }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src={Logo} alt="Taskyist Logo" style={{ width: "100px" }} />
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
};

export default CreateUser
