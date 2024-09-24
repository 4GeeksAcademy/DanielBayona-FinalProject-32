import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar.jsx";
import CreateSupervisor from "../component/createSupervisor.jsx";
import defaultPick from "../../img/Imagen1user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const AdminCreateSupervisor = () => {
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
    } catch (error) {
      console.error("Error fetching user data:", error);
      const savedPic = localStorage.getItem('profilePic');
      const savedUsername = localStorage.getItem('username');
      const savedRole = localStorage.getItem('role');

      if (savedPic) {
        setProfilePic(savedPic);
      }
      if (savedUsername) {
        setUser(prev => ({ ...prev, username: savedUsername, role: savedRole }));
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
                          <div className="modal-body">
                            <img
                              src={profilePic || localStorage.getItem('profilePic')}
                              alt="Profile"
                              className="img-fluid"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <p>Username: {user?.username || localStorage.getItem('username')}</p>
                            <p>Role: {user?.role || localStorage.getItem('role')}</p>
                          </div>
                          <div className="modal-footer">
                            <a
                              className="nav-link text-dark fst-italic fw-bolder"
                              aria-current="page"
                              onClick={() => handleLogout()}
                              data-bs-dismiss="modal"
                              role="button"
                            >
                              <FontAwesomeIcon icon={faRightFromBracket} className="pe-2" />
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
          <Sidebar />
          <CreateSupervisor />
        </>
      )}
    </>
  );
};

export default AdminCreateSupervisor;
