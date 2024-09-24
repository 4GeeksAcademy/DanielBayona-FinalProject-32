import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/Logo.png";
import Swal from 'sweetalert2'


const initialState = {
    "name": "",
    "user_id": "",
    "desc": "",
    "proof": "",
}

const CreateIssueForm = () => {
    const { store, actions } = useContext(Context);
    const [issue, setIssue] = useState(initialState);
    const [proofPreview, setProofPreview] = useState("");

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "proof") {
            const file = files[0];
            setIssue({
                ...issue,
                proof: file
            });
            setProofPreview(URL.createObjectURL(file))
        } else {
            setIssue({
                ...issue,
                [name]: value
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", issue.name);
        formData.append("desc", issue.desc);
        formData.append("user_id", store.token.user_id);
        formData.append("proof", issue.proof);

        const response = actions.createIssue(formData);
        console.log("sirvo");

        response
            .then((res) => {
                if (res == 201) {
                    setIssue(initialState)
                    setProofPreview("");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Issue created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (res == 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "There has been a problem creating the issue. Check console.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "There was an error while creating bug.",
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
                    <img
                        src={proofPreview || require("../../img/pngwing.com.png").default}
                        alt="Proof Image"
                        style={{ width: "120px", height: "120px", marginBottom: "10px" }}
                    />
                    <div>
                        <label className="btn btn-secondary" htmlFor="proof-upload" style={{ cursor: "pointer" }}>
                            Issue
                            <input
                                id="proof-upload"
                                type="file"
                                name="proof"
                                accept="image/*"
                                onChange={handleChange}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>
                </div>
                <div className="container mt-3">
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Name:
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            value={issue.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Description:
                        <input
                            name="desc"
                            type="text"
                            className="form-control"
                            value={issue.desc}
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
                    Create Issue
                </button>
            </form>
        </div>
    );
};

const CreateIssue = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column pt-5" style={{ backgroundColor: "white" }}>
            <h1>Create Issue</h1>
            <CreateIssueForm />
        </div>
    );
};

export default CreateIssue;