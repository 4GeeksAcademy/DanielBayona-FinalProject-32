import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Navigate, useNavigate } from "react-router-dom";;
import WorkerNavBar from "../component/workerNavBar";
import CreateTask from "../component/createTask.jsx";
import defaultPick from "../../img/Imagen1user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const WorkerCreateTask = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState(defaultPick);
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const userData = await actions.getUserProfile();
            setUser(userData);
            if (userData?.pic) {
                localStorage.setItem('profilePic', userData.pic);
                setProfilePic(userData.pic);
            }
            localStorage.setItem('username', userData.username);
            localStorage.setItem('role', userData.role);

            if (userData.role === "worker") {
                localStorage.setItem('name', userData.name);
                localStorage.setItem('last_name', userData.last_name);
                localStorage.setItem('position', userData.position);
                localStorage.setItem('mail', userData.mail);
                localStorage.setItem('adress', userData.adress);
                localStorage.setItem('phone', userData.phone);
                localStorage.setItem('identification', userData.identification);
            }

        } catch (error) {
            console.error("Error fetching user data:", error);
            const savedPic = localStorage.getItem('profilePic');
            const savedUsername = localStorage.getItem('username');
            const savedRole = localStorage.getItem('role');
            const savedName = localStorage.getItem('name');
            const savedLastName = localStorage.getItem('last_name');
            const savedPosition = localStorage.getItem('position');
            const savedMail = localStorage.getItem('mail');
            const savedAddress = localStorage.getItem('adress');
            const savedPhone = localStorage.getItem('phone');
            const savedIdentification = localStorage.getItem('identification');

            if (savedPic) {
                setProfilePic(savedPic);
            }
            if (savedUsername) {
                setUser(prev => ({
                    ...prev, username: savedUsername,
                    role: savedRole,
                    name: savedName,
                    last_name: savedLastName,
                    position: savedPosition,
                    mail: savedMail,
                    adress: savedAddress,
                    phone: savedPhone,
                    identification: savedIdentification
                }));
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!',
            cancelButtonText: 'No, stay logged in'
        }).then((result) => {
            if (result.isConfirmed) {
                actions.logout();
                Swal.fire(
                    'Logged Out!',
                    'You have been logged out successfully.',
                    'success'
                ).then(() => {
                    navigate("/");
                });
            }
        });
    };
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <div className="d-flex bg-light">
                        <nav className="d-flex justify-content-end p-4 w-100 bg-white">
                            <div className="d-flex justify-content-end">
                                {loading ? (
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <>
                                        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#modal">
                                            <img
                                                src={profilePic}
                                                alt="Profile"
                                                className="img-fluid rounded-circle"
                                                style={{ width: "50px", height: "50px" }}
                                            />
                                        </button>
                                        <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">User Info</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body d-flex justify-content-center align-items-center flex-column">
                                                        <img
                                                            src={profilePic || localStorage.getItem('profilePic')}
                                                            alt="Profile"
                                                            className="img-fluid rounded-circle"
                                                            style={{ width: "200px", height: "200px" }}
                                                        />
                                                        <p className="pt-4"> <strong>Username:</strong> {user?.username || localStorage.getItem('username')}</p>
                                                        <p><strong>Role:</strong> {user?.role || localStorage.getItem('role')}</p>
                                                        <hr />
                                                        {user?.role === "worker" && (
                                                            <>
                                                                <p><strong> Name: </strong> {user.name || localStorage.getItem('name')}</p>
                                                                <p><strong>Last Name:</strong> {user.last_name || localStorage.getItem('last_name')}</p>
                                                                <hr />
                                                                <p><strong>Position:</strong> {user.position || localStorage.getItem('position')}</p>
                                                                <hr />
                                                                <p><strong>Email:</strong> {user.mail || localStorage.getItem('mail')}</p>
                                                                <p><strong>Address:</strong> {user.adress || localStorage.getItem('adress')}</p>
                                                                <p><strong>Phone:</strong> {user.phone || localStorage.getItem('phone')}</p>
                                                                <hr />
                                                                <p><strong>Identification:</strong> {user.identification || localStorage.getItem('identification')}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="modal-footer">
                                                        <a
                                                            className="nav-link fst-italic fw-bolder text-danger "
                                                            aria-current="page"
                                                            onClick={() => handleLogout()}
                                                            data-bs-dismiss="modal"
                                                            role="button"
                                                        >
                                                            <FontAwesomeIcon icon={faRightFromBracket} className="pe-2 text-danger" />
                                                            LOG OUT
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                    <WorkerNavBar />
                    <CreateTask />
                </>
            )}
        </>
    );
};

export default WorkerCreateTask;