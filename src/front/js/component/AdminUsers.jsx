import React, { useState, useContext } from "react";
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
    return (


        <div className="container-admin bg-light" style={{ marginLeft: '250px' }}>
            <div className="d-flex bg-light">
                <nav className=" d-flex justify-content-end p-4 w-100 bg-ligh" >
                    <div className="content-icons border border-2">
                        <FontAwesomeIcon className="me-2" icon={faBell} />
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </nav>

            </div>
            <section style={{ width: "80%", margin: "auto" }} >
                <table style={{ width: "100%",borderSpacing:"30px"}}>
                    <tr  className="mb-4" style={{ backgroundColor: "#edf1d6"}} >
                        <th style={{ width: "80%" }}>Usuarios</th>
                        <th>
                            Info
                        </th>
                        <th>
                            Edit
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                    <tr>
                        <td>leonardo munoz</td>
                        <td>
                            {/* <!-- Button trigger modal --> */}
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                {/* Launch demo modal */}
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </button>

                            {/* <!-- Modal --> */}
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <table style={{ width: "100%" }}>
                                                <tr>
                                                    <td className="border" style={{ width: "20%" }}>
                                                        <img
                                                            style={{ height: "50px" }}
                                                            src="https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg" alt=""
                                                        />
                                                    </td>
                                                    <td>
                                                        <p>leonardo</p>
                                                        <p>worker</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-taskyist" data-bs-dismiss="modal">Close</button>
                                           
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
                </table>
            </section>
        </div>
    );
};





{/* <FontAwesomeIcon icon={faPenToSquare} /> */ }
{/* <FontAwesomeIcon icon={faTrash} /> */ }
{/* <FontAwesomeIcon icon={faTrash} /> */ }
export default AdminUsers;
