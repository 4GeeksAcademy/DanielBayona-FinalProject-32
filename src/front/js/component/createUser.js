import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";

const CreateUserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = (event) => {
        event.preventDefault();

        // enviar los datos del formulario a  backend
        console.log('Nombre de usuario:', username);
        console.log('Contraseña:', password);
        console.log('Rol:', role);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Rol:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    {/* Agrega más opciones de roles ¿? */}
                </select>
            </label>
            <button type="submit">Crear Usuario</button>
        </form>
    );
};

const CreateUser = () => {
    return (
        <div style={{ display: "flex" }}>
            <nav style={{ backgroundColor: "#A5C894", height: "100vh", padding: "20px 0", width: '250px' }}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <img src={Logo} alt="Taskyist Logo" style={{ width: "100px" }} />
                </div>
                <ul className="nav flex-column" style={{ listStyle: "none", padding: "0" }}>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            HOME
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks">
                            ISSUES
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/workers">
                            USER
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">
                            LOG OUT
                        </Link>
                    </li>
                </ul>
            </nav>
            <main style={{ marginLeft: '250px', padding: '20px' }}>
                <h1>Crear Usuario</h1>
                <CreateUserForm />
            </main>
        </div>
    );
};

export default CreateUser;
