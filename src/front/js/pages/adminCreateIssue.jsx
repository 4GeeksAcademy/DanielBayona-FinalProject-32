import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import Sidebar from "../component/Sidebar.jsx";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,

} from "@fortawesome/free-solid-svg-icons";



const AdminCreateIssue = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.token == null ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <Sidebar />
          <CreateIssue />
        </>
      )}
    </>
  );
};

export default AdminCreateIssue;
