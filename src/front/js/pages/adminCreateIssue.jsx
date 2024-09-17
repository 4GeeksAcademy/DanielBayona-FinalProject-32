import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import Sidebar from "../component/Sidebar.jsx";
import CreateIssue from "../component/createIssue.js";

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