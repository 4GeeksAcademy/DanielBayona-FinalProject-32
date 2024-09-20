import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import Sidebar from "../../js/component/Sidebar.jsx";
import AdminUsers from "../component/AdminUsers.jsx";

const AdminGetUsers = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.token == null ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <Sidebar />
          <AdminUsers />
        </>
      )}
    </>
  );
};

export default AdminGetUsers;
