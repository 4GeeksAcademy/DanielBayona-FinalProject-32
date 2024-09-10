import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../js/component/Sidebar.jsx";

const Admin = () => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default Admin;
