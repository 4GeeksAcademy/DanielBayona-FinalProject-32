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



const AdminUsers = () => {
    const { store, actions } = useContext(Context)
    const [users, setUsers] = useState([]);
    const [issues, setIssues] = useState([]);
    const [view, setView] = useState('users');
    const navigate = useNavigate();

    const getUsers = async () => {
        const response = await actions.getUsers()
        if (response == 422 || response == 401) {
            actions.logout();
        } else {
            setUsers(response);
        }
    }

    const getIssues = async () => {
        const response = await actions.getBugs();
        if (response == 422 || response == 401) {
            actions.logout()
        } else {
            setIssues(response)
        }
    }

    const changeOption = () => {
        if (view == 'users') {
            getUsers()
        } else {
            getIssues()
        }
    }

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete to edit this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await actions.deleteUser(id);
                if (success) {
                    Swal.fire('Deleted!', 'User has been deleted.', 'success');
                    setUsers(users.filter(user => user.id !== id));
                } else {
                    Swal.fire('Error!', 'There was a problem deleting the user.', 'error');
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
            text: 'Do you want to continue to edit this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, edit it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/admin/editUser/${id}`);
            }
        });
    };

    const deleteIssue = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete to edit this issue?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await actions.deleteIssue(id);
                if (success) {
                    Swal.fire('Deleted!', 'Issue has been deleted.', 'success');
                    setIssues(issues.filter(issue => issue.id !== id));
                } else {
                    Swal.fire('Error!', 'There was a problem deleting the issue.', 'error');
                }
            }
        });
    }

    const handleEditClickIssue = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to continue to edit this issue?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, edit it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/admin/editIssue/${id}`);
            }
        });
    };

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
                                    <option value="users">User</option>
                                    <option value="bugs">Bugs</option>
                                </select></th>
                            <th>Info</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {view == 'users' ? users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${user.id}`}>
                                        <FontAwesomeIcon icon={faCircleInfo} className="fa-lg" />
                                    </button>
                                    <div className="modal fade" id={`modal-${user.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog d-flex justify-content-center modal-lg">
                                            <div className="modal-content d-flex justify-content-center">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">User Info</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <table style={{ width: "100%" }}>
                                                        <tr>
                                                            <td className="border" style={{ width: "100%" }}>
                                                                <img
                                                                    className="img-fluid"
                                                                    src={user.pic || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"}
                                                                    alt="User profile"
                                                                />
                                                                <hr />
                                                                <h2 class="fs-5 fw-bold">Username:</h2>
                                                                <p className="fs-3">{`${user.username}`}</p>
                                                                <hr />
                                                                <h2 class="fs-5 fw-bold">Role:</h2>
                                                                <p className="fs-3">{`${user.role}`}</p>
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
                                    <FontAwesomeIcon icon={faPenSquare} onClick={() => handleEditClick(user.id)} className="btn btn-success fa-lg" />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteUser(user.id)} className="btn btn-danger fa-lg" />
                                </td>
                            </tr>
                        )) : issues.map((issue) => (
                            <tr key={issue.id}>
                                <td>{issue.name}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${issue.id}`}>
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </button>
                                    <div className="modal fade" id={`modal-${issue.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                                    src={issue.proof || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"}
                                                                    alt="User profile"
                                                                />
                                                                <hr />
                                                                <h2 class="fs-5 fw-bold">Name:</h2>
                                                                <p className="fs-3">{`${issue.name}`}</p>
                                                                <hr />
                                                                <h2 class="fs-5 fw-bold">Description:</h2>
                                                                <p className="fs-3">{`Description: ${issue.desc}`}</p>
                                                                <hr />
                                                                <h2 class="fs-5 fw-bold">Status:</h2>
                                                                <p className="fs-3">{`${issue.status}`}</p>
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
                                    <FontAwesomeIcon icon={faPenSquare} onClick={() => handleEditClickIssue(issue.id)} className="btn btn-success fa-lg" />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteIssue(issue.id)} className="btn btn-danger fa-lg" />
                                </td>
                            </tr>
                        ))}
                        { }
                    </tbody>
                </table>
            </section>
        </div>
    );
};





{/* <FontAwesomeIcon icon={faPenToSquare} /> */ }
{/* <FontAwesomeIcon icon={faTrash} /> */ }
{/* <FontAwesomeIcon icon={faTrash} /> */ }
export default AdminUsers;
