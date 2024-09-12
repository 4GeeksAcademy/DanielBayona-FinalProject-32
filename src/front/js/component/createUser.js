import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/Logo.png";
import Swal from 'sweetalert2'

const initialState = {
    "username": "",
    "password": "",
    "pic": "",
    "role": "worker"
}

const CreateUserForm = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(initialState);
    const [picPreview, setPicPreview] = useState("");

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "pic") {
            const file = files[0];
            setUser({
                ...user,
                pic: file
            });
            setPicPreview(URL.createObjectURL(file))
        } else {
            setUser({
                ...user,
                [name]: value
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("password", user.password);
        formData.append("role", user.role);
        formData.append("pic", user.pic);

        const response = actions.register(formData);
        console.log("sirvo");

        response
            .then((res) => {
                if (res == 201) {
                    setUser(initialState)
                    setPicPreview("");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (res == 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "The user already exists",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "There was an error while creating the user. Please contact the admin.",
                    });
                }
            })
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
                <div style={{ textAlign: "center" }}>
                    <label htmlFor="pic-upload" style={{ cursor: "pointer" }}>
                        <img
                            src={picPreview || require("../../img/Imagen1user.png").default}
                            alt="User Image"
                            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
                        />
                        <input
                            id="pic-upload"
                            type="file"
                            name="pic"
                            accept="image/*"
                            onChange={handleChange}
                            style={{ display: "none" }}
                        />
                    </label>
                </div>
                <div className="container mt-3">
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        User name input:
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        User password input:
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Role dropdown:
                        <select
                            name="role"
                            className="form-select"
                            style={{ backgroundColor: "#A5C894" }}
                            value={user.role}
                            onChange={handleChange}
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
