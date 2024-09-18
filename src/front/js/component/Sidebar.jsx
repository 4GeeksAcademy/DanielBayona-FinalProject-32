import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../../img/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faBug,
  faUsers,
  faBars,
  faTimes,
  faUser
  
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(0);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    const response = actions.logout();
    console.log("funciona");

    if (response) {
      navigate("/");
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <nav
        className={`navbar nav-bar-left navbar-left d-flex flex-column navbar-expand-lg ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="container-fluid flex-column">
          <a className="navbar-brand" href="#">
            <img
              src={Logo}
              alt="Logo"
              className=" image-big image-small d-inline-block align-text-top"
            />
          </a>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav flex-column mt-5">
              <li className="small-text">
                <NavLink
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active transition text-white fst-italic fw-bolder"
                      : "nav-link inactive transition text-dark fst-italic fw-bolder"
                  }
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faHouse} className="pe-2" />
                  HOME
                </NavLink>
              </li>
              <li className="small-text">
                <NavLink
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active transition text-white fst-italic fw-bolder"
                      : "nav-link inactive transition text-dark fst-italic fw-bolder"
                  }
                  to="/admin/CreateIssue"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faBug} className="pe-2" /> CREATE
                  ISSUES
                </NavLink>
              </li>
              <li className="small-text">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active transition text-white fst-italic fw-bolder"
                      : "nav-link inactive transition text-dark fst-italic fw-bolder"
                  }
                  to="/admin/CreateUser"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faUsers} className="pe-2" />
                  CREATE USER
                </NavLink>
              </li>
              <li className="nav-item bottom-item small-text">
                <a
                  className="nav-link text-dark fst-italic fw-bolder"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
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
    </>
  );
}
