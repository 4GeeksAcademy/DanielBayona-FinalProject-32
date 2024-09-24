import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/Logo.png";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenSquare,
    faUser,
    faTrash,
    faBell,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/adminUserStyles.css"
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";



const Home = () => {
    const { store, actions } = useContext(Context)
    const [company, setCompany] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [view, setView] = useState('tasks');
    const navigate = useNavigate();

    const getCompanies = async () => {
        const response = await actions.getCompanies()
        if (response == 422 || response == 401) {
            actions.logout();
        } else {
            setCompany(response);
        }
    }

    const getTasks = async () => {
        const response = await actions.getTasks();
        if (response == 422 || response == 401) {
            actions.logout()
        } else {
            setTasks(response)
        }
    }

    const getWorkers = async () => {
        const response = await actions.getWorkers();
        if (response == 422 || response == 401) {
            actions.logout()
        } else {
            setWorkers(response);
        }
    }
    const changeOption = () => {
        if (view == 'tasks') {
            getTasks()
        } else if (view == 'companies') {
            getCompanies()
        } else if (view == 'workers') {
            getWorkers()
        }
    }

    const deleteCompany = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this Company?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await actions.deleteCompany(id);
                if (success) {
                    Swal.fire('Deleted!', 'Company has been deleted.', 'success');
                    setCompany(company.filter(company => company.id !== id));
                } else {
                    Swal.fire('Error!', 'There was a problem deleting the Company.', 'error');
                }
            }
        });
    }

    const deleteWorker = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this Company?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await actions.deleteWorker(id);
                if (success) {
                    Swal.fire('Deleted!', 'Company has been deleted.', 'success');
                    setWorkers(company.filter(company => company.id !== id));
                } else {
                    Swal.fire('Error!', 'There was a problem deleting the Company.', 'error');
                }
            }
        });
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setView(value);
    };

    const handleEditClick = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to continue to edit this Company?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, edit it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/supervisor/editWorker/${id}`);
            }
        });
    }


    useEffect(() => {
        changeOption()
    }, [view])

    return (
        <div className="container-admin bg-light" style={{ marginLeft: '250px' }}>
            <section style={{ width: "80%", margin: "auto" }}>
                <table style={{ width: "100%", borderSpacing: "30px" }}>
                    <thead>
                        <tr className="mb-4" style={{ backgroundColor: "#edf1d6" }}>
                            <th style={{ width: "80%" }}>
                                <select className="drop rounded-pill" name="optionSelected" onChange={handleChange}>
                                    <option value="tasks">Tasks</option>
                                    <option value="companies">Companies</option>
                                    <option value="workers">Workers</option>
                                </select>
                            </th>
                            <th>Info</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {view === 'tasks' && tasks.map((task) => (
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
                                                    <h5 className="modal-title" id="exampleModalLabel">Bug Info</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <table style={{ width: "100%" }}>
                                                        <tr>
                                                            <td className="border" style={{ width: "100%" }}>
                                                                <img
                                                                    className="img-fluid"
                                                                    src={task.work || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"}
                                                                    alt="User profile"
                                                                />
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Name:</h2>
                                                                <p className="fs-3">{`${task.name}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Description:</h2>
                                                                <p className="fs-3">{`Description: ${task.desc}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Status:</h2>
                                                                <p className="fs-3">{`${task.status}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Date:</h2>
                                                                <p className="fs-3">{`${task.date}`}</p>
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
                                <td>
                                    <FontAwesomeIcon icon={faPenSquare} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faTrash} />
                                </td>
                            </tr>
                        ))}

                        {view === 'companies' && company.map((company) => (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${company.id}`}>
                                        <FontAwesomeIcon icon={faCircleInfo} className="fa-lg" />
                                    </button>
                                    <div className="modal fade" id={`modal-${company.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog d-flex justify-content-center modal-lg">
                                            <div className="modal-content d-flex justify-content-center">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Company Info</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <table style={{ width: "100%" }}>
                                                        <tr>
                                                            <td className="border" style={{ width: "100%" }}>
                                                                <h2 className="fs-5 fw-bold">Name:</h2>
                                                                <p className="fs-3">{`${company.name}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Mail:</h2>
                                                                <p className="fs-3">{`${company.mail}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Address:</h2>
                                                                <p className="fs-3">{`${company.address}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Phone:</h2>
                                                                <p className="fs-3">{`${company.phone}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Identification:</h2>
                                                                <p className="fs-3">{`${company.identification}`}</p>
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
                                <td>
                                    <FontAwesomeIcon icon={faPenSquare} onClick={() => handleEditClick(company.id)} className="btn btn-success fa-lg" />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteCompany(company.id)} className="btn btn-danger fa-lg" />
                                </td>
                            </tr>
                        ))}

                        {view === 'workers' && workers.map((worker) => (
                            <tr key={worker.id}>
                                <td>{worker.name}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${worker.id}`}>
                                        <FontAwesomeIcon icon={faCircleInfo} className="fa-lg" />
                                    </button>
                                    <div className="modal fade" id={`modal-${worker.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog d-flex justify-content-center modal-lg">
                                            <div className="modal-content d-flex justify-content-center">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Worker Info</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <table style={{ width: "100%" }}>
                                                        <tr>
                                                            <td className="border" style={{ width: "100%" }}>
                                                                <h2 className="fs-5 fw-bold">Name:</h2>
                                                                <p className="fs-3">{`${worker.name}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Last name:</h2>
                                                                <p className="fs-3">{`${worker.last_name}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Mail:</h2>
                                                                <p className="fs-3">{`${worker.mail}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Address:</h2>
                                                                <p className="fs-3">{`${worker.adress}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Phone:</h2>
                                                                <p className="fs-3">{`${worker.phone}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Identification:</h2>
                                                                <p className="fs-3">{`${worker.identification}`}</p>
                                                                <hr />
                                                                <h2 className="fs-5 fw-bold">Position:</h2>
                                                                <p className="fs-3">{`${worker.position}`}</p>
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
                                <td>
                                    <FontAwesomeIcon icon={faPenSquare} onClick={() => handleEditClick(worker.id)} className="btn btn-success fa-lg" />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteWorker(worker.id)} className="btn btn-danger fa-lg" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );

};





{/* <FontAwesomeIcon icon={faPenToSquare} /> */ }
{/* <FontAwesomeIcon icon={faTrash} /> */ }
{/* <FontAwesomeIcon icon={faTrash} /> */ }
export default Home;
