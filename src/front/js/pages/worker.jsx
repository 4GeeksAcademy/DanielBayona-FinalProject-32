import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import WorkerNavBar from "../component/workerNavBar";
const Worker = () => {
  const { store, actions } = useContext(Context);
  return <>{store.token == null ? <Navigate to={"/"} /> : <WorkerNavBar />}</>;
};
export default Worker;
