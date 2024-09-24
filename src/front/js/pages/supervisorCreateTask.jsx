import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import SuperVisorNavBar from "../component/supervisorNavBar.js";
import CreateTask from "../component/createTask.jsx";

const SupervisorCreateTask = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <SuperVisorNavBar />
                    <CreateTask />
                </>
            )}
        </>
    );
};

export default SupervisorCreateTask;
