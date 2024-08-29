import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import WorkerNavBar from "../component/workerNavBar.js";
import SuperVisorNavBar from "../component/supervisorNavBar.js";
import Sidebar from "../component/Sidebar.jsx";
import "../../styles/home.css";

export const Home = () => {
  return (
    <>
      <WorkerNavBar />
    </>
  );
};

export default Home;
