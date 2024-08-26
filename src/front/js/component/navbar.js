import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav style={{ backgroundColor: "#A9D18E", height: "100vh", padding: "20px 0" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src="/path-to-logo.png" alt="Taskyist Logo" style={{ width: "100px" }} /> {Image.png}
            </div>
            <ul className="nav flex-column" style={{ listStyle: "none", padding: "0" }}>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <FaHome /> INICIO
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/tasks">
                        <FaTasks /> TAREAS
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/workers">
                        <FaUsers /> TRABAJADORES
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/companies">
                        <FaBuilding /> EMPRESAS
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                        <FaSignOutAlt /> CERRAR SESIÓN
                    </Link>
                </li>
            </ul>
        </nav>
    );
};