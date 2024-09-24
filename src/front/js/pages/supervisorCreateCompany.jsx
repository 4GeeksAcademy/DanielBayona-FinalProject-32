import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import SuperVisorNavBar from "../component/supervisorNavBar.js";
import CreateCompany from "../component/createCompany.jsx";

const SupervisorCreateCompany = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <SuperVisorNavBar />
                    <CreateCompany />
                </>
            )}
        </>
    );
};

export default SupervisorCreateCompany;
