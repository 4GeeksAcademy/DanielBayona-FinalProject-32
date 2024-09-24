import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import Sidebar from "../../js/component/Sidebar.jsx";
import AdminUsers from "../component/AdminUsers.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faUser,
  faTrash,
  faBell,
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

const AdminGetUsers = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.token == null ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <div className="d-flex bg-light">
            <nav className=" d-flex justify-content-end p-4 w-100 bg-light">
              <div className="content-icons border border-2">
                <FontAwesomeIcon className="me-2" icon={faBell} />
                <FontAwesomeIcon icon={faUser} />
              </div>
            </nav>
          </div>
          <Sidebar />
          <AdminUsers />
        </>
      )}
    </>
  );
};

export default AdminGetUsers;
