import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navigate } from "react-router-dom";
import SuperVisorNavBar from "../component/supervisorNavBar.js";
import Home from "../component/supervisorHome.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenSquare,
    faUser,
    faTrash,
    faBell,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

const SupervisorHome = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            {store.token == null ? (
                <Navigate to={"/"} />
            ) : (
                <>
                    <div className="d-flex bg-light">
                        <nav className=" d-flex justify-content-end p-4 w-100 bg-light">
                            <div className="content-icons border border-2">
                                <FontAwesomeIcon className="me-2" icon={faBell} />
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </nav>
                    </div>
                    <SuperVisorNavBar />
                    <Home />
                </>
            )}
        </>
    );
};

export default SupervisorHome;
