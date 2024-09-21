import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import Logo from "../../img/Logo.png";

const initialState = {
    name: "",
    mail: "",
    adress: "",
    phone: "",
    identification: "",
}


const CreateCompanyForm = () => {
    const { store, actions } = useContext(Context)
    const [company, setCompany] = useState(initialState)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCompany({
            ...company,
            [name]: value,
        })
    }

    const validatePhone = (phone) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phone)
    }

    const validateIdentification = (identification) => {
        const idPattern = /^[0-9]+$/;
        return idPattern.test(identification);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!validatePhone(company.phone)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Phone Number",
                text: "Please enter a valid phone number with exactly 10 digits.",
            }); return;
        }

        if (!validateIdentification(company.identification)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Identification",
                text: "Identification must contain only numbers.",
            });
            return;
        }

        try {
            const res = await actions.createCompany({
                name: company.name,
                mail: company.mail,
                adress: company.adress,
                phone: company.phone,
                identification: company.identification,
            });

            if (res === 201) {
                setCompany(initialState);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Company created successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else if (res === 400) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The Company already exists",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An unexpected error occurred.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to create worker. Please try again.",
            });
        }
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                marginRight: "100px",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    width: "400%",
                    maxWidth: "750px",
                    backgroundColor: "white",
                    padding: "45px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div className="container mt-3">
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "10px",
                        }}
                    >
                        Name:
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            value={company.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "10px",
                        }}
                    >
                        Mail:
                        <input
                            name="mail"
                            type="text"
                            className="form-control"
                            value={company.mail}
                            onChange={handleChange}
                        />
                    </label>
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "10px",
                        }}
                    >
                        Address:
                        <input
                            name="adress"
                            type="text"
                            className="form-control"
                            value={company.adress}
                            onChange={handleChange}
                        />
                    </label>
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "10px",
                        }}
                    >
                        Phone:
                        <input
                            name="phone"
                            type="text"
                            className="form-control"
                            value={company.phone}
                            onChange={handleChange}
                        />
                    </label>
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "10px",
                        }}
                    >
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
                        backgroundColor: "#A5C894",
                    }}
                >
                    Create Company
                </button>
            </form>
        </div>
    );
};


const CreateCompany = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column pt-5" style={{ backgroundColor: "white" }}>
            <h1>Create Company</h1>
            <CreateCompanyForm />
        </div>
    );

}

export default CreateCompany;