import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../js/component/Sidebar.jsx";
import Swal from 'sweetalert2'

const initialState = {
    "name": "",
    "desc": "",
    "proof": null,
    "currentProof": "",
    "review": "",
    "status": ""
}

const EditIssueForm = () => {
    const { store, actions } = useContext(Context);
    const [issue, setIssue] = useState(initialState);
    const [proofPreview, setProofPreview] = useState("");

    const param = useParams();
    const navigate = useNavigate();

    // Debugging: log param.id to see if it's coming through correctly
    useEffect(() => {
        console.log("URL Param ID:", param.id); // Log the issue ID from the URL

        const fetchIssue = async () => {
            await searchIssue(param.id);
        };
        fetchIssue();
    }, [param.id]);

    const searchIssue = async (id) => {
        // Debugging: log the ID before making the API call
        console.log("Fetching issue with ID:", id);

        const foundIssue = await actions.issueInfo(id);

        // Debugging: log the fetched issue details
        console.log("Found Issue:", foundIssue);

        if (foundIssue) {
            setIssue({
                id: foundIssue.id,
                name: foundIssue.name,
                desc: foundIssue.desc,
                proof: null,
                currentProof: foundIssue.proof,
                review: foundIssue.review,
                status: foundIssue.status
            });
            setProofPreview(foundIssue.proof);
        }
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "proof") {
            const file = files[0];
            setIssue(prevIssue => ({
                ...prevIssue,
                proof: file
            }));
            setProofPreview(URL.createObjectURL(file));
        } else {
            setIssue(prevIssue => ({
                ...prevIssue,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Debugging: log the issue object before submitting
        console.log("Submitting issue:", issue);

        const formData = new FormData();
        formData.append("name", issue.name);
        formData.append("desc", issue.desc);
        formData.append("review", issue.review);
        formData.append("status", issue.status);

        if (!issue.proof) {
            formData.append("proof", issue.currentProof);
        } else {
            formData.append("proof", issue.proof);
        }

        try {
            // Debugging: log the issue ID before making the API call
            console.log("Submitting form for issue ID:", issue.id);

            let response = await actions.editIssue(issue.id, formData);

            if (response) {
                setIssue(initialState);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Issue edited successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/admin");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "There was an error while editing the Issue. Please contact the admin.",
                });
            }

        } catch (error) {
            console.log("Error submitting issue:", error);
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
                <div style={{ textAlign: "center" }}>
                    <label htmlFor="proof-upload" style={{ cursor: "pointer" }}>
                        <img
                            src={proofPreview || require("../../img/pngwing.com.png").default}
                            alt="Issue Image"
                            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
                        />
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
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Status:
                        <input
                            name="status"
                            type="text"
                            className="form-control"
                            value={issue.status}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Review:
                        <input
                            name="review"
                            type="text"
                            className="form-control"
                            value={issue.review}
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
                    Edit Issue
                </button>
            </form>
        </div>
    );
};

const EditIssue = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column pt-5" style={{ backgroundColor: "white" }}>
            <h1>Edit Issue</h1>
            <EditIssueForm />
        </div>
    );
};

const AdminEditIssue = () => {
    const { store } = useContext(Context);
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <Sidebar />
                    <EditIssue />
                </>
            )}
        </>
    );
};

export default AdminEditIssue;
