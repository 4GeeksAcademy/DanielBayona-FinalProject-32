import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import Sidebar from "../component/Sidebar.jsx";
import CreateSupervisor from "../component/createSupervisor.jsx";

const AdminCreateSupervisor = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.token == null ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <Sidebar />
          <CreateSupervisor />
        </>
      )}
    </>
  );
};

export default AdminCreateSupervisor;
