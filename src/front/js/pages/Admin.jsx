import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import Sidebar from "../../js/component/Sidebar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.token == null ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <Sidebar />
        </>
      )}

    </>
  );
};

export default Admin;
