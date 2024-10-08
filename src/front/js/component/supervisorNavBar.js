import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../../img/Logo.png";
import "../../styles/supervisorNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faList,
    faUserGroup,
    faPen,
    faRightFromBracket,
    faTasks,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/adminNavBar.css";

export const SuperVisorNavBar = () => {

    const [activeItem, setActiveItem] = useState(0);

    const handleChangeColor = (index) => {
        setActiveItem(index);
    };


    return (
        <nav className="navbar nav-bar-left navbar-left d-flex flex-column navbar-expand-lg">
            <div className="container-fluid flex-column">
                <a className="navbar-brand" href="#">
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{ width: "150px", height: "144px" }}
                        className="d-inline-block align-text-top"
                    />
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav flex-column mt-5">
                        <li
                            className={`nav-item ${activeItem === 0 ? "active" : ""}`}
                            onClick={() => handleChangeColor(0)}
                        >
                            <NavLink
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active transition text-white fst-italic fw-bolder"
                                        : "nav-link inactive transition text-dark fst-italic fw-bolder"
                                }
                                to="/supervisor"
                            >
                                <FontAwesomeIcon icon={faHouse} className="pe-2" />
                                HOME
                            </NavLink>
                        </li>
                        <li
                            className={`nav-item ${activeItem === 1 ? "active" : ""}`}
                            onClick={() => handleChangeColor(1)}
                        >
                            <NavLink
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active transition text-white fst-italic fw-bolder"
                                        : "nav-link inactive transition text-dark fst-italic fw-bolder"
                                }
                                to="/supervisor/CreateTask"
                            >
                                <FontAwesomeIcon icon={faTasks} className="pe-2" />
                                CREATE TASKS
                            </NavLink>
                        </li>
                        <li
                            className={`nav-item ${activeItem === 2 ? "active" : ""}`}
                            onClick={() => handleChangeColor(2)}
                        >
                            <NavLink
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active transition text-white fst-italic fw-bolder"
                                        : "nav-link inactive transition text-dark fst-italic fw-bolder"
                                }
                                to="/supervisor/CreateWorker"

                            >
                                <FontAwesomeIcon icon={faUserGroup} className="pe-2" />
                                CREATE WORKER
                            </NavLink>
                        </li>
                        <li
                            className={`nav-item ${activeItem === 3 ? "active" : ""}`}
                            onClick={() => handleChangeColor(3)}
                        >
                            <NavLink
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active transition text-white fst-italic fw-bolder"
                                        : "nav-link inactive transition text-dark fst-italic fw-bolder"
                                }
                                to="/supervisor/CreateCompany"
                            >
                                <FontAwesomeIcon icon={faPen} className="pe-2" />
                                CREATE COMPANY
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SuperVisorNavBar;
