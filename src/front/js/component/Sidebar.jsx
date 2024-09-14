import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faBug,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/supervisorNavBar.css";

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(0);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    const response = actions.logout();
    console.log("funciona");

    if (response) {
      navigate("/");
    }
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
            <li>
              <NavLink
                end
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active transition  text-white fst-italic fw-bolder"
                    : "nav-link inactive transition  text-dark fst-italic fw-bolder"
                }
                to="/admin"
              >
                <FontAwesomeIcon icon={faHouse} className="pe-2" />
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active transition  text-white fst-italic fw-bolder"
                    : "nav-link inactive transition  text-dark fst-italic fw-bolder"
                }
                to="/admin/CreateIssue"
              >
                <FontAwesomeIcon icon={faBug} className="pe-2" /> CREATE ISSUES
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active transition  text-white fst-italic fw-bolder"
                    : "nav-link inactive transition  text-dark fst-italic fw-bolder"
                }
                to="/admin/CreateUser"
              >
                <FontAwesomeIcon icon={faUsers} className="pe-2" />
                CREATE USER
              </NavLink>
            </li>
            <li className="nav-item bottom-item">
              <a
                className="nav-link text-dark fst-italic fw-bolder"
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

export default Sidebar;
