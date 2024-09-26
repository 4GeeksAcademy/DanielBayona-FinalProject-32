import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "../../styles/adminUserStyles.css";

const Home = () => {
    const { store, actions } = useContext(Context);
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const response = await actions.getWorkerTasks();
            if (response === 422 || response === 401) {
                actions.logout();
            } else {
                setTasks(response || []);
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            setTasks([]);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="container-admin bg-light" style={{ marginLeft: '250px' }}>
            <section style={{ width: "80%", margin: "auto" }}>
                <table style={{ width: "100%", borderSpacing: "30px" }}>
                    <thead>
                        <tr className="mb-4" style={{ backgroundColor: "#edf1d6" }}>
                            <th style={{ width: "80%" }}>Tasks</th>
                            <th>Info</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.name}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${task.id}`}>
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                        </button>
                                        <div className="modal fade" id={`modal-${task.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog d-flex justify-content-center modal-xl">
                                                <div className="modal-content d-flex justify-content-center">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Task Info</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <table style={{ width: "100%" }}>
                                                            <tr>
                                                                <td className="border" style={{ width: "100%" }}>
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={task.work || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"}
                                                                        alt="Task work"
                                                                    />
                                                                    <hr />
                                                                    <h2 className="fs-5 fw-bold">Name:</h2>
                                                                    <p className="fs-3">{task.name}</p>
                                                                    <hr />
                                                                    <h2 className="fs-5 fw-bold">Company:</h2>
                                                                    <p className="fs-3">{task.company_name}</p>
                                                                    <hr />
                                                                    <h2 className="fs-5 fw-bold">Description:</h2>
                                                                    <p className="fs-3">{task.desc}</p>
                                                                    <hr />
                                                                    <h2 className="fs-5 fw-bold">Status:</h2>
                                                                    <p className="fs-3">{task.status}</p>
                                                                    <hr />
                                                                    <h2 className="fs-5 fw-bold">Date:</h2>
                                                                    <p className="fs-3">{task.date}</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-taskyist" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{task.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No tasks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Home;
