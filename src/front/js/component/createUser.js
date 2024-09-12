import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/Logo.png";

const CreateUserForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('worker'); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = { username, password, role };
        try {
            const response = role;
            if (response === "worker") {
                navigate("/worker");
            } else if (response === "supervisor") {
                navigate("/supervisor");
            } else if (response === "administrador") {
                navigate("/admin");
            } else {
                console.log("Error al crear usuario");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", marginRight: "100px" }}>
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "400%",
                maxWidth: "750px", 
                backgroundColor: "white",
                padding: "45px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <img
                    src={require("../../img/Imagen1user.png").default}
                    alt="Imagen de usuario"
                    style={{ width: "120px", height: "120px", alignSelf: "center" }}
                />
                <div className="container mt-3">
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        User name input:
                        <input 
                            name="username" 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        User password input:
                        <input 
                            name="password" 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Role dropdown:
                        <select 
                            name="role"
                            className="form-select" 
                            style={{ backgroundColor: "#A5C894" }} 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="worker">Worker</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="administrator">Administrator</option>
                        </select>
                    </label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-secondary btn-sm" 
                    style={{
                        width: "150px",
                        alignSelf: "center",
                        backgroundColor: "#A5C894"
                    }}
                >
                    Create User
                </button>
            </form>
        </div>
    );
};

const CreateUser = () => {
    return (
        <div style={{ display: "flex", backgroundColor: "white" }}>
            <nav style={{ backgroundColor: "#A5C894", height: "100vh", padding: "10px 0", width: '250px' }}>
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                    <img src={Logo} alt="Taskyist Logo" style={{ width: "100px" }} />
                </div>
            </nav>
            <main style={{ marginLeft: '80px', padding: '0px', backgroundColor: "white" }}>
                <h1>Create User</h1>
                <CreateUserForm />
            </main>
        </div>
    );
};

export default CreateUser;
