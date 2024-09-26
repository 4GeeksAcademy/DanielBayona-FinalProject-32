import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import SupervisorSidebar from "../../js/component/supervisorNavBar.js";
import Swal from 'sweetalert2'

const initialState = {
    "name": "",
    "last_name": "",
    "mail": "",
    "adress": "",
    "phone": "",
    "position": "",
    "identification": ""
}


const EditWorkerForm = () => {
    const { store, actions } = useContext(Context);
    const [worker, setWorker] = useState(initialState);


    const param = useParams();
    const navigate = useNavigate();

    const searchworker = async (id) => {
        const foundworker = await actions.workerInfo(id)

        if (foundworker) {
            setWorker({
                id: foundworker.id,
                name: foundworker.name,
                last_name: foundworker.last_name,
                mail: foundworker.mail,
                adress: foundworker.adress,
                phone: foundworker.phone,
                position: foundworker.position,
                identification: foundworker.identification
            });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setWorker({
            ...worker,
            [name]: value
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();


        formData.append("name", worker.name);
        formData.append("last_name", worker.last_name);
        formData.append("mail", worker.mail);
        formData.append("adress", worker.adress);
        formData.append("phone", worker.phone);
        formData.append("position", worker.position);
        formData.append("identification", worker.identification);

        try {
            let response = await actions.editWorker(worker.id, formData);

            if (response) {
                setWorker(initialState)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "worker edited successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/supervisor");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "There was an error while editing the worker. Please contact the admin.",
                });
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchworker = async () => {
            await searchworker(param.id);
        };
        fetchworker();
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
                <div className="container mt-3">
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Name:
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            value={worker.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Last Name:
                        <input
                            name="last_name"
                            type="text"
                            className="form-control"
                            value={worker.last_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Mail:
                        <input
                            name="mail"
                            type="text"
                            className="form-control"
                            value={worker.mail}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Address:
                        <input
                            name="adress"
                            type="text"
                            className="form-control"
                            value={worker.adress}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Phone:
                        <input
                            name="phone"
                            type="text"
                            className="form-control"
                            value={worker.phone}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Position:
                        <input
                            name="position"
                            type="text"
                            className="form-control"
                            value={worker.position}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Identification:
                        <input
                            name="identification"
                            type="text"
                            className="form-control"
                            value={worker.identification}
                            onChange={handleChange}
                        />
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
                    Edit worker
                </button>
            </form>
        </div>
    );
};

const EditWorker = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column pt-5" style={{ backgroundColor: "white" }}>
            <h1>Edit Worker</h1>
            <EditWorkerForm />
        </div>
    );
};

const SupervisorEditWorker = () => {
    const { store } = useContext(Context);
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <SupervisorSidebar />
                    <EditWorker />
                </>
            )}
        </>
    );
};

export default SupervisorEditWorker;
