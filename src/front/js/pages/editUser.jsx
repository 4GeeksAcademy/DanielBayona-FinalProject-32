import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../js/component/Sidebar.jsx";
import Swal from 'sweetalert2'

const initialState = {
    "username": "",
    "password": "",
    "pic": null,
    "currentPic": "",
    "role": "worker"
}


const EditUserForm = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(initialState);
    const [picPreview, setPicPreview] = useState("");

    const param = useParams();
    const navigate = useNavigate();

    const searchUser = async (id) => {
        const foundUser = await actions.userInfo(id)

        if (foundUser) {
            setUser({
                id: foundUser.id,
                username: foundUser.username,
                password: "",
                pic: null,
                currentPic: foundUser.pic,
                role: foundUser.role
            });
            setPicPreview(foundUser.pic)
        }
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "pic") {
            const file = files[0];
            setUser(prevUser => ({
                ...prevUser,
                pic: file
            }));
            setPicPreview(URL.createObjectURL(file));
        } else {
            setUser(prevUser => ({
                ...prevUser,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();


        formData.append("username", user.username);
        formData.append("password", user.password);
        formData.append("role", user.role);


        if (!user.pic) {
            formData.append("pic", user.currentPic);
        } else {
            formData.append("pic", user.pic);
        }


        try {
            let response = await actions.editUser(user.id, formData);

            if (response) {
                setUser(initialState);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User edited successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/admin");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "There was an error while editing the user. Please contact the admin.",
                });
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            await searchUser(param.id);
        };
        fetchUser();
    }, [param.id]);

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
                        Username:
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Password:
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Role:
                        <select
                            name="role"
                            className="form-select"
                            style={{ backgroundColor: "#A5C894" }}
                            value={user.role}
                            onChange={handleChange}
                        >
                            <option value="worker">{user.role}</option>
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
                    Edit User
                </button>
            </form>
        </div>
    );
};

const EditUser = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column pt-5" style={{ backgroundColor: "white" }}>
            <h1>Edit User</h1>
            <EditUserForm />
        </div>
    );
};

const AdminEditUser = () => {
    const { store } = useContext(Context);
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <Sidebar />
                    <EditUser />
                </>
            )}
        </>
    );
};

export default AdminEditUser;
