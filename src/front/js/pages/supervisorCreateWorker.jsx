import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import SuperVisorNavBar from "../component/supervisorNavBar.js";
import CreateWorker from "../component/createWorker.jsx";

const SupervisorCreateWorker = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.token == null ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <SuperVisorNavBar />
          <CreateWorker />
        </>
      )}
    </>
  );
};

export default SupervisorCreateWorker;
