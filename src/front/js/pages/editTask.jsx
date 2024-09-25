import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../js/component/Sidebar.jsx";
import Swal from 'sweetalert2'

const initialState = {
    "name": "",
    "desc": "",
    "work": null,
    "currentWork": "",
    "review": "",
    "status": "",
    "date": "",
    "company": ""
}

const EditTaskForm = () => {
    const { store, actions } = useContext(Context);
    const [task, setTask] = useState(initialState);
    const [workPreview, setWorkPreview] = useState("");
    const [companies, setCompanies] = useState([]);
    const [workers, setWorkers] = useState([]);

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("URL Param ID:", param.id); 

        const fetchTask = async () => {
            await searchTask(param.id);
        };
        fetchTask();
    }, [param.id]);

    const searchTask = async (id) => {

        console.log("Fetching Task with ID:", id);

        const foundTask = await actions.taskInfo(id);

        console.log("Found Task:", foundTask);

        if (foundTask) {
            setTask({
                id: foundTask.id,
                name: foundTask.name,
                desc: foundTask.desc,
                work: null,
                currentWork: foundTask.Work,
                review: foundTask.review,
                status: foundTask.status,
                date: foundTask.date,
                worker_id: foundTask.worker_id
            });
            setWorkPreview(foundTask.work);
        }
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "work") {
            const file = files[0];
            setTask(prevTask => ({
                ...prevTask,
                work: file
            }));
            setWorkPreview(URL.createObjectURL(file));
        } else {
            setTask(prevTask => ({
                ...prevTask,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        console.log("Submitting Task:", task);

        const formData = new FormData();
        formData.append("name", task.name);
        formData.append("desc", task.desc);
        formData.append("review", task.review);
        formData.append("status", task.status);
        formData.append("date", task.date);
        formData.append("company", task.company);
        formData.append("worker_id", task.worker_id)

        if (!task.work) {
            formData.append("Work", task.currentWork);
        } else {
            formData.append("Work", task.work);
        }

        try {
            console.log("Submitting form for Task ID:", task.id);

            let response = await actions.editTask(task.id, formData);

            if (response) {
                setTask(initialState);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Task edited successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/supervisor");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "There was an error while editing the task. Please contact the admin.",
                });
            }

        } catch (error) {
            console.log("Error submitting task:", error);
        }

        const fetchCompanies = async () => {
            const response = await actions.getCompanies();
            setCompanies(response);
        };
        useEffect(() => {
            fetchCompanies();
        }, []);

        const fetchWorkers = async () => {
            const response = await actions.getWorkers();
            setWorkers(response);
        };
        useEffect(() => {
            fetchWorkers();
        }, []);
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
                    <label htmlFor="work-upload" style={{ cursor: "pointer" }}>
                        <img
                            src={workPreview || require("../../img/pngwing.com.png").default}
                            alt="Task Image"
                            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
                        />
                        <input
                            id="work-upload"
                            type="file"
                            name="Work"
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
                        Status:
                        <input
                            name="status"
                            type="text"
                            className="form-control"
                            value={task.status}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Review:
                        <input
                            name="review"
                            type="text"
                            className="form-control"
                            value={task.review}
                            onChange={handleChange}
                        />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Company:
                        <select
                            name="company"
                            type="text"
                            className="form-select"
                            value={task.company}
                            onChange={handleChange}
                        >
                            <option value="">Select Company</option>
                            {companies.map((company, index) => (
                                <option key={index} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        Worker:
                        <select
                            name="worker"
                            type="text"
                            className="form-select"
                            value={task.worker_id}
                            onChange={handleChange}
                        >
                            <option value="">Select Worker</option>
                            {workers.map((worker, index) => (
                                <option key={index} value={worker.id}>
                                    {worker.id} {worker.name}
                                </option>
                            ))}
                        </select>
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
                    Edit Task
                </button>
            </form>
        </div>
    );
};

const EditTask = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column pt-5" style={{ backgroundColor: "white" }}>
            <h1>Edit Task</h1>
            <EditTaskForm />
        </div>
    );
};

const SupervisorEditTask = () => {
    const { store } = useContext(Context);
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <Sidebar />
                    <EditTask />
                </>
            )}
        </>
    );
};

export default SupervisorEditTask;