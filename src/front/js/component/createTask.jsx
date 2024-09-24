import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/Logo.png";
import Swal from 'sweetalert2'


const initialState = {
    "name": "",
    "user_id": "",
    "desc": "",
    "work": "",
    "date" : "",
    "company" : ""
}

const CreateTaskForm = () => {
    const { store, actions } = useContext(Context);
    const [task, setTask] = useState(initialState);
    const [workPreview, setWorkPreview] = useState("");

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "work") {
            const file = files[0];
            setTask({
                ...task,
                work: file
            });
            setWorkPreview(URL.createObjectURL(file))
        } else {
            setTask({
                ...task,
                [name]: value
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", task.name);
        formData.append("desc", task.desc);
        formData.append("user_id", store.token.user_id);
        formData.append("work", task.work);
        formData.append("date",task.date)
        formData.append("company", task.company)

        const response = actions.createTask(formData);
        console.log("sirvo");

        response
            .then((res) => {
                if (res == 201) {
                    setTask(initialState)
                    setWorkPreview("");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Task created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (res == 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "There has been a problem creating the task. Check console.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "There was an error while creating task.",
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
                        src={workPreview || require("../../img/pngwing.com.png").default}
                        alt="work Image"
                        style={{ width: "120px", height: "120px", marginBottom: "10px" }}
                    />
                    <div>
                        <label className="btn btn-secondary" htmlFor="work-upload" style={{ cursor: "pointer" }}>
                            Task
                            <input
                                id="work-upload"
                                type="file"
                                name="work"
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
                            value={task.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Description:
                        <input
                            name="desc"
                            type="text"
                            className="form-control"
                            value={task.desc}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Company:
                        <input
                            name="company"
                            type="text"
                            className="form-control"
                            value={task.company}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Date:
                        <input
                            name="date"
                            type="date"
                            className="form-control"
                            value={task.date}
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
                    Create task
                </button>
            </form>
        </div>
    );
};

const CreateTask = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column pt-5" style={{ backgroundColor: "white" }}>
            <h1>Create task</h1>
            <CreateTaskForm />
        </div>
    );
};

export default CreateTask;