import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import WorkerNavBar from "../component/workerNavBar";
import CreateTask from "../component/createTask.jsx";

const WorkerCreateTask = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <WorkerNavBar />
                    <CreateTask />
                </>
            )}
        </>
    );
};

export default WorkerCreateTask;