import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";

const CreateUserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = (event) => {
        event.preventDefault();

        // enviar los datos del formulario a backend
        console.log('User name input:', username);
        console.log('User password input:', password);
        console.log('Role:', role);
    };

    return (

        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>

            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "650px",
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"

            }}>
                <img
                    src={require("../../img/Imagen1user.png").default}
                    alt="Imagen de usuario"
                    style={{ width: "100px", height: "104px" }}
                    className="d-inline-block align-text-top"
                />
                <label>
                    User name input:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    User password input:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Role dropdown:
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">Worker</option>
                        <option value="admin">Supervisor</option>
                    </select>
                </label>
                <button type="submit" className="btn btn-secondary btn-sm" style={{ width: "150px" }}>  Create User</button>
                <button type="submit" className="btn btn-secondary btn-sm" style={{ width: "150px" }}>  Save </button>
            </form>
        </div>
    );
};

const CreateUser = () => {
    return (
        <div style={{ display: "flex", backgroundColor: "white", }}>
            <nav style={{ backgroundColor: "#A5C894", height: "100vh", padding: "20px 0", width: '250px' }}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <img src={Logo} alt="Taskyist Logo" style={{ width: "100px" }} />
                </div>
            </nav>
            <main style={{ marginLeft: '250px', padding: '20px', textAlign: "center", backgroundColor: "white" }}>
                <h1 > Create User </h1>
                <CreateUserForm />
            </main>
        </div>
    );
};

export default CreateUser;
