import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/Logo.png";
import "../../styles/supervisorNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faList,
    faUserGroup,
    faPen,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/supervisorNavBar.css";

export const SuperVisorNavBar = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
    const [activeItem, setActiveItem] = useState(0);

    const handleChangeColor = (index) => {
        setActiveItem(index);
    };

    const handleLogout = () => {
        const response = actions.logout();

        if (response) {
            navigate("/");
        }
    }

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
                            <a
                                className={`nav-link fst-italic fw-bolder ${activeItem === 0 ? "text-white" : "text-dark"
                                    }`}
                                aria-current="page"
                                href="#"
                            >
                                <FontAwesomeIcon icon={faHouse} className="pe-2" />
                                HOME
                            </a>
                        </li>
                        <li
                            className={`nav-item ${activeItem === 1 ? "active" : ""}`}
                            onClick={() => handleChangeColor(1)}
                        >
                            <a
                                className={`nav-link fst-italic fw-bolder ${activeItem === 1 ? "text-white" : "text-dark"
                                    }`}
                                aria-current="page"
                                href="#"
                            >
                                <FontAwesomeIcon icon={faList} className="pe-2" /> TASKS
                            </a>
                        </li>
                        <li
                            className={`nav-item ${activeItem === 2 ? "active" : ""}`}
                            onClick={() => handleChangeColor(2)}
                        >
                            <a
                                className={`nav-link fst-italic fw-bolder ${activeItem === 2 ? "text-white" : "text-dark"
                                    }`}
                                aria-current="page"
                                href="#"
                            >
                                <FontAwesomeIcon icon={faUserGroup} className="pe-2" />
                                WORKERS
                            </a>
                        </li>
                        <li
                            className={`nav-item ${activeItem === 3 ? "active" : ""}`}
                            onClick={() => handleChangeColor(3)}
                        >
                            <a
                                className={`nav-link fst-italic fw-bolder ${activeItem === 3 ? "text-white" : "text-dark"
                                    }`}
                                aria-current="page"
                                href="#"
                            >
                                <FontAwesomeIcon icon={faPen} className="pe-2" />
                                COMPANIES
                            </a>
                        </li>
                        <li className="nav-item bottom-item">
                            <a
                                className="nav-link text-dark fst-italic fw-bolder"
                                aria-current="page"
                                onClick={() => handleLogout()}
                                role="button"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} className="pe-2" />
                                LOG OUT
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SuperVisorNavBar;
