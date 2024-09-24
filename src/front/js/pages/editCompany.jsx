import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import supervisorSideBar from "../../js/component/supervisorNavBar.js";
import Swal from 'sweetalert2'

const initialState = {
    "name": "",
    "phone": "",
    "mail": "",
    "adress": "",
    "identification": ""
}


const EditCompanyForm = () => {
    const { store, actions } = useContext(Context);
    const [company, setCompany] = useState(initialState);

    const param = useParams();
    const navigate = useNavigate();

    const searchcompany = async (id) => {
        const foundcompany = await actions.companyInfo(id)

        if (foundcompany) {
            setCompany({
                id: foundcompany.id,
                name: foundcompany.name,
                phone: foundcompany.phone,
                mail: foundcompany.mail,
                adress: foundcompany.adress,
                identification: foundcompany.identification
            });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCompany({
            ...company,
            [name]: value
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();


        formData.append("name", company.name);
        formData.append("phone", company.phone);
        formData.append("mail", company.mail);
        formData.append("adress", company.adress);
        formData.append("identification", company.identification);

        try {
            let response = await actions.editCompany(company.id, formData);

            if (response) {
                setCompany(initialState);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "company edited successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/supervisor");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "There was an error while editing the company. Please contact the admin.",
                });
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchcompany = async () => {
            await searchcompany(param.id);
        };
        fetchcompany();
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
                            value={company.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Mail:
                        <input
                            name="mail"
                            type="text"
                            className="form-control"
                            value={company.mail}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Address:
                        <input
                            name="adress"
                            type="text"
                            className="form-control"
                            value={company.adress}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Phone:
                        <input
                            name="phone"
                            type="text"
                            className="form-control"
                            value={company.phone}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Identification:
                        <input
                            name="identification"
                            type="text"
                            className="form-control"
                            value={company.identification}
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
                    Edit company
                </button>
            </form>
        </div>
    );
};

const EditCompany = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column pt-5" style={{ backgroundColor: "white" }}>
            <h1>Edit company</h1>
            <EditCompanyForm />
        </div>
    );
};

const SupervisorEditCompany = () => {
    const { store } = useContext(Context);
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <supervisorSideBar />
                    <EditCompany />
                </>
            )}
        </>
    );
};

export default SupervisorEditCompany;
