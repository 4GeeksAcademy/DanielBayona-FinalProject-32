import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import WorkerNavBar from "../component/workerNavBar.js";
import "../../styles/home.css";

export const Home = () => {
  return (
    <>
      <WorkerNavBar />
    </>
  );
};
