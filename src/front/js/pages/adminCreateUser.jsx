import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import Sidebar from "../../js/component/Sidebar.jsx";
import CreateUser from "../component/createUser.js";

const AdminCreateUser = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.token == null ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <Sidebar />
          <CreateUser />
        </>
      )}
    </>
  );
};

export default AdminCreateUser;
