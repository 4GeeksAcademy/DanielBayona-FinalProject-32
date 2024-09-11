import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import SuperVisorNavBar from "../component/supervisorNavBar";

const Supervisor = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      {store.token == null ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <SuperVisorNavBar />
        </>
      )}
    </>
  );
};

export default Supervisor;
