import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import WorkerNavBar from "../component/workerNavBar.js";
import SuperVisorNavBar from "../component/supervisorNavBar.js";
import "../../styles/home.css";

export const Home = () => {
  return (
    <>
      <SuperVisorNavBar />
    </>
  );
};
